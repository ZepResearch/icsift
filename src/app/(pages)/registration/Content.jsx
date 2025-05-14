"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Users, GraduationCap, User, FileText, Sparkles } from "lucide-react"
import { PaymentForm } from "./components/payment-form"
import { RegistrationCard } from "./components/registration-card"
import { GeometricShapes } from "./components/geometric-shapes"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegistrationPage() {
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleTicketSelect = (ticket) => {
    // Recalculate tax and total to ensure consistency
    const taxAmount = Number((ticket.price * ticket.taxRate).toFixed(2))
    const totalAmount = Number((ticket.price + taxAmount).toFixed(2))

    // Set selectedTicket with properly calculated values
    setSelectedTicket({
      ...ticket,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
    })
    setIsPaymentFormOpen(true)
  }

  const handlePaymentFormClose = () => {
    setIsPaymentFormOpen(false)
  }

  const handlePaymentFormSubmit = async (formData) => {
    setIsLoading(true)
    try {
      // Combine ticket data with form data
      const paymentData = {
        ...formData,
        order_id: `ORDER-${Date.now()}`,
        currency: selectedTicket.currency,
        amount: selectedTicket.totalAmount,
        redirect_url: `${window.location.origin}/api/ccavenue/handle`,
        cancel_url: `${window.location.origin}/api/ccavenue/handle`,
        language: "EN",
        ticket_type: selectedTicket.type,
        ticket_category: selectedTicket.category,
        ticket_name: selectedTicket.name,
      }

      // Send notification email
      await fetch("/api/payment-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      // Get encrypted order data
      const encResponse = await fetch("/api/ccavenue/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const { encRequest } = await encResponse.json()

      // Create and submit form to CCAvenue
      const form = document.createElement("form")
      form.method = "post"
      // Use the exact CCAvenue URL with the command parameter
      form.action = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
      form.style.display = "none"

      const encRequestInput = document.createElement("input")
      encRequestInput.name = "encRequest"
      encRequestInput.value = encRequest
      form.appendChild(encRequestInput)

      const accessCodeInput = document.createElement("input")
      accessCodeInput.name = "access_code"
      accessCodeInput.value = process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE
      form.appendChild(accessCodeInput)

      // Add merchant_id as well
      const merchantIdInput = document.createElement("input")
      merchantIdInput.name = "merchant_id"
      merchantIdInput.value = process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID
      form.appendChild(merchantIdInput)

      document.body.appendChild(form)
      form.submit()
    } catch (error) {
      console.error("Payment processing error:", error)
      setIsLoading(false)
      alert("There was an error processing your payment. Please try again.")
    }
  }

  // Registration fee data - only international options as requested
  const registrationFees = [
    {
      category: "Students",
      type: "International",
      currency: "USD",
      options: [
        {
          name: "Paper Presentation",
          price: 99,
          taxRate: 0.06,
          description: "Present your research paper at the conference",
        },
        {
          name: "Listener",
          price: 79,
          taxRate: 0.06,
          description: "Attend all sessions without presenting",
        },
      ],
    },
    {
      category: "Academicians",
      type: "International",
      currency: "USD",
      options: [
        {
          name: "Paper Presentation",
          price: 159,
          taxRate: 0.06,
          description: "Present your research paper at the conference",
        },
        {
          name: "Listener",
          price: 79,
          taxRate: 0.06,
          description: "Attend all sessions without presenting",
        },
      ],
    },
  ]

  return (
    <main className="bg-[#f8faf5]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <GeometricShapes />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4d724d 1px, transparent 1px), linear-gradient(to bottom, #4d724d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full border border-[#4d724d]/30 bg-[#d3e4c5]/30 px-4 py-1.5 text-sm font-medium text-[#4d724d] mb-6">
              <span>2<sup>nd</sup>ICSIFT 2025</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e1a] mb-6">
              Conference
              <span className="relative inline-block mx-2 ml-6">
                <span className="relative z-10">Registration</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>

            <p className="text-xl text-[#4d724d] mb-8">
              Join us at the International Conference on Sustainable Innovation in Food Technology
            </p>
          </div>
        </div>
      </section>

      {/* Registration Options Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden shadow-sm">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#4d724d] p-0.5 mb-6">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#edf6e1]">
                    <Users className="h-8 w-8 text-[#4d724d]" />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1a2e1a]">Select Your Registration Type</h2>

                <div className="space-y-6 text-[#4d724d]">
                  <p>
                    Choose the registration option that best suits your needs. All registrations include access to
                    keynote presentations, panel discussions, and networking opportunities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  <div className="bg-white rounded-xl border border-[#d3e4c5] p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center mr-4">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#1a2e1a] font-medium">Student Registration</h3>
                      <p className="text-[#4d724d] text-sm">Discounted rates for enrolled students</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-[#d3e4c5] p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center mr-4">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#1a2e1a] font-medium">Academic Registration</h3>
                      <p className="text-[#4d724d] text-sm">For faculty and research professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Cards */}
      <section className="py-16 bg-[#f8faf5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Registration Options</h2>
            <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {registrationFees.map((category, categoryIndex) =>
              category.options.map((option, optionIndex) => {
                const taxAmount = option.price * option.taxRate
                const totalAmount = option.price + taxAmount

                return (
                  <RegistrationCard
                    key={`${categoryIndex}-${optionIndex}`}
                    title={`${category.category} ${option.name}`}
                    price={option.price}
                    currency={category.currency}
                    taxRate={option.taxRate}
                    taxAmount={taxAmount}
                    totalAmount={totalAmount}
                    description={option.description}
                    type={category.type}
                    category={category.category}
                    name={option.name}
                    onSelect={() =>
                      handleTicketSelect({
                        type: category.type,
                        category: category.category,
                        name: option.name,
                        price: option.price,
                        taxRate: option.taxRate,
                        taxAmount,
                        totalAmount,
                        currency: category.currency,
                      })
                    }
                  />
                )
              }),
            )}
          </div>
        </div>
      </section>

      {/* Conference Benefits Section */}
      <section className="py-16 bg-white">
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
                <p className="text-[#4d724d]">
                  Connect with researchers and professionals from the food technology industry
                </p>
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

      {/* Important Dates Section */}
  

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden p-8 shadow-sm">
              <div className="absolute -inset-px rounded-3xl bg-[#d3e4c5]/20 opacity-50"></div>

              <div className="relative">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Ready to Join 2<sup>nd</sup>ICSIFT 2025?</h3>
                <p className="text-[#4d724d] mb-6">
                  Register now to secure your spot at the International Conference on Sustainable Innovation in Food
                  Technology.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full">Submit Your Paper</Button>
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
      </section>

      {/* Payment Form Dialog */}
      <PaymentForm
        isOpen={isPaymentFormOpen}
        onClose={handlePaymentFormClose}
        ticketName={selectedTicket?.name}
        amount={selectedTicket?.price || 0}
        taxRate={selectedTicket?.taxRate || 0}
        currency={selectedTicket?.currency || "USD"}
        onSubmit={handlePaymentFormSubmit}
        isLoading={isLoading}
      />
    </main>
  )
}
