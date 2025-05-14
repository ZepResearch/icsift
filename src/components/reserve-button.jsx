"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ReserveForm } from "./reserve-form"

export const ReserveButton = ({ className }) => {
const [isOpen, setIsOpen] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  // Auto-open form after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleFormSubmitSuccess = () => {
    setIsOpen(false)
    setShowThankYou(true)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={className}>
        Reserve a Seat
      </Button>

      <ReserveForm
  isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onSubmitSuccess={handleFormSubmitSuccess}
      />    </>
  )
}
