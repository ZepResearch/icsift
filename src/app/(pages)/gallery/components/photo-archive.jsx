"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// How many thumbnails show before "Show all". Hidden ones are not rendered, so they cost no requests.
const COLLAPSED = 12;
// The first five photos of an edition are laid out as a mixed-size mosaic.
const MOSAIC = [
  { span: "lg:col-span-7 lg:row-span-2", ratio: "aspect-[4/3] lg:aspect-auto lg:h-full", sizes: "(min-width: 1024px) 55vw, 100vw" },
  { span: "lg:col-span-5", ratio: "aspect-[3/2]", sizes: "(min-width: 1024px) 38vw, 100vw" },
  { span: "lg:col-span-5", ratio: "aspect-[3/2]", sizes: "(min-width: 1024px) 38vw, 100vw" },
  { span: "sm:col-span-1 lg:col-span-6", ratio: "aspect-[3/2]", sizes: "(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw" },
  { span: "sm:col-span-1 lg:col-span-6", ratio: "aspect-[3/2]", sizes: "(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw" },
];

export default function PhotoArchive({ photos, edition, eager = false }) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(null);
  const dialog = useRef(null);

  const lead = photos.slice(0, MOSAIC.length);
  const rest = photos.slice(MOSAIC.length);
  const shown = expanded ? rest : rest.slice(0, COLLAPSED);

  const step = useCallback(
    (delta) => setOpen((index) => (index === null ? null : (index + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [open]);

  const onKey = (event) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  const label = (index) => `${edition}, photo ${index + 1} of ${photos.length}`;

  return (
    <>
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-12">
        {lead.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={() => setOpen(index)}
            className={`group herb-photo relative block bg-[var(--rule-soft)] sm:col-span-2 ${MOSAIC[index].span} ${MOSAIC[index].ratio}`}
            aria-label={`Open ${label(index)}`}
          >
            <Image
              src={photo}
              alt=""
              fill
              sizes={MOSAIC[index].sizes}
              quality={70}
              priority={eager && index === 0}
              className="object-cover group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {rest.length ? (
        <>
          <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {shown.map((photo, offset) => {
              const index = MOSAIC.length + offset;
              return (
                <li key={photo}>
                  <button
                    type="button"
                    onClick={() => setOpen(index)}
                    className="group herb-photo relative block aspect-square w-full bg-[var(--rule-soft)]"
                    aria-label={`Open ${label(index)}`}
                  >
                    <Image
                      src={photo}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                      quality={60}
                      className="object-cover group-hover:scale-[1.03]"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          {rest.length > COLLAPSED ? (
            <button type="button" onClick={() => setExpanded((v) => !v)} className="herb-link mt-6 text-[15.5px]">
              {expanded ? "Show fewer photos" : `Show all ${photos.length} photos`}
            </button>
          ) : null}
        </>
      ) : null}

      <dialog
        ref={dialog}
        className="herb-lightbox"
        aria-label={open === null ? edition : label(open)}
        onClose={() => setOpen(null)}
        onKeyDown={onKey}
        onClick={(event) => event.target === dialog.current && dialog.current.close()}
      >
        {open !== null ? (
          <div className="flex h-full flex-col p-3 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="herb-italic text-[15px] text-[var(--ink-2)]">{label(open)}</p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="grid h-11 w-11 place-items-center border border-[var(--ink)] bg-[var(--sheet)] hover:bg-[var(--ink)] hover:text-white"
                aria-label="Close photo"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
            <div className="relative mt-3 min-h-0 flex-1">
              <Image key={photos[open]} src={photos[open]} alt={label(open)} fill sizes="100vw" quality={80} priority className="object-contain" />
              {/* Warm the next photo so arrowing forward feels instant. */}
              <Image
                src={photos[(open + 1) % photos.length]}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                quality={80}
                loading="eager"
                className="pointer-events-none invisible"
              />
            </div>
            <div className="mt-3 flex justify-center gap-3">
              {[
                [-1, "Previous photo", ChevronLeft],
                [1, "Next photo", ChevronRight],
              ].map(([delta, text, Icon]) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => step(delta)}
                  className="grid h-11 w-14 place-items-center border border-[var(--ink)] bg-[var(--sheet)] hover:bg-[var(--ink)] hover:text-white"
                  aria-label={text}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
