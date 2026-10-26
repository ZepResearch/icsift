"use client";

import { useRef, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowUpRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { AccessionLabel } from "@/components/home/primitives";

const EMPTY = { name: "", email: "", subject: "", message: "" };

const SOCIAL = [
  ["Facebook", "https://www.facebook.com/profile.php?id=61561809783777"],
  ["Instagram", "https://www.instagram.com/zepresearch/"],
  ["LinkedIn", "https://www.linkedin.com/company/zep-research/"],
  ["YouTube", "https://www.youtube.com/@Zepresearch"],
  ["Zep Research", "https://www.zepresearch.com/"],
];

function Field({ id, label, hint, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15px]">
        {label}
        {required ? <span className="herb-italic text-[var(--ink-2)]"> (required)</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? <p className="herb-muted mt-1.5 text-[14px]">{hint}</p> : null}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [phoneNumber, setPhoneNumber] = useState();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const resetCaptcha = () => {
    recaptchaRef.current?.reset();
    setRecaptchaToken(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!recaptchaToken) {
      setStatus("error");
      setErrorMessage("Please tick the reCAPTCHA box above the button, then send again.");
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phoneNumber, recaptchaToken }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The message could not be sent.");
      setStatus("success");
      setForm(EMPTY);
      setPhoneNumber(undefined);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        `${error instanceof Error ? error.message : "The message could not be sent."} Please try again, or write to info@icsift.com.`,
      );
    } finally {
      resetCaptcha();
      setSubmitting(false);
    }
  };

  return (
    <main className="herb min-h-screen">
      {/* One sheet: title across the top, the form in the left 60%, direct lines in the right rail. */}
      <section aria-labelledby="contact-title" className="px-3 pt-3 pb-16 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8 lg:pb-24">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-6 border-b border-[var(--ink)] pb-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 id="contact-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Write to the team.
            </h1>
            <p className="herb-muted max-w-[30rem] text-[17.5px] leading-relaxed">
              Questions about the {CONFERENCE.shortForm}, submissions, registration or partnering? We reply by email.
            </p>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
            <form onSubmit={onSubmit} className="grid gap-6">
              {status === "success" ? (
                <p role="status" className="border border-[var(--ink)] px-4 py-3 text-[16px]">
                  <strong className="font-semibold">Message sent. </strong>
                  Thank you; we will get back to you as soon as we can.
                </p>
              ) : null}
              {status === "error" ? (
                <p role="alert" className="border border-[var(--ink)] px-4 py-3 text-[16px]">
                  <strong className="font-semibold">Not sent. </strong>
                  {errorMessage}
                </p>
              ) : null}

              <div className="grid gap-6 md:grid-cols-2">
                <Field id="name" label="Your name" required>
                  <input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={onChange} className="herb-input" />
                </Field>
                <Field id="email" label="Email" required hint="We reply to this address.">
                  <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={onChange} className="herb-input" />
                </Field>
                <Field id="phoneNumber" label="Phone" hint="Optional, with country code.">
                  <PhoneInput id="phoneNumber" international defaultCountry="TH" value={phoneNumber} onChange={setPhoneNumber} className="herb-input" />
                </Field>
                <Field id="subject" label="Subject" required>
                  <input id="subject" name="subject" type="text" required value={form.subject} onChange={onChange} className="herb-input" />
                </Field>
              </div>

              <Field id="message" label="Message" required>
                <textarea id="message" name="message" rows={7} required value={form.message} onChange={onChange} className="herb-input resize-y" />
              </Field>

              <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setRecaptchaToken} />

              <button
                type="submit"
                disabled={submitting}
                data-primary
                className="herb-btn w-full disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-[22rem]"
              >
                <span>{submitting ? "Sending…" : "Send message"}</span>
                <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
              </button>
            </form>

            <aside className="flex flex-col gap-8">
              <AccessionLabel
                title="Direct lines"
                rows={[
                  [
                    "Email",
                    <a key="email" href="mailto:info@icsift.com" className="herb-link">
                      info@icsift.com
                    </a>,
                  ],
                  [
                    "Phone",
                    <a key="phone" href="tel:+918260080050" className="herb-link">
                      +91 82600 80050
                    </a>,
                  ],
                  ["Conference", `${CONFERENCE.shortForm}, ${CONFERENCE.date}`],
                  ["Locality", `${CONFERENCE.venue.location.trim()} · and online`],
                ]}
              />

              <div>
                <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Elsewhere</h2>
                <ul className="mt-3 border-t border-[var(--ink)]">
                  {SOCIAL.map(([label, href]) => (
                    <li key={label} className="border-b border-[var(--rule)]">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-3 text-[16px] hover:text-[var(--green)]"
                      >
                        {label}
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
