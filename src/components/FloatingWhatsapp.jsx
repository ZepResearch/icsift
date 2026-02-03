"use client"

import { MessageCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false)

  // Replace with your WhatsApp number (include country code without + sign)
  const phoneNumber = "+918260080050"
  const message = ""

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        <div
          className={`absolute left-16 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}
        >
          Chat with us on WhatsApp
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>

        {/* WhatsApp Button */}
        <div className="relative">
          {/* Pulse animation rings */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-30"></div>

          {/* Main button */}
          <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <Image
              src="/whatsapp.png"
              alt="WhatsApp Icon"
              fill
    
              className="text-white rounded-4xl"
            />

            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
              <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
