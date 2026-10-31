import { SITE_URL } from "@/lib/seo";

// /robots.txt: crawl everything public; keep crawlers out of the API, payment results and form receipts.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/payment/", "/submission/success", "/journals/success"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
