"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, FileText, Check, ArrowRight } from "lucide-react"

export default function PapersFormatPage() {
  const generalRequirements = [
    "Use the provided templates without modifying margins, font sizes, or styles",
    "Abstract submissions should not exceed 300 words",
    "Full papers should be between 8-12 pages, including figures, tables, and references",
    "Poster presentations should follow the A0 format (841 × 1189 mm) in portrait orientation",
    "All submissions must be in Word file type format",
  ]

  const templates = [
    {
      title: "Abstract Format",
      description: "The abstract should be a concise summary of your research, not exceeding 300 words. It should include the research objectives, methodology, results, and conclusions. Use clear, concise language and avoid jargon or acronyms.",
      file: "/templates/Abstract_Template.docx",
      icon: <FileText className="h-6 w-6 text-[#4d724d]" />,
    },
    {
      title: "Full Paper Format",
      description: "Full papers should be between 3000-5000 words, excluding references and appendices. Use Times New Roman, 12-point font, double-spaced. Include an abstract, keywords, introduction, methodology, results, discussion, conclusion, and references. Follow APA 7th edition for citations and references.",
      file: "/templates/Fullpaper_Template.doc",
      icon: <FileText className="h-6 w-6 text-[#4d724d]" />,
    },
    {
      title: "Poster Format",
      description: "Posters should be designed in A0 size (841 x 1189 mm) in portrait orientation. Use a clear, readable font (at least 24-point for body text, larger for headings). Include a title, authors, affiliation, introduction, methods, results, conclusions, and key references. Use graphics, charts, and images to convey your research visually.",
      file: "/templates/poster.jpg",
      icon: <FileText className="h-6 w-6 text-[#4d724d]" />,
    },
  ]

  return (
    <main className="bg-[#f8faf5]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Geometric shapes */}
          <div
            className="absolute right-[10%] top-[20%] w-32 h-32 bg-[#d3e4c5]/30"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              transform: "rotate(15deg)",
            }}
          ></div>
          <div
            className="absolute left-[15%] bottom-[30%] w-24 h-24 bg-[#d3e4c5]/20"
            style={{
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              transform: "rotate(-10deg)",
            }}
          ></div>

          {/* Small floating circles */}
          <div
            className="absolute left-[20%] top-[15%] w-16 h-16 rounded-full bg-[#d3e4c5]/30 animate-float-slow"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute right-[25%] bottom-[20%] w-12 h-12 rounded-full bg-[#d3e4c5]/20 animate-float"
            style={{ animationDelay: "-2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e1a] mb-6">
              Paper Format
              <span className="relative inline-block mx-2 ml-4">
                <span className="relative z-10">Guidelines</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>
            <p className="text-xl text-[#4d724d] mb-8">Download templates and learn how to format your submission</p>
          </div>
        </div>
      </section>

      {/* Paper Format Guidelines Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                alt="Paper Format Guidelines"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 px-6 inline-flex items-center">
                  <span className="text-[#1a2e1a] font-medium">Ensure your research stands out</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Paper Format Guidelines</h2>
              <p className="text-[#4d724d] mb-4">
                All submissions to 3<sup>rd</sup>ICSIFT 2026 must follow our formatting guidelines to ensure consistency and
                readability. We provide templates for different types of submissions to make this process easier.
              </p>
              <p className="text-[#4d724d] mb-6">
                Please carefully review the guidelines below and use the appropriate template for your submission type.
                Papers that do not follow these guidelines may be returned for revision before being considered for
                review.
              </p>

              <div className="bg-[#f8faf5] rounded-3xl p-6">
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-4">General Requirements</h3>
                <ul className="space-y-3">
                  {generalRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#d3e4c5] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-[#1a2e1a]" />
                      </div>
                      <span className="text-[#4d724d]">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation Style Section */}
      <section className="py-16 bg-[#edf6e1]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2e1a] mb-6">Citation Style</h2>
              <p className="text-[#4d724d] mb-4">
                3<sup>rd</sup>ICSIFT 2026 uses the IEEE citation style for all submissions. Please ensure that your references are
                formatted according to this style. The templates provided include examples of how to format different
                types of references.
              </p>
              <p className="text-[#4d724d]">
                For detailed information on IEEE citation style, please refer to the IEEE Reference Guide available on
                our website or consult the IEEE Editorial Style Manual.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1a2e1a] mb-6">Language</h2>
              <p className="text-[#4d724d] mb-4">
                All submissions must be in English. We recommend having your paper proofread by a native English speaker
                or professional editing service before submission.
              </p>
              <p className="text-[#4d724d]">
                Clear and concise language is essential for effectively communicating your research. Pay particular
                attention to the clarity of your abstract, introduction, and conclusion, as these sections are critical
                for readers to understand the significance of your work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Templates Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Download Templates</h2>
            <p className="text-[#4d724d]">Use our official templates for your submissions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <div key={index} className="bg-[#f8faf5] rounded-3xl p-8 shadow-sm text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {template.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-4">{template.title}</h3>
                <p className="text-[#4d724d] mb-6">{template.description}</p>
                <Link href={template.file}>
                 <Button
                  variant="outline"
                  className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full"
                  >
                  <Download className="mr-2 h-4 w-4" /> Download file
                </Button>
               </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Tips Section */}
      {/* <section className="py-16 bg-[#f8faf5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-12 text-center">Submission Tips</h2>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-[#d3e4c5] rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#1a2e1a] font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a2e1a] mb-1">Start Early</h3>
                    <p className="text-[#4d724d]">
                      Begin preparing your submission well before the deadline to allow time for revisions and
                      formatting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#d3e4c5] rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#1a2e1a] font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a2e1a] mb-1">Follow Guidelines Strictly</h3>
                    <p className="text-[#4d724d]">
                      Adhere to all formatting requirements, including page limits, citation style, and template usage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#d3e4c5] rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#1a2e1a] font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a2e1a] mb-1">Clear Abstract</h3>
                    <p className="text-[#4d724d]">
                      Write a concise, informative abstract that clearly states your research question, methodology, and
                      key findings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#d3e4c5] rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#1a2e1a] font-bold text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a2e1a] mb-1">Proofread Thoroughly</h3>
                    <p className="text-[#4d724d]">
                      Check for grammatical errors, typos, and formatting issues before submission. Consider having a
                      colleague review your paper.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-[#edf6e1]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-2">Ready to submit your paper?</h3>
                <p className="text-[#4d724d] max-w-xl">
                  Download the appropriate template and prepare your submission for 3<sup>rd</sup>ICSIFT 2026.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/submission">

                <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full whitespace-nowrap">
                  Submit Paper
                </Button>
                  </Link>
                <Link
                  href="/theme-and-topics"
                  className="inline-flex items-center justify-center rounded-full border border-[#4d724d] px-4 py-2 text-sm font-medium text-[#1a2e1a] hover:bg-[#d3e4c5]/50 transition-colors"
                >
                  View Research Topics <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
