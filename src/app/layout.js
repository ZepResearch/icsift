import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConferenceNavbar from "@/components/Navbar";
import ConferenceFooter from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ICSIFT | Sustainability & Innovation Conference ",
  description: "Explore the future of sustainable technology at ICSIFT . Connect with experts, share research,",
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
      </body>
    </html>
  );
}
