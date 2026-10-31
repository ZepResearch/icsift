import { ImageResponse } from "next/og";
import { CONFERENCE } from "@/constants/conference";

// The image shown when any page is shared (Facebook, LinkedIn, WhatsApp, X, Slack…). Generated from the conference
// constants, so it always shows the current edition, dates and city.
export const alt = `${CONFERENCE.shortForm}: ${CONFERENCE.name.trim()}, ${CONFERENCE.date}, ${CONFERENCE.venue.location.trim()}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The display face from Google Fonts; if it cannot be fetched at build time the image falls back to the default face.
async function anton() {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Anton&display=swap")).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const font = await anton();
  const display = font ? "Anton" : "sans-serif";
  const city = CONFERENCE.venue.city || CONFERENCE.venue.location.split(",")[0].trim();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#213629", color: "#fdfd60", padding: "56px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: display, fontSize: 44, lineHeight: 1 }}>ICSIFT</div>
            <div style={{ fontSize: 22, color: "#f4f1ec", marginTop: 6 }}>{`${CONFERENCE.shortForm} · ${city} ${CONFERENCE.year}`}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: display, fontSize: 70, lineHeight: 1, textTransform: "uppercase", maxWidth: 1050 }}>
            {CONFERENCE.name.trim()}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", color: "#f4f1ec" }}>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{CONFERENCE.date}</div>
            <div style={{ fontSize: 26, marginTop: 6 }}>{`${CONFERENCE.venue.name.trim()}, ${CONFERENCE.venue.location.trim()} · Hybrid`}</div>
          </div>
          <div style={{ display: "flex", background: "#fdfd60", color: "#213629", fontFamily: display, fontSize: 34, padding: "14px 26px" }}>
            CALL FOR PAPERS
          </div>
        </div>
      </div>
    ),
    { ...size, ...(font ? { fonts: [{ name: "Anton", data: font, style: "normal", weight: 400 }] } : {}) },
  );
}
