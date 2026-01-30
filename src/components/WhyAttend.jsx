"use client"

import { Check, Sparkles, Users, Handshake, Award, TrendingUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function WhyAttendConference() {
  // State to store dot positions
  const [dots, setDots] = useState([])
  
  // Generate dots only on the client side after component mounts
  useEffect(() => {
    const newDots = Array(20).fill(0).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setDots(newDots)
  }, [])

  const reasons = [
    {
      icon: <Sparkles className="h-6 w-6 text-[#4d724d]" />,
      title: "Explore Cutting-Edge Innovations",
      description:
        "Gain insights into groundbreaking research and future-focused technologies that are driving sustainable development and shaping tomorrow's world.",
    },
    {
      icon: <Users className="h-6 w-6 text-[#4d724d]" />,
      title: "Engage with Global Experts",
      description:
        "Network with 55+ certified academicians, 125+ research scholars, and 10+ industrial professionals from over 10 countries, all dedicated to sustainability and innovation.",
    },
    {
      icon: <Handshake className="h-6 w-6 text-[#4d724d]" />,
      title: "Foster Collaboration and Partnerships",
      description:
        "Connect with like-minded professionals and thought leaders to spark new ideas, collaborations, and opportunities for joint projects.",
    },
    {
      icon: <Award className="h-6 w-6 text-[#4d724d]" />,
      title: "Industry Recognition and Awards",
      description:
        "Stand a chance to receive one of 15+ prestigious awards recognizing outstanding contributions to sustainability, innovation, and future technologies.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#4d724d]" />,
      title: "Practical and Actionable Insights",
      description:
        "Participate in dynamic sessions, discussions, and workshops focused on real-world applications and strategies for sustainable growth.",
    },
    {
      icon: <Globe className="h-6 w-6 text-[#4d724d]" />,
      title: "Global Exposure",
      description:
        "Showcase your work, share ideas, and contribute to shaping global solutions for a greener, more innovative future.",
    },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-[#f8faf5] text-[#1a2e1a] py-20">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large blob in top right */}
        <div
          className="absolute -right-40 -top-40 w-[30rem] h-[30rem] opacity-20"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            background: "linear-gradient(45deg, #d3e4c5, #4d724d)",
          }}
        ></div>

        {/* Small circle in bottom left */}
        <div className="absolute left-20 bottom-20 w-16 h-16 rounded-full bg-[#d3e4c5]/40"></div>

        {/* Medium circle in top left */}
        <div className="absolute -left-10 top-40 w-32 h-32 rounded-full bg-[#b9d4a3]/30"></div>

        {/* Decorative dots pattern - Now using client-side generated positions */}
        <div className="absolute inset-0 opacity-10">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#4d724d]"
              style={{
                left: dot.left,
                top: dot.top,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Why Attend
            <span className="relative inline-block mx-2 ml-4">
              <span className="relative z-10 mx-4">ICSIFT</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>
            2026
          </h2>
          <p className="text-[#4d724d] text-xl max-w-2xl mx-auto">
            The International Conference on Sustainability, Innovation, and Future Technologies (ICSIFT) is the ideal
            platform for exploring transformative solutions and advancing sustainable technologies.
          </p>
        </div>

        {/* Main Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
            >
              {/* Decorative corner accent */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#d3e4c5]/20 rounded-full transition-transform duration-300 group-hover:scale-150"></div>

              <div className="relative z-10">
                <div className="bg-[#d3e4c5]/30 rounded-2xl p-4 inline-block mb-4">{reason.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-[#1a2e1a]">{reason.title}</h3>
                <p className="text-[#4d724d]">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

      

        {/* Call to Action */}
   
        {/* Decorative Element */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#d3e4c5]"></div>
            <div className="w-3 h-3 rounded-full bg-[#b9d4a3]"></div>
            <div className="w-4 h-4 rounded-full bg-[#4d724d]"></div>
            <div className="w-3 h-3 rounded-full bg-[#b9d4a3]"></div>
            <div className="w-2 h-2 rounded-full bg-[#d3e4c5]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}