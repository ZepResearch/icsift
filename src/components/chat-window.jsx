"use client"


import { useState, useEffect, useRef } from "react"
import { SendIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatMessage } from "./chat-message"
import { useChatbot } from "@/hooks/use-chatbot"
import { DebugPanel } from "./debug-panel"


export function ChatWindow({ onClose }) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)
  const { messages, isLoading, sendMessage, conferenceData, error } = useChatbot()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput("")
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <Card className="w-full max-w-[500px] h-[80vh] sm:h-[700px] sm:max-h-[90vh] shadow-2xl bg-gradient-to-br from-white to-[#d3e4c5]/20 backdrop-blur-xl border-0 sm:border-2 sm:border-[#d3e4c5]/50 sm:rounded-2xl overflow-hidden mx-auto">
      <CardHeader className="bg-gradient-to-r from-[#4d724d] to-[#4d724d]/90 p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4d724d] to-[#4d724d]/80 opacity-90"></div>
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
        <CardTitle className="text-center text-white drop-shadow-lg relative z-10 flex items-center justify-center gap-2 text-lg sm:text-xl font-semibold">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#d3e4c5]" />
          <span className="truncate">ICSIFT 2025 Assistant</span>
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#d3e4c5]" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6 h-[calc(100vh-180px)] sm:h-[520px] overflow-y-auto bg-gradient-to-b from-transparent to-[#d3e4c5]/5">
        <div className="space-y-2">
          {messages.length === 0 ? (
            <div className="text-center py-8 sm:py-12 space-y-4 px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#d3e4c5] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-[#4d724d]" />
              </div>
              <div className="space-y-2">
                <p className="text-[#4d724d] text-base sm:text-lg font-medium">Welcome to ICSIFT 2025!</p>
                <p className="text-gray-600 text-sm leading-relaxed">Ask me anything about the conference and I'll help you find the information you need.</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4 sm:mt-6">
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-[#d3e4c5] text-[#4d724d] text-xs rounded-full">Schedule</span>
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-[#d3e4c5] text-[#4d724d] text-xs rounded-full">Speakers</span>
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-[#d3e4c5] text-[#4d724d] text-xs rounded-full">Venue</span>
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-[#d3e4c5] text-[#4d724d] text-xs rounded-full">Registration</span>
              </div>
            </div>
          ) : (
            messages.map((message, index) => <ChatMessage key={index} message={message} />)
          )}
          {isLoading && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Thinking...",
                isLoading: true,
              }}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-[#d3e4c5]/30 p-3 sm:p-4 bg-gradient-to-r from-white to-[#d3e4c5]/10">
        <form onSubmit={handleSubmit} className="flex w-full gap-2 sm:gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about ICSIFT 2025..."
            disabled={isLoading}
            className="flex-1 border-2 border-[#d3e4c5] focus:border-[#4d724d] focus:ring-[#4d724d]/20 rounded-xl px-3 py-2 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading}
            className="bg-[#4d724d] hover:bg-[#4d724d]/90 text-white rounded-xl h-9 w-9 sm:h-10 sm:w-10 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>

      {/* Debug panel */}
      {/* <DebugPanel data={conferenceData} messages={messages} error={error} /> */}
    </Card>
  )
}