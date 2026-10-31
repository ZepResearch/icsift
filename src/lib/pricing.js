// Single source of truth for every price the site charges. The registration and sponsorship pages read it
// to display fees; /api/ccavenue/encrypt reads it to compute what is actually charged, so a price shown
// in the browser can never be altered on its way to the payment gateway.

// Toggle to show or hide Early Bird pricing everywhere (display and checkout).
export const EARLY_BIRD_ACTIVE = true;

export const TAX_RATE = 0.06;
export const CURRENCY = "USD";
export const CUSTOM_MIN = 1;
export const CUSTOM_MAX = 10000;

// The one switch on the registration page, and the two price columns.
export const MODES = [
  ["physical", "Physical"],
  ["virtual", "Virtual"],
];
export const AUDIENCES = [
  ["academician", "Academician"],
  ["student", "Student"],
];

const PHYSICAL = ["Full conference access", "Networking opportunities", "Workshop materials", "Lunch and refreshments", "Certificate of participation", "Access to presentation materials"];
const VIRTUAL = ["Online access to all sessions", "Workshop materials", "Certificate of participation", "Access to presentation materials"];
const SCOPUS = (band) => [`Scopus ${band} publication`, "Priority presentation slot"];

// [id, category, early bird?, academician price, student price, features]
const rows = (data) =>
  data.map(([id, category, earlyBird, academician, student, features]) => ({
    id,
    category,
    earlyBird,
    prices: { academician, student },
    features,
  }));

// Prices in US dollars, before tax. Rows marked early bird are hidden, and refused at checkout, when EARLY_BIRD_ACTIVE is false.
export const REGISTRATION = {
  physical: rows([
    ["regular", "Regular Registration", false, 299, 249, PHYSICAL],
    ["early-bird", "Early Bird", true, 249, 219, PHYSICAL],
    ["scopus-q1-q2", "Scopus Q1/Q2", false, 1799, 1699, [...PHYSICAL, ...SCOPUS("Q1/Q2")]],
    ["scopus-q1-q2-early-bird", "Scopus Q1/Q2 Early Bird", true, 1749, 1649, [...PHYSICAL, ...SCOPUS("Q1/Q2")]],
    ["scopus-q3-q4", "Scopus Q3/Q4", false, 1099, 999, [...PHYSICAL, ...SCOPUS("Q3/Q4")]],
    ["scopus-q3-q4-early-bird", "Scopus Q3/Q4 Early Bird", true, 1049, 949, [...PHYSICAL, ...SCOPUS("Q3/Q4")]],
  ]),
  virtual: rows([
    ["regular", "Regular Registration", false, 199, 169, VIRTUAL],
    ["early-bird", "Early Bird", true, 169, 149, VIRTUAL],
    ["scopus-q1-q2", "Scopus Q1/Q2", false, 1749, 1649, [...VIRTUAL, ...SCOPUS("Q1/Q2")]],
    ["scopus-q1-q2-early-bird", "Scopus Q1/Q2 Early Bird", true, 1699, 1599, [...VIRTUAL, ...SCOPUS("Q1/Q2")]],
    ["scopus-q3-q4", "Scopus Q3/Q4", false, 1049, 949, [...VIRTUAL, ...SCOPUS("Q3/Q4")]],
    ["scopus-q3-q4-early-bird", "Scopus Q3/Q4 Early Bird", true, 999, 899, [...VIRTUAL, ...SCOPUS("Q3/Q4")]],
  ]),
};

// The rows on sale for a mode right now.
export const rowsFor = (mode) => (REGISTRATION[mode] || []).filter((row) => EARLY_BIRD_ACTIVE || !row.earlyBird);

export const SPONSOR_PACKAGES = [
  {
    title: "Platinum",
    price: 6000,
    benefits: [
      "1 VIP participating in the conference",
      "Complimentary registration for 6 students and 2 faculty",
      "Stage honour for the sponsor party",
      "Full-page ad in the conference proceedings book",
      "Brand carried across the website and all promotional activities",
      "Event called by title sponsor",
      "Networking with delegates",
      "Media coverage",
      "2 feedback video bites featured on the YouTube channel",
    ],
  },
  {
    title: "Diamond",
    price: 4000,
    benefits: [
      "1 session chair from the sponsor side",
      "Complimentary registration for 5 students",
      "Full-page ad in the conference proceedings book",
      "Brand carried across the website and all promotional activities",
      "Public announcement recognising the sponsor",
      "Networking with delegates",
      "Logo used on all website activities and campaigns",
      "5-minute slot for media coverage",
      "1 feedback video featured on the YouTube channel",
    ],
  },
  {
    title: "Gold",
    price: 2000,
    benefits: [
      "Complimentary registration for 3 students",
      "Full-page ad in the conference proceedings",
      "Recognition of the sponsor during the valedictory",
      "Logo used in all promotional materials",
      "One anchor can join from the sponsor side",
      "Networking with delegates",
      "A sponsor standee at the registration desk",
    ],
  },
  {
    title: "Silver",
    price: 1000,
    benefits: [
      "Complimentary registration for 1 student",
      "2 volunteers at the registration desk from the sponsor side",
      "Half-page ad in the conference proceedings book",
      "Brand carried in selected promotional activities",
      "Networking with delegates",
      "Print media coverage",
    ],
  },
];

const round2 = (n) => Math.round(n * 100) / 100;

export const withTax = (price) => {
  const taxAmount = round2(price * TAX_RATE);
  return { price, taxAmount, totalAmount: round2(price + taxAmount) };
};

export const ticketKey = (mode, rowId, audience) => [mode, rowId, audience].join(":");

// Resolves a ticket key ("physical:scopus-q1-q2:student") to its name and price, or null if it does not exist or is
// not on sale. The payment route charges only what this returns, never a price sent by the browser.
export function resolveTicket(key) {
  const [mode, rowId, audience] = String(key || "").split(":");
  const row = rowsFor(mode).find((r) => r.id === rowId);
  const price = row?.prices[audience];
  if (!row || !price) return null;
  const modeName = MODES.find(([value]) => value === mode)[1];
  const audienceName = AUDIENCES.find(([value]) => value === audience)[1];
  return {
    key,
    name: `${row.category} - ${audienceName} (${modeName})`,
    category: row.category,
    type: audienceName,
    mode,
    audience,
    currency: CURRENCY,
    ...withTax(price),
  };
}

export const resolveSponsor = (title) => SPONSOR_PACKAGES.find((p) => p.title === title) || null;

// Custom amounts: a positive number with at most two decimals, within bounds.
export function customAmountProblem(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || !/^\d+(\.\d{1,2})?$/.test(String(value).trim())) return "Enter an amount in US dollars, like 150 or 150.50.";
  if (amount < CUSTOM_MIN) return `Enter at least $${CUSTOM_MIN}.`;
  if (amount > CUSTOM_MAX) return `For amounts over $${CUSTOM_MAX.toLocaleString()}, contact info@icsift.com.`;
  return null;
}

export const money = (n) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;
