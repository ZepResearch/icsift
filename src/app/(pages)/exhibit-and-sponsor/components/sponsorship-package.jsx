import { money } from "@/lib/pricing";

// One column of the package comparison: tier, price, benefits and its checkout button.
export function SponsorshipPackage({ pkg, onSelect }) {
  return (
    <article id={`tier-${pkg.title.toLowerCase()}`} className="flex scroll-mt-24 flex-col bg-[var(--sheet)] py-8 md:px-6 xl:first:pl-0 xl:last:pr-0">
      <h3 className="text-[1.75rem] leading-tight tracking-[-0.02em]">{pkg.title}</h3>
      <p className="mt-2 text-[2.25rem] leading-none tracking-[-0.03em]">{money(pkg.price)}</p>
      <ul className="mt-6 flex-1 border-t border-[var(--ink)]">
        {pkg.benefits.map((benefit) => (
          <li key={benefit} className="border-b border-[var(--rule)] py-2.5 text-[15.5px]">
            {benefit}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onSelect} className="herb-btn mt-6 w-full">
        <span>Choose {pkg.title}</span>
      </button>
    </article>
  );
}
