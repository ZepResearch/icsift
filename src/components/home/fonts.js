import { Anton, Familjen_Grotesk, Figtree, Spectral } from "next/font/google";

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

// Signal system (home, navbar, footer): a condensed display face for headlines and buttons, a round grotesk for text.
export const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
