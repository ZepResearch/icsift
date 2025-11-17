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

export function ConferenceTimeline() {
  const [timelineData, setTimelineData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        // Fetch timeline data from PocketBase
        const records = await pb.collection("ICSIFT_date").getFullList({
          sort: "created",
          requestKey:null,
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
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline container with left line and right content */}
            <div className="flex flex-col">
              {/* Timeline vertical line */}
              <div className="absolute left-0 md:left-16 top-6 bottom-6 w-1 bg-gradient-to-b from-[#4d724d]/50 via-[#4d724d]/50 to-[#1a2e1a]/50 rounded-full"></div>

              {/* Timeline items */}
              {timelineData.map((item, index) => {
                const IconComponent = iconMapping[item.type] || iconMapping.default
                const isHovered = hoveredItem === item.id
                const isExpired = index === 0 // First card is expired

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative mb-12 last:mb-0 pl-8 md:pl-32"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Timeline node with icon */}
                    <div className="absolute left-0 md:left-16 transform -translate-x-1/2 top-6 z-10">
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          boxShadow: isHovered ? "0 0 20px rgba(77, 114, 77, 0.5)" : "0 0 10px rgba(77, 114, 77, 0.2)",
                        }}
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full p-0.5 shadow-lg shadow-[#4d724d]/20",
                          isExpired 
                            ? "bg-gradient-to-br from-gray-400 to-gray-600" 
                            : "bg-gradient-to-br from-[#4d724d] to-[#1a2e1a]"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-full w-full items-center justify-center rounded-full transition-colors duration-300",
                            isHovered ? (isExpired ? "bg-gray-600" : "bg-[#1a2e1a]") : "bg-white",
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "h-5 w-5 transition-colors duration-300",
                              isHovered 
                                ? (isExpired ? "text-gray-300" : "text-[#d3e4c5]") 
                                : (isExpired ? "text-gray-400" : "text-[#4d724d]"),
                            )}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        "relative backdrop-blur-sm rounded-xl border overflow-hidden p-6 shadow-lg shadow-[#4d724d]/5",
                        isExpired 
                          ? "bg-gray-50 border-gray-300 opacity-60" 
                          : "bg-white border-[#d3e4c5]"
                      )}
                    >
                      {/* Decorative gradient */}
                      <div
                        className={cn(
                          "absolute -inset-px rounded-xl bg-gradient-to-r opacity-50",
                          isExpired 
                            ? "from-gray-300/20 via-transparent to-transparent" 
                            : "from-[#d3e4c5]/20 via-transparent to-transparent"
                        )}
                      ></div>

                      <div className="relative">
                        <h3 className={cn(
                          "text-xl font-bold mb-2 flex items-center gap-2 flex-wrap",
                          isExpired ? "text-gray-500" : "text-[#1a2e1a]"
                        )}>
                          <span className={isExpired ? "line-through" : ""}>
                            {item.name}
                          </span>
                          {isExpired && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              EXPIRED
                            </span>
                          )}
                        </h3>
                        <p className={cn(
                          "mb-3",
                          isExpired ? "text-gray-400 line-through" : "text-[#4d724d]"
                        )}>
                          {item.description}
                        </p>
                        <div
                          className={cn(
                            "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border",
                            isExpired 
                              ? "bg-gray-200/40 text-gray-500 border-gray-300/70 line-through" 
                              : "bg-[#d3e4c5]/40 text-[#1a2e1a] border-[#d3e4c5]/70"
                          )}
                        >
                          <Calendar className="mr-1.5 h-3.5 w-3.5" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Connector line */}
                    <div className={cn(
                      "absolute left-0 md:left-16 top-6 h-0.5 w-8 transform -translate-x-0 md:translate-x-1/2",
                      isExpired ? "bg-gray-400/40" : "bg-[#4d724d]/40"
                    )}></div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}