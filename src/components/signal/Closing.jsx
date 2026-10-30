import { CONFERENCE } from "@/constants/conference";
import Reveal from "@/components/home/Reveal";
import SigButton from "./SigButton";
import { conferenceDates } from "./Hero";

// Signal-yellow field: the call set huge, the dates and the two actions beneath.
export default function Closing() {
  const city = CONFERENCE.venue.location.trim().split(",")[0];
  return (
    <section aria-labelledby="closing-title" className="sig-on-signal bg-[var(--signal)] text-[var(--forest)]">
      <Reveal className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <h2 id="closing-title" data-enter className="sig-display text-[clamp(3.4rem,1.4rem+7vw,8.5rem)]">
          See you in {city}
        </h2>
        <div data-enter style={{ "--i": 1 }} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-[36rem] text-[clamp(1.15rem,1rem+0.5vw,1.45rem)] leading-snug font-medium">
            {conferenceDates()}, {CONFERENCE.venue.name.trim()} and online. Submit a paper to present it, or register to attend.
          </p>
          <div className="flex flex-wrap gap-3">
            <SigButton href="/submission" tone="dark">
              Submit a paper
            </SigButton>
            <SigButton href="/registration" tone="dark-outline">
              Register
            </SigButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
