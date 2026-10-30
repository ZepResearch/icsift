"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

// Positions for the two layers. Both are always mounted; switching animates one to full size and the other
// down into its corner (map bottom-left, photo bottom-right), so the thumbnail itself is the switch.
const FULL = { top: "0%", left: "0%", width: "100%", height: "100%" };
const THUMB_W = "clamp(8.5rem, 34%, 15rem)";
const THUMB_H = "clamp(6.5rem, 28%, 11rem)";
const thumbAt = (side) => ({
  top: `calc(100% - ${THUMB_H} - 1rem)`,
  left: side === "left" ? "1rem" : `calc(100% - ${THUMB_W} - 1rem)`,
  width: THUMB_W,
  height: THUMB_H,
});

function Layer({ isMain, place, label, onExpand, children }) {
  return (
    <div
      className={`absolute transition-[top,left,width,height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        isMain ? "z-0" : "z-10 bg-[var(--sheet)] p-1"
      }`}
      style={isMain ? FULL : thumbAt(place)}
    >
      <div className={`relative h-full w-full overflow-hidden ${isMain ? "" : "pointer-events-none"}`}>{children}</div>
      {isMain ? null : (
        <button
          type="button"
          onClick={onExpand}
          className="group absolute inset-0 flex items-end justify-between p-1"
          aria-label={`Show the ${label.toLowerCase()} larger`}
        >
          <span className="bg-[var(--sheet)] px-2 py-1 text-[13px] font-medium">{label}</span>
          <span className="grid h-7 w-7 place-items-center bg-[var(--sheet)] group-hover:bg-[var(--ink)] group-hover:text-white">
            <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.6} />
          </span>
        </button>
      )}
    </div>
  );
}

export default function VenueSpecimen({ venueName, mapSrc }) {
  const [main, setMain] = useState("photo");

  return (
    <figure className="flex flex-col">
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/3] lg:aspect-auto lg:min-h-[600px] lg:flex-1">
        <Layer isMain={main === "photo"} place="right" label="Photo" onExpand={() => setMain("photo")}>
          <div className="herb-photo herb-photo-settle absolute inset-0">
            <Image
              src="/venue.webp"
              alt={`${venueName}, a white high-rise hotel lit up at dusk above the Sukhumvit skyline`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </Layer>
        <Layer isMain={main === "map"} place="left" label="Map" onExpand={() => setMain("map")}>
          <iframe
            title={`Map showing ${venueName}`}
            src={mapSrc}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={main === "map" ? 0 : -1}
          />
        </Layer>
      </div>
      <figcaption className="mt-3 text-[15px] text-[var(--muted)]" aria-live="polite">
        {main === "photo" ? `${venueName} at dusk. Select the map to enlarge it.` : `${venueName} on the map. Select the photo to go back.`}
      </figcaption>
    </figure>
  );
}
