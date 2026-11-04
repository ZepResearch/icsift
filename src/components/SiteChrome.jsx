"use client"

import { usePathname } from "next/navigation"

// Hides site-wide chrome (header, footer, WhatsApp bubble) on app-style routes like the dashboard, which bring their
// own sidebar.
const APP_ROUTES = ["/dashboard"]

export default function SiteChrome({ children }) {
  const pathname = usePathname() || ""
  if (APP_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) return null
  return children
}
