"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { addDays } from "date-fns"

const scheduleData = [
  {
    date: "December 26 | Day 1",
    items: [
      { time: "8:00AM - 9:15AM", title: "Registration" },
      { time: "9:15AM - 9:30AM", title: "Inaugural Function" },
      { time: "9:30AM - 10:00AM", title: "Keynote Speech (Session 1)" },
      { time: "10:00AM - 10:15AM", title: "Coffee Break" },
      { time: "10:15AM - 10:30AM", title: "Introduction to the Session Chairs" },
      { time: "10:30AM - 01:00PM", title: "1st Session: Sustainable Innovation" },
      { time: "01:00PM - 02:00PM", title: "Lunch Break" },
      { time: "02:00PM - 02:30PM", title: "Keynote Speech: Future of Green Technology" },
      { time: "2:30PM - 5:00PM", title: "2nd Session: Climate Change Solutions" },
      { time: "5:00PM - 6:30PM", title: "Welcome Reception & Networking" },
    ],
  },
  {
    date: "December 27 | Day 2",
    items: [
      { time: "8:30AM - 9:00AM", title: "Registration" },
      { time: "9:00AM - 9:30AM", title: "Day 2 Opening Remarks" },
      { time: "9:30AM - 10:00AM", title: "Keynote Speech: Circular Economy" },
      { time: "10:00AM - 10:15AM", title: "Coffee Break" },
      { time: "10:15AM - 10:30AM", title: "Introduction to the Session Chairs" },
      { time: "10:30AM - 01:00PM", title: "3rd Session: Renewable Energy Innovations" },
      { time: "01:00PM - 02:00PM", title: "Lunch Break" },
      { time: "02:00PM - 03:30PM", title: "Panel Discussion: Future of Sustainability" },
      { time: "3:30PM - 4:00PM", title: "Coffee Break" },
      { time: "4:00PM - 5:00PM", title: "Awards Ceremony & Closing Remarks" },
      { time: "5:00PM - 6:30PM", title: "Farewell Reception" },
    ],
  },
]

export default function ConferenceSchedule() {
  const startDate = new Date(2025, 11, 26) // December 26, 2025
  const [selectedDates, setSelectedDates] = useState([startDate, addDays(startDate, 1)])

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
              Join us December 27-28, 2025 for two days of cutting-edge insights and networking on sustainability and
              innovation. Reserve your spot today!
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <Card className="border-[#4d724d] rounded-3xl shadow-sm overflow-hidden">
              <CardHeader className="bg-[#4d724d] text-white">
                <CardTitle>December 2025</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={setSelectedDates}
                  month={startDate}
                  className="w-full"
                  classNames={{
                    day_selected: "bg-[#4d724d] text-white hover:bg-[#3c5c3c] focus:bg-[#3c5c3c]",
                    day_today: "bg-[#d3e4c5] text-[#1a2e1a]",
                  }}
                />
              </CardContent>
            </Card>

            <ScrollArea className="h-[600px]">
              <div className="space-y-8">
                {scheduleData.map((day, index) => (
                  <Card key={index} className="border-[#d3e4c5] rounded-3xl shadow-sm overflow-hidden">
                    <CardHeader className="bg-[#edf6e1]">
                      <CardTitle className="text-[#1a2e1a]">{day.date}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {day.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className={cn(
                              "grid grid-cols-[140px_1fr] gap-4 p-3 rounded-lg",
                              "bg-[#f8faf5] hover:bg-[#d3e4c5]/30 transition-colors",
                            )}
                          >
                            <div className="text-sm font-medium text-[#4d724d]">{item.time}</div>
                            <div className="text-sm text-[#1a2e1a]">{item.title}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Venue</h3>
                <p className="text-[#4d724d] mb-2">Queen Sirikit National Convention Center</p>
                <p className="text-[#">Ratchadaphisek Road, Bangkok 10110, Thailand</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">Registration</h3>
                <p className="text-[#4d724d] mb-2">Registration opens at 8:00 AM on Day 1 and 8:30 AM on Day 2.</p>
                <p className="text-[#4d724d]">
                  Please bring your confirmation email and ID for a smooth check-in process.
                </p>
              </div>
            </div>
          </div>

          {/* Download Schedule Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 flex items-center">
              Download Full Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
