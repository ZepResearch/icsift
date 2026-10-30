"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowUpRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
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

function StepStrip({ current }) {
  return (
    <ol className="mt-12 grid gap-2 sm:grid-cols-3" aria-label="Submission steps">
      {STEPS.map((step, index) => {
        const state = index < current ? "Done" : index === current ? "Now" : "Next";
        const now = index === current;
        return (
          <li
            key={step}
            aria-current={now ? "step" : undefined}
            className={`px-5 py-5 transition-colors duration-300 ${
              now ? "bg-[var(--green)] text-white" : index < current ? "bg-[var(--mount)]" : "bg-[var(--mount)] text-[var(--ink-2)]"
            }`}
          >
            <span className={`herb-italic block text-[14px] ${now ? "text-white/80" : "text-[var(--ink-2)]"}`}>{state}</span>
            <span className="mt-1 block text-[clamp(1.2rem,1rem+0.6vw,1.5rem)] leading-tight tracking-[-0.01em]">{step}</span>
          </li>
        );
      })}
    </ol>
  );
}

function TitleRow() {
  const location = CONFERENCE.venue.location.trim();
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
      <div>
        <h1 id="submission-title" className="herb-display text-[clamp(2.75rem,1.2rem+4.4vw,5.75rem)]">
          Submit your paper.
        </h1>
        <p className="mt-6 text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] leading-snug tracking-[-0.01em]">
          <span className="block">{CONFERENCE.date}</span>
          <span className="block">
            {location}
            <span className="text-[var(--green)]"> · </span>
            and online
          </span>
        </p>
        <p className="mt-6 max-w-[32rem] text-[17px] leading-relaxed">
          Send your abstract or full paper to the {CONFERENCE.shortForm} and present it in person, online or as a poster. Read
          the{" "}
          <a href="#guidelines" className="herb-link">
            abstract guidelines
          </a>{" "}
          first; submissions that do not follow them may be returned.
        </p>
      </div>
      <figure>
        <div className="herb-mount herb-photo herb-photo-settle relative aspect-[3/2]">
          <Image
            src="/gallery/2nd-ICSIFT_05.jpg"
            alt="A presenter at the lectern with his paper title projected on the screen behind him"
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover object-[60%_50%]"
          />
        </div>
        <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">
          A paper presented at the 2nd ICSIFT, Bangkok. Yours could be on that screen next.
        </figcaption>
      </figure>
    </div>
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

  return (
    <main className="herb min-h-screen">
      <section aria-labelledby="submission-title" className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <TitleRow />
          <StepStrip current={step} />

          {!user ? (
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
              <div>
                <h2 className="text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight tracking-[-0.02em]">Sign in to submit.</h2>
                <p className="herb-muted mt-4 max-w-[38rem]">
                  Submissions are tied to your Zep Research account, so you can track their status later. Create an account or
                  sign in to continue.
                </p>
                <button type="button" onClick={() => openAuthModal()} data-primary className="herb-btn mt-8 w-full sm:max-w-[22rem]">
                  <span>Sign in or create an account</span>
                  <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
                </button>

                <h3 className="mt-14 text-[22px] leading-tight tracking-[-0.01em]">What the form asks for</h3>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                  {ASKS.map(([title, body]) => (
                    <li key={title} className="border-l-[3px] border-[var(--green)] pl-5">
                      <p className="text-[20px] leading-snug">{title}</p>
                      <p className="herb-muted mt-1 text-[16px]">{body}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <SubmissionRail />
            </div>
          ) : (
            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
              <form onSubmit={onSubmit} noValidate className="grid gap-6" aria-busy={submitting}>
                <FormAlert>{formError}</FormAlert>

                <Honeypot />

                <h2 className="text-[22px] leading-tight tracking-[-0.01em]">About you</h2>
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

                <h2 className="mt-8 text-[22px] leading-tight tracking-[-0.01em]">Your paper</h2>
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
                    className="herb-input cursor-pointer file:mr-4 file:cursor-pointer file:border-0 file:bg-[var(--mount)] file:px-3 file:py-1.5 file:text-[15px] file:transition-colors hover:file:bg-[var(--green)] hover:file:text-white"
                  />
                </Field>

                <Field id="message" label="Message to the committee" error={err("message")} hint="Anything the reviewers should know, such as a preferred session.">
                  <textarea id="message" name="message" rows={5} required maxLength={MAX.message} aria-invalid={Boolean(err("message"))} aria-describedby={describedBy("message", err("message"), true)} className="herb-input resize-y" />
                </Field>

                <div className="mt-4 sm:bg-[var(--mount)] sm:p-6">
                  {isLocalDev ? (
                    <p className="herb-italic text-[14.5px] text-[var(--ink-2)]">reCAPTCHA is skipped on localhost.</p>
                  ) : (
                    <>
                      <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setRecaptchaToken} />
                      {err("recaptcha") ? <p className="mt-1.5 text-[14px] font-medium">{err("recaptcha")}</p> : null}
                    </>
                  )}
                  <button type="submit" disabled={submitting} data-primary className="herb-btn mt-6 w-full disabled:cursor-wait disabled:opacity-70 sm:max-w-[22rem]">
                    <span>{submitting ? "Submitting…" : "Submit paper"}</span>
                    <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
                  </button>
                  <p className="herb-muted mt-3 text-[14px]">You will get a confirmation email once your paper is received.</p>
                </div>
              </form>
              <SubmissionRail />
            </div>
          )}
        </div>
      </section>

      <div id="guidelines" className="scroll-mt-24">
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
    <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
      <div className="bg-[var(--mount)] p-5 sm:p-6">
        <h2 className="text-[22px] leading-tight tracking-[-0.01em]">Before you submit</h2>
        <dl className="mt-5 grid gap-4">
          {BEFORE.map(([term, value]) => (
            <div key={term}>
              <dt className="herb-italic text-[14px] text-[var(--ink-2)]">{term}</dt>
              <dd className="mt-0.5 text-[17px] leading-snug">{value}</dd>
            </div>
          ))}
          <div>
            <dt className="herb-italic text-[14px] text-[var(--ink-2)]">Help</dt>
            <dd className="mt-0.5 text-[17px] leading-snug">
              <a href="mailto:info@icsift.com" className="herb-link">
                info@icsift.com
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <div className="grid gap-3">
        <ActionLink href="/papers-format">Templates and format</ActionLink>
        <ActionLink href="/mode-of-presentation">Modes of presentation</ActionLink>
      </div>
      <p className="text-[16px]">
        Already submitted? Track it at{" "}
        <Link href="https://publication.zepresearch.com/" target="_blank" rel="noopener noreferrer" className="herb-link">
          publication.zepresearch.com
        </Link>
        .
      </p>
    </aside>
  );
}
