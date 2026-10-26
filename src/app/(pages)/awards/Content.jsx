import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

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

const no = (index) => String(index + 1).padStart(2, "0");

export default function AwardsPage() {
  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title and a numbered index of the awards left, a tall photograph right. */}
      <section aria-labelledby="awards-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:p-12">
          <div className="flex flex-col">
            <h1 id="awards-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Work worth recognising.
            </h1>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
              Awards at the {CONFERENCE.shortForm} honour outstanding papers, presentations and contributors. They are merit
              based, and the best papers earn a discount on your next registration.
            </p>

            <ol className="mt-10 border-t border-[var(--ink)]">
              {AWARDS.map((award, index) => (
                <li key={award.id} className="border-b border-[var(--rule)]">
                  <a href={`#${award.id}`} className="grid grid-cols-[2.5rem_1fr] items-baseline py-4 text-[19px] hover:text-[var(--green)]">
                    <span className="herb-italic text-[14px] text-[var(--ink-2)]">{no(index)}</span>
                    {award.name}
                  </a>
                </li>
              ))}
              <li className="border-b border-[var(--rule)]">
                <a href="#scholarships" className="grid grid-cols-[2.5rem_1fr] items-baseline py-4 text-[19px] hover:text-[var(--green)]">
                  <span className="herb-italic text-[14px] text-[var(--ink-2)]">{no(AWARDS.length)}</span>
                  Grants and scholarships
                </a>
              </li>
            </ol>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:pt-10">
              <ActionLink href="/submission" primary>
                Submit a paper
              </ActionLink>
              <ActionLink href="/registration">Register to attend</ActionLink>
            </div>
          </div>

          <figure className="flex flex-col">
            <div className="herb-mount herb-photo herb-photo-settle relative aspect-[4/5] w-full lg:aspect-auto lg:min-h-[600px] lg:flex-1">
              <Image
                src="/gallery/3rd-icsift (5).jpg"
                alt="A conference co-chair receiving a recognition plaque on stage"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[45%_50%]"
              />
            </div>
            <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">A recognition plaque presented on stage, 3rd ICSIFT</figcaption>
          </figure>
        </div>
      </section>

      {/* Award categories: three columns divided by hairlines. */}
      <section aria-labelledby="categories-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <h2 id="categories-title" className="herb-h2 max-w-[16ch]">
            Three awards, judged on merit.
          </h2>
          <div className="mt-10 grid gap-px border-t border-[var(--ink)] bg-[var(--rule)] lg:grid-cols-3">
            {AWARDS.map((award, index) => (
              <article key={award.id} id={award.id} className="flex scroll-mt-24 flex-col bg-[var(--sheet)] py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <p className="herb-italic text-[15px] text-[var(--ink-2)]">Award {no(index)}</p>
                <h3 className="mt-2 text-[clamp(1.5rem,1.2rem+0.9vw,1.9rem)] leading-tight font-normal tracking-[-0.02em]">{award.name}</h3>
                <p className="herb-muted mt-4 text-[16px] leading-relaxed">{award.description}</p>
                <h4 className="mt-8 text-[13px] font-semibold tracking-[0.08em] uppercase">Criteria</h4>
                <ul className="mt-3 border-t border-[var(--ink)]">
                  {award.criteria.map((criterion) => (
                    <li key={criterion} className="border-b border-[var(--rule)] py-2.5 text-[16px]">
                      {criterion}
                    </li>
                  ))}
                </ul>
                {award.reward ? (
                  <p className="mt-5 text-[15.5px]">
                    <span className="herb-italic text-[var(--ink-2)]">Reward. </span>
                    {award.reward}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Scholarships */}
      <section id="scholarships" aria-labelledby="scholarships-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-12 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:p-12">
          <div>
            <h2 id="scholarships-title" className="herb-h2 max-w-[14ch]">
              Grants and scholarships.
            </h2>
            <p className="mt-8 max-w-[38rem] text-[18px] leading-relaxed">
              Zep Research helps young scholars reach their research and academic goals, and encourages them to bring
              interdisciplinary thinking to their work.
            </p>
            <p className="herb-muted mt-5 max-w-[38rem]">
              Full or partial scholarships covering registration fees go to selected postgraduate students and early-career
              academics who might not otherwise afford to attend.
            </p>
            <p className="mt-8 max-w-[38rem] border-t border-[var(--ink)] pt-6 text-[clamp(1.25rem,1rem+0.8vw,1.6rem)] leading-snug">
              Up to 20% off your next registration for the best paper and best paper presenters.
            </p>
            <p className="herb-italic mt-2 text-[15px] text-[var(--ink-2)]">Scholarships depend on available funds and vary by conference.</p>
          </div>

          <dl className="border-t border-[var(--ink)] self-start">
            {[
              [
                "Who can receive one",
                "Awards are based on how well the opportunity fits the applicant's field of study, their financial need, and their contribution to their community and to Zep Research's mission of interdisciplinarity.",
              ],
              [
                "How recipients are selected",
                `The ${CONFERENCE.shortForm} Program Committee awards scholarships to eligible applicants whose exceptional abstracts passed blind peer review and were accepted for presentation. Presenting your work exceptionally at the conference is a second route to a scholarship.`,
              ],
            ].map(([term, value]) => (
              <div key={term} className="border-b border-[var(--rule)] py-6">
                <dt className="text-[19px]">{term}</dt>
                <dd className="herb-muted mt-2 text-[16px] leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Judging */}
      <section aria-labelledby="judging-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="judging-title" className="herb-h2 max-w-[13ch]">
              How winners are chosen.
            </h2>
            <p className="herb-muted mt-5 max-w-[26rem]">
              A panel of researchers, industry professionals and academic leaders evaluates every submission and presentation.
            </p>
          </div>
          <Reveal as="ol" className="border-t border-[var(--ink)]">
            {JUDGING.map(([title, body], index) => (
              <li
                key={title}
                className="grid grid-cols-[2.5rem_1fr] gap-y-1 border-b border-[var(--rule)] py-6 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-x-6"
              >
                <span className="herb-italic text-[14px] text-[var(--ink-2)]">{no(index)}</span>
                <h3 className="text-[18px] leading-snug font-medium">{title}</h3>
                <p className="herb-muted col-start-2 text-[15.5px] sm:col-start-3">{body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section aria-labelledby="awards-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="awards-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Put your work in the running.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Submit your paper and register for the {CONFERENCE.shortForm} to be considered for an award.
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
