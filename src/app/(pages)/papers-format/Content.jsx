import Link from "next/link";
import { Download } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { CallBand, FactCells, Field, LEAD, PageHero, SPLIT, StickyIntro, Steps } from "@/components/signal/page";

const SPECIFICATION = [
  ["Abstract", "Up to 300 words"],
  ["Full paper", "8 to 12 pages"],
  ["Poster", "A0, portrait"],
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
  ["Use the templates as they are", "Do not modify margins, font sizes or styles."],
  ["Keep the abstract short", "Abstract submissions should not exceed 300 words."],
  ["Mind the page count", "Full papers should be 8 to 12 pages, including figures, tables and references."],
  ["Posters are A0", "Poster presentations follow the A0 format (841 × 1189 mm) in portrait orientation."],
  ["Send Word files", "All submissions must be Word files."],
];

export default function PapersFormatPage() {
  return (
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the specification as six panels right. */}
      <PageHero
        id="format-title"
        tag="Paper format"
        title="Format your paper, then send it"
        lead={`Every submission to the ${CONFERENCE.shortForm} follows the same templates. Papers that do not may be returned for revision before review.`}
        aside={<FactCells facts={SPECIFICATION} size="text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)]" />}
      />

      {/* Templates: sticky intro left; each template as a large download panel with its description right. */}
      <Field tone="cream" id="templates" labelledBy="templates-title">
        <div className={SPLIT}>
          <StickyIntro tag="Templates" id="templates-title" title="Download the templates">
            <p className={LEAD}>Three templates, one for each kind of submission. Download the one you need and write into it.</p>
          </StickyIntro>
          <ul className="grid gap-2">
            {TEMPLATES.map((template, index) => (
              <li key={template.title} data-enter style={{ "--i": 2 + index }} className="bg-[var(--panel)] p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="sig-display text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)] leading-none">{template.title} template</h3>
                    <p className="mt-2 text-[15.5px] text-[var(--muted)]">{template.type}</p>
                  </div>
                  <a href={template.file} download className="sig-btn" data-dark="">
                    <Download aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
                    <span>Download</span>
                  </a>
                </div>
                <p className="mt-5 max-w-[46rem] text-[17px] text-[var(--muted)]">{template.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Field>

      {/* General requirements */}
      <Field tone="forest" labelledBy="requirements-title">
        <div className={SPLIT}>
          <StickyIntro tag="Requirements" id="requirements-title" title="Check before you send">
            <p className={LEAD}>These apply to every type of submission.</p>
          </StickyIntro>
          <div data-enter style={{ "--i": 2 }}>
            <Steps steps={REQUIREMENTS} />
          </div>
        </div>
      </Field>

      {/* Citations and language: two panels side by side. */}
      <Field tone="cream" labelledBy="style-title">
        <h2 id="style-title" data-enter className="sig-h2">
          Citations and language
        </h2>
        <div className="mt-12 grid gap-2 md:grid-cols-2">
          <div data-enter style={{ "--i": 1 }} className="bg-[var(--panel)] p-7 sm:p-9">
            <h3 className="sig-display text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)]">Citation style</h3>
            <p className="mt-4 text-[18px]">
              The {CONFERENCE.shortForm} uses the IEEE citation style for all submissions. The templates include examples of how
              to format different types of references.
            </p>
            <p className="mt-4 text-[17px] text-[var(--muted)]">For details, see the IEEE Reference Guide or the IEEE Editorial Style Manual.</p>
          </div>
          <div data-enter style={{ "--i": 2 }} className="bg-[var(--panel)] p-7 sm:p-9">
            <h3 className="sig-display text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)]">Language</h3>
            <p className="mt-4 text-[18px]">
              All submissions must be in English. We recommend having your paper proofread by a native speaker or a professional
              editing service.
            </p>
            <p className="mt-4 text-[17px] text-[var(--muted)]">
              Pay particular attention to your abstract, introduction and conclusion: they are what readers use to judge the
              significance of your work.
            </p>
          </div>
        </div>
      </Field>

      <CallBand
        title="Formatted? Send it in"
        text={
          <>
            Not sure your topic fits? See the{" "}
            <Link href="/theme-and-topics" className="sig-link">
              theme and topics
            </Link>{" "}
            first.
          </>
        }
      />
    </main>
  );
}
