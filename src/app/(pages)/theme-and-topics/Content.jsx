import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

const TRACKS = [
  {
    title: "Sustainable development and environmental technologies",
    topics: [
      "Renewable energy systems and green technologies",
      "Climate change mitigation and adaptation",
      "Sustainable agriculture and food security",
      "Environmental management and policy",
      "Circular economy and waste management",
    ],
  },
  {
    title: "Artificial intelligence, data science and emerging technologies",
    topics: [
      "Artificial intelligence and machine learning applications",
      "Big data analytics and predictive modelling",
      "Internet of Things (IoT) and smart systems",
      "Robotics and automation",
      "Blockchain and cybersecurity",
    ],
  },
  {
    title: "Engineering innovations and smart infrastructure",
    topics: [
      "Smart cities and urban development",
      "Civil, mechanical and industrial engineering innovations",
      "Advanced materials and manufacturing technologies",
      "Transportation and mobility solutions",
      "Sustainable construction technologies",
    ],
  },
  {
    title: "Management, economics and sustainable business practices",
    topics: [
      "Sustainable business models and entrepreneurship",
      "Green finance and economic development",
      "Sustainable management and digital transformation",
      "Supply chain and operations management",
      "Corporate social responsibility (CSR)",
    ],
  },
  {
    title: "Science, technology and future innovations",
    topics: [
      "Biotechnology and life sciences innovations",
      "Nanotechnology and advanced scientific research",
      "Healthcare technologies and medical innovations",
      "Space, defence and advanced research technologies",
      "Interdisciplinary scientific innovations",
    ],
  },
  {
    title: "Social sciences, education and policy for sustainability",
    topics: [
      "Education for sustainable development",
      "Public policy and governance",
      "Social innovation and community development",
      "Ethics, technology and society",
      "Digital learning and educational technologies",
      "Linguistic and sustainable technologies",
    ],
  },
];

const STEPS = [
  [
    "Prepare your abstract",
    "Submit a 300-word abstract outlining your research question, methodology, findings and relevance to the sustainability and innovation theme.",
  ],
  ["Abstract review", "The interdisciplinary committee reviews abstracts. If yours is accepted, you are invited to submit a full paper."],
  [
    "Full paper submission",
    "Submit your full paper (8 to 12 pages) following the format guidelines. Every paper goes through double-blind peer review by experts in its field.",
  ],
  [
    "Presentation",
    "Accepted papers are presented in person or online, depending on your preference and the committee's recommendation.",
  ],
];

const trackNo = (index) => String(index + 1).padStart(2, "0");

export default function ThemeAndTopicsPage() {
  return (
    <main className="herb min-h-screen">
      {/* Title sheet: the theme itself is the headline, over a six-cell index of tracks. */}
      <section aria-labelledby="theme-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 id="theme-title" className="herb-display text-[clamp(2.5rem,1.3rem+3.2vw,4.5rem)]">
              Sustainable innovation: bridging technology and environmental stewardship.
            </h1>
            <div>
              <p className="herb-muted max-w-[34rem] text-[17.5px] leading-relaxed">
                The theme of the {CONFERENCE.shortForm}, and six tracks to submit under. Pick the track closest to your
                research.
              </p>
              <ActionLink href="/submission" primary className="mt-6 sm:max-w-[22rem]">
                Submit a paper
              </ActionLink>
            </div>
          </div>

          <nav aria-label="Tracks" className="mt-12">
            <ol className="grid gap-px border-y border-[var(--ink)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3">
              {TRACKS.map((track, index) => (
                <li key={track.title} className="bg-[var(--sheet)]">
                  <a href={`#track-${index + 1}`} className="group flex h-full gap-4 py-5 sm:px-5">
                    <span className="herb-italic pt-0.5 text-[14.5px] text-[var(--ink-2)]">{trackNo(index)}</span>
                    <span className="text-[17px] leading-snug group-hover:text-[var(--green)]">{track.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* The theme in full */}
      <section aria-labelledby="about-theme-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <h2 id="about-theme-title" className="herb-h2 max-w-[13ch]">
            What the theme asks.
          </h2>
          <Reveal className="border-t border-[var(--ink)] pt-8">
            <p className="max-w-[42rem] text-[18px] leading-relaxed">
              The {CONFERENCE.shortForm} explores how new technologies are changing our approach to sustainability and
              environmental challenges. As the boundary between technology and sustainability blurs, innovation opens new ways
              to address climate change, resource scarcity and environmental degradation.
            </p>
            <p className="herb-muted mt-5 max-w-[42rem]">
              We invite work that brings new approaches to environmental challenges, new applications of technology for
              sustainability, and critical perspectives on the methods and ethics of these emerging solutions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tracks */}
      <section aria-labelledby="tracks-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="tracks-title" className="herb-h2 max-w-[14ch]">
              Six tracks, thirty-one topics.
            </h2>
            <p className="herb-muted max-w-[28rem]">Topics are a guide, not a fence. Interdisciplinary work is welcome in any track.</p>
          </div>

          <div className="mt-10 border-t border-[var(--ink)]">
            {TRACKS.map((track, index) => (
              <div
                key={track.title}
                id={`track-${index + 1}`}
                className="grid scroll-mt-24 gap-x-10 gap-y-4 border-b border-[var(--rule)] py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              >
                <div>
                  <p className="herb-italic text-[15px] text-[var(--ink-2)]">Track {trackNo(index)}</p>
                  <h3 className="mt-2 max-w-[22ch] text-[clamp(1.4rem,1.15rem+0.8vw,1.85rem)] leading-tight font-normal tracking-[-0.02em]">
                    {track.title}
                  </h3>
                </div>
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {track.topics.map((topic) => (
                    <li key={topic} className="border-b border-[var(--rule-soft)] py-2.5 text-[16px]">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* How to submit */}
      <section aria-labelledby="steps-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="steps-title" className="herb-h2 max-w-[13ch]">
              From abstract to lectern.
            </h2>
            <p className="herb-muted mt-5 max-w-[26rem]">
              We welcome submissions from researchers, practitioners and students across all disciplines.{" "}
              <Link href="/papers-format" className="herb-link">
                Paper format
              </Link>
            </p>
          </div>
          <Reveal as="ol" className="border-t border-[var(--ink)]">
            {STEPS.map(([title, body], index) => (
              <li
                key={title}
                className="grid grid-cols-[2.5rem_1fr] gap-y-1 border-b border-[var(--rule)] py-6 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-x-6"
              >
                <span className="herb-italic text-[14px] text-[var(--ink-2)]">{trackNo(index)}</span>
                <h3 className="text-[18px] leading-snug font-medium">{title}</h3>
                <p className="herb-muted col-start-2 text-[15.5px] sm:col-start-3">{body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section aria-labelledby="theme-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="theme-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Found your track?
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Submit your paper and join the conversation on sustainability, innovation and future technologies.
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
