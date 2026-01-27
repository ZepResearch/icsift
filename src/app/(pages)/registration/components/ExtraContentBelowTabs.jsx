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
    TrendingUp,
    BookOpen,
    Brain,
    Video,
    Award,
  } from "lucide-react"
  import Link from "next/link"
import { Button } from '@/components/ui/button'
import Guidline from './guidline'
function ExtraContentBelowTabs() {
  return (
    <div> <section className="py-16 bg-white">
  <Guidline />
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
              {/* <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#d3e4c5] flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg className="h-3 w-3 text-[#4d724d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#4d724d]">50% refund if cancelled 30-59 days before the event</span>
              </li> */}
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#d3e4c5] flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg className="h-3 w-3 text-[#4d724d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#4d724d]">No refund if cancelled 60 days or less before the event</span>
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

  {/* Conference Benefits Section
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
          </div> */}

  <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Registration Benefits</h2>
      <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
      <div className="relative bg-white rounded-3xl border overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="absolute -inset-px rounded-3xl bg-gray-100/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
              <FileText className="h-6 w-6 text-lime-900" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Conference Materials</h3>
          <p className="text-[#1a2e1a]">
            Access to all conference proceedings, papers, and presentation materials
          </p>
        </div>
      </div>

      <div className="relative bg-white rounded-3xl border overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="absolute -inset-px rounded-3xl bg-gray-100/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
              <Users className="h-6 w-6 text-lime-900" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Networking Opportunities</h3>
          <p className="text-[#1a2e1a]">Connect with researchers and professionals from around the world</p>
        </div>
      </div>

      <div className="relative bg-white rounded-3xl border overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="absolute -inset-px rounded-3xl bg-gray-100/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
              <Sparkles className="h-6 w-6 text-lime-900" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Interactive Sessions</h3>
          <p className="text-[#1a2e1a]">Participate in workshops, panel discussions, and Q&A sessions</p>
        </div>
      </div>

      <div className="relative bg-white rounded-3xl border overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="absolute -inset-px rounded-3xl bg-gray-100/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
              <TrendingUp className="h-6 w-6 text-lime-900" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Career Development</h3>
          <p className="text-[#1a2e1a]">Learn and share new abilities, career prospects, and business concepts</p>
        </div>
      </div>

      <div className="relative bg-white rounded-3xl border overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="absolute -inset-px rounded-3xl bg-gray-100/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
              <BookOpen className="h-6 w-6 text-lime-900" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Publication Opportunities</h3>
          <p className="text-[#1a2e1a]">Publication in Scopus/WOS/Google Scholar Indexed journals</p>
        </div>
      </div>

      <div className="relative bg-white rounded-3xl border overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="absolute -inset-px rounded-3xl bg-gray-100/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
              <Brain className="h-6 w-6 text-lime-900" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Knowledge Exchange</h3>
          <p className="text-[#1a2e1a]">Gaining and exchanging knowledge with presenters, session chairs, speakers and other attendees</p>
        </div>
      </div>

      <div className="relative bg-white rounded-3xl border overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="absolute -inset-px rounded-3xl bg-gray-100/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
              <Video className="h-6 w-6 text-lime-900" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Video Documentation</h3>
          <p className="text-[#1a2e1a]">Videos of your talk and conference highlights will be posted on Facebook and YouTube for public viewing</p>
        </div>
      </div>

      <div className="relative bg-white rounded-3xl border overflow-hidden p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="absolute -inset-px rounded-3xl bg-gray-100/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4d724d] p-0.5 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
              <Award className="h-6 w-6 text-lime-900" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Digital Certificates</h3>
          <p className="text-[#1a2e1a]">Receive official participation and presentation certificates to enhance your professional profile</p>
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
            <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Ready to Join ICSIFT 2026?</h3>
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