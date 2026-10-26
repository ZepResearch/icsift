import Image from "next/image";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import Reveal from "./Reveal";

const LEAD = {
  quote:
    "ICSIFT provided an exceptional platform for sharing our research on sustainable urban development. The connections we made have led to three international collaborations.",
  name: "Dr. Sarah Chen",
  role: "Urban Planning Researcher",
};

const MORE = [
  {
    quote:
      "As a first-time attendee, I was pleasantly surprised by the conference's organization and depth of content. The sustainable practices implemented throughout the event truly practiced what was preached.",
    name: "Emma Watkins",
    role: "Climate Policy Advisor",
  },
  {
    quote:
      "Partnering with ICSIFT demonstrated our commitment to sustainability, helping us build trust and loyalty with our eco-conscious stakeholders and opening doors to green innovation.",
    name: "Michael Rodriguez",
    role: "Sustainability Director",
  },
  {
    quote:
      "By participating in ICSIFT, we were able to contribute to a greener future and demonstrate our environmental responsibility while gaining valuable insights from global sustainability leaders.",
    name: "Dr. Thomas Mann",
    role: "Environmental Engineer",
  },
];

export default function VoicesSheet() {
  return (
    <section aria-labelledby="voices-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
        <h2 id="voices-title" className="sr-only">
          What participants said
        </h2>
        <figure className="max-w-[60rem]">
          <blockquote className="herb-italic text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)] leading-[1.22] tracking-[-0.01em] text-balance">
            &ldquo;{LEAD.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-[16px]">
            {LEAD.name} <span className="herb-muted">· {LEAD.role}</span>
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-10 border-t border-[var(--rule)] pt-10 md:grid-cols-3">
          {MORE.map((item) => (
            <figure key={item.name}>
              <blockquote className="text-[16px] leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="herb-italic mt-4 text-[14.5px] text-[var(--ink-2)]">
                {item.name}, {item.role}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Three fixed cells. Every co-organiser logo shares the middle cell, so adding partners never adds a column. */}
        <div className="herb-rule mt-16 grid gap-8 pt-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-12">
          <div className="flex items-center gap-5">
            <Image src="/assets/zepresearch.png" alt="Zep Research" width={160} height={60} className="h-12 w-auto object-contain" />
            <p className="herb-italic text-[14.5px] text-[var(--ink-2)]">Organiser</p>
          </div>
          {CONFERENCE.coOrganizers?.length ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:border-x md:border-[var(--rule)] md:px-12">
              <ul className="flex flex-wrap items-center gap-4">
                {CONFERENCE.coOrganizers.map((org) => (
                  <li key={org.name}>
                    <Image src={org.logo} alt={org.name} title={org.name} width={120} height={60} className="h-12 w-auto object-contain" />
                  </li>
                ))}
              </ul>
              <p className="herb-italic text-[14.5px] text-[var(--ink-2)]">
                {CONFERENCE.coOrganizers.length > 1 ? "Organising partners" : "Organising partner"}
              </p>
            </div>
          ) : null}
          <div className="flex items-center gap-5">
            <Link href="https://www.clocate.com/" target="_blank" rel="noopener noreferrer" aria-label="Conference Locate (opens in a new tab)">
              <Image src="/assets/cl.jpeg" alt="Conference Locate" width={160} height={60} className="h-12 w-auto object-contain" />
            </Link>
            <p className="herb-italic text-[14.5px] text-[var(--ink-2)]">Media partner</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
