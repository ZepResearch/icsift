import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";
import VenueSpecimen from "./VenueSpecimen";
import BangkokClock from "./BangkokClock";
import CityFootage from "./CityFootage";

const city = CONFERENCE.venue.location.trim();
const venueName = CONFERENCE.venue.name.trim();
const address = CONFERENCE.venue.address.trim();
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venueName}, ${address}`)}`;
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12822.347855308904!2d100.54901064988289!3d13.746163635628616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee677aa7f5b%3A0x297e4d6053920063!2sRadisson%20Suites%20Bangkok%20Sukhumvit!5e0!3m2!1sen!2sin!4v1793008677280!5m2!1sen!2sin";

const TRAVEL = [
  [
    "From the airport",
    [
      ["Suvarnabhumi (BKK)", "Around 30 to 45 minutes to central Bangkok by Airport Rail Link, taxi or private transfer, depending on traffic."],
      ["Don Mueang (DMK)", "About 30 to 50 minutes to the city centre by taxi, airport bus or ride-hailing."],
      ["Hotel transfers", "Hotels across Bangkok commonly offer paid airport pickup and private transfers on request."],
    ],
  ],
  [
    "Getting around",
    [
      ["BTS Skytrain and MRT", "The fastest, most convenient way to cross the city."],
      ["Grab, taxis and tuk-tuks", "Widely available for short trips."],
      ["Chao Phraya Express Boat", "A scenic, efficient route to the attractions along the river."],
    ],
  ],
  [
    "Parking",
    [["Malls, hotels and offices", "Most have parking, though traffic and spaces can be limited at peak hours."]],
  ],
];

const SIGHTS = [
  {
    title: "Grand Palace",
    note: "The royal complex, with ornate Thai architecture and the Temple of the Emerald Buddha.",
    image: "https://images.unsplash.com/photo-1693501107615-a412a9e29ccf?auto=format&fit=crop&w=1400&q=70",
    span: "lg:col-span-7 lg:row-span-2",
    ratio: "aspect-[4/3] lg:aspect-auto lg:h-full",
  },
  {
    title: "Wat Arun",
    note: "The riverside temple known for its central prang and views over the Chao Phraya.",
    image: "https://images.unsplash.com/photo-1769850069367-6ad11e3fa8ed?auto=format&fit=crop&w=1000&q=70",
    span: "lg:col-span-5",
    ratio: "aspect-[3/2]",
  },
  {
    title: "Wat Pho",
    note: "Historic temple famous for its enormous reclining Buddha.",
    image: "https://images.unsplash.com/photo-1688577553676-3ba3ace2e0c2?auto=format&fit=crop&w=1000&q=70",
    span: "lg:col-span-5",
    ratio: "aspect-[3/2]",
  },
  {
    title: "Chinatown (Yaowarat)",
    note: "Street food, traditional markets and bright signs.",
    image: "https://images.unsplash.com/photo-1786299595406-4956eb496c77?auto=format&fit=crop&w=1000&q=70",
    span: "lg:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    title: "Lumphini Park",
    note: "Walking paths, a lake and gardens below the skyline.",
    image: "https://images.unsplash.com/photo-1774703699581-32d6b6bcc8f5?auto=format&fit=crop&w=1000&q=70",
    span: "lg:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    title: "ICONSIAM",
    note: "Riverside shopping, dining and Thai cultural experiences.",
    image: "https://images.unsplash.com/photo-1739523915210-0d9ee6df3b61?auto=format&fit=crop&w=1000&q=70",
    span: "lg:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    title: "Asiatique The Riverfront",
    note: "Shopping, restaurants and entertainment on the river.",
    image: "https://images.unsplash.com/photo-1694676468402-95f71a9fe89d?auto=format&fit=crop&w=1000&q=70",
    span: "lg:col-span-6",
    ratio: "aspect-[3/2]",
  },
  {
    title: "Jim Thompson House",
    note: "A traditional Thai house and museum set in tropical gardens.",
    image: "https://images.unsplash.com/photo-1500109232983-ec562bebb685?auto=format&fit=crop&w=1000&q=70",
    span: "lg:col-span-6",
    ratio: "aspect-[3/2]",
  },
];

export default function VenuePage() {
  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title and the venue label left; the venue photo as the specimen right, switchable to the live map. */}
      <section aria-labelledby="venue-title" className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:p-12">
          <div className="flex flex-col">
            <h1 id="venue-title" className="herb-display text-[clamp(2.75rem,1.2rem+4.4vw,5.75rem)]">
              {city}.
            </h1>
            <p className="mt-6 text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] leading-snug tracking-[-0.01em]">
              <span className="block">{CONFERENCE.date}</span>
              <span className="block">{venueName}</span>
            </p>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed">
              The {CONFERENCE.shortForm} meets at {venueName} on Sukhumvit Soi 13, and online. Here is how to get there, and
              what to see once you arrive.
            </p>
            <div className="mt-10 grid gap-2">
              <BangkokClock />
              <dl className="grid gap-2 sm:grid-cols-2">
                {[
                  ["Address", address],
                  ["Hours", "9:00 to 18:00 each day; the registration desk opens at 8:00"],
                ].map(([term, value]) => (
                  <div key={term} className="bg-[var(--mount)] px-5 py-4">
                    <dt className="herb-italic text-[14px] text-[var(--ink-2)]">{term}</dt>
                    <dd className="mt-1 text-[16px] leading-snug">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:pt-10">
              <ActionLink href="/registration" primary>
                Register to attend
              </ActionLink>
              <ActionLink href={mapsUrl} external>
                Open in Google Maps
              </ActionLink>
            </div>
          </div>

          <VenueSpecimen venueName={venueName} mapSrc={MAP_SRC} />
        </div>
      </section>

      {/* Getting there: the field turns green, with the city footage beside the routes */}
      <section aria-labelledby="travel-title" className="px-4 pt-28 sm:px-6 lg:px-10 lg:pt-40">
        <Reveal className="mx-auto max-w-[1400px] bg-[var(--green)] p-5 text-white sm:p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div data-enter>
              <h2 id="travel-title" className="herb-display text-[clamp(2.6rem,1.4rem+3.6vw,5rem)]">
                Getting there.
              </h2>
              <p className="mt-6 max-w-[30rem] text-[18px] text-white/85">
                {venueName} is on Sukhumvit Soi 13, near the Nana Skytrain station. Two airports serve the city.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
                {[
                  ["30–45", "minutes from Suvarnabhumi"],
                  ["30–50", "minutes from Don Mueang"],
                ].map(([figure, label]) => (
                  <div key={label} className="flex flex-col-reverse justify-end">
                    <dt className="herb-italic mt-2 text-[17px] text-white/85">{label}</dt>
                    <dd className="herb-display text-[clamp(3rem,1.8rem+3.6vw,5.5rem)]">{figure}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div data-enter style={{ "--i": 1 }}>
              <CityFootage />
            </div>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-3">
            {TRAVEL.map(([heading, items], index) => (
              <div key={heading} data-enter style={{ "--i": 2 + index }}>
                <h3 className="text-[24px] leading-tight tracking-[-0.01em]">{heading}</h3>
                <dl className="mt-6 grid gap-6">
                  {items.map(([term, value]) => (
                    <div key={term} className="border-l-[3px] border-white/40 pl-5">
                      <dt className="text-[18px] leading-snug">{term}</dt>
                      <dd className="mt-1 text-[16px] text-white/80">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Explore the city */}
      <section aria-labelledby="sights-title" className="px-4 pt-28 sm:px-6 lg:px-10 lg:pt-40">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 id="sights-title" className="herb-h2 max-w-[14ch]">
              Stay a day longer.
            </h2>
            <p className="max-w-[34rem] text-[17px] lg:justify-self-end">A few of the places worth your time in {city}, between sessions or after them.</p>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 lg:grid-cols-12">
            {SIGHTS.map((sight) => (
              <figure key={sight.title} className={`flex flex-col ${sight.span}`}>
                <div className={`herb-mount herb-photo relative ${sight.ratio}`}>
                  <Image src={sight.image} alt={sight.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-3">
                  <span className="block text-[20px] leading-snug">{sight.title}</span>
                  <span className="herb-muted mt-1 block text-[16px]">{sight.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section aria-labelledby="venue-closing-title" className="px-4 pt-28 pb-16 sm:px-6 lg:px-10 lg:pt-40 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="venue-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              See you in {CONFERENCE.venue.city || city.split(",")[0]}.
            </h2>
            <p className="mt-6 max-w-[34rem] text-[17px]">
              {CONFERENCE.date}. Questions about travel or the venue? Write to{" "}
              <a href="mailto:info@icsift.com" className="herb-link">
                info@icsift.com
              </a>
              .
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/submission" primary>
              Submit a paper
            </ActionLink>
            <ActionLink href="/registration">Register to attend</ActionLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
