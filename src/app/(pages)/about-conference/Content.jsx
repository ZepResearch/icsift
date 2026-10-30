import Image from "next/image";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, BarList, CallBand, FactCells, Field, LEAD, PageHero, SPLIT, StickyIntro } from "@/components/signal/page";

const HIGHLIGHTS = [
  ["Sustainable innovation", "Green technologies and sustainable solutions for global challenges."],
  ["Global collaboration", "Experts, researchers and industry leaders from around the world in one programme."],
  ["Future technologies", "The tools that will shape a more sustainable world, and the people building them."],
];

const REASONS = [
  [
    "Explore cutting-edge innovations",
    "Research and future-focused technologies that are driving sustainable development and shaping what comes next.",
  ],
  [
    "Engage with global experts",
    "Network with 55+ academics, 125+ research scholars and 10+ industry professionals from more than ten countries.",
  ],
  [
    "Foster collaboration and partnerships",
    "Meet like-minded professionals and thought leaders, and leave with new ideas and joint projects.",
  ],
  [
    "Industry recognition and awards",
    "More than 15 awards recognise outstanding contributions to sustainability, innovation and future technologies.",
  ],
  [
    "Practical, actionable insights",
    "Sessions, discussions and workshops focused on real-world applications and strategies for sustainable growth.",
  ],
  ["Global exposure", "Show your work, share ideas and help shape solutions for a greener, more innovative future."],
];

const AUDIENCE = [
  ["Academics and researchers", "Present your research, exchange knowledge and collaborate to advance sustainable technologies."],
  ["Industry professionals", "Explore solutions and technologies that can drive sustainable growth in your industry."],
  ["Policymakers and government officials", "Gain insight to develop and implement policies that support sustainability and innovation."],
  ["Entrepreneurs and startups", "Discover trends, technologies and partners to fuel sustainable business growth."],
  ["Students and emerging scholars", "Learn from experts, present your research and build a network to start your career."],
  ["Environmental advocates and NGOs", "Connect with innovators and find strategies for sustainable change in communities."],
];

// Figures already stated in the reasons below, set large.
const FIGURES = [
  ["55+", "Academics"],
  ["125+", "Research scholars"],
  ["10+", "Industry professionals"],
];

const ROOM = [
  ["/gallery/3rd-icsift (11).jpg", "A full session room at the 3rd ICSIFT", "The session room, 3rd ICSIFT"],
  ["/gallery/3rd-icsift (12).jpg", "A presenter at the lectern during a paper session", "A paper session in progress"],
  ["/gallery/3rd-icsift (5).jpg", "Two delegates holding a certificate in front of the conference backdrop", "Awards and certificates, 3rd ICSIFT"],
];

export default function AboutConferencePage() {
  const location = CONFERENCE.venue.location.trim();

  return (
    <main className="sig min-h-screen">
      {/* Hero: title and lead left, the four facts on panels right, a duotone room photograph across the foot. */}
      <PageHero
        id="about-title"
        tag="About"
        title="A conference about what lasts"
        lead={`The ${CONFERENCE.name.trim()} gathers experts from every sphere to share research, eco-friendly solutions and technological advances.`}
        actions={<ActionPair tone="forest" />}
        aside={
          <FactCells
            facts={[
              ["When", CONFERENCE.date],
              ["Where", `${location}, and online`],
              ["Venue", CONFERENCE.venue.name.trim()],
              ["Format", "Keynotes, panels and workshops"],
            ]}
          />
        }
        photo={{ src: "/gallery/3rd-icsift  (59).jpeg", caption: "Delegates in session, 3rd ICSIFT", position: "object-[50%_40%]" }}
      />

      {/* About and mission: sticky statement left; mission, highlights and two photographs right. */}
      <Field tone="cream" labelledBy="conference-title">
        <div className={SPLIT}>
          <StickyIntro tag="The conference" id="conference-title" title="Where sustainability meets industry">
            <p className={LEAD}>
              The {CONFERENCE.shortForm}, in {location}, asks how and where sustainability, technological innovation and
              industrial futures intersect.
            </p>
            <p className="mt-5 max-w-[34rem] text-[17px] text-[var(--muted)]">
              Over {CONFERENCE.date}, keynote addresses, panels and practical workshops advance knowledge and start
              partnerships for sustainable development, with the emphasis on practical, scalable solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[16px] font-semibold">
              <Link href="/schedule" className="sig-link">
                View the schedule
              </Link>
              <Link href="/theme-and-topics" className="sig-link">
                Theme and topics
              </Link>
            </div>
          </StickyIntro>

          <div className="grid gap-10">
            <figure data-enter style={{ "--i": 2 }} className="bg-[var(--forest)] p-7 text-[var(--signal)] sm:p-10">
              <h3 className="sig-tag">Our mission</h3>
              <blockquote className="mt-4 text-[clamp(1.3rem,1.05rem+0.8vw,1.75rem)] leading-[1.3] font-medium text-balance">
                To bring together leading researchers, policymakers and industry experts to share knowledge, discuss challenges
                and forge the partnerships that move the global sustainability agenda forward.
              </blockquote>
            </figure>
            <div data-enter style={{ "--i": 3 }}>
              <h3 className="sig-display text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)]">Conference highlights</h3>
              <BarList items={HIGHLIGHTS} className="mt-6" />
            </div>
            <div data-enter style={{ "--i": 4 }} className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <figure>
                <div className="herb-photo relative aspect-[3/2]">
                  <Image
                    src="/gallery/3rd-icsift (19).jpg"
                    alt="A delegate speaking into a microphone during a round-table discussion"
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover object-[50%_35%]"
                  />
                </div>
                <figcaption className="mt-3 text-[15px] text-[var(--muted)]">Round-table discussion, 3rd ICSIFT</figcaption>
              </figure>
              <figure className="flex flex-col">
                <div className="herb-photo relative aspect-[3/2] sm:aspect-auto sm:flex-1">
                  <Image src="/gallery/3rd-icsift (8).jpg" alt="A pile of green ICSIFT lanyards ready for delegates" fill sizes="(min-width: 1024px) 240px, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-[15px] text-[var(--muted)]">Delegate lanyards</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </Field>

      {/* Why attend: figures set huge, the six reasons as panels, the room in three photographs. */}
      <Field tone="forest" labelledBy="why-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="why-title" data-enter className="sig-h2">
            Why attend
          </h2>
          <p data-enter style={{ "--i": 1 }} className="max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug text-[var(--muted)]">
            A platform for exploring transformative solutions and advancing sustainable technologies, with people from more
            than ten countries.
          </p>
        </div>

        <dl data-enter style={{ "--i": 2 }} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3">
          {FIGURES.map(([figure, label]) => (
            <div key={label} className="flex flex-col-reverse justify-end">
              <dt className="mt-2 text-[18px] text-[var(--muted)]">{label}</dt>
              <dd className="sig-display text-[clamp(3.6rem,2rem+4.6vw,7rem)] leading-none">{figure}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-16 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(([title, body], index) => (
            <li key={title} data-enter style={{ "--i": 3 + (index % 3) }} className="bg-[var(--panel)] p-6 sm:p-7">
              <h3 className="sig-display text-[clamp(1.35rem,1.1rem+0.6vw,1.7rem)] leading-[1.05]">{title}</h3>
              <p className="mt-3 text-[17px] text-[var(--muted)]">{body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-3 sm:grid-cols-3">
          {ROOM.map(([src, alt, caption], index) => (
            <figure key={src} data-enter style={{ "--i": 3 + index }}>
              <div className="herb-photo relative aspect-[4/3] bg-[var(--forest-deep)]">
                <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-[15px] text-[var(--muted)]">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </Field>

      {/* Who can attend: sticky heading and photograph left, the six audiences as panels right. */}
      <Field tone="cream" labelledBy="who-title">
        <div className={SPLIT}>
          <StickyIntro tag="Audience" id="who-title" title="Who can attend">
            <p className={LEAD}>
              Anyone working on sustainability, innovation or the technologies that connect them. Last edition&rsquo;s room
              came from nine countries.
            </p>
            <figure className="mt-10">
              <div className="herb-photo relative aspect-[3/2]">
                <Image
                  src="/gallery/ICSIFT_06.jpg"
                  alt="Participants seated around a dinner table at the 1st ICSIFT"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <figcaption className="mt-3 text-[15px] text-[var(--muted)]">Networking at the conference dinner, 1st ICSIFT</figcaption>
            </figure>
          </StickyIntro>

          <ul className="grid content-start gap-2">
            {AUDIENCE.map(([who, why], index) => (
              <li
                key={who}
                data-enter
                style={{ "--i": 1 + index }}
                className="group bg-[var(--panel)] p-6 transition-colors duration-300 hover:bg-[var(--forest)] hover:text-[var(--signal)] sm:p-7"
              >
                <h3 className="sig-display text-[clamp(1.4rem,1.1rem+0.8vw,1.9rem)] leading-[1.05]">{who}</h3>
                <p className="mt-2 text-[17px] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--cream)]">{why}</p>
              </li>
            ))}
          </ul>
        </div>
      </Field>

      <CallBand
        title={`Ready to join the ${CONFERENCE.shortForm}?`}
        text={`${CONFERENCE.date}, ${location} and online. Submit a paper to present it, or register to attend.`}
      />
    </main>
  );
}
