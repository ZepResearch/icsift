import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XCircle, Calendar, RefreshCw, ArrowRight } from "lucide-react"
import { GeometricShapesCSS } from "@/components/geometric-shapes"

export default function PaymentFailedPage() {
  return (
    <main className="bg-[#f8faf5] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <GeometricShapesCSS />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden p-8 md:p-12 shadow-sm relative">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#c15252]"></div>

              <div className="flex flex-col items-center text-center mb-10">
                <div className="h-20 w-20 rounded-full bg-[#f6e1e1] flex items-center justify-center mb-6">
                  <XCircle className="h-10 w-10 text-[#c15252]" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4">Payment Unsuccessful</h1>
                <p className="text-[#4d724d] text-lg max-w-2xl">
                  We encountered an issue while processing your payment for the International Conference on Sustainability, Innovation and Future Technologies.
                </p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="bg-[#f6e1e1] rounded-xl border border-[#e4c5c5] p-6">
                  <h2 className="text-xl font-bold text-[#1a2e1a] mb-4">Possible Reasons</h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#c15252] flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-[#1a2e1a] font-medium">Card Declined</h3>
                        <p className="text-[#4d724d]">
                          Your card issuer may have declined the transaction. Please check with your bank or try another payment method.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#c15252] flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-[#1a2e1a] font-medium">Gateway Issue</h3>
                        <p className="text-[#4d724d]">
                          There might have been a temporary issue with the payment gateway. Please try again after a few minutes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#c15252] flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-[#1a2e1a] font-medium">Connection Interrupted</h3>
                        <p className="text-[#4d724d]">
                          The connection was interrupted during the payment process. Please ensure you have a stable internet connection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#edf6e1] rounded-xl border border-[#d3e4c5] p-6">
                  <p className="text-[#4d724d]">
                    Please try again or contact our support team at{" "}
                    <a href="mailto:info@icsift.com" className="text-[#4d724d] font-semibold hover:underline">
                      info@icsift.com
                    </a>{" "}
                    if you continue to experience issues.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/registration">
                  <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full w-full sm:w-auto">
                    <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full w-full sm:w-auto"
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Contact Support
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