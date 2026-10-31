import Image from "next/image";
import Link from "next/link";
import { MapPin, Monitor } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, CallBand, Field, LEAD, PageHero, SPLIT, StickyIntro, Steps } from "@/components/signal/page";

const MODES = [
  {
    id: "in-person",
    name: "Speak at the event",
    where: `In person, ${CONFERENCE.venue.location.trim()}`,
    icon: MapPin,
    summary: "A 8-minute oral presentation followed by a 2-minute Q&A. Ideal for detailed findings and direct discussion.",
    prepare: [
      "PowerPoint or PDF slides in 16:9 format",
      "A concise overview of your research methodology",
      "A clear presentation of key findings and implications",
      // "A brief bio for the session chair's introduction",
    ],
  },
  {
    id: "online",
    name: "Present online",
    where: "Virtually, from anywhere",
    icon: Monitor,
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
  ["Be concise and focused", "Communicate your research question, methodology, findings and implications within the allotted time."],
  ["Use visuals effectively", "Clear, high-quality visuals should make your research easier to understand, not decorate it."],
  ["Practise your presentation", "Rehearse for smooth delivery and timing, especially for oral presentations."],
  ["Prepare for questions", "Anticipate what the room will ask and have thoughtful answers ready."],
  ["Engage with your audience", "Invite questions and discussion to get the most from your slot."],
];

function PrepareList({ items }) {
  return (
    <div>
      <h3 className="sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">What to prepare</h3>
      <ul className="mt-5 grid gap-2">
        {items.map((item) => (
          <li key={item} className="border-l-4 border-[var(--line)] bg-[var(--panel)] px-5 py-4 text-[17px] font-medium">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ModeOfPresentationPage() {
  const [inPerson, online] = MODES;

  return (
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the two modes as large jump cards right. */}
      <PageHero
        id="mode-title"
        tag="Presenting"
        title="Two ways to present"
        lead={`Present at the ${CONFERENCE.shortForm} in the room or online. Your paper counts the same either way; choose the mode that suits you.`}
        actions={<ActionPair tone="forest" />}
        aside={
          <ul className="grid gap-2">
            {MODES.map((mode) => (
              <li key={mode.id}>
                <a
                  href={`#${mode.id}`}
                  className="group grid grid-cols-[3rem_1fr] gap-x-4 bg-[var(--panel)] p-6 transition-colors duration-200 hover:bg-[var(--signal)] hover:text-[var(--forest)]"
                >
                  <mode.icon aria-hidden="true" className="row-span-3 h-9 w-9" strokeWidth={1.5} />
                  <span className="text-[15.5px] text-[var(--muted)] group-hover:text-[var(--forest)]/80">{mode.where}</span>
                  <span className="sig-display mt-1 text-[clamp(1.7rem,1.3rem+1.2vw,2.4rem)] leading-[1.02]">{mode.name}</span>
                  <span className="mt-2 text-[16px] text-[var(--muted)] group-hover:text-[var(--forest)]/80">{mode.summary}</span>
                </a>
              </li>
            ))}
          </ul>
        }
      />

      {/* In person: sticky text left, photograph and what to prepare right. */}
      <Field tone="cream" id={inPerson.id} labelledBy="in-person-title">
        <div className={SPLIT}>
          <StickyIntro tag="Mode one" id="in-person-title" title={inPerson.name}>
            <p className={LEAD}>{inPerson.summary}</p>
            <p className="mt-5 max-w-[34rem] text-[17px] text-[var(--muted)]">{inPerson.where}.</p>
          </StickyIntro>
          <div className="grid gap-10">
            <figure data-enter style={{ "--i": 2 }}>
              <div className="herb-photo relative aspect-[3/2]">
                <Image
                  src="/gallery/2nd-ICSIFT_05.jpg"
                  alt="A presenter speaking at the lectern in front of his slides"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[70%_50%]"
                />
              </div>
              <figcaption className="mt-3 text-[15px] text-[var(--muted)]">An oral presentation at the lectern, 2nd ICSIFT, Bangkok</figcaption>
            </figure>
            <div data-enter style={{ "--i": 3 }}>
              <PrepareList items={inPerson.prepare} />
            </div>
          </div>
        </div>
      </Field>

      {/* Online */}
      <Field tone="forest" id={online.id} labelledBy="online-title">
        <div className={SPLIT}>
          <StickyIntro tag="Mode two" id="online-title" title={online.name}>
            <p className={LEAD}>{online.summary}</p>
            <p className="mt-5 max-w-[34rem] text-[17px] text-[var(--muted)]">
              Online presenters follow the same programme and the same guidelines as those in the room.
            </p>
          </StickyIntro>
          <div data-enter style={{ "--i": 2 }}>
            <PrepareList items={online.prepare} />
          </div>
        </div>
      </Field>

      {/* Guidelines */}
      <Field tone="cream" labelledBy="guidelines-title">
        <div className={SPLIT}>
          <StickyIntro tag="Guidelines" id="guidelines-title" title="Whichever you choose">
            <p className={LEAD}>Five guidelines for every presenter, in the room or online.</p>
          </StickyIntro>
          <div data-enter style={{ "--i": 2 }}>
            <Steps steps={GUIDELINES} />
          </div>
        </div>
      </Field>

      <CallBand
        title="Ready to present your research?"
        text={
          <>
            Choose your mode when you submit. Check the{" "}
            <Link href="/papers-format" className="sig-link">
              paper format
            </Link>{" "}
            first.
          </>
        }
      />
    </main>
  );
}
