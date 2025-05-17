"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CustomPaymentForm({ onSubmit }) {
  const [amount, setAmount] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)

  const handleAmountChange = (e) => {
    const value = e.target.value
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!amount || isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    setIsCalculating(true)

    // Calculate tax and total
    const baseAmount = Number.parseFloat(amount)
    const taxAmount = baseAmount * 0.06
    const totalAmount = baseAmount + taxAmount

    // Format for display
    const formattedBaseAmount = baseAmount.toFixed(2)
    const formattedTaxAmount = taxAmount.toFixed(2)
    const formattedTotalAmount = totalAmount.toFixed(2)

    // Create payment data
    const paymentData = {
      name: "Custom Payment",
      price: baseAmount,
      taxRate: 0.06,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      currency: "USD",
      type: "Custom",
      category: "Custom",
    }

    // Submit after a short delay to show calculation
    setTimeout(() => {
      setIsCalculating(false)
      onSubmit(paymentData)
    }, 500)
  }

  // Calculate tax and total for display
  const baseAmount = amount ? Number.parseFloat(amount) : 0
  const taxAmount = baseAmount * 0.06
  const totalAmount = baseAmount + taxAmount

  // Check if amount is valid
  const isValidAmount = amount && !isNaN(baseAmount) && baseAmount > 0

  return (
    <div className="bg-white rounded-3xl border border-[#d3e4c5] overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-[#d3e4c5]/50 to-[#b9d4a3]/50 p-6">
        <h3 className="text-xl font-bold text-[#1a2e1a]">Custom Payment</h3>
        <p className="text-[#4d724d] mt-2">Enter a custom amount for your registration</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <Label htmlFor="custom-amount" className="text-[#1a2e1a] font-medium">
            Payment Amount (USD)
          </Label>
          <div className="relative mt-2">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4d724d]" />
            <Input
              id="custom-amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="pl-10 border-[#d3e4c5] focus:ring-[#4d724d] focus:border-[#4d724d]"
              placeholder="0.00"
            />
          </div>
          <p className="text-sm text-[#4d724d] mt-2">A 6% tax will be added to your payment</p>
        </div>

        {isValidAmount && (
          <div className="space-y-2 mb-6 p-4 bg-[#edf6e1] rounded-xl border border-[#d3e4c5]">
            <div className="flex justify-between text-sm">
              <span className="text-[#4d724d]">Base Amount:</span>
              <span className="text-[#1a2e1a] font-medium">${baseAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4d724d]">Tax (6%):</span>
              <span className="text-[#1a2e1a] font-medium">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-[#d3e4c5]">
              <span className="text-[#4d724d]">Total:</span>
              <span className="text-[#1a2e1a] font-bold">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full"
          disabled={!isValidAmount || isCalculating}
        >
          {isCalculating ? "Calculating..." : "Proceed to Payment"}
        </Button>
      </form>
    </div>
  )
}
