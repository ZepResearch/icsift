import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink, AccessionLabel } from "./primitives";
import HeroMetal from "./HeroMetal";

// "21–22 February 2027", from the schedule in the constants.
function conferenceDates() {
  const { month, year, days } = CONFERENCE.scheduleDates;
  const name = new Date(year, month, 1).toLocaleString("en-GB", {
    month: "long",
  });
  return { range: `${days[0]}–${days[days.length - 1]}`, month: name, year };
}

export default function HeroSheet() {
  const city = CONFERENCE.venue.location.trim().split(",")[0];
  const when = conferenceDates();

  return (
    <section
      aria-labelledby="hero-title"
      className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8"
    >
      <div className="herb-sheet herb-settle relative mx-auto max-w-[1400px] overflow-hidden p-5 sm:p-8 lg:p-10">
        <div className="relative">
          <HeroMetal className="hero-metal-mask -inset-x-5 -top-5 -bottom-10 sm:-inset-x-8 sm:-top-8 lg:-inset-x-10 lg:-top-10 lg:-bottom-14 opacity-80" />
          {/* Metal ribbons drift behind the title row, bled out to the sheet's top and side edges. */}

          {/* The title row: the edition and city set large on the left, the dates as a second display figure on the right. */}
          <div className="relative z-[1] grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <h1
                id="hero-title"
                className="herb-display max-w-[200ch] text-[clamp(2rem,1.2rem+3.4vw,4.25rem)]"
              >
                {CONFERENCE.name.trim()}
              </h1>
              <p className="mt-6 max-w-[36rem] text-[18px] leading-relaxed bg-tranparent backdrop-blur-sm rounded-2xl p-1">
                The {CONFERENCE.shortForm} in {city} brings together two days of research presentations, keynote speeches, and collaborative sessions, available both in person and online, with opportunities for publication in indexed journals.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:items-end lg:text-right">
              <p className="herb-display text-[clamp(2.4rem,1rem+3.6vw,4.5rem)]">
                <span className="block tabular-nums">{when.range}</span>
                <span className="block">
                  {when.month} {when.year}
                </span>
              </p>
              <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[26rem]">
                <ActionLink href="/submission" primary>
                  Submit a paper
                </ActionLink>
                <ActionLink href="/registration">Register to attend</ActionLink>
              </div>
            </div>
          </div>
        </div>

        {/* The specimen: one wide photograph across the sheet, its accession label mounted over the lower-right corner. */}
        <div className="relative z-[1] mt-10 lg:mt-14 lg:mb-10">
          <figure className="herb-mount herb-photo herb-photo-settle relative m-0 aspect-[4/5] sm:aspect-[3/2] lg:aspect-[21/9]">
            <Image
              src="/tl1.jpg"
              alt="Delegates of the 3rd ICSIFT gathered outside the venue"
              fill
              priority
              sizes="(min-width: 1440px) 1320px, 100vw"
              className="object-cover object-[50%_60%]"
            />
            <figcaption className="herb-italic absolute bottom-0 left-0 z-[1] bg-white px-3 py-1.5 text-[13px] text-[var(--ink-2)]">
              Delegates of the 3rd ICSIFT, Philippines, 2026
            </figcaption>
          </figure>

          <AccessionLabel
            className="mt-6 lg:absolute lg:-bottom-10 lg:right-8 lg:z-[3] lg:mt-0 lg:w-[23rem]"
            title="Accession label"
            rows={[
              ["Edition", `${CONFERENCE.shortForm}, the fourth since 2024`],
              [
                "Locality",
                `${CONFERENCE.venue.name.trim()}, ${CONFERENCE.venue.location.trim()}, and online`,
              ],
              [
                "Indexed in",
                "Scopus and Clarivate (Web of Science) journals and proceedings",
              ],
              [
                "Organised by",
                `Zep Research`,
              ],
            ]}
          />
        </div>
      </div>
    </section>
  );
}
