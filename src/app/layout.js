import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/herbarium.css";
import "@/styles/signal.css";
import { body, display, grotesk, label } from "@/components/home/fonts";
import ConferenceNavbar from "@/components/Navbar";
import ConferenceFooter from "@/components/Footer";
 import TawkToChat from "@/components/TawkToChat";
import FloatingWhatsApp from "@/components/FloatingWhatsapp";
import GoogleTranslateMenu from "@/components/GoogleTranslate";
import { AuthProvider } from '@/context/AuthContext'
import AuthModal from '@/components/auth/AuthModal'
import JsonLd from "@/components/seo/JsonLd";
import { CONFERENCE } from "@/constants/conference";
import { BASE_KEYWORDS, BRAND, OG_IMAGE, SHORT_WHEN, SITE_NAME, SITE_URL, organizationSchema, websiteSchema } from "@/lib/seo";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// Site-wide SEO defaults. Each page adds its own title, description and canonical URL through
// src/components/metadata.js (built on src/lib/seo.js); everything here derives from src/constants/conference.js.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CONFERENCE.shortForm} ${CONFERENCE.year} | ${CONFERENCE.name.trim()}`,
    template: `%s | ${BRAND}`,
  },
  description: `${CONFERENCE.name.trim()}, ${SHORT_WHEN}. Papers, keynotes and panels, with Scopus and Web of Science indexed publication.`,
  applicationName: SITE_NAME,
  keywords: BASE_KEYWORDS,
  authors: [{ name: "Zep Research", url: "https://www.zepresearch.com/" }],
  creator: "Zep Research",
  publisher: "Zep Research",
  category: "education",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: `${SITE_NAME}: ${CONFERENCE.name.trim()}`,
    locale: "en_US",
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/singleLogo.svg", type: "image/svg+xml" }],
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / NEXT_PUBLIC_BING_SITE_VERIFICATION to verify ownership in Search Console
  // and Bing Webmaster Tools; nothing is emitted until they are set.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport = {
  themeColor: "#213629",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Speaker photos, proceedings and journal covers load from PocketBase: connect early. */}
        <link rel="preconnect" href="https://conference.pockethost.io" crossOrigin="" />
        <link rel="dns-prefetch" href="https://conference.pockethost.io" />
        <script
          async
          src="https://analytics.zepresearch.com/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${grotesk.variable} ${label.variable} ${display.variable} ${body.variable} antialiased`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <AuthProvider>
          <div className="sticky top-0 z-50">
            <GoogleTranslateMenu />
            <ConferenceNavbar />
          </div>
          {children}
          <ConferenceFooter />
          <TawkToChat />
          <FloatingWhatsApp />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
