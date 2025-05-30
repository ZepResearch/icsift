"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Navigation, Building, Utensils, Landmark, Trees, ShoppingBag, Palette } from "lucide-react"

export default function VenuePage() {
  return (
    <main className="bg-[#f8faf5]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
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
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e1a] mb-6">
              Conference
              <span className="relative inline-block mx-2">
                <span className="relative z-10">Venue</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>
            <p className="text-xl text-[#4d724d] mb-8">Join us at Radisson Suites Bangkok Sukhumvit</p>
          </div>
        </div>
      </section>

      {/* Venue Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden shadow-sm">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4d724d] p-0.5">
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                        <Building className="h-6 w-6 text-[#4d724d]" />
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1a]">Conference Venue</h2>
                  </div>

                  <div className="space-y-6 text-[#4d724d]">
                    <p>
                      Radisson Suites Bangkok Sukhumvit offers a modern, comfortable, and centrally located venue for 2<sup>nd</sup>ICSIFT 2025. Situated in the vibrant Sukhumvit district, the hotel provides excellent conference facilities, luxury accommodation, and easy access to Bangkok's top attractions.
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-[#1a2e1a]">Venue Features</h3>

                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-white">✓</span>
                          </div>
                          <span>Flexible conference and meeting rooms with modern AV technology</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-white">✓</span>
                          </div>
                          <span>On-site international dining and rooftop bar</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-white">✓</span>
                          </div>
                          <span>Complimentary high-speed WiFi throughout the venue</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-white">✓</span>
                          </div>
                          <span>Fitness center, outdoor pool, and wellness amenities</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-white">✓</span>
                          </div>
                          <span>Walking distance to BTS Skytrain and MRT stations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-white">✓</span>
                          </div>
                          <span>Central location near shopping, dining, and entertainment</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl border border-[#d3e4c5] p-5 mt-8">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="h-5 w-5 text-[#4d724d]" />
                        <h3 className="text-lg font-medium text-[#1a2e1a]">Address</h3>
                      </div>
                      <p className="text-[#4d724d]">
                        23/2 Soi Sukhumvit 13, Khwaeng Khlong Toei Nuea, Khlong Toei, Bangkok 10110, Thailand
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">
                      <Navigation className="mr-2 h-5 w-5" />
                      Get Directions
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-[#d3e4c5]">
                    <Image
                      src="/venue.webp"
                      alt="Radisson Suites Bangkok Sukhumvit"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent"></div>

                    {/* Floating elements */}
                    <div className="absolute top-1/4 right-1/4 h-12 w-12 rounded-full bg-[#d3e4c5] blur-xl opacity-70 animate-pulse"></div>
                    <div
                      className="absolute bottom-1/3 left-1/3 h-16 w-16 rounded-full bg-[#b9d4a3] blur-xl opacity-70 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>

                    {/* Venue name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* <h3 className="text-2xl font-bold text-white mb-1">Declare soon</h3> */}
                      {/* <p className="text-white/90">Bangkok's premier convention and exhibition venue</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-16 bg-[#f8faf5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Location</h2>
            <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden p-4 shadow-sm">
            <div className="absolute -inset-px rounded-3xl bg-[#d3e4c5]/20 opacity-50"></div>

            <div className="relative rounded-2xl overflow-hidden h-[500px] w-full">
              <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5767660119773!2d100.55510911107883!3d13.74405478659131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee677aa7f5b%3A0x297e4d6053920063!2sRadisson%20Suites%20Bangkok%20Sukhumvit!5e0!3m2!1sen!2sth!4v1748598948056!5m2!1sen!2sth"                 width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-white rounded-3xl border border-[#d3e4c5] p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">Getting Around</h2>
              <div className="space-y-6 text-[#4d724d]">
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2e1a] mb-2">From Airport:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Suvarnabhumi International Airport (BKK):</strong> Approximately 30-45 minutes by taxi. You can also take the Airport Rail Link to Makkasan Station, and then transfer to the MRT (subway) or a short taxi ride to the hotel.</li>
                    <li>The hotel also offers paid airport transfer services.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2e1a] mb-2">MRT/BTS Access:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>The hotel provides a complimentary tuk-tuk shuttle service to nearby Nana BTS Station (Skytrain) and Asoke BTS Station / Sukhumvit MRT Station.</li>
                    <li>Nana BTS Station is about an 8-minute walk from the hotel.</li>
                    <li>Sukhumvit MRT Station is about a 13-minute walk from the hotel.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2e1a] mb-2">Parking:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Free on-site parking is available for guests. (This is generally a plus for hotels in Bangkok!)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Nearby Attractions</h2>
            <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-[#4d724d] max-w-2xl mx-auto">Explore Bangkok during your visit to 2<sup>nd</sup>ICSIFT 2025</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Grand Palace",
                description: "Historic royal residence with stunning Thai architecture and Wat Phra Kaew",
                distance: "7.5 km",
                icon: <Landmark className="h-8 w-8 text-[#4d724d]" />,
                image:
                  "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Lumphini Park",
                description: "Urban oasis with lakes, walking paths, and recreational activities",
                distance: "1.2 km",
                icon: <Trees className="h-8 w-8 text-[#4d724d]" />,
                image:
                  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "EmQuartier & Emporium",
                description: "Luxury shopping malls with international brands and dining options",
                distance: "1.5 km",
                icon: <ShoppingBag className="h-8 w-8 text-[#4d724d]" />,
                image:
                  "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Wat Arun",
                description: "Iconic riverside temple with stunning porcelain decoration",
                distance: "9.2 km",
                icon: <Landmark className="h-8 w-8 text-[#4d724d]" />,
                image:
                  "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Bangkok Art and Culture Centre",
                description: "Contemporary art museum with rotating exhibitions and cultural events",
                distance: "5.8 km",
                icon: <Palette className="h-8 w-8 text-[#4d724d]" />,
                image:
                  "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Chatuchak Weekend Market",
                description: "One of the world's largest weekend markets with over 15,000 stalls",
                distance: "8.5 km",
                icon: <ShoppingBag className="h-8 w-8 text-[#4d724d]" />,
                image:
                  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            ].map((attraction, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl border border-[#d3e4c5] overflow-hidden group hover:shadow-md transition-all shadow-sm"
              >
                <div className="absolute -inset-px rounded-2xl bg-[#d3e4c5]/20 opacity-0 transition-opacity group-hover:opacity-100"></div>

                <div className="relative">
                  <div className="h-48 w-full overflow-hidden">
                    <Image
                      src={attraction.image || "/placeholder.svg"}
                      alt={attraction.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4 -mt-12 relative z-10">
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                        {attraction.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-[#1a2e1a] mb-2">{attraction.title}</h3>
                    <p className="text-[#4d724d] mb-3">{attraction.description}</p>

                    <div className="flex items-center gap-2 text-[#4d724d]/60">
                      <MapPin className="h-4 w-4" />
                      <span>{attraction.distance} from venue</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Options */}
      <section className="py-16 bg-[#f8faf5]">
        <div className="container mx-auto px-4">
          <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden shadow-sm">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#d3e4c5]/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#4d724d]/30 rounded-full blur-3xl"></div>

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4d724d] p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                      <Utensils className="h-6 w-6 text-[#4d724d]" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1a]">Dining Options</h2>
                </div>

                <div className="space-y-6 text-[#4d724d]">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1a2e1a] mb-2">Venue Dining at Radisson Suites Bangkok Sukhumvit:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Mauve Restaurant:</strong> Offers international cuisine.</li>
                      <li><strong>Rooftop Bar:</strong> Perfect for drinks and light bites with a view.</li>
                      <li><strong>24-hour room service:</strong> Enjoy dining in the comfort of your suite at any time.</li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-[#1a2e1a] mb-2">Nearby Restaurants:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>EmQuartier Food Hall (5-min walk):</strong> A diverse array of dining options, from local to international.</li>
                      <li><strong>Sukhumvit Soi 24 (10-min walk):</strong> Explore various local Thai restaurants.</li>
                      <li><strong>Phrom Phong area (15-min walk):</strong> Known for its wide selection of international cuisine.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden p-8 shadow-sm">
              <div className="absolute -inset-px rounded-3xl bg-[#d3e4c5]/20 opacity-50"></div>

              <div className="relative">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Ready to Join Us?</h3>
                <p className="text-[#4d724d] mb-6">
                  Register for 2<sup>nd</sup>ICSIFT 2025 today and experience our world-class venue in the heart of Bangkok.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">Register Now</Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full"
                    >
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
