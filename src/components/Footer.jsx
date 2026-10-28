import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CONFERENCE } from "@/constants/conference"
import { GlassTiles } from "@/components/ui/glass-tiles"
import Image from "next/image"

const COLUMNS = [
  {
    title: "Conference",
    links: [
      { href: "/about-conference", label: "About the conference" },
      { href: "/about-organizers", label: "About the organisers" },
      { href: "/about-co-organizers", label: "About the co-organisers" },
      { href: "/committee", label: "Committee" },
      { href: "/venue", label: "Venue" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Programme",
    links: [
      { href: "/theme-and-topics", label: "Themes and topics" },
      { href: "/papers-format", label: "Paper format" },
      { href: "/mode-of-presentation", label: "Mode of presentation" },
      { href: "/schedule", label: "Schedule" },
      { href: "/awards", label: "Awards" },
      { href: "/journals", label: "Journals" },
      { href: "/proceedings", label: "Proceedings" },
    ],
  },
  {
    title: "Take part",
    links: [
      { href: "/submission", label: "Submit a paper" },
      { href: "/registration", label: "Register" },
      { href: "/exhibit-and-sponsor", label: "Exhibit and sponsor" },
      { href: "/contact", label: "Contact" },
    ],
  },
]

const POLICIES = [
  { href: "/terms-and-conditions", label: "Terms and conditions" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/cancellation-policy", label: "Cancellation" },
  { href: "/complaints-policy", label: "Complaints" },
  { href: "/disability-discrimination-policy", label: "Disability discrimination" },
  { href: "/health-and-safety-policy", label: "Health and safety" },
  { href: "/equal-treatment-policy", label: "Equal treatment" },
]

const SOCIAL = [
  { href: "https://www.linkedin.com/company/zep-research/", label: "LinkedIn" },
  { href: "https://www.facebook.com/profile.php?id=61561809783777", label: "Facebook" },
  { href: "https://www.instagram.com/zepresearch/", label: "Instagram" },
  { href: "https://www.youtube.com/@Zepresearch", label: "YouTube" },
]

export default function ConferenceFooter() {
  return (
    <footer className="herb-footer overflow-hidden bg-[var(--ink)] text-[#e9ece6]">
      <GlassTiles columns={10}>
        {/* Scrim keeps the link columns legible; it thins toward the wordmark so the glass shows through. */}
        <div className="bg-[linear-gradient(to_bottom,rgb(15_26_20/0.9)_0%,rgb(15_26_20/0.82)_65%,rgb(15_26_20/0.25)_100%)]">
          <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 lg:pt-24 backdrop-blur-xs rounded-2xl lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-20">
              <div>
                 {/* <p className="herb-italic text-[14px] text-[#aab5ad]">ICSIFT·04 — Back sheet</p> */}
                {/* <Image src="/singleLogo.svg" alt="Zep Research logo" width={50} height={50} /> */}
                <p className="mt-3 max-w-[24rem] text-[1.75rem] leading-tight tracking-[-0.02em]">{CONFERENCE.name.trim()}</p>
                <dl className="mt-8 border-t border-[#3a463f] text-[15.5px]">
                  {[
                    ["Dates", CONFERENCE.date],
                    ["Locality", `${CONFERENCE.venue.location.trim()} · in person and online`],
                    ["Organised by", "Zep Research"],
                  ].map(([term, value]) => (
                    <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-[#3a463f] py-2.5">
                      <dt className="herb-italic text-[14px] text-[#aab5ad]">{term}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/submission"
                    className="herb-btn !border-[#e9ece6] !bg-[#e9ece6] !text-[var(--ink)] hover:!bg-white"
                  >
                    <span>Submit a paper</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                  </Link>
                  <Link href="/registration" className="herb-btn !border-[#e9ece6] !text-[#e9ece6] hover:!bg-[#e9ece6] hover:!text-[var(--ink)]">
                    <span>Register</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                  </Link>
                </div>
              </div>

              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {COLUMNS.map((column) => (
                  <nav key={column.title} aria-label={column.title}>
                    <h2 className="text-[12.5px] font-semibold tracking-[0.08em] text-[#aab5ad] uppercase">{column.title}</h2>
                    <ul className="mt-4 space-y-2.5 text-[15.5px]">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="herb-footer-link">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
                <div>
                  <h2 className="text-[12.5px] font-semibold tracking-[0.08em] text-[#aab5ad] uppercase">Write to us</h2>
                  <ul className="mt-4 space-y-2.5 text-[15.5px]">
                    <li>
                      <a href="mailto:info@icsift.com" className="herb-footer-link">
                        info@icsift.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:+918260684845" className="herb-footer-link">
                        +91 82600 80050
                      </a>
                    </li>
                  </ul>
                  <h2 className="mt-8 text-[12.5px] font-semibold tracking-[0.08em] text-[#aab5ad] uppercase">Follow</h2>
                  <ul className="mt-4 space-y-2.5 text-[15.5px]">
                    {SOCIAL.map((item) => (
                      <li key={item.href}>
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="herb-footer-link">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-[#3a463f] pt-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#aab5ad]">
                {POLICIES.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="herb-footer-link !text-[#aab5ad] hover:!text-[#e9ece6]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="herb-italic mt-4 text-[14px] text-[#aab5ad]">
                © {new Date().getFullYear()} ICSIFT, organised by Zep Research. All rights reserved.
              </p>
            </div>
          </div>

          <p
            aria-hidden="true"
            className="mt-10 -mb-[0.2em] backdrop-blur-xs text-center text-[clamp(5rem,22vw,20rem)] leading-[0.8] font-semibold tracking-[-0.05em] text-[#e9ece6]/40 select-none"
          >
            ICSIFT
          </p>
        </div>
      </GlassTiles>
    </footer>
  )
}
