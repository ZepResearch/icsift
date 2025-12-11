import { FileText, Settings, Upload, User, Hash, Target, AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function AbstractSubmissionGuidelines() {
  const formatRequirements = [
    {
      label: "Word Limit",
      value: "250-300 words maximum",
      icon: FileText,
    },
    {
      label: "Font",
      value: "Arial or Times New Roman, 12-point",
      icon: Settings,
    },
    {
      label: "Spacing",
      value: "Single-spaced",
      icon: Settings,
    },
  ]

  const structureElements = [
    {
      title: "Title",
      description: "Clear and concise title of the paper (up to 15 words)",
      icon: Target,
      limit: "15 words max",
    },
    {
      title: "Author(s)",
      description: "Full name, affiliation, and email address for all authors. Identify the corresponding author",
      icon: User,
      limit: "Required",
    },
    {
      title: "Keywords",
      description: "3-5 relevant keywords related to the topic",
      icon: Hash,
      limit: "3-5 keywords",
    },
    {
      title: "Abstract Body",
      description: "Briefly describe the objective, methodology, results, and significance of the research",
      icon: FileText,
      limit: "Main content",
    },
  ]

  const submissionRequirements = [
    "Submit through the conference's online submission portal",
    "Ensure submissions are in PDF or Word (.doc/.docx) format",
    "Abstracts sent via email will not be accepted unless specifically permitted",
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Abstract Submission Guidelines</CardTitle>
        <CardDescription className="text-lg">
          Follow these requirements to ensure your abstract meets submission standards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Length & Format Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#4d724d]" />
            <h3 className="text-xl font-semibold">Length & Format</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {formatRequirements.map((req, index) => {
              const IconComponent = req.icon
              return (
                <div key={index} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{req.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{req.value}</p>
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        {/* Structure Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#4d724d]" />
            <h3 className="text-xl font-semibold">Required Structure</h3>
          </div>
          <div className="space-y-4">
            {structureElements.map((element, index) => {
              const IconComponent = element.icon
              return (
                <div key={index} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted flex-shrink-0 mt-1">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{element.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {element.limit}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{element.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        {/* Submission Platform Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#4d724d]" />
            <h3 className="text-xl font-semibold">Submission Platform</h3>
          </div>
          <div className="space-y-3">
            {submissionRequirements.map((requirement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm leading-relaxed">{requirement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-1">Important Notice</h4>
              <p className="text-sm text-amber-700">
                Please review all guidelines carefully before submission. Abstracts that do not meet these requirements
                may be rejected without review. For technical issues, contact the conference support team.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
