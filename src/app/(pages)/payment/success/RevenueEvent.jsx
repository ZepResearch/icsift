"use client";

import { useEffect } from "react";

// Sends the Umami revenue event for a completed payment. /api/ccavenue/handle redirects here with the order id and
// the amount and currency CCAvenue actually charged (?order=…&amount=…&currency=…). Each order is counted once, even
// if the page is reloaded or reopened from history. The Umami script loads async (src/app/layout.js), so this waits
// briefly for `window.umami`.
export default function RevenueEvent() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order") || "";
    const revenue = Number(params.get("amount"));
    const currency = (params.get("currency") || "USD").toUpperCase();
    if (!order || !Number.isFinite(revenue) || revenue <= 0) return;

    const key = `umami-revenue:${order}`;
    try {
      if (localStorage.getItem(key)) return;
    } catch {}

    let tries = 0;
    const timer = setInterval(() => {
      if (window.umami?.track) {
        clearInterval(timer);
        window.umami.track("registration-payment", {
          revenue,
          currency,
          order_id: order,
          type: order.startsWith("SPONSOR") ? "sponsorship" : "registration",
        });
        try {
          localStorage.setItem(key, "1");
        } catch {}
      } else if (++tries > 40) {
        clearInterval(timer); // ~10s: the script is blocked (ad blocker) or failed to load.
      }
    }, 250);
    return () => clearInterval(timer);
  }, []);

  return null;
}
