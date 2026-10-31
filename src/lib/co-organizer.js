import { clean, validateText } from "@/lib/paper-submission";

// The co-organiser application: one definition shared by the form (instant feedback) and the API route (the real check).

export const INSTITUTION_TYPES = [
  "University / College",
  "Research institute",
  "Government body",
  "NGO / association",
  "Company",
  "Other",
];

export const EDITIONS = ["4th ICSIFT (current)", "A future edition", "Not sure yet"];

export const CONTRIBUTIONS = [
  "Host or venue support",
  "Bring presenters and delegates",
  "Reviewers or committee members",
  "Promotion to your network",
  "Joint publication",
  "Other",
];

// [name, label, max length, required]. `email` and `phone_number` get format checks in validateText.
export const TEXT_FIELDS = [
  ["institution", "Institution name", 200, true],
  ["country", "Country", 100, true],
  ["city", "City", 100, false],
  ["institution_website", "Institution website", 300, false],
  ["contact_name", "Full name", 120, true],
  ["position", "Position or designation", 150, true],
  ["email", "Email", 254, true],
  ["phone_number", "Phone number", 32, true],
  ["message", "Message", 3000, true],
];

export const MAX_FIELD = Object.fromEntries(TEXT_FIELDS.map(([name, , max]) => [name, max]));

// Only http(s) addresses with a real host; anything else (javascript:, data:, bare words) is refused.
function websiteProblem(value) {
  if (!value) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) throw new Error("bad");
    return null;
  } catch {
    return "Enter a website address, like www.university.edu.";
  }
}

// Validates and cleans one application. Returns { values, errors }; each error names the fix.
// `contributions` may arrive as an array (JSON) or a single string.
export function validateCoOrganizer(input = {}) {
  const { values, errors } = validateText(input, TEXT_FIELDS);

  const urlProblem = websiteProblem(values.institution_website);
  if (urlProblem) errors.institution_website = urlProblem;

  values.institution_type = clean(input.institution_type);
  if (!INSTITUTION_TYPES.includes(values.institution_type)) errors.institution_type = "Choose the type of institution.";

  values.edition = clean(input.edition);
  if (!EDITIONS.includes(values.edition)) errors.edition = "Choose the edition you are interested in.";

  const raw = Array.isArray(input.contributions) ? input.contributions : input.contributions ? [input.contributions] : [];
  // Keep only known options, once each, in the list's own order: nothing free-form reaches the email from here.
  values.contributions = CONTRIBUTIONS.filter((option) => raw.map(clean).includes(option));
  if (!values.contributions.length) errors.contributions = "Choose at least one way you would like to contribute.";

  return { values, errors };
}
