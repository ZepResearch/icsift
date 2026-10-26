"use client";

import { useEffect, useRef } from "react";

// The Hairline kernel and the "turntable" figure live in /public/hairline and load
// at runtime (about 37 KB together, outside the JS bundle). Both are evaluated in a
// function scope, so a remount never redeclares globals.
let kernelPromise = null;
let figureText = null;

const loadKernel = () =>
  (kernelPromise ??= fetch("/hairline/kernel.js")
    .then((r) => r.text())
    .then((text) => new Function(`${text};return HL;`)()));

const loadFigure = async () => (figureText ??= await fetch("/hairline/turntable.js").then((r) => r.text()));

export default function SdgTurntable() {
  const stageRef = useRef(null);
  const readRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    let handle = null;
    let cancelled = false;

    Promise.all([loadKernel(), loadFigure()])
      .then(([HL, text]) => {
        if (cancelled || !stage) return;
        const host = (figure) => {
          HL.inject(document);
          stage.setAttribute("data-hairline", figure.name);
          stage.setAttribute("data-hairline-theme", "light");
          stage.setAttribute("aria-label", figure.means);
          const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage);
          const read = {
            set textContent(value) {
              if (readRef.current) readRef.current.textContent = value == null ? "" : String(value);
            },
          };
          handle = figure.mount({ stage, svg, read }, figure.range[1]);
        };
        new Function("HL", "hairline", text)(HL, host);
      })
      .catch(() => {
        if (readRef.current) readRef.current.textContent = "Figure unavailable";
      });

    return () => {
      cancelled = true;
      handle?.destroy();
      stage?.replaceChildren();
    };
  }, []);

  return (
    <figure className="sdg-figure m-0 p-5 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <span className="herb-sheet-no">Fig. 1 · SDG turntable</span>
        <span ref={readRef} className="herb-italic text-right text-[14px] text-[var(--ink)]" aria-live="polite">
          rest
        </span>
      </div>
      <div ref={stageRef} role="img" className="sdg-figure-stage mt-4" />
      <figcaption className="herb-italic mt-3 text-[13.5px] text-[var(--ink-2)]">
        Circle the platter to turn each goal to the index. ICSIFT&rsquo;s four stand tallest.
      </figcaption>
    </figure>
  );
}
