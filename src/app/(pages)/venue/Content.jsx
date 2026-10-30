import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, BarList, CallBand, FactCells, Field, LEAD, PageHero, SPLIT, StickyIntro } from "@/components/signal/page";
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
    <main className="sig min-h-screen">
      {/* Hero: the city as the title with dates, venue and actions left; the live Bangkok clock and the facts right. */}
      <PageHero
        id="venue-title"
        tag="Venue"
        title={city}
        lead={`${CONFERENCE.date} at ${venueName}, Sukhumvit Soi 13, and online. Here is how to get there, and what to see once you arrive.`}
        actions={<ActionPair tone="forest" primary={["/registration", "Register"]} secondary={null} />}
        aside={
          <div className="grid gap-2">
            <BangkokClock />
            <FactCells
              size="text-[clamp(1.15rem,1rem+0.5vw,1.45rem)]"
              facts={[
                ["Address", address],
                ["Hours", "9:00 to 18:00 each day; registration opens at 8:00"],
              ]}
            />
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="sig-btn w-full" data-outline="">
              <span>Open in Google Maps</span>
              <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </a>
          </div>
        }
      />

      {/* The hotel: sticky text left; the photo, switchable to the live map, right. */}
      <Field tone="cream" labelledBy="hotel-title">
        <div className={SPLIT}>
          <StickyIntro tag="The hotel" id="hotel-title" title={venueName}>
            <p className={LEAD}>
              The {CONFERENCE.shortForm} meets at {venueName}, on Sukhumvit Soi 13 near the Nana Skytrain station.
            </p>
            <p className="mt-5 max-w-[34rem] text-[17px] text-[var(--muted)]">{address}</p>
          </StickyIntro>
          <div data-enter style={{ "--i": 2 }} className="flex flex-col">
            <VenueSpecimen venueName={venueName} mapSrc={MAP_SRC} />
          </div>
        </div>
      </Field>

      {/* Getting there: the airport times set huge with the city footage, then three columns of routes. */}
      <Field tone="forest" labelledBy="travel-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div data-enter>
            <p className="sig-tag">Travel</p>
            <h2 id="travel-title" className="sig-h2 mt-5">
              Getting there
            </h2>
            <p className={`${LEAD} text-[var(--muted)]`}>
              {venueName} is on Sukhumvit Soi 13, near the Nana Skytrain station. Two airports serve the city.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-2">
              {[
                ["30–45", "minutes from Suvarnabhumi"],
                ["30–50", "minutes from Don Mueang"],
              ].map(([figure, label]) => (
                <div key={label} className="flex flex-col-reverse justify-end bg-[var(--panel)] p-6">
                  <dt className="mt-2 text-[17px] text-[var(--muted)]">{label}</dt>
                  <dd className="sig-display text-[clamp(3rem,1.8rem+3.6vw,5.5rem)] leading-none">{figure}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-enter style={{ "--i": 1 }} className="flex flex-col">
            <CityFootage />
          </div>
        </div>

        <div className="mt-16 grid gap-2 lg:grid-cols-3">
          {TRAVEL.map(([heading, items], index) => (
            <div key={heading} data-enter style={{ "--i": 2 + index }} className="bg-[var(--panel)] p-6 sm:p-8">
              <h3 className="sig-display text-[clamp(1.7rem,1.3rem+1vw,2.3rem)]">{heading}</h3>
              <BarList items={items} className="mt-6 !gap-5" titleClass="text-[18px] font-semibold" />
            </div>
          ))}
        </div>
      </Field>

      {/* Explore the city */}
      <Field tone="cream" labelledBy="sights-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="sights-title" data-enter className="sig-h2">
            Stay a day longer
          </h2>
          <p data-enter style={{ "--i": 1 }} className="max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug text-[var(--muted)]">
            A few of the places worth your time in {city}, between sessions or after them.
          </p>
        </div>
        <div className="mt-12 grid gap-x-3 gap-y-10 lg:grid-cols-12">
          {SIGHTS.map((sight, index) => (
            <figure key={sight.title} data-enter style={{ "--i": 2 + (index % 3) }} className={`flex flex-col ${sight.span}`}>
              <div className={`herb-photo relative ${sight.ratio}`}>
                <Image src={sight.image} alt={sight.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-4">
                <span className="sig-display block text-[clamp(1.4rem,1.15rem+0.6vw,1.8rem)] leading-none">{sight.title}</span>
                <span className="mt-2 block text-[16.5px] text-[var(--muted)]">{sight.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Field>

      <CallBand
        title={`See you in ${city.split(",")[0]}`}
        text={
          <>
            {CONFERENCE.date}. Questions about travel or the venue? Write to{" "}
            <a href="mailto:info@icsift.com" className="sig-link">
              info@icsift.com
            </a>
            .
          </>
        }
      />
    </main>
  );
}
