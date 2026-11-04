import localFont from "next/font/local";

// Self-hosted (src/fonts/, Latin subset as served by Google Fonts) so builds never depend on fetching from Google:
// a changed Google response once broke `next/font/google` mid-build. Familjen Grotesk and Figtree are variable fonts,
// so one file covers their weight range.

export const grotesk = localFont({
  src: [{ path: "../../fonts/familjen-grotesk-400-700.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-sheet",
  display: "swap",
});

export const label = localFont({
  src: [
    { path: "../../fonts/spectral-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/spectral-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/spectral-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../../fonts/spectral-500-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-label",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// Signal system (home, navbar, footer): a condensed display face for headlines and buttons, a round grotesk for text.
export const display = localFont({
  src: [{ path: "../../fonts/anton-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  fallback: ["Impact", "sans-serif"],
});

export const body = localFont({
  src: [{ path: "../../fonts/figtree-400-700.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-body",
  display: "swap",
});

// Tailwind's default sans and mono (globals.css); used by a few shared UI parts.
export const geistSans = localFont({
  src: [{ path: "../../fonts/geist-100-900.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = localFont({
  src: [{ path: "../../fonts/geist-mono-100-900.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-geist-mono",
  display: "swap",
});
