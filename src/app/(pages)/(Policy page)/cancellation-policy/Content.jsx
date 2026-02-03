"use client"

import { motion } from "framer-motion"
import { ChevronRight, FileText, Info, ArrowLeft, CrossIcon, StopCircle, X, DollarSign } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function CancellationPolicy() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const cancellationFees = [
    { period: "60+ days before the conference", refund: "100% refund (minus processing fee)" },
    // { period: "30-59 days before the conference", refund: "50% refund" },
    { period: "Less than 60 days before the conference", refund: "No refund" },
  ]

  return (
    <main className="pt-20 min-h-screen bg-[#f8faf5]">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-[#4d724d]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#d3e4c5]/30 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4d724d 1px, transparent 1px), linear-gradient(to bottom, #4d724d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-[#4d724d]/30 bg-[#4d724d]/10 px-4 py-1.5 text-sm font-medium text-[#1a2e1a] backdrop-blur-md mb-6">
              <span>2<sup>nd</sup>ICSIFT 2025</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-[#1a2e1a]"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              Cancellation Policy
            </motion.h1>

            <div className="h-1 w-20 bg-gradient-to-r from-[#4d724d] to-[#d3e4c5] mx-auto mb-8 rounded-full"></div>

            <motion.p
              className="text-lg text-[#4d724d]"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our refund and cancellation guidelines for 2<sup>nd</sup>ICSIFT 2025
            </motion.p>
          </div>
        </div>
      </section>

      {/* Cancellation Policy Content */}
      <section className="py-10 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative backdrop-blur-sm bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden mb-8 shadow-sm">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4d724d] to-[#d3e4c5] p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                      <FileText className="h-6 w-6 text-[#4d724d]" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1a]">Overview</h2>
                </div>

                <p className="text-[#4d724d] mb-6">
                  We understand that plans can change. Our cancellation policy is designed to be fair to all parties
                  involved. Please read this policy carefully before registering for the International Conference on
                  Sustainability, Innovation and Future Technologies (ICSIFT).
                </p>
              </div>
            </div>

            <div className="relative backdrop-blur-sm bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden mb-8 shadow-sm">
              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4d724d] to-[#d3e4c5] p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                      <DollarSign className="h-6 w-6 text-[#4d724d]" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1a]">Cancellation Fees</h2>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-[#d3e4c5] backdrop-blur-sm">
                  <Table>
                    <TableHeader className="bg-[#f8faf5]">
                      <TableRow>
                        <TableHead className="text-[#1a2e1a] font-bold border-b border-[#d3e4c5]">
                          Cancellation Period
                        </TableHead>
                        <TableHead className="text-[#1a2e1a] font-bold border-b border-[#d3e4c5]">
                          Refund Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cancellationFees.map((fee, index) => (
                        <TableRow
                          key={index}
                          className="border-b border-[#d3e4c5] hover:bg-[#f8faf5] transition-colors"
                        >
                          <TableCell className="font-medium text-[#1a2e1a]">{fee.period}</TableCell>
                          <TableCell className="text-[#4d724d]">{fee.refund}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* <div className="relative backdrop-blur-sm bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden mb-8 shadow-sm">
              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4d724d] to-[#d3e4c5] p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                      <FileText className="h-6 w-6 text-[#4d724d]" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1a]">How to Cancel</h2>
                </div>

                <p className="text-[#4d724d] mb-4">To cancel your registration, please follow these steps:</p>
                <ol className="list-decimal list-inside space-y-2 text-[#4d724d] ml-4">
                  <li>Contact us</li>
                </ol>
              </div>
            </div> */}

            <Alert className="mb-8 relative backdrop-blur-sm bg-[#f8faf5] border border-[#d3e4c5] text-[#4d724d]">
              <Info className="h-5 w-5 text-[#4d724d]" />
              <AlertTitle className="font-bold text-[#1a2e1a] mb-2">Important Note</AlertTitle>
              <AlertDescription className="text-[#4d724d]">
                All cancellation requests must be submitted through your conference account or via email to
                info@icsift.com. Refunds will be processed to the original form of payment within 10 business days of
                approval.
              </AlertDescription>
            </Alert>

            <div className="relative backdrop-blur-sm bg-white rounded-2xl border border-[#d3e4c5] overflow-hidden p-8 shadow-sm">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#4d724d]/10 via-transparent to-[#d3e4c5]/20 opacity-50"></div>

              <div className="relative">
                <h3 className="text-xl font-semibold text-[#1a2e1a] mb-4">Contact Us</h3>
                <p className="text-[#4d724d] mb-4">
                  If you have any questions about our cancellation policy or need assistance, please don't hesitate to
                  contact our support team:
                </p>
                <p className="text-[#4d724d]">
                  <strong className="text-[#1a2e1a]">Email:</strong> info@icsift.com
                  <br />
                  <strong className="text-[#1a2e1a]">Phone:</strong> +91 82600 80050
                </p>

                <div className="mt-6 text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-[#4d724d] to-[#d3e4c5]"
                  >
                    <span className="px-6 py-2 rounded-full bg-white backdrop-blur-sm text-[#1a2e1a] font-medium hover:bg-[#f8faf5] transition-colors">
                      Contact Support
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
