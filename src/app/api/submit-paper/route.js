import { NextResponse } from "next/server"
import PocketBase from "pocketbase"
import { resend } from "@/lib/resend"
import { getUserEmailTemplate, getAdminEmailTemplate } from "@/emails/email-templates"
import { validateSubmission, fileProblem, MAX_FILE_BYTES } from "@/lib/paper-submission"
import {
  checkRecaptcha,
  clientIp,
  createRateLimiter,
  escapeAll,
  escapeHtml,
  isUploadedFile,
  sniffDocument,
  verifyZepUser,
} from "@/lib/submission-guard"

// Slightly above the file limit to leave room for the text fields.
const MAX_REQUEST_BYTES = MAX_FILE_BYTES + 512 * 1024
const rateLimited = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 5 })

const fail = (status, message, errors) => NextResponse.json({ success: false, message, ...(errors ? { errors } : {}) }, { status })

export async function POST(request) {
  const ip = clientIp(request)

  if (Number(request.headers.get("content-length") || 0) > MAX_REQUEST_BYTES) {
    return fail(413, "The upload is too large. The paper file must be 10 MB or smaller.")
  }
  if (rateLimited(ip)) {
    return fail(429, "Too many submissions from this network. Please wait 15 minutes and try again.")
  }

  let formData
  try {
    formData = await request.formData()
  } catch {
    return fail(400, "The submission could not be read. Please refresh the page and try again.")
  }

  // Honeypot: a field hidden from people. Bots that fill it get a quiet success and nothing is stored.
  if (formData.get("website")) {
    return NextResponse.json({ success: true, message: "Paper submitted successfully" })
  }

  // 1. reCAPTCHA.
  const captcha = await checkRecaptcha(String(formData.get("recaptcha_token") || ""), ip)
  if (!captcha.ok) return fail(captcha.status, captcha.message)

  // 2. Sign-in, checked with PocketBase. The user id comes from that check, never from the request body.
  const { user: zepUser, client: zepPb } = await verifyZepUser(String(formData.get("auth_token") || ""))
  if (!zepUser) return fail(401, "Your session has expired. Sign in again, then submit.")

  // 3. Fields and file.
  const { values, errors } = validateSubmission(Object.fromEntries(formData.entries()))
  const file = formData.get("file")
  const problem = isUploadedFile(file) ? fileProblem(file) : "Choose your paper file to upload."
  if (problem) errors.file = problem
  else if (!(await sniffDocument(file))) errors.file = "That file is not a valid Word document. Save it as .doc or .docx and upload again."
  if (Object.keys(errors).length) return fail(422, "Some fields need attention.", errors)

  // 4. Store in the ICSIFT PocketBase.
  const pb = new PocketBase("https://conference.pockethost.io")
  let record
  try {
    const pbFormData = new FormData()
    Object.entries(values).forEach(([key, value]) => pbFormData.append(key, value))
    pbFormData.append("file", file)
    record = await pb.collection("ICSIFT_paper_form_submission").create(pbFormData)
  } catch (error) {
    console.error("[submit-paper] ICSIFT PocketBase create failed:", error?.response?.data || error?.message)
    return fail(500, "Your paper could not be saved just now. Please try again, or email it to info@icsift.com.")
  }

  const fileUrl = record.file ? pb.files.getURL(record, record.file, { download: 1 }) : ""

  // 5. Mirror to the ZEP PocketBase as the signed-in user. A failure here does not fail the submission.
  const zepStatus = { attempted: true, success: false }
  try {
    const zepFormData = new FormData()
    Object.entries({ ...values, conference: "9cj5n4788ilx2ms", conf_name: "ICSIFT", user: zepUser.id, status: "pending" }).forEach(
      ([key, value]) => zepFormData.append(key, value),
    )
    zepFormData.append("file", file)
    await zepPb.collection("conf_paper_submission_all").create(zepFormData)
    zepStatus.success = true
  } catch (error) {
    console.error("[submit-paper] ZEP PocketBase create failed:", error?.response?.data || error?.message)
  }

  // 6. Emails, with every user-supplied value HTML-escaped. The paper is already saved,
  //    so an email failure is logged, not returned.
  const safe = escapeAll(values)
  const results = await Promise.allSettled([
    resend.emails.send({
      from: "Conference <info@icsift.com>",
      to: values.email,
      subject: "Paper Submission Confirmation - ICSIFT",
      html: getUserEmailTemplate(safe),
    }),
    resend.emails.send({
      from: "Conference <info@icsift.com>",
      to: "info@icsift.com",
      replyTo: values.email,
      subject: "New Paper Submission - ICSIFT",
      html: getAdminEmailTemplate(safe, escapeHtml(fileUrl)),
    }),
  ])
  results.forEach((r) => r.status === "rejected" && console.error("[submit-paper] Email failed:", r.reason))

  return NextResponse.json({ success: true, message: "Paper submitted successfully", zep: zepStatus })
}
