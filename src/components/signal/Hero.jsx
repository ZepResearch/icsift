import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import SigButton from "./SigButton";

// "21–22 February 2027", from the schedule in the constants.
export function conferenceDates() {
  const { month, year, days } = CONFERENCE.scheduleDates;
  const name = new Date(year, month, 1).toLocaleString("en-GB", { month: "long" });
  return `${days[0]}–${days[days.length - 1]} ${name} ${year}`;
}

// Full-bleed room photograph in green duotone. Place and date above a giant signal-yellow headline bottom-left;
// the supporting line and the two actions bottom-right.
export default function Hero() {
  const city = CONFERENCE.venue.location.trim().split(",")[0];

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-120px)] flex-col overflow-hidden text-[var(--signal)]">
      <div className="sig-duotone sig-hero-photo -z-10">
        <Image
          src="/gallery/3rd-icsift  (58).jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
      </div>

      <div className="mx-auto mt-auto grid w-full max-w-[1400px] gap-10 px-4 pt-32 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-14 lg:px-10 lg:pb-16">
        <div>
          <ul className="sig-rise flex flex-wrap gap-x-8 gap-y-2 text-[17px] font-semibold">
            <li className="flex items-center gap-2.5">
              <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              {city} and Hybrid
            </li>
            <li className="flex items-center gap-2.5">
              <CalendarDays aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              {conferenceDates()}
            </li>
          </ul>
          <h1 id="hero-title" className="sig-display sig-rise mt-5 text-[clamp(2.6rem,1rem+5vw,6rem)]" style={{ "--i": 1 }}>
            {CONFERENCE.name.trim()}
          </h1>
        </div>

        <div className="sig-rise lg:pb-3" style={{ "--i": 2 }}>
          <dl className="grid max-w-[34rem] gap-5">
            <div>
              <dt className="text-[16px] text-[var(--signal)]/75">Venue</dt>
              <dd className="sig-display mt-1 text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)] leading-[1.02]">{CONFERENCE.venue.name.trim()}</dd>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-[16px] text-[var(--signal)]/75">Address</dt>
                <dd className="mt-1 text-[17px] leading-snug font-medium">{CONFERENCE.venue.address.trim()}</dd>
              </div>
              <div>
                <dt className="text-[16px] text-[var(--signal)]/75">Edition</dt>
                <dd className="mt-1 text-[17px] leading-snug font-medium">
                  {CONFERENCE.shortForm}, {CONFERENCE.date}
                  <span className="block">{CONFERENCE.venue.location.trim()}, in person and online</span>
                </dd>
              </div>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <SigButton href="/submission">Submit a paper</SigButton>
            <SigButton href="/registration" tone="outline">
              Register
            </SigButton>
          </div>
        </div>
      </div>

      <p className="sr-only">Photograph: delegates in the session room at the 3rd ICSIFT.</p>
    </section>
  );
}
