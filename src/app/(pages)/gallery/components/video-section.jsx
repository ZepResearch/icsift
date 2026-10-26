"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Shows a poster first and only loads the YouTube player when asked, so the page stays light.
function Video({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure>
      <div className="herb-photo relative aspect-video bg-[var(--rule-soft)]">
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
            <Image src={video.poster} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" quality={70} className="object-cover group-hover:scale-[1.03]" />
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

export default function VideoSection({ videos }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </div>
  );
}
