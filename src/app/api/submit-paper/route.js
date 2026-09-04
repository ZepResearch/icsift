import { NextResponse } from "next/server"
import PocketBase from "pocketbase"
import { resend } from "@/lib/resend"
import { getUserEmailTemplate, getAdminEmailTemplate } from "@/emails/email-templates"

const RECAPTCHA_BYPASS_TOKEN = "localhost-bypass"

function isLocalhostRequest(request) {
  const host = request.headers.get("host") || ""
  return host.startsWith("localhost") || host.startsWith("127.0.0.1")
}

export async function POST(request) {
  try {
    const formData = await request.formData()

    // Get reCAPTCHA token
    const recaptchaToken = formData.get("recaptcha_token")

    // Allow bypassing reCAPTCHA only when the request is actually coming from
    // localhost AND the special bypass token was sent. The host check means
    // this can't be triggered from a deployed environment even by mistake.
    const bypassRecaptcha = isLocalhostRequest(request) && recaptchaToken === RECAPTCHA_BYPASS_TOKEN

    if (!bypassRecaptcha) {
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

      if (!verifyData.success) {
        return NextResponse.json(
          {
            success: false,
            message: "reCAPTCHA verification failed. Please try again.",
          },
          { status: 400 }
        )
      }
    } else {
      console.log("[submit-paper] reCAPTCHA bypassed — localhost testing request")
    }

    // Initialize PocketBase
    const pb = new PocketBase("https://conference.pockethost.io")
    const zepPb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL_ZEP || "https://admin.zepresearch.com")

    // Extract file if present
    const file = formData.get("file")
    let fileUrl = ""

    // Create data object for PocketBase (ICSIFT instance)
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
    const zepStatus = { attempted: false, success: false, error: null }

    try {
      const authToken = formData.get("auth_token")
      // The authenticated ZEP user's id, sent explicitly from the client
      // (see page.jsx — formData.set("user_id", user.id)). This is what
      // conf_paper_submission_all's `user = @request.auth.id`-style rule
      // actually needs; formData.get("user") is never set by the form.
      const zepUserId = formData.get("user_id")

      if (!authToken) {
        console.warn("[submit-paper] No auth token provided for ZEP PocketBase — write will likely fail permission checks")
      } else {
        zepPb.authStore.save(authToken)
      }

      const zepFormData = new FormData()
      const zepData = {
        conference: "9cj5n4788ilx2ms",
        conf_name: "ICSIFT",
        user: zepUserId,
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

      zepStatus.attempted = true
      await zepPb.collection("conf_paper_submission_all").create(zepFormData)
      zepStatus.success = true
    } catch (zepError) {
      // PocketBase's ClientResponseError carries the real validation info in
      // .response.data / .data — .message alone is usually just "Failed to
      // create record." This is what was hiding the actual cause.
      const details = zepError?.response?.data || zepError?.data || null
      console.error("[submit-paper] Error creating ZEP PocketBase record:", {
        message: zepError.message,
        status: zepError.status,
        details,
      })
      zepStatus.error = details ? JSON.stringify(details) : zepError.message
      // don't fail the main submission if the secondary record cannot be created
    }

    if (!zepStatus.success) {
      console.warn("[submit-paper] ZEP write did not succeed:", zepStatus)
    }

    return NextResponse.json({
      success: true,
      message: "Paper submitted successfully",
      zep: zepStatus,
    })
  } catch (error) {
    console.error("Error submitting paper:", error)

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