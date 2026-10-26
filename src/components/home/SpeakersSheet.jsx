"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { CONFERENCE } from "@/constants/conference";
import Reveal from "./Reveal";

const CATEGORIES = [
  "Guest of Honor",
  "Organizing Secretary",
  "Conference Chair",
  "Conference Co-Chair",
  "Keynote Speaker",
  "Session Chair",
  "Panel Speaker",
];

const photoOf = (s) => `https://conference.pockethost.io/api/files/${s.collectionId}/${s.id}/${s.image}`;

export default function SpeakersSheet() {
  const [speakers, setSpeakers] = useState(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(CATEGORIES[0]);
  const [open, setOpen] = useState(null);
  const dialog = useRef(null);

  useEffect(() => {
    pb.collection("ICSIFT_speakers")
      .getFullList({ sort: "order", requestKey: null })
      .then((records) => {
        setSpeakers(records);
        const first = CATEGORIES.find((c) => records.some((r) => r.category === c));
        if (first) setActive(first);
      })
      .catch(() => {
        setSpeakers([]);
        setFailed(true);
      });
  }, []);

  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);

  const present = CATEGORIES.filter((c) => speakers?.some((s) => s.category === c));
  const tabs = present.length ? present : CATEGORIES;
  const list = speakers?.filter((s) => s.category === active) ?? [];

  const onTabKey = (event, index) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = tabs[(index + step + tabs.length) % tabs.length];
    setActive(next);
    document.getElementById(`speaker-tab-${tabs.indexOf(next)}`)?.focus();
  };

  return (
    <section id="speakers" aria-labelledby="speakers-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="speakers-title" className="herb-h2 max-w-[14ch]">
            The people at the lectern.
          </h2>
          <p className="herb-muted max-w-[28rem]">
            Chairs, keynote speakers and panellists for the {CONFERENCE.edition} edition. Select anyone to read their biography.
          </p>
        </div>

        <div role="tablist" aria-label="Speaker roles" className="mt-10 flex flex-wrap gap-x-7 gap-y-1 border-b border-[var(--rule)]">
          {tabs.map((category, index) => (
            <button
              key={category}
              id={`speaker-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={active === category}
              aria-controls="speaker-panel"
              tabIndex={active === category ? 0 : -1}
              onClick={() => setActive(category)}
              onKeyDown={(event) => onTabKey(event, index)}
              className="herb-tab"
            >
              {category}
            </button>
          ))}
        </div>

        <div id="speaker-panel" role="tabpanel" aria-busy={speakers === null} className="mt-10">
          {speakers === null ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="aspect-[4/5] animate-pulse bg-[var(--rule-soft)]" />
                  <div className="mt-4 h-4 w-2/3 animate-pulse bg-[var(--rule-soft)]" />
                </div>
              ))}
            </div>
          ) : list.length === 0 ? (
            <p className="herb-muted py-10 text-[17px]">
              {failed
                ? "Speakers could not load just now. Please refresh the page."
                : `${active} speakers for the ${CONFERENCE.edition} edition will be announced here soon.`}
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {list.map((speaker) => (
                <li key={speaker.id}>
                  <button type="button" onClick={() => setOpen(speaker)} className="group block w-full text-left">
                    <div className="herb-mount herb-photo relative aspect-[4/5]">
                      <Image
                        src={photoOf(speaker)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className="object-cover object-[50%_20%] group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-5 text-[18px] leading-snug font-medium">{speaker.name}</p>
                    <p className="herb-muted mt-1 text-[15px] leading-snug">{speaker.role}</p>
                    <p className="herb-italic mt-2 text-[14px] leading-snug text-[var(--ink-2)]">
                      {[speaker.college, speaker.country].filter(Boolean).join(", ")}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>

      <dialog
        ref={dialog}
        className="herb-dialog"
        aria-labelledby="speaker-dialog-name"
        onClose={() => setOpen(null)}
        onClick={(event) => event.target === dialog.current && dialog.current.close()}
      >
        {open ? (
          <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="herb-sheet-no">{open.category}</p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="grid h-10 w-10 place-items-center border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
                aria-label="Close biography"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
            <div className="herb-mount herb-photo relative mt-8 aspect-[4/5] w-2/3">
              <Image src={photoOf(open)} alt={open.name} fill sizes="300px" className="object-cover" />
            </div>
            <h3 id="speaker-dialog-name" className="mt-8 text-[1.9rem] leading-tight font-normal tracking-[-0.02em]">
              {open.name}
            </h3>
            <p className="mt-2 text-[16px]">{open.role}</p>
            <p className="herb-italic mt-1 text-[15px] text-[var(--ink-2)]">
              {[open.college, open.country].filter(Boolean).join(", ")}
            </p>
            {open.bio ? <p className="herb-rule mt-6 pt-6 text-[16px] leading-relaxed whitespace-pre-line">{open.bio}</p> : null}
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
