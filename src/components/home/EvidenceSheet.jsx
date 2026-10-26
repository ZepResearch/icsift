"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import Reveal from "./Reveal";

const PHOTOS = [
  { src: "/gallery/3rd-icsift  (34).jpeg", caption: "Delegates on the terrace, 3rd ICSIFT, Philippines", span: "lg:col-span-7 lg:row-span-2", ratio: "aspect-[4/3] lg:aspect-auto lg:h-full" },
  { src: "/gallery/3rd-icsift (14).jpg", caption: "Between sessions, 3rd ICSIFT", span: "lg:col-span-5", ratio: "aspect-[3/2]" },
  { src: "/gallery/2nd-ICSIFT_03.jpg", caption: "Delegates on stage, 2nd ICSIFT, Bangkok 2025", span: "lg:col-span-5", ratio: "aspect-[3/2]" },
  { src: "/gallery/3rd-icsift (5).jpg", caption: "A certificate handed over, 3rd ICSIFT", span: "lg:col-span-4", ratio: "aspect-[4/3]" },
  { src: "/gallery/3rd-icsift  (58).jpeg", caption: "Plenary hall, 3rd ICSIFT", span: "lg:col-span-4", ratio: "aspect-[4/3]" },
  { src: "/gallery/ICSIFT_03.jpg", caption: "Delegates, 1st ICSIFT, 2024", span: "lg:col-span-4", ratio: "aspect-[4/3]" },
];

const VIDEOS = [
  { id: "r1GcUCVStsc", poster: "/gallery/2nd-ICSIFT_07.jpg", title: "The 2nd ICSIFT, concluded in Bangkok, 2025" },
  { id: "DTUzRphTBWA", poster: "/preview.jpg", title: "Highlights from the 1st ICSIFT, 2024" },
];

const NOTES = [
  ["94%", "rated their experience excellent or very good"],
  ["87%", "made connections that led to collaboration"],
  ["32", "countries represented"],
  ["15+", "awards presented"],
];

function Video({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure>
      <div className="herb-photo relative aspect-video">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 block" aria-label={`Play video: ${video.title}`}>
            <Image src={video.poster} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover group-hover:scale-[1.03]" />
            <span className="absolute bottom-0 left-0 flex items-center gap-3 bg-white py-3 pr-5 pl-4 text-[15.5px] font-medium">
              <span className="grid h-9 w-9 place-items-center bg-[var(--green)] text-white">
                <Play className="h-4 w-4 fill-current" strokeWidth={1.6} />
              </span>
              Watch the film
            </span>
          </button>
        )}
      </div>
      <figcaption className="herb-italic mt-3 text-[14.5px] text-[var(--ink-2)]">{video.title}</figcaption>
    </figure>
  );
}

export default function EvidenceSheet() {
  return (
    <section id="past-editions" aria-labelledby="evidence-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <h2 id="evidence-title" className="herb-h2 max-w-[15ch]">
            Three editions on record.
          </h2>
          <p className="herb-muted max-w-[34rem] lg:justify-self-end">
            Since 2024, ICSIFT has gathered 55+ academics, 125+ research scholars and 10+ industry professionals from more than
            ten countries. This is what those rooms looked like.
          </p>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 lg:grid-cols-12">
          {PHOTOS.map((photo) => (
            <figure key={photo.src} className={`flex flex-col ${photo.span}`}>
              <div className={`herb-mount herb-photo relative ${photo.ratio}`}>
                <Image src={photo.src} alt={photo.caption} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="herb-rule mt-16 grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Field notes, previous editions</h3>
            <dl className="mt-4 border-t border-[var(--ink)]">
              {NOTES.map(([value, text]) => (
                <div key={text} className="grid grid-cols-[5.5rem_1fr] items-baseline border-b border-[var(--rule)] py-4">
                  <dt className="text-[1.75rem] leading-none tracking-[-0.02em]">{value}</dt>
                  <dd className="herb-muted text-[15.5px]">{text}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[15.5px]">
              <Link href="/gallery" className="herb-link">
                Full gallery
              </Link>
              <Link href="/previous-conference-report" className="herb-link">
                Previous conference report
              </Link>
              <Link href="/proceedings" className="herb-link">
                Proceedings
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {VIDEOS.map((video) => (
              <Video key={video.id} video={video} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
