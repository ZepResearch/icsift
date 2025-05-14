import React from 'react'
import PrivacyPolicy from './Content'


export const metadata = {
  title: "Privacy Policy | NextGenSynergy: The Virtual Interdisciplinary Forum",
  description:
    "Learn how NextGenSynergy protects your personal data and privacy rights. Our privacy policy explains data collection, usage, and your rights.",
  keywords: [
    "NextGenSynergy",
    "privacy policy",
    "data protection",
    "personal information",
    "privacy rights",
    "virtual conference",
    "interdisciplinary forum",
  ],

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    url: "https://www.nextgensynergy.com/privacy-policy",
    title: "Privacy Policy | NextGenSynergy: The Virtual Interdisciplinary Forum",
    description:
      "Learn how NextGenSynergy protects your personal data and privacy rights. Our privacy policy explains data collection, usage, and your rights.",
    siteName: "NextGenSynergy",
    images: [
      {
        url: "https://www.nextgensynergy.com/opengraph.png",
        width: 1200,
        height: 630,
        alt: "NextGenSynergy Privacy Policy",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | NextGenSynergy: The Virtual Interdisciplinary Forum",
    description:
      "Learn how NextGenSynergy protects your personal data and privacy rights. Our privacy policy explains data collection, usage, and your rights.",
    images: ["https://www.nextgensynergy.com/opengraph.png"],
  },

  // Canonical URL
  alternates: {
    canonical: "https://www.nextgensynergy.com/privacy-policy",
  },

  // Structured data
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy | NextGenSynergy: The Virtual Interdisciplinary Forum",
      description:
        "Learn how NextGenSynergy protects your personal data and privacy rights. Our privacy policy explains data collection, usage, and your rights.",
      url: "https://www.nextgensynergy.com/privacy-policy",
      mainEntity: {
        "@type": "Article",
        name: "Privacy Policy",
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: {
          "@type": "Organization",
          name: "NextGenSynergy",
        },
      },
    }),
  },
}
function page() {
  return (
    <div>
      <PrivacyPolicy/>
    </div>
  )
}

export default page
