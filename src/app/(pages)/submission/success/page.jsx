import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, ArrowLeft, Calendar } from "lucide-react"

export default function SubmissionSuccess() {
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
              Submission
              <span className="relative inline-block mx-2">
                <span className="relative z-10">Successful</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>
            <p className="text-xl text-[#4d724d] mb-8">
              Thank you for contributing to ICSIFT 2025: International Conference on Sustainability, Innovation, and
              Future Technologies
            </p>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden shadow-sm">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative p-8 md:p-12 text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#4d724d] p-0.5 mb-6">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#edf6e1]">
                    <CheckCircle className="h-10 w-10 text-[#4d724d]" />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1a2e1a]">Your Paper Has Been Submitted</h2>

                <div className="space-y-6 text-[#4d724d] max-w-2xl mx-auto">
                  <p>
                    Thank you for submitting your paper to ICSIFT 2025: International Conference on Sustainability,
                    Innovation, and Future Technologies. Your contribution is an important part of advancing research
                    and collaboration in sustainability and innovation.
                  </p>

                  <div className="bg-white rounded-xl border border-[#d3e4c5] p-6 text-left">
                    <h3 className="text-xl font-medium text-[#1a2e1a] mb-4">What Happens Next?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-white">1</span>
                        </div>
                        <span>
                          Our scientific committee will review your submission and evaluate it based on relevance,
                          originality, and quality.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-white">2</span>
                        </div>
                        <span>
                          You will receive a notification regarding the status of your submission within 4-6 weeks.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-[#4d724d] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-white">3</span>
                        </div>
                        <span>
                          If accepted, you will receive further instructions on preparing your final paper and
                          presentation.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Calendar className="h-5 w-5 text-[#4d724d]" />
                    <span>Mark your calendar: ICSIFT will take place on December 26-27, 2025</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                  <Button asChild className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">
                    <Link href="/">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Return to Home
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full"
                  >
                    <Link href="/schedule">
                      View Conference Schedule
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
