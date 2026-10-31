import { CONFERENCE } from "@/constants/conference";

// /manifest.webmanifest: name, colours and icon when the site is saved to a phone's home screen.
export default function manifest() {
  return {
    name: `${CONFERENCE.shortForm}: ${CONFERENCE.name.trim()}`,
    short_name: "ICSIFT",
    description: `${CONFERENCE.name.trim()}, ${CONFERENCE.date}, ${CONFERENCE.venue.location.trim()} and online.`,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1ec",
    theme_color: "#213629",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/singleLogo.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
