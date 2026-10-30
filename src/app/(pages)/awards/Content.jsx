import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, BarList, CallBand, Field, LEAD, PageHero, SPLIT, StickyIntro, Steps } from "@/components/signal/page";

const AWARDS = [
  {
    id: "best-presentation",
    name: "Best paper presentation award",
    description:
      "For exceptional oral presentation: clarity, audience engagement, and the ability to make complex ideas in sustainability and innovation accessible and compelling.",
    criteria: ["Clarity and organisation of the presentation", "Quality of visual materials", "Engagement with the audience", "Handling of the Q&A session"],
  },
  {
    id: "best-paper",
    name: "Best paper award",
    description:
      "For outstanding papers that show methodological rigour, new approaches and a significant contribution to sustainability and future technologies.",
    criteria: ["Originality and innovation", "Methodological rigour", "Significance of findings", "Quality of writing and organisation"],
  },
  {
    id: "outstanding-contributor",
    name: "Outstanding contributor award",
    description:
      "For Advisory Committee members who actively bring research papers, participants, presenters and listeners, and contribute significantly to the conference's success.",
    criteria: [
      "Number and quality of papers facilitated",
      "Participant registrations generated",
      "Contribution in bringing presenters and attendees",
      "Overall engagement and commitment",
    ],
    reward: "Special recognition, plus 10% remuneration per registration received through their contribution.",
  },
];

const JUDGING = [
  ["Initial screening", "The scientific committee reviews all eligible submissions and shortlists candidates for each award."],
  ["Live evaluation", "Judges attend the presentations and score them against each award's criteria."],
  ["Final selection", "The judging panel reviews every evaluation and selects the winners in each category."],
  ["Award ceremony", `Winners are announced and recognised at the closing ceremony, ${CONFERENCE.date}.`],
];

export default function AwardsPage() {
  return (
    <main className="sig min-h-screen">
      {/* Hero: title, lead and an index of the awards left; the plaque photograph right. */}
      <PageHero
        id="awards-title"
        tag="Awards"
        title="Work worth recognising"
        lead={`Awards at the ${CONFERENCE.shortForm} honour outstanding papers, presentations and contributors. They are merit based, and the best papers earn a discount on your next registration.`}
        actions={
          <div className="grid gap-8">
            <ul className="grid gap-2 sm:grid-cols-2">
              {[...AWARDS.map((award) => [award.id, award.name]), ["scholarships", "Grants and scholarships"]].map(([id, name]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex h-full items-center justify-between gap-3 bg-[var(--panel)] px-4 py-3 text-[16px] font-semibold transition-colors duration-200 hover:bg-[var(--signal)] hover:text-[var(--forest)]"
                  >
                    {name}
                    <span aria-hidden="true">&darr;</span>
                  </a>
                </li>
              ))}
            </ul>
            <ActionPair tone="forest" />
          </div>
        }
        aside={
          <figure>
            <div className="herb-photo relative aspect-[4/5] bg-[var(--forest-deep)]">
              <Image
                src="/gallery/3rd-icsift (5).jpg"
                alt="A conference co-chair receiving a recognition plaque on stage"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[45%_50%]"
              />
            </div>
            <figcaption className="mt-3 text-[15px] text-[var(--muted)]">A recognition plaque presented on stage, 3rd ICSIFT</figcaption>
          </figure>
        }
      />

      {/* The three awards as tall panels side by side. */}
      <Field tone="cream" labelledBy="categories-title">
        <h2 id="categories-title" data-enter className="sig-h2">
          Three awards, judged on merit
        </h2>
        <div className="mt-12 grid gap-2 lg:grid-cols-3">
          {AWARDS.map((award, index) => (
            <article
              key={award.id}
              id={award.id}
              data-enter
              style={{ "--i": 1 + index }}
              className="flex scroll-mt-28 flex-col bg-[var(--panel)] p-7 sm:p-8"
            >
              <span aria-hidden="true" className="sig-display text-[4rem] leading-[0.85]">
                {index + 1}
              </span>
              <h3 className="sig-display mt-5 text-[clamp(1.7rem,1.3rem+1vw,2.3rem)] leading-[1.02]">{award.name}</h3>
              <p className="mt-4 text-[17px] text-[var(--muted)]">{award.description}</p>
              <h4 className="mt-8 text-[17px] font-semibold">Criteria</h4>
              <BarList items={award.criteria.map((c) => [c])} className="mt-4 !gap-3" titleClass="text-[16.5px] font-medium" />
              {award.reward ? (
                <p className="mt-8 bg-[var(--forest)] p-4 text-[16px] text-[var(--signal)]">
                  <span className="font-semibold">Reward: </span>
                  {award.reward}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Field>

      {/* Scholarships */}
      <Field tone="forest" id="scholarships" labelledBy="scholarships-title">
        <div className={SPLIT}>
          <StickyIntro tag="Support" id="scholarships-title" title="Grants and scholarships">
            <p className={LEAD}>
              Zep Research helps young scholars reach their research and academic goals, and encourages them to bring
              interdisciplinary thinking to their work.
            </p>
            <p className="mt-5 max-w-[34rem] text-[17px] text-[var(--muted)]">
              Full or partial scholarships covering registration fees go to selected postgraduate students and early-career
              academics who might not otherwise afford to attend.
            </p>
          </StickyIntro>

          <div className="grid content-start gap-2">
            <div data-enter style={{ "--i": 2 }} className="bg-[var(--signal)] p-7 text-[var(--forest)] sm:p-9">
              <p className="sig-display text-[clamp(4rem,2.4rem+4.6vw,7rem)] leading-none">20%</p>
              <p className="mt-3 text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug font-semibold">
                Up to 20% off your next registration for the best paper and best paper presenters.
              </p>
              <p className="mt-2 text-[15.5px]">Scholarships depend on available funds and vary by conference.</p>
            </div>
            {[
              [
                "Who can receive one",
                "Awards are based on how well the opportunity fits the applicant's field of study, their financial need, and their contribution to their community and to Zep Research's mission of interdisciplinarity.",
              ],
              [
                "How recipients are selected",
                `The ${CONFERENCE.shortForm} Program Committee awards scholarships to eligible applicants whose exceptional abstracts passed blind peer review and were accepted for presentation. Presenting your work exceptionally at the conference is a second route to a scholarship.`,
              ],
            ].map(([term, value], index) => (
              <div key={term} data-enter style={{ "--i": 3 + index }} className="bg-[var(--panel)] p-7 sm:p-8">
                <h3 className="sig-display text-[clamp(1.5rem,1.2rem+0.8vw,2rem)]">{term}</h3>
                <p className="mt-3 text-[17px] text-[var(--muted)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Field>

      {/* Judging */}
      <Field tone="cream" labelledBy="judging-title">
        <div className={SPLIT}>
          <StickyIntro tag="Judging" id="judging-title" title="How winners are chosen">
            <p className={LEAD}>
              A panel of researchers, industry professionals and academic leaders evaluates every submission and presentation.
            </p>
          </StickyIntro>
          <div data-enter style={{ "--i": 2 }}>
            <Steps steps={JUDGING} />
          </div>
        </div>
      </Field>

      <CallBand
        title="Put your work in the running"
        text={`Submit your paper and register for the ${CONFERENCE.shortForm} to be considered for an award.`}
      />
    </main>
  );
}
