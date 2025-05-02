"use client"

import Image from "next/image"
import { QuoteIcon } from "lucide-react"

export default function ConferenceTestimonials() {
  const testimonials = [
    {
      quote:
        "ICSIFT provided an exceptional platform for sharing our research on sustainable urban development. The connections we made have led to three international collaborations.",
      name: "Dr. Sarah Chen",
      role: "Urban Planning Researcher",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      category: "ACADEMIC PERSPECTIVE",
      color: "bg-[#edf6e1]",
    },
    {
      quote:
        "Partnering with ICSIFT demonstrated our commitment to sustainability, helping us build trust and loyalty with our eco-conscious stakeholders and opening doors to green innovation.",
      name: "Michael Rodriguez",
      role: "Sustainability Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
      category: "INDUSTRY PARTNER",
      color: "bg-[#1a2e1a]",
      textColor: "text-white",
    },
    {
      quote:
        "By participating in ICSIFT, we were able to contribute to a greener future and demonstrate our environmental responsibility while gaining valuable insights from global sustainability leaders.",
      name: "Dr. Thomas Mann",
      role: "Environmental Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop",
      category: "SPEAKER EXPERIENCE",
      color: "bg-[#edf6e1]",
    },
    {
      quote:
        "As a first-time attendee, I was pleasantly surprised by the conference's organization and depth of content. The sustainable practices implemented throughout the event truly practiced what was preached.",
      name: "Emma Watkins",
      role: "Climate Policy Advisor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      category: "ATTENDEE FEEDBACK",
      color: "bg-[#edf6e1]",
    },
  ]

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#f8faf5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-6">
            Sustainability{" "}
            {/* <span className="relative inline-block mx-1">
              <Image
                src="https://images.unsplash.com/photo-1470137237906-d8a4f71e1966?q=80&w=1000&auto=format&fit=crop"
                alt="Sustainable conference"
                width={120}
                height={60}
                className="rounded-xl object-cover"
              />
            </span>{" "} */}
            & innovation{" "}
            {/* <span className="relative inline-block mx-1">
              <Image
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop"
                alt="Green technology"
                width={120}
                height={60}
                className="rounded-xl object-cover"
              />
            </span>{" "} */}
            is our <span className="relative inline-block mx-2">
              <span className="relative z-10">mission</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>.
          </h2>
          <p className="text-[#4d724d] max-w-2xl mx-auto mt-4">
            Our conference's quality and impact are recognized by participants around the world, and we have
            collaborative partnerships across multiple countries.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${testimonial.color} rounded-3xl p-6 relative overflow-hidden ${
                testimonial.textColor || "text-[#1a2e1a]"
              }`}
            >
              <div className="mb-4">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    testimonial.textColor ? "bg-white/20 text-white" : "bg-[#1a2e1a]/10"
                  }`}
                >
                  {testimonial.category}
                </span>
              </div>

              <p className={`mb-8 relative z-10 ${testimonial.textColor ? "text-white/90" : "text-[#1a2e1a]/80"}`}>
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className={`font-medium ${testimonial.textColor || "text-[#1a2e1a]"}`}>{testimonial.name}</p>
                  <p className={`text-sm ${testimonial.textColor ? "text-white/70" : "text-[#4d724d]"}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Quote mark */}
              <div className="absolute bottom-4 right-4 opacity-20">
                <QuoteIcon size={40} className={testimonial.textColor ? "text-white" : "text-[#1a2e1a]"} />
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
            <div className="text-4xl font-bold text-[#1a2e1a] mb-2">94%</div>
            <p className="text-[#4d724d]">
              Of attendees rated their experience as "excellent" or "very good" at our last conference
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
            <div className="text-4xl font-bold text-[#1a2e1a] mb-2">32</div>
            <p className="text-[#4d724d]">Countries represented by speakers and attendees at ICSIFT 2024</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
            <div className="text-4xl font-bold text-[#1a2e1a] mb-2">87%</div>
            <p className="text-[#4d724d]">
              Of participants reported making valuable connections that led to collaboration opportunities
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-[#1a2e1a] mb-4">Join us at ICSIFT 2024</h3>
          <p className="text-[#4d724d] max-w-2xl mx-auto mb-8">
            Be part of the global conversation on sustainability, innovation, and future technologies.
          </p>
          <button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white px-8 py-3 rounded-full font-medium transition-colors duration-300">
            Register Now
          </button>
        </div>
      </div>
    </div>
  )
}
