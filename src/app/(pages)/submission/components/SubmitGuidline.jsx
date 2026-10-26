import Reveal from "@/components/home/Reveal";

const FORMAT = [
  ["Word limit", "250 to 300 words"],
  ["Font", "Arial or Times New Roman, 12 point"],
  ["Spacing", "Single-spaced"],
  ["File", "Word (.doc or .docx)"],
];

const STRUCTURE = [
  ["Title", "A clear, concise title of up to 15 words."],
  ["Author(s)", "Full name, affiliation and email address for every author. Identify the corresponding author."],
  ["Keywords", "Three to five keywords related to the topic."],
  ["Abstract body", "The objective, methodology, results and significance of the research, briefly."],
];

const RULES = [
  "Submit through this online form.",
  "Abstracts sent by email are not accepted unless specifically permitted.",
  "Abstracts that do not meet these requirements may be rejected without review.",
];

export default function AbstractSubmissionGuidelines() {
  return (
    <section aria-labelledby="guidelines-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
      <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2 id="guidelines-title" className="herb-h2 max-w-[14ch]">
              Abstract guidelines.
            </h2>
            <p className="herb-muted mt-5 max-w-[30rem]">
              Follow these so your abstract meets the submission standard. For technical problems, write to{" "}
              <a href="mailto:info@icsift.com" className="herb-link">
                info@icsift.com
              </a>
              .
            </p>

            <div className="herb-label mt-10">
              <h3 className="border-b border-[var(--ink)] px-4 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase">Length and format</h3>
              <dl className="divide-y divide-[var(--rule)]">
                {FORMAT.map(([term, value]) => (
                  <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-2.5 max-sm:grid-cols-1 max-sm:gap-0.5">
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Structure</h3>
            <ol className="mt-4 border-t border-[var(--ink)]">
              {STRUCTURE.map(([title, body], index) => (
                <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-y-1 border-b border-[var(--rule)] py-5 sm:grid-cols-[2.5rem_9rem_1fr] sm:gap-x-6">
                  <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[17px] font-medium">{title}</span>
                  <span className="herb-muted col-start-2 text-[15.5px] sm:col-start-3">{body}</span>
                </li>
              ))}
            </ol>

            <h3 className="mt-10 text-[13px] font-semibold tracking-[0.08em] uppercase">How to send it</h3>
            <ul className="mt-4 border-t border-[var(--ink)]">
              {RULES.map((rule) => (
                <li key={rule} className="border-b border-[var(--rule)] py-3.5 text-[16.5px]">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
