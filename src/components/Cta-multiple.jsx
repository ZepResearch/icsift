"use client"

import { useState } from "react"
import { ArrowRight, Award, MapPin, Users, Calendar, BookOpen, Handshake, Play, GalleryThumbnails } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function ConferenceCTACards() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")

  const ctaCards = [
    {
      title: "Awards",
      description:
        "Recognizing groundbreaking contributions in sustainability, innovation, and future technologies that drive positive environmental impact.",
      icon: <Award className="w-10 h-10 text-cyan-400" />,
      link: "/awards",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Venue",
      description:
        "Join us in Bangkok, Thailand for the in-person experience or participate virtually through our interactive conference platform.",
      icon: <MapPin className="w-10 h-10 text-fuchsia-400" />,
      link: "/venue",
      gradient: "from-fuchsia-500 to-purple-600",
    },
    {
      title: "Sponsorship",
      description:
        "Partner with ICSIFT to showcase your organization's commitment to sustainability innovation and gain visibility among industry leaders.",
      icon: <Handshake className="w-10 h-10 text-purple-400" />,
      link: "/exhibit-and-sponsor",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      title: "Committee",
      description:
        "Meet our distinguished panel of sustainability experts, researchers, and thought leaders guiding the conference's vision and quality.",
      icon: <Users className="w-10 h-10 text-pink-400" />,
      link: "/committee",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Schedule",
      description:
        "Explore our comprehensive 2-day agenda featuring keynotes, panel discussions, workshops, and networking events on sustainability topics.",
      icon: <Calendar className="w-10 h-10 text-cyan-400" />,
      link: "/schedule",
      gradient: "from-cyan-500 to-teal-600",
    },
    {
      title: "Gallery",
      description:
        "Our photo gallery showcasing highlights from ICSIFT conferences. View images from keynote presentations, and memorable moments from past conferences.",
      icon: <GalleryThumbnails className="w-10 h-10 text-lime-400" />,
      link: "/gallery",
      gradient: "from-lime-500 to-teal-600",
    },
  ]

  const conferenceVideos = [
    {
      id: "DTUzRphTBWA",
      thumbnail: "/preview.jpg",
      title: "ICSIFT 2024: Sustainability Innovation Highlights",
      description: "Experience the groundbreaking ideas and solutions from our previous conference",
    },
    {
      id: "r1GcUCVStsc",
      thumbnail: "/gallery/2nd-ICSIFT_07.jpg", // Add your second video thumbnail
      title: "The 2nd ICSIFT 2025 | Successfully Concluded in Bangkok",
      description: "Watch inspiring talks from world-renowned sustainability leaders",
    },
    // Add more videos as needed
  ]

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId)
    setVideoOpen(true)
  }

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#f8faf5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4">
            Conference
            <span className="relative inline-block mx-2">
              <span className="relative z-10">Highlights</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>
          </h2>
          <p className="text-[#4d724d] max-w-2xl mx-auto">
            Explore the key features of ICSIFT 2026 and discover opportunities to engage with the global sustainability
            community.
          </p>
        </div>

        {/* CTA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ctaCards.map((card, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-lg"
            >
              <Link href={card.link}>
                {/* Card Background with Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`}></div>

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col text-white">
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-white/80 mb-6 flex-grow">{card.description}</p>

                  <span className="inline-flex items-center text-white font-medium mt-auto group-hover:underline w-full py-2">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 opacity-50"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 opacity-30"></div>
              </Link>
            </div>
          ))}
        </div>

        {/* YouTube Video Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-4xl font-bold text-[#1a2e1a] mb-3">
              Watch Our Conference Highlights
            </h3>
            <p className="text-[#4d724d] max-w-2xl mx-auto">
              Get a glimpse of what to expect at ICSIFT  through our previous conference highlights.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {conferenceVideos.map((video, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="aspect-video relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-20 h-20 rounded-full bg-[#4d724d]/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Video Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h4 className="text-white text-xl font-bold">{video.title}</h4>
                    <p className="text-white/80 text-sm">{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 <div className="mb-16">
          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
              height={400}
              width={420}
                src="/assets/a4.jpeg"
                alt="Conference highlight 1"
                className="w-full h-64 md:h-130 object-contain"
              />
            </div>
            
          </div>
        </div>
        {/* Video Modal */}
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-5xl p-0 bg-black border-none overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&si=k-g8jPTEEUMfGtxM`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>

        {/* Bottom CTA */}
        <div className="mt-12 bg-[#edf6e1] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-[#1a2e1a] mb-2">Ready to join ICSIFT 2026?</h3>
            <p className="text-[#4d724d] max-w-xl">
              Register now to secure your spot at the premier conference on sustainability, innovation, and future
              technologies.
            </p>
          </div>
          <Link
            href="/registration"
            className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 flex items-center"
          >
            Register Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}