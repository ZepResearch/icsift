import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { AwardFigure, HoursFigure } from "./CreditFigures";

const ENTRIES = [
  {
    term: "Publication",
    title: "Indexed journals and proceedings",
    body: "Accepted papers are recommended to Scopus and Clarivate (Web of Science) indexed journals and conference proceedings.",
    href: "/journals",
    cta: "See the journals",
    marks: true,
  },
  {
    term: "Credit",
    title: "Certified CPD hours",
    body: "Attending earns certified hours toward your Continuing Professional Development record.",
    href: "/registration",
    cta: "Registration details",
    figure: HoursFigure,
  },
  {
    term: "Recognition",
    title: "More than One awards",
    body: "Best Talk, Top Paper and Best Student are among the awards that honour outstanding work at the conference.",
    href: "/awards",
    cta: "View the awards",
    figure: AwardFigure,
  },
];

export default function CreditBand() {
  return (
    <section aria-labelledby="credit-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="credit-title" className="herb-h2 max-w-[18ch]">
          What your paper earns you.
        </h2>
        <Reveal className="herb-label mt-10 grid lg:grid-cols-3">
          {ENTRIES.map((entry, index) => (
            <div
              key={entry.term}
              className={`flex flex-col p-6 sm:p-8 ${index ? "border-t border-[var(--ink)] lg:border-t-0 lg:border-l" : ""}`}
            >
              <p className="herb-italic text-[15px] text-[var(--ink-2)]">{entry.term}</p>
              <h3 className="mt-3 text-[1.6rem] leading-tight font-normal tracking-[-0.02em]">{entry.title}</h3>
              <p className="herb-muted mt-3 max-w-[36ch] text-[16px]">{entry.body}</p>
              {entry.marks ? (
                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <Image src="/assets/scopus.png" alt="Scopus" width={120} height={40} className="h-8 w-auto object-contain" />
                  <Image src="/assets/clarivate.png" alt="Clarivate" width={140} height={42} className="h-11 w-auto object-contain" />
                  <Image src="/assets/zepresearch.png" alt="Web of Science" width={140} height={42} className="h-11 w-auto object-contain" />
                </div>
              ) : null}
              {entry.figure ? (
                <div className="mt-8 w-full max-w-[240px]">
                  <entry.figure />
                </div>
              ) : null}
              <Link href={entry.href} className="herb-link mt-auto pt-8 text-[15.5px]">
                {entry.cta}
              </Link>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
