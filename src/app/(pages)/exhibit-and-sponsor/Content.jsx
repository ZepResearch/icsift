"use client";

import { useState } from "react";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, CallBand, Field, LEAD, PageHero, SPLIT, StickyIntro } from "@/components/signal/page";
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
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the tier ladder right, each tier's yellow bar scaled to its price. */}
      <PageHero
        id="sponsor-title"
        tag="Sponsor"
        title="Put your name behind the work"
        lead={`Sponsor the ${CONFERENCE.shortForm} and reach researchers, academics and industry professionals working on sustainability, innovation and future technologies.`}
        actions={
          <ActionPair
            tone="forest"
            primary={["#packages", "Compare packages"]}
            secondary={["mailto:info@icsift.com", "Ask for a custom package", true]}
          />
        }
        aside={
          <nav aria-label="Sponsorship tiers">
            <p className="text-[16px] text-[var(--muted)]">Tiers, in US dollars</p>
            <ol className="mt-3 grid gap-2">
              {SPONSOR_PACKAGES.map((pkg) => (
                <li key={pkg.title}>
                  <a
                    href={`#tier-${pkg.title.toLowerCase()}`}
                    className="group block bg-[var(--panel)] px-5 py-4 transition-colors duration-200 hover:bg-black/20"
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="sig-display text-[clamp(1.4rem,1.15rem+0.7vw,1.85rem)] leading-none">{pkg.title}</span>
                      <span className="sig-display text-[clamp(1.4rem,1.15rem+0.7vw,1.85rem)] leading-none">{money(pkg.price)}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-2 origin-left bg-[var(--signal)] transition-transform duration-500 group-hover:scale-x-[1.02]"
                      style={{ width: `${(pkg.price / top) * 100}%` }}
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {/* Packages: one panel per tier, the top tier on forest. */}
      <Field tone="cream" id="packages" labelledBy="packages-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="packages-title" data-enter className="sig-h2">
            Four ways to sponsor
          </h2>
          <p data-enter style={{ "--i": 1 }} className="max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug text-[var(--muted)]">
            Prices in US dollars. Choose a package to pay securely through CCAvenue.
          </p>
        </div>
        <div className="mt-12 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {SPONSOR_PACKAGES.map((pkg) => (
            <SponsorshipPackage key={pkg.title} pkg={pkg} featured={pkg.price === top} onSelect={() => choose(pkg)} />
          ))}
        </div>
      </Field>

      {/* Why sponsor: sticky intro left, what every package brings as four panels right. */}
      <Field tone="forest" labelledBy="why-title">
        <div className={SPLIT}>
          <StickyIntro tag="Benefits" id="why-title" title="Why sponsor ICSIFT">
            <p className={`${LEAD} text-[var(--muted)]`}>
              You gain visibility among innovators and decision-makers while supporting research and collaboration in
              sustainability. Every package also brings these benefits.
            </p>
          </StickyIntro>
          <div className="grid gap-2 sm:grid-cols-2">
            {EXTRAS.map(([title, items], index) => (
              <div key={title} data-enter style={{ "--i": 2 + index }} className="bg-[var(--panel)] p-6 sm:p-7">
                <h3 className="sig-display text-[clamp(1.5rem,1.2rem+0.8vw,2rem)] leading-none">{title}</h3>
                <ul className="mt-5 grid gap-3">
                  {items.map((item) => (
                    <li key={item} className="border-l-[3px] border-[var(--signal)] pl-3 text-[16px] leading-snug text-[var(--cream)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Field>

      <CallBand
        title="Need something different?"
        text="Every organisation has its own goals. Tell us yours and we will put together a package for them."
        primary={["mailto:info@icsift.com", "Email the sponsorship team", true]}
        secondary={["/contact", "Use the contact form"]}
      />

      <CheckoutPanel item={checkout} onClose={() => setCheckout(null)} />
    </main>
  );
}
