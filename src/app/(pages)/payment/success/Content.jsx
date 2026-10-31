import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, FactCells, Field, LEAD, PageHero, SPLIT, StickyIntro } from "@/components/signal/page";

const NEXT = [
  ["Keep your order number", "It is in the “Payment initiated” email we sent to your billing address. Quote it in any question about your payment.", null],
  ["Presenting a paper?", "Submit it, and prepare your slides to the presentation guidelines.", "/submission"],
  ["Plan your trip", `Getting to ${CONFERENCE.venue.location.trim()}, and getting around once you are there.`, "/venue"],
  ["See the programme", "Sessions, keynotes and timings for both days.", "/schedule"],
];

// A receipt: the confirmation and your conference facts in the hero, then what to do next as numbered panels.
export default function RegistrationSuccessPage() {
  return (
    <main className="sig min-h-screen">
      <PageHero
        id="paid-title"
        tag="Payment received"
        title="Payment received. See you there."
        lead={`Thank you. Your payment for the ${CONFERENCE.shortForm} has gone through. Keep your order number handy, and use the links below to get ready.`}
        actions={<ActionPair tone="forest" primary={["/schedule", "See the schedule"]} secondary={["/", "Back to the home page"]} />}
        aside={
          <FactCells
            size="text-[clamp(1.2rem,1.05rem+0.5vw,1.5rem)]"
            facts={[
              ["Conference", CONFERENCE.shortForm],
              ["Dates", CONFERENCE.date],
              ["Where", `${CONFERENCE.venue.location.trim()}, and online`],
              ["Questions", "info@icsift.com"],
            ]}
          />
        }
      />

      <Field tone="cream" labelledBy="next-title">
        <div className={SPLIT}>
          <StickyIntro tag="Next steps" id="next-title" title="What to do next">
            <p className={`${LEAD} text-[var(--muted)]`}>
              Questions about your payment? Write to{" "}
              <a href="mailto:info@icsift.com" className="sig-link font-semibold text-[var(--bark)]">
                info@icsift.com
              </a>
              .
            </p>
          </StickyIntro>
          <ol className="grid gap-2">
            {NEXT.map(([title, body, href], index) => {
              const inner = (
                <>
                  <span aria-hidden="true" className="sig-display text-[clamp(2.6rem,2rem+1.6vw,3.6rem)] leading-[0.85]">
                    {index + 1}
                  </span>
                  <span>
                    <span className="sig-display flex items-center gap-2 text-[clamp(1.4rem,1.1rem+0.8vw,1.9rem)] leading-[1.04]">
                      {title}
                      {href ? <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.2} /> : null}
                    </span>
                    <span className="mt-2 block text-[17px] text-[var(--muted)]">{body}</span>
                  </span>
                </>
              );
              const box = "grid grid-cols-[3.5rem_1fr] gap-x-5 bg-[var(--panel)] p-6 sm:grid-cols-[4.5rem_1fr] sm:p-7";
              return (
                <li key={title} data-enter style={{ "--i": 2 + index }}>
                  {href ? (
                    <Link href={href} className={`group ${box} transition-colors duration-200 hover:bg-[var(--forest)] hover:text-[var(--signal)]`}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={box}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </Field>
    </main>
  );
}
