import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";
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
      "/gallery/3rd-icsift (14).jpg",
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

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title and intro left, a ruled ledger of editions right. */}
      <section aria-labelledby="gallery-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16 lg:p-12">
          <div>
            <h1 id="gallery-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Three editions, in pictures.
            </h1>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
              {total} photographs and two films from the rooms where ICSIFT happened. Select any photo to see it full size.
            </p>
          </div>

          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Editions in the gallery</caption>
            <thead>
              <tr className="border-b border-[var(--ink)] text-[13px] font-semibold tracking-[0.08em] uppercase">
                <th scope="col" className="py-2 pr-4 font-semibold">Edition</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Locality</th>
                <th scope="col" className="py-2 text-right font-semibold">Photos</th>
              </tr>
            </thead>
            <tbody>
              {EDITIONS.map((edition) => (
                <tr key={edition.id} className="border-b border-[var(--rule)]">
                  <th scope="row" className="py-4 pr-4 text-[18px] font-normal">
                    <a href={`#${edition.id}`} className="herb-link">
                      {edition.name}
                    </a>
                  </th>
                  <td className="herb-italic py-4 pr-4 text-[15px] text-[var(--ink-2)]">{edition.locality}</td>
                  <td className="py-4 text-right text-[18px]">{edition.photos.length}</td>
                </tr>
              ))}
              <tr className="border-b border-[var(--rule)]">
                <th scope="row" className="py-4 pr-4 text-[18px] font-normal">
                  <a href="#films" className="herb-link">
                    Films
                  </a>
                </th>
                <td className="herb-italic py-4 pr-4 text-[15px] text-[var(--ink-2)]">1st and 2nd editions</td>
                <td className="py-4 text-right text-[18px]">{VIDEOS.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {EDITIONS.map((edition, index) => (
        <section
          key={edition.id}
          id={edition.id}
          aria-labelledby={`${edition.id}-title`}
          className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32"
        >
          <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
            <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <div>
                <h2 id={`${edition.id}-title`} className="herb-h2">
                  {edition.name}.
                </h2>
                <p className="herb-italic mt-2 text-[16px] text-[var(--ink-2)]">
                  {edition.locality} · {edition.photos.length} photos
                </p>
              </div>
              <p className="herb-muted max-w-[34rem] lg:justify-self-end">{edition.summary}</p>
            </div>
            <PhotoArchive photos={edition.photos} edition={edition.name} eager={index === 0} />
          </Reveal>
        </section>
      ))}

      <section id="films" aria-labelledby="films-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 id="films-title" className="herb-h2">
              The films.
            </h2>
            <Link href="/previous-conference-report" className="herb-link text-[15.5px]">
              Previous conference report
            </Link>
          </div>
          <VideoSection videos={VIDEOS} />
        </Reveal>
      </section>

      <section aria-labelledby="gallery-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="gallery-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Be in the next set of photographs.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              {CONFERENCE.shortForm}, {CONFERENCE.date}, {CONFERENCE.venue.location.trim()} and online.
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
