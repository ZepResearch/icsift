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
  Globe,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { GeometricShapes } from "./components/geometric-shapes"
import { PaymentForm } from "./components/payment-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExtraContentBelowTabs from "./components/ExtraContentBelowTabs"
import ExtraContentAboveCard from "./components/ExtraContentAboveCard"

export default function RegistrationPage() {
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [customAmount, setCustomAmount] = useState("")
  const [activeTab, setActiveTab] = useState("physical")

  // Updated ticket data based on the pricing structure
  const pricingData = {
    physical: {
      foreign: [
        {
          category: "Academicians",
          earlyBird: { price: 319, currency: "USD" },
          regular: { price: 359, currency: "USD" },
          scopusQ3Q4: { price: 859, currency: "USD" },
          scopusQ1Q2: { price: 1399, currency: "USD" },
          features: [
            "Full conference access",
            "VIP networking dinner",
            "Priority seating",
            "Exclusive roundtable sessions",
            "Physical workshop materials",
            "Certificate of participation"
          ]
        },
        {
          category: "Students",
          earlyBird: { price: 219, currency: "USD" },
          regular: { price: 259, currency: "USD" },
          scopusQ3Q4: { price: 759, currency: "USD" },
          scopusQ1Q2: { price: 1299, currency: "USD" },
          features: [
            "Full conference access",
            "Student networking sessions",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation",
            "Career guidance sessions"
          ]
        },
        {
          category: "Listeners",
          earlyBird: { price: 169, currency: "USD" },
          regular: { price: 199, currency: "USD" },
          scopusQ3Q4: null,
          scopusQ1Q2: null,
          features: [
            "Conference access",
            "Networking opportunities",
            "Lunch and refreshments",
            "Certificate of attendance",
            "Access to presentation materials"
          ]
        }
      ],
      indian: [
        {
          category: "Academicians",
          earlyBird: { price: 9500, currency: "INR" },
          regular: { price: 10000, currency: "INR" },
          scopusQ3Q4: { price: 40000, currency: "INR" },
          scopusQ1Q2: { price: 100000, currency: "INR" },
          features: [
            "Full conference access",
            "VIP networking dinner",
            "Priority seating",
            "Exclusive roundtable sessions",
            "Physical workshop materials",
            "Certificate of participation"
          ]
        },
        {
          category: "Students",
          earlyBird: { price: 8500, currency: "INR" },
          regular: { price: 9000, currency: "INR" },
          scopusQ3Q4: { price: 38000, currency: "INR" },
          scopusQ1Q2: { price: 98000, currency: "INR" },
          features: [
            "Full conference access",
            "Student networking sessions",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation",
            "Career guidance sessions"
          ]
        },
        {
          category: "Listeners",
          earlyBird: { price: 3000, currency: "INR" },
          regular: { price: 4000, currency: "INR" },
          scopusQ3Q4: null,
          scopusQ1Q2: null,
          features: [
            "Conference access",
            "Networking opportunities",
            "Lunch and refreshments",
            "Certificate of attendance",
            "Access to presentation materials"
          ]
        }
      ]
    },
    virtual: {
      foreign: [
        {
          category: "Students",
          earlyBird: { price: 149, currency: "USD" },
          regular: { price: 169, currency: "USD" },
          scopusQ3Q4: { price: 669, currency: "USD" },
          scopusQ1Q2: { price: 1199, currency: "USD" },
          features: [
            "Full virtual conference access",
            "Online networking sessions",
            "Digital workshop materials",
            "Recorded session access",
            "Digital certificate",
            "Q&A participation"
          ]
        },
        {
          category: "Academicians",
          earlyBird: { price: 199, currency: "USD" },
          regular: { price: 219, currency: "USD" },
          scopusQ3Q4: { price: 719, currency: "USD" },
          scopusQ1Q2: { price: 1099, currency: "USD" },
          features: [
            "Full virtual conference access",
            "Premium networking sessions",
            "Digital workshop materials",
            "Recorded session access",
            "Digital certificate",
            "Priority Q&A access"
          ]
        },
        {
          category: "Listeners",
          earlyBird: { price: 99, currency: "USD" },
          regular: { price: 119, currency: "USD" },
          scopusQ3Q4: null,
          scopusQ1Q2: null,
          features: [
            "Virtual conference access",
            "Online networking",
            "Digital materials",
            "Recorded sessions",
            "Digital certificate"
          ]
        }
      ]
    }
  }

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

  const createTicketFromPricing = (categoryData, priceType, participantType, presentationType) => {
    const priceInfo = categoryData[priceType]
    if (!priceInfo) return null

    return {
      name: `${priceType.charAt(0).toUpperCase() + priceType.slice(1)} Registration`,
      price: priceInfo.price,
      currency: priceInfo.currency,
      type: categoryData.category,
      category: categoryData.category,
      participantType: participantType,
      presentationType: presentationType,
      priceType: priceType,
      features: categoryData.features
    }
  }

  const renderPricingCard = (categoryData, participantType, presentationType) => {
    const getCurrencySymbol = (currency) => currency === "USD" ? "$" : "₹"
    
    return (
      <div key={`${categoryData.category}-${participantType}`} className="bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className="bg-gradient-to-r from-[#d3e4c5]/50 to-[#b9d4a3]/50 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-[#4d724d]">
                {categoryData.category}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#4d724d] text-white">
                {participantType === "foreign" ? "International" : "Indian"}
              </span>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4d724d] p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                {presentationType === "physical" ? 
                  <Presentation className="h-5 w-5 text-[#4d724d]" /> :
                  <Globe className="h-5 w-5 text-[#4d724d]" />
                }
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#4d724d]">Early Bird:</span>
              <span className="text-lg font-bold text-[#1a2e1a]">
                {getCurrencySymbol(categoryData.earlyBird.currency)}{categoryData.earlyBird.price}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#4d724d]">Regular:</span>
              <span className="text-lg font-bold text-[#1a2e1a]">
                {getCurrencySymbol(categoryData.regular.currency)}{categoryData.regular.price}
              </span>
            </div>
            {categoryData.scopusQ3Q4 && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#4d724d]">Scopus Q3/Q4:</span>
                  <span className="text-lg font-bold text-[#1a2e1a]">
                    {getCurrencySymbol(categoryData.scopusQ3Q4.currency)}{categoryData.scopusQ3Q4.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#4d724d]">Scopus Q1/Q2:</span>
                  <span className="text-lg font-bold text-[#1a2e1a]">
                    {getCurrencySymbol(categoryData.scopusQ1Q2.currency)}{categoryData.scopusQ1Q2.price}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-[#1a2e1a] mb-4">Features</h3>
          <ul className="space-y-3 mb-6">
            {categoryData.features.map((feature, i) => (
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
                <span className="text-[#4d724d] text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2">
            <Button
              onClick={() => handleTicketSelect(createTicketFromPricing(categoryData, "earlyBird", participantType, presentationType))}
              className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
            >
              <CreditCard className="mr-2 h-4 w-4 text-white" />
              Early Bird - {getCurrencySymbol(categoryData.earlyBird.currency)}{categoryData.earlyBird.price}
            </Button>
            <Button
              onClick={() => handleTicketSelect(createTicketFromPricing(categoryData, "regular", participantType, presentationType))}
              className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
            >
              <CreditCard className="mr-2 h-4 w-4 text-white" />
              Regular - {getCurrencySymbol(categoryData.regular.currency)}{categoryData.regular.price}
            </Button>
            {categoryData.scopusQ3Q4 && (
              <>
                <Button
                  onClick={() => handleTicketSelect(createTicketFromPricing(categoryData, "scopusQ3Q4", participantType, presentationType))}
                  className="w-full  bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-white" />
                  Scopus Q3/Q4 - {getCurrencySymbol(categoryData.scopusQ3Q4.currency)}{categoryData.scopusQ3Q4.price}
                </Button>
                <Button
                  onClick={() => handleTicketSelect(createTicketFromPricing(categoryData, "scopusQ1Q2", participantType, presentationType))}
                  className="w-full  bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-white" />
                  Scopus Q1/Q2 - {getCurrencySymbol(categoryData.scopusQ1Q2.currency)}{categoryData.scopusQ1Q2.price}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-[#f8faf5]">
      <ExtraContentAboveCard/>
      
      {/* Registration Cards */}
      <section className="py-16 bg-[#f8faf5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-6">Registration Options</h2>
            <div className="h-1 w-20 bg-[#4d724d] mx-auto mb-8 rounded-full"></div>
          </div>

          <Tabs defaultValue="physical" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-10">
              <TabsList className="bg-[#edf6e1] p-1 rounded-full">
                <TabsTrigger
                  value="physical"
                  className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Physical Presentation
                </TabsTrigger>
                <TabsTrigger
                  value="virtual"
                  className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Virtual Presentation
                </TabsTrigger>
                <TabsTrigger
                  value="custom"
                  className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Custom Payment
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="physical" className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Physical Presentation Registration</h3>
                <p className="text-[#4d724d] max-w-2xl mx-auto">
                  Join us in person for the full conference experience with networking opportunities
                </p>
              </div>

              {/* Foreign Participants */}
              <div className="mb-12">
                <h4 className="text-xl font-bold text-[#1a2e1a] mb-6 text-center">
                  <Globe className="inline mr-2 h-5 w-5" />
                  International Participants
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pricingData.physical.foreign.map((categoryData) => 
                    renderPricingCard(categoryData, "foreign", "physical")
                  )}
                </div>
              </div>

              {/* Indian Participants */}
              {/* <div>
                <h4 className="text-xl font-bold text-[#1a2e1a] mb-6 text-center">
                  <MapPin className="inline mr-2 h-5 w-5" />
                  Indian Participants
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pricingData.physical.indian.map((categoryData) => 
                    renderPricingCard(categoryData, "indian", "physical")
                  )}
                </div>
              </div> */}
            </TabsContent>

            <TabsContent value="virtual" className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Virtual Presentation Registration</h3>
                <p className="text-[#4d724d] max-w-2xl mx-auto">
                  Participate remotely with full access to sessions and networking opportunities
                </p>
              </div>

              {/* Foreign Participants */}
              <div>
                <h4 className="text-xl font-bold text-[#1a2e1a] mb-6 text-center">
                  <Globe className="inline mr-2 h-5 w-5" />
                  International Participants
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pricingData.virtual.foreign.map((categoryData) => 
                    renderPricingCard(categoryData, "foreign", "virtual")
                  )}
                </div>
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

      <ExtraContentBelowTabs/>

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