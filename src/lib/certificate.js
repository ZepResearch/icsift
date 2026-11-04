import { CONFERENCE } from "@/constants/conference";
import { ordinal } from "@/lib/dashboard";
import { canvasToPdf, downloadBlob, loadImage, pageFonts } from "@/lib/pdf";

// Draws the certificate on a canvas, A4 landscape. Layout follows the printed ICSIFT certificate: three logos across
// the top, "Certificate of Appearance", the name over a rule, the citation, and the signatures along the bottom.
// The preview in the dashboard and the downloaded PDF are the same drawing.

export const CERT_W = 1600;
export const CERT_H = 1131;

const INK = "#213629"; // forest
const TEXT = "#1d2a22";
const MUTED = "#3a3020"; // bark
const ACCENT = "#eaea3c"; // signal deep
const PAPER = "#fbfaf6";

// "/certificate/signatures/Dr. Jane Doe.png" -> "Dr. Jane Doe"
const nameFromFile = (path) => decodeURIComponent(String(path).split("/").pop() || "").replace(/\.[a-z0-9]+$/i, "");

export function signatories() {
  return (CONFERENCE.certificate?.signatories || [])
    .filter(Boolean)
    .map((s) => ({ ...s, name: s.name || (s.signature ? nameFromFile(s.signature) : "") }))
    .filter((s) => s.name);
}

// Loads every image and font the drawing needs. Call once per dialog; drawing is then synchronous.
export async function loadCertificateAssets() {
  const { logos } = CONFERENCE.certificate;
  const people = signatories();
  const [fonts, organiser, conference, cpd, ...signatures] = await Promise.all([
    pageFonts(),
    loadImage(logos.organiser),
    loadImage(logos.conference),
    loadImage(logos.cpd),
    ...people.map((p) => loadImage(p.signature)),
  ]);
  return { fonts, logos: { organiser, conference, cpd }, people: people.map((p, i) => ({ ...p, image: signatures[i] })) };
}

// Text with extra space between letters, centred on x.
function spaced(ctx, text, x, y, spacing) {
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let cx = x - total / 2;
  ctx.textAlign = "left";
  chars.forEach((c, i) => {
    ctx.fillText(c, cx, y);
    cx += widths[i] + spacing;
  });
  return total;
}

// Fits an image inside a box, keeping its aspect ratio. Returns the drawn width.
function contain(ctx, img, x, y, w, h, align = "left") {
  if (!img) return 0;
  const ratio = Math.min(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * ratio;
  const dh = img.naturalHeight * ratio;
  const dx = align === "center" ? x + (w - dw) / 2 : align === "right" ? x + w - dw : x;
  ctx.drawImage(img, dx, y + (h - dh) / 2, dw, dh);
  return dw;
}

// A paragraph of mixed runs (roman, italic, superscript), wrapped to maxWidth and centred.
// `words` is a list of words; each word is a list of [text, style] pieces drawn without a gap between them.
function paragraph(ctx, words, cx, y, maxWidth, lineHeight, styles) {
  const pieceWidth = ([text, style]) => {
    ctx.font = styles[style].font;
    return ctx.measureText(text).width;
  };
  ctx.font = styles.roman.font;
  const space = ctx.measureText(" ").width;
  const lines = [[]];
  let width = 0;
  for (const word of words) {
    const w = word.reduce((sum, piece) => sum + pieceWidth(piece), 0);
    const line = lines[lines.length - 1];
    if (line.length && width + space + w > maxWidth) {
      lines.push([word]);
      width = w;
    } else {
      width += (line.length ? space : 0) + w;
      line.push(word);
    }
  }
  ctx.textAlign = "left";
  lines.forEach((line, row) => {
    const total = line.reduce((sum, word) => sum + word.reduce((s, p) => s + pieceWidth(p), 0), 0) + space * (line.length - 1);
    let x = cx - total / 2;
    const baseline = y + row * lineHeight;
    line.forEach((word, i) => {
      word.forEach((piece) => {
        const style = styles[piece[1]];
        ctx.font = style.font;
        ctx.fillStyle = style.color;
        ctx.fillText(piece[0], x, baseline + (style.rise || 0));
        x += ctx.measureText(piece[0]).width;
      });
      if (i < line.length - 1) x += space;
    });
  });
  return y + lines.length * lineHeight;
}

const words = (text, style = "roman") =>
  String(text)
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => [[w, style]]);

function decor(ctx) {
  // Sweeping bands in the bottom-right corner, behind the frame.
  const bands = [
    [[1700, 700], [1520, 1060], [1180, 1220], 70, INK, 0.92],
    [[1700, 600], [1500, 1010], [1080, 1220], 16, ACCENT, 1],
    [[1700, 520], [1470, 990], [960, 1230], 4, INK, 0.35],
    [[1700, 820], [1560, 1100], [1330, 1210], 10, ACCENT, 0.9],
  ];
  ctx.save();
  ctx.lineCap = "butt";
  for (const [[x0, y0], [cx, cy], [x1, y1], width, color, alpha] of bands) {
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(cx, cy, x1, y1);
    ctx.stroke();
  }
  // A quiet echo in the top-left corner.
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 40;
  ctx.beginPath();
  ctx.moveTo(-60, 360);
  ctx.quadraticCurveTo(80, 90, 380, -60);
  ctx.stroke();
  ctx.restore();
}

/**
 * data: {
 *   name, role ("Presenter" | "Participant"), paperTitle?, conferenceTitle, shortForm, dates (spanParts()),
 *   venue, cpdHours? (number, only when accredited), certificateNo?, verificationCode?
 * }
 */
export function drawCertificate(canvas, data, assets, scale = 1.5) {
  canvas.width = Math.round(CERT_W * scale);
  canvas.height = Math.round(CERT_H * scale);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.textBaseline = "alphabetic";
  const { fonts, logos, people } = assets;
  const serif = (size, weight = 400, italic = false) => `${italic ? "italic " : ""}${weight} ${size}px ${fonts.serif}`;
  const sans = (size, weight = 400) => `${weight} ${size}px ${fonts.body}`;
  const mid = CERT_W / 2;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, CERT_W, CERT_H);
  decor(ctx);

  // Frame.
  ctx.strokeStyle = INK;
  ctx.lineWidth = 6;
  ctx.strokeRect(44, 44, CERT_W - 88, CERT_H - 88);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(58, 58, CERT_W - 116, CERT_H - 116);

  // Logos: organiser left, conference centre, CPD right (optional).
  contain(ctx, logos.organiser, 110, 96, 400, 96);
  const confLogo = 120;
  ctx.font = `400 64px ${fonts.display}`;
  const shortWidth = ctx.measureText(data.shortForm).width;
  const blockWidth = confLogo + 22 + shortWidth;
  const bx = (data.cpdHours ? mid : mid + 40) - blockWidth / 2;
  contain(ctx, logos.conference, bx, 82, confLogo, confLogo);
  ctx.fillStyle = INK;
  ctx.textAlign = "left";
  ctx.fillText(data.shortForm, bx + confLogo + 22, 166);
  if (data.cpdHours && logos.cpd) {
    contain(ctx, logos.cpd, 1150, 82, 124, 124, "center");
    ctx.font = sans(28, 700);
    ctx.fillStyle = INK;
    ctx.fillText(`${data.cpdHours} CPD`, 1290, 138);
    ctx.fillText("credit hours", 1290, 172);
  }

  // Title.
  ctx.fillStyle = INK;
  ctx.font = serif(118, 500);
  spaced(ctx, "CERTIFICATE", mid, 336, 22);
  ctx.font = serif(48, 500);
  const sub = spaced(ctx, "OF APPEARANCE", mid, 410, 16);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  [-1, 1].forEach((side) => {
    ctx.beginPath();
    ctx.moveTo(mid + side * (sub / 2 + 22), 394);
    ctx.lineTo(mid + side * (sub / 2 + 190), 394);
    ctx.stroke();
  });

  // Name, shrunk to fit.
  let size = 84;
  ctx.font = serif(size, 500);
  while (ctx.measureText(data.name).width > 1140 && size > 44) {
    size -= 2;
    ctx.font = serif(size, 500);
  }
  ctx.fillStyle = TEXT;
  ctx.textAlign = "center";
  ctx.fillText(data.name, mid, 520);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(250, 552);
  ctx.lineTo(CERT_W - 250, 552);
  ctx.stroke();
  ctx.fillStyle = INK;
  [250, CERT_W - 250].forEach((x) => {
    ctx.beginPath();
    ctx.arc(x, 552, 9, 0, Math.PI * 2);
    ctx.fill();
  });

  // Citation.
  const styles = {
    roman: { font: serif(35), color: TEXT },
    italic: { font: serif(35, 400, true), color: TEXT },
    role: { font: serif(37, 500, true), color: INK },
    sup: { font: serif(20), color: TEXT, rise: -14 },
  };
  const d = data.dates;
  const day = (n) => [String(n), "roman"];
  const sup = (n) => [ordinal(n), "sup"];
  const datesWords = d
    ? d.sameMonth
      ? [[["held", "roman"]], [["on", "roman"]], [day(d.startDay), sup(d.startDay)], [["-", "roman"]], [day(d.endDay), sup(d.endDay)], [[`${d.month},`, "roman"]], [[String(d.year), "roman"]]]
      : [[["held", "roman"]], [["on", "roman"]], [day(d.startDay), sup(d.startDay)], [[d.startMonth, "roman"]], [["-", "roman"]], [day(d.endDay), sup(d.endDay)], [[`${d.month},`, "roman"]], [[String(d.year), "roman"]]]
    : [];

  // Two flowing paragraphs: the recognition (with the paper, if any), then the conference, its dates and place.
  // The worst case (a long paper title) is six lines, which still clears the signatures.
  const recognition = [...words("In recognition of outstanding contribution as"), ...words(data.role, "role")];
  if (data.paperTitle) recognition.push(...words("for the paper"), ...words(`“${clip(data.paperTitle, 140)}”`, "italic"));
  let y = paragraph(ctx, recognition, mid, 606, 1180, 48, styles);
  y = paragraph(
    ctx,
    [...words("at the"), ...words(`“${data.conferenceTitle}”`, "italic"), ...datesWords, ...words(`at ${data.venue}, organized by ZEP Research.`)],
    mid,
    y,
    1120,
    48,
    styles,
  );

  // Signatures.
  const columns = people.length === 2 ? [520, 1080] : people.length === 1 ? [mid] : [320, 800, 1260];
  const lineY = Math.max(y + 100, 972);
  people.slice(0, 3).forEach((person, i) => {
    const x = columns[i];
    if (person.image) contain(ctx, person.image, x - 150, lineY - 116, 300, 82, "center");
    ctx.font = sans(31, 700);
    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.fillText(person.name, x, lineY - 14);
    const w = Math.max(ctx.measureText(person.name).width + 20, 260);
    ctx.fillStyle = ACCENT;
    ctx.fillRect(x - w / 2, lineY - 4, w, 4);
    ctx.fillStyle = MUTED;
    ctx.font = sans(24);
    person.role.forEach((line, n) => ctx.fillText(line, x, lineY + 30 + n * 27));
  });

  // Certificate number on the bottom edge of the frame.
  if (data.certificateNo) {
    const label = `Certificate no. ${data.certificateNo}${data.verificationCode ? `   ·   Verification code ${data.verificationCode}` : ""}`;
    ctx.font = sans(17, 600);
    const w = ctx.measureText(label).width + 36;
    ctx.fillStyle = PAPER;
    ctx.fillRect(mid - w / 2, CERT_H - 62, w, 28);
    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.fillText(label, mid, CERT_H - 42);
  }
}

const clip = (text, max) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

export function downloadCertificatePdf(canvas, data) {
  const safe = data.name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "certificate";
  downloadBlob(canvasToPdf(canvas, { orientation: "landscape" }), `${data.shortForm}-certificate-${safe}.pdf`);
}
