"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { CONFERENCE } from "@/constants/conference";
import { plainText as plain, speakerPhoto as photoOf } from "@/lib/speakers";

// Every speaker in one category, fetched from PocketBase. Grey portraits in a cream arch (colour on hover); one or
// two people get wide cards with the start of their biography; the full biography opens in a side panel.
export default function SpeakerList({ category, title }) {
  const [speakers, setSpeakers] = useState(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(null);
  const dialog = useRef(null);

  useEffect(() => {
    let alive = true;
    pb.collection("ICSIFT_speakers")
      // The category comes from the fixed list in lib/speakers.js, never from the visitor.
      .getFullList({ sort: "order", filter: pb.filter("category = {:category}", { category }), requestKey: null })
      .then((records) => alive && setSpeakers(records))
      .catch(() => {
        if (!alive) return;
        setSpeakers([]);
        setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [category]);

  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);

  if (speakers === null) {
    return (
      <div aria-busy="true" className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="aspect-[4/5] animate-pulse rounded-t-full bg-[var(--panel)]" />
            <div className="mt-4 h-6 w-2/3 animate-pulse bg-[var(--panel)]" />
          </div>
        ))}
      </div>
    );
  }

  if (!speakers.length) {
    return (
      <p className="bg-[var(--panel)] px-6 py-8 text-[19px]">
        {failed
          ? "The speakers could not load just now. Please refresh the page."
          : `${title} for the ${CONFERENCE.shortForm} will be announced here soon.`}
      </p>
    );
  }

  const wide = speakers.length <= 2;

  return (
    <>
      {wide ? (
        <ul className={`grid gap-3 ${speakers.length === 2 ? "lg:grid-cols-2" : ""}`}>
          {speakers.map((speaker) => (
            <li key={speaker.id}>
              <button
                type="button"
                onClick={() => setOpen(speaker)}
                className={`group grid w-full gap-6 bg-[var(--panel)] p-5 text-left sm:grid-cols-[minmax(0,14rem)_1fr] sm:p-8 ${
                  speakers.length === 1 ? "lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12 lg:p-10" : ""
                }`}
              >
                <div className="sig-portrait relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-t-full bg-[var(--cream)]">
                  <Image src={photoOf(speaker)} alt="" fill sizes="(min-width: 640px) 18rem, 70vw" className="object-cover object-[50%_20%]" />
                </div>
                <div className="flex flex-col">
                  <h2 className="sig-display text-[clamp(2rem,1.5rem+1.6vw,3.2rem)] leading-[1.02]">{plain(speaker.name)}</h2>
                  <p className="mt-3 text-[18px] leading-snug font-semibold">{plain(speaker.role)}</p>
                  <p className="mt-1 text-[16px] leading-snug text-[var(--muted)]">
                    {[speaker.college, speaker.country].filter(Boolean).map(plain).join(", ")}
                  </p>
                  {speaker.bio ? (
                    <p className={`mt-5 max-w-[44rem] text-[17px] leading-relaxed ${speakers.length === 1 ? "line-clamp-6" : "line-clamp-4"}`}>
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
        <ul className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <li key={speaker.id}>
              <button type="button" onClick={() => setOpen(speaker)} className="group block w-full text-left">
                <div className="sig-portrait relative aspect-[4/5] overflow-hidden rounded-t-full bg-[var(--panel)]">
                  <Image src={photoOf(speaker)} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover object-[50%_20%]" />
                </div>
                <h2 className="sig-display mt-5 text-[clamp(1.4rem,1.1rem+0.8vw,1.8rem)] leading-[1.02]">{plain(speaker.name)}</h2>
                <p className="mt-2 text-[16px] leading-snug">{plain(speaker.role)}</p>
                <p className="mt-1 text-[15px] leading-snug text-[var(--muted)]">
                  {[speaker.college, speaker.country].filter(Boolean).map(plain).join(", ")}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        className="sig herb-dialog !max-w-[100vw] !w-screen sm:!w-[min(520px,100vw)]"
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
    </>
  );
}
