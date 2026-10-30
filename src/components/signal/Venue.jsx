import { CONFERENCE } from "@/constants/conference";
import Reveal from "@/components/home/Reveal";
import VenueMedia from "@/components/home/VenueMedia";
import SigButton from "./SigButton";

// Forest field: the city as the display heading with the venue facts in large type left; the city footage right.
export default function Venue() {
  const city = CONFERENCE.venue.location.trim();
  const facts = [
    ["Venue", CONFERENCE.venue.name.trim()],
    ["Address", CONFERENCE.venue.address.trim()],
    ["Hours", "9:00 to 18:00 each day; registration desk opens at 8:00"],
    ["Format", `In person in ${city.split(",")[0]}, or online`],
  ];

  return (
    <section id="venue" aria-labelledby="venue-title" className="bg-[var(--forest)] text-[var(--signal)]">
      <Reveal className="mx-auto grid max-w-[1400px] gap-14 px-4 py-28 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-10 lg:py-40">
        <div data-enter className="flex flex-col">
          <h2 id="venue-title" className="sig-display text-[clamp(3.4rem,1.8rem+5vw,7rem)]">
            {city}
          </h2>
          <p className="mt-6 max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
            Two days in the city, or the same sessions online. Hybrid presentation means your paper counts either way.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt className="text-[16px] text-[var(--signal)]/75">{term}</dt>
                <dd className="mt-1 text-[18px] leading-snug font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
            <SigButton href="/venue">Venue and travel</SigButton>
            <SigButton href="/registration" tone="outline">
              Register
            </SigButton>
          </div>
        </div>

        <figure data-enter style={{ "--i": 1 }}>
          <VenueMedia />
          <figcaption className="mt-3 text-[16px] text-[var(--signal)]/80">
            Khon dancers and a Grand Palace guardian: {city.split(",")[0]} hosts the {CONFERENCE.shortForm}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
