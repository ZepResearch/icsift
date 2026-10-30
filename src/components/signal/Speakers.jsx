"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { CONFERENCE } from "@/constants/conference";
import Reveal from "@/components/home/Reveal";

const CATEGORIES = [
  "Guest of Honor",
  "Organizing Secretary",
  "Conference Chair",
  "Conference Co-Chair",
  "Keynote Speaker",
  "Session Chair",
  "Panel Speaker",
];

// Some PocketBase text fields arrive HTML-escaped ("Lecturer &amp; Speaker").
const plain = (text) =>
  String(text ?? "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const photoOf = (s) => `https://conference.pockethost.io/api/files/${s.collectionId}/${s.id}/${s.image}`;

// Cream field: display heading; role tabs; portraits grey in a cream arch, colour on hover; biography in a side panel.
export default function Speakers() {
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
    <section id="speakers" aria-labelledby="speakers-title" className="sig-on-cream bg-[var(--cream)] text-[var(--bark)]">
      <Reveal className="mx-auto max-w-[1400px] px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="speakers-title" data-enter className="sig-h2">
            The people at the lectern
          </h2>
          <p data-enter style={{ "--i": 1 }} className="max-w-[30rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
            Chairs, keynote speakers and panellists of the {CONFERENCE.shortForm}. Select anyone to read their biography.
          </p>
        </div>

        <div data-enter style={{ "--i": 2 }} role="tablist" aria-label="Speaker roles" className="mt-12 flex flex-wrap gap-2">
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
              className="sig-chip"
            >
              {category}
            </button>
          ))}
        </div>

        <div id="speaker-panel" role="tabpanel" aria-busy={speakers === null} className="mt-14">
          {speakers === null ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="aspect-[4/5] animate-pulse rounded-t-full bg-[var(--cream-deep)]" />
                  <div className="mt-4 h-5 w-2/3 animate-pulse bg-[var(--cream-deep)]" />
                </div>
              ))}
            </div>
          ) : list.length === 0 ? (
            <p className="py-10 text-[19px]">
              {failed
                ? "Speakers could not load just now. Please refresh the page."
                : `${active} speakers for the ${CONFERENCE.shortForm} will be announced here soon.`}
            </p>
          ) : list.length <= 2 ? (
            // One or two people in a role: each gets a wide card (portrait beside the start of the biography) so the
            // row is filled rather than one small portrait on an empty line.
            <ul className={`grid gap-3 ${list.length === 2 ? "lg:grid-cols-2" : ""}`}>
              {list.map((speaker) => (
                <li key={speaker.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(speaker)}
                    className={`group grid w-full gap-6 bg-[var(--cream-deep)] p-5 text-left sm:grid-cols-[minmax(0,14rem)_1fr] sm:p-8 ${
                      list.length === 1 ? "lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12 lg:p-10" : ""
                    }`}
                  >
                    <div className="sig-portrait relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-t-full bg-[var(--cream)]">
                      <Image src={photoOf(speaker)} alt="" fill sizes="(min-width: 640px) 18rem, 70vw" className="object-cover object-[50%_20%]" />
                    </div>
                    <div className="flex flex-col">
                      <p className="sig-display text-[clamp(2rem,1.5rem+1.6vw,3.2rem)] leading-[1.02]">{plain(speaker.name)}</p>
                      <p className="mt-3 text-[18px] leading-snug font-semibold">{plain(speaker.role)}</p>
                      <p className="mt-1 text-[16px] leading-snug text-[var(--bark-2)]">
                        {[speaker.college, speaker.country].filter(Boolean).map(plain).join(", ")}
                      </p>
                      {speaker.bio ? (
                        <p className={`mt-5 max-w-[44rem] text-[17px] leading-relaxed ${list.length === 1 ? "line-clamp-6" : "line-clamp-4"}`}>
                          {plain(speaker.bio)}
                        </p>
                      ) : null}
                      <span className="sig-btn mt-6 self-start" data-dark="">
                        Read biography
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-5">
              {list.map((speaker) => (
                <li key={speaker.id}>
                  <button type="button" onClick={() => setOpen(speaker)} className="group block w-full text-left">
                    <div className="sig-portrait relative aspect-[4/5] overflow-hidden rounded-t-full bg-[var(--cream-deep)]">
                      <Image
                        src={photoOf(speaker)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 18vw, 45vw"
                        className="object-cover object-[50%_20%]"
                      />
                    </div>
                    <p className="sig-display mt-5 text-[clamp(1.4rem,1.1rem+0.8vw,1.8rem)] leading-[1.02]">{plain(speaker.name)}</p>
                    <p className="mt-2 text-[16px] leading-snug text-[var(--bark-2)]">{plain(speaker.role)}</p>
                    <p className="mt-1 text-[15px] leading-snug text-[var(--bark-2)]">
                      {[speaker.college, speaker.country].filter(Boolean).map(plain).join(", ")}
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
        className="herb-dialog sig !bg-[var(--cream)]"
        aria-labelledby="speaker-dialog-name"
        onClose={() => setOpen(null)}
        onClick={(event) => event.target === dialog.current && dialog.current.close()}
      >
        {open ? (
          <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="sig-tag text-[20px]">{open.category}</p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="grid h-11 w-11 place-items-center bg-[var(--forest)] text-[var(--signal)] hover:bg-[var(--forest-deep)]"
                aria-label="Close biography"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <div className="relative mt-8 aspect-[4/5] w-2/3 overflow-hidden rounded-t-full bg-[var(--cream-deep)]">
              <Image src={photoOf(open)} alt={plain(open.name)} fill sizes="300px" className="object-cover object-[50%_20%]" />
            </div>
            <h3 id="speaker-dialog-name" className="sig-display mt-8 text-[2.4rem]">
              {plain(open.name)}
            </h3>
            <p className="mt-3 text-[17px] font-semibold">{plain(open.role)}</p>
            <p className="mt-1 text-[16px] text-[var(--bark-2)]">{[open.college, open.country].filter(Boolean).map(plain).join(", ")}</p>
            {open.bio ? <p className="mt-6 text-[17px] leading-relaxed whitespace-pre-line">{plain(open.bio)}</p> : null}
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
