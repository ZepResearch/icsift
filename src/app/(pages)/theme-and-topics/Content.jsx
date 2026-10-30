import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, CallBand, Field, LEAD, PageHero, SPLIT, StickyIntro, Steps } from "@/components/signal/page";

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

const topicCount = TRACKS.reduce((sum, track) => sum + track.topics.length, 0);

export default function ThemeAndTopicsPage() {
  return (
    <main className="sig min-h-screen">
      {/* Hero: the theme itself is the headline; the six tracks as a jump index right. */}
      <PageHero
        id="theme-title"
        tag="Theme"
        title="Sustainable innovation: bridging technology and environmental stewardship"
        titleClass="text-[clamp(2.4rem,1.2rem+3.8vw,5rem)]"
        lead={`The theme of the ${CONFERENCE.shortForm}, and six tracks to submit under. Pick the track closest to your research.`}
        actions={<ActionPair tone="forest" secondary={["/papers-format", "Paper format"]} />}
        aside={
          <nav aria-label="Tracks">
            <ul className="grid gap-2 sm:grid-cols-2">
              {TRACKS.map((track, index) => (
                <li key={track.title}>
                  <a
                    href={`#track-${index + 1}`}
                    className="flex h-full flex-col gap-2 bg-[var(--panel)] p-5 transition-colors duration-200 hover:bg-[var(--signal)] hover:text-[var(--forest)]"
                  >
                    <span aria-hidden="true" className="sig-display text-[30px] leading-none">
                      {index + 1}
                    </span>
                    <span className="text-[16px] leading-snug font-semibold">{track.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* The theme in full */}
      <Field tone="cream" labelledBy="about-theme-title">
        <div className={SPLIT}>
          <StickyIntro tag="The theme" id="about-theme-title" title="What the theme asks" />
          <div data-enter style={{ "--i": 2 }}>
            <p className="max-w-[44rem] text-[clamp(1.3rem,1.05rem+0.8vw,1.8rem)] leading-[1.35] font-medium">
              The {CONFERENCE.shortForm} explores how new technologies are changing our approach to sustainability and
              environmental challenges. As the boundary between technology and sustainability blurs, innovation opens new ways to
              address climate change, resource scarcity and environmental degradation.
            </p>
            <p className="mt-6 max-w-[44rem] text-[18px] text-[var(--muted)]">
              We invite work that brings new approaches to environmental challenges, new applications of technology for
              sustainability, and critical perspectives on the methods and ethics of these emerging solutions.
            </p>
          </div>
        </div>
      </Field>

      {/* Tracks: each track a panel with its number large, title, and topics in two columns. */}
      <Field tone="forest" labelledBy="tracks-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="tracks-title" data-enter className="sig-h2">
            Six tracks, {topicCount} topics
          </h2>
          <p data-enter style={{ "--i": 1 }} className="max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug text-[var(--muted)]">
            Topics are a guide, not a fence. Interdisciplinary work is welcome in any track.
          </p>
        </div>
        <ul className="mt-12 grid gap-2 lg:grid-cols-2">
          {TRACKS.map((track, index) => (
            <li
              key={track.title}
              id={`track-${index + 1}`}
              data-enter
              style={{ "--i": 2 + (index % 2) }}
              className="scroll-mt-28 bg-[var(--panel)] p-6 sm:p-8"
            >
              <div className="grid grid-cols-[3.5rem_1fr] gap-x-4">
                <span aria-hidden="true" className="sig-display text-[3.4rem] leading-[0.85]">
                  {index + 1}
                </span>
                <h3 className="sig-display text-[clamp(1.5rem,1.2rem+0.9vw,2.1rem)] leading-[1.04]">{track.title}</h3>
              </div>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {track.topics.map((topic) => (
                  <li key={topic} className="border-l-2 border-[var(--line)] pl-3 text-[16.5px] text-[var(--cream)]">
                    {topic}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Field>

      {/* How to submit */}
      <Field tone="cream" labelledBy="steps-title">
        <div className={SPLIT}>
          <StickyIntro tag="Process" id="steps-title" title="From abstract to lectern">
            <p className={LEAD}>
              We welcome submissions from researchers, practitioners and students across all disciplines.{" "}
              <Link href="/papers-format" className="sig-link font-semibold">
                Paper format
              </Link>
            </p>
          </StickyIntro>
          <div data-enter style={{ "--i": 2 }}>
            <Steps steps={STEPS} />
          </div>
        </div>
      </Field>

      <CallBand title="Found your track?" text="Submit your paper and join the conversation on sustainability, innovation and future technologies." />
    </main>
  );
}
