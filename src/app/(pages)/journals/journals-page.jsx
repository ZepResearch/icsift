"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// --- Types ---

// --- Tab config ---
const INDEX_TABS = [
  { label: "All", value: "all" },
  { label: "Scopus", value: "Scopus" },
  { label: "ABDC", value: "ABDC" },
  { label: "Web of Science", value: "Wos" },
  { label: "Google Scholar", value: "GoogleScholar" },
//   { label: "By ZEP", value: "by_zep" },
]

// Badge colors per index type
const INDEX_BADGE = {
  Scopus:        { bg: "bg-orange-100",  text: "text-orange-700",  label: "Scopus" },
  ABDC:          { bg: "bg-blue-100",    text: "text-blue-700",    label: "ABDC" },
  Wos:           { bg: "bg-purple-100",  text: "text-purple-700",  label: "WoS" },
  GoogleScholar: { bg: "bg-green-100",   text: "text-green-700",   label: "Google Scholar" },
}

// --- Client component ---
export default function JournalsPageClient({ journals }) {
  const [activeTab, setActiveTab] = useState("all")

  const filtered = journals.filter((j) => {
    if (activeTab === "all") return true
    if (activeTab === "by_zep") return j.by_zep === true
    return j.indexType === activeTab
  })

  // Count per tab
  const count = (tab) => {
    if (tab === "all") return journals.length
    if (tab === "by_zep") return journals.filter((j) => j.by_zep).length
    return journals.filter((j) => j.indexType === tab).length
  }

  return (
    <div className="container mx-auto py-24 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Academic Journals
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of academic journals and research publications
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {INDEX_TABS.map((tab) => {
          const isActive = activeTab === tab.value
          const tabCount = count(tab.value)
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                ${isActive
                  ? "bg-lime-600 text-white border-lime-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-lime-400 hover:text-lime-700"
                }
              `}
            >
              {tab.label}
              <span
                className={`
                  text-xs rounded-full px-2 py-0.5 font-semibold
                  ${isActive ? "bg-lime-500 text-white" : "bg-gray-100 text-gray-500"}
                `}
              >
                {tabCount}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((journal) => {
          const badge = journal.indexType ? INDEX_BADGE[journal.indexType] : null
          return (
            <Link href={`/journals/${journal.id}`} key={journal.id} className="group">
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-gray-200 hover:border-gray-300">
                {/* Cover image */}
                <div className="relative h-[300px] bg-gradient-to-t from-lime-300 to-lime-800 w-full overflow-hidden">
                  {journal.imgs ? (
                    <Image
                      src={`https://zep-research.pockethost.io/api/files/Journals/${journal.id}/${journal.imgs}`}
                      alt={journal.title || "Journal cover"}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : journal.img ? (
                    <Image
                      src={journal.img || "/placeholder.svg"}
                      alt={journal.title || "Journal cover"}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image available</span>
                    </div>
                  )}

                  {/* Badges overlay */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    )}
                    {journal.by_zep && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-lime-100 text-lime-800">
                        By ZEP
                      </span>
                    )}
                  </div>
                </div>

                <CardContent className="flex-grow pt-4">
                  <h2 className="text-lg font-medium line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {journal.title || "Untitled Journal"}
                  </h2>
                  {journal.issncode && (
                    <p className="text-sm text-muted-foreground mt-2 font-mono">ISSN: {journal.issncode}</p>
                  )}
                </CardContent>

                <CardFooter className="pt-0">
                  <span className="text-sm font-medium text-primary transition-opacity flex items-center">
                    View Details & Submit Paper
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </CardFooter>
              </Card>
            </Link>
          )
        })}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <p className="text-muted-foreground">No journals found for this category</p>
          </div>
        )}
      </div>
    </div>
  )
}