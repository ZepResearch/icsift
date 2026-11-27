# Payments: CCAvenue → PocketBase → Umami

How a registration payment is saved, what was broken, what changed, and how to check it is working.

## The flow

1. **Checkout** ([checkout-panel.jsx](src/components/payments/checkout-panel.jsx)): the signed-in user fills in billing details and clicks Pay. Umami gets a `checkout-start` event (no revenue).
2. **Encrypt** ([api/ccavenue/encrypt/route.js](src/app/api/ccavenue/encrypt/route.js)): the server works out the price from its own price list, builds the order and encrypts it with the CCAvenue working key. Details needed later travel **inside the encrypted order**:

   | CCAvenue field    | Holds                                      |
   | ----------------- | ------------------------------------------ |
   | `merchant_param1` | Zep Research user id (links to dashboard)  |
   | `merchant_param2` | Ticket name                                |
   | `merchant_param3` | `ticket_type\|ticket_category`             |
   | `merchant_param4` | Organization                               |
   | `merchant_param5` | Designation                                |

3. **Pay**: the browser posts the order to CCAvenue. The user pays there.
4. **Callback** ([api/ccavenue/handle/route.js](src/app/api/ccavenue/handle/route.js)): CCAvenue posts the encrypted result back. If `order_status` is `Success`, the server signs in to PocketBase as a **superuser** and creates the record in `conf_registration` on admin.zepresearch.com. A repeat callback for the same `order_id` is skipped.
5. **Success page** ([payment/success](src/app/(pages)/payment/success/)): the user lands on `/payment/success?order=…&amount=…&currency=…` and the Umami revenue event is sent.

## What was broken

| Problem | Effect |
| --- | --- |
| A failed PocketBase save was only logged; the user still went to the success page | Payments went through, records were missing, nobody was told |
| The save needs `ZEP_PB_ADMIN_EMAIL` / `ZEP_PB_ADMIN_PASSWORD`, because `conf_registration` only lets a user create their own record and CCAvenue's callback has no user session | If these are missing on the live server, every save is rejected |
| The whole order was sent as a long JSON query string in CCAvenue's `redirect_url` | The gateway can cut it off, so the user, ticket and billing details were lost |
| The return URL used `request.nextUrl.origin` | Behind a proxy this can be an internal address CCAvenue cannot reach |
| The response parser split on commas | Addresses like "23, Main St" corrupted the fields |
| `order_id` and `payment_status` did not exist in `conf_registration` | Order ids were dropped and the duplicate check never worked |

## What changed

- **encrypt route**: order details go in `merchant_param1–5` (encrypted, cannot be forged); the return URL is a short `https://<public host>/api/ccavenue/handle`.
- **handle route**: reads everything from CCAvenue's decrypted response, saves as superuser, logs `Registration saved: <id> <order>` or `FAILED to save registration: …`. **On a failed save, an email "ACTION NEEDED: paid registration not saved" goes to `ADMIN_EMAIL` (default info@icsift.com) with all payment details**, so the record can be added by hand.
- **[CCAvenue.js](src/utils/CCAvenue.js)**: the parser splits on `&` and the first `=` only.
- **PocketBase**: `order_id`, `payment_status` and `tracking_id` (text) added to `conf_registration`.
- `src/lib/payment-signature.js` removed (no longer used).
- Payments stay in **USD**. Nothing about prices or currency changed for the live site.

## Record saved in `conf_registration`

`user`, `conference` (ICSIFT, `9cj5n4788ilx2ms`), `amount`, `currency`, `fullname`, `email`, `organization`, `designation`, `adress`, `city`, `state`, `zip_code`, `country`, `phone_no`, `conf_date`, `ticket_type`, `ticket_category`, `ticket_name`, `order_id`, `payment_status`, `tracking_id`.

## Umami revenue

- Event **`registration-payment`** with `{ revenue, currency, order_id, type }` is sent from [RevenueEvent.jsx](src/app/(pages)/payment/success/RevenueEvent.jsx) on the success page. `revenue` and `currency` are what CCAvenue actually charged.
- Each order counts once, even if the success page is reloaded.
- To see it in Umami (analytics.zepresearch.com): open the ICSIFT website → **Events** shows `registration-payment`; the **Revenue** report (needs Umami v2.14 or later) → choose **USD** → shows the totals.
- An ad blocker that blocks Umami means that payment is not counted in Umami. The registration is still saved in PocketBase.

## Environment variables

Live server (host's environment, then redeploy):

| Variable | Needed for |
| --- | --- |
| `ZEP_PB_ADMIN_EMAIL`, `ZEP_PB_ADMIN_PASSWORD` | Saving registrations (PocketBase superuser) |
| `NEXT_PUBLIC_CCAVENUE_MERCHANT_ID`, `NEXT_PUBLIC_CCAVENUE_ACCESS_CODE`, `CCAVENUE_WORKING_KEY` | CCAvenue live keys |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami |
| `RESEND_API_KEY`, `FROM_EMAIL`, `ADMIN_EMAIL` (optional) | Emails, including the "not saved" alert |

**Never set on the live server:** `CCAVENUE_CURRENCY` and `NEXT_PUBLIC_CCAVENUE_URL`. They exist only for staging tests in `.env.development.local` (`npm run dev` only, not committed).

Also: `icsift.com` must be the registered website on the **live** CCAvenue merchant account.

## Staging (local testing)

- `.env.development.local` holds the staging keys and points checkout at `https://test.ccavenue.com/...`. Registered staging URL: `http://www.localhost:3000` (open the site at that address, with `www.`).
- The staging account currently has payment options **only for INR**; USD fails with *error 10003 "Payment option is not allocated"*. Ask CCAvenue to enable USD on the staging account, then delete the `CCAVENUE_CURRENCY=INR` line from `.env.development.local`.

## Tested (27 Nov 2026)

- Superuser login to admin.zepresearch.com: works.
- Staging keys: accepted by CCAvenue (USD → error 10003, INR → payment page).
- Simulated successful callback: one complete record created, duplicate callback skipped, redirect to the success page with amount and currency. Test record deleted.
- Simulated failed / aborted payments: redirect to `/payment/failed`, nothing saved.

## Checking the next live payment

1. In PocketBase → `conf_registration`: a new record with `order_id` `ORDER-…`, `payment_status` `Success`, the user and ticket filled in.
2. The user's dashboard shows the registration.
3. In Umami → Events: `registration-payment`; Revenue report in USD shows the amount.
4. If the record is missing: check the server logs for `[ccavenue/handle]` and the inbox for the "ACTION NEEDED" email; it contains the PocketBase error.
