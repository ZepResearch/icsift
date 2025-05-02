"use client"

import Image from "next/image"
import { ArrowRight, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AboutConference() {
  const downloadMaterials = [
    { name: "Conference Brochure", file: "#" },
    { name: "Copyright Form", file: "#" },
    { name: "Abstract Template", file: "#" },
    { name: "Manuscript Template", file: "#" },
    { name: "Registration Form", file: "#" },
    { name: "Conference Poster", file: "#" },
  ]

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#f8faf5]">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="bg-[#edf6e1] rounded-3xl p-6 md:p-10 overflow-hidden relative">
          {/* Navigation Dots */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 hidden md:flex">
            <div className="w-2 h-2 rounded-full bg-[#4d724d]/40"></div>
            <div className="w-2 h-2 rounded-full bg-[#4d724d]/80"></div>
            <div className="w-2 h-2 rounded-full bg-[#4d724d]/40"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div className="md:pl-8">
              <div className="inline-block border border-[#1a2e1a] rounded-full px-4 py-1 text-sm mb-6">
                About ICSIFT
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4">
                International Conference on Sustainability, Innovation, and Future Technologies
              </h2>
              <p className="text-[#4d724d] mb-6">
                The International Conference on Sustainability, Innovation, and Future Technologies (ICSIFT) is a
                premier global event bringing together experts, researchers, and industry leaders to explore
                groundbreaking advancements. The conference focuses on sustainable development, cutting-edge
                innovations, and transformative technologies shaping the future. ICSIFT aims to inspire collaboration,
                foster innovation, and drive actionable solutions for a sustainable and technologically advanced world.
              </p>

              <div className="flex flex-wrap gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-white text-[#1a2e1a] hover:bg-[#f0f5eb] border border-[#d3e4c5] rounded-full">
                      <Download className="mr-2 h-4 w-4" /> Download Materials
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-amber-50">
                    {downloadMaterials.map((item, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <a href={item.file} className="flex items-center cursor-pointer ">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>{item.name}</span>
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  className="text-[#1a2e1a] hover:bg-white/50 border border-[#1a2e1a] rounded-full"
                >
                  Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm z-10">
                <FileText className="h-5 w-5 text-[#1a2e1a]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image */}
                <div className="relative h-64 md:h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                    alt="Sustainable Materials"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Stats */}
                <div className="p-6 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-[#4d724d] mb-2">Sustainability Impact</h3>
                    <div className="relative h-36 w-36 mx-auto">
                      <div className="absolute inset-0 rounded-full border-8 border-[#e9d5ff]/30"></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-[#e9d5ff]"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                          transform: "rotate(90deg)",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">85%</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-white text-[#1a2e1a] hover:bg-[#f0f5eb] border border-[#d3e4c5] rounded-full self-end">
                    Explore More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
