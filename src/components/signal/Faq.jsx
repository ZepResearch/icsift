import Link from "next/link";
import { Plus } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import Reveal from "@/components/home/Reveal";

export const FAQS = [
  {
    q: "How do I register?",
    a: `Register online for the ${CONFERENCE.shortForm}, in person or virtually. Organisations sending five or more attendees can ask about group rates.`,
  },
  {
    q: "What are the paper guidelines?",
    a: "Papers run 6 to 8 pages on the conference template. Submissions must be original, not published or under review elsewhere, and fit the themes of sustainability, innovation or future technologies.",
  },
  {
    q: "Is there a student rate?",
    a: "Yes. Students register at a reduced rate with a valid student ID and proof of enrolment, for the same programme.",
  },
  {
    q: "Can you help with accommodation?",
    a: "Arrangements depend on the venue, so we cannot guarantee rooms, but we are glad to recommend options. Write to info@icsift.com.",
  },
  {
    q: "How can my organisation sponsor or exhibit?",
    a: "Sponsorship packages include exhibition space, speaking opportunities, logo placement and complimentary registrations. Write to info@icsift.com for the prospectus.",
  },
  {
    q: "Is the venue accessible?",
    a: "Yes: ramps, lifts, accessible restrooms and designated seating. Tell us about any specific needs when you register.",
  },
];

// Forest field: tag and heading left; questions as rows on a deeper green, opening in place.
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-[var(--forest)] text-[var(--signal)]">
      <Reveal className="mx-auto grid max-w-[1400px] gap-12 px-4 py-28 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-20 lg:px-10 lg:py-40">
        <div data-enter className="lg:sticky lg:top-40 lg:self-start">
          <h2 id="faq-title" className="sig-h2">
            Before you ask
          </h2>
          <p className="mt-6 max-w-[28rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
            Anything else, write to{" "}
            <a href="mailto:info@icsift.com" className="sig-link font-semibold">
              info@icsift.com
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="sig-link font-semibold">
              contact page
            </Link>
            .
          </p>
        </div>
        <div data-enter style={{ "--i": 1 }} className="sig-faq grid gap-2">
          {FAQS.map((item) => (
            <details key={item.q} className="group bg-[var(--forest-deep)]">
              <summary className="flex items-center justify-between gap-6 px-6 py-5 transition-colors duration-200 hover:bg-black/10">
                <span className="sig-display text-[clamp(1.35rem,1.1rem+0.6vw,1.7rem)] leading-[1.05]">{item.q}</span>
                <Plus aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={2} />
              </summary>
              <p className="max-w-[44rem] px-6 pb-6 text-[17px] leading-relaxed text-[var(--cream)]">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
