import React from 'react'
import {
    ChevronRight,
    Users,
    FileText,
    Sparkles,
    CreditCard,
    Presentation,
    Headphones,
    DollarSign,
    Ticket,
    Mail,
    Calendar,
    Info,
    ArrowRight,
  } from "lucide-react"
  import Link from "next/link"
  import { GeometricShapes } from "./geometric-shapes"
function ExtraContentAboveCard() {
  return (
    <div>    {/* Hero Section */}
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <GeometricShapes />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #4d724d 1px, transparent 1px), linear-gradient(to bottom, #4d724d 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-[#4d724d]/30 bg-[#d3e4c5]/30 px-4 py-1.5 text-sm font-medium text-[#4d724d] mb-6">
            <span>ICSIFT 2026</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e1a] mb-6">
            Conference
            <span className="relative inline-block mx-2">
              <span className="relative z-10">Registration</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>
          </h1>

          <p className="text-xl text-[#4d724d] mb-8">
            Join us at the International Conference on Sustainability, Innovation and Future Technologies
          </p>
        </div>
      </div>
    </section>

    {/* Registration Process Section */}
   

    {/* Registration Options Section */}
    <section className="py-16 bg-[#f8faf5]">
      <div className="container mx-auto px-4">
        <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden shadow-sm">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#4d724d] p-0.5 mb-6">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#edf6e1]">
                  <Users className="h-8 w-8 text-[#4d724d]" />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1a2e1a]">Select Your Registration Type</h2>

              <div className="space-y-6 text-[#4d724d]">
                <p>
                  Choose the registration option that best suits your needs. All registrations include access to
                  keynote presentations, panel discussions, and networking opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <div className="bg-white rounded-xl border border-[#d3e4c5] p-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center mr-4">
                    <Presentation className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[#1a2e1a] font-medium">Presenter Registration</h3>
                    <p className="text-[#4d724d] text-sm">For those presenting research papers</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#d3e4c5] p-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center mr-4">
                    <Headphones className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[#1a2e1a] font-medium">Listener Registration</h3>
                    <p className="text-[#4d724d] text-sm">For those attending without presenting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></div>
  )
}

export default ExtraContentAboveCard