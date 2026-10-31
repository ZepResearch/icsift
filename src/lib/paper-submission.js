// Shared rules for the paper submission forms. The client uses them for instant feedback;
// the API routes enforce them again, because anything checked only in the browser can be bypassed.

export const PAPER_TYPES = ["Abstract", "Full Paper"];
export const PRESENTATION_TYPES = [
  ["Oral", "Oral presentation (in person)"],
  ["Virtual", "Virtual presentation (online)"],
  // ["Poster", "Poster presentation"],
];
export const HEARD_FROM = [
  ["Conference Alerts", "Conference Alerts"],
  ["Email", "Email"],
  ["Friend or Colleague or Supervisor", "Friend, colleague or supervisor"],
  ["Facebook", "Facebook"],
  ["Google Search", "Google Search"],
  ["Eventbit", "Eventbit"],
  ["Linkdin", "LinkedIn"],
  ["Others", "Others"],
];

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const FILE_EXTENSIONS = [".doc", ".docx"];
export const JOURNAL_FILE_EXTENSIONS = [".pdf", ".doc", ".docx"];

// Text fields: [name, label, max length, required]
export const TEXT_FIELDS = [
  ["author", "Author name", 120, true],
  ["email", "Email", 254, true],
  ["phone_number", "Phone number", 32, true],
  ["country", "Country", 80, true],
  ["co_author", "Co-author(s)", 500, true],
  ["paper_title", "Paper title", 300, true],
  ["department", "Department", 150, true],
  ["organization", "Organization", 200, true],
  ["message", "Additional message", 3000, true],
];

// Journal submissions: co-authors and message are optional.
export const JOURNAL_TEXT_FIELDS = TEXT_FIELDS.map(([name, label, max, required]) => [
  name,
  label,
  max,
  name === "co_author" || name === "message" ? false : required,
]);

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE = /^\+?[0-9 ()\-.]{6,32}$/;

// Removes control characters (keeps newlines and tabs) and trims.
export const clean = (value) =>
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim() : "";

const listExtensions = (extensions) => {
  const names = extensions.map((ext) => ext.slice(1).toUpperCase());
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} or ${names.at(-1)}` : names[0];
};

export function fileProblem(file, extensions = FILE_EXTENSIONS) {
  if (!file || !file.size) return "Choose your paper file to upload.";
  const name = (file.name || "").toLowerCase();
  if (!extensions.some((ext) => name.endsWith(ext))) return `Upload a ${listExtensions(extensions)} file.`;
  if (file.size > MAX_FILE_BYTES) return "The file is larger than 10 MB. Compress images in the document and try again.";
  return null;
}

// Validates and cleans the text fields. Returns { values, errors }; errors name the fix.
export function validateText(input, fields) {
  const values = {};
  const errors = {};

  for (const [name, label, max, required] of fields) {
    const value = clean(input[name]);
    values[name] = value;
    if (required && !value) errors[name] = `Enter your ${label.toLowerCase()}.`;
    else if (value.length > max) errors[name] = `${label} must be ${max} characters or fewer.`;
  }

  if (values.email && !errors.email && !EMAIL.test(values.email)) errors.email = "Enter a valid email address, like name@university.edu.";
  if (values.phone_number && !errors.phone_number && !PHONE.test(values.phone_number))
    errors.phone_number = "Enter a phone number with its country code.";

  return { values, errors };
}

// The conference paper form: text fields plus three fixed choices.
export function validateSubmission(input) {
  const { values, errors } = validateText(input, TEXT_FIELDS);

  values.paper_type = clean(input.paper_type);
  if (!PAPER_TYPES.includes(values.paper_type)) errors.paper_type = "Choose a paper type.";

  values.presentation_type = clean(input.presentation_type);
  if (!PRESENTATION_TYPES.some(([v]) => v === values.presentation_type)) errors.presentation_type = "Choose a presentation type.";

  values.know_to_you = clean(input.know_to_you);
  if (!HEARD_FROM.some(([v]) => v === values.know_to_you)) errors.know_to_you = "Tell us how you heard about the conference.";

  return { values, errors };
}

export const validateJournalSubmission = (input) => validateText(input, JOURNAL_TEXT_FIELDS);
