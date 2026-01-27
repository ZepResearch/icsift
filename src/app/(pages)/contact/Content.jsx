"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Globe, YoutubeIcon } from "lucide-react"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import ReCAPTCHA from "react-google-recaptcha"
import { GeometricShapesCSS } from "@/components/geometric-shapes"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phoneNumber: "",
  })
  const [phoneNumber, setPhoneNumber] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const recaptchaRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Update formData when phoneNumber changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, phoneNumber }))
  }, [phoneNumber])

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setSubmitStatus("error")
      setErrorMessage("Please complete the reCAPTCHA verification")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phoneNumber: "",
      })
      setPhoneNumber(undefined)
      setRecaptchaToken(null)
      
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred")
      
      // Reset reCAPTCHA on error
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
      setRecaptchaToken(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-[#f8faf5]">
      {/* Hero Section */}
      <section className="relative py-8 overflow-hidden">
        {/* Background Elements */}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e1a] mb-6">
              
              <span className="relative inline-block mx-2 mr-4">
                <span className="relative z-10">Contact</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
              Us
            </h1>
            <p className="text-xl text-[#4d724d] mb-8">
              Get in touch with the ICSIFT team for any inquiries or support
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
      <GeometricShapesCSS />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden h-full shadow-sm">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative p-8 flex flex-col h-full">
                  <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">Get In Touch</h2>

                  <p className="text-[#4d724d] mb-8">
                    Have questions about 3<sup>rd</sup>ICSIFT 2026? Our team is here to help. Reach out to us using the contact
                    information below or fill out the form.
                  </p>

                  <div className="space-y-6 flex-grow">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4d724d] p-0.5">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#edf6e1]">
                          <Mail className="h-5 w-5 text-[#4d724d]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[#4d724d]/70">Email</p>
                        <p className="text-[#1a2e1a] font-medium">info@icsift.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4d724d] p-0.5">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#edf6e1]">
                          <Phone className="h-5 w-5 text-[#4d724d]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[#4d724d]/70">Phone</p>
                        <p className="text-[#1a2e1a] font-medium">+91 82606 84845</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4d724d] p-0.5">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#edf6e1]">
                          <MapPin className="h-5 w-5 text-[#4d724d]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[#4d724d]/70">Address</p>
                        <p className="text-[#1a2e1a] font-medium">
                       Flat No: 202 Plot.no.2028/2044, Sai Aarti Enclave, Behind Tanishq Chandasekharpur, Bhubaneshwar, India
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-[#d3e4c5]">
                    <h3 className="text-lg font-medium text-[#1a2e1a] mb-4">Connect With Us</h3>
                    <div className="flex gap-4">
                      <a
                        href="https://www.facebook.com/profile.php?id=61561809783777"
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#d3e4c5] text-[#4d724d] hover:text-white hover:bg-[#4d724d] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/zepresearch/"
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#d3e4c5] text-[#4d724d] hover:text-white hover:bg-[#4d724d] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                      <a
                        href="https://x.com/Zepresearch"
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#d3e4c5] text-[#4d724d] hover:text-white hover:bg-[#4d724d] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/zep-research/"
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#d3e4c5] text-[#4d724d] hover:text-white hover:bg-[#4d724d] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="https://www.youtube.com/@Zepresearch"
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#d3e4c5] text-[#4d724d] hover:text-white hover:bg-[#4d724d] transition-colors"
                      >
                       <YoutubeIcon/>
                      </a>
                      <a
                        href="https://www.zepresearch.com/"
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#d3e4c5] text-[#4d724d] hover:text-white hover:bg-[#4d724d] transition-colors"
                      >
                        <Globe className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden shadow-sm">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative p-8">
                  <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">Send Us a Message</h2>

                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Message Sent Successfully!</p>
                        <p className="text-green-700/80">
                          Thank you for contacting us. We'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Error Sending Message</p>
                        <p className="text-red-700/80">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-[#1a2e1a]">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                          placeholder="Enter your name"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#1a2e1a]">
                          Phone Number
                        </label>
                        <PhoneInput
                          international
                          defaultCountry="TH"
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                          className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-[#1a2e1a]">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium text-[#1a2e1a]">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                          placeholder="What is your message about?"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-[#1a2e1a]">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    {/* reCAPTCHA */}
                    <div className="flex justify-center">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={onRecaptchaChange}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || !recaptchaToken}
                        className="relative px-8 py-4 bg-[#4d724d] hover:bg-[#3c5c3c] text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:ring-offset-2 focus:ring-offset-[#edf6e1] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-full bg-[#3c5c3c] opacity-0 group-hover:opacity-50 group-hover:animate-pulse transition-all duration-1000"></div>
                        </div>
                        <div className="relative flex items-center">
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                              Send Message
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}