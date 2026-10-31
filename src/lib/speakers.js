// Speaker categories that get their own page at /speakers/[slug]. `category` is the exact value stored in the
// PocketBase ICSIFT_speakers collection; the navbar's Key People menu and the pages both read this list.
export const SPEAKER_CATEGORIES = [

  {
    slug: "conference-chair",
    category: "Conference Chair",
    title: "Conference chair",
    lead: "The chair who leads the conference and its programme.",
  },
  {
    slug: "conference-co-chair",
    category: "Conference Co-Chair",
    title: "Conference co-chairs",
    lead: "The co-chairs who lead the conference alongside the chair.",
  },
    {
    slug: "keynote-speaker",
    category: "Keynote Speaker",
    title: "Keynote speakers",
    lead: "The invited speakers who deliver the keynote addresses.",
  },
  {
    slug: "session-chair",
    category: "Session Chair",
    title: "Session chairs",
    lead: "The chairs who run the paper sessions.",
  },
];

export const speakerCategory = (slug) => SPEAKER_CATEGORIES.find((entry) => entry.slug === slug) || null;

export const speakerPhoto = (s) => `https://conference.pockethost.io/api/files/${s.collectionId}/${s.id}/${s.image}`;

// Some PocketBase text fields arrive HTML-escaped ("Lecturer &amp; Speaker").
export const plainText = (text) =>
  String(text ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
