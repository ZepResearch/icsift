import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, FileText, ArrowRight } from "lucide-react"
import { GeometricShapesCSS } from "@/components/geometric-shapes"

export default function RegistrationSuccessPage() {
  return (
    <main className="bg-[#f8faf5] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <GeometricShapesCSS />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden p-8 md:p-12 shadow-sm relative">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#4d724d]"></div>

              <div className="flex flex-col items-center text-center mb-10">
                <div className="h-20 w-20 rounded-full bg-[#edf6e1] flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-[#4d724d]" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4">Registration Successful!</h1>
                <p className="text-[#4d724d] text-lg max-w-2xl">
                  Thank you for registering for the International Conference on Sustainable Innovation in Food
                  Technology. We look forward to your participation.
                </p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="bg-[#edf6e1] rounded-xl border border-[#d3e4c5] p-6">
                  <h2 className="text-xl font-bold text-[#1a2e1a] mb-4">What's Next?</h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-[#1a2e1a] font-medium">Check Your Email</h3>
                        <p className="text-[#4d724d]">
                          We've sent a confirmation email to your registered email address with all the details of your
                          registration.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-[#1a2e1a] font-medium">Mark Your Calendar</h3>
                        <p className="text-[#4d724d]">
                          The conference will take place on October 10-12, 2023 at the Queen Sirikit National Convention
                          Center in Bangkok, Thailand.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-[#1a2e1a] font-medium">Prepare Your Materials</h3>
                        <p className="text-[#4d724d]">
                          If you've registered for a paper presentation, please prepare your materials according to the
                          guidelines provided on our website.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/schedule">
                  <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full w-full sm:w-auto">
                    <Calendar className="mr-2 h-4 w-4" /> View Schedule
                  </Button>
                </Link>
                <Link href="/papers-format">
                  <Button
                    variant="outline"
                    className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full w-full sm:w-auto"
                  >
                    <FileText className="mr-2 h-4 w-4" /> Paper Guidelines
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="text-[#4d724d] hover:bg-[#d3e4c5]/30 rounded-full w-full sm:w-auto"
                  >
                    Return to Home <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
