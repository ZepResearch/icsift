"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CONFERENCE } from "@/constants/conference"
import { pb } from "@/lib/pocketbase"
import { matchSpeaker, getSpeakerImageUrl } from "@/lib/matchSpeaker"
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react"

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const monthName = monthNames[CONFERENCE.scheduleDates.month]

// ---- Cleaned-up schedule data with speaker objects ----
const scheduleData = [
  {
    date: `${monthName} ${CONFERENCE.scheduleDates.days[0]} | Day 1`,
    items: [
      { time: "8:30AM - 9:00AM", title: "Registration" },
      { time: "9:00AM - 9:20AM", title: "Introduction by Moderator" },
      { time: "9:20AM - 9:25AM", title: "Book Release" },
      {
        time: "9:25AM - 9:35AM",
        title: "Welcome Speech by Organizing Secretary",
        speaker: { name: "Dr. Liane Vina G Ocampo", affiliation: "Cavite State University" },
      },
      {
        time: "9:35AM - 9:40AM",
        title: "Welcome Remarks",
        speaker: { name: "Dr. Rania D. Abduraup", affiliation: "Sulu State College" },
      },
      {
        time: "9:40AM - 9:45AM",
        title: "Speech by Conference Co-Chair",
        speaker: { name: "Dr. Sherha Ballaho Baybayan", affiliation: "Sulu State College" },
      },
      {
        time: "9:45AM - 9:55AM",
        title: "Speech by Conference Chair",
        speaker: { name: "Dr. Wilson Cordova, LPT, CRS", affiliation: "De La Salle University" },
      },
      {
        time: "9:55AM - 10:00AM",
        title: "Closing Remarks",
        speaker: { name: "Dr. Frissida Asid-Daud, RN, MAN, PhD", affiliation: "Sulu State University" },
      },
      { time: "10:00AM - 10:20AM", title: "☕ Tea Break" },
      {
        time: "10:20AM - 10:35AM",
        title: "Keynote Speech",
        speaker: { name: "Prof. Charisma Samparani Ututalum", affiliation: "Sulu State University" },
      },
      {
        time: "10:35AM - 10:50AM",
        title: "Keynote Speech",
        speaker: { name: "Dr. Waiphot Kulachai", affiliation: "Suan Sunandha Rajabhat University (SSRU)" },
      },
      {
        time: "10:50AM - 11:00AM",
        title: "Session Speech",
        speaker: { name: "Dr. Daisy M. Galgana", affiliation: "Dr. Carlos S. Lanting College" },
      },
      { time: "11:00AM - 1:00PM", title: "Technical Session 1 (Sustainability)" },
      { time: "1:00PM - 2:00PM", title: "🍽️ Lunch Break" },
      {
        time: "2:00PM - 2:10PM",
        title: "Session Speech",
        speaker: {
          name: "Dr. Veronica Sarcino-Almase",
          affiliation: "Polytechnic University of the Philippines - Ragay Campus",
        },
      },
      { time: "2:00PM - 3:30PM", title: "Technical Session 2 (Innovation and Future Technology)" },
      { time: "3:30PM - 4:00PM", title: "☕ Tea Break" },
      {
        time: "4:00PM - 5:00PM",
        title: "Panel Discussion",
        speakers: [
          { name: "Dr. Lance Jay Tristeza Montalban", affiliation: "Iloilo Science and Technology University – Miagao Campus" },
          { name: "Analyn S. Idio-Diola, LPT, MSc, PhD", affiliation: "Pangasinan State University" },
        ],
      },
      { time: "", title: "Valedictory Function" },
    ],
  },
  {
    date: `${monthName} ${CONFERENCE.scheduleDates.days[1]} | Day 2`,
    items: [
      { time: "8:30AM - 9:00AM", title: "Registration" },
      { time: "9:00AM - 9:20AM", title: "Introduction by Moderator" },
      {
        time: "9:20AM - 9:25AM",
        title: "Welcome Speech by Organizing Secretary",
        speaker: { name: "Dr. Rania D. Abduraup", affiliation: "Sulu State University" },
      },
      {
        time: "9:25AM - 9:30AM",
        title: "Speech by Conference Co-Chair",
        speaker: { name: "Dr. Sherha Ballaho Baybayan", affiliation: "Sulu State University" },
      },
      {
        time: "9:30AM - 9:35AM",
        title: "Speech by Conference Chair",
        speaker: { name: "Dr. Wilson Cordova, LPT, CRS", affiliation: "De La Salle University" },
      },
      {
        time: "9:35AM - 9:50AM",
        title: "Keynote Speech",
        speaker: { name: "Prof. Marina Falasca", affiliation: "National Technological University" },
      },
      {
        time: "9:50AM - 10:05AM",
        title: "Keynote Speech",
        speaker: { name: "Helen Boholano", affiliation: "Cebu Normal University" },
      },
      { time: "10:20AM - 10:40AM", title: "☕ Tea Break" },
      {
        time: "10:40AM - 10:55AM",
        title: "Keynote Speech",
        speaker: { name: "Desiderio R. Apag III", affiliation: "Commission on Higher Education (CHED)" },
      },
      {
        time: "10:55AM - 11:10AM",
        title: "Keynote Speech",
        speaker: { name: "Dr. Julie Ann Acebuque-Salido", affiliation: "Aklan State University Banga" },
      },
      {
        time: "11:10AM - 11:20AM",
        title: "Session Speech",
        speaker: { name: "Malikha Ilupa, RAgr, MSA", affiliation: "Sulu State College" },
      },
      {
        time: "11:20AM - 11:30AM",
        title: "Session Speech",
        speaker: { name: "Florante C. Poso, Jr., MCE, PhD", affiliation: "Polytechnic University of the Philippines" },
      },
      { time: "11:30AM - 12:30PM", title: "Technical Session 1 (Sustainability)" },
      { time: "12:30PM - 1:30PM", title: "🍽️ Lunch Break" },
      {
        time: "1:30PM - 1:40PM",
        title: "Session Speech",
        speaker: { name: "Marjohn Villamor Anislag, PhD", affiliation: "Surigao del Norte State University" },
      },
      { time: "1:40PM - 3:30PM", title: "Technical Session 2 (Innovation and Future Technology)" },
      { time: "3:30PM - 3:40PM", title: "☕ Tea Break" },
      {
        time: "3:40PM - 4:30PM",
        title: "Panel Discussion",
        speakers: [
          { name: "Thelma Domingo Palaoag", affiliation: "University of the Cordilleras" },
          { name: "Ferdinand Bulusan, LPT, PhD, EdD", affiliation: "Isabela State University" },
        ],
      },
      { time: "", title: "Valedictory Function" },
    ],
  },
]

// ---- Calendar (unchanged) ----
function CustomCalendar({ selectedDates, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(CONFERENCE.scheduleDates.year, CONFERENCE.scheduleDates.month)
  )
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }

  const days = getDaysInMonth(currentMonth)
  const today = new Date()
  const isCurrentMonth =
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="w-5 h-5 text-[#4d724d]" />
        </button>
        <div className="font-semibold text-[#1a2e1a]">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="w-5 h-5 text-[#4d724d]" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-[#4d724d] py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) return <div key={`empty-${index}`} className="aspect-square" />
          const isSelected = selectedDates.includes(day)
          const isToday = isCurrentMonth && day === today.getDate()
          return (
            <button
              key={day}
              onClick={() => onSelectDate(day)}
              className={cn(
                "aspect-square rounded-md text-sm font-medium transition-colors",
                "hover:bg-[#d3e4c5]/50",
                isSelected && "bg-[#4d724d] text-white hover:bg-[#3c5c3c]",
                isToday && !isSelected && "bg-[#d3e4c5] text-[#1a2e1a]",
                !isSelected && !isToday && "text-[#1a2e1a]"
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---- Speaker avatar (image from PocketBase, fallback initials) ----
function SpeakerAvatar({ name, imageUrl }) {
  const initials = name
    .replace(/^(Dr|Prof|Mr|Mrs|Ms)\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="w-12 h-12 rounded-xl object-cover border border-[#d3e4c5] flex-shrink-0"
      />
    )
  }

  return (
    <div className="w-12 h-12 rounded-xl bg-[#d3e4c5] text-[#3c5c3c] flex items-center justify-center font-semibold text-sm flex-shrink-0">
      {initials || <User className="w-5 h-5" />}
    </div>
  )
}

// ---- One agenda row, styled like the reference card ----
function AgendaItem({ item, speakerMap }) {
  const speakerList = item.speakers || (item.speaker ? [item.speaker] : [])

  // Plain item (no speaker) — registration, breaks, sessions, valedictory
  if (speakerList.length === 0) {
    return (
      <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#f8faf5]">
        <div className="text-sm font-medium text-[#1a2e1a]">{item.title}</div>
        {item.time && (
          <div className="flex items-center gap-1 text-xs font-medium text-[#4d724d] bg-[#edf6e1] px-3 py-1 rounded-full whitespace-nowrap">
            <Clock className="w-3.5 h-3.5" />
            {item.time}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {speakerList.map((sp, i) => {
        const matched = speakerMap.get(sp.name)
        return (
          <div
            key={i}
            className="flex gap-4 p-4 rounded-xl bg-white border border-[#edf6e1] hover:border-[#d3e4c5] transition-colors"
          >
            <SpeakerAvatar name={sp.name} imageUrl={matched?.imageUrl} />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#1a2e1a] text-sm">{item.title}</div>
              <div className="text-sm text-[#4d724d] mt-0.5">
                {sp.name} · {sp.affiliation}
              </div>
              {item.time && (
                <div className="inline-flex items-center gap-1 text-xs font-medium text-[#4d724d] bg-[#edf6e1] px-2.5 py-1 rounded-full mt-2">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              )}
              {matched?.category && (
                <span className="ml-2 inline-flex items-center text-xs font-medium text-[#3c5c3c] bg-[#d3e4c5]/60 px-2.5 py-1 rounded-full mt-2">
                  {matched.category}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ConferenceSchedule() {
  const [selectedDates, setSelectedDates] = useState(CONFERENCE.scheduleDates.days)
  const [speakerMap, setSpeakerMap] = useState(new Map())
  const [loading, setLoading] = useState(true)

  // Fetch PocketBase speakers once, build a name -> {imageUrl, category, raw} lookup
  useEffect(() => {
    let isMounted = true

    async function loadSpeakers() {
      try {
        const records = await pb.collection("ICSIFT_speakers").getFullList({
          sort: "order",
          requestKey: null,
        })

        // collect every unique agenda speaker name across both days
        const agendaNames = []
        scheduleData.forEach((day) =>
          day.items.forEach((item) => {
            if (item.speaker) agendaNames.push(item.speaker.name)
            if (item.speakers) item.speakers.forEach((s) => agendaNames.push(s.name))
          })
        )

        const map = new Map()
        agendaNames.forEach((name) => {
          const match = matchSpeaker(name, records)
          if (match) {
            map.set(name, {
              imageUrl: getSpeakerImageUrl(match),
              category: match.category,
              bio: match.bio,
            })
          }
        })

        if (isMounted) setSpeakerMap(map)
      } catch (err) {
        console.error("Failed to load speakers from PocketBase:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadSpeakers()
    return () => {
      isMounted = false
    }
  }, [])

  const handleSelectDate = (day) => {
    setSelectedDates((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const calendarTitle = useMemo(
    () => `${monthNames[CONFERENCE.scheduleDates.month]} ${CONFERENCE.scheduleDates.year}`,
    []
  )

  return (
    <div className="bg-[#f8faf5] py-16">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a2e1a]">
              Conference
              <span className="relative inline-block mx-2">
                <span className="relative z-10">Schedule</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>
            <p className="text-[#4d724d] text-xl max-w-2xl mx-auto">
              Join us {CONFERENCE.date} for two days of cutting-edge insights and networking on
              sustainability and innovation. Reserve your spot today!
            </p>
          </div>

          {/* Left calendar: sticky / fixed in place. Right schedule: independently scrollable */}
          <div className="grid gap-8 lg:grid-cols-[320px_1fr] items-start">
            <Card className="border-[#4d724d] rounded-3xl shadow-sm overflow-hidden h-fit lg:sticky lg:top-24">
              <CardHeader className="bg-[#4d724d] text-white">
                <CardTitle>{calendarTitle}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CustomCalendar selectedDates={selectedDates} onSelectDate={handleSelectDate} />
              </CardContent>
            </Card>

            {/* Right side: own scroll container, independent of page scroll */}
            <div className="space-y-8 lg:h-[80vh] lg:overflow-y-auto pr-2 lg:pr-4">
              {loading && (
                <div className="text-sm text-[#4d724d] px-2">Loading speaker details…</div>
              )}
              {scheduleData.map((day, index) => (
                <Card
                  key={index}
                  className="bg-white border-[#d3e4c5] rounded-3xl shadow-sm overflow-hidden"
                >
                  <CardHeader className="bg-[#edf6e1]">
                    <CardTitle className="text-[#1a2e1a]">{day.date}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {day.items.map((item, itemIndex) => (
                        <AgendaItem key={itemIndex} item={item} speakerMap={speakerMap} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Venue</h3>
                <p className="text-[#4d724d] mb-2">{CONFERENCE.venue.name}</p>
                <p className="text-[#4d724d]">{CONFERENCE.venue.location}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Registration</h3>
                <p className="text-[#4d724d] mb-2">Registration opens at 8:30 AM on both days.</p>
                <p className="text-[#4d724d]">
                  Please bring your confirmation email and ID for a smooth check-in process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}