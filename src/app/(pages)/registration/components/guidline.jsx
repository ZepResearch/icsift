import { CreditCard, FileText, Globe, Mail, UserCheck } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Guidline() {
  const steps = [
    {
      number: 1,
      title: "Visit Conference Website",
      description: "Direct all participants to your official conference website for details.",
      icon: Globe,
    },
    {
      number: 2,
      title: "Choose Registration Category",
      description: "Participants select the appropriate registration type.",
      icon: UserCheck,
    },
    {
      number: 3,
      title: "Complete Registration Form",
      description: "Attendees fill out an online form with their details.",
      icon: FileText,
    },
    {
      number: 4,
      title: "Payment",
      description: "Provide multiple payment options (credit card, bank transfer, etc.).",
      icon: CreditCard,
    },
    {
      number: 5,
      title: "Confirmation",
      description: "Participants receive a confirmation email with payment details and an official receipt.",
      icon: Mail,
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Registration Guidelines</CardTitle>
        <CardDescription className="text-lg">
          Follow these simple steps to complete your conference registration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:gap-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div
                key={step.number}
                className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4d724d] text-white font-bold text-lg flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted flex-shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      Step {step.number}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border-l-4 border-rose-500 shadow-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Please ensure all information is accurate before submitting your registration. For
            any assistance, contact our support team.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
