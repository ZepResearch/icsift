"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import Reveal from "@/components/home/Reveal";

const PHOTOS = [
  ["/gallery/3rd-icsift  (34).jpeg", "Delegates on the terrace, 3rd ICSIFT"],
  ["/gallery/3rd-icsift (12).jpg", "A presenter at the lectern, 3rd ICSIFT"],
  ["/gallery/2nd-ICSIFT_03.jpg", "Delegates on stage, 2nd ICSIFT, Bangkok"],
  ["/gallery/3rd-icsift (19).jpg", "A question from the floor, 3rd ICSIFT"],
  ["/gallery/3rd-icsift (5).jpg", "A certificate handed over, 3rd ICSIFT"],
  ["/gallery/ICSIFT_03.jpg", "Delegates, 1st ICSIFT, 2024"],
  ["/gallery/3rd-icsift (14).jpg", "Lunch between sessions, 3rd ICSIFT"],
  ["/gallery/2nd-ICSIFT_07.jpg", "Certificates on stage, 2nd ICSIFT"],
];

const VIDEOS = [
  { id: "r1GcUCVStsc", poster: "/gallery/2nd-ICSIFT_07.jpg", title: "The 2nd ICSIFT, concluded in Bangkok, 2025" },
  { id: "DTUzRphTBWA", poster: "/preview.jpg", title: "Highlights from the 1st ICSIFT, 2024" },
];

function Video({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure>
      <div className="herb-photo relative aspect-video bg-[var(--forest-deep)]">
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
            <span className="sig-btn absolute bottom-4 left-4 !min-h-[48px]" data-fill="">
              <Play aria-hidden="true" className="h-4 w-4 fill-current" strokeWidth={2} />
              Watch the film
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-[16px] text-[var(--signal)]/80">{video.title}</figcaption>
    </figure>
  );
}

// Forest field: a centred display heading over a slow, endless strip of photographs (alternately tall and short),
// then the two films.
export default function Moments() {
  const strip = [...PHOTOS, ...PHOTOS];

  return (
    <section id="past-editions" aria-labelledby="moments-title" className="overflow-hidden bg-[var(--forest)] text-[var(--signal)]">
      <Reveal className="py-28 lg:py-40">
        <div data-enter className="mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-10">
          <h2 id="moments-title" className="sig-h2">
            Moments that made the room
          </h2>
          <p className="mx-auto mt-5 max-w-[40rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
            Three editions since 2024: the conversations, connections and certificates.{" "}
            <Link href="/gallery" className="sig-link font-semibold">
              See the full gallery
            </Link>
            .
          </p>
        </div>

        <div data-enter style={{ "--i": 1 }} className="sig-marquee-wrap mt-16">
          <ul className="sig-marquee items-center gap-5">
            {strip.map(([src, caption], index) => (
              <li
                key={`${src}-${index}`}
                aria-hidden={index >= PHOTOS.length || undefined}
                className={`relative shrink-0 overflow-hidden bg-[var(--forest-deep)] ${
                  index % 2 ? "h-[300px] w-[260px] sm:h-[400px] sm:w-[340px]" : "h-[380px] w-[290px] sm:h-[520px] sm:w-[400px]"
                }`}
              >
                <Image src={src} alt={index >= PHOTOS.length ? "" : caption} fill sizes="400px" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>

        <div data-enter style={{ "--i": 2 }} className="mx-auto mt-24 grid max-w-[1400px] gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:px-10">
          {VIDEOS.map((video) => (
            <Video key={video.id} video={video} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
