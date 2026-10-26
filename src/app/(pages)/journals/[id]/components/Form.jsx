"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import pb from "@/lib/zep-pocketbase";
import { JOURNAL_FILE_EXTENSIONS, JOURNAL_TEXT_FIELDS, fileProblem, validateJournalSubmission } from "@/lib/paper-submission";
import { Field, FormAlert, Honeypot, describedBy } from "@/components/forms/herb-fields";

const RECAPTCHA_BYPASS_TOKEN = "localhost-bypass";
const MAX = Object.fromEntries(JOURNAL_TEXT_FIELDS.map(([name, , max]) => [name, max]));
const ACCEPT = [
  ...JOURNAL_FILE_EXTENSIONS,
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",");

export default function PaperSubmissionForm({ journalId, journalTitle }) {
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

  if (!user) {
    return (
      <div>
        <h2 className="text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight tracking-[-0.02em]">Sign in to submit.</h2>
        <p className="herb-muted mt-4 max-w-[38rem]">
          Submissions are tied to your Zep Research account, so you can track their status later. Create an account or sign in
          to send your paper to {journalTitle}.
        </p>
        <button type="button" onClick={() => openAuthModal()} data-primary className="herb-btn mt-8 w-full sm:max-w-[22rem]">
          <span>Sign in or create an account</span>
          <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
        </button>
      </div>
    );
  }

  const showErrors = (next, message) => {
    setErrors(next);
    setFormError(message);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(first)?.focus();
  };

  const onFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setErrors((prev) => {
      const { file: _drop, ...rest } = prev;
      const problem = file ? fileProblem(file, JOURNAL_FILE_EXTENSIONS) : null;
      return problem ? { ...rest, file: problem } : rest;
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    formData.set("phone_number", phoneNumber || "");

    // Instant feedback with the same rules the server enforces.
    const { errors: found } = validateJournalSubmission(Object.fromEntries(formData.entries()));
    const problem = fileProblem(selectedFile, JOURNAL_FILE_EXTENSIONS);
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
      // The server looks the journal up by id and takes its name from the record.
      formData.set("journal_id", journalId);
      formData.set("file", selectedFile);
      formData.set("recaptcha_token", isLocalDev ? RECAPTCHA_BYPASS_TOKEN : recaptchaToken);
      if (pb.authStore.token) formData.set("auth_token", pb.authStore.token);

      const response = await fetch("/api/journal-paper", { method: "POST", body: formData });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) openAuthModal();
        showErrors(data.errors || {}, data.message || "Your paper could not be submitted. Please try again.");
        return;
      }
      router.push("/journals/success");
    } catch {
      setFormError("The connection dropped before your paper was sent. Check your internet and submit again.");
    } finally {
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setSubmitting(false);
    }
  };

  const err = (name) => errors[name];
  const text = (name, extra = {}) => ({
    id: name,
    name,
    maxLength: MAX[name],
    "aria-invalid": Boolean(err(name)),
    className: "herb-input",
    ...extra,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6" aria-busy={submitting}>
      <FormAlert>{formError}</FormAlert>
      <Honeypot />

      <div className="herb-label">
        <dl className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 max-sm:grid-cols-1 max-sm:gap-0.5">
          <dt>Submitting to</dt>
          <dd>{journalTitle}</dd>
        </dl>
      </div>

      <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">About you</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="author" label="Author name" error={err("author")}>
          <input {...text("author", { type: "text", required: true, autoComplete: "name", defaultValue: user?.name || "" })} aria-describedby={describedBy("author", err("author"))} />
        </Field>
        <Field id="email" label="Email" error={err("email")} hint="Your confirmation goes here.">
          <input {...text("email", { type: "email", required: true, autoComplete: "email", defaultValue: user?.email || "" })} aria-describedby={describedBy("email", err("email"), true)} />
        </Field>
        <Field id="phone_number" label="Phone number" error={err("phone_number")} hint="With country code.">
          <PhoneInput id="phone_number" international defaultCountry="US" value={phoneNumber} onChange={setPhoneNumber} aria-invalid={Boolean(err("phone_number"))} className="herb-input" />
        </Field>
        <Field id="country" label="Country" error={err("country")}>
          <input {...text("country", { type: "text", required: true, autoComplete: "country-name" })} aria-describedby={describedBy("country", err("country"))} />
        </Field>
        <Field id="department" label="Department" error={err("department")}>
          <input {...text("department", { type: "text", required: true })} aria-describedby={describedBy("department", err("department"))} />
        </Field>
        <Field id="organization" label="University or organization" error={err("organization")}>
          <input {...text("organization", { type: "text", required: true, autoComplete: "organization" })} aria-describedby={describedBy("organization", err("organization"))} />
        </Field>
      </div>

      <h2 className="mt-4 border-t border-[var(--ink)] pt-6 text-[13px] font-semibold tracking-[0.08em] uppercase">Your paper</h2>
      <Field id="paper_title" label="Paper title" error={err("paper_title")}>
        <input {...text("paper_title", { type: "text", required: true })} aria-describedby={describedBy("paper_title", err("paper_title"))} />
      </Field>
      <Field id="co_author" label="Co-author(s), optional" error={err("co_author")} hint="Separate names with commas.">
        <input {...text("co_author", { type: "text" })} aria-describedby={describedBy("co_author", err("co_author"), true)} />
      </Field>
      <Field id="file" label="Paper file" error={err("file")} hint="PDF, DOC or DOCX, up to 10 MB.">
        <input
          id="file"
          name="file"
          type="file"
          required
          accept={ACCEPT}
          onChange={onFileChange}
          aria-invalid={Boolean(err("file"))}
          aria-describedby={describedBy("file", err("file"), true)}
          className="herb-input cursor-pointer file:mr-4 file:cursor-pointer file:border file:border-[var(--ink)] file:bg-[var(--sheet)] file:px-3 file:py-1.5 file:text-[15px] hover:file:bg-[var(--ink)] hover:file:text-white"
        />
      </Field>
      <Field id="message" label="Message to the editors, optional" error={err("message")} hint="Anything the editors should know about your submission.">
        <textarea {...text("message", { rows: 4, className: "herb-input resize-y" })} aria-describedby={describedBy("message", err("message"), true)} />
      </Field>

      <div className="border-t border-[var(--ink)] pt-6">
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
  );
}
