import Link from "next/link";
import { WarpBackground } from "@/components/ui/warp-background";
import { CONFERENCE } from "@/constants/conference";
import CoOrganizerCards from "./CoOrganizerCards";
import Reveal from "./Reveal";

const AUDIENCE = [
  ["Researchers and academics", "Present peer-reviewed work and find collaborators across disciplines."],
  ["PhD scholars and students", "Test your research in front of an international room, at a student rate."],
  ["Industry professionals", "Bring field problems to the people building the next answers."],
  ["Policymakers and public bodies", "Take evidence straight from the research into planning."],
  ["Entrepreneurs and NGOs", "Meet partners for pilots, funding and green ventures."],
];

export default function ScopeSheet() {
  return (
    <section aria-labelledby="scope-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <WarpBackground
        className="mx-auto max-w-[1400px] rounded-none border-[var(--rule)] p-3 sm:p-10 lg:p-16"
        gridColor="var(--rule)"
        perspective={120}
        beamsPerSide={4}
        beamDuration={5}
        beamDelayMax={5}
        hueRange={[135, 170]}
        beamSaturation={55}
        beamLightness={42}
      >
        <Reveal className="herb-sheet p-5 sm:p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2 id="scope-title" className="herb-h2 max-w-[16ch]">
                Where technology meets environmental stewardship.
              </h2>
              <p className="mt-8 max-w-[38rem] text-[18px] leading-relaxed">
                ICSIFT brings researchers, academics, industry professionals and policymakers into one room to test
                ideas that make development last. This edition&rsquo;s theme,{" "}
                <span className="herb-italic">
                  Sustainable Innovation: Bridging Technology and Environmental Stewardship
                </span>
                , asks how new technology can repair, not just extract.
              </p>
              <p className="herb-muted mt-5 max-w-[38rem]">
                Papers are presented in person in {CONFERENCE.venue.location} or online, reviewed by the committee, and
                recommended to indexed journals and proceedings.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15.5px]">
                <Link href="/about-conference" className="herb-link">
                  About the conference
                </Link>
                <Link href="/theme-and-topics" className="herb-link">
                  Theme and topics
                </Link>
                <Link href="/committee" className="herb-link">
                  Committee
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Who should attend</h3>
              <ul className="mt-4 border-t border-[var(--ink)]">
                {AUDIENCE.map(([who, why]) => (
                  <li key={who} className="border-b border-[var(--rule)] py-4">
                    <p className="text-[17px]">{who}</p>
                    <p className="herb-muted mt-1 text-[15px]">{why}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="herb-rule mt-14 pt-8">
            <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">
              Co-organisers of the {CONFERENCE.edition} edition
            </h3>
            <CoOrganizerCards organizers={CONFERENCE.coOrganizers} />
          </div>
        </Reveal>
      </WarpBackground>
    </section>
  );
}
