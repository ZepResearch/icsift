"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ConferenceNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    {
      title: "ABOUT",
      href: "#",
      dropdown: [
        {
          href: "/about-conference",
          title: "About Conference",
        },
        {
          href: "/about-organizers",
          title: "About Organizers",
        },
      ],
    },
    {
      title: "PROGRAM",
      href: "#",
      dropdown: [
        {
          href: "/theme-and-topics",
          title: "Themes and Topics",
        },
        {
          href: "/papers-format",
          title: "Paper Formats",
        },
        {
          href: "/mode-of-presentation",
          title: "Mode of Presentation",
        },
        {
          href: "/schedule",
          title: "Conference Schedule",
        },
      ],
    },
    {
      title: "COMMITTEE",
      href: "/committee",
    },
    {
      title: "SUBMISSION",
      href: "/submission",
    },
    // {
    //   title: "JOURNALS",
    //   href: "/journals",
    // },
    {
      title: "VENUE",
      href: "/venue",
    },
    {
      title: "AWARDS",
      href: "/awards",
    },
    {
      title: "CONTACT",
      href: "/contact",
    },
    {
      title: "EXHIBIT & SPONSOR",
      href: "/exhibit-and-sponsor",
    },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[#4d724d]/10 rounded-full p-2">
              <div className="w-12 h-12 relative">
                <Image src="/singleLogo.svg?height=32&width=32" alt="ICSIFT Logo" fill className="object-contain" />
              </div>
            </div>
            <span className="font-bold text-lg md:text-xl text-[#1a2e1a]">ICSIFT </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="px-3 py-2 text-sm font-medium text-[#1a2e1a] hover:text-[#4d724d] transition-colors flex items-center">
                        {link.title}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48 bg-white">
                      {link.dropdown.map((item, idx) => (
                        <DropdownMenuItem key={idx} asChild>
                          <Link
                            href={item.href}
                            className="w-full px-4 py-2 text-sm text-[#1a2e1a] hover:bg-[#edf6e1] cursor-pointer"
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
                    className="px-3 py-2 text-sm font-medium text-[#1a2e1a] hover:text-[#4d724d] transition-colors"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Register Button */}
          <div className="hidden lg:block">
            <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">Register Now</Button>
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-[#1a2e1a] hover:bg-[#edf6e1]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#edf6e1] overflow-hidden">
          <div className="container mx-auto px-4 py-4 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <div key={index} className="py-1">
                  {link.dropdown ? (
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer py-2 text-[#1a2e1a] font-medium">
                        {link.title}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="pl-4 mt-1 space-y-1">
                        {link.dropdown.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="block py-2 text-sm text-[#4d724d] hover:text-[#1a2e1a]"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-2 text-[#1a2e1a] font-medium hover:text-[#4d724d]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-[#edf6e1]">
              
              <Button className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">Register Now</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
