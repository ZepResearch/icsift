import Link from "next/link";
import { Download } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

const SPECIFICATION = [
  ["Abstract", "Up to 300 words"],
  ["Full paper", "8 to 12 pages, including figures, tables and references"],
  ["Poster", "A0 (841 × 1189 mm), portrait"],
  ["File type", "Microsoft Word"],
  ["Citations", "IEEE style"],
  ["Language", "English"],
];

const TEMPLATES = [
  {
    title: "Abstract",
    file: "/templates/Abstract_Template.docx",
    type: "Word (.docx)",
    description:
      "A concise summary of your research, not exceeding 300 words. Include the research objectives, methodology, results and conclusions. Use clear, concise language and avoid jargon or acronyms.",
  },
  {
    title: "Full paper",
    file: "/templates/Fullpaper_Template.doc",
    type: "Word (.doc)",
    description:
      "3,000 to 5,000 words, excluding references and appendices. Times New Roman, 12 point, double-spaced. Include an abstract, keywords, introduction, methodology, results, discussion, conclusion and references. Follow APA 7th edition for citations and references.",
  },
  {
    title: "Poster",
    file: "/templates/poster.jpg",
    type: "Image (.jpg)",
    description:
      "A0 size (841 × 1189 mm) in portrait orientation. Use a clear, readable font, at least 24 point for body text and larger for headings. Include a title, authors, affiliation, introduction, methods, results, conclusions and key references, and use graphics and charts to show your research.",
  },
];

const REQUIREMENTS = [
  "Use the provided templates without modifying margins, font sizes or styles.",
  "Abstract submissions should not exceed 300 words.",
  "Full papers should be 8 to 12 pages, including figures, tables and references.",
  "Poster presentations follow the A0 format (841 × 1189 mm) in portrait orientation.",
  "All submissions must be Word files.",
];

export default function PapersFormatPage() {
  return (
    <main className="herb min-h-screen">
      {/* Title sheet: full-width title, then the downloads themselves beside the specification table. */}
      <section aria-labelledby="format-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <h1 id="format-title" className="herb-display max-w-[18ch] text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
            Format your paper, then send it.
          </h1>
          <p className="herb-muted mt-6 max-w-[40rem] text-[17.5px] leading-relaxed">
            Every submission to the {CONFERENCE.shortForm} follows the same templates. Papers that do not may be returned for
            revision before review.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Templates</h2>
              <ul className="mt-4 border-t border-[var(--ink)]">
                {TEMPLATES.map((template) => (
                  <li key={template.title} className="border-b border-[var(--rule)]">
                    <a
                      href={template.file}
                      download
                      className="group flex items-center justify-between gap-6 py-5 hover:text-[var(--green)]"
                    >
                      <span>
                        <span className="block text-[20px]">{template.title} template</span>
                        <span className="herb-italic mt-0.5 block text-[14.5px] text-[var(--ink-2)]">{template.type}</span>
                      </span>
                      <Download aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.6} />
                    </a>
                  </li>
                ))}
              </ul>
              <ActionLink href="/submission" primary className="mt-8 sm:max-w-[22rem]">
                Submit a paper
              </ActionLink>
            </div>

            <div className="herb-label self-start">
              <h2 className="border-b border-[var(--ink)] px-4 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase">
                Specification
              </h2>
              <dl className="divide-y divide-[var(--rule)]">
                {SPECIFICATION.map(([term, value]) => (
                  <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 max-sm:grid-cols-1 max-sm:gap-0.5">
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* General requirements */}
      <section aria-labelledby="requirements-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="requirements-title" className="herb-h2 max-w-[13ch]">
              General requirements.
            </h2>
            <p className="herb-muted mt-5 max-w-[26rem]">Check these before you send anything. They apply to every type of submission.</p>
          </div>
          <Reveal as="ol" className="border-t border-[var(--ink)]">
            {REQUIREMENTS.map((requirement, index) => (
              <li key={requirement} className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-[var(--rule)] py-5">
                <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[17px]">{requirement}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Template details */}
      <section aria-labelledby="templates-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <h2 id="templates-title" className="herb-h2 max-w-[16ch]">
            What each template expects.
          </h2>
          <div className="mt-10 border-t border-[var(--ink)]">
            {TEMPLATES.map((template) => (
              <div
                key={template.title}
                className="grid gap-x-10 gap-y-3 border-b border-[var(--rule)] py-7 lg:grid-cols-[14rem_minmax(0,1fr)_auto] lg:items-baseline"
              >
                <h3 className="text-[22px] leading-tight font-normal tracking-[-0.01em]">{template.title}</h3>
                <p className="herb-muted max-w-[44rem] text-[16px] leading-relaxed">{template.description}</p>
                <a href={template.file} download className="herb-link inline-flex items-center gap-2 text-[15.5px] whitespace-nowrap">
                  <Download aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                  Download
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Citation and language */}
      <section aria-labelledby="style-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <h2 id="style-title" className="herb-h2 max-w-[16ch]">
            Citations and language.
          </h2>
          <div className="mt-10 grid gap-10 border-t border-[var(--ink)] pt-8 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Citation style</h3>
              <p className="mt-4 max-w-[38rem] text-[17px] leading-relaxed">
                The {CONFERENCE.shortForm} uses the IEEE citation style for all submissions. The templates include examples of
                how to format different types of references.
              </p>
              <p className="herb-muted mt-4 max-w-[38rem]">
                For details, see the IEEE Reference Guide or the IEEE Editorial Style Manual.
              </p>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Language</h3>
              <p className="mt-4 max-w-[38rem] text-[17px] leading-relaxed">
                All submissions must be in English. We recommend having your paper proofread by a native speaker or a
                professional editing service.
              </p>
              <p className="herb-muted mt-4 max-w-[38rem]">
                Pay particular attention to your abstract, introduction and conclusion: they are what readers use to judge the
                significance of your work.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section aria-labelledby="format-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="format-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Formatted? Send it in.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Not sure your topic fits? See the{" "}
              <Link href="/theme-and-topics" className="herb-link">
                theme and topics
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
