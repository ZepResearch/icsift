"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { FileText, Upload, ChevronDown, Send } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"
import { GeometricShapesCSS } from "./geometric-shapes-css"
import AbstractSubmissionGuidelines from "./SubmitGuidline"

export default function PaperSubmissionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState()
  const [recaptchaToken, setRecaptchaToken] = useState(null)

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification")
      toast.error("Please complete the reCAPTCHA verification")
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData(e.currentTarget)

      // Add phone number to form data
      if (phoneNumber) {
        formData.set("phone_number", phoneNumber)
      }

      // Add file if selected
      if (selectedFile) {
        formData.set("file", selectedFile)
      }

      // Add reCAPTCHA token
      formData.set("recaptcha_token", recaptchaToken)

      const response = await fetch("/api/submit-paper", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit paper")
      }

      // Show success toast
      toast.success("Paper submitted successfully!")

      // Redirect to success page
      router.push("/submission/success")
    } catch (err) {
      setError(err.message || "An error occurred while submitting your paper")
      toast.error(err.message || "An error occurred while submitting your paper")
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <main className="bg-[#f8faf5]">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e1a] mb-6">
              Paper
              <span className="relative inline-block mx-2 ml-6">
                <span className="relative z-10">Submission</span>
                <span className="absolute inset-0 bg-[#d3e4c5] rounded-full transform -rotate-1 scale-110 z-0"></span>
              </span>
            </h1>
            <h2 className="text-xl text-[#4d724d] mb-8">
              Share your research at 2<sup>nd</sup>ICSIFT 2025: International Conference on Sustainability, Innovation, and Future
              Technologies
            </h2>
            <a href="#guid" className="scroll-smooth transition-all py-2 px-3 bg-gradient-to-tl from-[#4d724d] via-[#606b58] to-[#4d724d] rounded-4xl text-white font-semibold hover:drop-shadow-2xl hover:bg-orange-500/90">
              Read Submission Guidelines before submitting
            </a>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-12">
        <GeometricShapesCSS />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-[#edf6e1] rounded-3xl overflow-hidden shadow-sm">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e4c5]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d724d]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative p-8 md:p-12">
                {error && (
                  <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Author Name */}
                    <div className="space-y-2">
                      <label htmlFor="author" className="block text-sm font-medium text-[#1a2e1a]">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label htmlFor="phone_number" className="block text-sm font-medium text-[#1a2e1a]">
                        Phone Number *
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="US"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-[#1a2e1a]">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <label htmlFor="country" className="block text-sm font-medium text-[#1a2e1a]">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        placeholder="Your country"
                      />
                    </div>

                    {/* Co-Author */}
                    <div className="space-y-2">
                      <label htmlFor="co_author" className="block text-sm font-medium text-[#1a2e1a]">
                        Co-Author(s) *
                      </label>
                      <input
                        type="text"
                        id="co_author"
                        name="co_author"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        placeholder="Separate multiple authors with commas"
                      />
                    </div>

                    {/* Paper Title */}
                    <div className="space-y-2">
                      <label htmlFor="paper_title" className="block text-sm font-medium text-[#1a2e1a]">
                        Paper Title *
                      </label>
                      <input
                        type="text"
                        id="paper_title"
                        name="paper_title"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        placeholder="Enter your paper title"
                      />
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                      <label htmlFor="department" className="block text-sm font-medium text-[#1a2e1a]">
                        Department *
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        placeholder="Your academic department"
                      />
                    </div>

                    {/* Organization */}
                    <div className="space-y-2">
                      <label htmlFor="organization" className="block text-sm font-medium text-[#1a2e1a]">
                        Organization *
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                        placeholder="Your university or organization"
                      />
                    </div>

                    {/* Paper Type */}
                    <div className="space-y-2">
                      <label htmlFor="paper_type" className="block text-sm font-medium text-[#1a2e1a]">
                        Paper Type *
                      </label>
                      <div className="relative">
                        <select
                          id="paper_type"
                          name="paper_type"
                          required
                          className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50 appearance-none"
                        >
                          <option value="">Select Paper Type</option>
                          <option value="Abstract">Abstract</option>
                          <option value="Full Paper">Full Paper</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-[#4d724d]" />
                      </div>
                    </div>

                    {/* Presentation Type */}
                    <div className="space-y-2">
                      <label htmlFor="presentation_type" className="block text-sm font-medium text-[#1a2e1a]">
                        Presentation Type *
                      </label>
                      <div className="relative">
                        <select
                          id="presentation_type"
                          name="presentation_type"
                          required
                          className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50 appearance-none"
                        >
                          <option value="">Select Presentation Type</option>
                          <option value="Poster">Poster Presentation</option>
                          <option value="Oral">Oral Presentation</option>
                          <option value="Virtual">Virtual Presentation</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-[#4d724d]" />
                      </div>
                    </div>

                    {/* How did you hear about us */}
                    <div className="space-y-2">
                      <label htmlFor="know_to_you" className="block text-sm font-medium text-[#1a2e1a]">
                        How did you hear about us? *
                      </label>
                      <div className="relative">
                        <select
                          id="know_to_you"
                          name="know_to_you"
                          required
                          className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50 appearance-none"
                        >
                          <option value="">Select an option</option>
                          <option value="Conference Alerts">Conference Alerts</option>
                          <option value="Email">Email</option>
                          <option value="Friend or Colleague or Supervisor">Friend, Colleague, or Supervisor</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Google Search">Google Search</option>
                          <option value="Eventbit">Eventbit</option>
                          <option value="Linkdin">LinkedIn</option>
                          <option value="Others">Others</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-[#4d724d]" />
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                      <label htmlFor="file" className="block text-sm font-medium text-[#1a2e1a]">
                        Upload Paper (DOC, DOCX) *
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="file"
                          name="file"
                          onChange={handleFileChange}
                          required
                          accept=".doc,.docx"
                          className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-[#4d724d] file:text-white hover:file:bg-[#3c5c3c]"
                        />
                        <Upload className="absolute right-3 top-3 h-5 w-5 text-[#4d724d]" />
                      </div>
                      {selectedFile && (
                        <div className="mt-2 px-3 py-2 bg-white rounded-lg border border-[#d3e4c5] text-sm text-[#1a2e1a] flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-[#4d724d]" />
                          Selected: {selectedFile.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-[#1a2e1a]">
                      Additional Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-[#d3e4c5] rounded-xl text-[#1a2e1a] placeholder-[#4d724d]/50 focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:border-[#4d724d]/50"
                      placeholder="Any additional information you'd like to share"
                    ></textarea>
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      theme="light"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative px-8 py-4 bg-[#4d724d] hover:bg-[#3c5c3c] text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-[#4d724d]/50 focus:ring-offset-2 focus:ring-offset-[#edf6e1] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-full bg-[#3c5c3c] opacity-0 group-hover:opacity-50 group-hover:animate-pulse transition-all duration-1000"></div>
                      </div>
                      <div className="relative flex items-center">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            Submit Paper
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div id="guid" className="mt-12 scroll-smooth">
            <AbstractSubmissionGuidelines />
          </div>
        </div>
      </section>
    </main>
  )
}