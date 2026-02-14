import PocketBase from "pocketbase"

// Initialize PocketBase
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)


export function getPocketBaseClient() {
  // For server-side rendering, always create a fresh instance
  if (typeof window === "undefined") {
    const pb = new PocketBase("https://zep-research.pockethost.io")
    pb.autoCancellation(false)
    return pb
  }
}
export async function getJournals() {
  try {
    const pb = getPocketBaseClient()

    // Get the start and end dates for 2025
    const startDate = '2025-01-01 00:00:00'
    const endDate = new Date().toISOString().split('T')[0] + ' 23:59:59'

    // Fetch journals from 2025 only, sorted by creation date (newest first)
    // Exclude journals where not_visible is true
    const records = await pb.collection("Journals").getFullList({
      sort: "-created",
      filter: `created >= '${startDate}' && created <= '${endDate}' && not_visible != true`
    })

    return records
  } catch (error) {
    console.error("Error fetching journals:", error)
    return []
  }
}
export async function getJournalById(id) {
  try {
    const pb = getPocketBaseClient()
    const record = await pb.collection("Journals").getOne(id)
    return record
  } catch (error) {
    console.error(`Error fetching journal with ID ${id}:`, error)
    return null
  }
}
// Cache mechanism to prevent excessive API calls
const CACHE_DURATION = 1000 * 60 * 15 // 15 minutes
let cachedData = null
let lastFetchTime = 0

// Update the fetchConferenceData function to handle the PocketBase response properly
export async function fetchConferenceData() {
  const currentTime = Date.now()

  // Return cached data if it's still valid
  if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
    return cachedData
  }

  try {
    // Check if PocketBase URL is configured
    if (!process.env.NEXT_PUBLIC_POCKETBASE_URL) {
      console.warn("PocketBase URL not configured, using fallback data")
      return getFallbackData()
    }

    console.log("Fetching data from PocketBase...")

    // Fetch data from all collections
    const [committee, speakers, dates, materials] = await Promise.all([
      pb.collection("ICSIFT_committee").getFullList({ requestKey: null }),
      pb.collection("ICSIFT_speakers").getFullList({ requestKey: null }),
      pb.collection("ICSIFT_date").getFullList({ requestKey: null }),
      pb.collection("ICSIFT_download_material").getFullList({ requestKey: null }),
    ])

    console.log("Data fetched successfully")

    // Convert PocketBase records to plain objects
    const formattedData = {
      committee: committee.map((member) => ({
        name: member.name || "",
        designation: member.designation || "",
        details: member.details || "",
        country: member.country || "",
      })),
      speakers: speakers.map((speaker) => ({
        name: speaker.name || "",
        role: speaker.role || "",
        bio: speaker.bio || "",
        category: speaker.category || "",
        field: speaker.field || "",
        country: speaker.country || "",
        college: speaker.college || "",
      })),
      importantDates: dates.map((date) => ({
        date: date.date || "",
        name: date.name || "",
        description: date.description || "",
      })),
      materials: materials.map((material) => ({
        title: material.title || "",
        fileUrl: material.file ? pb.getFileUrl(material, material.file) : "#",
      })),
      conferenceInfo: {
        name: "2nd International Conference on Sustainability, Innovation, and Future Technologies 2025",
        location: "Radisson Suites Bangkok Sukhumvit. Address- 23/2 Soi Sukhumvit 13, Khwaeng Khlong Toei Nuea, Khlong Toei, Bangkok 10110, Thailand",
        dates: "December 27-28, 2025",
        description: `The 2nd International Conference on Sustainability, Innovation, and Future Technologies 2025, taking place in the vibrant city of Bangkok, Thailand, aims to engage in discussions and identify how and where sustainability, technological innovation, and industrial futures intersect.

From December 27 to 28, 2025, ICSIFT will gather experts from every sphere to speak on innovative research, eco-friendly solutions, and technological advancement.

The conference involves keynote addresses, panels, and practical workshops to advance knowledge and start partnerships to promote sustainable development. With an emphasis on practical, scalable solutions and forward-thinking research, ICSIFT 2025 promises to be an inspiring showcase of how new technologies are going to drive a more sustainable future for our planet.`,
      },
      registration: {
 name: "2nd International Conference on Sustainability, Innovation, and Future Technologies 2025",
 type: "Multiple (Physical: Foreign locations, Virtual, India)",
 dates: "December 27-28, 2025",
 description: `International Conference with multiple participation options including physical presentation for foreign participants, virtual presentation for foreign participants, and physical presentation for Indian participants.`,
 registrationFees: {
   physicalForeign: {
     academicians: {
       earlyBird: "319 USD",
       regular: "359 USD",
       withScopusQ3Q4: "859 USD",
       withScopusQ1Q2: "1399 USD"
     },
     students: {
       earlyBird: "219 USD",
       regular: "259 USD",
       withScopusQ3Q4: "759 USD",
       withScopusQ1Q2: "1299 USD"
     },
     listeners: {
       earlyBird: "169 USD",
       regular: "199 USD"
     }
   },
   virtualForeign: {
     academicians: {
       earlyBird: "149 USD",
       presentation: "169 USD",
       withScopusQ3Q4: "669 USD",
       withScopusQ1Q2: "1199 USD"
     },
     students: {
       earlyBird: "199 USD",
       presentation: "219 USD",
       withScopusQ3Q4: "719 USD",
       withScopusQ1Q2: "1099 USD"
     },
     listeners: {
       earlyBird: "99 USD",
       presentation: "119 USD"
     }
   },
   physicalIndian: {
     academicians: {
       earlyBird: "9500 INR",
       presentation: "10000 INR",
       withScopusQ3Q4: "40000 INR",
       withScopusQ1Q2: "100000 INR"
     },
     students: {
       earlyBird: "8500 INR",
       presentation: "9000 INR",
       withScopusQ3Q4: "38000 INR",
       withScopusQ1Q2: "98000 INR"
     },
     listeners: {
       earlyBird: "3000 INR",
       presentation: "4000 INR"
     }
   }
 }
},
    }

    console.log("Data formatted successfully")

    // Update cache
    cachedData = formattedData
    lastFetchTime = currentTime

    return formattedData
  } catch (error) {
    console.error("Error fetching conference data:", error)
    // Return fallback data if fetch fails
    return getFallbackData()
  }
}

// Fallback data when PocketBase is not available
function getFallbackData() {
  return {
    committee: [
      {
        name: "Dr. John Smith",
        designation: "Conference Chair",
        details: "Professor of Sustainable Technologies",
        country: "Thailand",
      },
      {
        name: "Dr. Sarah Johnson",
        designation: "Program Committee Chair",
        details: "Associate Professor of Innovation Studies",
        country: "USA",
      },
    ],
    speakers: [
      {
        name: "Prof. Michael Chen",
        role: "Keynote Speaker",
        bio: "Expert in renewable energy technologies and sustainable development",
        category: "Keynote Speaker",
        field: "Renewable Energy",
        country: "Singapore",
        college: "National University of Singapore",
      },
      {
        name: "Dr. Lisa Wong",
        role: "Guest Speaker",
        bio: "Specialist in AI applications for environmental monitoring",
        category: "Guest Speaker",
        field: "Artificial Intelligence",
        country: "Australia",
        college: "University of Melbourne",
      },
    ],
    importantDates: [
      {
        date: "October 15, 2025",
        name: "Abstract Submission Deadline",
        description: "Last date to submit abstracts for review",
      },
      {
        date: "November 10, 2025",
        name: "Notification of Acceptance",
        description: "Authors will be notified of acceptance decisions",
      },
      {
        date: "December 1, 2025",
        name: "Early Bird Registration Deadline",
        description: "Last date for discounted registration fees",
      },
    ],
    materials: [
      {
        title: "Conference Brochure",
        fileUrl: "#",
      },
      {
        title: "Paper Submission Guidelines",
        fileUrl: "#",
      },
    ],
    conferenceInfo: {
      name: "2nd International Conference on Sustainability, Innovation, and Future Technologies 2025",
      location: "Bangkok, Thailand",
      dates: "December 27-28, 2025",
      description: `The 2nd International Conference on Sustainability, Innovation, and Future Technologies 2025, taking place in the vibrant city of Bangkok, Thailand, aims to engage in discussions and identify how and where sustainability, technological innovation, and industrial futures intersect.

From December 27 to 28, 2025, ICSIFT will gather experts from every sphere to speak on innovative research, eco-friendly solutions, and technological advancement.

The conference involves keynote addresses, panels, and practical workshops to advance knowledge and start partnerships to promote sustainable development. With an emphasis on practical, scalable solutions and forward-thinking research, ICSIFT 2025 promises to be an inspiring showcase of how new technologies are going to drive a more sustainable future for our planet.`,
    },
  }
}
