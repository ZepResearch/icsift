import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { NextResponse } from "next/server"

// Set a reasonable timeout for the API
export const maxDuration = 15 // 15 seconds

// Rate limiting variables
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10
const requestLog = {}

// Token usage tracking
const MAX_TOKENS = 8000 // Limit tokens to control costs

// Check rate limit for an IP
function isRateLimited(ip) {
  const now = Date.now()

  // Initialize or clean up old requests
  if (!requestLog[ip]) {
    requestLog[ip] = []
  } else {
    requestLog[ip] = requestLog[ip].filter((time) => now - time < RATE_LIMIT_WINDOW)
  }

  // Check if rate limit exceeded
  if (requestLog[ip].length >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  // Log this request
  requestLog[ip].push(now)
  return false
}

export async function POST(req) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown"

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    // Parse request
    const { messages, conferenceData } = await req.json()

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    // Create system prompt with conference data
    const systemPrompt = `You are the official AI assistant for the 2nd International Conference on Sustainability, Innovation, and Future Technologies (ICSIFT) 2025.

CONFERENCE Committee:
${JSON.stringify(conferenceData.committee, null, 2)}

IMPORTANT DATES:
${JSON.stringify(conferenceData.importantDates, null, 2)}

Speaker:
${JSON.stringify(conferenceData.speakers, null, 2)}

materials:
${JSON.stringify(conferenceData.materials, null, 2)}

confernce information:
${JSON.stringify(conferenceData.conferenceInfo, null, 2)}

registration :
${JSON.stringify(conferenceData.registration, null, 2)}
give regisreation information in the proper format

GUIDELINES:
1. Only answer questions related to ICSIFT 2025. For unrelated questions, politely redirect to conference topics.
2. Format your responses with HTML for better readability. Use <h3>, <p>, <ul>, <li>, <b>, etc. tags as needed.
3. Be concise but informative.
4. Do not make up information that is not provided in the conference data.
5. If you don't know the answer, say so politely and suggest contacting the conference organizers.

Registration:



`

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1].content

    // Use generateText with Google Gemini model
    const { text } = await generateText({
      model: google("gemini-1.5-flash"), // Free Gemini model
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.role,
          content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
        })),
      ],
      maxTokens: MAX_TOKENS,
    })

    console.log("Response content:", text)

    return NextResponse.json({ content: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      {
        content: "Sorry, I encountered an error. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
