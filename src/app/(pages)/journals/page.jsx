import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getJournals } from "@/lib/pocketbase"

export const dynamic = "force-dynamic"

export default async function JournalsPage() {
  const journals = await getJournals()

  return (
    <div className="container mx-auto py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Academic Journals
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of academic journals and research publications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {journals.map((journal) => (
          <Link href={`/journals/${journal.id}`} key={journal.id} className="group">
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-gray-200 hover:border-gray-300">
              <div className="relative h-[300px] bg-gradient-to-t from-lime-300 to-lime-800 w-full overflow-hidden">
                {journal.imgs ? (
                  <Image
                    src={`https://zep-research.pockethost.io/api/files/Journals/${journal.id}/${journal.imgs}`}
                    alt={journal.title || "Journal cover"}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : journal.img ? (
                  <Image
                    src={journal.img || "/placeholder.svg"}
                    alt={journal.title || "Journal cover"}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No image available</span>
                  </div>
                )}
              </div>
              <CardContent className="flex-grow pt-4">
                <h2 className="text-lg font-medium line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {journal.title || "Untitled Journal"}
                </h2>
                {journal.issncode && (
                  <p className="text-sm text-muted-foreground mt-2 font-mono">ISSN: {journal.issncode}</p>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <span className="text-sm font-medium text-primary   transition-opacity flex items-center">
                  View Details & Submit Paper your Journal
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}

        {journals.length === 0 && (
          <div className="col-span-full text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <p className="text-muted-foreground">No journals found in the collection</p>
          </div>
        )}
      </div>
    </div>
  )
}
