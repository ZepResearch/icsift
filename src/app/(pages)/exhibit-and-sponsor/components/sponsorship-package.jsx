import { ArrowRight } from "lucide-react";
import { money } from "@/lib/pricing";

// One package as a panel: tier and price in the display face, its benefits as a bar list, and its checkout button.
// `featured` (the top tier) sits on forest so the ladder has one standout.
export function SponsorshipPackage({ pkg, onSelect, featured = false }) {
  return (
    <article
      id={`tier-${pkg.title.toLowerCase()}`}
      data-enter
      className={`flex scroll-mt-28 flex-col p-6 sm:p-7 ${featured ? "bg-[var(--forest)] text-[var(--signal)]" : "bg-[var(--panel)]"}`}
    >
      <h3 className="sig-display text-[clamp(1.8rem,1.4rem+1vw,2.4rem)] leading-none">{pkg.title}</h3>
      <p className="sig-display mt-4 text-[clamp(2.8rem,2rem+2.4vw,4rem)] leading-none">{money(pkg.price)}</p>
      <ul className="mt-7 grid flex-1 content-start gap-3">
        {pkg.benefits.map((benefit) => (
          <li
            key={benefit}
            className={`border-l-[3px] pl-3 text-[16px] leading-snug ${featured ? "border-[var(--signal)] text-[var(--cream)]" : "border-[var(--forest)]"}`}
          >
            {benefit}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onSelect} className="sig-btn mt-8 w-full" {...(featured ? { "data-fill": "" } : { "data-dark": "" })}>
        <span>Choose {pkg.title}</span>
        <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </button>
    </article>
  );
}
