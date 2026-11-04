import pb from "@/lib/zep-pocketbase";
import { CONFERENCE } from "@/constants/conference";
import { AUDIENCES, MODES, REGISTRATION, TAX_RATE, withTax } from "@/lib/pricing";

// Reads for the signed-in user's dashboard, all from the Zep Research PocketBase. The collection rules already limit
// each list to the user's own records; the filters below say so explicitly and narrow to ICSIFT where asked.

const opts = (extra) => ({ requestKey: null, ...extra });

// Registrations saved before the checkout linked a conference have it empty; they were made on this site, so they
// count as ICSIFT and get the ICSIFT record attached for dates and certificates.
export async function fetchRegistrations(userId) {
  const items = await pb.collection("conf_registration").getFullList(
    opts({
      filter: pb.filter("user = {:user} && (conference = {:conf} || conference = '')", { user: userId, conf: CONFERENCE.zepConferenceId }),
      sort: "-created",
      expand: "conference",
    }),
  );
  if (items.every((r) => r.expand?.conference)) return items;
  const icsift = await pb.collection("Conference").getOne(CONFERENCE.zepConferenceId, opts()).catch(() => null);
  return items.map((r) => (r.expand?.conference || !icsift ? r : { ...r, expand: { ...r.expand, conference: icsift } }));
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

// The ICSIFT record in PocketBase holds only the first day; the length comes from the constants.
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
