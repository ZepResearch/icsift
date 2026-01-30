"use client"

import { Rocket, Users, Building2, FileText, GraduationCap, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function FutureOpportunities() {
  // State to store dot positions
  const [dots, setDots] = useState([])
  
  // Generate dots only on the client side after component mounts
  useEffect(() => {
    const newDots = Array(15).fill(0).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setDots(newDots)
  }, [])

  const opportunities = [
    {
      icon: <Rocket className="h-8 w-8 text-white" />,
      title: "Advancing Research and Innovation",
      description:
        "Participants will gain opportunities to explore emerging research areas in sustainability, green technologies, smart systems, and future-ready innovations. The conference encourages the development of scalable solutions that address environmental, economic, and social challenges.",
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Global Collaboration and Networking",
      description:
        "By bringing together researchers, academicians, industry professionals, policymakers, and entrepreneurs from across the world, the conference fosters long-term collaborations, joint research projects, and international knowledge exchange.",
    },
    {
      icon: <Building2 className="h-8 w-8 text-white" />,
      title: "Industry–Academia Integration",
      description:
        "The conference creates pathways for stronger industry–academia partnerships, enabling the translation of research into real-world applications, startups, patents, and sustainable business models aligned with future technological needs.",
    },
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      title: "Policy Impact and Sustainable Development",
      description:
        "Discussions and outcomes from the conference contribute to evidence-based policymaking and strategic planning, supporting global sustainability goals and future technology frameworks.",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-white" />,
      title: "Career and Leadership Development",
      description:
        "Young researchers, scholars, and professionals benefit from exposure to global expertise, mentorship opportunities, and recognition, empowering them to become future leaders in sustainability and innovation.",
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Roadmap to Future Technologies",
      description:
        "The conference aims to act as a catalyst for next-generation technologies in areas such as renewable energy, artificial intelligence, smart infrastructure, climate resilience, and digital sustainability, shaping a more inclusive and sustainable future.",
    },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-[#f8faf5] text-[#1a2e1a] py-20">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large blob in bottom left */}
        <div
          className="absolute -left-40 -bottom-40 w-[35rem] h-[35rem] opacity-15"
          style={{
            borderRadius: "70% 30% 50% 50% / 50% 60% 40% 50%",
            background: "linear-gradient(135deg, #4d724d, #d3e4c5)",
          }}
        ></div>

        {/* Medium blob in top right */}
        <div
          className="absolute -right-20 top-20 w-[20rem] h-[20rem] opacity-20"
          style={{
            borderRadius: "50% 50% 30% 70% / 60% 40% 60% 40%",
            background: "linear-gradient(225deg, #b9d4a3, #4d724d)",
          }}
        ></div>

        {/* Small circles scattered */}
        <div className="absolute right-40 bottom-40 w-12 h-12 rounded-full bg-[#d3e4c5]/50"></div>
        <div className="absolute left-1/3 top-20 w-8 h-8 rounded-full bg-[#b9d4a3]/40"></div>

        {/* Decorative dots pattern */}
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
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              Future
              <span className="relative inline-block mx-2 ml-5">
                <span className="relative z-10 mx-2">Opportunities</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform rotate-1 scale-110 z-0"></span>
              </span>
            </h2>
            <p className="text-[#4d724d] text-lg max-w-3xl mx-auto leading-relaxed">
              The International Conference on Sustainability, Innovation and Future Technologies serves as a dynamic
              platform to shape the future of sustainable development through interdisciplinary collaboration and
              technological advancement. As global challenges continue to evolve, the conference opens new avenues for
              innovation, research, and impactful partnerships.
            </p>
          </div>

          {/* Grid Layout for Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-6 bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group text-center"
              >
                {/* Icon Section */}
                <div className="flex-shrink-0">
            <div className="relative">
              {/* Decorative background circle */}
              <div className="absolute inset-0 bg-[#4d724d] rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="relative bg-[#4d724d] rounded-3xl p-8 transform group-hover:scale-105 transition-transform duration-300">
                {opportunity.icon}
              </div>
            </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-[#1a2e1a] group-hover:text-[#4d724d] transition-colors duration-300">
              {opportunity.title}
            </h3>
            <p className="text-[#4d724d] text-lg leading-relaxed">{opportunity.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Areas Banner */}
        <div className="bg-gradient-to-r from-[#4d724d] to-[#5d8a5d] text-white rounded-3xl p-8 md:p-12 shadow-lg mb-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Next-Generation Technology Areas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "Renewable Energy",
                "Artificial Intelligence",
                "Smart Infrastructure",
                "Climate Resilience",
                "Digital Sustainability",
                "Green Technologies",
              ].map((area, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <span className="text-sm md:text-base font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#d3e4c5]/30 rounded-2xl p-4 inline-block mb-4">
              <GraduationCap className="h-8 w-8 text-[#4d724d]" />
            </div>
            <h4 className="text-2xl font-bold mb-3 text-[#1a2e1a]">For Researchers & Scholars</h4>
            <p className="text-[#4d724d] mb-6">
              Present your work, gain global recognition, and connect with leading experts in sustainability and
              innovation.
            </p>
            <Link href="/submission">
              <Button className="bg-[#4d724d] hover:bg-[#3d5a3d] text-white rounded-full">
                Submit Your Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[#d3e4c5]/30 rounded-2xl p-4 inline-block mb-4">
              <Building2 className="h-8 w-8 text-[#4d724d]" />
            </div>
            <h4 className="text-2xl font-bold mb-3 text-[#1a2e1a]">For Industry Partners</h4>
            <p className="text-[#4d724d] mb-6">
              Explore collaboration opportunities, discover innovative solutions, and shape the future of sustainable
              technologies.
            </p>
            <Link href="/committee">
              <Button
                variant="outline"
                className="border-[#4d724d] text-[#4d724d] hover:bg-[#4d724d] hover:text-white rounded-full"
              >
                Explore Partnerships
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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