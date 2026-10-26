// Single source of truth for every price the site charges. The registration and sponsorship pages read it
// to display fees; /api/ccavenue/encrypt reads it to compute what is actually charged, so a price shown
// in the browser can never be altered on its way to the payment gateway.

// Toggle to show or hide Early Bird pricing everywhere (display and checkout).
export const EARLY_BIRD_ACTIVE = true;

export const TAX_RATE = 0.06;
export const CURRENCY = "USD";
export const CUSTOM_MIN = 1;
export const CUSTOM_MAX = 10000;

export const PLANS = [
  ["noAccommodation", "Without accommodation"],
  ["withAccommodation", "With accommodation"],
];
export const PARTICIPANTS = [
  ["local", "Local"],
  ["international", "International"],
];
export const PRICE_TYPES = [
  ["earlyBird", "Early Bird"],
  ["physical", "Physical"],
  ["virtual", "Virtual"],
];

const ACADEMIC = ["Full conference access", "Workshop materials", "Lunch and refreshments", "Certificate of participation"];

// [category, physical, virtual|null, earlyBird, features]
const rows = (data) =>
  data.map(([category, physical, virtual, earlyBird, features]) => ({
    category,
    prices: { physical, ...(virtual ? { virtual } : {}), earlyBird },
    features,
  }));

export const REGISTRATION = {
  noAccommodation: {
    local: rows([
      ["Academician", 249, 169, 199, ["Full conference access", "Networking opportunities", "Workshop materials", "Lunch and refreshments", "Certificate of participation", "Access to presentation materials"]],
      ["Student", 199, 129, 159, ["Conference access", "Networking opportunities", "Workshop materials", "Lunch and refreshments", "Certificate of participation", "Student discount applied"]],
      ["Delegate", 169, 79, 159, ["Conference access", "Networking opportunities", "Lunch and refreshments", "Certificate of attendance", "Access to presentation materials"]],
      ["With Scopus Q3 & Q4", 1049, 949, 999, ["Full conference access", "Scopus Q3 & Q4 publication", "Premium networking opportunities", "Workshop materials", "Certificate of participation", "Priority presentation slot"]],
      ["With Scopus Q1 & Q2", 1749, 1649, 1699, ["Full conference access", "Scopus Q1 & Q2 publication", "Premium networking opportunities", "Workshop materials", "Certificate of participation", "Priority presentation slot"]],
    ]),
    international: rows([
      ["Academician", 299, 229, 249, ["Full conference access", "International networking", "Workshop materials", "Lunch and refreshments", "Certificate of participation", "Access to presentation materials"]],
      ["Student", 249, 169, 219, ["Conference access", "International networking", "Workshop materials", "Lunch and refreshments", "Certificate of participation", "Student discount applied"]],
      ["Delegate", 219, 129, 199, ["Conference access", "International networking", "Lunch and refreshments", "Certificate of attendance", "Access to presentation materials"]],
      ["With Scopus Q3 & Q4", 1099, 999, 1049, ["Full conference access", "Scopus Q3 & Q4 publication", "Premium international networking", "Workshop materials", "Certificate of participation", "Priority presentation slot"]],
      ["With Scopus Q1 & Q2", 1799, 1699, 1749, ["Full conference access", "Scopus Q1 & Q2 publication", "Premium international networking", "Workshop materials", "Certificate of participation", "Priority presentation slot"]],
    ]),
  },
  withAccommodation: {
    local: rows([
      ["Academician", 399, null, 349, ["Full conference access", "Accommodation included", "Networking opportunities", ...ACADEMIC.slice(1)]],
      ["Student", 349, null, 299, ["Conference access", "Accommodation included", "Networking opportunities", ...ACADEMIC.slice(1)]],
      ["Delegate", 319, null, 279, ["Conference access", "Accommodation included", "Networking opportunities", "Lunch and refreshments", "Certificate of attendance"]],
      ["With Scopus Q3 & Q4", 1199, null, 1149, ["Full conference access", "Accommodation included", "Scopus Q3 & Q4 publication", "Premium networking opportunities", "Workshop materials", "Priority presentation slot"]],
      ["With Scopus Q1 & Q2", 1899, null, 1849, ["Full conference access", "Accommodation included", "Scopus Q1 & Q2 publication", "Premium networking opportunities", "Workshop materials", "Priority presentation slot"]],
    ]),
    international: rows([
      ["Academician", 449, null, 399, ["Full conference access", "Accommodation included", "International networking", ...ACADEMIC.slice(1)]],
      ["Student", 399, null, 349, ["Conference access", "Accommodation included", "International networking", ...ACADEMIC.slice(1)]],
      ["Delegate", 349, null, 299, ["Conference access", "Accommodation included", "International networking", "Lunch and refreshments", "Certificate of attendance"]],
      ["With Scopus Q3 & Q4", 1299, null, 1249, ["Full conference access", "Accommodation included", "Scopus Q3 & Q4 publication", "Premium international networking", "Workshop materials", "Priority presentation slot"]],
      ["With Scopus Q1 & Q2", 1949, null, 1899, ["Full conference access", "Accommodation included", "Scopus Q1 & Q2 publication", "Premium international networking", "Workshop materials", "Priority presentation slot"]],
    ]),
  },
};

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

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const round2 = (n) => Math.round(n * 100) / 100;

export const withTax = (price) => {
  const taxAmount = round2(price * TAX_RATE);
  return { price, taxAmount, totalAmount: round2(price + taxAmount) };
};

export const ticketKey = (plan, participant, category, priceType) => [plan, participant, slug(category), priceType].join(":");

// Resolves a ticket key to its name and price, or null if it does not exist or is not on sale.
export function resolveTicket(key) {
  const [plan, participant, categorySlug, priceType] = String(key || "").split(":");
  const row = REGISTRATION[plan]?.[participant]?.find((r) => slug(r.category) === categorySlug);
  const price = row?.prices[priceType];
  if (!row || !price || (priceType === "earlyBird" && !EARLY_BIRD_ACTIVE)) return null;
  const priceName = PRICE_TYPES.find(([value]) => value === priceType)[1];
  const participantName = PARTICIPANTS.find(([value]) => value === participant)[1];
  return {
    key,
    name: `${row.category} - ${participantName} (${priceName})`,
    category: row.category,
    type: row.category,
    plan,
    participant,
    priceType,
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
