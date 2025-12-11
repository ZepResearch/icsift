import Link from "next/link"

export const metadata = {
  title: "Submission Successful - International Conference on Sustainable Tourism & Hospitality Management",
  description:
    "Your paper has been successfully submitted to the International Conference on Sustainable Tourism & Hospitality Management",
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2f761a]">Submission Successful!</h2>
          <div className="mt-4 text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your journal has been successfully submitted to the ICSIFT.
          </p>
        </div>
        <div className="mt-6">
          <p className="text-center text-gray-700">
            A confirmation email has been sent to your email address. Our team will review your submission and get back
            to you soon.
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#22761a] hover:bg-[#15602e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a5276]"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

