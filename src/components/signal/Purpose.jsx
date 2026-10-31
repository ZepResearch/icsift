import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

// Figures already published elsewhere on the site (past editions and the about page).
const FIGURES = [
  ["3", "Editions since 2024"],
  ["250+", "Academics"],
  ["500+", "Research scholars"],
  ["15+", "Countries"],
  ["94%", "Rated it excellent or very good"],
];

// Forest field, two filled columns: the tag, statement, paragraph and links left (sticky on wide screens, so the
// column travels with the photograph); the stage photograph right; the figures across the foot.
export default function Purpose() {
  return (
    <section id="about" aria-labelledby="purpose-title" className="bg-[var(--forest)] text-[var(--signal)]">
      <Reveal className="mx-auto max-w-[1400px] px-4 pt-28 sm:px-6 lg:px-10 lg:pt-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <p data-enter className="sig-tag">
              Purpose
            </p>
            <h2 id="purpose-title" data-enter style={{ "--i": 1 }} className="sig-h2 mt-6">
              Why this conference exists
            </h2>
            <p data-enter style={{ "--i": 2 }} className="mt-6 max-w-[34rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
              Technology moves fast; the planet needs it to move well. ICSIFT brings researchers, academics, industry and
              policymakers into one room to test ideas that make development last.
            </p>
            <p data-enter style={{ "--i": 3 }} className="mt-5 max-w-[34rem] text-[17px]">
              This edition&rsquo;s theme:{" "}
              <span className="font-semibold text-white">
                Sustainable Innovation, Bridging Technology and Environmental Stewardship.
              </span>
            </p>
            <div data-enter style={{ "--i": 4 }} className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[16px] font-semibold">
              <Link href="/about-conference" className="sig-link">
                About the conference
              </Link>
              <Link href="/theme-and-topics" className="sig-link">
                Themes and topics
              </Link>
              <Link href="/committee" className="sig-link">
                Committee
              </Link>
            </div>
          </div>

          <figure data-enter style={{ "--i": 2 }}>
            <div className="herb-photo relative aspect-[4/3] bg-[var(--forest-deep)]">
              <Image
                src="/gallery/2nd-ICSIFT_05.jpg"
                alt="A presenter at the lectern with his paper title projected on the screen behind him"
                fill
                sizes="(min-width: 1024px) 680px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[15px] text-[var(--signal)]/75">A paper session at the 2nd ICSIFT, Bangkok</figcaption>
          </figure>
        </div>

        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 pb-24 sm:grid-cols-3 lg:mt-28 lg:grid-cols-5 lg:pb-28">
          {FIGURES.map(([figure, label], index) => (
            <div key={label} data-enter style={{ "--i": 2 + index }} className="flex flex-col-reverse justify-end">
              <dt className="mt-3 max-w-[11rem] text-[18px] leading-snug">{label}</dt>
              <dd className="sig-display text-[clamp(3.2rem,2rem+3.4vw,5.5rem)] leading-none">{figure}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
