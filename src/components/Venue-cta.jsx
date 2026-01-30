"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Navigation, Building, Wifi, Coffee, Users, ArrowRight } from "lucide-react"

export default function ConferenceVenue() {
  const venueFeatures = [
    {
      title: "Main Conference Hall",
      description: "State-of-the-art auditorium with seating for 500+ attendees and advanced presentation technology.",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Workshop Spaces",
      description:
        "Multiple configurable rooms for interactive workshops and breakout sessions on sustainability topics.",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    },
    {
      title: "Networking Garden",
      description: "Eco-friendly outdoor space designed for sustainable networking and relaxation between sessions.",
      image:
        "https://images.unsplash.com/photo-1740478296042-392fa8498069?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
              <span className="relative z-10">Venue</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>
          </h2>
          <p className="text-[#4d724d] max-w-2xl mx-auto">
            Join us at our sustainable venue designed to minimize environmental impact while providing an exceptional
            conference experience.
          </p>
        </div>

        {/* Main Venue Card */}
        <div className="bg-[#edf6e1] rounded-3xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left side - Venue image */}
            <div className="relative h-[300px] lg:h-full">
              <Image
                src="https://images.unsplash.com/photo-1578167635648-df79e1565908?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="ICSIFT Conference Venue - Bangkok International Convention Center"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent"></div>

              {/* Venue name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 px-6 inline-block">
                  <span className="text-[#1a2e1a] font-medium">Bangkok International Convention Center</span>
                </div>
              </div>
            </div>

            {/* Right side - Venue details */}
            <div className="p-8 lg:p-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d3e4c5] text-[#1a2e1a]">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#4d724d]">Date</p>
                      <p className="text-[#1a2e1a] font-medium">August  20<sup>th</sup> - 21<sup>st</sup>, 2026</p>
                      <p className="text-sm text-[#4d724d]">2 Days of Sustainability Innovation</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d3e4c5] text-[#1a2e1a]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#4d724d]">Time</p>
                      <p className="text-[#1a2e1a] font-medium">9:00 AM - 6:00 PM (Daily)</p>
                      <p className="text-sm text-[#4d724d]">Registration opens at 8:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d3e4c5] text-[#1a2e1a]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#4d724d]">Address</p>
                      {/* <p className="text-[#1a2e1a] font-medium">Declare soon</p> */}
                      <p className="text-[#1a2e1a]">Boracay, philippines</p>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-[#b9d4a3]"></div>

                <div>
                  <h4 className="text-lg font-medium text-[#1a2e1a] mb-4">Venue Amenities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-[#4d724d]">
                      <Wifi size={16} className="text-[#4d724d]" />
                      <span>High-speed WiFi</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4d724d]">
                      <Building size={16} className="text-[#4d724d]" />
                      <span>Sustainable Facilities</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4d724d]">
                      <Coffee size={16} className="text-[#4d724d]" />
                      <span>Organic Catering</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4d724d]">
                      <Users size={16} className="text-[#4d724d]" />
                      <span>Eco-friendly Lounges</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">
                    <Navigation className="mr-2 h-5 w-5" />
                    Get Directions
                  </Button>
                  <Link href="/venue">
                  <Button
                    variant="outline"
                    className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full"
                  >
                    Detail Info
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation info */}
     <div className="bg-white rounded-3xl p-8 shadow-sm mb-12">
  <h4 className="text-xl font-medium text-[#1a2e1a] mb-6">Transportation</h4>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p className="text-sm font-medium text-[#4d724d] mb-2">From Airport</p>
      <p className="text-[#1a2e1a]/80">
        Boracay is accessible via Caticlan Airport (MPH) or Kalibo International Airport (KLO).
        From Caticlan Airport, a short tricycle ride followed by a boat transfer will take you to
        Boracay Island, with a total travel time of around 30–45 minutes. From Kalibo Airport,
        land transfers and boat rides take approximately 2–3 hours.
      </p>
    </div>
    <div>
      <p className="text-sm font-medium text-[#4d724d] mb-2">Local Transportation</p>
      <p className="text-[#1a2e1a]/80">
        Transportation within Boracay is mainly via electric tricycles (e-trikes), which are the
        primary mode of public transport on the island. Walking is also convenient, especially
        along White Beach, where most hotels, venues, and attractions are located.
      </p>
    </div>
  </div>
</div>


        {/* Venue Features */}
        {/* <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#1a2e1a] mb-6">Venue Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venueFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm group">
                <div className="relative h-48">
                  <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-[#1a2e1a] mb-2">{feature.title}</h4>
                  <p className="text-[#4d724d] mb-4">{feature.description}</p>
                  <Link href="#" className="inline-flex items-center text-[#1a2e1a] font-medium group-hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Sustainability Initiatives */}
        <div className="bg-[#edf6e1] rounded-3xl p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#1a2e1a] mb-2">Sustainability Initiatives</h3>
            <p className="text-[#4d724d]">
              We hold various events, campaigns and raise funds for the implementation of projects to preserve the
              environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8faf5] rounded-3xl overflow-hidden">
              <div className="p-6">
                <h4 className="text-xl font-bold text-[#1a2e1a] mb-2">Carbon Neutral Event</h4>
                <p className="text-[#4d724d] mb-4">
                  Our team is actively working to offset the carbon footprint of the conference through tree planting
                  and renewable energy investments.
                </p>
                <Button variant="link" className="text-[#1a2e1a] p-0 h-auto font-medium flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80"
                  alt="Carbon Neutral Event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-[#f8faf5] rounded-3xl overflow-hidden">
              <div className="p-6">
                <h4 className="text-xl font-bold text-[#1a2e1a] mb-2">Zero Waste Conference</h4>
                <p className="text-[#4d724d] mb-4">
                  We're implementing comprehensive recycling and composting systems to minimize waste and promote
                  sustainable practices.
                </p>
                <Button variant="link" className="text-[#1a2e1a] p-0 h-auto font-medium flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Zero Waste Conference"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-[#f8faf5] rounded-3xl overflow-hidden">
              <div className="p-6">
                <h4 className="text-xl font-bold text-[#1a2e1a] mb-2">Local Community Support</h4>
                <p className="text-[#4d724d] mb-4">
                  We partner with local sustainable businesses for catering, materials, and services to support the
                  local economy.
                </p>
                <Button variant="link" className="text-[#1a2e1a] p-0 h-auto font-medium flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Local Community Support"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
