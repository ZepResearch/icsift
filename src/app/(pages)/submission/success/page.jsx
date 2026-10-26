import Link from "next/link";
import { submissionSuccessMetadata } from "@/components/metadata";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

export const metadata = submissionSuccessMetadata;

const TRACK_URL = "https://publication.zepresearch.com/";

// Continues the submission page's step strip: what has happened, and what comes next.
const STAGES = [
  ["Received", "Your paper is with us, and a confirmation email is on its way.", "Done"],
  ["Review", "The scientific committee evaluates it for relevance, originality and quality.", "Next"],
  ["Decision", "You hear about the status of your submission within 4 to 6 weeks.", "Then"],
  ["Final paper", "If accepted, you receive instructions for your final paper and presentation.", "Then"],
];

export default function SubmissionSuccess() {
  return (
    <main className="herb min-h-screen">
      {/* Title sheet: a receipt. Title and intro, then a four-stage timeline with the first stage done. */}
      <section aria-labelledby="success-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 id="success-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Paper received. Thank you.
            </h1>
            <p className="herb-muted max-w-[32rem] text-[17.5px] leading-relaxed">
              Your submission to the {CONFERENCE.shortForm} is in. Check your inbox for the confirmation email, and your spam
              folder if you cannot find it.
            </p>
          </div>

          <ol className="mt-12 grid gap-px border-y border-[var(--ink)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4" aria-label="What happens next">
            {STAGES.map(([title, body, state], index) => (
              <li key={title} aria-current={index === 0 ? "step" : undefined} className="relative bg-[var(--sheet)] py-6 sm:px-5">
                <span className="herb-italic block text-[14px] text-[var(--ink-2)]">
                  {String(index + 1).padStart(2, "0")} · {state}
                </span>
                <span className="mt-1 block text-[clamp(1.25rem,1rem+0.6vw,1.55rem)] leading-tight tracking-[-0.01em]">{title}</span>
                <span className="herb-muted mt-2 block text-[15px]">{body}</span>
                {index === 0 ? <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[3px] bg-[var(--green)]" /> : null}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-3 sm:max-w-[44rem] sm:grid-cols-2">
            <ActionLink href={TRACK_URL} primary external>
              Track your submission
            </ActionLink>
            <ActionLink href="/registration">Register to attend</ActionLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="meanwhile-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 lg:p-12">
          <div>
            <h2 id="meanwhile-title" className="herb-h2 max-w-[14ch]">
              While you wait.
            </h2>
            <p className="herb-muted mt-5 max-w-[30rem]">
              Status updates appear on{" "}
              <a href={TRACK_URL} target="_blank" rel="noopener noreferrer" className="herb-link">
                publication.zepresearch.com
              </a>
              . Questions about your submission go to{" "}
              <a href="mailto:info@icsift.com" className="herb-link">
                info@icsift.com
              </a>
              .
            </p>
          </div>
          <ul className="border-t border-[var(--ink)] self-start">
            {[
              ["/schedule", "See the conference schedule"],
              ["/mode-of-presentation", "Prepare your presentation"],
              ["/venue", `Plan your trip to ${CONFERENCE.venue.location.trim()}`],
              ["/", "Return to the home page"],
            ].map(([href, label]) => (
              <li key={href} className="border-b border-[var(--rule)]">
                <Link href={href} className="block py-4 text-[18px] hover:text-[var(--green)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </main>
  );
}
