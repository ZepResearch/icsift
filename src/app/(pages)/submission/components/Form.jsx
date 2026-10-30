"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { BarList, FactCells, PageHero } from "@/components/signal/page";
import SigButton from "@/components/signal/SigButton";
import { useAuth } from "@/context/AuthContext";
import pb from "@/lib/zep-pocketbase";
import {
  FILE_EXTENSIONS,
  HEARD_FROM,
  PAPER_TYPES,
  PRESENTATION_TYPES,
  TEXT_FIELDS,
  fileProblem,
  validateSubmission,
} from "@/lib/paper-submission";
import { Field, FormAlert, Honeypot, Select, describedBy } from "@/components/forms/herb-fields";
import AbstractSubmissionGuidelines from "./SubmitGuidline";

const RECAPTCHA_BYPASS_TOKEN = "localhost-bypass";
const MAX = Object.fromEntries(TEXT_FIELDS.map(([name, , max]) => [name, max]));
const STEPS = ["Sign in", "Fill in your details", "Upload and send"];
const ASKS = [
  ["About you", "Your name, email, phone number, country, department and university or organization."],
  ["Your paper", "The title and every co-author, or “None” if you wrote it alone."],
  ["How you will present", "The paper type, and whether you present in person, online or as a poster."],
  ["The file", "Your paper as a Word file, .doc or .docx, up to 10 MB."],
];

// The three steps as panels in the hero; the current one turns yellow and tracks real progress.
function StepStrip({ current }) {
  return (
    <ol className="grid gap-2" aria-label="Submission steps">
      {STEPS.map((step, index) => {
        const state = index < current ? "Done" : index === current ? "Now" : "Next";
        const now = index === current;
        return (
          <li
            key={step}
            aria-current={now ? "step" : undefined}
            className={`grid grid-cols-[3.5rem_1fr] items-center gap-x-4 px-5 py-4 transition-colors duration-300 ${
              now ? "bg-[var(--signal)] text-[var(--forest)]" : "bg-[var(--panel)]"
            }`}
          >
            <span aria-hidden="true" className="sig-display text-[2.8rem] leading-none">
              {index + 1}
            </span>
            <span>
              <span className={`block text-[15px] font-semibold ${now ? "" : "text-[var(--muted)]"}`}>{state}</span>
              <span className="sig-display mt-0.5 block text-[clamp(1.4rem,1.15rem+0.7vw,1.9rem)] leading-[1.04]">{step}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function PaperSubmissionPage() {
  const { user, openAuthModal } = useAuth();
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Only true on localhost. The server ignores the bypass token in production builds.
  const isLocalDev =
    typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  const showErrors = (next, message) => {
    setErrors(next);
    setFormError(message);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(first === "phone_number" ? "phone_number" : first)?.focus();
  };

  const onFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setErrors((prev) => {
      const { file: _drop, ...rest } = prev;
      const problem = file ? fileProblem(file) : null;
      return problem ? { ...rest, file: problem } : rest;
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    formData.set("phone_number", phoneNumber || "");

    // Instant feedback with the same rules the server enforces.
    const { errors: found } = validateSubmission(Object.fromEntries(formData.entries()));
    const problem = fileProblem(selectedFile);
    if (problem) found.file = problem;
    if (!isLocalDev && !recaptchaToken) found.recaptcha = "Tick the reCAPTCHA box to show you are not a robot.";
    if (Object.keys(found).length) {
      showErrors(found, "Some fields need attention. Each one is marked below.");
      return;
    }

    setSubmitting(true);
    setErrors({});
    setFormError(null);
    try {
      formData.set("file", selectedFile);
      formData.set("recaptcha_token", isLocalDev ? RECAPTCHA_BYPASS_TOKEN : recaptchaToken);
      if (pb.authStore.token) formData.set("auth_token", pb.authStore.token);

      const response = await fetch("/api/submit-paper", { method: "POST", body: formData });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) openAuthModal();
        showErrors(data.errors || {}, data.message || "Your paper could not be submitted. Please try again.");
        return;
      }
      router.push("/submission/success");
    } catch {
      setFormError("The connection dropped before your paper was sent. Check your internet and submit again.");
    } finally {
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setSubmitting(false);
    }
  };

  const step = !user ? 0 : selectedFile ? 2 : 1;
  const err = (name) => errors[name];

  const location = CONFERENCE.venue.location.trim();

  return (
    <main className="sig min-h-screen">
      {/* Hero: title, dates and place left; the three-step strip right, tracking real progress. */}
      <PageHero
        id="submission-title"
        tag="Submission"
        title="Submit your paper"
        lead={
          <>
            {CONFERENCE.date}, {location} and online. Send your abstract or full paper to the {CONFERENCE.shortForm} and present it
            in person, online or as a poster. Read the{" "}
            <a href="#guidelines" className="sig-link font-semibold text-[var(--signal)]">
              abstract guidelines
            </a>{" "}
            first; submissions that do not follow them may be returned.
          </>
        }
        aside={<StepStrip current={step} />}
      />

      {/* The form (or the sign-in prompt) on cream, with the sticky "Before you submit" rail. */}
      <section aria-labelledby="form-title" className="sig-cream">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:py-28">
          {!user ? (
            <div>
              <h2 id="form-title" className="sig-h2">
                Sign in to submit
              </h2>
              <p className="mt-6 max-w-[38rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
                Submissions are tied to your Zep Research account, so you can track their status later. Create an account or
                sign in to continue.
              </p>
              <button type="button" onClick={() => openAuthModal()} className="sig-btn mt-8" data-dark="">
                <span>Sign in or create an account</span>
                <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
              </button>

              <h3 className="sig-display mt-16 text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)]">What the form asks for</h3>
              <BarList items={ASKS} className="mt-6 sm:grid-cols-2" />
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-6" aria-busy={submitting}>
              <h2 id="form-title" className="sig-h2">
                Your submission
              </h2>
              <FormAlert>{formError}</FormAlert>

              <Honeypot />

              <h3 className="sig-display mt-4 text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">About you</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <Field id="author" label="Author name" error={err("author")}>
                  <input id="author" name="author" type="text" autoComplete="name" required maxLength={MAX.author} defaultValue={user?.name || ""} aria-invalid={Boolean(err("author"))} aria-describedby={describedBy("author", err("author"))} className="herb-input" />
                </Field>
                <Field id="email" label="Email" error={err("email")} hint="Your confirmation goes here.">
                  <input id="email" name="email" type="email" autoComplete="email" required maxLength={MAX.email} defaultValue={user?.email || ""} aria-invalid={Boolean(err("email"))} aria-describedby={describedBy("email", err("email"), true)} className="herb-input" />
                </Field>
                <Field id="phone_number" label="Phone number" error={err("phone_number")} hint="With country code.">
                  <PhoneInput id="phone_number" international defaultCountry="US" value={phoneNumber} onChange={setPhoneNumber} aria-invalid={Boolean(err("phone_number"))} className="herb-input" />
                </Field>
                <Field id="country" label="Country" error={err("country")}>
                  <input id="country" name="country" type="text" autoComplete="country-name" required maxLength={MAX.country} aria-invalid={Boolean(err("country"))} aria-describedby={describedBy("country", err("country"))} className="herb-input" />
                </Field>
                <Field id="department" label="Department" error={err("department")}>
                  <input id="department" name="department" type="text" required maxLength={MAX.department} aria-invalid={Boolean(err("department"))} aria-describedby={describedBy("department", err("department"))} className="herb-input" />
                </Field>
                <Field id="organization" label="University or organization" error={err("organization")}>
                  <input id="organization" name="organization" type="text" autoComplete="organization" required maxLength={MAX.organization} aria-invalid={Boolean(err("organization"))} aria-describedby={describedBy("organization", err("organization"))} className="herb-input" />
                </Field>
              </div>

              <h3 className="sig-display mt-8 text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">Your paper</h3>
              <Field id="paper_title" label="Paper title" error={err("paper_title")}>
                <input id="paper_title" name="paper_title" type="text" required maxLength={MAX.paper_title} aria-invalid={Boolean(err("paper_title"))} aria-describedby={describedBy("paper_title", err("paper_title"))} className="herb-input" />
              </Field>
              <Field id="co_author" label="Co-author(s)" error={err("co_author")} hint="Separate names with commas. Write “None” if you are the only author.">
                <input id="co_author" name="co_author" type="text" required maxLength={MAX.co_author} aria-invalid={Boolean(err("co_author"))} aria-describedby={describedBy("co_author", err("co_author"), true)} className="herb-input" />
              </Field>
              <div className="grid gap-6 md:grid-cols-3">
                <Field id="paper_type" label="Paper type" error={err("paper_type")}>
                  <Select id="paper_type" placeholder="Choose one" options={PAPER_TYPES.map((t) => [t, t])} error={err("paper_type")} />
                </Field>
                <Field id="presentation_type" label="Presentation" error={err("presentation_type")}>
                  <Select id="presentation_type" placeholder="Choose one" options={PRESENTATION_TYPES} error={err("presentation_type")} />
                </Field>
                <Field id="know_to_you" label="How did you hear of us?" error={err("know_to_you")}>
                  <Select id="know_to_you" placeholder="Choose one" options={HEARD_FROM} error={err("know_to_you")} />
                </Field>
              </div>

              <Field id="file" label="Paper file" error={err("file")} hint="Word only (.doc or .docx), up to 10 MB.">
                <input
                  id="file"
                  name="file"
                  type="file"
                  required
                  accept={`${FILE_EXTENSIONS.join(",")},application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`}
                  onChange={onFileChange}
                  aria-invalid={Boolean(err("file"))}
                  aria-describedby={describedBy("file", err("file"), true)}
                  className="herb-input cursor-pointer file:mr-4 file:cursor-pointer file:border-0 file:bg-[var(--forest)] file:px-3 file:py-1.5 file:text-[15px] file:font-semibold file:text-[var(--signal)] file:transition-colors hover:file:bg-[var(--forest-deep)]"
                />
              </Field>

              <Field id="message" label="Message to the committee" error={err("message")} hint="Anything the reviewers should know, such as a preferred session.">
                <textarea id="message" name="message" rows={5} required maxLength={MAX.message} aria-invalid={Boolean(err("message"))} aria-describedby={describedBy("message", err("message"), true)} className="herb-input resize-y" />
              </Field>

              <div className="mt-4 sm:bg-[var(--panel)] sm:p-6">
                {isLocalDev ? (
                  <p className="text-[15px] text-[var(--muted)]">reCAPTCHA is skipped on localhost.</p>
                ) : (
                  <>
                    <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setRecaptchaToken} />
                    {err("recaptcha") ? <p className="mt-1.5 text-[14px] font-medium">{err("recaptcha")}</p> : null}
                  </>
                )}
                <button type="submit" disabled={submitting} className="sig-btn mt-6 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto" data-dark="">
                  <span>{submitting ? "Submitting…" : "Submit paper"}</span>
                  <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
                </button>
                <p className="mt-3 text-[15px] text-[var(--muted)]">You will get a confirmation email once your paper is received.</p>
              </div>
            </form>
          )}
          <SubmissionRail />
        </div>
      </section>

      <div id="guidelines" className="scroll-mt-28">
        <AbstractSubmissionGuidelines />
      </div>
    </main>
  );
}

const BEFORE = [
  ["File", "Word, .doc or .docx, up to 10 MB"],
  ["Abstract", "250 to 300 words"],
  ["Presenting", "In person, online or as a poster"],
  ["Conference", `${CONFERENCE.shortForm}, ${CONFERENCE.date}`],
];

function SubmissionRail() {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-40 lg:self-start">
      <h2 className="sig-display text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)]">Before you submit</h2>
      <FactCells facts={BEFORE} columns="" size="text-[clamp(1.2rem,1.05rem+0.5vw,1.5rem)]" />
      <p className="text-[16.5px]">
        Help:{" "}
        <a href="mailto:info@icsift.com" className="sig-link font-semibold">
          info@icsift.com
        </a>
      </p>
      <div className="flex flex-wrap gap-3">
        <SigButton href="/papers-format" tone="dark-outline">
          Templates and format
        </SigButton>
        <SigButton href="/mode-of-presentation" tone="dark-outline">
          Modes of presentation
        </SigButton>
      </div>
      <p className="text-[16px] text-[var(--muted)]">
        Already submitted? Track it at{" "}
        <Link href="https://publication.zepresearch.com/" target="_blank" rel="noopener noreferrer" className="sig-link font-semibold text-[var(--bark)]">
          publication.zepresearch.com
        </Link>
        .
      </p>
    </aside>
  );
}
