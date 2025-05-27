import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConferenceNavbar from "@/components/Navbar";
import ConferenceFooter from "@/components/Footer";
import TawkToChat from "@/components/TawkToChat";
import { ChatButton } from "@/components/chat-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "ICSIFT: International Conference on Scientific Innovation and Future Technologies",
  description:
    "Join global experts at ICSIFT, a premier conference dedicated to exploring cutting-edge scientific innovations and emerging technologies shaping our future.",
  keywords: [
    "ICSIFT",
    "scientific innovation",
    "future technologies",
    "research conference",
    "interdisciplinary science",
    "technology innovation",
    "scientific collaboration",
    "emerging technologies",
  ],
  authors: [{ name: "ICSIFT Organizing Committee", url: "https://icsift.com" }],
  creator: "ICSIFT",
  openGraph: {
    title: "ICSIFT: International Conference on Scientific Innovation and Future Technologies",
    description:
      "Discover groundbreaking research and technological advancements at ICSIFT — where science meets innovation to shape tomorrow's world.",
    url: "https://icsift.com",
    siteName: "ICSIFT",
    images: [
      {
        url: "https://icsift.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ICSIFT Conference Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICSIFT",
    description:
      "The premier international conference on scientific innovation and future technologies.",
    creator: "@icsift", // Update to your actual handle
    images: ["https://icsift.com/og-image.png"],
  },
  metadataBase: new URL("https://icsift.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConferenceNavbar/>
        {children}
        <ConferenceFooter/>
         {/* <TawkToChat/>      */}
      <ChatButton/>
           </body>
    </html>
  );
}
