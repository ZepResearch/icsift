import { NextResponse } from "next/server"
import { randomBytes } from "crypto"
import CCAvenue from "@/utils/CCAvenue"
import { resend } from "@/lib/resend"
import PaymentInitiatedEmail from "@/emails/PaymentInitiatedEmail"
import { validateBilling } from "@/lib/billing"
import { CURRENCY, customAmountProblem, resolveSponsor, resolveTicket, withTax } from "@/lib/pricing"
import { signPayload } from "@/lib/payment-signature"
import { clientIp, createRateLimiter, escapeAll, verifyZepUser } from "@/lib/submission-guard"

// Builds and encrypts the CCAvenue order. The browser says what it wants to buy (a ticket key, a sponsor
// package or a custom amount) plus billing details; the price, order id and return URLs are decided here.

const rateLimited = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 })
const fail = (status, message, errors) => NextResponse.json({ error: message, ...(errors ? { errors } : {}) }, { status })

const orderId = (prefix) => `${prefix}-${Date.now()}-${randomBytes(2).toString("hex").toUpperCase()}`

export async function POST(request) {
  const ip = clientIp(request)
  if (Number(request.headers.get("content-length") || 0) > 20_000) return fail(413, "The request is too large.")
  if (rateLimited(ip)) return fail(429, "Too many payment attempts from this network. Please wait 15 minutes and try again.")

  let body
  try {
    body = await request.json()
  } catch {
    return fail(400, "The payment request could not be read. Please refresh the page and try again.")
  }
  if (body.website) return fail(400, "The payment request could not be processed.")

  const { values: billing, errors } = validateBilling(body)
  if (Object.keys(errors).length) return fail(422, "Some billing details need attention.", errors)

  // Work out what is being bought, and its price, from the server-side price list.
  let item
  if (body.kind === "ticket" || body.kind === "custom") {
    const { user } = await verifyZepUser(String(body.auth_token || ""))
    if (!user) return fail(401, "Your session has expired. Sign in again, then continue to payment.")

    if (body.kind === "ticket") {
      const ticket = resolveTicket(body.ticket_key)
      if (!ticket) return fail(400, "That registration option is not available. Refresh the page and choose again.")
      item = {
        prefix: "ORDER",
        amount: ticket.totalAmount,
        fields: { ticket_type: ticket.type, ticket_category: ticket.category, ticket_name: ticket.name },
      }
    } else {
      const problem = customAmountProblem(body.amount)
      if (problem) return fail(422, problem, { amount: problem })
      item = {
        prefix: "ORDER",
        amount: withTax(Number(body.amount)).totalAmount,
        fields: { ticket_type: "Custom", ticket_category: "Custom", ticket_name: "Custom Payment" },
      }
    }
  } else if (body.kind === "sponsor") {
    const pkg = resolveSponsor(body.package)
    if (!pkg) return fail(400, "That sponsorship package is not available. Refresh the page and choose again.")
    item = {
      prefix: "SPONSOR",
      amount: pkg.price,
      fields: { package_name: pkg.title, package_type: "Sponsorship", ticket_type: "Sponsorship", ticket_category: "Sponsorship", ticket_name: `${pkg.title} sponsorship` },
    }
  } else {
    return fail(400, "Choose what you are paying for, then try again.")
  }

  const paymentData = {
    ...billing,
    order_id: orderId(item.prefix),
    currency: CURRENCY,
    amount: item.amount.toFixed(2),
    language: "EN",
    ...item.fields,
  }

  // Order details ride along in the return URL, signed so /api/ccavenue/handle can trust them.
  const payload = JSON.stringify(paymentData)
  const returnUrl = `${request.nextUrl.origin}/api/ccavenue/handle?paymentData=${encodeURIComponent(payload)}&sig=${signPayload(payload)}`

  let encRequest
  try {
    encRequest = CCAvenue.getEncryptedOrder({ ...paymentData, redirect_url: returnUrl, cancel_url: returnUrl })
  } catch (error) {
    console.error("[ccavenue/encrypt] Encryption failed:", error?.message)
    return fail(500, "Payment could not be started just now. Please try again, or contact info@icsift.com.")
  }

  // "Payment initiated" emails, built from validated, HTML-escaped values. Failures are logged, not returned.
  const safe = escapeAll(paymentData)
  const results = await Promise.allSettled([
    resend.emails.send({
      from: process.env.FROM_EMAIL || "info@icsift.com",
      to: process.env.ADMIN_EMAIL || "info@icsift.com",
      replyTo: billing.billing_email,
      subject: "New Payment Initiated",
      html: PaymentInitiatedEmail({ ...safe, recipient: "admin" }),
    }),
    resend.emails.send({
      from: process.env.FROM_EMAIL || "info@icsift.com",
      to: billing.billing_email,
      subject: "Payment Initiated for ICSIFT Registration",
      html: PaymentInitiatedEmail({ ...safe, recipient: "user" }),
    }),
  ])
  results.forEach((r) => r.status === "rejected" && console.error("[ccavenue/encrypt] Email failed:", r.reason))

  return NextResponse.json({ encRequest })
}
