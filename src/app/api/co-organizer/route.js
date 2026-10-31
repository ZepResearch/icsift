import { NextResponse } from "next/server"
import { resend } from "@/lib/resend"
import { validateCoOrganizer } from "@/lib/co-organizer"
import { checkRecaptcha, clientIp, createRateLimiter, escapeHtml } from "@/lib/submission-guard"

// Co-organiser applications. Checks run cheapest first, so abuse is turned away before any outside call:
// size → content type → same origin → rate limit → honeypot → fill time → reCAPTCHA → field validation → send.

const MAX_REQUEST_BYTES = 16 * 1024
const MIN_FILL_MS = 4000 // A person cannot read and fill twelve fields in under four seconds.
const MAX_FILL_MS = 24 * 60 * 60 * 1000
const rateLimited = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 3 })

const TO = process.env.CO_ORGANIZER_TO || "info@icsift.com"
const FROM = "ICSIFT <info@icsift.com>"

const fail = (status, message, errors) => NextResponse.json({ success: false, message, ...(errors ? { errors } : {}) }, { status })
// What bots see when a trap catches them: the same answer a person gets, so they learn nothing.
const quietSuccess = () => NextResponse.json({ success: true })

// The request must come from this site's own pages (blocks cross-site form posts). Allowed when no Origin is sent
// only outside production, so local tools still work.
function sameOrigin(request) {
  const origin = request.headers.get("origin")
  if (!origin) return process.env.NODE_ENV !== "production"
  try {
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host")
    return new URL(origin).host === host
  } catch {
    return false
  }
}

// One line of a subject or header: no line breaks (header injection), trimmed to a sane length.
const oneLine = (value, max = 120) => String(value).replace(/[\r\n]+/g, " ").slice(0, max)

function adminEmail(v) {
  const e = Object.fromEntries(Object.entries(v).map(([key, value]) => [key, Array.isArray(value) ? value.map(escapeHtml) : escapeHtml(value)]))
  const row = (label, value) =>
    value
      ? `<tr><td style="padding:8px 12px;background:#f4f1ec;font-weight:600;vertical-align:top;width:190px">${label}</td><td style="padding:8px 12px;vertical-align:top">${value}</td></tr>`
      : ""
  return `
  <div style="font-family:Arial,sans-serif;color:#213629;max-width:640px">
    <h2 style="margin:0 0 4px">New co-organiser application</h2>
    <p style="margin:0 0 16px;color:#6b604c">Sent from the About the co-organisers page. Reply to this email to answer the applicant.</p>
    <h3 style="margin:20px 0 6px">The institution</h3>
    <table style="border-collapse:separate;border-spacing:0 4px;width:100%;font-size:14px">
      ${row("Institution", e.institution)}
      ${row("Type", e.institution_type)}
      ${row("Country", e.country)}
      ${row("City", e.city)}
      ${row("Website", e.institution_website)}
    </table>
    <h3 style="margin:20px 0 6px">Contact person</h3>
    <table style="border-collapse:separate;border-spacing:0 4px;width:100%;font-size:14px">
      ${row("Name", e.contact_name)}
      ${row("Position", e.position)}
      ${row("Email", e.email)}
      ${row("Phone", e.phone_number)}
    </table>
    <h3 style="margin:20px 0 6px">The partnership</h3>
    <table style="border-collapse:separate;border-spacing:0 4px;width:100%;font-size:14px">
      ${row("Edition", e.edition)}
      ${row("Would contribute", e.contributions.join("<br>"))}
    </table>
    <h3 style="margin:20px 0 6px">Message</h3>
    <p style="white-space:pre-wrap;background:#f4f1ec;padding:12px;margin:0;font-size:14px">${e.message}</p>
  </div>`
}

function confirmationEmail(v) {
  const name = escapeHtml(v.contact_name)
  const institution = escapeHtml(v.institution)
  return `
  <div style="font-family:Arial,sans-serif;color:#213629;max-width:600px">
    <h2 style="margin:0 0 12px">Thank you, ${name}.</h2>
    <p>We have received the co-organiser application for <strong>${institution}</strong>. The ICSIFT team will review it and reply within a few working days.</p>
    <p>If you need to add anything, simply reply to this email.</p>
    <p style="margin-top:24px">The ICSIFT team<br><a href="https://icsift.com" style="color:#213629">icsift.com</a></p>
  </div>`
}

export async function POST(request) {
  const ip = clientIp(request)

  if (Number(request.headers.get("content-length") || 0) > MAX_REQUEST_BYTES) return fail(413, "The application is too long. Shorten the message and try again.")
  if (!(request.headers.get("content-type") || "").includes("application/json")) return fail(415, "The application could not be read. Please refresh the page and try again.")
  if (!sameOrigin(request)) return fail(403, "Applications can only be sent from icsift.com.")
  if (rateLimited(ip)) return fail(429, "Too many applications from this network. Please wait an hour, or email info@icsift.com.")

  let body
  try {
    const text = await request.text()
    if (text.length > MAX_REQUEST_BYTES) return fail(413, "The application is too long. Shorten the message and try again.")
    body = JSON.parse(text)
  } catch {
    return fail(400, "The application could not be read. Please refresh the page and try again.")
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return fail(400, "The application could not be read. Please refresh the page and try again.")

  // Traps for automated posts: the hidden field people never see, and a form filled faster than a person can.
  if (body.website) return quietSuccess()
  const elapsed = Date.now() - Number(body.started_at)
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return quietSuccess()

  const captcha = await checkRecaptcha(String(body.recaptcha_token || ""), ip)
  if (!captcha.ok) return fail(captcha.status, captcha.message)

  const { values, errors } = validateCoOrganizer(body)
  if (Object.keys(errors).length) return fail(422, "Some fields need attention.", errors)

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: values.email,
      subject: `Co-organiser application: ${oneLine(values.institution)}`,
      html: adminEmail(values),
    })
    if (error) throw error
  } catch (error) {
    console.error("[co-organizer] admin email failed:", error?.message || error)
    return fail(502, "Your application could not be sent just now. Please try again, or email info@icsift.com.")
  }

  // The acknowledgement is a courtesy: if it fails, the application has still reached the team.
  try {
    await resend.emails.send({
      from: FROM,
      to: values.email,
      replyTo: TO,
      subject: "We received your co-organiser application",
      html: confirmationEmail(values),
    })
  } catch (error) {
    console.error("[co-organizer] confirmation email failed:", error?.message || error)
  }

  return NextResponse.json({ success: true })
}
