import SdgTurntable from "./SdgTurntable";
import Reveal from "./Reveal";

const FOCUS = [
  ["4", "Quality Education", "Teaching, training and access to learning that lasts."],
  ["8", "Decent Work and Economic Growth", "Research that creates fair work and resilient economies."],
  ["9", "Industry, Innovation and Infrastructure", "Technologies and systems that build without depleting."],
  ["17", "Partnerships for the Goals", "Academia, industry and policymakers working on one agenda."],
];

export default function SdgSheet() {
  return (
    <section id="sdgs" aria-labelledby="sdg-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <div>
          <h2 id="sdg-title" className="herb-h2 max-w-[13ch]">
            Seventeen goals. Four we work on.
          </h2>
          <p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed">
            ICSIFT is dedicated to advancing the United Nations Sustainable Development Goals. Every paper is filed against
            them, and four stand tallest on our turntable.
          </p>
          <ul className="mt-10 border-t border-[var(--ink)]">
            {FOCUS.map(([n, name, line]) => (
              <li key={n} className="grid grid-cols-[3rem_1fr] border-b border-[var(--rule)] py-4">
                <span className="text-[1.5rem] leading-none font-medium tracking-[-0.02em]">{n}</span>
                <span>
                  <span className="block text-[17px]">{name}</span>
                  <span className="herb-muted mt-1 block text-[15px]">{line}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="herb-sheet">
          <SdgTurntable />
        </Reveal>
      </div>
    </section>
  );
}
