"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Presentation, ImageIcon, Monitor, Check } from 'lucide-react'

export default function ModeOfPresentationPage() {
  const presentationGuidelines = [
    "Be concise and focused. Clearly communicate your research question, methodology, findings, and implications within the allotted time.",
    "Use visuals effectively. Incorporate clear, high-quality visuals that enhance understanding of your research.",
    "Practice your presentation. Rehearse to ensure smooth delivery and timing, especially for oral presentations.",
    "Prepare for questions. Anticipate potential questions and prepare thoughtful responses.",
    "Engage with your audience. Encourage questions and discussion to maximize the impact of your presentation.",
  ]

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
              Mode of
              <span className="relative inline-block mx-2 ml-6">
                <span className="relative z-10">Presentation</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>
            <p className="text-xl text-[#4d724d] mb-8">
              Learn about the different ways to present your research at ICSIFT 2025
            </p>
          </div>
        </div>
      </section>

      {/* Speak at the Event Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Oral Presentation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 px-6 inline-flex items-center">
                  <span className="text-[#1a2e1a] font-medium">Share your research insights</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#d3e4c5] rounded-full p-3 mr-4">
                  <Presentation className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a]">Speak at the Event</h2>
              </div>
              <p className="text-[#4d724d] mb-6">
                Present your research in a 15-minute oral presentation followed by a 5-minute Q&A session. This format
                is ideal for sharing detailed findings and engaging directly with the audience.
              </p>

              <div className="bg-[#f8faf5] rounded-3xl p-6 mb-6">
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-4">What to Prepare:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">PowerPoint or PDF presentation (16:9 format)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">Concise overview of your research methodology</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">Clear presentation of key findings and implications</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">Brief bio for the session chair's introduction</span>
                  </li>
                </ul>
              </div>
            <Link href={'/submission'}>
              <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">
                Submit for Oral Presentation
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Show a Poster Section */}
      <section className="py-16 bg-[#edf6e1]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <div className="bg-[#d3e4c5] rounded-full p-3 mr-4">
                  <ImageIcon className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a]">Show a Poster</h2>
              </div>
              <p className="text-[#4d724d] mb-6">
                Present your research in a visual format during our dedicated poster sessions. This interactive format
                allows for in-depth discussions with interested attendees.
              </p>

              <div className="bg-white rounded-3xl p-6 mb-6">
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-4">What to Prepare:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">A0 size poster (841 × 1189 mm) in portrait orientation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">Clear visual representation of your research</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">QR code linking to additional resources (optional)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">Handouts or business cards for interested attendees</span>
                  </li>
                </ul>
              </div>
              <Link href={'/submission'}>
              <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">
                Submit for Poster Presentation
              </Button>
                </Link>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[400px] order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Poster Presentation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 px-6 inline-flex items-center">
                  <span className="text-[#1a2e1a] font-medium">Engage in meaningful discussions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Present Online Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Virtual Presentation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 px-6 inline-flex items-center">
                  <span className="text-[#1a2e1a] font-medium">Present from anywhere in the world</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#d3e4c5] rounded-full p-3 mr-4">
                  <Monitor className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a]">Present Online</h2>
              </div>
              <p className="text-[#4d724d] mb-6">
                Can't attend in person? Present your research virtually through our dedicated online platform. This
                option provides flexibility while still allowing for meaningful engagement.
              </p>

              <div className="bg-[#f8faf5] rounded-3xl p-6 mb-6">
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-4">What to Prepare:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">PowerPoint or PDF presentation (16:9 format)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">Stable internet connection (minimum 5 Mbps upload)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">Webcam and quality microphone</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a2e1a]" />
                    </div>
                    <span className="text-[#4d724d]">Pre-recorded backup of your presentation</span>
                  </li>
                </ul>
              </div>
              <Link href={'/submission'}>
              <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">
                Submit for Virtual Presentation
              </Button>
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Presentation Guidelines Section */}
      <section className="py-16 bg-[#f8faf5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-12 text-center">Presentation Guidelines</h2>
            <p className="text-[#4d724d] text-center mb-8">
              Regardless of your presentation mode, please adhere to the following guidelines to ensure a smooth and
              engaging experience for all participants:
            </p>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="grid grid-cols-1 gap-6">
                {presentationGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-[#d3e4c5] rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-[#1a2e1a] font-bold text-xl">{index + 1}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-[#4d724d]">{guideline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#edf6e1]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-2">Ready to present your research?</h3>
                <p className="text-[#4d724d] max-w-xl">
                  Choose your preferred presentation mode and submit your proposal for ICSIFT 2025.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
              <Link href={'/submission'}>
                <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full whitespace-nowrap">
                  Submit Your Presentation
                </Button>
                </Link>
                <Link
                  href="/papers-format"
                  className="inline-flex items-center justify-center rounded-full border border-[#4d724d] px-4 py-2 text-sm font-medium text-[#1a2e1a] hover:bg-[#d3e4c5]/50 transition-colors"
                >
                  View Format Guidelines <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
