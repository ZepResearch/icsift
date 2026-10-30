import { ChevronDown } from "lucide-react";

// Form building blocks for the Herbarium system: label above, hint or error below, square .herb-input fields.

export const describedBy = (id, error, hasHint) => (error ? `${id}-error` : hasHint ? `${id}-hint` : undefined);

export function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15px]">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[14px] font-medium">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="herb-muted mt-1.5 text-[14px]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Select({ id, options, placeholder, error }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required
        defaultValue=""
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className="herb-input appearance-none pr-10"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" strokeWidth={1.6} />
    </div>
  );
}

// Hidden from people and assistive tech; bots tend to fill it. The API discards submissions that do.
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormAlert({ children }) {
  if (!children) return null;
  return (
    <div role="alert" className="bg-[var(--rule-soft)] px-4 py-3 text-[16px]">
      <strong className="font-semibold">Not submitted. </strong>
      {children}
    </div>
  );
}
