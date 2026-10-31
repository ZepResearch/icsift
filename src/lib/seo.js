import { CONFERENCE } from "@/constants/conference";
import { AUDIENCES, CURRENCY, MODES, rowsFor } from "@/lib/pricing";

// One source for every title, description, canonical URL, share image and piece of structured data on the site.
// Everything is derived from src/constants/conference.js, so a new edition only needs that file updated.

export const SITE_URL = "https://icsift.com"; // The live domain; www.icsift.com redirects here.
export const SITE_NAME = "ICSIFT";

const name = CONFERENCE.name.trim();
const city = CONFERENCE.venue.city || CONFERENCE.venue.location.split(",")[0].trim();
const location = CONFERENCE.venue.location.trim();
const year = CONFERENCE.year;
const pad = (n) => String(n).padStart(2, "0");

// "ICSIFT 2027", the short brand used at the end of every title.
export const BRAND = `${SITE_NAME} ${year}`;

// ISO dates with the venue's offset, e.g. 2027-02-21T09:00:00+07:00.
const { month, days } = CONFERENCE.scheduleDates;
const [opens, closes] = CONFERENCE.venue.hours || ["09:00", "18:00"];
const isoDay = (day) => `${CONFERENCE.scheduleDates.year}-${pad(month + 1)}-${pad(day)}`;
export const START_DATE = `${isoDay(days[0])}T${opens}:00${CONFERENCE.venue.utcOffset || "Z"}`;
export const END_DATE = `${isoDay(days[days.length - 1])}T${closes}:00${CONFERENCE.venue.utcOffset || "Z"}`;

// Short phrases reused across descriptions so every page carries the edition, place and date.
export const WHEN_WHERE = `${CONFERENCE.date}, ${location} and online`;
// The compact form for search snippets, which Google cuts at about 155 characters: "21–22 Feb 2027, Bangkok & online".
const monthShort = new Date(CONFERENCE.scheduleDates.year, month, 1).toLocaleString("en-GB", { month: "short" });
export const SHORT_WHEN = `${days[0]}–${days[days.length - 1]} ${monthShort} ${CONFERENCE.scheduleDates.year}, ${city} & online`;

export const BASE_KEYWORDS = [
  "ICSIFT",
  `ICSIFT ${year}`,
  CONFERENCE.shortForm,
  name,
  `sustainability conference ${year}`,
  `international conference ${year}`,
  `${city} conference ${year}`,
  `conference in ${city}`,
  "innovation conference",
  "future technologies conference",
  "call for papers",
  "Scopus indexed conference",
  "Web of Science conference",
  "hybrid conference",
];

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${CONFERENCE.shortForm}: ${name}, ${WHEN_WHERE}`,
};

// Metadata for one page. `title` is the page's own title: the layout's template appends " | ICSIFT 2027".
// Pass `absoluteTitle` to skip the template (the home page), `noindex` for receipts and form results.
export function pageMetadata({ path, title, absoluteTitle, description, keywords = [], noindex = false, type = "website" }) {
  const fullTitle = absoluteTitle || `${title} | ${BRAND}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords: [...new Set([...keywords, ...BASE_KEYWORDS])],
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: `${SITE_NAME}: ${name}`,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } } : {}),
  };
}

// ---------- Structured data (schema.org JSON-LD) ----------

const abs = (path) => new URL(path, SITE_URL).toString();

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/profile.php?id=61561809783777",
  "https://www.instagram.com/zepresearch/",
  "https://www.linkedin.com/company/zep-research/",
  "https://www.youtube.com/@Zepresearch",
];

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: `${SITE_NAME}: ${name}`,
  alternateName: [SITE_NAME, CONFERENCE.shortForm],
  url: SITE_URL,
  logo: abs("/singleLogo.svg"),
  email: "info@icsift.com",
  telephone: "+91-82600-80050",
  sameAs: SOCIAL_PROFILES,
  parentOrganization: { "@type": "Organization", name: "Zep Research", url: "https://www.zepresearch.com/" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@icsift.com",
    telephone: "+91-82600-80050",
    availableLanguage: ["English"],
  },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: name,
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
});

// The conference itself, with its dates, hybrid location, prices (from the live price list) and organisers.
export function eventSchema() {
  const prices = MODES.flatMap(([mode]) => rowsFor(mode).flatMap((row) => AUDIENCES.map(([a]) => row.prices[a]))).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "@id": `${SITE_URL}/#event`,
    name: `${CONFERENCE.shortForm}: ${name}`,
    alternateName: BRAND,
    description: `${name} (${CONFERENCE.shortForm}), ${WHEN_WHERE}. Research papers, keynotes and panels on sustainability, innovation and future technologies, with publication in Scopus and Web of Science indexed journals.`,
    startDate: START_DATE,
    endDate: END_DATE,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    inLanguage: "en",
    url: SITE_URL,
    image: [abs("/opengraph-image"), abs("/gallery/3rd-icsift  (58).jpeg")],
    location: [
      {
        "@type": "Place",
        name: CONFERENCE.venue.name.trim(),
        address: {
          "@type": "PostalAddress",
          streetAddress: CONFERENCE.venue.address.trim(),
          addressLocality: city,
          addressCountry: CONFERENCE.venue.country || location.split(",").pop().trim(),
        },
      },
      { "@type": "VirtualLocation", url: abs("/registration") },
    ],
    organizer: {
      "@type": "Organization",
      name: "Zep Research",
      url: "https://www.zepresearch.com/",
    },
    ...(CONFERENCE.coOrganizers?.length
      ? { sponsor: CONFERENCE.coOrganizers.map((org) => ({ "@type": "Organization", name: org.name })) }
      : {}),
    offers: {
      "@type": "AggregateOffer",
      url: abs("/registration"),
      priceCurrency: CURRENCY,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: "https://schema.org/InStock",
    },
  };
}

// Breadcrumbs for an inner page: Home › [section ›] page.
export const breadcrumbSchema = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ...trail].map(([label, path], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: label,
    item: abs(path),
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});
