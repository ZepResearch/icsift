"use client";

import { useState } from "react";
import { GOALS } from "@/constants/sdg";
import Reveal from "./Reveal";
import SdgWheel from "./SdgWheel";

const FOCUS = [
  [4, "Teaching, training and access to learning that lasts."],
  [8, "Research that creates fair work and resilient economies."],
  [9, "Technologies and systems that build without depleting."],
  [17, "Academia, industry and policymakers working on one agenda."],
];

export default function SdgSheet() {
  const [active, setActive] = useState(null);

  return (
    <section id="sdgs" aria-labelledby="sdg-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <div>
          <h2 id="sdg-title" className="herb-h2 max-w-[13ch]">
            Seventeen goals. Four we work on.
          </h2>
          <p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed">
            ICSIFT is dedicated to advancing the United Nations Sustainable Development Goals. Every paper is filed against
            them, and four stand proud of the ring.
          </p>
          <ul className="mt-10 border-t border-[var(--ink)]" onMouseLeave={() => setActive(null)}>
            {FOCUS.map(([n, line]) => {
              const { name, color } = GOALS[n - 1];
              const isActive = active === n;
              return (
                <li
                  key={n}
                  onMouseEnter={() => setActive(n)}
                  className="relative grid grid-cols-[3rem_1fr] border-b border-[var(--rule)] py-4 pl-4 transition-[padding] duration-500 ease-[var(--ease-out)]"
                  style={{ paddingLeft: isActive ? "1.25rem" : "1rem" }}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-3 left-0 w-[3px] origin-top transition-transform duration-500 ease-[var(--ease-out)] ${isActive ? "scale-y-100" : "scale-y-0"}`}
                    style={{ background: color }}
                  />
                  <span
                    className="text-[1.5rem] leading-none font-medium tracking-[-0.02em] transition-colors duration-300"
                    style={{ color: isActive ? color : undefined }}
                  >
                    {n}
                  </span>
                  <span>
                    <span className="block text-[17px]">{name}</span>
                    <span className="herb-muted mt-1 block text-[15px]">{line}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <Reveal className="herb-sheet">
          <SdgWheel active={active} onActive={setActive} />
        </Reveal>
      </div>
    </section>
  );
}
