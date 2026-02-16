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
  Home,
  Zap,
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
  const [activeTab, setActiveTab] = useState("physical-no-accommodation")

  // Updated pricing structure with Early Bird pricing
  const pricingData = {
    physicalNoAccommodation: {
      local: [
        {
          category: "Academician",
          physical: { price: 249, currency: "USD" },
          virtual: { price: 169, currency: "USD" },
          earlyBird: { price: 329, currency: "USD" },
          features: [
            "Full conference access",
            "Networking opportunities",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation",
            "Access to presentation materials"
          ]
        },
        {
          category: "Student",
          physical: { price: 199, currency: "USD" },
          virtual: { price: 129, currency: "USD" },
          earlyBird: { price: 179, currency: "USD" },
          features: [
            "Conference access",
            "Networking opportunities",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation",
            "Student discount applied"
          ]
        },
        {
          category: "Delegate",
          physical: { price: 169, currency: "USD" },
          virtual: { price: 79, currency: "USD" },
          earlyBird: { price: 159, currency: "USD" },
          features: [
            "Conference access",
            "Networking opportunities",
            "Lunch and refreshments",
            "Certificate of attendance",
            "Access to presentation materials"
          ]
        },
        {
          category: "With Scopus Q3 & Q4",
          physical: { price: 1049, currency: "USD" },
          virtual: { price: 949, currency: "USD" },
          earlyBird: { price: 999, currency: "USD" },
          features: [
            "Full conference access",
            "Scopus Q3 & Q4 publication",
            "Premium networking opportunities",
            "Workshop materials",
            "Certificate of participation",
            "Priority presentation slot"
          ]
        },
        {
          category: "With Scopus Q1 & Q2",
          physical: { price: 1749, currency: "USD" },
          virtual: { price: 1649, currency: "USD" },
          earlyBird: { price: 1699, currency: "USD" },
          features: [
            "Full conference access",
            "Scopus Q1 & Q2 publication",
            "Premium networking opportunities",
            "Workshop materials",
            "Certificate of participation",
            "Priority presentation slot"
          ]
        }
      ],
      international: [
        {
          category: "Academician",
          physical: { price: 299, currency: "USD" },
          virtual: { price: 229, currency: "USD" },
          earlyBird: { price: 249, currency: "USD" },
          features: [
            "Full conference access",
            "International networking",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation",
            "Access to presentation materials"
          ]
        },
        {
          category: "Student",
          physical: { price: 249, currency: "USD" },
          virtual: { price: 169, currency: "USD" },
          earlyBird: { price: 219, currency: "USD" },
          features: [
            "Conference access",
            "International networking",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation",
            "Student discount applied"
          ]
        },
        {
          category: "Delegate",
          physical: { price: 199, currency: "USD" },
          virtual: { price: 129, currency: "USD" },
          earlyBird: { price: 169, currency: "USD" },
          features: [
            "Conference access",
            "International networking",
            "Lunch and refreshments",
            "Certificate of attendance",
            "Access to presentation materials"
          ]
        },
        {
          category: "With Scopus Q3 & Q4",
          physical: { price: 1099, currency: "USD" },
          virtual: { price: 999, currency: "USD" },
          earlyBird: { price: 1049, currency: "USD" },
          features: [
            "Full conference access",
            "Scopus Q3 & Q4 publication",
            "Premium international networking",
            "Workshop materials",
            "Certificate of participation",
            "Priority presentation slot"
          ]
        },
        {
          category: "With Scopus Q1 & Q2",
          physical: { price: 1799, currency: "USD" },
          virtual: { price: 1699, currency: "USD" },
          earlyBird: { price: 1749, currency: "USD" },
          features: [
            "Full conference access",
            "Scopus Q1 & Q2 publication",
            "Premium international networking",
            "Workshop materials",
            "Certificate of participation",
            "Priority presentation slot"
          ]
        }
      ]
    },
    physicalWithAccommodation: {
      local: [
        {
          category: "Academician",
          physical: { price: 399, currency: "USD" },
          earlyBird: { price: 349, currency: "USD" },
          features: [
            "Full conference access",
            "Accommodation included",
            "Networking opportunities",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation"
          ]
        },
        {
          category: "Student",
          physical: { price: 349, currency: "USD" },
          earlyBird: { price: 299, currency: "USD" },
          features: [
            "Conference access",
            "Accommodation included",
            "Networking opportunities",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation"
          ]
        },
        {
          category: "Delegate",
          physical: { price: 319, currency: "USD" },
          earlyBird: { price: 279, currency: "USD" },
          features: [
            "Conference access",
            "Accommodation included",
            "Networking opportunities",
            "Lunch and refreshments",
            "Certificate of attendance"
          ]
        },
        {
          category: "With Scopus Q3 & Q4",
          physical: { price: 1199, currency: "USD" },
          earlyBird: { price: 1149, currency: "USD" },
          features: [
            "Full conference access",
            "Accommodation included",
            "Scopus Q3 & Q4 publication",
            "Premium networking opportunities",
            "Workshop materials",
            "Priority presentation slot"
          ]
        },
        {
          category: "With Scopus Q1 & Q2",
          physical: { price: 1899, currency: "USD" },
          earlyBird: { price: 1849, currency: "USD" },
          features: [
            "Full conference access",
            "Accommodation included",
            "Scopus Q1 & Q2 publication",
            "Premium networking opportunities",
            "Workshop materials",
            "Priority presentation slot"
          ]
        }
      ],
      international: [
        {
          category: "Academician",
          physical: { price: 449, currency: "USD" },
          earlyBird: { price: 399, currency: "USD" },
          features: [
            "Full conference access",
            "Accommodation included",
            "International networking",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation"
          ]
        },
        {
          category: "Student",
          physical: { price: 399, currency: "USD" },
          earlyBird: { price: 349, currency: "USD" },
          features: [
            "Conference access",
            "Accommodation included",
            "International networking",
            "Workshop materials",
            "Lunch and refreshments",
            "Certificate of participation"
          ]
        },
        {
          category: "Delegate",
          physical: { price: 349, currency: "USD" },
          earlyBird: { price: 299, currency: "USD" },
          features: [
            "Conference access",
            "Accommodation included",
            "International networking",
            "Lunch and refreshments",
            "Certificate of attendance"
          ]
        },
        {
          category: "With Scopus Q3 & Q4",
          physical: { price: 1299, currency: "USD" },
          earlyBird: { price: 1249, currency: "USD" },
          features: [
            "Full conference access",
            "Accommodation included",
            "Scopus Q3 & Q4 publication",
            "Premium international networking",
            "Workshop materials",
            "Priority presentation slot"
          ]
        },
        {
          category: "With Scopus Q1 & Q2",
          physical: { price: 1949, currency: "USD" },
          earlyBird: { price: 1899, currency: "USD" },
          features: [
            "Full conference access",
            "Accommodation included",
            "Scopus Q1 & Q2 publication",
            "Premium international networking",
            "Workshop materials",
            "Priority presentation slot"
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

  const createTicketFromPricing = (categoryData, priceType, participantType, accommodationType) => {
    const priceInfo = categoryData[priceType]
    if (!priceInfo) return null

    const priceTypeName = priceType === 'earlyBird' ? 'Early Bird' : 
                          priceType === 'physical' ? 'Physical' : 'Virtual'

    return {
      name: `${categoryData.category} - ${participantType.charAt(0).toUpperCase() + participantType.slice(1)} (${priceTypeName})`,
      price: priceInfo.price,
      currency: priceInfo.currency,
      type: categoryData.category,
      category: categoryData.category,
      participantType: participantType,
      accommodationType: accommodationType,
      priceType: priceType,
      features: categoryData.features
    }
  }

  const renderPricingCard = (categoryData, participantType, accommodationType) => {
    const getCurrencySymbol = (currency) => currency === "USD" ? "$" : "₹"
    const hasVirtual = categoryData.virtual !== undefined
    const hasEarlyBird = categoryData.earlyBird !== undefined
    
    return (
      <div key={`${categoryData.category}-${participantType}`} className="bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
        <div className="bg-gradient-to-r from-[#d3e4c5]/50 to-[#b9d4a3]/50 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-[#4d724d]">
                {categoryData.category}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#4d724d] text-white">
                {participantType === "local" ? "Local" : "International"}
              </span>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4d724d] p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <Presentation className="h-5 w-5 text-[#4d724d]" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {hasEarlyBird && (
              <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 rounded-lg p-2 -mx-2">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-sm font-semibold text-yellow-700">Early Bird:</span>
                </div>
                <span className="text-xl font-bold text-yellow-700">
                  {getCurrencySymbol(categoryData.earlyBird.currency)}{categoryData.earlyBird.price}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#4d724d]">Physical:</span>
              <span className="text-2xl font-bold text-[#1a2e1a]">
                {getCurrencySymbol(categoryData.physical.currency)}{categoryData.physical.price}
              </span>
            </div>
            {hasVirtual && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#4d724d]">Virtual:</span>
                <span className="text-xl font-semibold text-[#1a2e1a]">
                  {getCurrencySymbol(categoryData.virtual.currency)}{categoryData.virtual.price}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-black mb-4">Deliverables</h3>
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
          </div>
          
          <div className="space-y-2">
            {hasEarlyBird && (
              <Button
                onClick={() => handleTicketSelect(createTicketFromPricing(categoryData, "earlyBird", participantType, accommodationType))}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-full shadow-md"
              >
                <Zap className="mr-2 h-4 w-4 text-white" />
                Early Bird - {getCurrencySymbol(categoryData.earlyBird.currency)}{categoryData.earlyBird.price}
              </Button>
            )}
            <Button
              onClick={() => handleTicketSelect(createTicketFromPricing(categoryData, "physical", participantType, accommodationType))}
              className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
            >
              <MapPin className="mr-2 h-4 w-4 text-white" />
              Physical - {getCurrencySymbol(categoryData.physical.currency)}{categoryData.physical.price}
            </Button>
            {hasVirtual && (
              <Button
                onClick={() => handleTicketSelect(createTicketFromPricing(categoryData, "virtual", participantType, accommodationType))}
                className="w-full bg-white hover:bg-[#f8faf5] text-[#4d724d] border-2 border-[#4d724d] rounded-full"
              >
                <Globe className="mr-2 h-4 w-4 text-[#4d724d]" />
                Virtual - {getCurrencySymbol(categoryData.virtual.currency)}{categoryData.virtual.price}
              </Button>
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

          <Tabs defaultValue="physical-no-accommodation" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-10">
              <TabsList className="bg-[#edf6e1] p-1 rounded-full flex flex-col md:flex-row gap-4">
                <TabsTrigger
                  value="physical-no-accommodation"
                  className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                >
                  <Presentation className="mr-2 h-4 w-4" />
                  Without Accommodation
                </TabsTrigger>
                <TabsTrigger
                  value="physical-with-accommodation"
                  className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                >
                  <Home className="mr-2 h-4 w-4" />
                  With Accommodation
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

            <TabsContent value="physical-no-accommodation" className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Conference Fees (Without Accommodation)</h3>
                <p className="text-[#4d724d] max-w-2xl mx-auto">
                  Choose between physical or virtual participation options
                </p>
              </div>

              <Tabs defaultValue="local-no-accommodation" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-[#edf6e1] p-1 rounded-full">
                    <TabsTrigger
                      value="local-no-accommodation"
                      className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Local Participants
                    </TabsTrigger>
                    <TabsTrigger
                      value="international-no-accommodation"
                      className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      International Participants
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="local-no-accommodation" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingData.physicalNoAccommodation.local.map((categoryData) => 
                      renderPricingCard(categoryData, "local", "no-accommodation")
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="international-no-accommodation" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingData.physicalNoAccommodation.international.map((categoryData) => 
                      renderPricingCard(categoryData, "international", "no-accommodation")
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="physical-with-accommodation" className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1a2e1a] mb-3">Conference Fees (With Accommodation)</h3>
                <p className="text-[#4d724d] max-w-2xl mx-auto">
                  Physical participation with accommodation included
                </p>
              </div>

              <Tabs defaultValue="local-with-accommodation" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-[#edf6e1] p-1 rounded-full">
                    <TabsTrigger
                      value="local-with-accommodation"
                      className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Local Participants
                    </TabsTrigger>
                    <TabsTrigger
                      value="international-with-accommodation"
                      className="rounded-full data-[state=active]:bg-[#4d724d] data-[state=active]:text-white px-6 py-2"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      International Participants
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="local-with-accommodation" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingData.physicalWithAccommodation.local.map((categoryData) => 
                      renderPricingCard(categoryData, "local", "with-accommodation")
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="international-with-accommodation" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingData.physicalWithAccommodation.international.map((categoryData) => 
                      renderPricingCard(categoryData, "international", "with-accommodation")
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Important Note */}
              <div className="mt-12 max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl border-2 border-[#d3e4c5] p-6 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <Info className="h-6 w-6 text-[#4d724d] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-[#1a2e1a] mb-2">Important Note</h4>
                      <p className="text-[#4d724d] mb-2">
                        <strong>N.B.:</strong> For group discounts, kindly connect with the coordinator.
                      </p>
                      <p className="text-[#4d724d]">
                        (Exciting offers are also available for outstanding contributors.)
                      </p>
                    </div>
                  </div>
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