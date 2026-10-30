import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { CONFERENCE } from "@/constants/conference"

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

// Signal footer: forest-deep ground. The conference name and facts with the two actions left, the link columns right,
// policies beneath, and the name returning at full width in signal yellow.
export default function ConferenceFooter() {
  return (
    <footer className="sig-footer overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 pt-20 sm:px-6 lg:px-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <Link href="/" className="inline-flex items-center gap-4" aria-label="ICSIFT home">
              <Image src="/singleLogo.svg" alt="" width={64} height={64} className="h-16 w-16 object-contain" />
              <span className="flex flex-col leading-none">
                <span className="sig-display text-[34px] text-[var(--signal)]">ICSIFT</span>
                <span className="mt-1.5 text-[14px] text-[var(--cream)]/75">
                  {CONFERENCE.shortForm} · {CONFERENCE.venue.location.split(",")[0].trim()} {CONFERENCE.year}
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-[26rem] text-[clamp(1.4rem,1.2rem+0.6vw,1.75rem)] leading-tight font-semibold text-[var(--signal)]">
              {CONFERENCE.name.trim()}
            </p>
            <dl className="mt-8 grid gap-4 text-[16px]">
              {[
                ["Dates", CONFERENCE.date],
                ["Where", `${CONFERENCE.venue.location.trim()}, in person and online`],
                ["Organised by", "Zep Research"],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="text-[14px] text-[var(--cream)]/65">{term}</dt>
                  <dd className="mt-0.5 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/submission" className="sig-btn" data-fill="">
                <span>Submit a paper</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              <Link href="/registration" className="sig-btn" data-outline="">
                <span>Register</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="sig-display text-[22px] text-[var(--signal)]">{column.title}</h2>
                <ul className="mt-5 space-y-3 text-[16px]">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="sig-footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="sig-display text-[22px] text-[var(--signal)]">Write to us</h2>
              <ul className="mt-5 space-y-3 text-[16px]">
                <li>
                  <a href="mailto:info@icsift.com" className="sig-footer-link">
                    info@icsift.com
                  </a>
                </li>
                <li>
                  <a href="tel:+918260080050" className="sig-footer-link">
                    +91 82600 80050
                  </a>
                </li>
              </ul>
              <h2 className="sig-display mt-10 text-[22px] text-[var(--signal)]">Follow</h2>
              <ul className="mt-5 space-y-3 text-[16px]">
                {SOCIAL.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="sig-footer-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-4 bg-[var(--forest)] px-5 py-5 sm:px-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px]">
            {POLICIES.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="sig-footer-link !text-[var(--cream)]/80 hover:!text-[var(--signal)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[14.5px] text-[var(--cream)]/70">
            © {new Date().getFullYear()} ICSIFT, organised by Zep Research. All rights reserved.
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="sig-display mt-10 -mb-[0.12em] px-2 text-center text-[clamp(6rem,30vw,28rem)] leading-[0.8] text-[var(--signal)] select-none"
      >
        ICSIFT
      </p>
    </footer>
  )
}
