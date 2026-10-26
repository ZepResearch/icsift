import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ActionLink({ href, children, primary = false, className = "", external = false }) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`herb-btn ${className}`} data-primary={primary || undefined} {...props}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
    </Link>
  );
}

// A ruled accession label: term in italic serif, value in the sheet face.
export function AccessionLabel({ rows, className = "", title }) {
  return (
    <div className={`herb-label ${className}`}>
      {title ? (
        <p className="border-b border-[var(--ink)] px-4 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase">{title}</p>
      ) : null}
      <dl className="divide-y divide-[var(--rule)]">
        {rows.map(([term, value]) => (
          <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-2 max-sm:grid-cols-1 max-sm:gap-0.5">
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
