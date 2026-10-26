"use client";

import { useState } from "react";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";
import CheckoutPanel from "@/components/payments/checkout-panel";
import { SPONSOR_PACKAGES, money } from "@/lib/pricing";
import { SponsorshipPackage } from "./components/sponsorship-package";

const EXTRAS = [
  [
    "Brand visibility",
    [
      "Logo on the conference website, virtual platform and promotional materials",
      "Recognition in the opening and closing ceremonies",
      "Inclusion in the conference proceedings and digital materials",
    ],
  ],
  [
    "Networking",
    [
      "Direct access to researchers and academics from many disciplines",
      "A virtual booth in the exhibition space",
      "Introductions to key participants and speakers",
    ],
  ],
  [
    "Content",
    [
      "Present a sponsored session or workshop",
      "Feature your organisation's research or case studies",
      "Take part in panel discussions and Q&A sessions",
    ],
  ],
  [
    "After the conference",
    [
      "Access to conference recordings and materials",
      "Recognition in post-conference publications and reports",
      "Continued engagement with participants",
    ],
  ],
];

const top = Math.max(...SPONSOR_PACKAGES.map((p) => p.price));

export default function ExhibitAndSponsorPage() {
  const [checkout, setCheckout] = useState(null);

  const choose = (pkg) =>
    setCheckout({
      title: `${pkg.title} sponsorship`,
      lines: [["Package", pkg.title]],
      total: money(pkg.price),
      request: { kind: "sponsor", package: pkg.title },
    });

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title and intro left; a tier ladder right, each tier's bar scaled to its price. */}
      <section aria-labelledby="sponsor-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:p-12">
          <div>
            <h1 id="sponsor-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Put your name behind the work.
            </h1>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
              Sponsor the {CONFERENCE.shortForm} and reach researchers, academics and industry professionals working on
              sustainability, innovation and future technologies.
            </p>
            <div className="mt-8 grid gap-3 sm:max-w-[44rem] sm:grid-cols-2">
              <ActionLink href="#packages" primary>
                Compare packages
              </ActionLink>
              <ActionLink href="mailto:info@icsift.com" external>
                Ask for a custom package
              </ActionLink>
            </div>
          </div>

          <nav aria-label="Sponsorship tiers">
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Tiers</h2>
            <ol className="mt-4 border-t border-[var(--ink)]">
              {SPONSOR_PACKAGES.map((pkg) => (
                <li key={pkg.title} className="border-b border-[var(--rule)]">
                  <a href={`#tier-${pkg.title.toLowerCase()}`} className="group block py-4">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="text-[20px] group-hover:text-[var(--green)]">{pkg.title}</span>
                      <span className="text-[18px]">{money(pkg.price)}</span>
                    </span>
                    <span aria-hidden="true" className="mt-2 block h-[3px] bg-[var(--ink)]" style={{ width: `${(pkg.price / top) * 100}%` }} />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" aria-labelledby="packages-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="packages-title" className="herb-h2 max-w-[14ch]">
              Four ways to sponsor.
            </h2>
            <p className="herb-muted max-w-[28rem]">Prices in US dollars. Choose a package to pay securely through CCAvenue.</p>
          </div>
          <div className="mt-10 grid gap-px border-t border-[var(--ink)] bg-[var(--rule)] md:grid-cols-2 xl:grid-cols-4">
            {SPONSOR_PACKAGES.map((pkg) => (
              <SponsorshipPackage key={pkg.title} pkg={pkg} onSelect={() => choose(pkg)} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Why sponsor + extras */}
      <section aria-labelledby="why-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="why-title" className="herb-h2 max-w-[13ch]">
              Why sponsor ICSIFT.
            </h2>
            <p className="mt-6 max-w-[30rem] text-[17px] leading-relaxed">
              You gain visibility among innovators and decision-makers while supporting research and collaboration in
              sustainability.
            </p>
            <p className="herb-muted mt-4 max-w-[30rem]">Every package also brings these benefits.</p>
          </div>
          <Reveal className="grid border-t border-[var(--ink)] sm:grid-cols-2 sm:gap-x-10">
            {EXTRAS.map(([title, items]) => (
              <div key={title} className="border-b border-[var(--rule)] py-6">
                <h3 className="text-[18px] font-medium">{title}</h3>
                <ul className="mt-3 grid gap-2">
                  {items.map((item) => (
                    <li key={item} className="herb-muted text-[15.5px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Custom package */}
      <section aria-labelledby="custom-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="custom-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Need something different?
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Every organisation has its own goals. Tell us yours and we will put together a package for them.
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="mailto:info@icsift.com" primary external>
              Email the sponsorship team
            </ActionLink>
            <ActionLink href="/contact">Use the contact form</ActionLink>
          </div>
        </Reveal>
      </section>

      <CheckoutPanel item={checkout} onClose={() => setCheckout(null)} />
    </main>
  );
}
