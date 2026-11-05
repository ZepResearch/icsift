# Conference user dashboard: porting guide

How to build the signed-in user dashboard on any Zep Research conference site (Next.js App Router + the shared Zep
PocketBase at `admin.zepresearch.com`). It was built first for ICSIFT; this file holds everything needed to rebuild it
on another conference site **in that site's own UI style**.

What carries over unchanged: the data layer, the PocketBase rules and fields, the certificate and invoice drawings, the
PDF writer, the date logic and the payment fixes. What you restyle: every screen. Section 6 describes each screen by
what it must do, not how it looks.

---

## 1. What the dashboard does

A protected page at `/dashboard` for the signed-in user:

| Section | Source collection | What the user can do |
|---|---|---|
| **Registrations** for this conference | `conf_registration` | Download an **invoice** (PDF). After the conference ends, **generate a certificate** (PDF). |
| **Paper submissions** for this conference | `conf_paper_submission_all` | See each paper, its type and status, and download the file they uploaded. |
| **Journal submissions** (all journals) | `paper_form_submission` | See each paper, the journal, its review status, and the uploaded file. |
| **Upcoming conferences** (all Zep conferences) | `Conference` | Links to each conference's website, submission and registration pages. |
| **Quick access** | (none) | Links to the site's Proceedings, Speakers, Agenda and Gallery pages. |

Layout: an app shell with a sidebar, a top bar, a greeting with four counts, and a board of cards. Choosing a sidebar
item shows **only that section**, full width with every item. The choice lives in the URL hash (`/dashboard#papers`),
so Back works and links can be shared.

**Certificate flow:** before the conference ends, the registration card shows the exact date and time the certificate
unlocks, and it unlocks by itself at that moment. After that, **Generate certificate** opens a panel with a live
preview. The user:

- checks or edits the name;
- chooses **Participant** or **Presenter** (Presenter only if they submitted a paper);
- picks the paper title from their submissions;
- clicks Generate.

Generating creates (or reuses) a `conf_certificates` record and prints its certificate number and verification code
on the PDF.

---

## 2. Prerequisites in the new project

- Next.js App Router, React 19, the `pocketbase` npm package (0.26+). **No other libraries:** PDFs are written by hand
  (section 5.2).
- `src/lib/zep-pocketbase.js`: a browser PocketBase client for the Zep instance (copy from ICSIFT):

  ```js
  import PocketBase from "pocketbase"
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL_ZEP || "https://admin.zepresearch.com")
  export default pb
  ```

  The SDK keeps the session in `localStorage` under `pocketbase_auth`.
- `src/context/AuthContext.jsx` exposing `useAuth()` → `{ user, login, logout, openAuthModal, ... }`, built on
  `pb.collection("users")`. Copy it from ICSIFT with the sign-in modal it opens.
- A conference constants file (ICSIFT: `src/constants/conference.js`). See section 4.
- **Self-hosted fonts.** Canvas drawing uses the page's fonts, and `next/font/google` can break builds (section 9).
  Use `next/font/local` with the font files committed under `src/fonts/`.

---

## 3. PocketBase: collections, rules and required changes

All collections live on the shared Zep PocketBase. The ones the dashboard reads:

### 3.1 `Conference` (public)
`listRule` / `viewRule`: `""` (public). Fields used: `id`, `short_form`, `title`, `date` (**the first day**),
`Venue`, `format`, `img` (file), `websiteUrl`, `website_submittion_url`, `registration_url`, `cpd_accredited`,
`cpd_hours`.

- Each conference site has **one** `Conference` record, reused and edited for every edition. Put its id in your
  constants (`zepConferenceId`). Find it with:
  `curl "https://admin.zepresearch.com/api/collections/Conference/records?fields=id,short_form,title,date"`
- `title` often contains `\r\n` and double spaces. Always pass it through `tidy()`.

### 3.2 `conf_registration`
Rules: list/view `user = @request.auth.id || (admin…)`; create `@request.auth.id != "" && user = @request.auth.id`.

Fields used: `user` (relation → users), `conference` (relation → Conference), `fullname`, `email`, `organization`,
`designation`, `adress` (sic), `city`, `state`, `zip_code`, `country`, `phone_no`, `ticket_type`,
`ticket_category`, `ticket_name`, `created`.

Fields the payment handler writes. **Add them to the collection, or PocketBase silently drops them:**

| Field | Type | Why |
|---|---|---|
| `amount` | number | Total charged, for the invoice |
| `currency` | text | Invoice currency |
| `order_id` | text | CCAvenue order id; invoice number; de-duplication |
| `payment_status` | text | Gateway status |

> **Critical:** a registration appears on the dashboard **only if its `user` field holds the account id**, because the
> view rule hides everything else. The CCAvenue callback arrives without the user's session, so section 7 shows how
> to pass the user id through the signed return URL and write the record as a PocketBase superuser. Older
> registrations with an empty `user` must be linked by hand in the admin UI.

### 3.3 `conf_paper_submission_all`
Rules: list/view own records (+ admin). Fields used: `user`, `conference`, `paper_title`, `paper_type`,
`presentation_type`, `author`, `co_author`, `file`, `status` (if present).

> **Critical:** this collection has **no `created` / `updated` fields**. Any request with `sort: "-created"` fails
> with a 400 and the whole section shows an error. Do not sort on the server; reverse the list in the browser.

The site's paper-submission API must write `user` (the signed-in user's id) and `conference` (`zepConferenceId`) on
each mirrored record, or the dashboard won't find the papers.

### 3.4 `paper_form_submission` (journals)
Rules: list/view own records (+ admin). Fields used: `user`, `journal_name`, `paper_title`, `author`, `co_author`,
`file`, `status` (`pending` | `approve` | `reject`), `created`. The journal-submission API must write `user`.

### 3.5 `conf_certificates`
Rules: list/view own records (+ admin); create `@request.auth.id != "" && user = @request.auth.id && status = "requested"`;
update admin only; delete `status = "rejected"`.

Fields: `user`, `registration` (relation → conf_registration), `certificate_type` (select: `participation`,
`presentation`, …), `certificate_no` (autogenerate `CERT-[A-Z0-9]{12}`), `verification_code` (autogenerate
`[A-Z0-9]{8}`), `issue_date`, `pdf`, `status` (`requested` | `generated` | `rejected`), `rejection_reason`,
`generation_method` (`manual_upload` | `template`). Unique index on (`registration`, `certificate_type`).

Add these so verification can show what was printed (the dashboard already sends them):

| Field | Type |
|---|---|
| `name_on_certificate` | text |
| `paper_title` | text |

Behaviour: the user creates the record with `status: "requested"` and downloads straight away; no admin approval is
needed. An admin can set `status: "rejected"` with a `rejection_reason`, which blocks the download and shows the
reason.

### 3.6 Environment variables (server)
```
NEXT_PUBLIC_PB_URL_ZEP=https://admin.zepresearch.com
ZEP_PB_ADMIN_EMAIL=...        # PocketBase superuser, used only by the payment callback
ZEP_PB_ADMIN_PASSWORD=...
```

---

## 4. Conference constants

Add these keys to the site's constants (ICSIFT shape shown; adapt the values):

```js
export const CONFERENCE = {
  name: "4th International Conference on …",
  shortForm: "4th ICSIFT",
  year: 2027,
  date: "February 26th - 27th, 2027",
  scheduleDates: { month: 1, year: 2027, days: [26, 27] }, // days.length = conference length
  venue: {
    location: "Bangkok, Thailand",
    utcOffset: "+07:00", // certificates unlock at midnight after the last day, venue time
    // ...
  },

  // The site's record in the Zep "Conference" collection.
  zepConferenceId: "9cj5n4788ilx2ms",

  // Certificate: logos and signatures in public/certificate/. A missing signature image leaves a blank to sign by hand.
  // The CPD badge prints only when the Conference record has cpd_accredited on.
  certificate: {
    logos: {
      organiser: "/certificate/zepresearch.png",
      conference: "/certificate/conference-logo.svg",
      cpd: "/certificate/cpd.png",
    },
    signatories: [
      { name: "Mrs. Priyanka Sahu", role: ["Director,", "Zep Research"], signature: "/certificate/signatures/priyanka-sahu.png" },
      // Optional. Set to null for two signatures. Empty name = taken from the file name ("…/Dr. Jane Doe.png").
      { name: "", role: ["Organizing Secretary,", "4th ICSIFT-2027"], signature: "" },
      { name: "Ankit Rath", role: ["CEO,", "Zep Research"], signature: "/certificate/signatures/ankit-rath.png" },
    ],
  },

  // Printed on invoices. Fill address and tax id before treating them as tax invoices.
  issuer: { name: "Zep Research", address: "", taxId: "", email: "info@<site>.com", website: "<site>.com" },
};
```

**Assets:** all logos and signatures **must be served from the same origin** (`/public`). A cross-origin image
taints the canvas and `toDataURL` throws, so the PDF download fails.

---

## 5. Files to copy unchanged

These four files hold no UI style. Copy them as they are, then change only the lines marked **ADAPT**.

### 5.1 `src/lib/dashboard.js`: data loaders, dates, amounts

**ADAPT:**
- `registrationAmount` imports the site's price list (`@/lib/pricing`: `MODES`, `AUDIENCES`, `REGISTRATION`,
  `TAX_RATE`, `withTax`) to price older registrations by ticket name. If your site has no such file, delete that
  fallback loop and keep only the stored-`amount` branch.
- The comments say "ICSIFT"; the code uses `CONFERENCE.zepConferenceId`.

```js
import pb from "@/lib/zep-pocketbase";
import { CONFERENCE } from "@/constants/conference";
import { AUDIENCES, MODES, REGISTRATION, TAX_RATE, withTax } from "@/lib/pricing"; // ADAPT

// Reads for the signed-in user's dashboard, all from the Zep Research PocketBase. The collection rules already limit
// each list to the user's own records; the filters below say so explicitly and narrow to this conference where asked.

const opts = (extra) => ({ requestKey: null, ...extra });

// Registrations saved before the checkout linked a conference have it empty; they were made on this site, so they
// count as this conference and get its record attached for dates and certificates.
export async function fetchRegistrations(userId) {
  const items = await pb.collection("conf_registration").getFullList(
    opts({
      filter: pb.filter("user = {:user} && (conference = {:conf} || conference = '')", { user: userId, conf: CONFERENCE.zepConferenceId }),
      sort: "-created",
      expand: "conference",
    }),
  );
  if (items.every((r) => r.expand?.conference)) return items;
  const own = await pb.collection("Conference").getOne(CONFERENCE.zepConferenceId, opts()).catch(() => null);
  return items.map((r) => (r.expand?.conference || !own ? r : { ...r, expand: { ...r.expand, conference: own } }));
}

// This collection has no created/updated fields, so it cannot be sorted by date (PocketBase rejects the request).
// Records come back in the order they were saved; reverse for newest first.
export const fetchPapers = async (userId) =>
  (
    await pb
      .collection("conf_paper_submission_all")
      .getFullList(opts({ filter: pb.filter("user = {:user} && conference = {:conf}", { user: userId, conf: CONFERENCE.zepConferenceId }) }))
  ).reverse();

export const fetchJournalSubmissions = (userId) =>
  pb.collection("paper_form_submission").getFullList(opts({ filter: pb.filter("user = {:user}", { user: userId }), sort: "-created" }));

export const fetchCertificates = (userId) =>
  pb.collection("conf_certificates").getFullList(opts({ filter: pb.filter("user = {:user}", { user: userId }), sort: "-created" }));

export const fetchUpcomingConferences = () =>
  pb.collection("Conference").getFullList(
    opts({ filter: pb.filter("date >= {:now}", { now: new Date().toISOString().replace("T", " ") }), sort: "date" }),
  );

export const fileUrl = (record, name, query) => (record && name ? pb.files.getURL(record, name, query) : "");

// PocketBase text arrives with stray line breaks and double spaces ("4th International Conference on\r\nSustain…").
export const tidy = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

// --- Conference dates -------------------------------------------------------------------------------------------

// The Conference record holds only the first day; the length comes from the constants.
const CONFERENCE_DAYS = CONFERENCE.scheduleDates.days.length || 2;

export function conferenceSpan(conference) {
  const start = conference?.date ? new Date(conference.date.replace(" ", "T")) : null;
  if (!start || Number.isNaN(start.getTime())) return null;
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + CONFERENCE_DAYS - 1);
  // Certificates open when the last day is over at the venue: midnight after it, in the venue's time zone.
  const [, sign, hh, mm] = String(CONFERENCE.venue.utcOffset || "+00:00").match(/([+-])(\d{2}):?(\d{2})/) || [, "+", "00", "00"];
  const offsetMs = (sign === "-" ? -1 : 1) * (Number(hh) * 60 + Number(mm)) * 60000;
  const closes = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1) - offsetMs);
  return { start, end, closes };
}

export const hasEnded = (conference) => {
  const span = conferenceSpan(conference);
  return Boolean(span && Date.now() >= span.closes.getTime());
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

// "26 – 27 February 2027" for screens.
export function spanLabel(conference) {
  const span = conferenceSpan(conference);
  if (!span) return "Dates to be announced";
  const { start, end } = span;
  const month = (d) => MONTHS[d.getUTCMonth()];
  if (start.getUTCMonth() === end.getUTCMonth())
    return `${start.getUTCDate()} – ${end.getUTCDate()} ${month(end)} ${end.getUTCFullYear()}`;
  return `${start.getUTCDate()} ${month(start)} – ${end.getUTCDate()} ${month(end)} ${end.getUTCFullYear()}`;
}

// Parts for the certificate line "held on 26th - 27th February, 2027" (ordinals set as superscripts).
export function spanParts(conference) {
  const span = conferenceSpan(conference);
  if (!span) return null;
  const { start, end } = span;
  return {
    startDay: start.getUTCDate(),
    endDay: end.getUTCDate(),
    startMonth: MONTHS[start.getUTCMonth()],
    month: MONTHS[end.getUTCMonth()],
    sameMonth: start.getUTCMonth() === end.getUTCMonth(),
    year: end.getUTCFullYear(),
  };
}

export const shortDate = (value) => {
  const d = value ? new Date(String(value).replace(" ", "T")) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
};

// --- Registration amounts ---------------------------------------------------------------------------------------

// The amount paid, for invoices. Newer records store it; older ones are matched back to the price list by the
// ticket name the checkout saved ("Regular Registration - Academician (Physical)"). Returns null when unknown.
export function registrationAmount(registration) {
  const stored = Number(registration?.amount);
  if (Number.isFinite(stored) && stored > 0) {
    const price = Math.round((stored / (1 + TAX_RATE)) * 100) / 100;
    return { price, taxAmount: Math.round((stored - price) * 100) / 100, totalAmount: stored, currency: registration.currency || "USD" };
  }
  // ADAPT: delete this loop if the site has no price list.
  const name = tidy(registration?.ticket_name);
  for (const [mode, modeName] of MODES) {
    for (const row of REGISTRATION[mode] || []) {
      for (const [audience, audienceName] of AUDIENCES) {
        if (`${row.category} - ${audienceName} (${modeName})` === name) return { ...withTax(row.prices[audience]), currency: "USD" };
      }
    }
  }
  return null;
}
```

### 5.2 `src/lib/pdf.js`: canvas → PDF, image and font loading

**ADAPT:** `pageFonts()` reads three CSS variables set by `next/font`: `--font-display` (bold display face),
`--font-body` (text face) and `--font-label` (a serif with italic). Rename them to your site's variables, or set
those three on `<body>`. The certificate is set in the serif.

```js
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
    display: read("--font-display", "Impact, sans-serif"), // ADAPT
    body: read("--font-body", "system-ui, sans-serif"), // ADAPT
    serif: read("--font-label", "Georgia, serif"), // ADAPT
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
```

### 5.3 `src/lib/certificate.js`: the certificate drawing

A4 landscape on a 1600 × 1131 grid:

- three logos across the top (organiser left, conference logo and short name centred, optional CPD badge with
  "N CPD credit hours" right);
- "CERTIFICATE" in letter-spaced serif caps, then "OF APPEARANCE" between two rules;
- the name, shrunk to fit, over a rule with a dot at each end;
- a flowing citation with an italic role, the paper title, the quoted conference title and dates with superscript
  ordinals ("26th - 27th February, 2027"), then "at {venue}, organized by ZEP Research.";
- up to three signature columns (signature image, bold name, an accent rule, role lines);
- the certificate number and verification code set into the bottom edge of the frame.

The worst case (a long paper title) is six citation lines, which still clears the signatures. Titles are clipped at
140 characters.

**ADAPT:** the five colour constants (`INK`, `TEXT`, `MUTED`, `ACCENT`, `PAPER`) are the brand. Change them to the
new site's palette. The layout needs no change.

```js
import { CONFERENCE } from "@/constants/conference";
import { ordinal } from "@/lib/dashboard";
import { canvasToPdf, downloadBlob, loadImage, pageFonts } from "@/lib/pdf";

// Draws the certificate on a canvas, A4 landscape: three logos across the top, "Certificate of Appearance", the name
// over a rule, the citation, and the signatures along the bottom. The preview and the downloaded PDF are the same
// drawing.

export const CERT_W = 1600;
export const CERT_H = 1131;

// ADAPT: brand colours.
const INK = "#213629"; // frame, title, rules
const TEXT = "#1d2a22"; // name and citation
const MUTED = "#3a3020"; // signatory roles
const ACCENT = "#eaea3c"; // corner bands, rule under signatory names
const PAPER = "#fbfaf6"; // ground

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
```

### 5.4 `src/lib/invoice.js`: the invoice drawing

A4 portrait on a 1240 × 1754 grid:

- a coloured band with the organiser logo on a white plate and "INVOICE";
- the issuer block, with invoice number (`order_id`, or `REG-<id>`), issue date and "Paid";
- "Billed to" (name, designation and organisation, address, place, country, email, phone);
- a one-row item table (ticket name, conference title and dates and venue, price);
- subtotal, tax and a "Total paid" panel;
- a footer note.

When the amount is unknown, totals read "As charged" and the footer points to the CCAvenue receipt.

**ADAPT:** the colour constants. The footer says "CCAvenue": change it if the site uses another gateway.

```js
import { CONFERENCE } from "@/constants/conference";
import { registrationAmount, shortDate, spanLabel, tidy } from "@/lib/dashboard";
import { canvasToPdf, downloadBlob, loadImage, pageFonts, wrapText } from "@/lib/pdf";

// A paid registration as an A4 invoice, drawn on a canvas and saved as a PDF. Amounts come from the record when it
// stores them, otherwise from the price list by ticket name (see registrationAmount).

const W = 1240;
const H = 1754;
// ADAPT: brand colours.
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

  // Band with the logo plate and the word Invoice.
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
```

---

## 6. The screens: behaviour to keep, style to change

Files on ICSIFT, for reference: `src/app/(pages)/dashboard/page.jsx`, `Content.jsx`, `CertificateDialog.jsx`,
`src/components/SiteChrome.jsx`. Rebuild the markup in the new site's design system. The logic below is plain React,
so copy it.

### 6.1 Route and protection: `src/app/(pages)/dashboard/page.jsx`
Server component: exports `metadata` with `robots: { index: false }` and renders the client `Content`.

Protection happens in the browser, because the session lives in `localStorage` where middleware can't see it:

```js
const { user, openAuthModal, logout } = useAuth();
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
const signedIn = mounted && Boolean(user) && pb.authStore.isValid; // isValid also rejects expired tokens

if (!mounted) return <EmptyShell aria-busy="true" />;            // first paint matches the server
if (!signedIn) return <SignedOut onSignIn={openAuthModal} />;    // logo, "Sign in to see your dashboard", sign in, back to site
```

### 6.2 Loading each collection
One hook per collection. Every list keeps three states: loading (skeleton), error (a sentence and **Try again**), and
empty (a sentence with a link to the right action).

```js
const LOADING = { status: "loading", items: [] };

function useCollection(load, userId) {
  const [state, setState] = useState(LOADING);
  const reload = useCallback(() => {
    if (!userId) return;
    setState(LOADING);
    load(userId)
      .then((items) => setState({ status: "ok", items }))
      .catch((error) => {
        console.error("[dashboard]", load.name, error?.status, error?.message, error?.response);
        setState({ status: "error", items: [] });
      });
  }, [load, userId]);
  useEffect(reload, [reload]);
  return [state, reload, setState];
}

// In the component:
const [registrations, reloadRegistrations] = useCollection(fetchRegistrations, userId);
const [papers, reloadPapers] = useCollection(fetchPapers, userId);
const [journals, reloadJournals] = useCollection(fetchJournalSubmissions, userId);
const [certificates, reloadCertificates, setCertificates] = useCollection(fetchCertificates, userId);
const [upcoming, reloadUpcoming] = useCollection(fetchUpcomingConferences, userId);
```

### 6.3 Views: overview or a single section (URL hash)
```js
const SECTIONS = [
  ["registrations", "My registrations", CalendarCheck],
  ["papers", "Paper submissions", FileText],
  ["journals", "Journal submissions", BookOpen],
  ["upcoming", "Upcoming conferences", Layers],
];
const VIEWS = new Set(SECTIONS.map(([id]) => id));
const viewFromHash = () => {
  const id = typeof window === "undefined" ? "" : window.location.hash.slice(1);
  return VIEWS.has(id) ? id : "overview";
};

function useView() {
  const [view, setView] = useState("overview");
  useEffect(() => {
    const sync = () => {
      setView(viewFromHash());
      window.scrollTo({ top: 0 });
    };
    setView(viewFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return view;
}
```

All navigation is plain `<a href="#papers">` links: the sidebar items, the four count tiles, each card's "View all N"
and the "← Overview" link (`#overview`). Define each section's card once as a function `cards.papers({ focused })`:

- the overview calls it **without** `focused`: the first 3–4 items, plus "View all N" when there are more;
- the single view calls it **with** `focused: true`: every item, wider grid, the card title becomes the page's `h1`,
  and an "← Overview" link replaces "View all".

On the single view, give the section **no `id`**, so the hash doesn't make the browser jump.

### 6.4 Layout (rebuild in the new style)
- **App shell.** Hide the site's header, footer and floating chat on `/dashboard` with a small client wrapper in the
  root layout:

  ```jsx
  "use client"
  import { usePathname } from "next/navigation"
  const APP_ROUTES = ["/dashboard"]
  export default function SiteChrome({ children }) {
    const pathname = usePathname() || ""
    if (APP_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))) return null
    return children
  }
  // layout.js: <SiteChrome><Header /></SiteChrome> {children} <SiteChrome><Footer /></SiteChrome> <SiteChrome><FloatingChat /></SiteChrome>
  ```

- **Sidebar.** On wide screens it's full height and sticky, and scrolls if the screen is short. On phones it becomes
  one horizontally scrolling row of links under the logo. Its parts, in order:
  - the logo;
  - **views**: Dashboard (`#overview`) and the four sections, with the open one highlighted and
    `aria-current="page"`;
  - **Conference**: real `<Link>`s to the site's own pages;
  - **Account**: Back to the website, Log out.

- **Top bar** (sticky): the open view's name, and the user's initial, name and email.
- **Overview:**
  1. A greeting with the first name, a sentence, the site's two main actions (Submit / Register), and **four count
     tiles** (icon, label, number, arrow) linking to each section. Counts show "…" while loading and "–" on error.
  2. **Quick access**: one tile per conference page (icon, title, one-line note). The ICSIFT set:
     ```js
     const QUICK = [
       ["/proceedings", "Proceedings", "Published papers from every edition", BookMarked],
       ["/speakers/keynote-speaker", "Speakers", "Keynote and invited speakers", Mic],
       ["/schedule", "Agenda", "Sessions, day by day", CalendarClock],
       ["/gallery", "Gallery", "Photos from past editions", Images],
     ];
     ```
     Change the paths to the new site's routes. The same list feeds the sidebar's Conference group.
  3. A **two-column board**: registrations and upcoming conferences on the left; papers and journal submissions on
     the right. It collapses to one column on narrow screens.
- **Single view:** only that section's card, full width, every item.

Also add a **"Dashboard" link** to the site header's signed-in account menu, and to the mobile menu.

### 6.5 Cards: content of each item
- **Registration:**
  - "Registered {date}" and a tag: *Registered*, or *Attended* after the end;
  - ticket name (large); the conference title;
  - date range (`spanLabel`), venue, `Order {order_id}`;
  - an action row: **Download invoice** (busy state "Preparing invoice…", error message on failure), and either the
    certificate button or the lock message (6.6);
  - if the certificate was rejected, show "A certificate request was declined." with the reason.
- **Paper / journal row:**
  - journal name as a small kicker (journals only); the title;
  - meta: paper type, presentation type, "Sent {date}" only when `created` exists;
  - a status tag, using `{ pending: "Under review", approve/approved/accepted: "Accepted", reject/rejected: "Not accepted" }`;
  - "Your uploaded file", linking to `fileUrl(record, file, { download: 1 })` (`file` may be an array, so take `[0]`).
- **Upcoming conference:**
  - the image (`fileUrl(conf, conf.img, { thumb: "640x360" })`; a plain `<img>`, or add the PocketBase host to
    `next.config` images);
  - a "This conference" badge when `id === zepConferenceId`;
  - short form, title, date, venue and format;
  - Website / Submit / Register links, shown only when each URL exists, opening in a new tab.

### 6.6 Certificate lock and auto-unlock (on the registration card)
```js
const conference = registration.expand?.conference;
const span = conferenceSpan(conference);
const [, setTick] = useState(0);
const ended = hasEnded(conference);

// Unlock by itself when the time comes, if the page is still open (timers cap at ~24 days).
useEffect(() => {
  if (!span || ended) return;
  const wait = span.closes.getTime() - Date.now() + 1000;
  if (wait > 2 ** 31 - 1) return;
  const timer = setTimeout(() => setTick((t) => t + 1), Math.max(wait, 0));
  return () => clearTimeout(timer);
}, [span?.closes.getTime(), ended]); // eslint-disable-line react-hooks/exhaustive-deps

// "4 Nov 2026, 22:30 GMT+5:30" in the visitor's own time zone.
const availableAt = (date) =>
  date.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
```
- **Locked:** "Your certificate opens here on **{availableAt(span.closes)}**, when the conference ends." Wrap the date
  in `<time dateTime>`.
- **Unlocked:** a button that reads **Download certificate** if a non-rejected certificate exists for this
  registration, otherwise **Generate certificate**. It opens the certificate panel. Disable it while certificates load.

### 6.7 Certificate panel (`CertificateDialog.jsx`)
A native `<dialog>` side panel (opened with `showModal()`, closed by Escape, a close button, or a backdrop click
unless busy). Props: `registration`, `papers`, `certificates`, `onClose`, `onIssued(record)`.

Contents: a header ("Check, then generate", plus a line saying the name prints exactly as typed), then a form column
and a preview column:

- **Name on the certificate**: text input, max 80 characters, prefilled from `registration.fullname` (falling back to
  the user's name), hint "Include any title you want shown, like Dr. or PhD.";
- **Certificate for**: two toggle buttons, *Participant* (`participation`) and *Presenter* (`presentation`).
  Presenter is disabled, with a note, when the user has no paper with a title for this conference. Default to
  Presenter when papers exist;
- **Paper presented**: a select of their paper titles, shown only for Presenter;
- an error area, the main button, and "Certificate no. … You can download it again at any time." once issued;
- **Preview**: a `<canvas role="img">` redrawn on every change with `drawCertificate(canvas, data, assets, 1)`.
  Show a skeleton while `loadCertificateAssets()` runs, and an error sentence if it fails.

The data and the generate step:

```js
const conference = registration?.expand?.conference;
const ownPapers = useMemo(
  () => papers.filter((p) => tidy(p.paper_title) && (!registration?.conference || p.conference === registration.conference)),
  [papers, registration],
);
const issued = registration ? certificates.find((c) => c.registration === registration.id && c.certificate_type === type) : null;
const paper = type === "presentation" ? ownPapers.find((p) => p.id === paperId) : null;

const data = registration && {
  name: tidy(name) || "Your name",
  role: type === "presentation" ? "Presenter" : "Participant",
  paperTitle: paper ? tidy(paper.paper_title) : "",
  conferenceTitle: tidy(conference?.title) || CONFERENCE.name.trim(),
  shortForm: tidy(conference?.short_form) || "<SHORT>",       // ADAPT
  dates: spanParts(conference),
  venue: tidy(conference?.Venue) || CONFERENCE.venue.location.trim(),
  cpdHours: conference?.cpd_accredited && conference?.cpd_hours ? conference.cpd_hours : null,
  certificateNo: issued?.certificate_no || "",
  verificationCode: issued?.verification_code || "",
};

const generate = async () => {
  if (!tidy(name)) return setNameError("Enter the name to print on the certificate.");
  if (type === "presentation" && !paper) return setError("Choose the paper you presented.");
  setBusy(true);
  setError("");
  try {
    let record = issued;
    if (!record) {
      try {
        record = await pb.collection("conf_certificates").create({
          user: user.id,
          registration: registration.id,
          certificate_type: type,
          status: "requested", // the create rule requires this
          generation_method: "template",
          issue_date: new Date().toISOString(),
          name_on_certificate: tidy(name),
          paper_title: paper ? tidy(paper.paper_title) : "",
        });
      } catch (createError) {
        // Already issued (unique per registration + type) but missing from the list: fetch it.
        record = await pb
          .collection("conf_certificates")
          .getFirstListItem(pb.filter("registration = {:r} && certificate_type = {:t}", { r: registration.id, t: type }), { requestKey: null })
          .catch(() => { throw createError; });
      }
      onIssued(record); // parent prepends it to `certificates` and reloads
    }
    if (record.status === "rejected") {
      setError(tidy(record.rejection_reason) || "This certificate was declined. Contact <support email> for details.");
      return;
    }
    const out = document.createElement("canvas");
    drawCertificate(out, { ...data, name: tidy(name), certificateNo: record.certificate_no, verificationCode: record.verification_code }, assets, 1.5);
    downloadCertificatePdf(out, { ...data, name: tidy(name) });
  } catch (e) {
    console.error("[certificate]", e?.response || e);
    setError("Your certificate could not be generated just now. Please try again, or contact <support email>.");
  } finally {
    setBusy(false);
  }
};
```

When the dialog opens for a registration, reset it: name from the registration, type Presenter if there are papers,
the first paper selected, errors cleared. Load the assets once, on first open.

---

## 7. Payment fixes (so registrations reach the dashboard)

The site's checkout (`/api/ccavenue/encrypt`) already verifies the signed-in user. Carry that user id through the
**signed** return URL, but not in the order sent to the gateway, then save the registration as an admin in the
callback.

**`src/app/api/ccavenue/encrypt/route.js`:**
```js
let userId = ""
if (body.kind === "ticket" || body.kind === "custom") {
  const { user } = await verifyZepUser(String(body.auth_token || ""))
  if (!user) return fail(401, "Your session has expired. Sign in again, then continue to payment.")
  userId = user.id
  // ...
}
// ...
// The account id travels only in the signed return URL (not to CCAvenue), so the saved registration shows on the dashboard.
const payload = JSON.stringify(userId ? { ...paymentData, user: userId } : paymentData)
const returnUrl = `${origin}/api/ccavenue/handle?paymentData=${encodeURIComponent(payload)}&sig=${signPayload(payload)}`
```

**`src/app/api/ccavenue/handle/route.js`:**
```js
import { CONFERENCE } from "@/constants/conference"

// conf_registration only accepts a create from its own user or an admin, and this callback arrives without the
// user's session. With ZEP_PB_ADMIN_EMAIL / ZEP_PB_ADMIN_PASSWORD set (a PocketBase superuser), it writes as admin.
async function signInAsAdmin() {
  const email = process.env.ZEP_PB_ADMIN_EMAIL
  const password = process.env.ZEP_PB_ADMIN_PASSWORD
  if (!email || !password || pb.authStore.isValid) return
  try {
    await pb.collection("_superusers").authWithPassword(email, password)
  } catch (error) {
    console.error("[ccavenue/handle] Admin sign-in failed:", error?.message)
  }
}

// inside POST, after the signature check and the duplicate check:
await signInAsAdmin()
await pb.collection("conf_registration").create({
  user: details.user || "",
  conference: details.user ? CONFERENCE.zepConferenceId : "",
  amount: Number(result.amount) || Number(details.amount) || 0,
  currency: details.currency || result.currency || "",
  fullname: details.billing_name || "",
  // ...the existing billing, ticket, order_id and payment_status fields
})
```

**Paper submission API:** write `conference: CONFERENCE.zepConferenceId` and `user: <verified user id>` on the
`conf_paper_submission_all` mirror. **Journal submission API:** write `user` on `paper_form_submission`.

---

## 8. Porting checklist

1. [ ] Find the site's `Conference` record id; set `zepConferenceId`, `scheduleDates.days`, `venue.utcOffset`.
2. [ ] Add the `certificate` and `issuer` constants; put the logos and signature images in `public/certificate/`
   (same origin).
3. [ ] Self-host fonts with `next/font/local`; point `pageFonts()` at the site's three font variables.
4. [ ] Copy `src/lib/dashboard.js`, `pdf.js`, `certificate.js` and `invoice.js`; change the colours and the
   **ADAPT** lines.
5. [ ] PocketBase: add `amount`, `currency`, `order_id` and `payment_status` to `conf_registration`, and
   `name_on_certificate` and `paper_title` to `conf_certificates`. Check the rules match section 3.
6. [ ] Set `ZEP_PB_ADMIN_EMAIL` / `ZEP_PB_ADMIN_PASSWORD`; apply the payment changes (section 7).
7. [ ] Make the paper and journal submission APIs write `user` (and `conference` for papers).
8. [ ] Build `/dashboard` (`page.jsx` with noindex metadata, `Content.jsx`, `CertificateDialog.jsx`) in the site's
   design system, following section 6. Add `SiteChrome` to the root layout.
9. [ ] Add "Dashboard" to the header's account menu and to the mobile menu.
10. [ ] Test with a real account:
    - [ ] each section loads;
    - [ ] the count tiles, "View all" and Back switch views;
    - [ ] the invoice downloads;
    - [ ] set the Conference `date` to a past day, then confirm "Generate certificate" appears and the PDF downloads
      with a certificate number;
    - [ ] set the date back afterwards.
11. [ ] Run `next build` before deploying.

---

## 9. Pitfalls already hit (don't repeat them)

| Symptom | Cause | Fix |
|---|---|---|
| Papers section errors; the console shows `[dashboard] {}` | `sort: "-created"` on `conf_paper_submission_all`, which has no `created` field → 400 | Don't sort on the server; `.reverse()` in the browser |
| Registration paid but not on the dashboard | Record has an empty `user` (the callback had no session), so the view rule hides it | Section 7; link old records by hand in the admin UI |
| Certificate still locked after changing the date | `date` is the **first** day; the conference lasts `scheduleDates.days.length` days and unlocks at midnight after the last day, venue time | The card shows the exact unlock time. To test, set the date two or more days in the past |
| Past-edition registration shows this year's dates | The site's single `Conference` record is edited for each edition | Known limitation; store edition dates on the registration if it matters |
| Build fails: `next/font` "Cannot read properties of null (reading '1')" | Google Fonts returned a font URL without a file extension to the build server | Self-host fonts with `next/font/local` (`src/fonts/*.woff2`) |
| PDF download throws a security error | A logo or signature loaded from another origin taints the canvas | Serve every certificate asset from `/public` |
| Certificate text in the wrong font | Canvas drew before web fonts loaded, or the CSS variable names differ | `pageFonts()` waits on `document.fonts.load`; check the variable names |
| Requests cancelled when several lists load at once | PocketBase SDK auto-cancellation | Pass `requestKey: null` (the `opts()` helper) |
| Anyone can print any name with a valid number | Name and paper aren't stored unless the fields exist | Add `name_on_certificate` and `paper_title` to `conf_certificates` |
| Street address missing from the invoice | The registration field is spelled `adress` (one d) | Read `registration.adress`, not `address` |
