"use client"

import { motion } from "framer-motion"
import { ChevronRight, Shield, Lock, Eye, Server, Cookie, UserCheck } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PrivacyPolicy() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const policies = [
    {
      title: "How We Collect Your Information",
      icon: <Eye className="h-6 w-6 text-[#4d724d]" />,
      content: [
        "We collect information when you:",
        "• Register for the conference",
        "• Submit papers or abstracts",
        "• Contact our support team",
        "• Take part in surveys",
        "• Join our in-person or virtual events",
        "",
        "This typically includes basic details like your name, email, affiliation, and research interests. We'll always tell you when we need any information and why.",
      ].join("\n"),
    },
    {
      title: "What We Do With Your Information",
      icon: <Server className="h-6 w-6 text-[#4d724d]" />,
      content: [
        "Your information helps us:",
        "• Process your conference registration",
        "• Review and publish submitted papers",
        "• Keep you updated about the event",
        "• Answer your questions",
        "• Make our services better",
        "• Connect you with other researchers and participants",
        "",
        "We use your data only for these specific purposes and nothing else.",
      ].join("\n"),
    },
    {
      title: "Sharing Your Information",
      icon: <UserCheck className="h-6 w-6 text-[#4d724d]" />,
      content: [
        "We only share your information with:",
        "• Our trusted service providers who help run the conference",
        "• Academic indexing services for published papers (with your consent)",
        "• Legal authorities if required by law",
        "",
        "We never sell your personal information to third parties. Your research and academic contributions may be published in conference proceedings with your explicit consent.",
      ].join("\n"),
    },
    {
      title: "Keeping Your Information Safe",
      icon: <Lock className="h-6 w-6 text-[#4d724d]" />,
      content: [
        "We protect your information by:",
        "• Using secure servers",
        "• Limiting access to authorized staff",
        "• Regular security updates",
        "• Encrypting sensitive data",
        "",
        "While we work hard to protect your data, no online system is 100% secure. We recommend using strong passwords and keeping your login details private.",
      ].join("\n"),
    },
    {
      title: "About Cookies",
      icon: <Cookie className="h-6 w-6 text-[#4d724d]" />,
      content: [
        "We use cookies to:",
        "• Remember your preferences",
        "• Improve your browsing experience",
        "• Analyze how our website is used",
        "• Manage your login session",
        "",
        "You can control cookies through your browser settings. Want to know more? Visit our Cookie Policy page.",
      ].join("\n"),
    },
    {
      title: "Your Privacy Rights",
      icon: <Shield className="h-6 w-6 text-[#4d724d]" />,
      content: [
        "You have the right to:",
        "• See what information we have about you",
        "• Update your information",
        "• Delete your information (except where we have legal obligations to retain it)",
        "• Opt out of communications",
        "• Withdraw consent for publishing your research",
        "",
        "To exercise these rights, contact our privacy team at privacy@icsift.com",
      ].join("\n"),
    },
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
              <span> 2<sup>nd</sup>ICSIFT 2025</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-[#1a2e1a]"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              Your Privacy Matters
            </motion.h1>

            <div className="h-1 w-20 bg-gradient-to-r from-[#4d724d] to-[#d3e4c5] mx-auto mb-8 rounded-full"></div>

            <motion.p
              className="text-lg text-[#4d724d]"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Simple, clear information about how we protect your data
            </motion.p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-10 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative backdrop-blur-sm bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden mb-10 shadow-sm">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4d724d] to-[#d3e4c5] p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                      <Shield className="h-6 w-6 text-[#4d724d]" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1a]">ICSIFT Privacy Policy</h2>
                </div>

                <p className="text-[#4d724d] mb-6">
                  We believe in being clear and open about how we collect and use your data. This privacy policy
                  explains how the International Conference on Sustainability, Innovation and Future Technologies
                  (ICSIFT) handles your personal information.
                </p>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  {policies.map((policy, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-[#d3e4c5] rounded-xl backdrop-blur-sm bg-white overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#f8faf5] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f8faf5]">
                            {policy.icon}
                          </div>
                          <span className="text-lg font-medium text-[#1a2e1a]">{policy.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-[#4d724d] whitespace-pre-line">
                        {policy.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="relative backdrop-blur-sm bg-white rounded-2xl border border-[#d3e4c5] overflow-hidden p-8 text-center shadow-sm">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#4d724d]/10 via-transparent to-[#d3e4c5]/20 opacity-50"></div>

              <div className="relative">
                <h3 className="text-xl font-semibold text-[#1a2e1a] mb-4">Need Help?</h3>
                <p className="text-[#4d724d] mb-6">
                  If you have any questions about your privacy, please email our privacy team at{" "}
                  <a
                    href="mailto:info@icsift.com"
                    className="text-[#1a2e1a] font-medium hover:underline transition-colors"
                  >
                    info@icsift.com
                  </a>{" "}
                  or call us at +91 78488 54815.
                </p>
                <p className="text-sm text-[#4d724d]/80">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
