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

export default function AboutConferencePage() {
  const location = CONFERENCE.venue.location.trim();

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: stacked title, ruled fact strip, panoramic specimen */}
      <section aria-labelledby="about-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 id="about-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              A conference about what lasts.
            </h1>
            <div>
              <p className="herb-muted max-w-[34rem] text-[17.5px] leading-relaxed">
                The {CONFERENCE.name.trim()} gathers experts from every sphere to share research, eco-friendly solutions and
                technological advances, in {location} and online.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ActionLink href="/submission" primary>
                  Submit a paper
                </ActionLink>
                <ActionLink href="/registration">Register to attend</ActionLink>
              </div>
            </div>
          </div>

          {/* The 1px gap shows the rule colour through, drawing hairlines between cells at every breakpoint. */}
          <dl className="mt-12 grid gap-px border-y border-[var(--ink)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Edition", CONFERENCE.shortForm],
              ["Dates", CONFERENCE.date],
              ["Locality", `${location} · and online`],
              ["Format", "Keynotes, panels and workshops"],
            ].map(([term, value]) => (
              <div key={term} className="bg-[var(--sheet)] px-1 py-5 sm:px-5">
                <dt className="herb-italic text-[14.5px] text-[var(--ink-2)]">{term}</dt>
                <dd className="mt-1 text-[18px] leading-snug">{value}</dd>
              </div>
            ))}
          </dl>

          <figure className="mt-10">
            <div className="herb-mount herb-photo herb-photo-settle relative aspect-[4/3] w-full sm:aspect-[21/9]">
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

      {/* About and mission */}
      <section aria-labelledby="conference-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2 id="conference-title" className="herb-h2 max-w-[16ch]">
                Where sustainability, technology and industry meet.
              </h2>
              <p className="mt-8 max-w-[38rem] text-[18px] leading-relaxed">
                The {CONFERENCE.shortForm}, in {location}, asks how and where sustainability, technological innovation and
                industrial futures intersect.
              </p>
              <p className="herb-muted mt-5 max-w-[38rem]">
                Over {CONFERENCE.date}, keynote addresses, panels and practical workshops advance knowledge and start
                partnerships for sustainable development. The emphasis is on practical, scalable solutions and forward-thinking
                research: how new technologies can drive a more sustainable future for the planet.
              </p>

              <figure className="mt-10 border-t border-[var(--ink)] pt-6">
                <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Our mission</h3>
                <blockquote className="herb-italic mt-4 max-w-[38rem] text-[clamp(1.25rem,1rem+0.8vw,1.6rem)] leading-[1.35] text-balance">
                  To bring together leading researchers, policymakers and industry experts to share knowledge, discuss
                  challenges and forge the partnerships that move the global sustainability agenda forward.
                </blockquote>
              </figure>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Conference highlights</h3>
              <ol className="mt-4 border-t border-[var(--ink)]">
                {HIGHLIGHTS.map(([title, body], index) => (
                  <li key={title} className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-[var(--rule)] py-5">
                    <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-[18px]">{title}</span>
                      <span className="herb-muted mt-1 block text-[15.5px]">{body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15.5px]">
                <Link href="/schedule" className="herb-link">
                  View the schedule
                </Link>
                <Link href="/theme-and-topics" className="herb-link">
                  Theme and topics
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Why attend */}
      <section aria-labelledby="why-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="why-title" className="herb-h2 max-w-[13ch]">
              Why attend.
            </h2>
            <p className="herb-muted mt-5 max-w-[26rem]">
              A platform for exploring transformative solutions and advancing sustainable technologies.
            </p>
          </div>
          <Reveal as="ol" className="border-t border-[var(--ink)]">
            {REASONS.map(([title, body], index) => (
              <li
                key={title}
                className="grid grid-cols-[2.5rem_1fr] gap-y-1 border-b border-[var(--rule)] py-6 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-x-6"
              >
                <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-[18px] leading-snug font-medium">{title}</h3>
                <p className="herb-muted col-start-2 text-[15.5px] sm:col-start-3">{body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Who can attend */}
      <section aria-labelledby="who-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:p-12">
          <div className="flex flex-col">
            <h2 id="who-title" className="herb-h2 max-w-[14ch]">
              Who can attend.
            </h2>
            <p className="herb-muted mt-5 max-w-[32rem]">
              Anyone working on sustainability, innovation or the technologies that connect them. Last edition&rsquo;s room
              came from nine countries.
            </p>

            <figure className="mt-10">
              <div className="herb-mount herb-photo relative aspect-[3/2]">
                <Image
                  src="/gallery/ICSIFT_06.jpg"
                  alt="A student from the University of the Cordilleras speaking at the lectern"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">ICSIFT participants networking during the conference dinner at the 1st ICSIFT.</figcaption>
            </figure>

            <AccessionLabel
              className="mt-10"
              rows={[["Countries", `${COUNTRIES.join(", ")}`], ["Edition", "3rd ICSIFT, 2026"]]}
            />
          </div>

          <div>
            <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Who it is for</h3>
            <ul className="mt-4 border-t border-[var(--ink)]">
              {AUDIENCE.map(([who, why]) => (
                <li key={who} className="border-b border-[var(--rule)] py-5">
                  <p className="text-[18px]">{who}</p>
                  <p className="herb-muted mt-1 text-[15.5px]">{why}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section aria-labelledby="about-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="about-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Ready to join the {CONFERENCE.shortForm}?
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              {CONFERENCE.date}, {location} and online. Submit a paper to present it, or register to attend.
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/submission" primary>
              Submit a paper
            </ActionLink>
            <ActionLink href="/registration">Register to attend</ActionLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
