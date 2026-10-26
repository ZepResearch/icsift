import Image from "next/image";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink, AccessionLabel } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

const CONTENTS = [
  ["#zep-research", "About Zep Research"],
  ["#mission", "Why we run ICSIFT"],
  ["#record", "The record so far"],
  ["#partner", "Partner with us"],
];

const RECORD = [
  ["25+", "countries reached by our conferences and research initiatives, across five continents"],
  ["10,000+", "researchers, academics and industry professionals in our network"],
  ["5,000+", "peer-reviewed papers taken to publication in indexed journals"],
  ["200+", "partner organisations putting research findings into practice"],
];

export default function AboutOrganizersPage() {
  return (
    <main className="herb min-h-screen">
      {/* Title sheet: a contents index on the left, the title set large on the right. No photograph. */}
      <section aria-labelledby="organizers-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-12 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20 lg:p-12">
          <div className="flex flex-col">
            <h1 id="organizers-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              The people who put the room together.
            </h1>
            <p className="herb-muted mt-8 max-w-[36rem] text-[17.5px] leading-relaxed">
              The {CONFERENCE.shortForm} is organised by Zep Research with the Polytechnic University of the Philippines. Here
              is who we are, why we do it, and how to work with us.
            </p>
            <div className="mt-10 grid gap-3 sm:max-w-[36rem] sm:grid-cols-2 lg:mt-auto lg:pt-12">
              <ActionLink href="/contact" primary>
                Contact the organisers
              </ActionLink>
              <ActionLink href="/about-co-organizers">Become a co-organiser</ActionLink>
            </div>
          </div>

          <nav aria-label="On this page" className="lg:pt-3">
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">On this page</h2>
            <ol className="mt-4 border-t border-[var(--ink)]">
              {CONTENTS.map(([href, label], index) => (
                <li key={href} className="border-b border-[var(--rule)]">
                  <a href={href} className="group grid grid-cols-[2.5rem_1fr] items-baseline py-4 text-[18px] hover:text-[var(--green)]">
                    <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
            <AccessionLabel
              className="mt-8"
              rows={[
                ["Conference", CONFERENCE.shortForm],
                ["Dates", CONFERENCE.date],
                ["Locality", `${CONFERENCE.venue.location.trim()} · and online`],
              ]}
            />
          </nav>
        </div>
      </section>

      {/* About Zep Research */}
      <section id="zep-research" aria-labelledby="zep-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:p-12">
          <div>
            <h2 id="zep-title" className="herb-h2 max-w-[14ch]">
              About Zep Research.
            </h2>
            <p className="mt-8 max-w-[38rem] text-[18px] leading-relaxed">
              Zep Research organises conferences, research initiatives and collaboration programmes where researchers,
              academics and industry professionals share knowledge and work on new ideas together.
            </p>
            <p className="herb-muted mt-5 max-w-[38rem]">
              We give individuals and institutions a platform for high-quality research dissemination and for serious
              discussion of emerging trends, challenges and solutions, across tourism, hospitality, education, sustainability
              and technology. Connecting experts, thought leaders and innovators is how we leave a lasting mark on academia
              and industry.
            </p>

            <dl className="herb-label mt-10 divide-y divide-[var(--rule)]">
              {[
                ["Organiser", "Zep Research"],
                ["Co-organiser", "Polytechnic University of the Philippines, Quezon City"],
                ["Media partner", "Conference Locate"],
              ].map(([term, value]) => (
                <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-2.5 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure>
            <div className="herb-mount herb-photo relative aspect-[16/9] lg:aspect-[4/3]">
              <Image
                src="/gallery/ICSIFT_10.jpg"
                alt="A row of speaker boards set out on a table in front of the stage before a session"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_75%]"
              />
            </div>
            <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">
              Speaker boards set out before the opening, ICSIFT in the Philippines
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Mission */}
      <section id="mission" aria-labelledby="mission-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <h2 id="mission-title" className="herb-h2 max-w-[12ch]">
            Why we run ICSIFT.
          </h2>
          <Reveal className="border-t border-[var(--ink)] pt-8">
            <blockquote className="herb-italic text-[clamp(1.5rem,1.1rem+1.4vw,2.2rem)] leading-[1.28] tracking-[-0.01em] text-balance">
              &ldquo;The most transformative ideas emerge when diverse minds come together: researchers, technologists,
              entrepreneurs and visionaries alike.&rdquo;
            </blockquote>
            <p className="mt-8 max-w-[40rem] text-[17px] leading-relaxed">
              Our mission for ICSIFT is to ignite innovation, foster cross-disciplinary collaboration and speed up the
              breakthroughs that shape the future.
            </p>
            <p className="herb-muted mt-5 max-w-[40rem]">
              ICSIFT is meant as a catalyst for real-world impact: a space where ideas are exchanged openly, partnerships form
              naturally, and emerging talent is given room to lead the next wave of global innovation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Record */}
      <section id="record" aria-labelledby="record-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <h2 id="record-title" className="herb-h2 max-w-[14ch]">
              The record so far.
            </h2>
            <p className="herb-muted max-w-[34rem] lg:justify-self-end">
              Across all Zep Research conferences and initiatives, not only ICSIFT.{" "}
              <Link href="/previous-conference-report" className="herb-link">
                Previous conference report
              </Link>
            </p>
          </div>
          <dl className="mt-10 border-t border-[var(--ink)]">
            {RECORD.map(([value, text]) => (
              <div
                key={value}
                className="grid items-baseline gap-x-8 gap-y-1 border-b border-[var(--rule)] py-5 sm:grid-cols-[12rem_1fr]"
              >
                <dt className="text-[clamp(2rem,1.6rem+1.2vw,2.75rem)] leading-none tracking-[-0.02em]">{value}</dt>
                <dd className="herb-muted text-[16.5px]">{text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Partner */}
      <section id="partner" aria-labelledby="partner-title" className="scroll-mt-24 px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="partner-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Partner with Zep Research.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Want to collaborate on a future conference or research initiative? Get in touch and we will talk through how.
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/contact" primary>
              Contact the organisers
            </ActionLink>
            <ActionLink href="/about-co-organizers">Become a co-organiser</ActionLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
