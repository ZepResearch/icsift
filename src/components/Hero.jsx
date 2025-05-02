"use client"

import Image from "next/image"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeometricShapesCSS } from "./geometric-shapes"

export default function ConferenceHero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#f8faf5] text-[#1a2e1a] pb-20">
      {/* CSS Background Elements */}
      <GeometricShapesCSS />

      {/* Navigation */}
     
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Join us in the conference for
            <span className="relative inline-block mx-2 ml-8">
              <span className="relative z-10">sustainability</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-2 scale-110 z-0"></span>
            </span>
             
          </h1>
          <p className="text-[#4d724d] text-xl max-w-2xl mx-auto">
            International Conference on Sustainability, Innovation and Future Technologies bringing together experts and
            enthusiasts from around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Main Conference Image */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden h-[400px] shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1620415629284-975004d37752?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Conference"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent">
              <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 px-6 inline-flex items-center">
                <span className="text-[#1a2e1a] font-medium">Share with us your research</span>
              </div>
            </div>
          </div>

          {/* Conference Details */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-[#d3e4c5] rounded-full px-3 py-1 text-sm font-medium text-[#1a2e1a] mb-4">
                  Hybrid Conference
                </div>
                <h3 className="text-xl font-bold mb-2">Conference Details</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-[#4d724d]" />
                  <span>December 26-27, 2024</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-[#4d724d]" />
                  <span>Bangkok, Thailand</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3 text-[#4d724d]" />
                  <span>In-person & Virtual</span>
                </div>
              </div>
            </div>

            <div className="bg-[#d3e4c5] rounded-3xl p-6 shadow-sm flex items-center justify-between">
              <span className="font-medium">Learn More</span>
              <Button variant="ghost" size="icon" className="rounded-full bg-white h-10 w-10">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats and Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-[#1a2e1a]">50+</h3>
            <p className="text-[#4d724d]">Research papers will be presented at the conference</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-[#1a2e1a]">20+</h3>
            <p className="text-[#4d724d]">Educational programs and workshops for attendees</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-[#1a2e1a]">500+</h3>
            <p className="text-[#4d724d]">Expected attendees from around the world</p>
          </div>
        </div>

        {/* Endorsement and Indexing */}
        <div className="flex flex-wrap justify-between items-center bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-[#4d724d]">Endorsed by:</span>
            <Image src={'/assets/pasuc.png'} alt="pasuc"  className="bg-[#f0f5eb] px-4 py-2 rounded-full text-sm" width={120} height={120}/>
            <div className="bg-[#f0f5eb] px-4 py-2 rounded-full text-sm">
              PASUC - Philippine Association of State Universities and Colleges
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap mt-4 md:mt-0">
            {/* <span className="text-sm text-[#4d724d]">Indexed in:</span> */}
            <div className="flex md:flex-row flex-col gap-2">
              <Image src={'/assets/clarivate.png'} alt="clarivate" className="bg-[#f0f5eb] px-3 py-1 rounded-full text-sm" width={200} height={200}/>
              <Image src={'/assets/scopus.png'} alt="scopus" className="bg-[#f0f5eb] px-3 py-1 rounded-full text-sm m-2 pl-5" width={170} height={100}/>
              <Image src={'/assets/zepresearch.png'} alt="zepresearch" className="bg-[#f0f5eb] px-3 py-1 rounded-full text-sm object-fill my-1.5" width={200} height={200}/>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="relative z-10 mt-20 border-t border-[#d3e4c5]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#4d724d] max-w-md mb-4 md:mb-0">
              The conference has carried out many successful projects for sustainability and innovation.
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a]">We strive to build a sustainable future.</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
