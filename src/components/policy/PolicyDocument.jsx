import Link from "next/link";
import { ActionLink } from "@/components/home/primitives";

// Every policy page renders through this one layout, so the family reads as a set of documents.
// sections: [{ title, body: [block] }] where a block is one of:
//   "paragraph text"
//   { list: ["item", ...] }
//   { terms: [["term", "definition"], ...] }
//   { table: { head: ["A", "B"], rows: [["a", "b"], ...] } }
//   { note: "highlighted text" }

export const POLICIES = [
  ["/terms-and-conditions", "Terms and conditions"],
  ["/cancellation-policy", "Cancellation policy"],
  ["/privacy-policy", "Privacy policy"],
  ["/complaints-policy", "Complaints policy"],
  ["/equal-treatment-policy", "Equal treatment policy"],
  ["/disability-discrimination-policy", "Disability discrimination policy"],
  ["/health-and-safety-policy", "Health and safety policy"],
];

const no = (index) => String(index + 1).padStart(2, "0");
const anchor = (index) => `section-${index + 1}`;

function Block({ block }) {
  if (typeof block === "string") return <p className="max-w-[44rem] text-[17px] leading-relaxed">{block}</p>;
  if (block.list)
    return (
      <ul className="max-w-[44rem] border-t border-[var(--rule)]">
        {block.list.map((item) => (
          <li key={item} className="border-b border-[var(--rule)] py-2.5 text-[16.5px]">
            {item}
          </li>
        ))}
      </ul>
    );
  if (block.terms)
    return (
      <dl className="max-w-[44rem] border-t border-[var(--rule)]">
        {block.terms.map(([term, value]) => (
          <div key={term} className="grid gap-x-6 gap-y-1 border-b border-[var(--rule)] py-3.5 sm:grid-cols-[12rem_1fr]">
            <dt className="text-[16.5px] font-medium">{term}</dt>
            <dd className="herb-muted text-[16px]">{value}</dd>
          </div>
        ))}
      </dl>
    );
  if (block.table)
    return (
      <table className="w-full max-w-[44rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--ink)] text-[13px] tracking-[0.08em] uppercase">
            {block.table.head.map((cell) => (
              <th key={cell} scope="col" className="py-2.5 pr-6 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-[var(--rule)]">
              {row.map((cell, i) => (
                <td key={i} className="py-3.5 pr-6 text-[16.5px]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  if (block.note)
    return (
      <p className="max-w-[44rem] border border-[var(--ink)] px-4 py-3 text-[16px]">
        <span className="herb-italic text-[var(--ink-2)]">Note. </span>
        {block.note}
      </p>
    );
  return null;
}

export default function PolicyDocument({ path, title, intro, sections, closing }) {
  return (
    <main className="herb min-h-screen">
      {/* Title sheet: the document's title and intro left; its numbered contents right. */}
      <section aria-labelledby="policy-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:p-12">
          <div>
            <h1 id="policy-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              {title}.
            </h1>
            <p className="herb-muted mt-6 max-w-[36rem] text-[17.5px] leading-relaxed">{intro}</p>
          </div>
          <nav aria-label="Contents" className="lg:pt-3">
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Contents</h2>
            <ol className="mt-4 border-t border-[var(--ink)]">
              {sections.map((section, index) => (
                <li key={section.title} className="border-b border-[var(--rule)]">
                  <a href={`#${anchor(index)}`} className="grid grid-cols-[2.5rem_1fr] items-baseline py-3 text-[17px] hover:text-[var(--green)]">
                    <span className="herb-italic text-[14px] text-[var(--ink-2)]">{no(index)}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* The document */}
      <section aria-label={title} className="px-3 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="herb-sheet mx-auto grid max-w-[1400px] gap-12 p-5 sm:p-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:p-12">
          <nav aria-label="Policies" className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Policies</h2>
            <ul className="mt-3 border-t border-[var(--ink)]">
              {POLICIES.map(([href, label]) => {
                const current = href === path;
                return (
                  <li key={href} className="border-b border-[var(--rule)]">
                    <Link
                      href={href}
                      aria-current={current ? "page" : undefined}
                      className={`block py-2.5 text-[15.5px] ${current ? "font-medium text-[var(--green)]" : "hover:text-[var(--green)]"}`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            {sections.map((section, index) => (
              <article
                key={section.title}
                id={anchor(index)}
                className={`grid scroll-mt-24 gap-5 pb-10 ${index ? "border-t border-[var(--rule)] pt-10" : ""}`}
              >
                <h2 className="flex items-baseline gap-4 text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] leading-tight tracking-[-0.02em]">
                  <span className="herb-italic text-[16px] text-[var(--ink-2)]">{no(index)}</span>
                  {section.title}
                </h2>
                {section.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </article>
            ))}
            {closing ? <p className="herb-muted max-w-[44rem] border-t border-[var(--ink)] pt-6 text-[16px]">{closing}</p> : null}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section aria-labelledby="policy-help-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <div className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="policy-help-title" className="herb-h2 max-w-[16ch]">
              Questions about this policy?
            </h2>
            <p className="herb-muted mt-5 max-w-[34rem] text-[17px]">
              Write to{" "}
              <a href="mailto:info@icsift.com" className="herb-link">
                info@icsift.com
              </a>{" "}
              or call{" "}
              <a href="tel:+918260080050" className="herb-link">
                +91 82600 80050
              </a>
              .
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/contact" primary>
              Contact the team
            </ActionLink>
            <ActionLink href="/registration">Register to attend</ActionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
