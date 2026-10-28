"use client";

import { useEffect, useState } from "react";
import { FOCUS_GOALS, GOALS } from "@/constants/sdg";

// Dial geometry, in viewBox units. Each wedge is drawn once pointing up, then rotated into place,
// so a translate along -y inside its group moves it radially outward.
const SIZE = 460;
const C = SIZE / 2;
const R = 170;
const INNER = 118;
const LIFT = 16;
const STEP = 360 / GOALS.length;
const HALF = (STEP - 1.6) / 2;

const pt = (radius, deg) => {
  const a = (deg * Math.PI) / 180;
  return [+(C + radius * Math.sin(a)).toFixed(2), +(C - radius * Math.cos(a)).toFixed(2)];
};

const WEDGE = (() => {
  const [x1, y1] = pt(R, -HALF);
  const [x2, y2] = pt(R, HALF);
  const [x3, y3] = pt(INNER, HALF);
  const [x4, y4] = pt(INNER, -HALF);
  return `M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${INNER} ${INNER} 0 0 0 ${x4} ${y4} Z`;
})();

const FOCUS = new Set(FOCUS_GOALS);

// All 17 goals as a dial. Wedges bloom in from the centre, the four focus goals lift clear of the
// ring, and the dial turns slowly with its numbers kept upright. Hovering a wedge (or a row in the
// list beside it) brightens the goal, swings the index to it and names it in the centre.
export default function SdgWheel({ active, onActive }) {
  const goal = active ? GOALS[active - 1] : null;
  // The index rests where it last pointed so it swings, rather than jumps, to the next goal.
  const [index, setIndex] = useState(FOCUS_GOALS[0]);
  useEffect(() => {
    if (active) setIndex(active);
  }, [active]);

  return (
    <figure className="m-0 p-5 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <span className="herb-sheet-no">Fig. 1 &middot; The seventeen goals</span>
        <span className="herb-italic text-right text-[14px]" aria-live="polite">
          {goal ? `Goal ${goal.n} of 17` : "Four of 17 in focus"}
        </span>
      </div>

      <div className="herb-illus sdg-stage @container relative mx-auto mt-4 aspect-square w-full max-w-[560px]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-auto w-full overflow-visible"
          role="group"
          aria-label="The 17 Sustainable Development Goals. ICSIFT focuses on goals 4, 8, 9 and 17."
        >
          <circle
            cx={C}
            cy={C}
            r={R + 9}
            fill="none"
            stroke="var(--rule)"
            strokeDasharray="2 6"
            data-fade
            style={{ "--d": 900 }}
          />
          <g className="sdg-ring">
            {GOALS.map((g, i) => (
              <g
                key={g.n}
                className="sdg-wedge"
                data-focus={FOCUS.has(g.n) || undefined}
                data-active={active === g.n || undefined}
                transform={`rotate(${i * STEP} ${C} ${C})`}
                style={{ "--goal": g.color, "--d": 80 + i * 45 }}
              >
                <g className="sdg-lift">
                  <path
                    d={WEDGE}
                    data-pop
                    tabIndex={0}
                    aria-label={`Goal ${g.n}: ${g.name}`}
                    onMouseEnter={() => onActive(g.n)}
                    onMouseLeave={() => onActive(null)}
                    onFocus={() => onActive(g.n)}
                    onBlur={() => onActive(null)}
                  />
                </g>
              </g>
            ))}

            {GOALS.map((g, i) => {
              const focus = FOCUS.has(g.n);
              const [x, y] = pt(focus ? R + LIFT + 20 : R + 18, i * STEP);
              return (
                <g key={g.n} data-fade style={{ "--d": 400 + i * 45 }}>
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="sdg-num"
                    data-focus={focus || undefined}
                    data-active={active === g.n || undefined}
                    style={{ "--goal": g.color }}
                  >
                    {g.n}
                  </text>
                </g>
              );
            })}

            <g className="sdg-index" style={{ rotate: `${(index - 1) * STEP}deg`, opacity: active ? 1 : 0 }}>
              <path d={`M${C} ${C - INNER + 7} l-5 9 h10 z`} />
            </g>
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" data-fade style={{ "--d": 1500 }}>
          <div key={active ?? "all"} className="sdg-read w-[44%] text-center">
            {goal ? (
              <>
                <span className="herb-display block text-[15cqw] leading-none" style={{ color: goal.color }}>
                  {goal.n}
                </span>
                <span className="mt-2 block text-[3.2cqw] leading-tight text-balance">{goal.name}</span>
                {FOCUS.has(goal.n) ? (
                  <span className="herb-italic mt-2 block text-[2.8cqw] text-[var(--ink-2)]">An ICSIFT focus</span>
                ) : null}
              </>
            ) : (
              <>
                <span className="herb-display block text-[17cqw] leading-none">17</span>
                <span className="herb-italic mt-1 block text-[3cqw] text-[var(--ink-2)]">goals, four in focus</span>
              </>
            )}
          </div>
        </div>
      </div>

      <figcaption className="herb-italic mt-3 text-[13.5px] text-[var(--ink-2)]">
        Rest on a wedge, or on one of the four at left, to read the goal. ICSIFT&rsquo;s four stand proud of the ring.
      </figcaption>
    </figure>
  );
}
