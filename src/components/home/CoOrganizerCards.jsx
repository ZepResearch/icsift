"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Co-organiser cards rise in one after another when the row scrolls into view; the last card invites
// new institutions to join.
export default function CoOrganizerCards({ organizers }) {
  const reduceMotion = useReducedMotion();
  const enter = (index) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
          transition: { duration: 0.7, ease: EASE, delay: index * 0.1 },
        };

  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {organizers.map((org, index) => (
        <motion.li
          key={org.name}
          {...enter(index)}
          className="group relative flex flex-col overflow-hidden border border-[var(--rule)] bg-[var(--sheet)] transition-[border-color,box-shadow,translate] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--ink)] hover:shadow-[0_22px_40px_-28px_rgba(15,26,20,0.45)]"
        >
          <div className="relative flex h-44 items-center justify-center border-b border-[var(--rule-soft)] bg-[var(--mount)]/60 p-6">
            <Image
              src={org.logo}
              alt=""
              width={240}
              height={120}
              className="max-h-full w-auto object-contain mix-blend-multiply transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.05]"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <span className="herb-sheet-no">{String(index + 1).padStart(2, "0")} &middot; Co-organiser</span>
            <p className="mt-3 text-[16.5px] leading-snug">{org.name}</p>
            {org.place ? <p className="herb-italic mt-1 text-[14px] text-[var(--ink-2)]">{org.place}</p> : null}
          </div>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[var(--green)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100"
          />
        </motion.li>
      ))}

      <motion.li {...enter(organizers.length)} className="flex">
        <Link
          href="/about-co-organizers"
          className="group flex w-full flex-col justify-between gap-8 border border-dashed border-[var(--rule)] p-5 transition-colors duration-300 hover:border-[var(--green)] hover:bg-[var(--green)] hover:text-white"
        >
          <span className="herb-sheet-no transition-colors duration-300 group-hover:text-white/75">Open invitation</span>
          <span>
            <span className="block text-[22px] leading-tight tracking-[-0.01em]">Your institution here.</span>
            <span className="mt-2 block text-[15px] text-[var(--ink-2)] transition-colors duration-300 group-hover:text-white/80">
              Co-host the next edition with us
            </span>
            <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium">
              Know more about co-organiser
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </span>
        </Link>
      </motion.li>
    </ul>
  );
}
