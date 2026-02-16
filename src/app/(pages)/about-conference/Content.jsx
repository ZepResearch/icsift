"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Award, Lightbulb, Globe, ArrowRight } from 'lucide-react'

export default function AboutConferencePage() {
  const conferenceHighlights = [
    {
      icon: <Lightbulb className="h-8 w-8 text-[#4d724d]" />,
      title: "Sustainable Innovation",
      description: "Explore cutting-edge green technologies and sustainable solutions for global challenges.",
    },
    {
      icon: <Globe className="h-8 w-8 text-[#4d724d]" />,
      title: "Global Collaboration",
      description: "Connect with experts, researchers, and industry leaders from around the world.",
    },
    {
      icon: <Award className="h-8 w-8 text-[#4d724d]" />,
      title: "Future Technologies",
      description: "Discover and shape tomorrow's solutions for a more sustainable world.",
    },
  ]

  const whyAttendReasons = [
    {
      title: "Explore Cutting-Edge Innovations",
      description:
        "Gain insights into groundbreaking research and future-focused technologies that are driving sustainable development and shaping tomorrow's world.",
    },
    {
      title: "Engage with Global Experts",
      description:
        "Network with 55+ certified academicians, 125+ research scholars, and 10+ industrial professionals from over 10 countries, all dedicated to sustainability and innovation.",
    },
    {
      title: "Foster Collaboration and Partnerships",
      description:
        "Connect with like-minded professionals and thought leaders to spark new ideas, collaborations, and opportunities for joint projects.",
    },
    {
      title: "Industry Recognition and Awards",
      description:
        "Stand a chance to receive one of 15+ prestigious awards recognizing outstanding contributions to sustainability, innovation, and future technologies.",
    },
    {
      title: "Practical and Actionable Insights",
      description:
        "Participate in dynamic sessions, discussions, and workshops focused on real-world applications and strategies for sustainable growth.",
    },
    {
      title: "Global Exposure",
      description:
        "Showcase your work, share ideas, and contribute to shaping global solutions for a greener, more innovative future.",
    },
  ]

  return (
    <main className="bg-[#f8faf5]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Large circle in top right */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#d3e4c5]/30"></div>

          {/* Small circle in top left */}
          <div className="absolute left-10 top-20 w-24 h-24 rounded-full bg-[#d3e4c5]/50"></div>

          {/* Medium circle in bottom left */}
          <div className="absolute -left-10 bottom-40 w-40 h-40 rounded-full bg-[#d3e4c5]/40"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e1a] mb-6">
              About
              <span className="relative inline-block mx-2 ml-4">
                <span className="relative z-10 ">3<sup>rd </sup>ICSIFT</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
              2026
            </h1>
            <p className="text-xl text-[#4d724d] mb-8">
              3<sup>rd</sup> International Conference on Sustainability, Innovation, and Future Technologies
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center bg-white rounded-full px-5 py-2 shadow-sm">
                <Calendar className="h-5 w-5 text-[#4d724d] mr-2" />
                <span> August 21st - 22nd, 2026</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-5 py-2 shadow-sm">
                <MapPin className="h-5 w-5 text-[#4d724d] mr-2" />
                <span>Boracay, Philippines</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-5 py-2 shadow-sm">
                <Users className="h-5 w-5 text-[#4d724d] mr-2" />
                <span>500+ Global Participants</span>
              </div>
            </div>
            <Link href={"/registration"} >
            <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full px-8 py-6 text-lg">
              Register Now
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About the Conference Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">About the Conference</h2>
              <p className="text-[#4d724d] mb-4">
                The 3<sup>rd</sup> International Conference on Sustainability, Innovation, and Future Technologies 2026, taking place in
                the vibrant city of Boracay, Philippines, aims to engage in discussions and identify how and where
                sustainability, technological innovation, and industrial futures intersect.
              </p>
              <p className="text-[#4d724d] mb-4">
                From August 21st to 22nd, 2026, ICSIFT will gather experts from every sphere to speak on innovative
                research, eco-friendly solutions, and technological advancement.
              </p>
              <p className="text-[#4d724d]">
                The conference involves keynote addresses, panels, and practical workshops to advance knowledge and start
                partnerships to promote sustainable development. With an emphasis on practical, scalable solutions and
                forward-thinking research, ICSIFT 2026 promises to be an inspiring showcase of how new technologies are
                going to drive a more sustainable future for our planet.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <Image
                src="/gallery/ICSIFT_12.jpg"
                alt="Conference"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 px-6 inline-flex items-center">
                  <span className="text-[#1a2e1a] font-medium">Join us in Boracay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-[#edf6e1]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Our Mission</h3>
            <p className="text-xl text-[#4d724d] mb-8">
              The Conference on Sustainable Development aims to bring together leading researchers, policymakers, and
              industry experts to share knowledge, discuss challenges, and forge partnerships that will drive forward the
              global sustainability agenda.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-3xl font-bold text-[#1a2e1a]">500+</h3>
                <p className="text-[#4d724d]">Global Participants</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-3xl font-bold text-[#1a2e1a]">15+</h3>
                <p className="text-[#4d724d]">Country</p>
              </div>

              {/* <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-3xl font-bold text-[#1a2e1a]">1</h3>
                <p className="text-[#4d724d]">Goal: Actionable Strategies for a Sustainable Future</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Conference Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-12 text-center">Conference Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {conferenceHighlights.map((highlight, index) => (
              <div key={index} className="bg-[#f8faf5] rounded-3xl p-8 text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {highlight.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-4">{highlight.title}</h3>
                <p className="text-[#4d724d]">{highlight.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl text-[#4d724d] mb-6">
              Join us in Boracay from August 21st - 22nd, 2026, to be part of a global movement dedicated to sustainability,
              innovation, and the technologies of tomorrow!
            </p>
            <Link href="/schedule" >
            <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full text-lg py-6">
              View Conference Schedule
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-16 bg-[#f8faf5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Why Attend 3<sup>rd</sup>ICSIFT 2026</h2>
            <p className="text-[#4d724d]">
              The International Conference on Sustainability, Innovation, and Future Technologies (ICSIFT) is the ideal
              platform for exploring transformative solutions and advancing sustainable technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyAttendReasons.map((reason, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">{reason.title}</h3>
                <p className="text-[#4d724d]">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Attend Section */}
      <section className="py-16 bg-[#edf6e1]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-12 text-center">Who Can Attend</h2>
<div className="mb-16">
          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-3xl overflow-hidden rounded-3xl">
              <Image
              height={400}
              width={420}
                src="/assets/a5.jpeg"
                alt="Conference highlight 1"
                className="w-full h-64 md:h-130 object-contain"
              />
            </div>
            
          </div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Academicians & Researchers</h3>
              <p className="text-[#4d724d]">
                Present your research, exchange knowledge, and collaborate with peers to advance sustainable
                technologies.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Industry Professionals</h3>
              <p className="text-[#4d724d]">
                Explore innovative solutions and technologies that can drive sustainable growth in your industry.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Policymakers & Government Officials</h3>
              <p className="text-[#4d724d]">
                Gain insights to develop and implement policies supporting sustainability and technological innovation.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Entrepreneurs & Startups</h3>
              <p className="text-[#4d724d]">
                Discover new trends, technologies, and collaboration opportunities to fuel sustainable business growth.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Students & Emerging Scholars</h3>
              <p className="text-[#4d724d]">
                Learn from experts, showcase your research, and build networks to kickstart your career in sustainability
                and innovation.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Environmental Advocates & NGOs</h3>
              <p className="text-[#4d724d]">
                Connect with innovators and explore strategies for driving sustainable change in communities and
                organizations.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-2">Ready to join 3<sup>rd</sup>ICSIFT 2026?</h3>
                <p className="text-[#4d724d] max-w-xl">
                  Register now to secure your spot at the premier conference on sustainability, innovation, and future
                  technologies.
                </p>
              </div>
              <Link
                href="/registration"
                className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 flex items-center whitespace-nowrap"
              >
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

