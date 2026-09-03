import Link from "next/link"
import { CheckCircle2, Mail, ExternalLink, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Submission Successful - International Conference on Sustainable Tourism & Hospitality Management",
  description:
    "Your paper has been successfully submitted to the International Conference on Sustainable Tourism & Hospitality Management",
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 to-lime-500" />

          <div className="p-8 sm:p-10">
            {/* Icon badge */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-green-100 blur-md opacity-70" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-50 ring-4 ring-green-100">
                  <CheckCircle2 className="h-9 w-9 text-green-600" strokeWidth={2} />
                </div>
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-[#2f761a] text-balance">
              Submission Successful!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your journal paper has been successfully submitted to the ICSIFT.
            </p>

            {/* Info card */}
            <div className="mt-6 rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">
                  A confirmation email has been sent to your email address. Our team will review your submission and
                  get back to you soon.
                </p>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
                <ExternalLink className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">
                  You can check the status of your submission on the main website:{" "}
                  <a
                    href="https://publication.zepresearch.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#22761a] underline underline-offset-2 hover:text-[#15602e] transition-colors"
                  >
                    publication.zepresearch.com
                  </a>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold text-white bg-[#22761a] hover:bg-[#15602e] shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1a5276]"
              >
                Return to Homepage
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://publication.zepresearch.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold text-[#22761a] border border-[#22761a]/30 hover:bg-[#22761a]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1a5276]"
              >
                Check Submission Status
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}