import React from 'react'
import CancellationPolicy from './Content'

export const metadata = {
  title: "Cancellation Policy | NextGenSynergy: The Virtual Interdisciplinary Forum",
  description:
    "Understand NextGenSynergy's cancellation and refund policy. Learn about refund timelines, how to cancel your registration, and our support contact information.",
  keywords: [
    "NextGenSynergy",
    "cancellation policy",
    "refund policy",
    "conference cancellation",
    "registration refund",
    "virtual conference",
    "interdisciplinary forum",
  ],

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    url: "https://www.nextgensynergy.com/cancellation-policy",
    title: "Cancellation Policy | NextGenSynergy: The Virtual Interdisciplinary Forum",
    description:
      "Understand NextGenSynergy's cancellation and refund policy. Learn about refund timelines, how to cancel your registration, and our support contact information.",
    siteName: "NextGenSynergy",
    images: [
      {
        url: "https://www.nextgensynergy.com/opengraph.png",
        width: 1200,
        height: 630,
        alt: "NextGenSynergy Cancellation Policy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | NextGenSynergy: The Virtual Interdisciplinary Forum",
    description:
      "Learn how NextGenSynergy protects your personal data and privacy rights. Our privacy policy explains data collection, usage, and your rights.",
    images: ["https://www.nextgensynergy.com/opengraph.png"],
  },

  // Canonical URL
  alternates: {
    canonical: "https://www.nextgensynergy.com/cancellation-policy",
  },

  // Structured data
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Cancellation Policy | NextGenSynergy: The Virtual Interdisciplinary Forum",
      description:
        "Understand NextGenSynergy's cancellation and refund policy. Learn about refund timelines, how to cancel your registration, and our support contact information.",
      url: "https://www.nextgensynergy.com/cancellation-policy",
      mainEntity: {
        "@type": "Article",
        name: "Cancellation Policy",
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
      <CancellationPolicy/>
    </div>
  )
}

export default page
