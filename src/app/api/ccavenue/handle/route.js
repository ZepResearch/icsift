import { headers } from "next/headers"
import PocketBase from "pocketbase"
import CCAvenue from "@/utils/CCAvenue"

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL_ZEP || "https://admin.zepresearch.com")

export async function POST(req) {
  const headersList = headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"

  try {
    const formData = await req.formData()
    const encResp = formData.get("encResp")

    if (!encResp) {
      return Response.redirect(`${protocol}://${host}/payment/failed`)
    }

    const decryptedData = CCAvenue.redirectResponseToJson(encResp)

    if (decryptedData.order_status === "Success") {
      const url = new URL(req.url)
      const paymentDataParam = url.searchParams.get("paymentData")

      let registrationPayload = {
        fullname: "",
        email: "",
        organization: "",
        designation: "",
        adress: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        phone_no: "",
        conf_date: new Date().toISOString(),
        ticket_type: "",
        ticket_category: "",
        ticket_name: "",
        order_id: decryptedData.order_id || "",
        payment_status: decryptedData.order_status || "Success",
      }

      if (paymentDataParam) {
        try {
          const parsedPaymentData = JSON.parse(decodeURIComponent(paymentDataParam))
          registrationPayload = {
            ...registrationPayload,
            fullname: parsedPaymentData.fullname || parsedPaymentData.name || "",
            email: parsedPaymentData.billing_email || parsedPaymentData.email || "",
            organization: parsedPaymentData.organization || "",
            designation: parsedPaymentData.designation || "",
            adress: parsedPaymentData.address || parsedPaymentData.adress || "",
            city: parsedPaymentData.city || "",
            state: parsedPaymentData.state || "",
            zip_code: parsedPaymentData.zip_code || parsedPaymentData.postal_code || "",
            country: parsedPaymentData.country || "",
            phone_no: parsedPaymentData.phone_no || parsedPaymentData.phone || "",
            ticket_type: parsedPaymentData.ticket_type || "",
            ticket_category: parsedPaymentData.ticket_category || "",
            ticket_name: parsedPaymentData.ticket_name || "",
            order_id: parsedPaymentData.order_id || decryptedData.order_id || "",
          }
        } catch (error) {
          console.error("Failed to parse paymentData for PocketBase record", error)
        }
      }

      try {
        await pb.collection("conf_registration").create(registrationPayload)
      } catch (error) {
        console.error("Failed to save registration record in PocketBase", error)
      }
    }

    const redirectPath = decryptedData.order_status === "Success" ? "/payment/success" : "/payment/failed"

    return Response.redirect(`${protocol}://${host}${redirectPath}`)
  } catch (error) {
    console.error("Payment handling failed:", error)
    return Response.redirect(`${protocol}://${host}/payment/failed`)
  }
}
