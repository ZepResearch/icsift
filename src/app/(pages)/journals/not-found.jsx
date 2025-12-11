import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto py-24 text-center">
      <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">Journal Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The journal you're looking for doesn't exist or has been removed from our collection.
      </p>
      <Link href="/journals">
        <Button className="px-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Journals
        </Button>
      </Link>
    </div>
  )
}
