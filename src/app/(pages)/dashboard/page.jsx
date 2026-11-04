import DashboardContent from "./Content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/dashboard",
  title: "Your dashboard",
  description: "Your ICSIFT registrations, paper and journal submissions, invoices and certificates in one place.",
  noindex: true,
});

export default function DashboardPage() {
  return <DashboardContent />;
}
