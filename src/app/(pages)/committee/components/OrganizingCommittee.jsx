"use client"

import { useEffect, useState } from "react"
import { Twitter, Linkedin, Globe, Users, Award, GraduationCap,Sparkles } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { pb } from "@/lib/pocketbase"
import Link from "next/link"

export default function CommitteePage() {
  // Mock committee data since we don't have a real database connection
  const [committee, setCommittee] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const records = await pb.collection("ICSIFT_committee").getFullList({
          sort: "name",
          requestKey: null,
        })
        setCommittee(records)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCommittee()
  }, [])
  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-[#f8faf5]">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="relative bg-[#edf6e1] rounded-3xl border border-[#d3e4c5] overflow-hidden shadow-sm p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#4d724d] p-0.5 mb-6 animate-pulse">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <Award className="h-8 w-8 text-[#4d724d]" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-[#1a2e1a] mb-4">
                Loading Committee Data...
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen bg-[#f8faf5]">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="relative bg-[#edf6e1] rounded-3xl border border-[#d3e4c5] overflow-hidden shadow-sm p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#4d724d] p-0.5 mb-6">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <AlertTriangle className="h-8 w-8 text-[#4d724d]" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-[#1a2e1a] mb-4">
                Error Loading Data
              </h2>
              <p className="mt-4 text-[#4d724d]">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
              Organizing
              <span className="relative inline-block mx-2 ml-4  ">
                <span className="relative z-10 ">Committee</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>
            <p className="text-xl text-[#4d724d] mb-8">
              Meet the experts behind 3<sup>rd</sup>ICSIFT 2026: International Conference on Sustainability, Innovation, and Future
              Technologies
            </p>
          </div>
        </div>
      </section>

      {/* Committee Introduction */}
      <section className="py-16 bg-white">
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

                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1a2e1a]">
                  Driving Sustainability Through Collaboration
                </h2>

                <div className="space-y-6 text-[#4d724d]">
                  <p>
                    Our organizing committee brings together experts from diverse fields to create a truly
                    interdisciplinary forum on sustainability and innovation. With backgrounds spanning environmental
                    science, renewable energy, green technology, and sustainable development, they work together to
                    address pressing global challenges and foster innovative approaches to building a more sustainable
                    future.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                  <div className="bg-white rounded-xl border border-[#d3e4c5] p-4">
                    <div className="text-3xl font-bold text-[#4d724d] mb-1">{committee.length}</div>
                    <div className="text-[#4d724d]">Committee Members</div>
                  </div>

                  <div className="bg-white rounded-xl border border-[#d3e4c5] p-4">
                    <div className="text-3xl font-bold text-[#4d724d] mb-1">12+</div>
                    <div className="text-[#4d724d]">Disciplines Represented</div>
                  </div>

                  <div className="bg-white rounded-xl border border-[#d3e4c5] p-4">
                    <div className="text-3xl font-bold text-[#4d724d] mb-1">Global</div>
                    <div className="text-[#4d724d]">Collaboration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Committee Members Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Meet Our Committee</h2>
            <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-[#4d724d] max-w-2xl mx-auto">
              Our committee members bring diverse expertise and perspectives to ensure a successful and impactful
              conference
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {committee.map((member) => (
              <div key={member.id} className="relative group">
                <div className="absolute inset-0 bg-[#d3e4c5]/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></div>

                <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden h-full transition-all group-hover:shadow-md shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-24 bg-[#d3e4c5]/30"></div>

                  <div className="relative p-6 flex flex-col items-center">
                    <div className="relative h-40 w-40 rounded-full p-1 bg-[#4d724d] mb-6">
                      <div className="absolute inset-0 rounded-full bg-[#4d724d] blur-md opacity-50"></div>
                      <Avatar className="h-full w-full border-2 border-white">
                        <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${member.collectionId}/${member.id}/${member.img}`}
                          alt={member.name}
                          className="object-contain bg-[#edf6e1]"
                        />
                        <AvatarFallback className="bg-[#4d724d] text-white text-2xl">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <h3 className="text-xl font-bold text-[#1a2e1a] text-center mb-2">{member.name}</h3>

                    <div className="px-3 py-1 rounded-full bg-[#edf6e1] mb-4">
                      <p className="text-sm text-[#4d724d] font-medium">{member.designation}</p>
                    </div>

                    <p className="text-[#4d724d] text-center mb-3">{member.details}</p>

                    <div className="flex items-center gap-2 mt-auto">
                      <Globe className="h-4 w-4 text-[#4d724d]" />
                      <span className="text-sm text-[#4d724d]/70">{member.country}</span>
                    </div>

                    {/* Social Media Links */}
                    {(member.twitter || member.linkedin) && (
                      <div className="flex gap-3 mt-4">
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#edf6e1] border border-[#d3e4c5] text-[#4d724d] hover:bg-[#4d724d] hover:text-white transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#edf6e1] border border-[#d3e4c5] text-[#4d724d] hover:bg-[#4d724d] hover:text-white transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Committee CTA */}
      <section className="py-16 bg-[#f8faf5]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden p-8 shadow-sm">
              <div className="absolute -inset-px rounded-3xl bg-[#d3e4c5]/20 opacity-50"></div>

              <div className="relative">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Interested in Contributing?</h3>
                <p className="text-[#4d724d] mb-6">
                  We're always looking for passionate experts to join our reviewer pool for future conferences. Share
                  your expertise and help shape the future of sustainability and innovation.
                </p>

                <div className="inline-block">
                  <Link href="/contact" >
                  <button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white px-8 py-3 rounded-full font-medium transition-colors duration-300">
                    Express Interest
                  </button>
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
