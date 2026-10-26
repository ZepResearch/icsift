import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink, AccessionLabel } from "./primitives";

export default function HeroSheet() {
  return (
    <section aria-labelledby="hero-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
      <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14 lg:p-10">
        <div className="herb-mount herb-photo herb-photo-settle relative aspect-[4/5] max-h-[78vh] w-full sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[560px]">
          <Image
            src="/gallery/3rd-icsift (13).jpg"
            alt="A presenter speaking at the lectern during the 3rd ICSIFT"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-[50%_25%]"
          />
          <p className="herb-italic absolute bottom-0 left-0 z-[1] bg-white px-3 py-1.5 text-[13px] text-[var(--ink-2)]">
            Presenter at the lectern, 3rd ICSIFT
          </p>
        </div>

        <div className="flex flex-col">
          
          <h1 id="hero-title" className="herb-display mt-8 text-[clamp(2.5rem,1.4rem+2.7vw,3rem)] lg:mt-10">
           {CONFERENCE.name}
          </h1>
          <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
            The {CONFERENCE.shortForm}: two days of papers, keynotes and working sessions on sustainability, innovation and
            future technologies. Join us in the room or online, and leave with a route to indexed publication.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <ActionLink href="/submission" primary>
              Submit a paper
            </ActionLink>
            <ActionLink href="/registration">Register to attend</ActionLink>
          </div>

          <AccessionLabel
            className="mt-10"
            title="Accession label"
            rows={[
              ["Dates", CONFERENCE.date],
              ["Locality", `${CONFERENCE.venue.location} · in person and online`],
              ["Indexed in", "Scopus and Clarivate (Web of Science) journals and proceedings"],
              ["Organised by", `Zep Research, with ${CONFERENCE.coOrganizers.map((org) => org.name).join(", ")}`],
            ]}
          />
        </div>
      </div>
    </section>
  );
}
