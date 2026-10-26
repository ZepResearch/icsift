import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink, AccessionLabel } from "@/components/home/primitives";

const NEXT = [
  ["Keep your order number", "It is in the “Payment initiated” email we sent to your billing address. Quote it in any question about your payment.", null],
  ["Presenting a paper?", "Submit it, and prepare your slides to the presentation guidelines.", "/submission"],
  ["Plan your trip", `Getting to ${CONFERENCE.venue.location.trim()}, and getting around once you are there.`, "/venue"],
  ["See the programme", "Sessions, keynotes and timings for both days.", "/schedule"],
];

export default function RegistrationSuccessPage() {
  return (
    <main className="herb min-h-screen">
      {/* One sheet, split: title and the confirmation label left; a ruled "what next" list right. */}
      <section aria-labelledby="paid-title" className="px-3 pt-3 pb-16 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8 lg:pb-24">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-12 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:p-12">
          <div className="flex flex-col">
            <h1 id="paid-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Payment received. See you there.
            </h1>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
              Thank you. Your payment for the {CONFERENCE.shortForm} has gone through. Keep your order number handy, and use the
              links on this page to get ready.
            </p>
            <AccessionLabel
              className="mt-10"
              title="Your conference"
              rows={[
                ["Conference", CONFERENCE.shortForm],
                ["Dates", CONFERENCE.date],
                ["Locality", `${CONFERENCE.venue.location.trim()} · and online`],
                [
                  "Questions",
                  <a key="mail" href="mailto:info@icsift.com" className="herb-link">
                    info@icsift.com
                  </a>,
                ],
              ]}
            />
          </div>

          <div>
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">What to do next</h2>
            <ol className="mt-4 border-t border-[var(--ink)]">
              {NEXT.map(([title, body, href], index) => {
                const inner = (
                  <>
                    <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className={`block text-[19px] ${href ? "group-hover:text-[var(--green)]" : ""}`}>{title}</span>
                      <span className="herb-muted mt-1 block text-[15.5px]">{body}</span>
                    </span>
                  </>
                );
                return (
                  <li key={title} className="border-b border-[var(--rule)]">
                    {href ? (
                      <Link href={href} className="group grid grid-cols-[2.5rem_1fr] items-baseline py-5">
                        {inner}
                      </Link>
                    ) : (
                      <div className="grid grid-cols-[2.5rem_1fr] items-baseline py-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ActionLink href="/schedule" primary>
                See the schedule
              </ActionLink>
              <ActionLink href="/">Back to the home page</ActionLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
