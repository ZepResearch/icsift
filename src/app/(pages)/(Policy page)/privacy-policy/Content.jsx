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
      icon: <Eye className="h-6 w-6 text-cyan-400" />,
      content: [
        "We collect information when you:",
        "• Register for the conference",
        "• Contact our support team",
        "• Take part in surveys",
        "• Join our virtual events",
        "",
        "This typically includes basic details like your name and email. We'll always tell you when we need any information and why.",
      ].join("\n"),
    },
    {
      title: "What We Do With Your Information",
      icon: <Server className="h-6 w-6 text-fuchsia-400" />,
      content: [
        "Your information helps us:",
        "• Process your conference registration",
        "• Keep you updated about the event",
        "• Answer your questions",
        "• Make our services better",
        "",
        "We use your data only for these specific purposes and nothing else.",
      ].join("\n"),
    },
    {
      title: "Sharing Your Information",
      icon: <UserCheck className="h-6 w-6 text-purple-400" />,
      content: [
        "We only share your information with:",
        "• Our trusted service providers who help run the conference",
        "• Legal authorities if required by law",
        "",
        "We never sell your personal information to third parties.",
      ].join("\n"),
    },
    {
      title: "Keeping Your Information Safe",
      icon: <Lock className="h-6 w-6 text-cyan-400" />,
      content: [
        "We protect your information by:",
        "• Using secure servers",
        "• Limiting access to authorized staff",
        "• Regular security updates",
        "",
        "While we work hard to protect your data, no online system is 100% secure. We recommend using strong passwords and keeping your login details private.",
      ].join("\n"),
    },
    {
      title: "About Cookies",
      icon: <Cookie className="h-6 w-6 text-fuchsia-400" />,
      content: [
        "We use cookies to:",
        "• Remember your preferences",
        "• Improve your browsing experience",
        "• Analyze how our website is used",
        "",
        "You can control cookies through your browser settings. Want to know more? Visit our Cookie Policy page.",
      ].join("\n"),
    },
    {
      title: "Your Privacy Rights",
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      content: [
        "You have the right to:",
        "• See what information we have about you",
        "• Update your information",
        "• Delete your information",
        "• Opt out of communications",
        "",
        "To exercise these rights, contact our privacy team at privacy@nextgensynergy.com",
      ].join("\n"),
    },
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
              Your Privacy Matters
            </motion.h1>

            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto mb-8 rounded-full"></div>

            <motion.p
              className="text-lg text-purple-100/90"
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
            <div className="relative backdrop-blur-sm bg-purple-900/20 rounded-3xl border border-purple-400/20 overflow-hidden mb-10">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-purple-900/70">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">NextGenSynergy Privacy Policy</h2>
                </div>

                <p className="text-purple-100/90 mb-6">
                  We believe in being clear and open about how we collect and use your data. This privacy policy
                  explains how NextGenSynergy: The Virtual Interdisciplinary Forum handles your personal information.
                </p>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  {policies.map((policy, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-purple-400/20 rounded-xl backdrop-blur-sm bg-purple-900/30 overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-purple-900/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-900/50 backdrop-blur-sm">
                            {policy.icon}
                          </div>
                          <span className="text-lg font-medium text-white">{policy.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-purple-100/80 whitespace-pre-line">
                        {policy.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="relative backdrop-blur-sm bg-purple-900/30 rounded-2xl border border-purple-400/20 overflow-hidden p-8 text-center">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 opacity-50"></div>

              <div className="relative">
                <h3 className="text-xl font-semibold text-white mb-4">Need Help?</h3>
                <p className="text-purple-100/80 mb-6">
                  If you have any questions about your privacy, please email our privacy team at{" "}
                  <a
                    href="mailto:privacy@nextgensynergy.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    info@thenextgensynergy.com
                  </a>{" "}
                  or call us at +91 78488 54815.
                </p>
                <p className="text-sm text-purple-100/60">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
