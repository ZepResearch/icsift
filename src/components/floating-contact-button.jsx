"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Phone, Bot, MessageSquare, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatWindow } from "./chat-window"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function FloatingContactButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [isTawkActive, setIsTawkActive] = useState(false)

  const openWhatsApp = () => {
    window.open("https://wa.me/+919237388328", "_blank")
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      setActiveChat(null)
      setIsTawkActive(false)
    }
  }

  const openChat = (chatType) => {
    setActiveChat(chatType)
    setIsExpanded(false)

    if (chatType === "live") {
      setIsTawkActive(true)
      // Initialize Tawk.to if not already done
      initializeTawk()
    } else {
      setIsTawkActive(false)
      hideTawk()
    }
  }

  const closeChat = () => {
    setActiveChat(null)
    setIsTawkActive(false)
    hideTawk()
  }

  const initializeTawk = () => {
    if (typeof window === "undefined") return

    // Check if Tawk script is already loaded
    if (!window.Tawk_API) {
      window.Tawk_API = {}
      window.Tawk_LoadStart = new Date()

      const script = document.createElement("script")
      script.async = true
      script.src = "https://embed.tawk.to/682460cfd4ac681917c35f1f/1ir71kb0n"
      script.charset = "UTF-8"
      script.setAttribute("crossorigin", "*")

      document.head.appendChild(script)
    } else {
      // If already loaded, just show it
      showTawk()
    }
  }

  const showTawk = () => {
    if (window.Tawk_API && window.Tawk_API.showWidget) {
      window.Tawk_API.showWidget()
      setTimeout(() => {
        if (window.Tawk_API.maximize) {
          window.Tawk_API.maximize()
        }
      }, 100)
    }
  }

  const hideTawk = () => {
    if (window.Tawk_API && window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget()
    }
  }

  useEffect(() => {
    if (isTawkActive) {
      showTawk()
    } else {
      hideTawk()
    }
  }, [isTawkActive])

  return (
    <div
      className={`fixed bottom-6 z-50 flex flex-col items-end transition-all duration-300 ${
        isTawkActive ? "right-[100px]" : "right-4"
      }`}
    >
      {/* Active AI Chat Window */}
      {activeChat === "ai" && (
        <div className="mb-4 relative">
          <div className="relative">
            <ChatWindow onClose={closeChat} />
            <Button
              onClick={closeChat}
              size="icon"
              variant="secondary"
              className="absolute left-2 top-8 h-8 w-8 rounded-full shadow-md border bg-white hover:bg-gray-100 z-10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Expanded Options */}
      <AnimatePresence>
        {isExpanded && (
          <div className="flex flex-col gap-3 mb-3">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <Button
                onClick={openWhatsApp}
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-green-500 hover:bg-green-600"
                title="WhatsApp"
              >
                <Image src={'/assets/whatsapp.png'} alt="whatsapp" height={100} width={100}/>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Button
                onClick={() => openChat("live")}
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
                title="Live Chat"
              >
                <Headphones  className="h-12 w-12 text-white" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={() => openChat("ai")}
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-[#4d724d] hover:bg-[#3e5c3e]"
                title="AI Assistant"
              >
                <Bot className="h-6 w-6 text-white" />
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <Button
        onClick={toggleExpanded}
        size="icon"
        className={`h-14 w-14 rounded-full shadow-lg transition-all ${
          isExpanded ? "bg-red-500 hover:bg-red-600" : "bg-[#4d724d] hover:bg-[#3e5c3e]"
        }`}
      >
        {isExpanded ? <X className="h-7 w-7 text-white" /> : <Headphones className="h-7 w-7 text-white" />}
      </Button>
    </div>
  )
}
