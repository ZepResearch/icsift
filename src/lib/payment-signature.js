import { createHmac, timingSafeEqual } from "crypto"

// Signs the order details that travel through CCAvenue's redirect URL, so the return handler can tell
// whether they are exactly what this server created. Server-only.
const secret = () => process.env.PAYMENT_SIGNING_SECRET || process.env.CCAVENUE_WORKING_KEY || process.env.NEXT_PUBLIC_CCAVENUE_WORKING_KEY || ""

export const signPayload = (text) => createHmac("sha256", secret()).update(text).digest("hex")

export function verifyPayload(text, signature) {
  if (!text || !signature || !secret()) return false
  const expected = Buffer.from(signPayload(text), "hex")
  const given = Buffer.from(String(signature), "hex")
  return expected.length === given.length && timingSafeEqual(expected, given)
}
