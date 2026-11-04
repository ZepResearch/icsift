import { CONFERENCE } from "@/constants/conference";
import { registrationAmount, shortDate, spanLabel, tidy } from "@/lib/dashboard";
import { canvasToPdf, downloadBlob, loadImage, pageFonts, wrapText } from "@/lib/pdf";

// A paid registration as an A4 invoice, drawn on a canvas and saved as a PDF. Amounts come from the record when it
// stores them, otherwise from the price list by ticket name (see registrationAmount).

const W = 1240;
const H = 1754;
const INK = "#213629";
const TEXT = "#1d2a22";
const MUTED = "#6b604c";
const PANEL = "#f4f1ec";
const ACCENT = "#fdfd60";

const money = (n, currency = "USD") =>
  `${currency === "USD" ? "$" : `${currency} `}${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export async function downloadInvoice(registration) {
  const canvas = document.createElement("canvas");
  const number = await drawInvoice(canvas, registration);
  downloadBlob(canvasToPdf(canvas, { orientation: "portrait", quality: 0.9 }), `${CONFERENCE.shortForm.replace(/\s+/g, "-")}-invoice-${number}.pdf`);
}

// Draws the invoice on a canvas and returns its number.
export async function drawInvoice(canvas, registration) {
  const [fonts, logo] = await Promise.all([pageFonts(), loadImage(CONFERENCE.certificate.logos.organiser)]);
  const scale = 1.6;
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  const sans = (size, weight = 400) => `${weight} ${size}px ${fonts.body}`;
  const display = (size) => `400 ${size}px ${fonts.display}`;

  const issuer = CONFERENCE.issuer;
  const conference = registration.expand?.conference;
  const amount = registrationAmount(registration);
  const number = registration.order_id || `REG-${registration.id.toUpperCase()}`;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  // Forest band with the logo plate and the word Invoice.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 250);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(80, 70, 420, 110);
  if (logo) {
    const r = Math.min(380 / logo.naturalWidth, 84 / logo.naturalHeight);
    ctx.drawImage(logo, 100, 70 + (110 - logo.naturalHeight * r) / 2, logo.naturalWidth * r, logo.naturalHeight * r);
  }
  ctx.fillStyle = ACCENT;
  ctx.font = display(96);
  ctx.textAlign = "right";
  ctx.fillText("INVOICE", W - 80, 170);

  // Issuer and invoice facts.
  let y = 330;
  ctx.textAlign = "left";
  ctx.fillStyle = TEXT;
  ctx.font = sans(26, 700);
  ctx.fillText(issuer.name, 80, y);
  ctx.font = sans(21);
  ctx.fillStyle = MUTED;
  const issuerLines = [issuer.address, issuer.taxId ? `Tax ID: ${issuer.taxId}` : "", issuer.email, issuer.website].filter(Boolean);
  issuerLines.forEach((line, i) => ctx.fillText(line, 80, y + 36 + i * 30));

  const facts = [
    ["Invoice no.", number],
    ["Issued", shortDate(registration.created)],
    ["Status", "Paid"],
  ];
  facts.forEach(([term, value], i) => {
    ctx.textAlign = "left";
    ctx.font = sans(21);
    ctx.fillStyle = MUTED;
    ctx.fillText(term, W - 560, y + i * 36);
    ctx.textAlign = "right";
    ctx.font = sans(22, 700);
    ctx.fillStyle = TEXT;
    ctx.fillText(value, W - 80, y + i * 36);
  });

  // Billed to.
  y = 330 + Math.max(issuerLines.length * 30 + 36, 110) + 50;
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = display(30);
  ctx.fillText("BILLED TO", 80, y);
  ctx.fillStyle = TEXT;
  ctx.font = sans(25, 700);
  ctx.fillText(tidy(registration.fullname) || "—", 80, y + 44);
  ctx.font = sans(21);
  ctx.fillStyle = MUTED;
  const place = [registration.city, registration.state, registration.zip_code].map(tidy).filter(Boolean).join(", ");
  const billed = [
    [registration.designation, registration.organization].map(tidy).filter(Boolean).join(", "),
    tidy(registration.adress),
    place,
    tidy(registration.country),
    tidy(registration.email),
    tidy(registration.phone_no),
  ].filter(Boolean);
  let by = y + 80;
  billed.forEach((line) => {
    by = wrapText(ctx, line, 80, by, 640, 30, "left");
  });

  // Line item table.
  y = Math.max(by + 40, y + 260);
  ctx.fillStyle = INK;
  ctx.fillRect(80, y, W - 160, 56);
  ctx.fillStyle = ACCENT;
  ctx.font = display(24);
  ctx.textAlign = "left";
  ctx.fillText("DESCRIPTION", 104, y + 37);
  ctx.textAlign = "right";
  ctx.fillText("AMOUNT", W - 104, y + 37);

  y += 100;
  const firstLine = y;
  ctx.textAlign = "left";
  ctx.fillStyle = TEXT;
  ctx.font = sans(24, 700);
  y = wrapText(ctx, tidy(registration.ticket_name) || "Conference registration", 104, y, 740, 34, "left");
  ctx.font = sans(21);
  ctx.fillStyle = MUTED;
  const conferenceLine = conference
    ? `${tidy(conference.title)}, ${spanLabel(conference)}, ${tidy(conference.Venue)}`
    : `${CONFERENCE.name.trim()}, ${CONFERENCE.date}`;
  const itemBottom = wrapText(ctx, conferenceLine, 104, y + 4, 740, 30, "left");
  if (amount) {
    ctx.textAlign = "right";
    ctx.fillStyle = TEXT;
    ctx.font = sans(24, 700);
    ctx.fillText(money(amount.price, amount.currency), W - 104, firstLine);
  }
  y = itemBottom + 20;
  ctx.fillStyle = "#d9d2c4";
  ctx.fillRect(80, y, W - 160, 2);

  // Totals.
  y += 56;
  const totals = amount
    ? [
        ["Subtotal", money(amount.price, amount.currency)],
        ["Tax", money(amount.taxAmount, amount.currency)],
      ]
    : [];
  totals.forEach(([term, value]) => {
    ctx.textAlign = "right";
    ctx.font = sans(22);
    ctx.fillStyle = MUTED;
    ctx.fillText(term, W - 330, y);
    ctx.fillStyle = TEXT;
    ctx.font = sans(22, 600);
    ctx.fillText(value, W - 104, y);
    y += 40;
  });
  ctx.fillStyle = PANEL;
  ctx.fillRect(W - 560, y - 10, 480, 90);
  ctx.textAlign = "left";
  ctx.fillStyle = TEXT;
  ctx.font = sans(23, 700);
  ctx.fillText("Total paid", W - 536, y + 46);
  ctx.textAlign = "right";
  ctx.fillStyle = INK;
  ctx.font = display(amount ? 48 : 26);
  ctx.fillText(amount ? money(amount.totalAmount, amount.currency) : "As charged", W - 104, y + 52);

  // Footer.
  ctx.textAlign = "left";
  ctx.font = sans(19);
  ctx.fillStyle = MUTED;
  const note = amount
    ? "Paid online through CCAvenue. Keep this invoice with your payment receipt."
    : "Paid online through CCAvenue. The amount charged is shown on your CCAvenue payment receipt.";
  wrapText(ctx, note, 80, H - 130, W - 160, 28, "left");
  ctx.fillText(`Questions about this invoice: ${issuer.email}`, 80, H - 72);
  ctx.fillStyle = INK;
  ctx.fillRect(0, H - 24, W, 24);
  return number;
}
