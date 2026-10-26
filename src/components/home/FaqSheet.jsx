import Link from "next/link";
import { Plus } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";

const FAQS = [
  {
    q: "How do I register?",
    a: `Register online for ${CONFERENCE.shortForm}, in person or virtually. Organisations sending five or more attendees can ask about group rates.`,
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

export default function FaqSheet() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <h2 id="faq-title" className="herb-h2 max-w-[12ch]">
            Before you ask.
          </h2>
          <p className="herb-muted mt-5 max-w-[26rem]">
            Anything else, write to{" "}
            <a href="mailto:info@icsift.com" className="herb-link">
              info@icsift.com
            </a>{" "}
            or see the <Link href="/contact" className="herb-link">contact page</Link>.
          </p>
        </div>
        <div className="herb-faq border-t border-[var(--ink)]">
          {FAQS.map((item) => (
            <details key={item.q} className="border-b border-[var(--rule)]">
              <summary className="flex items-center justify-between gap-6 py-5 text-[18px] hover:text-[var(--green)]">
                {item.q}
                <Plus aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.4} />
              </summary>
              <p className="herb-muted max-w-[44rem] pb-6 text-[16px] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
