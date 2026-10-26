import { clean } from "@/lib/paper-submission";

// Billing fields collected before handing off to CCAvenue: [name, label, max length, autocomplete].
// Shared by the checkout panel (instant feedback) and /api/ccavenue/encrypt (enforcement).
export const BILLING_FIELDS = [
  ["billing_name", "Full name", 100, "name"],
  ["billing_email", "Email", 254, "email"],
  ["billing_organization", "Organization", 150, "organization"],
  ["billing_designation", "Designation", 100, "organization-title"],
  ["billing_address", "Address", 250, "street-address"],
  ["billing_city", "City", 80, "address-level2"],
  ["billing_state", "State or province", 80, "address-level1"],
  ["billing_zip", "Postal code", 20, "postal-code"],
  ["billing_country", "Country", 80, "country-name"],
  ["billing_tel", "Phone number", 32, "tel"],
];

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE = /^\+?[0-9 ()\-.]{6,32}$/;

export function validateBilling(input) {
  const values = {};
  const errors = {};
  for (const [name, label, max] of BILLING_FIELDS) {
    const value = clean(input?.[name]);
    values[name] = value;
    if (!value) errors[name] = `Enter your ${label.toLowerCase()}.`;
    else if (value.length > max) errors[name] = `${label} must be ${max} characters or fewer.`;
  }
  if (values.billing_email && !errors.billing_email && !EMAIL.test(values.billing_email))
    errors.billing_email = "Enter a valid email address, like name@university.edu.";
  if (values.billing_tel && !errors.billing_tel && !PHONE.test(values.billing_tel))
    errors.billing_tel = "Enter a phone number with its country code, like +66 2 123 4567.";
  return { values, errors };
}
