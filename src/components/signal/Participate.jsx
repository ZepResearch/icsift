import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import Reveal from "@/components/home/Reveal";
import { conferenceDates } from "./Hero";

const AUDIENCE = [
  ["Researchers and academics", "Present peer-reviewed work and find collaborators across disciplines."],
  ["PhD scholars and students", "Test your research in front of an international room, at a student rate."],
  ["Industry professionals", "Bring field problems to the people building the next answers."],
  ["Policymakers and public bodies", "Take evidence straight from the research into planning."],
  ["Entrepreneurs and NGOs", "Meet partners for pilots, funding and green ventures."],
];

const EARNS = [
  {
    title: "Indexed publication",
    body: "Accepted papers are recommended to Scopus and Clarivate (Web of Science) indexed journals and proceedings.",
    href: "/journals",
    cta: "See the journals",
  },
  {
    title: "Certified CPD hours",
    body: "Attending earns certified hours toward your Continuing Professional Development record.",
    href: "/registration",
    cta: "Registration details",
  },
  {
    title: "Awards",
    body: "Best Talk, Top Paper and Best Student are among the awards that honour outstanding work.",
    href: "/awards",
    cta: "View the awards",
  },
];

// Forest field, two filled columns: the tag, heading and lead left (sticky on wide screens); the when / where / who
// facts as three large rows right. Beneath, who should come and what a paper earns, side by side.
export default function Participate() {
  const city = CONFERENCE.venue.location.trim();
  const facts = [
    [CalendarDays, "When?", conferenceDates(), CONFERENCE.date],
    [MapPin, "Where?", CONFERENCE.venue.name.trim(), `${CONFERENCE.venue.address.trim()} · and online`],
    [Users, "Who can join?", "Researchers, students and Academicians", "Present a paper, or attend in person or online"],
  ];

  return (
    <section aria-labelledby="participate-title" className="bg-[var(--forest)] text-[var(--signal)]">
      <Reveal className="mx-auto max-w-[1400px] px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <p data-enter className="sig-tag">
              Schedule
            </p>
            <h2 id="participate-title" data-enter style={{ "--i": 1 }} className="sig-h2 mt-6">
              When, where, and who can take part
            </h2>
            <p data-enter style={{ "--i": 2 }} className="mt-6 max-w-[34rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
              Two days of research, conversation and connection in {city}, with every session also open online.
            </p>
          </div>

          <dl className="grid gap-3">
            {facts.map(([Icon, term, value, note], index) => (
              <div
                key={term}
                data-enter
                style={{ "--i": 2 + index }}
                className="grid grid-cols-[3rem_1fr] gap-x-5 bg-[var(--forest-deep)] p-6 sm:grid-cols-[3.5rem_1fr] sm:p-8"
              >
                <Icon aria-hidden="true" className="row-span-3 h-9 w-9 sm:h-11 sm:w-11" strokeWidth={1.5} />
                <dt className="text-[17px] text-[var(--signal)]/75">{term}</dt>
                <dd className="sig-display mt-1 text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)] leading-[1.02]">{value}</dd>
                <dd className="mt-2 text-[16px] text-[var(--cream)]/85">{note}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-28 grid gap-16 lg:mt-36 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div data-enter>
            <h3 className="sig-display text-[clamp(2rem,1.5rem+1.6vw,3rem)]">Who should attend</h3>
            <ul className="mt-8 grid gap-6">
              {AUDIENCE.map(([who, why]) => (
                <li key={who} className="border-l-4 border-[var(--signal)] pl-5">
                  <p className="text-[20px] leading-snug font-semibold">{who}</p>
                  <p className="mt-1 text-[17px] text-[var(--cream)]/85">{why}</p>
                </li>
              ))}
            </ul>
          </div>

          <div data-enter style={{ "--i": 1 }}>
            <h3 className="sig-display text-[clamp(2rem,1.5rem+1.6vw,3rem)]">What your paper earns</h3>
            <ul className="mt-8 grid gap-3">
              {EARNS.map((item) => (
                <li key={item.title} className="bg-[var(--forest-deep)] p-6">
                  <p className="sig-display text-[26px] leading-none">{item.title}</p>
                  <p className="mt-3 text-[17px] text-[var(--cream)]">{item.body}</p>
                  <Link href={item.href} className="sig-link mt-4 inline-block text-[16px] font-semibold">
                    {item.cta}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-8 bg-[var(--cream)] px-6 py-5">
              <Image src="/assets/scopus.png" alt="Scopus" width={120} height={40} className="h-12 w-auto object-contain" />
              <Image src="/assets/clarivate.png" alt="Clarivate" width={140} height={42} className="h-16 w-auto object-contain" />
              <Image src="/assets/Crossref_Logo_Stacked_RGB_SMALL.png" alt="Clarivate" width={190} height={42} className="h-16 w-auto object-contain" />
              <Image src="/assets/DOI_logo.svg.png" alt="Clarivate" width={140} height={42} className="h-16 w-auto object-contain" />
              <Image src="/assets/google-scholar-logo (2).png" alt="Clarivate" width={140} height={42} className="h-10 w-auto object-contain" />

            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
