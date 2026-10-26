import PocketBase from "pocketbase"

// Server-side protections shared by the paper submission routes. Import only from route handlers.

export const RECAPTCHA_BYPASS_TOKEN = "localhost-bypass"

export const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])

export const escapeAll = (values) => Object.fromEntries(Object.entries(values).map(([key, value]) => [key, escapeHtml(value)]))

export const clientIp = (request) => (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown"

// Best-effort per-IP limit. It lives in memory, so it resets on redeploy and is per server instance;
// it slows scripted abuse rather than stopping it outright. reCAPTCHA and sign-in do the rest.
export function createRateLimiter({ windowMs = 15 * 60 * 1000, max = 5 } = {}) {
  const hits = new Map()
  return function limited(key) {
    const now = Date.now()
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs)
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 5000) {
      for (const [k, times] of hits) if (!times.some((t) => now - t < windowMs)) hits.delete(k)
    }
    return recent.length > max
  }
}

// The localhost bypass works only outside production builds, never because of a Host header.
export async function checkRecaptcha(token, ip) {
  if (process.env.NODE_ENV !== "production" && token === RECAPTCHA_BYPASS_TOKEN) return { ok: true }
  if (!token) return { ok: false, status: 400, message: "Tick the reCAPTCHA box, then submit again." }
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.error("[submission-guard] RECAPTCHA_SECRET_KEY is not set")
    return { ok: false, status: 500, message: "Submissions are temporarily unavailable. Please email info@icsift.com." }
  }
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip && ip !== "unknown") body.set("remoteip", ip)
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })
    const data = await res.json()
    return data.success === true
      ? { ok: true }
      : { ok: false, status: 400, message: "reCAPTCHA verification failed. Tick the box again and resubmit." }
  } catch (error) {
    console.error("[submission-guard] reCAPTCHA check failed:", error)
    return { ok: false, status: 502, message: "We could not verify reCAPTCHA just now. Please try again in a minute." }
  }
}

// Confirms the ZEP auth token with PocketBase and returns the signed-in user (or null).
// The returned client keeps the token, so writes made with it run as that user.
export async function verifyZepUser(token) {
  if (!token) return { user: null }
  const client = new PocketBase(process.env.NEXT_PUBLIC_PB_URL_ZEP || "https://admin.zepresearch.com")
  try {
    client.authStore.save(token)
    const { record } = await client.collection("users").authRefresh()
    return { user: record, client }
  } catch {
    return { user: null }
  }
}

// Checks a file's first bytes, so a renamed executable cannot pass as a document.
// .docx is a zip (PK\x03\x04); legacy .doc is an OLE compound file; PDF starts with %PDF.
export async function sniffDocument(file) {
  const head = new Uint8Array(await file.slice(0, 8).arrayBuffer())
  const zip = head[0] === 0x50 && head[1] === 0x4b && head[2] === 0x03 && head[3] === 0x04
  const ole = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1].every((b, i) => head[i] === b)
  const pdf = head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46
  const name = file.name.toLowerCase()
  if (name.endsWith(".docx")) return zip
  if (name.endsWith(".doc")) return ole || zip
  if (name.endsWith(".pdf")) return pdf
  return false
}

export const isUploadedFile = (value) => Boolean(value && typeof value === "object" && "arrayBuffer" in value)
