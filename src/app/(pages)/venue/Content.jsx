import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink, AccessionLabel } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";
import VenueSpecimen from "./VenueSpecimen";

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
      <section aria-labelledby="venue-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:p-12">
          <div className="flex flex-col">
            <h1 id="venue-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              {city}.
            </h1>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
              The {CONFERENCE.shortForm} meets at {venueName} on Sukhumvit Soi 13, and online. Here is how to get there, and
              what to see once you arrive.
            </p>
            <AccessionLabel
              className="mt-10"
              title="Venue"
              rows={[
                ["Dates", CONFERENCE.date],
                ["Venue", venueName],
                ["Address", address],
                ["City", city],
                ["Format", `In person in ${city}, or online`],
              ]}
            />
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

      {/* Getting there */}
      <section aria-labelledby="travel-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <h2 id="travel-title" className="herb-h2 max-w-[16ch]">
            Getting there, and around.
          </h2>
          <div className="mt-10 grid gap-px border-t border-[var(--ink)] bg-[var(--rule)] lg:grid-cols-3">
            {TRAVEL.map(([heading, items]) => (
              <div key={heading} className="bg-[var(--sheet)] py-6 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">{heading}</h3>
                <dl className="mt-4">
                  {items.map(([term, value]) => (
                    <div key={term} className="border-b border-[var(--rule)] py-3.5 last:border-b-0">
                      <dt className="text-[17px]">{term}</dt>
                      <dd className="herb-muted mt-1 text-[15.5px]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Explore the city */}
      <section aria-labelledby="sights-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 id="sights-title" className="herb-h2 max-w-[14ch]">
              Stay a day longer.
            </h2>
            <p className="herb-muted max-w-[34rem] lg:justify-self-end">A few of the places worth your time in {city}, between sessions or after them.</p>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 lg:grid-cols-12">
            {SIGHTS.map((sight) => (
              <figure key={sight.title} className={`flex flex-col ${sight.span}`}>
                <div className={`herb-mount herb-photo relative ${sight.ratio}`}>
                  <Image src={sight.image} alt={sight.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-3">
                  <span className="block text-[17px]">{sight.title}</span>
                  <span className="herb-italic mt-0.5 block text-[14.5px] text-[var(--ink-2)]">{sight.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section aria-labelledby="venue-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="venue-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              See you in {CONFERENCE.venue.city || city.split(",")[0]}.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
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
