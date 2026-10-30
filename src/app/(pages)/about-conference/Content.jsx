import Image from "next/image";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink, AccessionLabel } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

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

const COUNTRIES = ["All over the World", ];

// Figures already stated in the reasons below, set large.
const FIGURES = [
  ["55+", "Academics"],
  ["125+", "Research scholars"],
  ["10+", "Industry professionals"],
  // ["15+", "Awards presented"],
];

const ROOM = [
  ["/gallery/3rd-icsift (11).jpg", "A full session room at the 3rd ICSIFT", "The session room, 3rd ICSIFT"],
  ["/gallery/3rd-icsift (12).jpg", "A presenter at the lectern during a paper session", "A paper session in progress"],
  ["/gallery/3rd-icsift (5).jpg", "Two delegates holding a certificate in front of the conference backdrop", "Awards and certificates, 3rd ICSIFT"],
];

export default function AboutConferencePage() {
  const location = CONFERENCE.venue.location.trim();

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: the title with its date and place, the facts on tone-stepped cells, a panoramic photograph */}
      <section aria-labelledby="about-title" className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
              <h1 id="about-title" className="herb-display text-[clamp(2.75rem,1.2rem+4.4vw,5.75rem)]">
                A conference about what lasts.
              </h1>
              <p className="mt-6 text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] leading-snug tracking-[-0.01em]">
                {CONFERENCE.date}
                <span className="text-[var(--green)]"> · </span>
                {location} and online
              </p>
            </div>
            <div>
              <p className="max-w-[34rem] text-[17px] leading-relaxed">
                The {CONFERENCE.name.trim()} gathers experts from every sphere to share research, eco-friendly solutions and
                technological advances.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ActionLink href="/submission" primary>
                  Submit a paper
                </ActionLink>
                <ActionLink href="/registration">Register to attend</ActionLink>
              </div>
            </div>
          </div>

          <dl className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Edition", CONFERENCE.shortForm],
              ["Venue", CONFERENCE.venue.name.trim()],
              ["Format", "Keynotes, panels and workshops"],
              ["Attend", "In person or online"],
            ].map(([term, value]) => (
              <div key={term} className="bg-[var(--mount)] px-5 py-5">
                <dt className="herb-italic text-[14px] text-[var(--ink-2)]">{term}</dt>
                <dd className="mt-1 text-[17px] leading-snug">{value}</dd>
              </div>
            ))}
          </dl>

          <figure className="mt-10">
            <div className="herb-mount herb-photo herb-photo-settle relative aspect-[4/3] w-full sm:aspect-[2/1]">
              <Image
                src="/gallery/3rd-icsift  (59).jpeg"
                alt="Three delegates smiling at their table during a session at the 3rd ICSIFT"
                fill
                priority
                sizes="(min-width: 1400px) 1300px, 100vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">Delegates in session, 3rd ICSIFT</figcaption>
          </figure>
        </div>
      </section>

      {/* About, mission and highlights */}
      <section aria-labelledby="conference-title" className="px-4 pt-28 sm:px-6 lg:px-10 lg:pt-40">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <h2 id="conference-title" data-enter className="herb-h2 max-w-[22ch]">
            Where sustainability meets industry.
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
            <div data-enter style={{ "--i": 1 }}>
              <p className="max-w-[38rem] text-[clamp(1.2rem,1rem+0.5vw,1.45rem)] leading-[1.45]">
                The {CONFERENCE.shortForm}, in {location}, asks how and where sustainability, technological innovation and
                industrial futures intersect.
              </p>
              <p className="mt-5 max-w-[38rem] text-[17px]">
                Over {CONFERENCE.date}, keynote addresses, panels and practical workshops advance knowledge and start
                partnerships for sustainable development. The emphasis is on practical, scalable solutions and forward-thinking
                research: how new technologies can drive a more sustainable future for the planet.
              </p>

              <figure className="mt-10 bg-[var(--green)] p-6 text-white sm:p-8">
                <h3 className="herb-italic text-[17px] text-white/80">Our mission</h3>
                <blockquote className="mt-3 max-w-[36rem] text-[clamp(1.2rem,1rem+0.6vw,1.6rem)] leading-[1.35] tracking-[-0.01em] text-balance">
                  To bring together leading researchers, policymakers and industry experts to share knowledge, discuss
                  challenges and forge the partnerships that move the global sustainability agenda forward.
                </blockquote>
              </figure>
            </div>

            <div data-enter style={{ "--i": 2 }}>
              <h3 className="text-[22px] leading-tight tracking-[-0.01em]">Conference highlights</h3>
              <ul className="mt-6 grid gap-6">
                {HIGHLIGHTS.map(([title, body]) => (
                  <li key={title} className="border-l-[3px] border-[var(--green)] pl-5">
                    <p className="text-[20px] leading-snug">{title}</p>
                    <p className="herb-muted mt-1 text-[16px]">{body}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
                <Link href="/schedule" className="herb-link">
                  View the schedule
                </Link>
                <Link href="/theme-and-topics" className="herb-link">
                  Theme and topics
                </Link>
              </div>
            </div>
          </div>

          <div data-enter style={{ "--i": 3 }} className="mt-14 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <figure>
              <div className="herb-photo relative aspect-[3/2]">
                <Image
                  src="/gallery/3rd-icsift (19).jpg"
                  alt="A delegate speaking into a microphone during a round-table discussion"
                  fill
                  sizes="(min-width: 1024px) 860px, 100vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
              <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">Round-table discussion, 3rd ICSIFT</figcaption>
            </figure>
            <figure className="flex flex-col">
              <div className="herb-photo relative aspect-[3/2] sm:aspect-auto sm:flex-1">
                <Image
                  src="/gallery/3rd-icsift (8).jpg"
                  alt="A pile of green ICSIFT lanyards ready for delegates"
                  fill
                  sizes="(min-width: 1024px) 430px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">Delegate lanyards</figcaption>
            </figure>
          </div>
        </Reveal>
      </section>

      {/* Why attend: the field turns green and the figures are set large */}
      <section aria-labelledby="why-title" className="px-4 pt-28 sm:px-6 lg:px-10 lg:pt-40">
        <Reveal className="mx-auto max-w-[1400px] bg-[var(--green)] p-5 text-white sm:p-8 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h2 id="why-title" data-enter className="herb-display text-[clamp(2.6rem,1.4rem+3.6vw,5rem)]">
              Why attend.
            </h2>
            <p data-enter style={{ "--i": 1 }} className="max-w-[30rem] text-[18px] text-white/85">
              A platform for exploring transformative solutions and advancing sustainable technologies, with people from more
              than ten countries.
            </p>
          </div>

          <dl data-enter style={{ "--i": 2 }} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {FIGURES.map(([figure, label]) => (
              <div key={label} className="flex flex-col-reverse justify-end">
                <dt className="herb-italic mt-2 text-[17px] text-white/85">{label}</dt>
                <dd className="herb-display text-[clamp(3.25rem,1.8rem+4.4vw,6.5rem)]">{figure}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map(([title, body], index) => (
              <li key={title} data-enter style={{ "--i": 3 + (index % 3) }}>
                <h3 className="text-[20px] leading-snug">{title}</h3>
                <p className="mt-2 text-[16px] text-white/80">{body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {ROOM.map(([src, alt, caption], index) => (
              <figure key={src} data-enter style={{ "--i": 3 + index }}>
                <div className="herb-photo relative aspect-[4/3] bg-[var(--green-deep)]">
                  <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="herb-italic mt-3 text-[14px] text-white/75">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Who can attend */}
      <section aria-labelledby="who-title" className="px-4 pt-28 sm:px-6 lg:px-10 lg:pt-40">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-12 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20 lg:p-12">
          <div className="flex flex-col" data-enter>
            <h2 id="who-title" className="herb-h2 max-w-[14ch]">
              Who can attend.
            </h2>
            <p className="mt-5 max-w-[32rem] text-[17px]">
              Anyone working on sustainability, innovation or the technologies that connect them. Last edition&rsquo;s room
              came from nine countries.
            </p>

            <figure className="mt-10 lg:mt-auto lg:pt-10">
              <div className="herb-mount herb-photo relative aspect-[3/2]">
                <Image
                  src="/gallery/ICSIFT_06.jpg"
                  alt="Participants seated around a dinner table at the 1st ICSIFT"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">ICSIFT participants networking during the conference dinner at the 1st ICSIFT.</figcaption>
            </figure>

            {/* <AccessionLabel
              className="mt-10"
              rows={[["Countries", `${COUNTRIES.join(", ")}`], ["Edition", ]]}
            /> */}
          </div>

          <ul className="grid content-start gap-2">
            {AUDIENCE.map(([who, why], index) => (
              <li
                key={who}
                data-enter
                style={{ "--i": 1 + index }}
                className="group bg-[var(--mount)] px-5 py-5 transition-colors duration-300 hover:bg-[var(--green)] hover:text-white sm:px-6"
              >
                <h3 className="text-[20px] leading-snug">{who}</h3>
                <p className="mt-1 text-[16px] text-[var(--ink-2)] transition-colors duration-300 group-hover:text-white/85">{why}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Closing */}
      <section aria-labelledby="about-closing-title" className="px-4 pt-28 pb-16 sm:px-6 lg:px-10 lg:pt-40 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:p-12">
          <div>
            <h2 id="about-closing-title" data-enter className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Ready to join the {CONFERENCE.shortForm}?
            </h2>
            <p data-enter style={{ "--i": 1 }} className="mt-6 max-w-[34rem] text-[17px]">
              {CONFERENCE.date}, {location} and online. Submit a paper to present it, or register to attend.
            </p>
            <div data-enter style={{ "--i": 2 }} className="mt-8 grid gap-3 sm:grid-cols-2">
              <ActionLink href="/submission" primary>
                Submit a paper
              </ActionLink>
              <ActionLink href="/registration">Register to attend</ActionLink>
            </div>
          </div>
          <figure data-enter style={{ "--i": 2 }}>
            <div className="herb-mount herb-photo relative aspect-[4/3]">
              <Image
                src="/gallery/3rd-icsift (18).jpg"
                alt="Delegates of the 3rd ICSIFT gathered for a group photograph outside the venue"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">The delegates of the 3rd ICSIFT</figcaption>
          </figure>
        </Reveal>
      </section>
    </main>
  );
}

