import Link from "next/link";
import { CallBand, Field, PageHero } from "@/components/signal/page";

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

const anchor = (index) => `section-${index + 1}`;

function Block({ block }) {
  if (typeof block === "string") return <p className="max-w-[46rem] text-[18px] leading-relaxed">{block}</p>;
  if (block.list)
    return (
      <ul className="grid max-w-[46rem] gap-3">
        {block.list.map((item) => (
          <li key={item} className="border-l-[3px] border-[var(--forest)] pl-4 text-[17px] leading-snug">
            {item}
          </li>
        ))}
      </ul>
    );
  if (block.terms)
    return (
      <dl className="grid max-w-[46rem] gap-2">
        {block.terms.map(([term, value]) => (
          <div key={term} className="grid gap-x-6 gap-y-1 bg-[var(--panel)] px-5 py-4 sm:grid-cols-[12rem_1fr]">
            <dt className="text-[17px] font-semibold">{term}</dt>
            <dd className="text-[16.5px] text-[var(--muted)]">{value}</dd>
          </div>
        ))}
      </dl>
    );
  if (block.table)
    return (
      <div className="max-w-[46rem] overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-1.5 text-left">
          <thead>
            <tr>
              {block.table.head.map((cell) => (
                <th key={cell} scope="col" className="bg-[var(--forest)] px-4 py-3 text-[15.5px] font-semibold text-[var(--signal)]">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row) => (
              <tr key={row.join("|")} className="bg-[var(--panel)]">
                {row.map((cell, i) => (
                  <td key={i} className="px-4 py-3.5 text-[16.5px]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (block.note)
    return (
      <p className="max-w-[46rem] bg-[var(--signal)] px-5 py-4 text-[17px] text-[var(--forest)]">
        <span className="font-semibold">Note: </span>
        {block.note}
      </p>
    );
  return null;
}

export default function PolicyDocument({ path, title, intro, sections, closing }) {
  return (
    <main className="sig min-h-screen">
      {/* Hero: the document's title and intro left; its contents as numbered jump panels right. */}
      <PageHero
        id="policy-title"
        tag="Policy"
        title={title}
        titleClass="text-[clamp(2.6rem,1.3rem+4.2vw,5.5rem)]"
        lead={intro}
        aside={
          <nav aria-label="Contents">
            <p className="text-[16px] text-[var(--muted)]">Contents</p>
            <ol className="mt-3 grid gap-2">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a
                    href={`#${anchor(index)}`}
                    className="grid grid-cols-[2.5rem_1fr] items-center bg-[var(--panel)] px-4 py-3 transition-colors duration-200 hover:bg-[var(--signal)] hover:text-[var(--forest)]"
                  >
                    <span aria-hidden="true" className="sig-display text-[24px] leading-none">
                      {index + 1}
                    </span>
                    <span className="text-[16.5px] leading-snug font-semibold">{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {/* The document: a sticky rail of every policy left (the current one forest), the numbered sections right. */}
      <Field tone="cream" pad="py-20 lg:py-28" reveal={false}>
        <div className="grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Policies" className="lg:sticky lg:top-40 lg:self-start">
            <p className="sig-tag">Policies</p>
            <ul className="mt-4 grid gap-1.5">
              {POLICIES.map(([href, label]) => {
                const current = href === path;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={current ? "page" : undefined}
                      className={`block px-4 py-2.5 text-[16px] font-semibold transition-colors duration-200 ${
                        current ? "bg-[var(--forest)] text-[var(--signal)]" : "bg-[var(--panel)] hover:bg-[var(--forest)] hover:text-[var(--signal)]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="grid gap-16">
            {sections.map((section, index) => (
              <article key={section.title} id={anchor(index)} className="grid scroll-mt-40 gap-6">
                <h2 className="grid grid-cols-[3rem_1fr] items-baseline gap-x-2 sm:grid-cols-[3.75rem_1fr]">
                  <span aria-hidden="true" className="sig-display text-[clamp(2.4rem,2rem+1.2vw,3.2rem)] leading-none">
                    {index + 1}
                  </span>
                  <span className="sig-display text-[clamp(1.7rem,1.35rem+1vw,2.4rem)] leading-[1.04]">{section.title}</span>
                </h2>
                {section.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </article>
            ))}
            {closing ? <p className="max-w-[46rem] bg-[var(--panel)] px-5 py-4 text-[17px]">{closing}</p> : null}
          </div>
        </div>
      </Field>

      <CallBand
        id="policy-help-title"
        title="Questions about this policy?"
        text={
          <>
            Write to{" "}
            <a href="mailto:info@icsift.com" className="sig-link">
              info@icsift.com
            </a>{" "}
            or call{" "}
            <a href="tel:+918260080050" className="sig-link">
              +91 82600 80050
            </a>
            .
          </>
        }
        primary={["/contact", "Contact the team"]}
        secondary={["/registration", "Register"]}
      />
    </main>
  );
}
