import React from 'react'
import TermsAndConditions from './Content'


export const metadata = {
  title: "Terms and Conditions | NextGenSynergy: The Virtual Interdisciplinary Forum",
  description:
    "Read the terms and conditions for participating in NextGenSynergy. Learn about registration, cancellation, intellectual property, and code of conduct policies.",
  keywords: [
    "NextGenSynergy",
    "terms and conditions",
    "conference terms",
    "registration policy",
    "cancellation policy",
    "virtual conference",
    "interdisciplinary forum",
  ],

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    url: "https://www.nextgensynergy.com/terms-and-conditions",
    title: "Terms and Conditions | NextGenSynergy: The Virtual Interdisciplinary Forum",
    description:
      "Read the terms and conditions for participating in NextGenSynergy. Learn about registration, cancellation, intellectual property, and code of conduct policies.",
    siteName: "NextGenSynergy",
    images: [
      {
        url: "https://www.nextgensynergy.com/opengraph.png",
        width: 1200,
        height: 630,
        alt: "NextGenSynergy Terms and Conditions",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | NextGenSynergy: The Virtual Interdisciplinary Forum",
    description:
      "Read the terms and conditions for participating in NextGenSynergy. Learn about registration, cancellation, intellectual property, and code of conduct policies.",
    images: ["https://www.nextgensynergy.com/opengraph.png"],
  },

  // Canonical URL
  alternates: {
    canonical: "https://www.nextgensynergy.com/terms-and-conditions",
  },

  // Structured data
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms and Conditions | NextGenSynergy: The Virtual Interdisciplinary Forum",
      description:
        "Read the terms and conditions for participating in NextGenSynergy. Learn about registration, cancellation, intellectual property, and code of conduct policies.",
      url: "https://www.nextgensynergy.com/terms-and-conditions",
      mainEntity: {
        "@type": "Article",
        name: "Terms and Conditions",
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
      <TermsAndConditions/>
    </div>
  )
}

export default page
