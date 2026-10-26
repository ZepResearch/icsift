// Starts a CCAvenue payment from the browser: asks the server to build and encrypt the order,
// then posts it to CCAvenue exactly as before. Throws an Error carrying `status` and field `errors`.
export async function startCcavenueCheckout(body) {
  const response = await fetch("/api/ccavenue/encrypt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.encRequest) {
    const error = new Error(data.error || "Payment could not be started. Please try again.")
    error.status = response.status
    error.errors = data.errors || {}
    throw error
  }

  const form = document.createElement("form")
  form.method = "post"
  form.action = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
  form.style.display = "none"
  for (const [name, value] of [
    ["encRequest", data.encRequest],
    ["access_code", process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE],
    ["merchant_id", process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID],
  ]) {
    const input = document.createElement("input")
    input.name = name
    input.value = value ?? ""
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
}
