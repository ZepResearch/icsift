"use client";

import { useState } from "react";
import { FOCUS, FOCUS_COUNT, FOCUS_COUNT_CAP, GOALS } from "@/constants/sdg";
import Reveal from "@/components/home/Reveal";
import SdgWheel from "../home/SdgWheel";

// Cream field: heading and the focus goals left (each lights its wedge); the turning SDG dial right.
export default function Goals() {
  const [active, setActive] = useState(null);

  return (
    <section id="sdgs" aria-labelledby="sdg-title" className="sig-on-cream bg-[var(--cream)] text-[var(--bark)]">
      <Reveal className="mx-auto grid max-w-[1400px] gap-14 px-4 py-28 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:px-10 lg:py-40">
        <div data-enter>
          <h2 id="sdg-title" className="sig-h2">
            Seventeen goals. {FOCUS_COUNT_CAP} we work on.
          </h2>
          <p className="mt-6 max-w-[34rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
            ICSIFT advances the United Nations Sustainable Development Goals. Every paper is filed against them, and{" "}
            {FOCUS_COUNT} stand proud of the ring.
          </p>
          <ul className="mt-10 grid gap-1.5" onMouseLeave={() => setActive(null)}>
            {FOCUS.map(([n, line]) => {
              const { name, color } = GOALS[n - 1];
              const on = active === n;
              return (
                <li key={n}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(n)}
                    onFocus={() => setActive(n)}
                    onClick={() => setActive(on ? null : n)}
                    aria-pressed={on}
                    className="grid w-full grid-cols-[3.75rem_1fr] items-center bg-[var(--cream-deep)] py-3 pr-5 text-left transition-colors duration-300"
                    style={on ? { background: color, color: "#fff" } : undefined}
                  >
                    <span className="sig-display text-center text-[2.1rem] leading-none" style={on ? undefined : { color }}>
                      {n}
                    </span>
                    <span>
                      <span className="block text-[18px] font-semibold">{name}</span>
                      <span className={`mt-0.5 block text-[16px] ${on ? "text-white/85" : "text-[var(--bark-2)]"}`}>{line}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div data-enter style={{ "--i": 1 }} className="bg-[var(--cream-deep)]">
          <SdgWheel active={active} onActive={setActive} />
        </div>
      </Reveal>
    </section>
  );
}
