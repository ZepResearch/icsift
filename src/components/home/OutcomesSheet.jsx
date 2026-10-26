import Reveal from "./Reveal";

const OUTCOMES = [
  ["Research that moves forward", "Explore emerging work in sustainability, green technology and smart systems, and leave with ideas that scale."],
  ["Collaborators across borders", "Researchers, academics, industry, policymakers and entrepreneurs meet in one programme, and joint projects start here."],
  ["Industry and academia, connected", "Pathways from research to real use: startups, patents and sustainable business models."],
  ["Evidence for policy", "Findings feed evidence-based policymaking and planning toward the global sustainability goals."],
  ["Careers and leadership", "Young researchers gain exposure, mentors and recognition on an international stage."],
  ["A map of what comes next", "Renewable energy, artificial intelligence, smart infrastructure, climate resilience and digital sustainability."],
];

export default function OutcomesSheet() {
  return (
    <section aria-labelledby="outcomes-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <h2 id="outcomes-title" className="herb-h2 max-w-[13ch]">
            What grows from two days.
          </h2>
          <Reveal as="ol" className="border-t border-[var(--ink)]">
            {OUTCOMES.map(([title, body], index) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-y-1 border-b border-[var(--rule)] py-6 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-x-6">
                <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-[18px] leading-snug font-medium">{title}</h3>
                <p className="herb-muted col-start-2 text-[15.5px] sm:col-start-3">{body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
