"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { createPortal } from "react-dom"

export default function VideoSection({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef(null)

  // Only use portals on the client side
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const openVideo = (video) => {
    setActiveVideo(video)
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeVideo = () => {
    setActiveVideo(null)
    // Restore scrolling
    document.body.style.overflow = "auto"
  }

  // Close modal when clicking outside the video
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeVideo()
    }
  }

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && activeVideo) {
        closeVideo()
      }
    }
    
    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [activeVideo])

  // Video Modal Component
  const VideoModal = () => {
    if (!activeVideo) return null
    
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center bg-black/90"
        onClick={handleOverlayClick}
        style={{ 
          backdropFilter: "blur(3px)",
          zIndex: 9999 // Very high z-index to ensure it's above everything
        }}
      >
        <div ref={modalRef} className="relative w-full max-w-4xl mx-4">
          <button
            onClick={closeVideo}
            className="absolute -right-4 -top-4 z-10 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-2xl">
            <iframe
              src={`${activeVideo.videoUrl}?autoplay=1`}
              title={activeVideo.title}
              className="h-full w-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="group cursor-pointer" onClick={() => openVideo(video)}>
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
              <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/90 p-3">
                  <Play className="h-8 w-8 text-gray-900" />
                </div>
              </div>
            </div>
            <h3 className="mt-2 text-lg font-medium">{video.title}</h3>
          </div>
        ))}
      </div>

      {/* Use createPortal to render the modal at the document level */}
      {mounted && activeVideo && createPortal(<VideoModal />, document.body)}
    </div>
  )
}