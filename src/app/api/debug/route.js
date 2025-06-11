// A debug endpoint to check if the API routes are working
export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "Debug endpoint is working",
      env: {
        hasPocketBaseUrl: !!process.env.NEXT_PUBLIC_POCKETBASE_URL,
        hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
