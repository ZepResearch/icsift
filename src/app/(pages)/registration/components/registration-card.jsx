"use client"

import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RegistrationCard({
  title,
  price,
  currency,
  taxRate,
  taxAmount,
  totalAmount,
  description,
  type,
  category,
  name,
  onSelect,
}) {
  const currencySymbol = currency === "USD" ? "$" : "€"
  const isStudent = category === "Students"
  const gradientFrom = isStudent ? "#d3e4c5" : "#b9d4a3"
  const gradientTo = isStudent ? "#b9d4a3" : "#d3e4c5"
  const iconColor = isStudent ? "text-[#4d724d]" : "text-[#1a2e1a]"

  // Calculate tax amount and total here to ensure consistency
  const calculatedTaxAmount = Number((price * taxRate).toFixed(2))
  const calculatedTotalAmount = Number((price + calculatedTaxAmount).toFixed(2))

  // Use calculated values instead of passed props to ensure consistency
  const displayTaxAmount = calculatedTaxAmount
  const displayTotalAmount = calculatedTotalAmount

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-[#d3e4c5]/50 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden h-full transition-all shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#d3e4c5]/50 to-[#b9d4a3]/50"></div>

        <div className="relative p-8 flex flex-col h-full">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4d724d] p-0.5 -mt-4 mb-6 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <CreditCard className={`h-8 w-8 ${iconColor}`} />
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#edf6e1] text-[#4d724d] border border-[#d3e4c5]">
              {type}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#1a2e1a] text-center mb-2">{title}</h3>

          <div className="mb-4 text-center">
            <span className="text-3xl font-bold text-[#4d724d]">
              {currencySymbol}
              {price}
            </span>
          </div>

          <p className="text-[#4d724d] mb-6 flex-grow text-center">{description}</p>

          <div className="space-y-2 mb-6 p-4 bg-[#edf6e1] rounded-xl border border-[#d3e4c5]">
            <div className="flex justify-between text-sm">
              <span className="text-[#4d724d]">Base Price:</span>
              <span className="text-[#1a2e1a] font-medium">
                {currencySymbol}
                {price.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4d724d]">Tax ({(taxRate * 100).toFixed(0)}%):</span>
              <span className="text-[#1a2e1a] font-medium">
                {currencySymbol}
                {displayTaxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-[#d3e4c5]">
              <span className="text-[#4d724d]">Total:</span>
              <span className="text-[#1a2e1a] font-bold">
                {currencySymbol}
                {displayTotalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            onClick={() =>
              onSelect({
                type,
                category,
                name,
                price,
                taxRate,
                taxAmount: calculatedTaxAmount,
                totalAmount: calculatedTotalAmount,
                currency,
              })
            }
            className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
          >
            <CreditCard className="mr-2 h-4 w-4 text-white" />
            Register Now
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
