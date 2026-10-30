"use client";

import { useRef, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { CallBand, FactCells, Field, PageHero } from "@/components/signal/page";

const EMPTY = { name: "", email: "", subject: "", message: "" };

// Each topic fills the subject line and points to the page that may already answer it.
const TOPICS = [
  ["Paper submission", "/submission", "Submitting a paper"],
  ["Registration and fees", "/registration", "Registration"],
  ["Exhibiting or sponsoring", "/exhibit-and-sponsor", "Exhibiting and sponsoring"],
  ["Venue and travel", "/venue", "The venue"],
  ["Something else", null, null],
];

const DIRECT = [
  ["Email", "mailto:info@icsift.com", "info@icsift.com"],
  ["Phone", "tel:+918260080050", "+91 82600 80050"],
];

const PAST = [
  ["/gallery/3rd-icsift (11).jpg", "A full session room at the 3rd ICSIFT", "The session room, 3rd ICSIFT"],
  ["/gallery/2nd-ICSIFT_07.jpg", "Delegates holding certificates on stage at the 2nd ICSIFT", "Certificates, 2nd ICSIFT"],
  ["/gallery/3rd-icsift (14).jpg", "Two delegates laughing together at a lunch table", "Lunch, 3rd ICSIFT"],
];

const SOCIAL = [
  ["Facebook", "https://www.facebook.com/profile.php?id=61561809783777"],
  ["Instagram", "https://www.instagram.com/zepresearch/"],
  ["LinkedIn", "https://www.linkedin.com/company/zep-research/"],
  ["YouTube", "https://www.youtube.com/@Zepresearch"],
  ["Zep Research", "https://www.zepresearch.com/"],
];

function FormField({ id, label, hint, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[16px] font-semibold">
        {label}
        {required ? <span className="font-normal text-[var(--muted)]"> (required)</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? <p className="mt-1.5 text-[15px] text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [topic, setTopic] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const pickTopic = (label) => {
    setTopic(label);
    setForm((prev) => ({ ...prev, subject: label === "Something else" ? "" : label }));
  };
  const picked = TOPICS.find(([label]) => label === topic);

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
      setTopic(null);
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
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the two direct lines set large as panels right. */}
      <PageHero
        id="contact-title"
        tag="Contact"
        title="Write to the team"
        lead={`Questions about the ${CONFERENCE.shortForm}, submissions, registration or partnering? Write, call, or use the form below. We reply by email.`}
        aside={
          <dl className="grid gap-2">
            {DIRECT.map(([term, href, value], index) => (
              <div
                key={term}
                className={`flex flex-col-reverse justify-end px-6 py-6 ${index ? "bg-[var(--panel)]" : "bg-[var(--signal)] text-[var(--forest)]"}`}
              >
                <dt className={`mt-2 text-[15.5px] ${index ? "text-[var(--muted)]" : "text-[var(--forest)]/80"}`}>{term}</dt>
                <dd>
                  <a href={href} className="group sig-display inline-flex items-center gap-3 text-[clamp(1.9rem,1.3rem+1.8vw,3rem)] leading-none">
                    {value}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* The form (topic picker first) on cream, with a sticky rail: photograph, the conference facts, elsewhere. */}
      <Field tone="cream" labelledBy="form-title" reveal={false}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <form onSubmit={onSubmit} className="grid gap-6">
            <h2 id="form-title" className="sig-h2 !text-[clamp(2.4rem,1.6rem+2.4vw,4.2rem)]">
              Send a message
            </h2>

            {status === "success" ? (
              <p role="status" className="bg-[var(--forest)] px-5 py-4 text-[17px] text-[var(--signal)]">
                <strong className="font-semibold">Message sent. </strong>
                Thank you; we will get back to you as soon as we can.
              </p>
            ) : null}
            {status === "error" ? (
              <p role="alert" className="bg-[var(--panel)] px-5 py-4 text-[17px]">
                <strong className="font-semibold">Not sent. </strong>
                {errorMessage}
              </p>
            ) : null}

            <fieldset>
              <legend className="text-[16px] font-semibold">What is it about?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOPICS.map(([label]) => (
                  <button key={label} type="button" aria-pressed={topic === label} onClick={() => pickTopic(label)} className="sig-chip">
                    {label}
                  </button>
                ))}
              </div>
              {picked?.[1] ? (
                <p key={picked[0]} className="sig-rise mt-4 text-[17px]">
                  The answer may already be on{" "}
                  <Link href={picked[1]} className="sig-link font-semibold">
                    {picked[2]}
                  </Link>
                  . If not, write below.
                </p>
              ) : null}
            </fieldset>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField id="name" label="Your name" required>
                <input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={onChange} className="herb-input" />
              </FormField>
              <FormField id="email" label="Email" required hint="We reply to this address.">
                <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={onChange} className="herb-input" />
              </FormField>
              <FormField id="phoneNumber" label="Phone" hint="Optional, with country code.">
                <PhoneInput id="phoneNumber" international defaultCountry="TH" value={phoneNumber} onChange={setPhoneNumber} className="herb-input" />
              </FormField>
              <FormField id="subject" label="Subject" required>
                <input id="subject" name="subject" type="text" required value={form.subject} onChange={onChange} className="herb-input" />
              </FormField>
            </div>

            <FormField id="message" label="Message" required>
              <textarea id="message" name="message" rows={7} required value={form.message} onChange={onChange} className="herb-input resize-y" />
            </FormField>

            <div className="mt-2 grid gap-6 sm:bg-[var(--panel)] sm:p-6">
              <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setRecaptchaToken} />
              <button type="submit" disabled={submitting} data-dark="" className="sig-btn w-full disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-[22rem]">
                <span>{submitting ? "Sending…" : "Send message"}</span>
                <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
              </button>
            </div>
          </form>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-40 lg:self-start">
            <figure>
              <div className="herb-photo relative aspect-[4/3]">
                <Image src="/gallery/ICSIFT_09.jpg" alt="Delegates smiling for the camera at a conference table" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-[15px] text-[var(--muted)]">Between sessions, ICSIFT 2025</figcaption>
            </figure>

            <FactCells
              columns=""
              size="text-[clamp(1.2rem,1.05rem+0.5vw,1.5rem)]"
              facts={[
                ["Dates", CONFERENCE.date],
                ["Where", `${CONFERENCE.venue.name.trim()}, ${CONFERENCE.venue.location.trim()}, and online`],
              ]}
            />

            <div>
              <h2 className="sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">Elsewhere</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SOCIAL.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-[44px] items-center gap-2 bg-[var(--panel)] px-4 text-[16px] font-semibold transition-colors duration-200 hover:bg-[var(--forest)] hover:text-[var(--signal)]"
                    >
                      {label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Field>

      {/* Past editions, so the people behind the inbox have a face. */}
      <Field tone="forest" labelledBy="past-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="past-title" data-enter className="sig-h2">
            Past editions
          </h2>
          <p data-enter style={{ "--i": 1 }} className="max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug text-[var(--muted)]">
            The same team has run every ICSIFT so far. More photographs are in the{" "}
            <Link href="/gallery" className="sig-link font-semibold text-[var(--signal)]">
              gallery
            </Link>
            .
          </p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {PAST.map(([src, alt, caption], index) => (
            <figure key={src} data-enter style={{ "--i": 2 + index }}>
              <div className="herb-photo relative aspect-[4/3] bg-[var(--forest-deep)]">
                <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-[15px] text-[var(--muted)]">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </Field>

      <CallBand
        title={`See you in ${CONFERENCE.venue.location.trim().split(",")[0]}`}
        text={`${CONFERENCE.date}, ${CONFERENCE.venue.name.trim()} and online.`}
      />
    </main>
  );
}
