"use client"

import { useEffect, useRef } from "react"

export default function TawkToChat({ isActive }) {
  const scriptLoaded = useRef(false)
  const initializationAttempted = useRef(false)

  useEffect(() => {
    // Only load the script once
    if (!scriptLoaded.current && !initializationAttempted.current) {
      initializationAttempted.current = true

      // Initialize Tawk.to
      if (typeof window !== "undefined") {
        window.Tawk_API = window.Tawk_API || {}
        window.Tawk_LoadStart = new Date()

        const script = document.createElement("script")
        script.async = true
        script.src = "https://embed.tawk.to/682460cfd4ac681917c35f1f/1ir71kb0n"
        script.charset = "UTF-8"
        script.setAttribute("crossorigin", "*")

        script.onload = () => {
          scriptLoaded.current = true

          // Set up event listeners
          if (window.Tawk_API) {
            window.Tawk_API.onLoad = function() {
              // Initially hide the widget
              if (window.Tawk_API.hideWidget) {
                window.Tawk_API.hideWidget()
              }
            }

            window.Tawk_API.onChatMinimized = function() {
              // Custom event when chat is minimized
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("tawkChatClosed"))
              }
            }

            window.Tawk_API.onChatHidden = function() {
              // Custom event when chat is hidden
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("tawkChatClosed"))
              }
            }
          }
        }

        script.onerror = () => {
          console.error("Failed to load Tawk.to script")
          initializationAttempted.current = false
        }

        document.head.appendChild(script)
      }
    }
  }, [])

  // Control widget visibility based on isActive prop
  useEffect(() => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      const controlWidget = () => {
        if (isActive) {
          if (window.Tawk_API.showWidget) {
            window.Tawk_API.showWidget()
            // Small delay to ensure widget is ready
            setTimeout(() => {
              if (window.Tawk_API.maximize) {
                window.Tawk_API.maximize()
              }
            }, 200)
          }
        } else {
          if (window.Tawk_API.hideWidget) {
            window.Tawk_API.hideWidget()
          }
        }
      }

      // If Tawk API is ready, control immediately
      if (window.Tawk_API.showWidget) {
        controlWidget()
      } else {
        // Wait for Tawk to be ready
        const checkReady = setInterval(() => {
          if (window.Tawk_API && window.Tawk_API.showWidget) {
            controlWidget()
            clearInterval(checkReady)
          }
        }, 100)

        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkReady), 10000)
      }
    }
  }, [isActive])

  return null
}
