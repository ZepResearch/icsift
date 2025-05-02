import { NextResponse } from "next/server"
import { Resend } from "resend"
import AdminEmailTemplate from "@/emails/admin-template"
import UserEmailTemplate from "@/emails/user-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, subject, message, phoneNumber } = await request.json()

    // Validate the request data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields. Please fill out all fields." }, { status: 400 })
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
