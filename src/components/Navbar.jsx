"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, LogIn, LogOut, User } from "lucide-react"
import { useAuth } from '@/context/AuthContext'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ConferenceNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mounted, setMounted] = useState(false)
  const { user, logout, openAuthModal } = useAuth()
  const pathname = usePathname()

  // Guards against hydration mismatch: `user` can be populated synchronously
  // on the client (e.g. from a persisted PocketBase auth store) before React
  // has hydrated, while the server always renders the logged-out state.
  // `isAuthed` stays false through the first client render, then flips once
  // mounted — so the first client paint matches the server paint exactly.
  const isAuthed = mounted && !!user

  const navLinks = [
    {
      title: "ABOUT",
      href: "#",
      dropdown: [
        { href: "/about-conference", title: "About Conference" },
        { href: "/about-organizers", title: "About Organizers" },
        { href: "/about-co-organizers", title: "About Co-Organizers" },
      ],
    },
    {
      title: "PROGRAM",
      href: "#",
      dropdown: [
        { href: "/theme-and-topics", title: "Themes and Topics" },
        { href: "/papers-format", title: "Paper Formats" },
        { href: "/mode-of-presentation", title: "Mode of Presentation" },
        { href: "/schedule", title: "Conference Schedule" },
        { title: "Gallery", href: "/gallery" },
        { title: "Awards", href: "/awards" },
      ],
    },
    { title: "COMMITTEE", href: "/committee" },
    { title: "SUBMISSION", href: "/submission" },
    { title: "VENUE", href: "/venue" },
    { title: "JOURNAL", href: "/journals" },
    { title: "CONTACT", href: "/contact" },
    { title: "EXHIBIT & SPONSOR", href: "/exhibit-and-sponsor" },
    { title: "PROCEEDINGS", href: "/proceedings" },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Flip mounted flag after first client render (see isAuthed above)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Close drawer on Escape, and reset open sub-menu whenever the drawer closes
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) setOpenDropdown(null)
  }, [isMobileMenuOpen])

  const isActive = (href) => href !== "#" && pathname === href
  const isParentActive = (link) =>
    isActive(link.href) || (link.dropdown && link.dropdown.some((item) => isActive(item.href)))

  return (
    <header
      className={`w-full transition-all duration-300 py-2 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-[#4d724d]/10 rounded-full p-1.5 sm:p-2">
              <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 relative">
                <Image src="/singleLogo.svg?height=32&width=32" alt="ICSIFT Logo" fill className="object-contain" />
              </div>
            </div>
            <span className="font-bold text-lg sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-lime-500 whitespace-nowrap">
              ICSIFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center lg:gap-0.5 xl:gap-1 overflow-x-auto">
            {navLinks.map((link, index) => {
              const active = isParentActive(link)
              return (
                <div key={index} className="relative shrink-0">
                  {link.dropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`px-2 xl:px-3 py-2 text-[11px] xl:text-xs font-medium rounded-full transition-colors flex items-center whitespace-nowrap ${
                            active
                              ? "text-[#4d724d] bg-[#edf6e1]"
                              : "text-[#1a2e1a] hover:text-[#4d724d] hover:bg-[#edf6e1]/70"
                          }`}
                        >
                          {link.title}
                          <ChevronDown className="ml-1 h-3.5 w-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-48 bg-white">
                        {link.dropdown.map((item, idx) => (
                          <DropdownMenuItem key={idx} asChild>
                            <Link
                              href={item.href}
                              className={`w-full px-4 py-2 text-xs cursor-pointer ${
                                isActive(item.href)
                                  ? "text-[#4d724d] bg-[#edf6e1] font-semibold"
                                  : "text-[#1a2e1a] hover:bg-[#edf6e1]"
                              }`}
                            >
                              {item.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-2 xl:px-3 py-2 text-[11px] xl:text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                        active
                          ? "text-[#4d724d] bg-[#edf6e1]"
                          : "text-[#1a2e1a] hover:text-[#4d724d] hover:bg-[#edf6e1]/70"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Register + Auth (desktop) */}
          <div className="hidden lg:flex flex-row items-center gap-2 xl:gap-4 shrink-0">
            <Link href="/registration">
              <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full text-xs xl:text-sm">
                Conference  Registration
              </Button>
            </Link>
            {isAuthed ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#1a2e1a] whitespace-nowrap">
                  Hi, {user.name || user.username || user.email}
                </span>
                <button
                  onClick={() => logout()}
                  className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="px-4 py-2 text-xs xl:text-sm bg-transparent border border-[#4d724d] text-[#4d724d] rounded-full hover:bg-[#4d724d] hover:text-white transition-colors whitespace-nowrap"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-full text-[#1a2e1a] hover:bg-[#edf6e1] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4d724d]"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <Menu className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden relative z-50 bg-white border-t border-[#edf6e1] shadow-xl"
          >
            <div className="container mx-auto px-4 py-4 max-h-[85vh] overflow-y-auto">
              {/* Auth section — front and center on mobile */}
              <div className="mb-4">
                {isAuthed ? (
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#edf6e1] px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4d724d] text-white">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-[#1a2e1a] truncate">
                        Hi, {user.name || user.username || user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      openAuthModal()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#4d724d] bg-[#4d724d]/5 px-4 py-3 text-sm font-semibold text-[#4d724d] hover:bg-[#4d724d] hover:text-white transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>
                )}
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const active = isParentActive(link)
                  const isOpen = openDropdown === index

                  if (link.dropdown) {
                    return (
                      <div
                        key={index}
                        className={`rounded-xl overflow-hidden transition-colors ${
                          active || isOpen ? "bg-[#edf6e1]" : ""
                        }`}
                      >
                        <button
                          onClick={() => setOpenDropdown(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          className={`flex w-full items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${
                            active || isOpen ? "text-[#4d724d]" : "text-[#1a2e1a]"
                          }`}
                        >
                          {link.title}
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 px-3 pb-3">
                                {link.dropdown.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`rounded-lg border-l-2 py-2.5 pl-4 pr-3 text-sm transition-colors ${
                                      isActive(item.href)
                                        ? "border-[#4d724d] bg-white text-[#4d724d] font-semibold shadow-sm"
                                        : "border-transparent text-[#3c5c3c] hover:border-[#4d724d] hover:bg-white"
                                    }`}
                                  >
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-[#4d724d] text-white shadow-md"
                          : "text-[#1a2e1a] hover:bg-[#edf6e1]"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-5 pt-5 border-t border-[#edf6e1]">
                <Link href="/registration" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full py-6 text-sm">
                    Conference  Registration
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}