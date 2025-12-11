import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-12">
      <Button variant="ghost" className="mb-8" disabled>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Journals
      </Button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Journal Details - Left Side */}
        <div className="space-y-8">
          <Skeleton className="h-12 w-3/4" />

          <Skeleton className="aspect-[3/4] w-full rounded-xl" />

          <div className="mb-6">
            <Skeleton className="h-7 w-32 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Skeleton className="h-7 w-32 mb-2" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div>
              <Skeleton className="h-7 w-32 mb-2" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Submission Form - Right Side */}
        <div>
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
            <CardHeader className="space-y-1 pb-6 pt-6">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <Skeleton className="h-10 w-full mb-4" />
                </div>

                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-24 w-full" />
                </div>

                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
