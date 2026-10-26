import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "./primitives";
import Reveal from "./Reveal";

export default function VenueSheet() {
  const { city, location, address } = CONFERENCE.venue;
  return (
    <section id="venue" aria-labelledby="venue-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:p-12">
        <div className="flex flex-col">
          <h2 id="venue-title" className="herb-display text-[clamp(2.6rem,1.6rem+3.4vw,4.75rem)]">
            {location}.
          </h2>
          <p className="mt-6 max-w-[32rem] text-[18px] leading-relaxed">
            Two days in the city, or the same sessions online. Hybrid presentation means your paper counts either way.
          </p>

          <dl className="herb-label mt-10">
            {[
              ["Dates", CONFERENCE.date],
              ["Hours", "9:00 AM to 6:00 PM each day; registration desk opens at 8:00 AM"],
              ["Format", `In person in ${city}, or online`],
            ].map(([term, value]) => (
              <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-[var(--rule)] px-4 py-2.5 max-sm:grid-cols-1 max-sm:gap-0.5">
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-2.5 max-sm:grid-cols-1 max-sm:gap-0.5">
              <dt>Address</dt>
              <dd className="herb-muted">
                <span className="block border-b border-dashed border-[var(--rule)] pb-1">{address}</span>
              </dd>
            </div>
          </dl>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <ActionLink href="/venue">Venue and travel</ActionLink>
            <ActionLink href="/registration" primary>
              Register to attend
            </ActionLink>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <figure>
            <div className="herb-mount herb-photo relative aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1600&auto=format&fit=crop"
                alt="Loha Prasat at Wat Ratchanatdaram, Bangkok"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">Loha Prasat, Wat Ratchanatdaram: {city} hosts the {CONFERENCE.edition} edition</figcaption>
          </figure>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Arriving</h3>
              <p className="herb-muted mt-3 text-[15.5px]">
                Bangkok is served by Suvarnabhumi (BKK) and Don Mueang (DMK) airports. From Suvarnabhumi, the Airport Rail Link,
                a taxi or a transfer reaches the centre in 30 to 45 minutes; from Don Mueang, allow 30 to 50 minutes by taxi, bus
                or ride-hailing.
              </p>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Getting around</h3>
              <p className="herb-muted mt-3 text-[15.5px]">
                The BTS Skytrain and MRT cover most of the city. Taxis, Grab and tuk-tuks are easy to find, and the Chao Phraya
                Express Boat runs along the river.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
