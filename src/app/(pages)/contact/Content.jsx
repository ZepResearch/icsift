"use client";

import { useRef, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import Reveal from "@/components/home/Reveal";

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
    <main className="herb min-h-screen">
      {/* One sheet: the title with the direct lines set large beside it, then the form (topic picker first) and a photo rail. */}
      <section aria-labelledby="contact-title" className="px-4 pt-4 pb-28 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8 lg:pb-40">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
              <h1 id="contact-title" className="herb-display text-[clamp(2.75rem,1.2rem+4.4vw,5.75rem)]">
                Write to the team.
              </h1>
              <p className="mt-6 max-w-[32rem] text-[17px] leading-relaxed">
                Questions about the {CONFERENCE.shortForm}, submissions, registration or partnering? Write, call, or use the form
                below. We reply by email.
              </p>
            </div>
            <dl className="grid gap-2">
              {DIRECT.map(([term, href, value], index) => (
                <div
                  key={term}
                  className={`flex flex-col-reverse justify-end px-5 py-5 ${index ? "bg-[var(--mount)]" : "bg-[var(--green)] text-white"}`}
                >
                  <dt className={`herb-italic mt-1 text-[15px] ${index ? "text-[var(--ink-2)]" : "text-white/80"}`}>{term}</dt>
                  <dd>
                    <a href={href} className="group inline-flex items-center gap-3 text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] leading-tight tracking-[-0.02em]">
                      {value}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.6}
                      />
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
            <form onSubmit={onSubmit} className="grid gap-6">
              <h2 className="text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight tracking-[-0.02em]">Send a message.</h2>

              {status === "success" ? (
                <p role="status" className="bg-[var(--green)] px-5 py-4 text-[16px] text-white">
                  <strong className="font-semibold">Message sent. </strong>
                  Thank you; we will get back to you as soon as we can.
                </p>
              ) : null}
              {status === "error" ? (
                <p role="alert" className="border-l-[3px] border-[var(--ink)] bg-[var(--mount)] px-5 py-4 text-[16px]">
                  <strong className="font-semibold">Not sent. </strong>
                  {errorMessage}
                </p>
              ) : null}

              <fieldset>
                <legend className="text-[15px]">What is it about?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TOPICS.map(([label]) => (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={topic === label}
                      onClick={() => pickTopic(label)}
                      className={`min-h-[44px] px-4 text-[15.5px] transition-[background-color,color,transform] duration-200 active:scale-[0.98] ${
                        topic === label ? "bg-[var(--green)] text-white" : "bg-[var(--mount)] hover:bg-[var(--ink)] hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {picked?.[1] ? (
                  <p key={picked[0]} className="herb-settle mt-3 text-[16px]">
                    The answer may already be on{" "}
                    <Link href={picked[1]} className="herb-link">
                      {picked[2]}
                    </Link>
                    . If not, write below.
                  </p>
                ) : null}
              </fieldset>

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

              <div className="mt-2 grid gap-6 sm:bg-[var(--mount)] sm:p-6">
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
              </div>
            </form>

            <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
              <figure>
                <div className="herb-mount herb-photo herb-photo-settle relative aspect-[4/3]">
                  <Image
                    src="/gallery/ICSIFT_09.jpg"
                    alt="Delegates smiling for the camera at a conference table"
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">Between sessions, ICSIFT 2025</figcaption>
              </figure>

              <div className="bg-[var(--mount)] p-5 sm:p-6">
                <h2 className="text-[22px] leading-tight tracking-[-0.01em]">The conference</h2>
                <dl className="mt-4 grid gap-4">
                  {[
                    ["Dates", CONFERENCE.date],
                    ["Where", `${CONFERENCE.venue.name.trim()}, ${CONFERENCE.venue.location.trim()}, and online`],
                  ].map(([term, value]) => (
                    <div key={term}>
                      <dt className="herb-italic text-[14px] text-[var(--ink-2)]">{term}</dt>
                      <dd className="mt-0.5 text-[17px] leading-snug">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="text-[22px] leading-tight tracking-[-0.01em]">Elsewhere</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {SOCIAL.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-[44px] items-center gap-2 bg-[var(--mount)] px-4 text-[16px] transition-colors duration-200 hover:bg-[var(--green)] hover:text-white"
                      >
                        {label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.6}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* A closing band of past editions, so the people behind the inbox have a face. */}
      <section aria-labelledby="past-title" className="px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <Reveal className="mx-auto max-w-[1400px]">
          <div data-enter className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h2 id="past-title" className="herb-h2">
              Past editions.
            </h2>
            <p className="max-w-[32rem] text-[17px]">
              The same team has run every ICSIFT so far. More photographs are in the{" "}
              <Link href="/gallery" className="herb-link">
                gallery
              </Link>
              .
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {PAST.map(([src, alt, caption], index) => (
              <figure key={src} data-enter style={{ "--i": 1 + index }}>
                <div className="herb-photo relative aspect-[4/3]">
                  <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
