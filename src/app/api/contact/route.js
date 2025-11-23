import { NextResponse } from "next/server"
import { Resend } from "resend"
import AdminEmailTemplate from "@/emails/admin-template"
import UserEmailTemplate from "@/emails/user-template"

const resend = new Resend(process.env.RESEND_API_KEY)

async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`

  try {
    const response = await fetch(verificationUrl, {
      method: "POST",
    })
    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function POST(request) {
  try {
    const { name, email, subject, message, phoneNumber, recaptchaToken } = await request.json()

    // Validate the request data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields. Please fill out all fields." }, { status: 400 })
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA verification is required." }, { status: 400 })
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
    
    if (!isValidRecaptcha) {
      return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 })
    }

    // Send email to admin
    const adminEmailData = await resend.emails.send({
      from: "info@icsift.com",
      to: "info@icsift.com", // Admin email
      subject: `ICSIFT | New Contact Form Submission: ${subject}`,
      react: AdminEmailTemplate({
        name,
        email,
        subject,
        message,
        phoneNumber,
      }),
    })

    // Send confirmation email to user
    const userEmailData = await resend.emails.send({
      from: "info@icsift.com",
      to: email, // User's email
      subject: "ICSIFT | Thank you for contacting us",
      react: UserEmailTemplate({
        name,
      }),
    })

    return NextResponse.json(
      {
        message: "Emails sent successfully",
        adminEmailId: adminEmailData.id,
        userEmailId: userEmailData.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 })
  }
}