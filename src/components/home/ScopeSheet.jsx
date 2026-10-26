import Image from "next/image";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
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
      <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 id="scope-title" className="herb-h2 max-w-[16ch]">
              Where technology meets environmental stewardship.
            </h2>
            <p className="mt-8 max-w-[38rem] text-[18px] leading-relaxed">
              ICSIFT brings researchers, academics, industry professionals and policymakers into one room to test ideas that make
              development last. This edition&rsquo;s theme,{" "}
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
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">
              Co-organisers of the {CONFERENCE.edition} edition
            </h3>
            <Link href="/about-co-organizers" className="herb-link text-[15.5px]">
              Become a co-organiser
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CONFERENCE.coOrganizers.map((org) => (
              <li key={org.name} className="flex flex-col border border-[var(--rule)] p-4">
                <div className="flex h-24 items-center justify-center">
                  <Image
                    src={org.logo}
                    alt={org.name}
                    width={240}
                    height={120}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <p className="mt-4 text-[15px] leading-snug">{org.name}</p>
                {org.place ? <p className="herb-italic mt-1 text-[14px] text-[var(--ink-2)]">{org.place}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
