import { NextResponse } from "next/server"
import { Resend } from "resend"
import PaymentInitiatedEmail from "@/emails/PaymentInitiatedEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const data = await req.json()

    // Send email to admin
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "info@icsift.com",
      to: process.env.ADMIN_EMAIL || "info@icsift.com",
      subject: "New Payment Initiated",
      html: PaymentInitiatedEmail({ ...data, recipient: "admin" }),
    })

    // Send confirmation email to client
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "info@icsift.com",
      to: data.billing_email,
      subject: "Payment Initiated for ICSIFT Registration",
      html: PaymentInitiatedEmail({ ...data, recipient: "user" }),
    })

    return NextResponse.json({ message: "Payment notification emails sent successfully" })
  } catch (error) {
    console.error("Error sending payment notification emails:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
