import Image from "next/image";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, CallBand, FactCells, Field, LEAD, PageHero, SPLIT, StickyIntro } from "@/components/signal/page";

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
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; an "On this page" index of large links right. */}
      <PageHero
        id="organizers-title"
        tag="Organisers"
        title="The people who put the room together"
        lead={`The ${CONFERENCE.shortForm} is organised by Zep Research with its co-organisers. Here is who we are, why we do it, and how to work with us.`}
        actions={<ActionPair tone="forest" primary={["/contact", "Contact the organisers"]} secondary={["/about-co-organizers", "Become a co-organiser"]} />}
        aside={
          <nav aria-label="On this page">
            <p className="text-[16px] text-[var(--muted)]">On this page</p>
            <ul className="mt-3 grid gap-2">
              {CONTENTS.map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="sig-display flex items-center justify-between bg-[var(--panel)] px-5 py-4 text-[clamp(1.4rem,1.1rem+0.8vw,1.9rem)] leading-none transition-colors duration-200 hover:bg-[var(--signal)] hover:text-[var(--forest)]"
                  >
                    {label}
                    <span aria-hidden="true">&darr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* About Zep Research: sticky text and roles left, the photograph right. */}
      <Field tone="cream" id="zep-research" labelledBy="zep-title">
        <div className={SPLIT}>
          <StickyIntro tag="Organiser" id="zep-title" title="About Zep Research">
            <p className={LEAD}>
              Zep Research organises conferences, research initiatives and collaboration programmes where researchers,
              academics and industry professionals share knowledge and work on new ideas together.
            </p>
            <p className="mt-5 max-w-[34rem] text-[17px] text-[var(--muted)]">
              We give individuals and institutions a platform for high-quality research dissemination and for serious discussion
              of emerging trends, challenges and solutions, across tourism, hospitality, education, sustainability and
              technology.
            </p>
          </StickyIntro>

          <div className="grid gap-8">
            <figure data-enter style={{ "--i": 2 }}>
              <div className="herb-photo relative aspect-[4/3]">
                <Image
                  src="/gallery/ICSIFT_10.jpg"
                  alt="A row of speaker boards set out on a table in front of the stage before a session"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[50%_75%]"
                />
              </div>
              <figcaption className="mt-3 text-[15px] text-[var(--muted)]">Speaker boards set out before the opening, ICSIFT in the Philippines</figcaption>
            </figure>
            <div data-enter style={{ "--i": 3 }}>
              <FactCells
                columns="sm:grid-cols-3"
                size="text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)]"
                facts={[
                  ["Organiser", "Zep Research"],
                  ["Co-organisers", `${CONFERENCE.coOrganizers?.length ?? 0} institutions`],
                  ["Media partner", "Conference Locate"],
                ]}
              />
            </div>
          </div>
        </div>
      </Field>

      {/* Mission: the quotation set large on forest. */}
      <Field tone="forest" id="mission" labelledBy="mission-title">
        <div className={SPLIT}>
          <StickyIntro tag="Mission" id="mission-title" title="Why we run ICSIFT" />
          <div data-enter style={{ "--i": 2 }}>
            <blockquote className="text-[clamp(1.6rem,1.15rem+1.5vw,2.6rem)] leading-[1.22] font-medium text-balance">
              &ldquo;The most transformative ideas emerge when diverse minds come together: researchers, technologists,
              entrepreneurs and visionaries alike.&rdquo;
            </blockquote>
            <p className="mt-10 max-w-[40rem] text-[18px] text-[var(--muted)]">
              Our mission for ICSIFT is to ignite innovation, foster cross-disciplinary collaboration and speed up the
              breakthroughs that shape the future.
            </p>
            <p className="mt-5 max-w-[40rem] text-[17px] text-[var(--muted)]">
              ICSIFT is meant as a catalyst for real-world impact: a space where ideas are exchanged openly, partnerships form
              naturally, and emerging talent is given room to lead the next wave of global innovation.
            </p>
          </div>
        </div>
      </Field>

      {/* Record: figures set huge, two to a row. */}
      <Field tone="cream" id="record" labelledBy="record-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="record-title" data-enter className="sig-h2">
            The record so far
          </h2>
          <p data-enter style={{ "--i": 1 }} className="max-w-[32rem] text-[17px] text-[var(--muted)]">
            Across all Zep Research conferences and initiatives, not only ICSIFT.{" "}
            <Link href="/previous-conference-report" className="sig-link font-semibold text-[var(--bark)]">
              Previous conference report
            </Link>
          </p>
        </div>
        <dl className="mt-12 grid gap-2 sm:grid-cols-2">
          {RECORD.map(([value, text], index) => (
            <div key={value} data-enter style={{ "--i": 2 + index }} className="flex flex-col-reverse justify-end bg-[var(--panel)] p-7 sm:p-9">
              <dt className="mt-3 max-w-[26rem] text-[18px] text-[var(--muted)]">{text}</dt>
              <dd className="sig-display text-[clamp(3.4rem,2rem+4vw,6rem)] leading-none">{value}</dd>
            </div>
          ))}
        </dl>
      </Field>

      <div id="partner" className="scroll-mt-28">
        <CallBand
          title="Partner with Zep Research"
          text="Want to collaborate on a future conference or research initiative? Get in touch and we will talk through how."
          primary={["/contact", "Contact the organisers"]}
          secondary={["/about-co-organizers", "Become a co-organiser"]}
        />
      </div>
    </main>
  );
}
