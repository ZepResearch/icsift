import { NextResponse } from "next/server"
import PocketBase from "pocketbase"
import { resend } from "@/lib/resend"
import { getUserEmailTemplate, getAdminEmailTemplate } from "@/emails/journal-templates"

export async function POST(request) {
  try {
    const formData = await request.formData()

    // Initialize PocketBase instances
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
    const zepPb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL || "https://admin.zepresearch.com")

    // Extract file if present
    const file = formData.get("file")
    let fileUrl = ""

    const data = {
      author: formData.get("author"),
      phone_number: formData.get("phone_number"),
      email: formData.get("email"),
      country: formData.get("country"),
      co_author: formData.get("co_author"),
      paper_title: formData.get("paper_title"),
      department: formData.get("department"),
      organization: formData.get("organization"),
      message: formData.get("message"),
      journal_name: formData.get("journal_name"),
      user: formData.get("user"),
    }

    const pbFormData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        pbFormData.append(key, value)
      }
    })

    if (file && file.size > 0) {
      pbFormData.append("file", file)
    }

    const record = await pb.collection("ICSIFT_journal_form_submission").create(pbFormData)

    if (record.file && record.file.length > 0) {
      fileUrl = pb.getFileUrl(record, record.file[0])
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: "ICSIFT|Journal-Submission <info@icsift.com>",
      to: data.email,
      subject: "Journal Submission Confirmation - ICSIFT",
      html: getUserEmailTemplate(data),
    })

    // Send notification email to admin
    await resend.emails.send({
      from: "ICSIFT | Submission <info@icsift.com>",
      to: "info@icsift.com",
      subject: "New Journal Submission - from ICSIFT",
      html: getAdminEmailTemplate(data, fileUrl),
    })

    // Also create a record in the ZEP PocketBase instance
    try {
      const zepFormData = new FormData()
      const zepData = {
        user: formData.get("user"),
        author: formData.get("author"),
        journal_name: formData.get("journal_name"),
        phone_number: formData.get("phone_number"),
        email: formData.get("email"),
        country: formData.get("country"),
        co_author: formData.get("co_author"),
        paper_title: formData.get("paper_title"),
        department: formData.get("department"),
        organization: formData.get("organization"),
        message: formData.get("message"),
        status: "pending",
      }
      Object.entries(zepData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          zepFormData.append(key, value)
        }
      })

      if (file && file.size > 0) {
        zepFormData.append("file", file)
      }

      await zepPb.collection("paper_form_submission").create(zepFormData)
    } catch (zepError) {
      console.error("Error creating ZEP PocketBase record:", zepError)
      // don't fail the entire submission if the secondary record cannot be created
    }

    return NextResponse.json({
      success: true,
      message: "Paper submitted successfully",
    })
  } catch (error) {
    console.error("Error submitting paper:", error)
    return NextResponse.json({ success: false, message: "Failed to submit paper" }, { status: 500 })
  }
}

