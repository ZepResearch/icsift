"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Globe, Lightbulb, Users, Shield, Leaf } from 'lucide-react'

export default function ThemeAndTopicsPage() {
  const researchAreas = [
    {
      icon: <Lightbulb className="h-8 w-8 text-[#4d724d]" />,
      title: "Future of Technology and Innovation",
      topics: [
        "Sustainable Smart Cities",
        "Green Technology Solutions",
        "Renewable Energy Innovations",
        "Circular Economy Technologies",
        "AI for Environmental Monitoring",
      ],
    },
    {
      icon: <Users className="h-8 w-8 text-[#4d724d]" />,
      title: "Sustainability Leadership",
      topics: [
        "Corporate Sustainability Strategies",
        "ESG Implementation Frameworks",
        "Sustainable Business Models",
        "Green Leadership Development",
        "Stakeholder Engagement for Sustainability",
      ],
    },
    {
      icon: <Shield className="h-8 w-8 text-[#4d724d]" />,
      title: "Data, Cybersecurity and Trust",
      topics: [
        "Secure Data Management for Sustainability",
        "Privacy in Environmental Monitoring",
        "Blockchain for Sustainable Supply Chains",
        "Cybersecurity in Green Infrastructure",
        "Ethical Data Use in Climate Research",
      ],
    },
    {
      icon: <Leaf className="h-8 w-8 text-[#4d724d]" />,
      title: "Sustainability and Impact",
      topics: [
        "Climate Change Mitigation Strategies",
        "Biodiversity Conservation Technologies",
        "Water Resource Management",
        "Sustainable Agriculture Solutions",
        "Waste Reduction Innovations",
      ],
    },
    {
      icon: <Globe className="h-8 w-8 text-[#4d724d]" />,
      title: "Social Innovation & Global Impact",
      topics: [
        "Community Resilience & Policy Innovation",
        "Interdisciplinary Approaches to Inequality",
        "Youth Empowerment & Eco-Innovation",
        "Migration, Climate Change & Global Mobility",
        "Sustainable Development Goals Implementation",
      ],
    },
  ]

  const submissionSteps = [
    {
      number: "1",
      title: "Prepare Your Abstract",
      description:
        "Submit a 300-word abstract outlining your research question, methodology, findings, and relevance to the sustainability and innovation theme.",
    },
    {
      number: "2",
      title: "Abstract Review",
      description:
        "Abstracts will be reviewed by our interdisciplinary committee. If accepted, you'll be invited to submit a full paper.",
    },
    {
      number: "3",
      title: "Full Paper Submission",
      description:
        "Submit your full paper (8-12 pages) following our formatting guidelines. All papers will undergo a double-blind peer review by experts from relevant disciplines.",
    },
    {
      number: "4",
      title: "Presentation",
      description:
        "Accepted papers will be presented either as oral presentations, poster sessions, or virtual presentations, depending on your preference and the committee's recommendation.",
    },
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
              Theme and
              <span className="relative inline-block mx-2">
                <span className="relative z-10">Topics</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>
            <p className="text-xl text-[#4d724d] mb-8">
              Explore the research areas and themes for 2<sup>nd</sup>ICSIFT 2025
            </p>
          </div>
        </div>
      </section>

      {/* Conference Theme Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block border border-[#1a2e1a] rounded-full px-4 py-1 text-sm mb-6">
                Conference Theme
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">
                "Sustainable Innovation: Bridging Technology and Environmental Stewardship"
              </h2>
              <p className="text-[#4d724d] mb-4">
                2<sup>nd</sup>ICSIFT 2025 explores how innovative technologies are revolutionizing our approach to sustainability and
                environmental challenges. As traditional boundaries between technology and sustainability continue to
                blur, new innovations are enabling unprecedented opportunities for addressing climate change,
                resource scarcity, and environmental degradation.
              </p>
              <p className="text-[#4d724d]">
                This conference brings together researchers, innovators, and thought leaders from diverse disciplines to
                examine the current state and future possibilities of sustainable technologies. We invite contributions
                that highlight innovative approaches to environmental challenges, novel applications of technology for
                sustainability, and critical perspectives on the methodological and ethical implications of these
                emerging solutions.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop"
                alt="Sustainable Innovation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 px-6 inline-flex items-center">
                  <span className="text-[#1a2e1a] font-medium">Shaping a sustainable future through innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-16 bg-[#edf6e1]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">What We'll Cover</h2>
            <p className="text-[#4d724d]">
              Research topics and areas that can be selected for paper submissions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm h-full">
                <div className="bg-[#f8faf5] rounded-2xl p-4 inline-block mb-4">{area.icon}</div>
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-4">{area.title}</h3>
                <ul className="space-y-2">
                  {area.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#1a2e1a] text-xs">•</span>
                      </div>
                      <span className="text-[#4d724d]">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Submit Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">How to Submit Your Work</h2>
            <p className="text-[#4d724d]">
              We welcome submissions from researchers, practitioners, and students across all disciplines. The
              submission process involves the following steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {submissionSteps.map((step, index) => (
              <div key={index} className="bg-[#f8faf5] rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#d3e4c5]/30 rounded-full"></div>
                <div className="relative z-10">
                  <div className="bg-[#4d724d] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-[#1a2e1a] mb-2">{step.title}</h3>
                  <p className="text-[#4d724d]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link href={'/registration'}>
            <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full px-8">
              Register Now
            </Button>
            </Link>
            <Link href={'/submission'}>
            <Button
              variant="outline"
              className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full px-8"
            >
              Submit Paper <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-[#edf6e1]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-2">Ready to contribute?</h3>
                <p className="text-[#4d724d] max-w-xl">
                  Submit your research paper or proposal and be part of the global conversation on sustainability,
                  innovation, and future technologies.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href={'/submission'}>
                 
                <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full whitespace-nowrap">
                  Submit Paper
                </Button>
                </Link>
              
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
