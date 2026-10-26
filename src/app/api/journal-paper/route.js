import { NextResponse } from "next/server"
import PocketBase from "pocketbase"
import { resend } from "@/lib/resend"
import { getUserEmailTemplate, getAdminEmailTemplate } from "@/emails/journal-templates"
import { getJournalById } from "@/lib/pocketbase"
import { JOURNAL_FILE_EXTENSIONS, MAX_FILE_BYTES, fileProblem, validateJournalSubmission } from "@/lib/paper-submission"
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

const MAX_REQUEST_BYTES = MAX_FILE_BYTES + 512 * 1024
const rateLimited = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 5 })
const JOURNAL_ID = /^[a-z0-9]{15}$/

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

  // Honeypot: hidden from people; bots that fill it get a quiet success and nothing is stored.
  if (formData.get("website")) {
    return NextResponse.json({ success: true, message: "Paper submitted successfully" })
  }

  // 1. reCAPTCHA.
  const captcha = await checkRecaptcha(String(formData.get("recaptcha_token") || ""), ip)
  if (!captcha.ok) return fail(captcha.status, captcha.message)

  // 2. Sign-in, checked with PocketBase. The user id comes from that check, never from the request body.
  const { user } = await verifyZepUser(String(formData.get("auth_token") || ""))
  if (!user) return fail(401, "Your session has expired. Sign in again, then submit.")

  // 3. The journal is looked up on the server, so its name cannot be forged and hidden journals cannot be targeted.
  const journalId = String(formData.get("journal_id") || "")
  const journal = JOURNAL_ID.test(journalId) ? await getJournalById(journalId) : null
  if (!journal || journal.not_visible) return fail(404, "This journal is not accepting submissions. Choose another from the journals list.")

  // 4. Fields and file.
  const { values, errors } = validateJournalSubmission(Object.fromEntries(formData.entries()))
  const file = formData.get("file")
  const problem = isUploadedFile(file) ? fileProblem(file, JOURNAL_FILE_EXTENSIONS) : "Choose your paper file to upload."
  if (problem) errors.file = problem
  else if (!(await sniffDocument(file))) errors.file = "That file is not a valid PDF or Word document. Save it again and re-upload."
  if (Object.keys(errors).length) return fail(422, "Some fields need attention.", errors)

  const data = { ...values, journal_name: journal.title || "Untitled journal", user: user.id }

  // 5. Store in the ICSIFT PocketBase.
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  let record
  try {
    const pbFormData = new FormData()
    Object.entries(data).forEach(([key, value]) => pbFormData.append(key, value))
    pbFormData.append("file", file)
    record = await pb.collection("ICSIFT_journal_form_submission").create(pbFormData)
  } catch (error) {
    console.error("[journal-paper] ICSIFT PocketBase create failed:", error?.response?.data || error?.message)
    return fail(500, "Your paper could not be saved just now. Please try again, or email it to info@icsift.com.")
  }

  const stored = Array.isArray(record.file) ? record.file[0] : record.file
  const fileUrl = stored ? pb.files.getURL(record, stored, { download: 1 }) : ""

  // 6. Mirror to the ZEP PocketBase. A failure here does not fail the submission.
  try {
    const zepPb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL || "https://admin.zepresearch.com")
    const zepFormData = new FormData()
    Object.entries({ ...data, status: "pending" }).forEach(([key, value]) => zepFormData.append(key, value))
    zepFormData.append("file", file)
    await zepPb.collection("paper_form_submission").create(zepFormData)
  } catch (error) {
    console.error("[journal-paper] ZEP PocketBase create failed:", error?.response?.data || error?.message)
  }

  // 7. Emails, with every user-supplied value HTML-escaped. Failures are logged, not returned.
  const safe = escapeAll(data)
  const results = await Promise.allSettled([
    resend.emails.send({
      from: "ICSIFT | Journal Submission <info@icsift.com>",
      to: values.email,
      subject: "Journal Submission Confirmation - ICSIFT",
      html: getUserEmailTemplate(safe),
    }),
    resend.emails.send({
      from: "ICSIFT | Submission <info@icsift.com>",
      to: "info@icsift.com",
      replyTo: values.email,
      subject: "New Journal Submission - from ICSIFT",
      html: getAdminEmailTemplate(safe, escapeHtml(fileUrl)),
    }),
  ])
  results.forEach((r) => r.status === "rejected" && console.error("[journal-paper] Email failed:", r.reason))

  return NextResponse.json({ success: true, message: "Paper submitted successfully" })
}
