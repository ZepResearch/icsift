import React from 'react'
import {
    ChevronRight,
    Users,
    FileText,
    Sparkles,
    CreditCard,
    Presentation,
    Headphones,
    DollarSign,
    Ticket,
    Mail,
    Calendar,
    Info,
    ArrowRight,
  } from "lucide-react"
  import Link from "next/link"
import { Button } from '@/components/ui/button'
function ExtraContentBelowTabs() {
  return (
    <div> <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Registration Process</h2>
        <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
        {/* Step 1 */}
        <div className="relative">
          <div className="bg-white rounded-xl border border-[#d3e4c5] p-6 h-full flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-[#4d724d] flex items-center justify-center mb-4">
              <Ticket className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1a2e1a] mb-2">Select Ticket</h3>
            <p className="text-[#4d724d]">Choose the ticket type that suits your needs.</p>
          </div>
          <div className="hidden md:block absolute -right-9 top-1/2 transform -translate-y-1/2 z-10">
            <ArrowRight className="h-8 w-8 text-[#4d724d]   " />
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative">
          <div className="bg-white rounded-xl border border-[#d3e4c5] p-6 h-full flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-[#4d724d] flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1a2e1a] mb-2">Payment</h3>
            <p className="text-[#4d724d]">Securely pay for your selected ticket.</p>
          </div>
          <div className="hidden md:block absolute -right-9 top-1/2 transform -translate-y-1/2 z-10">
            <ArrowRight className="h-8 w-8 text-[#4d724d]" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative">
          <div className="bg-white rounded-xl border border-[#d3e4c5] p-6 h-full flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-[#4d724d] flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1a2e1a] mb-2">Confirmation</h3>
            <p className="text-[#4d724d]">Receive a confirmation email with your ticket details.</p>
          </div>
          <div className="hidden md:block absolute -right-9 top-1/2 transform -translate-y-1/2 z-10">
            <ArrowRight className="h-8 w-8 text-[#4d724d]" />
          </div>
        </div>

        {/* Step 4 */}
        <div>
          <div className="bg-white rounded-xl border border-[#d3e4c5] p-6 h-full flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-[#4d724d] flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1a2e1a] mb-2">Event Day</h3>
            <p className="text-[#4d724d]">Attend the event and enjoy your experience!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Cancellation Policy Section */}
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#edf6e1]/50 border border-[#4d724d]/20 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center mr-4">
                <Info className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2e1a]">Cancellation Policy</h3>
            </div>

            <p className="text-[#4d724d] mb-6">
              We understand that plans can change. Our cancellation policy is designed to be fair and flexible:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#d3e4c5] flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg className="h-3 w-3 text-[#4d724d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#4d724d]">Full refund if cancelled 60+ days before the event</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#d3e4c5] flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg className="h-3 w-3 text-[#4d724d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#4d724d]">50% refund if cancelled 30-59 days before the event</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#d3e4c5] flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg className="h-3 w-3 text-[#4d724d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#4d724d]">No refund if cancelled 30 days or less before the event</span>
              </li>
            </ul>

            <p className="text-[#4d724d] mb-6">
              All cancellations must be made in writing. Transfer of tickets to another person is allowed up to 7
              days before the event.
            </p>

            <Link href="/cancellation-policy">
              <Button
                variant="outline"
                className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full"
              >
                Read Full Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Conference Benefits Section */}
  <section className="py-16 bg-[#f8faf5]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Registration Benefits</h2>
        <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
          <div className="absolute -inset-px rounded-3xl bg-[#d3e4c5]/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                <FileText className="h-6 w-6 text-[#4d724d]" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-[#1a2e1a] mb-3">Conference Materials</h3>
            <p className="text-[#4d724d]">
              Access to all conference proceedings, papers, and presentation materials
            </p>
          </div>
        </div>

        <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
          <div className="absolute -inset-px rounded-3xl bg-[#d3e4c5]/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                <Users className="h-6 w-6 text-[#4d724d]" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-[#1a2e1a] mb-3">Networking Opportunities</h3>
            <p className="text-[#4d724d]">Connect with researchers and professionals from around the world</p>
          </div>
        </div>

        <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
          <div className="absolute -inset-px rounded-3xl bg-[#d3e4c5]/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                <Sparkles className="h-6 w-6 text-[#4d724d]" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-[#1a2e1a] mb-3">Interactive Sessions</h3>
            <p className="text-[#4d724d]">Participate in workshops, panel discussions, and Q&A sessions</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* CTA Section */}
  <section className="py-16 bg-[#f8faf5]">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden p-8 shadow-sm">
          <div className="absolute -inset-px rounded-3xl bg-[#d3e4c5]/20 opacity-50"></div>

          <div className="relative">
            <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Ready to Join ICSIFT 2025?</h3>
            <p className="text-[#4d724d] mb-6">
              Register now to secure your spot at the International Conference on Sustainability, Innovation and
              Future Technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/submission">
              <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">Submit Your Paper</Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-[#4d724d] text-[#1a2e1a] hover:bg-[#d3e4c5]/50 rounded-full"
                >
                  Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default ExtraContentBelowTabs