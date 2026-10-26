import { Familjen_Grotesk, Spectral } from "next/font/google";

export const grotesk = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sheet",
  display: "swap",
});

export const label = Spectral({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--font-label",
  display: "swap",
});
