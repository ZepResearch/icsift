import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "./primitives";
import Reveal from "./Reveal";

export default function ClosingSheet() {
  return (
    <section aria-labelledby="closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
      <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
        <div>
          <h2 id="closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
            File your work with the {CONFERENCE.edition} edition.
          </h2>
          <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
            {CONFERENCE.date}, {CONFERENCE.venue.location} and online. Submit a paper to present it, or register to
            attend.
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
  );
}
