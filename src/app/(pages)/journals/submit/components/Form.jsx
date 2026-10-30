"use client"


import { useState } from "react"
import { useRouter } from "next/navigation"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { ArrowRight, Loader2, Upload } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from '@/context/AuthContext'


export default function PaperSubmissionForm({ journalId, journalTitle }) {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget )

      // Add authenticated user id if available
      if (user?.id) {
        formData.set("user", user.id)
      }

      // Add journal ID and title to form data
      formData.set("journal_id", journalId)
      formData.set("journal_name", journalTitle)

      // Add phone number to form data
      if (phoneNumber) {
        formData.set("phone_number", phoneNumber)
      }

      // Add file if selected
      if (selectedFile) {
        formData.set("file", selectedFile)
      }

      const response = await fetch("/api/submit-paper", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit paper")
      }

      // Show success toast
      toast({
        title: "Success!",
        description: "Your paper has been submitted successfully.",
        variant: "default",
      })

      // Redirect to success page
      router.push("/journals/success")
    } catch (err) {
      setError(err.message || "An error occurred while submitting your paper")
      toast({
        title: "Error",
        description: err.message || "An error occurred while submitting your paper",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const label = "block text-[15.5px] font-semibold";
  const group = "sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]";

  return (
    <form onSubmit={handleSubmit} className="grid gap-10">
      {error ? (
        <p role="alert" className="border-l-4 border-[var(--forest)] bg-[var(--panel)] px-5 py-4 text-[16px]">
          <strong className="font-semibold">Not submitted. </strong>
          {error}
        </p>
      ) : null}

      <div className="grid gap-5">
        <h3 className={group}>Journal</h3>
        <div>
          <label htmlFor="journal_name" className={label}>
            Journal name
          </label>
          <input type="text" id="journal_name" name="journal_name" value={journalTitle ?? ""} readOnly className="herb-input mt-2 !bg-[var(--cream-deep)]" />
        </div>
      </div>

      <div className="grid gap-5">
        <h3 className={group}>About you</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="author" className={label}>
              Author name
            </label>
            <input type="text" id="author" name="author" required placeholder="Enter your full name" autoComplete="name" className="herb-input mt-2" />
          </div>
          <div>
            <label htmlFor="email" className={label}>
              Email address
            </label>
            <input type="email" id="email" name="email" required placeholder="your.email@example.com" autoComplete="email" className="herb-input mt-2" />
          </div>
          <div>
            <label htmlFor="phone_number" className={label}>
              Phone number
            </label>
            <PhoneInput id="phone_number" international defaultCountry="US" value={phoneNumber} onChange={setPhoneNumber} required className="herb-input mt-2" />
          </div>
          <div>
            <label htmlFor="country" className={label}>
              Country
            </label>
            <input type="text" id="country" name="country" required placeholder="Your country of residence" autoComplete="country-name" className="herb-input mt-2" />
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        <h3 className={group}>Your paper</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="co_author" className={label}>
              Co-author(s)
            </label>
            <input type="text" id="co_author" name="co_author" placeholder="Separate multiple authors with commas" className="herb-input mt-2" />
          </div>
          <div>
            <label htmlFor="paper_title" className={label}>
              Paper title
            </label>
            <input type="text" id="paper_title" name="paper_title" required placeholder="Enter the title of your paper" className="herb-input mt-2" />
          </div>
          <div>
            <label htmlFor="department" className={label}>
              Department
            </label>
            <input type="text" id="department" name="department" required placeholder="Your academic department" className="herb-input mt-2" />
          </div>
          <div>
            <label htmlFor="organization" className={label}>
              Organization
            </label>
            <input type="text" id="organization" name="organization" required placeholder="Your university or institution" autoComplete="organization" className="herb-input mt-2" />
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        <h3 className={group}>Submission</h3>
        <div>
          <span className={label}>Upload paper</span>
          <input type="file" id="file" name="file" onChange={handleFileChange} required accept=".pdf,.doc,.docx" className="peer sr-only" />
          <label
            htmlFor="file"
            className="mt-2 flex cursor-pointer flex-col items-center gap-2 border-2 border-dashed border-[var(--forest)]/40 bg-white p-6 text-center transition-colors hover:border-[var(--forest)] peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--forest)]"
          >
            <Upload aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
            <span className="text-[16.5px] font-semibold">{selectedFile ? selectedFile.name : "Click to choose a file"}</span>
            <span className="text-[15px] text-[var(--muted)]">PDF, DOC or DOCX, up to 10 MB</span>
          </label>
        </div>
        <div>
          <label htmlFor="message" className={label}>
            Additional message
          </label>
          <textarea id="message" name="message" rows={3} placeholder="Any additional information or comments about your submission" className="herb-input mt-2 resize-y" />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} data-primary className="herb-btn w-full disabled:cursor-wait disabled:opacity-70 sm:max-w-[22rem]">
        <span>{isSubmitting ? "Submitting…" : "Submit paper"}</span>
        {isSubmitting ? (
          <Loader2 aria-hidden="true" className="h-[18px] w-[18px] animate-spin" />
        ) : (
          <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
        )}
      </button>
    </form>
  )
}
