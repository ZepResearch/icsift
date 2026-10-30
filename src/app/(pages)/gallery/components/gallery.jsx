import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { CallBand, Field, PageHero } from "@/components/signal/page";
import PhotoArchive from "./photo-archive";
import VideoSection from "./video-section";

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

// Photos per edition, in display order. The first five form each edition's mosaic, so lead with the strongest.
const EDITIONS = [
  {
    id: "third",
    name: "3rd ICSIFT",
    locality: "Philippines · 2026",
    summary: "Engaging sessions, networking and the connections made at the third edition.",
    photos: [
      "/gallery/3rd-icsift (13).jpg",
      "/gallery/3rd-icsift  (59).jpeg",
      "/gallery/3rd-icsift  (34).jpeg",
      // "/gallery/3rd-icsift (14).jpg",
      "/gallery/3rd-icsift  (58).jpeg",
      ...range(1, 24)
        .filter((n) => ![13, 14, 15].includes(n))
        .map((n) => `/gallery/3rd-icsift (${n}).jpg`),
      ...[31, ...range(33, 46), ...range(49, 60)]
        .filter((n) => ![34, 58, 59].includes(n))
        .map((n) => `/gallery/3rd-icsift  (${n}).jpeg`),
    ],
  },
  {
    id: "second",
    name: "2nd ICSIFT",
    locality: "Bangkok, Thailand · 2025",
    summary: "Distinguished speakers and new research presented at the second edition in Bangkok.",
    photos: [5, 3, 7, 2, 4, 1, 6, 8].map((n) => `/gallery/2nd-ICSIFT_0${n}.jpg`),
  },
  {
    id: "first",
    name: "1st ICSIFT",
    locality: "Philippines",
    summary: "The inaugural edition, where the conference's research and collaboration began.",
    photos: ["09", "02", "04", "05", "06", "08", "10", "11", "12"].map((n) => `/gallery/ICSIFT_${n}.jpg`),
  },
];

const VIDEOS = [
  { id: "r1GcUCVStsc", poster: "/gallery/2nd-ICSIFT_07.jpg", title: "The 2nd ICSIFT, concluded in Bangkok, 2025" },
  { id: "DTUzRphTBWA", poster: "/preview.jpg", title: "Highlights from the 1st ICSIFT, Philippines" },
];

export default function Gallery() {
  const total = EDITIONS.reduce((sum, edition) => sum + edition.photos.length, 0);
  const ledger = [
    ...EDITIONS.map((edition) => [edition.id, edition.name, edition.locality, edition.photos.length, "photos"]),
    ["films", "Films", "1st and 2nd editions", VIDEOS.length, "films"],
  ];

  return (
    <main className="sig min-h-screen">
      {/* Hero: title and count left; each edition as a jump panel with its photo count set large right. */}
      <PageHero
        id="gallery-title"
        tag="Gallery"
        title="Three editions, in pictures"
        lead={`${total} photographs and two films from the rooms where ICSIFT happened. Select any photo to see it full size.`}
        aside={
          <nav aria-label="Editions in the gallery">
            <ul className="grid gap-2">
              {ledger.map(([id, name, locality, count, unit]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 bg-[var(--panel)] px-5 py-4 transition-colors duration-200 hover:bg-[var(--signal)] hover:text-[var(--forest)]"
                  >
                    <span>
                      <span className="sig-display block text-[clamp(1.5rem,1.2rem+0.8vw,2rem)] leading-none">{name}</span>
                      <span className="mt-1.5 block text-[15.5px] opacity-80">{locality}</span>
                    </span>
                    <span className="text-right">
                      <span className="sig-display block text-[clamp(2rem,1.6rem+1.2vw,2.8rem)] leading-none">{count}</span>
                      <span className="block text-[14px] opacity-80">{unit}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {EDITIONS.map((edition, index) => (
        <Field key={edition.id} tone={index % 2 ? "forest" : "cream"} id={edition.id} labelledBy={`${edition.id}-title`}>
          <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div data-enter>
              <h2 id={`${edition.id}-title`} className="sig-h2">
                {edition.name}
              </h2>
              <p className="mt-3 text-[17px] font-semibold">
                {edition.locality} · {edition.photos.length} photos
              </p>
            </div>
            <p data-enter style={{ "--i": 1 }} className="max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug text-[var(--muted)]">
              {edition.summary}
            </p>
          </div>
          <div data-enter style={{ "--i": 2 }}>
            <PhotoArchive photos={edition.photos} edition={edition.name} eager={index === 0} />
          </div>
        </Field>
      ))}

      <Field tone="cream" id="films" labelledBy="films-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="films-title" data-enter className="sig-h2">
            The films
          </h2>
          <Link href="/previous-conference-report" data-enter style={{ "--i": 1 }} className="sig-link text-[17px] font-semibold">
            Previous conference report
          </Link>
        </div>
        <div data-enter style={{ "--i": 2 }}>
          <VideoSection videos={VIDEOS} />
        </div>
      </Field>

      <CallBand
        title="Be in the next set of photographs"
        text={`${CONFERENCE.shortForm}, ${CONFERENCE.date}, ${CONFERENCE.venue.location.trim()} and online.`}
      />
    </main>
  );
}
