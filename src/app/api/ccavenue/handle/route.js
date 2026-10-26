import PocketBase from "pocketbase"
import CCAvenue from "@/utils/CCAvenue"
import { verifyPayload } from "@/lib/payment-signature"

// CCAvenue posts the encrypted result here after payment. Only CCAvenue holds the working key, so the
// decrypted status and amount are trustworthy; the registration details come from the signed return URL.

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL_ZEP || "https://admin.zepresearch.com")
const ORDER_ID = /^(ORDER|SPONSOR)-\d{10,}(-[A-F0-9]{4})?$/

const redirectTo = (req, path) => {
  const host = req.headers.get("host") || "localhost:3000"
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  return Response.redirect(`${protocol}://${host}${path}`)
}

// Returns true if a registration with this order id already exists (CCAvenue can call back more than once).
async function alreadyRecorded(orderId) {
  if (!ORDER_ID.test(orderId)) return false
  try {
    const found = await pb.collection("conf_registration").getList(1, 1, { filter: `order_id = "${orderId}"` })
    return found.totalItems > 0
  } catch {
    return false // If the collection cannot be listed, fall through to create.
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData()
    const encResp = formData.get("encResp")
    if (!encResp) return redirectTo(req, "/payment/failed")

    const result = CCAvenue.redirectResponseToJson(encResp)
    if (result.order_status !== "Success") return redirectTo(req, "/payment/failed")

    const url = new URL(req.url)
    const raw = url.searchParams.get("paymentData") || ""
    const signed = verifyPayload(raw, url.searchParams.get("sig"))
    let order = null
    if (signed) {
      try {
        order = JSON.parse(raw)
      } catch {
        order = null
      }
    } else {
      console.warn("[ccavenue/handle] Return URL signature missing or invalid; saving gateway data only.", result.order_id)
    }

    // The details must belong to this payment, and the gateway must have charged what we asked for.
    const sameOrder = order && order.order_id === result.order_id
    const amountMatches = sameOrder && Math.abs(Number(order.amount) - Number(result.amount)) < 0.01
    if (sameOrder && !amountMatches) {
      console.error("[ccavenue/handle] Amount mismatch:", { order_id: result.order_id, expected: order.amount, charged: result.amount })
    }
    const details = sameOrder ? order : {}

    if (!(await alreadyRecorded(result.order_id))) {
      try {
        await pb.collection("conf_registration").create({
          fullname: details.billing_name || "",
          email: details.billing_email || result.billing_email || "",
          organization: details.billing_organization || "",
          designation: details.billing_designation || "",
          adress: details.billing_address || "",
          city: details.billing_city || "",
          state: details.billing_state || "",
          zip_code: details.billing_zip || "",
          country: details.billing_country || "",
          phone_no: details.billing_tel || "",
          conf_date: new Date().toISOString(),
          ticket_type: details.ticket_type || "",
          ticket_category: details.ticket_category || "",
          ticket_name: details.ticket_name || details.package_name || "",
          order_id: result.order_id || "",
          payment_status: sameOrder && !amountMatches ? "Success - amount mismatch" : result.order_status,
        })
      } catch (error) {
        console.error("[ccavenue/handle] Failed to save registration record:", error?.response?.data || error?.message)
      }
    }

    return redirectTo(req, "/payment/success")
  } catch (error) {
    console.error("[ccavenue/handle] Payment handling failed:", error?.message)
    return redirectTo(req, "/payment/failed")
  }
}
