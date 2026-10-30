"use client";

import { useEffect, useRef } from "react";

// The Bangkok street footage from the home page, as a muted loop. Reduced-motion users get the first frame, held still.
export default function CityFootage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause();
  }, []);

  return (
    <figure className="flex h-full flex-col">
      <div className="herb-photo relative aspect-[4/3] bg-[var(--green-deep)] lg:aspect-auto lg:flex-1">
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
      </div>
      <figcaption className="mt-3 text-[15px] text-[var(--muted)]">Bangkok, between the sessions</figcaption>
    </figure>
  );
}
