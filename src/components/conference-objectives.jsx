"use client"

import { Check, Target, Lightbulb, Network, Globe, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function ConferenceObjectives() {
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

  const objectives = [
    {
      icon: <Target className="h-6 w-6 text-[#4d724d]" />,
      title: "Knowledge Exchange",
      description:
        "Facilitate the exchange of cutting-edge research, innovations, and best practices in sustainability across disciplines.",
    },
    {
      icon: <Network className="h-6 w-6 text-[#4d724d]" />,
      title: "Network Building",
      description:
        "Create opportunities for researchers, practitioners, and policymakers to build lasting collaborations and partnerships.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-[#4d724d]" />,
      title: "Innovation Showcase",
      description:
        "Highlight innovative solutions and technologies that address pressing environmental and sustainability challenges.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#4d724d]" />,
      title: "Education & Awareness",
      description:
        "Raise awareness about sustainability issues and educate participants on effective strategies for positive change.",
    },
    {
      icon: <Globe className="h-6 w-6 text-[#4d724d]" />,
      title: "Global Impact",
      description:
        "Develop actionable recommendations for policy and practice that can drive global sustainability transformation.",
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
            
            <span className="relative inline-block mx-2 mr-4">
              <span className="relative z-10 ml-4">objectives</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>
            of The Conference
          </h2>
          <p className="text-[#4d724d] text-xl max-w-2xl mx-auto">
            The conference aims to address key challenges in sustainability through collaborative efforts and innovative
            approaches.
          </p>
        </div>

        {/* Main Objectives Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              {/* Decorative corner accent */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#d3e4c5]/20 rounded-full transition-transform duration-300 group-hover:scale-150"></div>

              <div className="relative z-10">
                <div className="bg-[#d3e4c5]/30 rounded-2xl p-4 inline-block mb-4">{objective.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-[#1a2e1a]">{objective.title}</h3>
                <p className="text-[#4d724d]">{objective.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Focus Areas */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Key Focus Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Renewable Energy Solutions",
              "Sustainable Agriculture",
              "Climate Change Mitigation",
              "Circular Economy",
              "Smart Cities & Infrastructure",
              "Biodiversity Conservation",
              "Water Resource Management",
              "Green Technology Innovation",
              "Sustainable Development Goals",
            ].map((area, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-[#d3e4c5] rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-[#1a2e1a]" />
                </div>
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#4d724d] text-white rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Ready to contribute?</h3>
              <p className="text-white/80 max-w-xl">
                Submit your research paper or proposal and be part of the global conversation on sustainability and
                innovation.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/submission">
              <Button className="bg-white hover:bg-[#f0f5eb] text-[#1a2e1a] rounded-full whitespace-nowrap">
                Submit Paper
              </Button>
              </Link> 
              <Link href="/papers-format">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full whitespace-nowrap"
              >
                View Guidelines
              </Button>
              </Link>
            </div>
          </div>
        </div>

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