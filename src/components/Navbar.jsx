"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { CONFERENCE } from "@/constants/conference"

const NAV = [
  {
    title: "About",
    dropdown: [
      { href: "/about-conference", title: "About the conference" },
      { href: "/about-organizers", title: "About the organisers" },
      { href: "/about-co-organizers", title: "About the co-organisers" },
    ],
  },
  {
    title: "Programme",
    dropdown: [
      { href: "/theme-and-topics", title: "Themes and topics" },
      { href: "/papers-format", title: "Paper format" },
      { href: "/mode-of-presentation", title: "Mode of presentation" },
      { href: "/schedule", title: "Schedule" },
      { href: "/awards", title: "Awards" },
      { href: "/gallery", title: "Gallery" },
    ],
  },
  { title: "Submission", href: "/submission" },
      { href: "/committee", title: "Committee" },

  { title: "Venue", href: "/venue" },
  {
    title: "Publications",
    dropdown: [
      { href: "/journals", title: "Journals" },
      { href: "/proceedings", title: "Proceedings" },
    ],
  },
  { title: "Sponsor", href: "/exhibit-and-sponsor" },
  { title: "Contact", href: "/contact" },
]

function Dropdown({ item, isActive, active }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onDown = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false)
        ref.current?.querySelector("button")?.focus()
      }
    }
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="sig-nav-link flex items-center gap-1"
        data-active={active || undefined}
      >
        {item.title}
        <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={1.6} />
      </button>
      {open ? (
        <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
          <ul className="sig-nav-menu min-w-[16rem] bg-[var(--forest-deep)] py-2">
            {item.dropdown.map((entry) => (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  aria-current={isActive(entry.href) ? "page" : undefined}
                  className="block px-5 py-2.5 text-[15.5px] font-medium text-[var(--cream)] transition-colors hover:bg-[var(--forest)] hover:text-[var(--signal)] aria-[current=page]:text-[var(--signal)]"
                >
                  {entry.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default function ConferenceNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [menuTop, setMenuTop] = useState(0)
  const headerRef = useRef(null)
  const { user, logout, openAuthModal } = useAuth()
  const pathname = usePathname()

  // The server always renders the logged-out state; `isAuthed` flips only after
  // mount so the first client paint matches the server paint.
  const isAuthed = mounted && !!user
  const displayName = isAuthed ? user.name || user.username || user.email : ""

  useEffect(() => setMounted(true), [])
  useEffect(() => setIsMobileMenuOpen(false), [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0)
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    if (!isMobileMenuOpen) setOpenSection(null)
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const isActive = (href) => pathname === href
  const isParentActive = (item) => (item.href ? isActive(item.href) : item.dropdown.some((entry) => isActive(entry.href)))

  return (
    <header ref={headerRef} className="sig-nav w-full">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="ICSIFT home">
          <span className="relative h-10 w-10">
            <Image src="/singleLogo.svg" alt="" fill sizes="40px" className="object-contain" priority />
          </span>
          <span className="flex flex-col leading-none">
            <span className="sig-display text-[26px] leading-none text-[var(--signal)]">ICSIFT</span>
            <span className="mt-1 text-[12.5px] font-medium text-[var(--cream)]/80">
              {CONFERENCE.shortForm.replace("ICSIFT", "edition").trim()} · {CONFERENCE.venue.location.split(",")[0].trim()} {CONFERENCE.year}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {NAV.map((item) =>
            item.dropdown ? (
              <Dropdown key={item.title} item={item} isActive={isActive} active={isParentActive(item)} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="sig-nav-link"
                data-active={isActive(item.href) || undefined}
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 xl:flex">
          {isAuthed ? (
            <div className="flex items-center gap-4 text-[14.5px]">
              <span className="max-w-[12rem] truncate text-[var(--cream)]/80">{displayName}</span>
              <button type="button" onClick={() => logout()} className="sig-nav-link">
                Log out
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => openAuthModal()} className="sig-nav-link">
              Log in
            </button>
          )}
          <Link href="/registration" className="sig-btn !min-h-[46px] !text-[18px]" data-fill="">
            <span>Register now</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center bg-[var(--signal)] text-[var(--forest)] xl:hidden"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" strokeWidth={1.6} /> : <Menu className="h-5 w-5" strokeWidth={1.6} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div id="mobile-menu" className="sig-mobile-menu fixed inset-x-0 bottom-0 z-50 overflow-y-auto xl:hidden"
          style={{ top: menuTop }}>
          <nav aria-label="Main" className="mx-auto max-w-[1400px] px-4 pt-4 pb-10 sm:px-6">
            <ul>
              {NAV.map((item, index) => {
                if (!item.dropdown) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="sig-display block py-3 text-[32px] leading-none aria-[current=page]:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                }
                const open = openSection === index
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenSection(open ? null : index)}
                      className={`sig-display flex w-full items-center justify-between py-3 text-[32px] leading-none ${isParentActive(item) ? "text-white" : ""}`}
                    >
                      {item.title}
                      <ChevronDown aria-hidden="true" className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={1.4} />
                    </button>
                    {open ? (
                      <ul className="pb-4">
                        {item.dropdown.map((entry) => (
                          <li key={entry.href}>
                            <Link
                              href={entry.href}
                              aria-current={isActive(entry.href) ? "page" : undefined}
                              className="block py-2 pl-4 text-[17px] font-medium text-[var(--cream)] aria-[current=page]:text-[var(--signal)]"
                            >
                              {entry.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 grid gap-3">
              <Link href="/registration" className="sig-btn" data-fill="">
                <span>Register now</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              <Link href="/submission" className="sig-btn" data-outline="">
                <span>Submit a paper</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              {isAuthed ? (
                <div className="flex items-center justify-between pt-4 text-[15.5px]">
                  <span className="truncate text-[var(--cream)]/80">Signed in as {displayName}</span>
                  <button type="button" onClick={() => logout()} className="sig-link">
                    Log out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal()
                    setIsMobileMenuOpen(false)
                  }}
                  className="sig-link pt-4 text-left text-[16px] font-semibold"
                >
                  Log in to your account
                </button>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
