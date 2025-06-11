"use client"

import { useState, useEffect } from "react"
import { fetchConferenceData } from "@/lib/pocketbase"



export function useChatbot() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [conferenceData, setConferenceData] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState(null)

  // Fetch conference data on first load
  useEffect(() => {
    const initializeChat = async () => {
      if (!isInitialized) {
        try {
          const data = await fetchConferenceData()
          setConferenceData(data)
          setIsInitialized(true)
          setError(null)
        } catch (error) {
          console.error("Failed to fetch conference data:", error)
          setError("Failed to fetch conference data")
        }
      }
    }

    initializeChat()
  }, [isInitialized])

  // Update the sendMessage function to properly handle the response
  const sendMessage = async (content) => {
    // Add user message
    const userMessage = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      // Format messages for API - ensure all messages have string content
      const formattedMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Send to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...formattedMessages, { role: "user", content }],
          conferenceData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to get response: ${response.status}`)
      }

      // Add assistant message - ensure we're getting a string from the response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: typeof data.content === "string" ? data.content : "Sorry, I received an invalid response format.",
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error instanceof Error ? error.message : "Unknown error")
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    isLoading,
    sendMessage,
    isInitialized,
    conferenceData,
    error,
  }
}
