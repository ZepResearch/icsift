"use client"

import { ArrowRight, Award, MapPin, Users, Calendar, BookOpen, Handshake } from "lucide-react"
import Link from "next/link"

export default function ConferenceCTACards() {
  const ctaCards = [
    {
      title: "Awards",
      description:
        "Recognizing groundbreaking contributions in sustainability, innovation, and future technologies that drive positive environmental impact.",
      icon: <Award className="w-10 h-10 text-cyan-400" />,
      link: "/awards",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Venue",
      description:
        "Join us in Bangkok, Thailand for the in-person experience or participate virtually through our interactive conference platform.",
      icon: <MapPin className="w-10 h-10 text-fuchsia-400" />,
      link: "/venue",
      gradient: "from-fuchsia-500 to-purple-600",
    },
    {
      title: "Sponsorship",
      description:
        "Partner with ICSIFT to showcase your organization's commitment to sustainability innovation and gain visibility among industry leaders.",
      icon: <Handshake className="w-10 h-10 text-purple-400" />,
      link: "/sponsorship",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      title: "Committee",
      description:
        "Meet our distinguished panel of sustainability experts, researchers, and thought leaders guiding the conference's vision and quality.",
      icon: <Users className="w-10 h-10 text-pink-400" />,
      link: "/committee",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Schedule",
      description:
        "Explore our comprehensive 2-day agenda featuring keynotes, panel discussions, workshops, and networking events on sustainability topics.",
      icon: <Calendar className="w-10 h-10 text-cyan-400" />,
      link: "/schedule",
      gradient: "from-cyan-500 to-teal-600",
    },
    {
      title: "Journal",
      description:
        "Access peer-reviewed publications and research papers on sustainability innovations and technologies from our conference proceedings.",
      icon: <BookOpen className="w-10 h-10 text-lime-400" />,
      link: "/journals",
      gradient: "from-lime-500 to-teal-600",
    },
  ]

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#f8faf5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4">
            Conference
            <span className="relative inline-block mx-2">
              <span className="relative z-10">Highlights</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>
          </h2>
          <p className="text-[#4d724d] max-w-2xl mx-auto">
            Explore the key features of ICSIFT 2025 and discover opportunities to engage with the global sustainability
            community.
          </p>
        </div>

        {/* CTA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ctaCards.map((card, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-lg"
            >
                  <Link
                  href={card.link}>
              {/* Card Background with Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`}></div>

              {/* Content */}
              
              <div className="relative p-8 h-full flex flex-col text-white">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-white/80 mb-6 flex-grow">{card.description}</p>

                <span
                  href={card.link}
                  className="inline-flex items-center text-white font-medium mt-auto group-hover:underline w-full py-2"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 opacity-30"></div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-[#edf6e1] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-[#1a2e1a] mb-2">Ready to join ICSIFT 2024?</h3>
            <p className="text-[#4d724d] max-w-xl">
              Register now to secure your spot at the premier conference on sustainability, innovation, and future
              technologies.
            </p>
          </div>
          <Link
            href="/register"
            className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 flex items-center"
          >
            Register Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
