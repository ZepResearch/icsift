import { NextResponse } from "next/server"
import PocketBase from "pocketbase"
import { resend } from "@/lib/resend"
import { getUserEmailTemplate, getAdminEmailTemplate } from "@/emails/email-templates"

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    // Get reCAPTCHA token
    const recaptchaToken = formData.get("recaptcha_token")

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA token is missing" },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA with Google
    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    )

    const verifyData = await verifyResponse.json()

    // Check if reCAPTCHA verification failed
    if (!verifyData.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: "reCAPTCHA verification failed. Please try again." 
        },
        { status: 400 }
      )
    }

    // Initialize PocketBase
    const pb = new PocketBase("https://conference.pockethost.io")
    const zepPb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL_ZEP || "https://admin.zepresearch.com")

    // Extract file if present
    const file = formData.get("file")
    let fileUrl = ""

    // Create data object for PocketBase
    const data = {
      user: formData.get("user"),
      author: formData.get("author"),
      phone_number: formData.get("phone_number"),
      email: formData.get("email"),
      country: formData.get("country"),
      co_author: formData.get("co_author"),
      paper_title: formData.get("paper_title"),
      department: formData.get("department"),
      organization: formData.get("organization"),
      paper_type: formData.get("paper_type"),
      presentation_type: formData.get("presentation_type"),
      message: formData.get("message"),
      know_to_you: formData.get("know_to_you"),
    }

    // Create a new FormData for PocketBase (needed for file upload)
    const pbFormData = new FormData()

    // Add all fields to PocketBase FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        pbFormData.append(key, value)
      }
    })

    // Add file if present
    if (file && file.size > 0) {
      pbFormData.append("file", file)
    }

    // Submit to PocketBase
    const record = await pb.collection("ICSIFT_paper_form_submission").create(pbFormData)

    // Get file URL if a file was uploaded
    if (record.file && record.file.length > 0) {
      // Use the URL method as per latest documentation
      fileUrl = pb.files.getURL(record, record.file, { download: 1 })
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: "Conference <info@icsift.com>",
      to: data.email,
      subject: "Paper Submission Confirmation - ICSIFT ",
      html: getUserEmailTemplate(data),
    })

    // Send notification email to admin
    await resend.emails.send({
      from: "Conference <info@icsift.com>",
      to: "info@icsift.com", // Replace with actual admin email
      subject: "New Paper Submission - ICSIFT ",
      html: getAdminEmailTemplate(data, fileUrl),
    })

    // Also write the same record to the ZEP PocketBase instance
    try {
      // Get the user's auth token from the request
      const authToken = formData.get("auth_token")

      // Authenticate ZEP PocketBase with the user's token
      if (authToken) {
        zepPb.authStore.save(authToken)
      } else {
        console.warn("No auth token provided for ZEP PocketBase")
      }

      const zepFormData = new FormData()
      const zepData = {
        conference: "9cj5n4788ilx2ms",
        conf_name: "ICSIFT",
        user: formData.get("user"),
        author: formData.get("author"),
        phone_number: formData.get("phone_number"),
        email: formData.get("email"),
        country: formData.get("country"),
        co_author: formData.get("co_author"),
        paper_title: formData.get("paper_title"),
        department: formData.get("department"),
        organization: formData.get("organization"),
        paper_type: formData.get("paper_type"),
        presentation_type: formData.get("presentation_type"),
        message: formData.get("message"),
        know_to_you: formData.get("know_to_you"),
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

      await zepPb.collection("conf_paper_submission_all").create(zepFormData)
    } catch (zepError) {
      console.error("Error creating ZEP PocketBase record:", zepError)
      // don't fail the main submission if the secondary record cannot be created
    }

    return NextResponse.json({
      success: true,
      message: "Paper submitted successfully",
    })
  } catch (error) {
    console.error("Error submitting paper:", error)
    
    // Provide more specific error messages
    let errorMessage = "Failed to submit paper"
    
    if (error.message.includes("reCAPTCHA")) {
      errorMessage = "reCAPTCHA verification failed"
    } else if (error.message.includes("PocketBase")) {
      errorMessage = "Database error occurred"
    } else if (error.message.includes("email")) {
      errorMessage = "Email sending failed"
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    )
  }
}