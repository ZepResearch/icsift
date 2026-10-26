import Image from "next/image";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

const MODES = [
  {
    id: "in-person",
    name: "Speak at the event",
    where: `In person, ${CONFERENCE.venue.location.trim()}`,
    summary: "A 15-minute oral presentation followed by a 5-minute Q&A. Ideal for detailed findings and direct discussion.",
    prepare: [
      "PowerPoint or PDF slides in 16:9 format",
      "A concise overview of your research methodology",
      "A clear presentation of key findings and implications",
      "A brief bio for the session chair's introduction",
    ],
  },
  {
    id: "online",
    name: "Present online",
    where: "Virtually, from anywhere",
    summary: "Can't travel? Present through the online platform, with the same chance for questions and discussion.",
    prepare: [
      "PowerPoint or PDF slides in 16:9 format",
      "A stable internet connection, at least 5 Mbps upload",
      "A webcam and a good-quality microphone",
      "A pre-recorded backup of your presentation",
    ],
  },
];

const GUIDELINES = [
  ["Be concise and focused.", "Communicate your research question, methodology, findings and implications within the allotted time."],
  ["Use visuals effectively.", "Clear, high-quality visuals should make your research easier to understand, not decorate it."],
  ["Practise your presentation.", "Rehearse for smooth delivery and timing, especially for oral presentations."],
  ["Prepare for questions.", "Anticipate what the room will ask and have thoughtful answers ready."],
  ["Engage with your audience.", "Invite questions and discussion to get the most from your slot."],
];

function PrepareList({ items }) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">What to prepare</h3>
      <ol className="mt-4 border-t border-[var(--ink)]">
        {items.map((item, index) => (
          <li key={item} className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-[var(--rule)] py-3.5">
            <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-[17px]">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ModeOfPresentationPage() {
  const [inPerson, online] = MODES;

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title and intro, then the two modes split side by side as a chooser. */}
      <section aria-labelledby="mode-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 id="mode-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Two ways to present.
            </h1>
            <p className="herb-muted max-w-[34rem] text-[17.5px] leading-relaxed">
              Present at the {CONFERENCE.shortForm} in the room or online. Your paper counts the same either way; choose the
              mode that suits you.
            </p>
          </div>

          <div className="mt-12 grid gap-px border-y border-[var(--ink)] bg-[var(--rule)] md:grid-cols-2">
            {MODES.map((mode, index) => (
              <a
                key={mode.id}
                href={`#${mode.id}`}
                className="group flex flex-col bg-[var(--sheet)] py-7 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <span className="herb-italic text-[14.5px] text-[var(--ink-2)]">
                  Mode {String(index + 1).padStart(2, "0")} · {mode.where}
                </span>
                <span className="mt-3 text-[clamp(1.6rem,1.2rem+1.2vw,2.25rem)] leading-tight tracking-[-0.02em] group-hover:text-[var(--green)]">
                  {mode.name}
                </span>
                <span className="herb-muted mt-3 max-w-[30rem] text-[16px]">{mode.summary}</span>
              </a>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:max-w-[44rem] sm:grid-cols-2">
            <ActionLink href="/submission" primary>
              Submit a paper
            </ActionLink>
            <ActionLink href="/registration">Register to attend</ActionLink>
          </div>
        </div>
      </section>

      {/* In person */}
      <section id={inPerson.id} aria-labelledby="in-person-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:p-12">
          <figure>
            <div className="herb-mount herb-photo relative aspect-[3/2]">
              <Image
                src="/gallery/2nd-ICSIFT_05.jpg"
                alt="A presenter speaking at the lectern in front of his slides"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[70%_50%]"
              />
            </div>
            <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">
              An oral presentation at the lectern, 2nd ICSIFT, Bangkok
            </figcaption>
          </figure>
          <div>
            <h2 id="in-person-title" className="herb-h2 max-w-[14ch]">
              {inPerson.name}.
            </h2>
            <p className="mt-6 max-w-[38rem] text-[18px] leading-relaxed">{inPerson.summary}</p>
            <div className="mt-10">
              <PrepareList items={inPerson.prepare} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Online */}
      <section id={online.id} aria-labelledby="online-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:p-12">
          <div>
            <h2 id="online-title" className="herb-h2 max-w-[14ch]">
              {online.name}.
            </h2>
            <p className="mt-6 max-w-[38rem] text-[18px] leading-relaxed">{online.summary}</p>
            <p className="herb-muted mt-5 max-w-[38rem]">
              Online presenters follow the same programme and the same guidelines as those in the room.
            </p>
          </div>
          <PrepareList items={online.prepare} />
        </Reveal>
      </section>

      {/* Guidelines */}
      <section aria-labelledby="guidelines-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="guidelines-title" className="herb-h2 max-w-[13ch]">
              Whichever you choose.
            </h2>
            <p className="herb-muted mt-5 max-w-[26rem]">Five guidelines for every presenter, in the room or online.</p>
          </div>
          <Reveal as="ol" className="border-t border-[var(--ink)]">
            {GUIDELINES.map(([title, body], index) => (
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

      {/* Closing */}
      <section aria-labelledby="mode-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="mode-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Ready to present your research?
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Choose your mode when you submit. Check the{" "}
              <Link href="/papers-format" className="herb-link">
                paper format
              </Link>{" "}
              first.
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
