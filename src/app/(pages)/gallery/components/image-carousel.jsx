"use client"


import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"



export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
  }

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      goToNext()
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      goToPrevious()
    }
  }

  useEffect(() => {
    // Auto-advance the carousel every 5 seconds if autoplay is enabled
    let interval
    if (isAutoPlaying) {
      interval = setInterval(goToNext, 5000)
    }
    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying])

  // Reset transition state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentIndex])

  if (images.length === 0) {
    return <div className="text-center py-10">No images to display</div>
  }

  return (
    <div className="relative overflow-hidden rounded-xl shadow-2xl">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-700 ease-in-out",
              index === currentIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105",
            )}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === currentIndex}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <p className="text-sm md:text-base font-medium">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white shadow-lg transition-all hover:bg-white/30 focus:outline-none"
        aria-label="Previous image"
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white shadow-lg transition-all hover:bg-white/30 focus:outline-none"
        aria-label="Next image"
        disabled={isTransitioning}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/60",
            )}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Autoplay toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className={cn(
          "absolute bottom-4 right-4 z-20 px-3 py-1 text-xs rounded-full transition-all",
          isAutoPlaying ? "bg-white/20 text-white" : "bg-white/10 text-white/70",
        )}
      >
        {isAutoPlaying ? "Pause" : "Play"}
      </button>
    </div>
  )
}
