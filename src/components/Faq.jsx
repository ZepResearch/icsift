"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react"

export default function ConferenceFAQ() {
  const [openIndex, setOpenIndex] = useState(1)

  const faqs = [
    {
      question: "How can I register for the conference?",
      answer:
        "Registration for ICSIFT 2026 is available through our online portal. Early bird registration is open until August 20th - 21st, 2026. You can choose between in-person attendance or virtual participation. Group discounts are available for organizations sending 5 or more attendees.",
    },
    {
      question: "What are the submission guidelines for papers?",
      answer:
        "Papers should be 6-8 pages in length following the provided template. All submissions must be original work not previously published or currently under review elsewhere. Topics should align with the conference themes of sustainability, innovation, or future technologies.",
    },
    {
      question: "Is there financial support available for students?",
      answer:
        "Yes, ICSIFT offers special student pricing for the conference on August 20th - 21st, 2026. Student registration is available at a significantly reduced rate compared to regular registration. To qualify for student pricing, you must provide valid student ID and proof of enrollment. This discounted rate makes the conference more accessible for students while maintaining the same high-quality experience.",
    },
    {
      question: "What accommodation options are available?",
      answer:
        "Accommodation arrangements may vary depending on the venue availability. While we aim to provide accommodation options, we cannot guarantee availability. If you require assistance with accommodation, please contact us at info@icsift.com for more information and potential recommendations.",
    },
    {
      question: "How can I become a sponsor?",
      answer:
        "We offer various sponsorship packages designed to provide visibility and engagement opportunities for organizations committed to sustainability and innovation. Benefits include exhibition space, speaking opportunities, logo placement, and complimentary registrations. Please contact our sponsorship team at info@icsift.com for a detailed prospectus.",
    },
    {
      question: "Is the conference venue accessible?",
      answer:
        "Yes, the venues in Boracay, Philippines are fully accessible with ramps, elevators, accessible restrooms, and designated seating areas. If you have specific accessibility requirements, please indicate them during registration so we can ensure appropriate accommodations.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#f8faf5]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4">
            Frequently Asked
            <span className="relative inline-block mx-2">
              <span className="relative z-10">Questions</span>
              <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
            </span>
          </h2>
          <p className="text-[#4d724d] max-w-2xl mx-auto">
            Find answers to common questions about the 3<sup>rd</sup> ICSIFT 2026. If you don't see your question here, please contact us.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? "bg-[#edf6e1]" : "bg-white"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <h3 className="text-xl font-medium text-[#1a2e1a]">{faq.question}</h3>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === index ? "bg-white" : "bg-[#f8faf5]"
                  }`}
                >
                  {openIndex === index ? (
                    <ArrowUp className="h-5 w-5 text-[#1a2e1a] rotate-215" />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-[#1a2e1a] rotate-215" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-[#4d724d]">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        {/* <div className="mt-12 bg-white rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-[#1a2e1a] mb-4">Still have questions?</h3>
          <p className="text-[#4d724d] mb-6">
            Our team is ready to assist you with any additional questions or concerns you may have about ICSIFT 2024.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f8faf5] rounded-xl p-4">
              <h4 className="font-medium text-[#1a2e1a] mb-2">General Inquiries</h4>
              <p className="text-[#4d724d]">info@icsift.org</p>
            </div>
            <div className="bg-[#f8faf5] rounded-xl p-4">
              <h4 className="font-medium text-[#1a2e1a] mb-2">Registration Support</h4>
              <p className="text-[#4d724d]">registration@icsift.org</p>
            </div>
            <div className="bg-[#f8faf5] rounded-xl p-4">
              <h4 className="font-medium text-[#1a2e1a] mb-2">Paper Submissions</h4>
              <p className="text-[#4d724d]">papers@icsift.org</p>
            </div>
            <div className="bg-[#f8faf5] rounded-xl p-4">
              <h4 className="font-medium text-[#1a2e1a] mb-2">Sponsorship Opportunities</h4>
              <p className="text-[#4d724d]">sponsors@icsift.org</p>
            </div>
          </div>
        </div> */}

        {/* Ways to Participate */}
        {/* <div className="mt-12 space-y-4">
          <h3 className="text-2xl font-bold text-[#1a2e1a] mb-4">Ways to Participate</h3>

          <div className="bg-white rounded-2xl p-6 flex justify-between items-center">
            <h4 className="text-xl font-medium text-[#1a2e1a]">You can present your research</h4>
            <div className="w-10 h-10 rounded-full bg-[#f8faf5] flex items-center justify-center">
              <ChevronDown className="h-5 w-5 text-[#1a2e1a]" />
            </div>
          </div>

          <div className="bg-[#edf6e1] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-medium text-[#1a2e1a]">You can attend as a delegate</h4>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <ChevronUp className="h-5 w-5 text-[#1a2e1a]" />
              </div>
            </div>
            <p className="text-[#4d724d]">
              Join us as a delegate to learn from leading experts in sustainability and innovation. Network with
              researchers, industry professionals, and policymakers from around the world. Gain insights into the latest
              developments and best practices in sustainable technologies.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 flex justify-between items-center">
            <h4 className="text-xl font-medium text-[#1a2e1a]">You can become a sponsor</h4>
            <div className="w-10 h-10 rounded-full bg-[#f8faf5] flex items-center justify-center">
              <ChevronDown className="h-5 w-5 text-[#1a2e1a]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 flex justify-between items-center">
            <h4 className="text-xl font-medium text-[#1a2e1a]">You can volunteer</h4>
            <div className="w-10 h-10 rounded-full bg-[#f8faf5] flex items-center justify-center">
              <ChevronDown className="h-5 w-5 text-[#1a2e1a]" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
