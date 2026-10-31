"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowRight, Check, X } from "lucide-react";
import { Field, FormAlert, Honeypot, Select, describedBy } from "@/components/forms/herb-fields";
import { CONTRIBUTIONS, EDITIONS, INSTITUTION_TYPES, MAX_FIELD, validateCoOrganizer } from "@/lib/co-organizer";

const HASH = "#apply";
const RECAPTCHA_BYPASS_TOKEN = "localhost-bypass";

function TextInput({ id, label, error, hint, type = "text", required = true, autoComplete }) {
  return (
    <Field id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        maxLength={MAX_FIELD[id]}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, Boolean(hint))}
        className="herb-input"
      />
    </Field>
  );
}

// The application panel. It opens whenever the address ends in #apply, so any link on the page ("Become a
// co-organiser") can open it, even from server-rendered markup; closing it clears the hash.
export default function CoOrganizerForm() {
  const dialog = useRef(null);
  const recaptchaRef = useRef(null);
  const startedAt = useRef(0);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState();
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const isLocalDev =
    typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  const sync = useCallback(() => setOpen(window.location.hash === HASH), []);

  useEffect(() => {
    sync();
    // Next.js links change the hash without a hashchange event, so clicks on any #apply link open the panel too.
    const onClick = (event) => {
      const link = event.target.closest?.('a[href$="#apply"]');
      if (link && link.pathname === window.location.pathname) setOpen(true);
    };
    window.addEventListener("hashchange", sync);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", onClick);
    };
  }, [sync]);

  useEffect(() => {
    if (open) {
      startedAt.current = Date.now();
      if (!dialog.current?.open) dialog.current?.showModal();
    } else if (dialog.current?.open) {
      dialog.current.close();
    }
  }, [open]);

  const onClose = () => {
    setOpen(false);
    setSent(false);
    setErrors({});
    setFormError(null);
    setPhone(undefined);
    if (window.location.hash === HASH) history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  const showErrors = (next, message) => {
    setErrors(next);
    setFormError(message);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(first === "contributions" ? "contrib-0" : first)?.focus();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;
    const data = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(data.entries()),
      phone_number: phone || "",
      contributions: data.getAll("contributions"),
      started_at: startedAt.current,
    };

    // Instant feedback with the same rules the server enforces.
    const { errors: found } = validateCoOrganizer(payload);
    if (!isLocalDev && !token) found.recaptcha = "Tick the reCAPTCHA box to show you are not a robot.";
    if (Object.keys(found).length) {
      showErrors(found, "Some fields need attention. Each one is marked below.");
      return;
    }

    setSending(true);
    setErrors({});
    setFormError(null);
    try {
      const response = await fetch("/api/co-organizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, recaptcha_token: isLocalDev ? RECAPTCHA_BYPASS_TOKEN : token }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        showErrors(result.errors || {}, result.message || "Your application could not be sent. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setFormError("The connection dropped before your application was sent. Check your internet and try again.");
    } finally {
      recaptchaRef.current?.reset();
      setToken(null);
      setSending(false);
    }
  };

  const err = (name) => errors[name];

  return (
    <dialog
      ref={dialog}
      className="sig herb-dialog !max-w-[100vw] !w-screen sm:!w-[min(640px,100vw)]"
      aria-labelledby="apply-title"
      onClose={onClose}
      onClick={(event) => event.target === dialog.current && !sending && dialog.current.close()}
    >
      {open ? (
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="sig-forest px-6 pt-6 pb-8 sm:px-8">
            <div className="flex items-start justify-between gap-6">
              <p className="sig-tag text-[22px]">Co-organiser application</p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                disabled={sending}
                className="grid h-11 w-11 shrink-0 place-items-center bg-[var(--signal)] text-[var(--forest)] hover:bg-[var(--signal-deep)]"
                aria-label="Close the application"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <h2 id="apply-title" className="sig-display mt-6 text-[clamp(2.2rem,1.8rem+1.6vw,3.2rem)]">
              {sent ? "Application sent" : "Become a co-organiser"}
            </h2>
            <p className="mt-3 text-[16.5px] text-[var(--muted)]">
              {sent
                ? "Thank you. We have emailed you a copy, and the team will reply within a few working days."
                : "Tell us about your institution and how you would like to take part. Every field is needed except those marked optional."}
            </p>
          </div>

          <div className="flex-1 px-6 pt-6 pb-10 sm:px-8">
            {sent ? (
              <div className="grid gap-6">
                <p className="flex items-center gap-3 bg-[var(--cream-deep)] px-5 py-4 text-[17px]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center bg-[var(--forest)] text-[var(--signal)]">
                    <Check className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  Your application has reached the ICSIFT team.
                </p>
                <button type="button" onClick={() => dialog.current?.close()} className="sig-btn w-full sm:max-w-[18rem]" data-dark="">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-6" aria-busy={sending}>
                <FormAlert>{formError}</FormAlert>
                <Honeypot />

                <h3 className="sig-display text-[clamp(1.5rem,1.25rem+0.7vw,1.9rem)]">The institution</h3>
                <TextInput id="institution" label="Institution name" error={err("institution")} autoComplete="organization" />
                <Field id="institution_type" label="Type of institution" error={err("institution_type")}>
                  <Select
                    id="institution_type"
                    placeholder="Choose one"
                    options={INSTITUTION_TYPES.map((t) => [t, t])}
                    error={err("institution_type")}
                  />
                </Field>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput id="country" label="Country" error={err("country")} autoComplete="country-name" />
                  <TextInput id="city" label="City (optional)" error={err("city")} required={false} autoComplete="address-level2" />
                </div>
                <TextInput
                  id="institution_website"
                  label="Institution website (optional)"
                  type="url"
                  required={false}
                  error={err("institution_website")}
                  hint="For example www.university.edu"
                  autoComplete="url"
                />

                <h3 className="sig-display mt-4 text-[clamp(1.5rem,1.25rem+0.7vw,1.9rem)]">Contact person</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput id="contact_name" label="Full name" error={err("contact_name")} autoComplete="name" />
                  <TextInput
                    id="position"
                    label="Position or designation"
                    error={err("position")}
                    hint="For example Dean or Research Director"
                    autoComplete="organization-title"
                  />
                  <TextInput id="email" label="Email" type="email" error={err("email")} hint="We reply to this address." autoComplete="email" />
                  <Field id="phone_number" label="Phone number" error={err("phone_number")} hint="With country code.">
                    <PhoneInput
                      id="phone_number"
                      international
                      defaultCountry="PH"
                      value={phone}
                      onChange={setPhone}
                      aria-invalid={Boolean(err("phone_number"))}
                      className="herb-input"
                    />
                  </Field>
                </div>

                <h3 className="sig-display mt-4 text-[clamp(1.5rem,1.25rem+0.7vw,1.9rem)]">The partnership</h3>
                <Field id="edition" label="Edition you are interested in" error={err("edition")}>
                  <Select id="edition" placeholder="Choose one" options={EDITIONS.map((e) => [e, e])} error={err("edition")} />
                </Field>

                <fieldset aria-describedby={err("contributions") ? "contributions-error" : undefined}>
                  <legend className="text-[15px]">How you would like to contribute</legend>
                  <p className="mt-1 text-[14.5px] text-[var(--bark-2)]">Choose all that apply.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CONTRIBUTIONS.map((option, index) => (
                      <label
                        key={option}
                        className="sig-chip cursor-pointer !font-[family-name:var(--font-body)] !text-[15.5px] !font-semibold !normal-case has-[:checked]:bg-[var(--forest)] has-[:checked]:text-[var(--signal)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--forest)]"
                      >
                        <input id={`contrib-${index}`} type="checkbox" name="contributions" value={option} className="sr-only" />
                        {option}
                      </label>
                    ))}
                  </div>
                  {err("contributions") ? (
                    <p id="contributions-error" className="mt-1.5 text-[14px] font-medium">
                      {err("contributions")}
                    </p>
                  ) : null}
                </fieldset>

                <Field id="message" label="Message" error={err("message")} hint="Your interest, research areas and any questions.">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    maxLength={MAX_FIELD.message}
                    aria-invalid={Boolean(err("message"))}
                    aria-describedby={describedBy("message", err("message"), true)}
                    className="herb-input resize-y"
                  />
                </Field>

                <div className="grid gap-5 sm:bg-[var(--cream-deep)] sm:p-6">
                  {isLocalDev ? (
                    <p className="text-[14.5px] text-[var(--bark-2)]">reCAPTCHA is skipped on localhost.</p>
                  ) : (
                    <div>
                      <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setToken} />
                      {err("recaptcha") ? <p className="mt-1.5 text-[14px] font-medium">{err("recaptcha")}</p> : null}
                    </div>
                  )}
                  <button type="submit" disabled={sending} className="sig-btn w-full disabled:cursor-wait disabled:opacity-70" data-dark="">
                    <span>{sending ? "Sending…" : "Send application"}</span>
                    <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
                  </button>
                  <p className="text-[14.5px] text-[var(--bark-2)]">We use these details only to review your application and reply to you.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
