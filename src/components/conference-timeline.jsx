"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, FileText, Users, Award, CheckCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { pb } from "@/lib/pocketbase"

// Icon mapping for different event types
const iconMapping = {
  "early-bird": Calendar,
  abstract: FileText,
  "full-paper": FileText,
  registration: Users,
  conference: Calendar,
  notification: CheckCircle,
  award: Award,
  innovation: Lightbulb,
  default: Clock,
}

// Fallback timeline data in case API fails
const fallbackTimelineData = [
  {
    id: "1",
    name: "Abstract Submission Deadline",
    description: "Last date to submit your abstract for review",
    date: "February 15, 2026",
    type: "abstract",
  },
  {
    id: "2",
    name: "Abstract Acceptance Notification",
    description: "Notification of abstract acceptance decisions",
    date: "March 10, 2026",
    type: "notification",
  },
  {
    id: "3",
    name: "Early Bird Registration",
    description: "Register early for discounted rates",
    date: "April 1, 2026",
    type: "early-bird",
  },
  {
    id: "4",
    name: "Full Paper Submission",
    description: "Deadline for full paper submissions",
    date: "May 20, 2026",
    type: "full-paper",
  },
  {
    id: "5",
    name: "Registration Deadline",
    description: "Last date to register for the conference",
    date: "July 30, 2026",
    type: "registration",
  },
  {
    id: "6",
    name: "Conference Dates",
    description: "ICSIFT 2026 Conference",
    date: "August 18-20, 2026",
    type: "conference",
  },
]

export function ConferenceTimeline() {
  const [timelineData, setTimelineData] = useState(fallbackTimelineData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        // Fetch timeline data from PocketBase
        const records = await pb.collection("ICSIFT_date").getFullList({
          sort: "created",
        })

        if (records && records.length > 0) {
          // Transform the records to match our timeline format
          const formattedData = records.map((record) => ({
            id: record.id,
            name: record.name,
            description: record.description,
            date: record.date,
            type: record.type || "default",
          }))

          setTimelineData(formattedData)
        }
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch timeline data:", err)
        // Keep using fallback data if fetch fails
        setError("Unable to load timeline data. Showing fallback data instead.")
        setLoading(false)
      }
    }

    fetchTimelineData()
  }, [])

  return (
    <section className="py-20 relative overflow-hidden bg-[#f8faf5] text-[#1a2e1a]" id="timeline">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#d3e4c5]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d3e4c5]/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4">
            Conference
            <span className="relative inline-block mx-2 ml-4">
              <span className="relative z-10"> Important Dates</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>
          </h2>
          <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>

          <p className="text-lg text-[#4d724d] max-w-2xl mx-auto">
            Key dates to remember for the International Conference on Sustainability, Innovation and Future Technologies
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#4d724d] animate-spin"></div>
              <div
                className="absolute inset-2 rounded-full border-2 border-transparent border-l-[#1a2e1a] animate-spin"
                style={{ animationDuration: "1.5s" }}
              ></div>
              <div
                className="absolute inset-4 rounded-full border-2 border-transparent border-r-[#d3e4c5] animate-spin"
                style={{ animationDuration: "2s" }}
              ></div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="relative backdrop-blur-sm bg-red-900/10 rounded-xl border border-red-400/20 p-6 max-w-md mx-auto">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        {/* Timeline */}
        {!loading && (
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#4d724d]/50 via-[#4d724d]/50 to-[#1a2e1a]/50 rounded-full"></div>

            {/* Timeline items */}
            {timelineData.map((item, index) => {
              const IconComponent = iconMapping[item.type] || iconMapping.default
              const isEven = index % 2 === 0
              const isHovered = hoveredItem === item.id

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative mb-16 last:mb-0"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center`}>
                    {/* Timeline node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          boxShadow: isHovered ? "0 0 20px rgba(77, 114, 77, 0.5)" : "0 0 10px rgba(77, 114, 77, 0.2)",
                        }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#4d724d] to-[#1a2e1a] p-0.5 shadow-lg shadow-[#4d724d]/20"
                      >
                        <div
                          className={cn(
                            "flex h-full w-full items-center justify-center rounded-full transition-colors duration-300",
                            isHovered ? "bg-[#1a2e1a]" : "bg-white",
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "h-5 w-5 transition-colors duration-300",
                              isHovered ? "text-[#d3e4c5]" : "text-[#4d724d]",
                            )}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content card */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? "md:pr-12" : "md:pl-12"} mt-12 md:mt-0`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative backdrop-blur-sm bg-white rounded-xl border border-[#d3e4c5] overflow-hidden p-6 shadow-lg shadow-[#4d724d]/5"
                      >
                        {/* Decorative elements */}
                        <div
                          className={`absolute -inset-px rounded-xl bg-gradient-to-r ${isEven ? "from-[#d3e4c5]/20 via-transparent to-transparent" : "from-transparent via-transparent to-[#d3e4c5]/20"} opacity-50`}
                        ></div>

                        <div className="relative">
                          <h3 className="text-xl font-bold text-[#1a2e1a] mb-2">{item.name}</h3>
                          <p className="text-[#4d724d] mb-3">{item.description}</p>
                          <div
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${isEven ? "bg-[#d3e4c5]/50 text-[#1a2e1a] border border-[#d3e4c5]" : "bg-[#d3e4c5]/30 text-[#1a2e1a] border border-[#d3e4c5]/70"}`}
                          >
                            <Calendar className="mr-1.5 h-3.5 w-3.5" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
