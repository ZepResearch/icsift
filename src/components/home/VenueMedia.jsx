"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Cut-outs sit on the bottom edge of the footage, a third of its height; the dancers overlap the
// guardian. Widths follow each cut-out's aspect so both share the same height.
const FIGURES = [
  {
    src: "/venue-guardian-cutout.png",
    alt: "Yaksha guardian statue at the Grand Palace, Bangkok",
    width: 858,
    height: 861,
    className: "-left-[10%] z-[2]",
  },
  {
    src: "/venue-stachu.png",
    alt: "Khon dancers in costume as Thotsakan and Hanuman",
    width: 612,
    height: 194,
    className: "-left-[15%] z-[1]",
  },
];

// Looping city footage with the two cut-outs standing on its lower edge. Reduced-motion users get
// the first frame, held still.
export default function VenueMedia() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause();
  }, []);

  return (
    <div className="herb-mount herb-photo group relative aspect-[4/3]">
      <video
        ref={videoRef}
        src="/venue%20-back-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
      {FIGURES.map((figure) => (
        <Image
          key={figure.src}
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes="(min-width: 1024px) 220px, 30vw"
          className={`absolute -bottom-8 drop-shadow-2xl scroll-smooth h-6/7 w-auto [filter:drop-shadow(0_10px_14px_rgba(15,26,20,0.45))] transition-transform duration-700 ease-[var(--ease-out)]  ${figure.className}`}
        />
      ))}
    </div>
  );
}
