"use client"

import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ChatWindow } from "./chat-window"

export function ChatButton({ onClose }) {
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="relative">
      <ChatWindow onClose={handleClose} />
      <Button
        onClick={handleClose}
        size="icon"
        variant="secondary"
        className="absolute -left-2 -top-2 h-8 w-8 rounded-full shadow-md border bg-white hover:bg-gray-100 z-10"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
