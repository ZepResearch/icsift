"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { PaymentForm } from "./components/payment-form"
import { GeometricShapes } from "./components/geometric-shapes"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function RegistrationPage() {
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [customAmount, setCustomAmount] = useState("")
  const [activeTab, setActiveTab] = useState("presenter")

  // Ticket data
  const tickets = [
    {
      name: "Virtual TICKET",
      price: 219,
      period: "month",
      type: "Presenter",
      features: [
        "Full conference access",
        "Networking sessions",
        "Workshop materials",
        "Online Q&A sessions",
        "Digital certificate of attendance",
      ],
    },
    {
      name: "Physical TICKET",
      price: 319,
      period: "month",
      type: "Presenter",
      features: [
        "All Virtual Presenter benefits",
        "VIP networking dinner",
        "Priority seating",
        "Exclusive roundtable sessions",
        "1-year membership access",
      ],
    },
    {
      name: "Virtual TICKET",
      price: 99,
      period: "month",
      type: "Listener",
      features: [
        "Full conference access",
        "Online networking sessions",
        "Digital workshop materials",
        "Access to recorded sessions",
        "Digital certificate of attendance",
      ],
    },
    {
      name: "Physical TICKET",
      price: 199,
      period: "month",
      type: "Listener",
      features: [
        "All Virtual Listener benefits",
        "In-person networking opportunities",
        "Physical workshop materials",
        "Lunch and refreshments",
        "Guided tour of conference venue",
      ],
    },
  ]

  const handleTicketSelect = (ticket) => {
    // Recalculate tax and total to ensure consistency
    const taxAmount = Number((ticket.price * 0.06).toFixed(2))
    const totalAmount = Number((ticket.price + taxAmount).toFixed(2))

    // Set selectedTicket with properly calculated values
    setSelectedTicket({
      ...ticket,
      taxRate: 0.06,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      currency: "USD",
    })
    setIsPaymentFormOpen(true)
  }

  const handleCustomPayment = () => {
    if (!customAmount || isNaN(customAmount) || Number.parseFloat(customAmount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    const price = Number.parseFloat(customAmount)
    const taxAmount = Number((price * 0.06).toFixed(2))
    const totalAmount = Number((price + taxAmount).toFixed(2))

    const ticket = {
      name: "Custom Payment",
      price: price,
      type: "Custom",
      category: "Custom",
      taxRate: 0.06,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      currency: "USD",
      features: ["Custom amount payment", "6% tax included"],
    }

    setSelectedTicket(ticket)
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

  // Filter tickets by type
  const presenterTickets = tickets.filter((ticket) => ticket.type === "Presenter")
  const listenerTickets = tickets.filter((ticket) => ticket.type === "Listener")

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
              <span>ICSIFT 2025</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e1a] mb-6">
              Conference
              <span className="relative inline-block mx-2">
                <span className="relative z-10">Registration</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>

            <p className="text-xl text-[#4d724d] mb-8">
              Join us at the International Conference on Sustainability, Innovation and Future Technologies
            </p>
          </div>
        </div>
      </section>

      {/* Registration Process Section */}
     

      {/* Registration Options Section */}
      <section className="py-16 bg-[#f8faf5]">
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
                      <Presentation className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#1a2e1a] font-medium">Presenter Registration</h3>
                      <p className="text-[#4d724d] text-sm">For those presenting research papers</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-[#d3e4c5] p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#4d724d] flex items-center justify-center mr-4">
                      <Headphones className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#1a2e1a] font-medium">Listener Registration</h3>
                      <p className="text-[#4d724d] text-sm">For those attending without presenting</p>
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

          <Tabs defaultValue="presenter" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-10">
              <TabsList className="bg-[#edf6e1] p-1 rounded-full">
                <TabsTrigger
                  value="presenter"
                  className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                >
                  Presenter Tickets
                </TabsTrigger>
                <TabsTrigger
                  value="listener"
                  className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                >
                  Listener Tickets
                </TabsTrigger>
                <TabsTrigger
                  value="custom"
                  className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                >
                  Custom Payment
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="presenter" className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Presenter Registration Options</h3>
                <p className="text-[#4d724d] max-w-2xl mx-auto">
                  Select from our presenter options to share your research at the conference
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {presenterTickets.map((ticket, index) => (
                  <div key={`presenter-${index}`} className="h-full">
                    <div className="bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden h-full shadow-sm hover:shadow-md transition-all">
                      <div className="bg-gradient-to-r from-[#d3e4c5]/50 to-[#b9d4a3]/50 p-6">
                        <div className="flex justify-between items-center">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-[#4d724d]">
                            {ticket.name}
                          </span>
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4d724d] p-0.5">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                              <Presentation className="h-5 w-5 text-[#4d724d]" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="text-3xl font-bold text-[#1a2e1a]">${ticket.price}</span>
                          <span className="text-[#4d724d] ml-1">+ 6% tax</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1a2e1a] mb-4">Features</h3>
                        <ul className="space-y-3 mb-6">
                          {ticket.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-[#d3e4c5] flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                <svg
                                  className="h-3 w-3 text-[#4d724d]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-[#4d724d]">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          onClick={() => handleTicketSelect(ticket)}
                          className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
                        >
                          <CreditCard className="mr-2 h-4 w-4 text-white" />
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="listener" className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Listener Registration Options</h3>
                <p className="text-[#4d724d] max-w-2xl mx-auto">
                  Select from our listener options to attend and learn at the conference
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {listenerTickets.map((ticket, index) => (
                  <div key={`listener-${index}`} className="h-full">
                    <div className="bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden h-full shadow-sm hover:shadow-md transition-all">
                      <div className="bg-gradient-to-r from-[#d3e4c5]/50 to-[#b9d4a3]/50 p-6">
                        <div className="flex justify-between items-center">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-[#4d724d]">
                            {ticket.name}
                          </span>
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4d724d] p-0.5">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                              <Headphones className="h-5 w-5 text-[#4d724d]" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="text-3xl font-bold text-[#1a2e1a]">${ticket.price}</span>
                          <span className="text-[#4d724d] ml-1">+ 6% tax</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1a2e1a] mb-4">Features</h3>
                        <ul className="space-y-3 mb-6">
                          {ticket.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-[#d3e4c5] flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                <svg
                                  className="h-3 w-3 text-[#4d724d]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-[#4d724d]">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          onClick={() => handleTicketSelect(ticket)}
                          className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
                        >
                          <CreditCard className="mr-2 h-4 w-4 text-white" />
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Custom Payment</h3>
                <p className="text-[#4d724d] max-w-2xl mx-auto">
                  Enter a custom amount for your registration or additional services
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#d3e4c5]/50 to-[#b9d4a3]/50 p-6">
                    <div className="flex justify-between items-center">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-[#4d724d]">
                        Custom Payment
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4d724d] p-0.5">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                          <DollarSign className="h-5 w-5 text-[#4d724d]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <label htmlFor="customAmount" className="block text-[#1a2e1a] font-medium mb-2">
                        Enter Amount (USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4d724d]">$</span>
                        <input
                          id="customAmount"
                          type="number"
                          min="1"
                          step="0.01"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#d3e4c5] focus:ring-2 focus:ring-[#4d724d] focus:border-transparent outline-none"
                          placeholder="Enter amount"
                        />
                      </div>
                      <p className="text-sm text-[#4d724d] mt-2">A 6% tax will be added to this amount</p>
                    </div>

                    {customAmount && !isNaN(Number.parseFloat(customAmount)) && Number.parseFloat(customAmount) > 0 && (
                      <div className="space-y-2 mb-6 p-4 bg-[#edf6e1] rounded-xl border border-[#d3e4c5]">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#4d724d]">Base Amount:</span>
                          <span className="text-[#1a2e1a] font-medium">
                            ${Number.parseFloat(customAmount).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#4d724d]">Tax (6%):</span>
                          <span className="text-[#1a2e1a] font-medium">
                            ${(Number.parseFloat(customAmount) * 0.06).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-medium pt-2 border-t border-[#d3e4c5]">
                          <span className="text-[#4d724d]">Total:</span>
                          <span className="text-[#1a2e1a] font-bold">
                            ${(Number.parseFloat(customAmount) * 1.06).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleCustomPayment}
                      className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
                    >
                      <CreditCard className="mr-2 h-4 w-4 text-white" />
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Paymentm process Modal */}
 <section className="py-16 bg-white">
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
