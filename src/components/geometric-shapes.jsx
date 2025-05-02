"use client"

import { useEffect, useState } from "react"

export function GeometricShapesCSS() {
  const [mounted, setMounted] = useState(false)

  // Only run animations after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-50">
      {/* Only show animations after mounting to prevent hydration mismatch */}
      <div className={`w-full h-full relative ${mounted ? "animate-shapes" : ""}`}>
        {/* Top left shapes */}
        <div
          className="absolute left-[10%] top-[15%] w-24 h-24 rounded-full bg-[#d3e4c5] opacity-80 animate-float-slow"
          style={{ animationDelay: "0s" }}
        />

        <div
          className="absolute left-[15%] top-[20%] w-16 h-16 rounded-full border-8 border-[#4d724d] opacity-70 animate-float"
          style={{ animationDelay: "-2s" }}
        />

        {/* Top right shapes */}
        <div
          className="absolute right-[10%] top-[15%] w-20 h-20 rounded-full bg-[#d3e4c5] opacity-80 animate-float-slow"
          style={{ animationDelay: "-1.5s" }}
        />

        {/* Bottom left shapes */}
        <div
          className="absolute left-[12%] bottom-[20%] w-16 h-16 bg-[#b9d4a3] opacity-80 animate-float"
          style={{
            animationDelay: "-3s",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        />

        {/* Bottom right shapes */}
        <div
          className="absolute right-[15%] bottom-[25%] w-16 h-16 bg-[#d3e4c5] opacity-80 animate-float-slow"
          style={{
            animationDelay: "-2.5s",
            clipPath:
              "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
          }}
        />

        {/* Center background shape */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] border-[1.5rem] border-[#4d724d] opacity-20 rounded-full animate-spin-slow"
          style={{
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            animationDelay: "-1s",
          }}
        />

        {/* Additional decorative shapes */}
        <div
          className="absolute left-[30%] top-[40%] w-12 h-12 bg-[#d3e4c5] opacity-40 animate-float"
          style={{
            animationDelay: "-4s",
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        />

        <div
          className="absolute right-[30%] top-[60%] w-14 h-14 border-4 border-[#4d724d] opacity-50 rounded-full animate-float-slow"
          style={{ animationDelay: "-3.5s" }}
        />
      </div>
    </div>
  )
}
