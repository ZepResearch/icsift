import Image from "next/image";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";

// Cream band straight under the hero: who runs the conference. The heading left, the organiser, every co-organiser
// from the constants and the media partner as white tiles right.
export default function Partners() {
  const tiles = [
    { logo: "/assets/zepresearch.png", name: "Zep Research", role: "Organiser" },
    ...(CONFERENCE.coOrganizers ?? []).map((org) => ({ logo: org.logo, name: org.name, role: "Co-organiser" })),
    // { logo: "/assets/cl.jpeg", name: "Conference Locate", role: "Media partner", href: "https://www.clocate.com/" },
  ];

  return (
    <section aria-labelledby="partners-title" className="sig-on-cream bg-[var(--cream)] text-[var(--bark)]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,2fr)] lg:items-center lg:gap-12 lg:px-10 lg:py-16">
        <div>
          <h2 id="partners-title" className="sig-display text-[clamp(2rem,1.5rem+1.6vw,3rem)]">
            Organised with
          </h2>
          <Link href="/about-co-organizers" className="sig-link mt-3 inline-block text-[16px] font-semibold">
            Co-host the next edition
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {tiles.map((tile) => {
            const inner = (
              <>
                <Image src={tile.logo} alt="" width={160} height={60} className="h-12 w-auto self-start object-contain" />
                <span className="text-[15.5px] leading-snug">
                  <span className="block font-semibold">{tile.name}</span>
                  <span className="text-[var(--bark-2)]">{tile.role}</span>
                </span>
              </>
            );
            return (
              <li key={tile.name} className="flex">
                {tile.href ? (
                  <Link
                    href={tile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full flex-col justify-between gap-5 bg-white p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="flex w-full flex-col justify-between gap-5 bg-white p-5">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
