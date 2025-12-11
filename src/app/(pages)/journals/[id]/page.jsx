import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getJournalById } from "@/lib/pocketbase"
import { ArrowLeft } from "lucide-react"
import PaperSubmissionForm from "./components/Form"

export const dynamic = "force-dynamic"

export default async function JournalDetailPage({ params }) {
  const journal = await getJournalById(params.id)

  if (!journal) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12">
      <Link href="/journals">
        <Button variant="ghost" className="mb-8 group hover:bg-transparent">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Journals
        </Button>
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Journal Details - Left Side */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {journal.title || "Untitled Journal"}
          </h1>

          <div className="relative h-96  w-full overflow-hidden ">
            {journal.imgs ? (
              <Image
                src={`https://zep-research.pockethost.io/api/files/Journals/${journal.id}/${journal.imgs}`}
                alt={journal.title || "Journal cover"}
                fill
                className="object-contain"
                priority
              />
            ) : journal.img ? (
              <Image
                src={journal.img || "/placeholder.svg"}
                alt={journal.title || "Journal cover"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {journal.issncode && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">ISSN Code</h2>
              <p className="px-4 py-2 bg-gray-50 rounded-md font-mono text-gray-700">{journal.issncode}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            {/* <div>
              <h2 className="text-lg font-semibold mb-2">Created</h2>
              <p className="px-4 py-2 bg-gray-50 rounded-md text-gray-700">
                {new Date(journal.created).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Last Updated</h2>
              <p className="px-4 py-2 bg-gray-50 rounded-md text-gray-700">
                {new Date(journal.updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div> */}
          </div>
        </div>

        {/* Submission Form - Right Side */}
        <div>
          <PaperSubmissionForm journalId={journal.id} journalTitle={journal.title || "Untitled Journal"} />
        </div>
      </div>
    </div>
  )
}
