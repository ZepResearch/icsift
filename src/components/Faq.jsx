"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react"

export default function ConferenceFAQ() {
  const [openIndex, setOpenIndex] = useState(1)

  const faqs = [
    {
      question: "How can I register for the conference?",
      answer:
        "Registration for ICSIFT 2024 is available through our online portal. Early bird registration is open until September 30, 2024. You can choose between in-person attendance or virtual participation. Group discounts are available for organizations sending 5 or more attendees.",
    },
    {
      question: "What are the submission guidelines for papers?",
      answer:
        "Papers should be 6-8 pages in length following the provided template. All submissions must be original work not previously published or currently under review elsewhere. Topics should align with the conference themes of sustainability, innovation, or future technologies. The submission deadline is August 15, 2024.",
    },
    {
      question: "Is there financial support available for students?",
      answer:
        "Yes, ICSIFT offers a limited number of student grants covering registration fees and partial travel support. To apply, students must submit their academic credentials, a recommendation letter from their advisor, and a brief statement explaining how attending the conference will benefit their research. Applications for financial support close on October 1, 2024.",
    },
    {
      question: "What accommodation options are available?",
      answer:
        "We have negotiated special rates with several hotels near the conference venue. These include sustainable and eco-friendly options at various price points. Booking information will be provided in your registration confirmation email. We recommend booking early as December is a popular tourist season in Bangkok.",
    },
    {
      question: "How can I become a sponsor?",
      answer:
        "We offer various sponsorship packages designed to provide visibility and engagement opportunities for organizations committed to sustainability and innovation. Benefits include exhibition space, speaking opportunities, logo placement, and complimentary registrations. Please contact our sponsorship team at sponsors@icsift.org for a detailed prospectus.",
    },
    {
      question: "Is the conference venue accessible?",
      answer:
        "Yes, the Queen Sirikit National Convention Center is fully accessible with ramps, elevators, accessible restrooms, and designated seating areas. If you have specific accessibility requirements, please indicate them during registration so we can ensure appropriate accommodations.",
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
            Find answers to common questions about ICSIFT 2024. If you don't see your question here, please contact us.
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
