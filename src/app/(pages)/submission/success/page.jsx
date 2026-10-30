import Link from "next/link";
import { submissionSuccessMetadata } from "@/components/metadata";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, CallBand, Field, LEAD, PageHero, SPLIT, StickyIntro } from "@/components/signal/page";

export const metadata = submissionSuccessMetadata;

const TRACK_URL = "https://publication.zepresearch.com/";

// Continues the submission page's step strip: what has happened, and what comes next.
const STAGES = [
  ["Received", "Your paper is with us, and a confirmation email is on its way.", "Done"],
  ["Review", "The scientific committee evaluates it for relevance, originality and quality.", "Next"],
  ["Decision", "You hear about the status of your submission within 4 to 6 weeks.", "Then"],
  ["Final paper", "If accepted, you receive instructions for your final paper and presentation.", "Then"],
];

const NEXT = [
  ["/schedule", "See the conference schedule"],
  ["/mode-of-presentation", "Prepare your presentation"],
  ["/venue", `Plan your trip to ${CONFERENCE.venue.location.trim()}`],
  ["/", "Return to the home page"],
];

export default function SubmissionSuccess() {
  return (
    <main className="sig min-h-screen">
      {/* A receipt: title and intro left; the four stages right, the first done (yellow). */}
      <PageHero
        id="success-title"
        tag="Received"
        title="Paper received. Thank you."
        lead={`Your submission to the ${CONFERENCE.shortForm} is in. Check your inbox for the confirmation email, and your spam folder if you cannot find it.`}
        actions={<ActionPair tone="forest" primary={[TRACK_URL, "Track your submission", true]} secondary={["/registration", "Register to attend"]} />}
        aside={
          <ol className="grid gap-2" aria-label="What happens next">
            {STAGES.map(([title, body, state], index) => (
              <li
                key={title}
                aria-current={index === 0 ? "step" : undefined}
                className={`grid grid-cols-[3.5rem_1fr] gap-x-4 px-5 py-4 ${index === 0 ? "bg-[var(--signal)] text-[var(--forest)]" : "bg-[var(--panel)]"}`}
              >
                <span aria-hidden="true" className="sig-display text-[2.8rem] leading-none">
                  {index + 1}
                </span>
                <span>
                  <span className={`block text-[15px] font-semibold ${index === 0 ? "" : "text-[var(--muted)]"}`}>{state}</span>
                  <span className="sig-display mt-0.5 block text-[clamp(1.4rem,1.15rem+0.7vw,1.9rem)] leading-[1.04]">{title}</span>
                  <span className={`mt-1 block text-[15.5px] ${index === 0 ? "" : "text-[var(--muted)]"}`}>{body}</span>
                </span>
              </li>
            ))}
          </ol>
        }
      />

      {/* While you wait: sticky intro left; next steps as large link panels right. */}
      <Field tone="cream" labelledBy="meanwhile-title">
        <div className={SPLIT}>
          <StickyIntro tag="Meanwhile" id="meanwhile-title" title="While you wait">
            <p className={LEAD}>
              Status updates appear on{" "}
              <a href={TRACK_URL} target="_blank" rel="noopener noreferrer" className="sig-link font-semibold">
                publication.zepresearch.com
              </a>
              . Questions about your submission go to{" "}
              <a href="mailto:info@icsift.com" className="sig-link font-semibold">
                info@icsift.com
              </a>
              .
            </p>
          </StickyIntro>
          <ul className="grid content-start gap-2">
            {NEXT.map(([href, label], index) => (
              <li key={href} data-enter style={{ "--i": 2 + index }}>
                <Link
                  href={href}
                  className="sig-display flex items-center justify-between gap-4 bg-[var(--panel)] px-6 py-5 text-[clamp(1.4rem,1.1rem+0.8vw,1.9rem)] leading-[1.05] transition-colors duration-200 hover:bg-[var(--forest)] hover:text-[var(--signal)]"
                >
                  {label}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Field>

      <CallBand
        title={`See you at the ${CONFERENCE.shortForm}`}
        text={`${CONFERENCE.date}, ${CONFERENCE.venue.location.trim()} and online. Register now to hold your place.`}
        primary={["/registration", "Register"]}
        secondary={[TRACK_URL, "Track your submission", true]}
      />
    </main>
  );
}
