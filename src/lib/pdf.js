// Turns a drawn <canvas> into a one-page PDF with no library: the canvas is encoded as a JPEG and placed full
// page. Used by the certificate and invoice downloads. Browser only.

const A4 = { landscape: [841.89, 595.28], portrait: [595.28, 841.89] };

const enc = new TextEncoder();

function jpegBytes(canvas, quality) {
  const base64 = canvas.toDataURL("image/jpeg", quality).split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function canvasToPdf(canvas, { orientation = "landscape", quality = 0.92 } = {}) {
  const [w, h] = A4[orientation];
  const image = jpegBytes(canvas, quality);
  const content = `q ${w} 0 0 ${h} 0 0 cm /Im0 Do Q`;

  const parts = [];
  const offsets = [];
  let length = 0;
  const push = (chunk) => {
    const bytes = typeof chunk === "string" ? enc.encode(chunk) : chunk;
    parts.push(bytes);
    length += bytes.length;
  };
  const object = (n, body) => {
    offsets[n] = length;
    push(`${n} 0 obj\n`);
    body();
    push("\nendobj\n");
  };

  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  object(1, () => push("<< /Type /Catalog /Pages 2 0 R >>"));
  object(2, () => push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"));
  object(3, () =>
    push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`),
  );
  object(4, () => {
    push(
      `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`,
    );
    push(image);
    push("\nendstream");
  });
  object(5, () => push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));

  const xref = length;
  push(`xref\n0 6\n0000000000 65535 f \n`);
  for (let n = 1; n <= 5; n += 1) push(`${String(offsets[n]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);

  return new Blob(parts, { type: "application/pdf" });
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Loads an image for canvas drawing; resolves null if it is missing, so a drawing can skip it.
export function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// The page fonts come from next/font under hashed family names; read them from the CSS variables so the canvas
// draws in the same faces, and wait until they are loaded.
export async function pageFonts() {
  const style = getComputedStyle(document.body);
  const read = (name, fallback) => style.getPropertyValue(name).trim() || fallback;
  const fonts = {
    display: read("--font-display", "Impact, sans-serif"),
    body: read("--font-body", "system-ui, sans-serif"),
    serif: read("--font-label", "Georgia, serif"),
  };
  await Promise.all(
    [`400 40px ${fonts.display}`, `400 40px ${fonts.body}`, `700 40px ${fonts.body}`, `400 40px ${fonts.serif}`, `500 40px ${fonts.serif}`, `italic 400 40px ${fonts.serif}`].map(
      (font) => document.fonts.load(font).catch(() => null),
    ),
  );
  return fonts;
}

// Draws text wrapped to `maxWidth`, centred on `x` (or left-aligned when align is "left"). Returns the y after it.
export function wrapText(ctx, text, x, y, maxWidth, lineHeight, align = "center") {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  if (line) lines.push(line);
  ctx.textAlign = align;
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  return y + lines.length * lineHeight;
}
