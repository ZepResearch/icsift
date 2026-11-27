import PocketBase from "pocketbase"
import CCAvenue from "@/utils/CCAvenue"
import { resend } from "@/lib/resend"
import { CONFERENCE } from "@/constants/conference"

// CCAvenue posts the encrypted result here after payment. Only this server and CCAvenue hold the working key, so
// everything in the decrypted response is trustworthy: the status and amount charged, the billing details, and the
// merchant_param1-5 that /api/ccavenue/encrypt put in the order (account id, ticket, organization, designation).
//
// The registration is saved to conf_registration in the Zep Research PocketBase (admin.zepresearch.com). Its create
// rule only lets a user create their own record, and this callback has no user session, so it writes as a
// PocketBase superuser: ZEP_PB_ADMIN_EMAIL and ZEP_PB_ADMIN_PASSWORD must be set on the live server.
// If the save fails the payer still lands on the success page (they have paid), and the organisers get an email
// with the full gateway details so the registration can be added by hand. Nothing fails silently.

const PB_URL = process.env.NEXT_PUBLIC_PB_URL_ZEP || "https://admin.zepresearch.com"
const pb = new PocketBase(PB_URL)
// Several callbacks can share this instance on the server; the SDK would otherwise cancel overlapping requests.
pb.autoCancellation(false)

const ORDER_ID = /^(ORDER|SPONSOR)-\d{10,}(-[A-F0-9]{4})?$/
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@icsift.com"

const redirectTo = (req, path) => {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000"
  const protocol = /^((www\.)?localhost|127\.0\.0\.1)(:\d+)?$/.test(host) ? "http" : "https"
  // 303: the browser follows a POST callback with a plain GET.
  return Response.redirect(`${protocol}://${host}${path}`, 303)
}

async function signInAsAdmin() {
  const email = process.env.ZEP_PB_ADMIN_EMAIL
  const password = process.env.ZEP_PB_ADMIN_PASSWORD
  if (!email || !password) throw new Error("ZEP_PB_ADMIN_EMAIL / ZEP_PB_ADMIN_PASSWORD are not set on this server")
  if (pb.authStore.isValid && pb.authStore.isSuperuser) return
  await pb.collection("_superusers").authWithPassword(email, password)
}

// True if this order is already saved (CCAvenue can post the same result more than once).
async function alreadyRecorded(orderId) {
  if (!ORDER_ID.test(orderId)) return false
  try {
    const found = await pb.collection("conf_registration").getList(1, 1, { filter: pb.filter("order_id = {:id}", { id: orderId }) })
    return found.totalItems > 0
  } catch {
    return false // The collection has no order_id field yet, or cannot be listed: fall through to create.
  }
}

// Tell the organisers about a paid order that could not be saved, with everything needed to add it by hand.
async function alertUnsaved(result, record, error) {
  const rows = Object.entries({ ...record, gateway_status: result.order_status, tracking_id: result.tracking_id, bank_ref_no: result.bank_ref_no, error })
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${k}</td><td>${String(v ?? "").replace(/[<>&]/g, "")}</td></tr>`)
    .join("")
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "info@icsift.com",
      to: ADMIN_EMAIL,
      subject: `ACTION NEEDED: paid registration not saved (${record.order_id || "no order id"})`,
      html: `<p>A CCAvenue payment succeeded but the registration could not be saved to PocketBase (conf_registration). Add it by hand.</p><table>${rows}</table>`,
    })
  } catch (mailError) {
    console.error("[ccavenue/handle] Alert email failed:", mailError?.message)
  }
}

export async function POST(req) {
  let result
  try {
    const formData = await req.formData()
    const encResp = formData.get("encResp")
    if (!encResp) {
      console.error("[ccavenue/handle] Callback without encResp")
      return redirectTo(req, "/payment/failed")
    }
    result = CCAvenue.redirectResponseToJson(String(encResp))
  } catch (error) {
    console.error("[ccavenue/handle] Could not read the gateway response:", error?.message)
    return redirectTo(req, "/payment/failed")
  }

  if (result.order_status !== "Success") {
    console.warn("[ccavenue/handle] Payment not successful:", result.order_id, result.order_status, result.failure_message || result.status_message)
    return redirectTo(req, "/payment/failed")
  }

  const [ticketType = "", ticketCategory = ""] = String(result.merchant_param3 || "").split("|")
  const userId = /^[a-z0-9]{15}$/.test(result.merchant_param1 || "") ? result.merchant_param1 : ""
  const amount = Number(result.amount) || 0
  const currency = result.currency || "USD"

  const record = {
    // Links the registration to the account and to ICSIFT, so it shows on the user's dashboard.
    user: userId,
    conference: CONFERENCE.zepConferenceId,
    amount: amount.toFixed(2),
    currency,
    fullname: result.billing_name || "",
    email: result.billing_email || "",
    organization: result.merchant_param4 || "",
    designation: result.merchant_param5 || "",
    adress: result.billing_address || "",
    city: result.billing_city || "",
    state: result.billing_state || "",
    zip_code: result.billing_zip || "",
    country: result.billing_country || "",
    phone_no: result.billing_tel || "",
    conf_date: new Date().toISOString(),
    ticket_type: ticketType,
    ticket_category: ticketCategory,
    ticket_name: result.merchant_param2 || "",
    // Saved once the collection has these fields; PocketBase ignores fields it does not have.
    order_id: result.order_id || "",
    payment_status: result.order_status,
    tracking_id: result.tracking_id || "",
  }

  try {
    await signInAsAdmin()
    if (!(await alreadyRecorded(result.order_id))) {
      const saved = await pb.collection("conf_registration").create(record)
      console.info("[ccavenue/handle] Registration saved:", saved.id, result.order_id)
    }
  } catch (error) {
    const detail = JSON.stringify(error?.response?.data || error?.response || error?.message)
    console.error("[ccavenue/handle] FAILED to save registration:", result.order_id, error?.status, detail)
    await alertUnsaved(result, record, `${error?.status || ""} ${detail}`)
  }

  // Amount and currency ride to the success page for the Umami revenue event.
  const query = new URLSearchParams({ order: result.order_id || "", amount: amount.toFixed(2), currency })
  return redirectTo(req, `/payment/success?${query}`)
}
