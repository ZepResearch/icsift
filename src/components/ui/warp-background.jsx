"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const GRID =
  "[background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-style:preserve-3d]";

const SIDES = [
  { key: "top", className: "[transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]" },
  { key: "bottom", className: "top-full [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]" },
  { key: "left", className: "left-0 top-0 [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]" },
  { key: "right", className: "right-0 top-0 [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)] [width:100cqh]" },
];

function Beam({ width, x, delay, duration, hue, aspect, saturation, lightness }) {
  return (
    <motion.div
      style={{
        "--x": x,
        "--width": width,
        "--aspect-ratio": aspect,
        "--background": `linear-gradient(hsl(${hue} ${saturation}% ${lightness}%), transparent)`,
      }}
      className="absolute left-[var(--x)] top-0 [aspect-ratio:1/var(--aspect-ratio)] [background:var(--background)] [width:var(--width)]"
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

// Grid tunnel with light beams running along its four walls. Beams are randomised after mount so the
// server render stays deterministic, and are left out entirely for reduced-motion users.
export function WarpBackground({
  children,
  className,
  perspective = 100,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  hueRange = [0, 360],
  beamSaturation = 80,
  beamLightness = 60,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const [beams, setBeams] = useState(null);
  const [hueMin, hueMax] = hueRange;

  useEffect(() => {
    if (reduceMotion) {
      setBeams(null);
      return;
    }
    const step = Math.floor(100 / beamSize) / beamsPerSide;
    const generate = () =>
      Array.from({ length: beamsPerSide }, (_, i) => ({
        x: Math.floor(i * step),
        delay: Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin,
        hue: Math.floor(hueMin + Math.random() * (hueMax - hueMin)),
        aspect: Math.floor(Math.random() * 10) + 1,
      }));
    setBeams(Object.fromEntries(SIDES.map(({ key }) => [key, generate()])));
  }, [reduceMotion, beamsPerSide, beamSize, beamDelayMax, beamDelayMin, hueMin, hueMax]);

  return (
    <div className={cn("relative rounded border p-20", className)} {...props}>
      <div
        aria-hidden="true"
        style={{
          "--perspective": `${perspective}px`,
          "--grid-color": gridColor,
          "--beam-size": `${beamSize}%`,
        }}
        className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
      >
        {SIDES.map((side) => (
          <div key={side.key} className={cn("absolute", GRID, side.className)}>
            {beams?.[side.key].map((beam, index) => (
              <Beam
                key={index}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                hue={beam.hue}
                aspect={beam.aspect}
                saturation={beamSaturation}
                lightness={beamLightness}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
