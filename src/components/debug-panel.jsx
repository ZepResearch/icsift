"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code } from "lucide-react"



export function DebugPanel({ data, messages, error }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="outline"
        className={`flex items-center gap-2 ${error ? "bg-red-100" : ""}`}
      >
        <Code size={16} />
        {isOpen ? "Hide Debug" : "Debug"}
        {error && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
      </Button>

      {isOpen && (
        <Card className="absolute bottom-12 right-0 w-[500px] max-h-[600px] overflow-auto shadow-xl">
          <CardHeader className="sticky top-0 bg-card z-10">
            <CardTitle className="text-sm">Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-xs">
            <div className="space-y-4">
              {error && (
                <div className="bg-red-100 p-2 rounded border border-red-300">
                  <h3 className="font-bold mb-1 text-red-700">Error:</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              <div>
                <h3 className="font-bold mb-1">Messages:</h3>
                <pre className="bg-muted p-2 rounded overflow-auto max-h-[200px]">
                  {JSON.stringify(messages, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-bold mb-1">Conference Data:</h3>
                <pre className="bg-muted p-2 rounded overflow-auto max-h-[200px]">{JSON.stringify(data, null, 2)}</pre>
              </div>
              <div>
                <h3 className="font-bold mb-1">Environment:</h3>
                <pre className="bg-muted p-2 rounded overflow-auto max-h-[100px]">
                  {`NEXT_PUBLIC_POCKETBASE_URL: ${process.env.NEXT_PUBLIC_POCKETBASE_URL ? "Set" : "Not set"}
OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? "Set" : "Not set"}`}
                </pre>
              </div>
              <div className="mt-4">
                <h3 className="font-bold mb-1">Troubleshooting:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Make sure OPENAI_API_KEY is set in your .env.local file</li>
                  <li>Check that your OpenAI API key has sufficient credits</li>
                  <li>Verify that your PocketBase server is running correctly</li>
                  <li>Try restarting your Next.js development server</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
