"use client"

import { motion } from "framer-motion"
import { ChevronRight, FileText, Info, ArrowLeft } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function CancellationPolicy() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const cancellationFees = [
    { period: "60+ days before the conference", refund: "100% refund" },
    { period: "30-59 days before the conference", refund: "50% refund" },
    { period: "Less than 30 days before the conference", refund: "No refund" },
  ]

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-200 backdrop-blur-md mb-6">
              <span>NextGenSynergy</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              Cancellation Policy
            </motion.h1>

            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto mb-8 rounded-full"></div>

            <motion.p
              className="text-lg text-purple-100/90"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our refund and cancellation guidelines for NextGenSynergy
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
            <div className="relative backdrop-blur-sm bg-purple-900/20 rounded-3xl border border-purple-400/20 overflow-hidden mb-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-purple-900/70">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Overview</h2>
                </div>

                <p className="text-purple-100/90 mb-6">
                  We understand that plans can change. Our cancellation policy is designed to be fair to all parties
                  involved. Please read this policy carefully before registering for NextGenSynergy: The Virtual
                  Interdisciplinary Forum.
                </p>
              </div>
            </div>

            <div className="relative backdrop-blur-sm bg-purple-900/20 rounded-3xl border border-purple-400/20 overflow-hidden mb-8">
              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-purple-900/70">
                      <ArrowLeft className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Cancellation Fees</h2>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-purple-400/20 backdrop-blur-sm">
                  <Table>
                    <TableHeader className="bg-purple-900/50">
                      <TableRow>
                        <TableHead className="text-cyan-300 font-bold border-b border-purple-400/30">
                          Cancellation Period
                        </TableHead>
                        <TableHead className="text-cyan-300 font-bold border-b border-purple-400/30">
                          Refund Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cancellationFees.map((fee, index) => (
                        <TableRow
                          key={index}
                          className="border-b border-purple-400/20 hover:bg-purple-900/40 transition-colors"
                        >
                          <TableCell className="font-medium text-white">{fee.period}</TableCell>
                          <TableCell className="text-purple-100">{fee.refund}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="relative backdrop-blur-sm bg-purple-900/20 rounded-3xl border border-purple-400/20 overflow-hidden mb-8">
              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-purple-900/70">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">How to Cancel</h2>
                </div>

                <p className="text-purple-100/90 mb-4">To cancel your registration, please follow these steps:</p>
                <ol className="list-decimal list-inside space-y-2 text-purple-100/90 ml-4">
                  <li>Log in to your conference account</li>
                  <li>Navigate to My Registrations</li>
                  <li>Select the registration you wish to cancel</li>
                  <li>Click on the Cancel Registration button</li>
                  <li>Follow the prompts to complete the cancellation process</li>
                </ol>
              </div>
            </div>

            <Alert className="mb-8 relative backdrop-blur-sm bg-purple-900/30 border border-purple-400/30 text-purple-100">
              <Info className="h-5 w-5 text-cyan-400" />
              <AlertTitle className="font-bold text-white mb-2">Important Note</AlertTitle>
              <AlertDescription className="text-purple-100/90">
                All cancellation requests must be submitted through your conference account. Refunds will be processed
                to the original form of payment within 10 business days of approval.
              </AlertDescription>
            </Alert>

            <div className="relative backdrop-blur-sm bg-purple-900/30 rounded-2xl border border-purple-400/20 overflow-hidden p-8">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 opacity-50"></div>

              <div className="relative">
                <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
                <p className="text-purple-100/80 mb-4">
                  If you have any questions about our cancellation policy or need assistance, please don't hesitate to
                  contact our support team:
                </p>
                <p className="text-purple-100/90">
                  <strong className="text-cyan-400">Email:</strong> info@nextgensynergy.com
                  <br />
                  <strong className="text-cyan-400">Phone:</strong> +91 78488 54815
                </p>

                <div className="mt-6 text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400"
                  >
                    <span className="px-6 py-2 rounded-full bg-purple-900/70 backdrop-blur-sm text-white font-medium hover:bg-purple-900/50 transition-colors">
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
