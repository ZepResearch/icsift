"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Users, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ReserveButton } from "./reserve-button"
import { motion } from "framer-motion"

export default function ConferenceHero() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const starsArray = [...Array(20)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      opacity: Math.random() * 0.5 + 0.2,
      animationDuration: `${Math.random() * 5 + 3}s`,
    }))
    setStars(starsArray)
  }, [])

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0a1f0a] via-[#0d2b0d] to-[#071807] text-white">
      {/* Background Elements */}
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1713829608602-abfcfde350ce?q=80&w=2016&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) contrast(1.2)",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* Aurora Effect */}
      <div className="absolute inset-0 z-[1] opacity-40">
        <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-[#4ade80]/20 via-[#22c55e]/10 to-transparent"></div>
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[40vh] rounded-full bg-[#4ade80]/20 blur-[100px] animate-pulse"></div>
        <div
          className="absolute top-[20%] right-[5%] w-[40%] h-[30vh] rounded-full bg-[#22c55e]/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 z-[1]">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              opacity: star.opacity,
              animation: `twinkle ${star.animationDuration} infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-20 flex flex-col h-full">
        {/* Top Section - Restructured Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-16">
          {/* Left Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold mb-6">
                <span className="text-white">
                  3<sup>rd</sup> International Conference
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-[#bfe99d]">
                  on Sustainability, Innovation and Future Technologies
                </span>
              </h1>
              <p className="text-green-200/80 text-xl max-w-2xl">
                Shaping a Sustainable Future Through Innovation and Emerging Technologies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link href="/about-conference">
                <Button className="bg-gradient-to-r from-[#a9ce8a] to-emerald-600 hover:from-[#a9ce8a]/80 hover:to-emerald-700 text-white border-0 rounded-full px-10 py-6 h-auto text-lg font-medium">
                  Learn More
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <ReserveButton className="bg-transparent hover:bg-white/10 text-white border border-[#bfe99d]/70 rounded-full px-8 py-6 h-auto text-lg font-medium drop-shadow-2xl" />
            </motion.div>

            {/* Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="backdrop-blur-xl bg-white/20 border border-white/10 rounded-3xl overflow-hidden max-w-4xl">
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-6">
                    <Image
                      src={"/assets/zepresearch.png"}
                      alt="Zep Research"
                      width={100}
                      height={40}
                      className="h-12 w-auto object-contain"
                    />
                    <Image
                      src={"/assets/clarivate.png"}
                      alt="Clarivate"
                      width={120}
                      height={40}
                      className="h-12 w-auto object-contain"
                    />
                    <Image
                      src={"/assets/scopus.png"}
                      alt="Scopus"
                      width={100}
                      height={40}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
          

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:w-[500px] w-full"
          >
            <div className="backdrop-blur-xl bg-[#edf6e1]/10 border border-white/10 rounded-3xl overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
                    backgroundSize: "50px 50px",
                  }}
                ></div>
              </div>

              <div className="relative p-3">
                {/* CPD Logo */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-center items-center">
                    <Image
                      src="/assets/cpd2.png"
                      alt="CPD"
                      width={150}
                      height={192}
                      className="h-48 w-auto mx-auto"
                    />
                    <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap text-center mt-4">
                      18 CPD Hours
                    </span>
                  </div>
                </div>

                {/* CPD Information */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white text-center">Continuing Professional Development</h3>
                  <p className="text-green-200/80 text-sm leading-relaxed text-center">
                    Commit to lifelong learning and professional growth through CPD. Enhance your skills, knowledge, and
                    competencies to stay current in your field and maintain professional standards.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                    <a
                      href="https://www.cpdstandards.com/become-accredited/events-conferences/"
                      className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-300 text-center border border-white/20"
                    >
                      Learn More
                    </a>
                    <a
                      href="/registration"
                      className="border-2 border-[#bfe99d]/70 text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#bfe99d]/10 transition-colors duration-300 text-center"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
  <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="   "
            >
              <div className="backdrop-blur-xl max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">Conference Details</h3>

                  <div className="space-y-6 mb-2 flex justify-between flex-row">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                        <Calendar className="w-6 h-6 text-[#bfe99d]" />
                      </div>
                      <div>
                        <p className="text-green-200/60 text-sm">Date</p>
                        <p className="text-white text-lg font-medium">
                          August  20<sup>th</sup> - 21<sup>st</sup>, 2026
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-[#bfe99d]" />
                      </div>
                      <div>
                        <p className="text-green-200/60 text-sm">Location</p>
                        <p className="text-white text-lg font-medium">Boracay, philippines</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-[#bfe99d]" />
                      </div>
                      <div>
                        <p className="text-green-200/60 text-sm">Format</p>
                        <p className="text-white text-lg font-medium">In-person & Virtual</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#bfe99d] text-[#bfe99d]" />
                          ))}
                        </div>
                        <span className="ml-2 text-white">4.8 rating</span>
                      </div>
                      <span className="text-green-200/60 text-sm">500+ attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-auto pt-10 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-center items-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center">We strive to build a sustainable future.</h3>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
