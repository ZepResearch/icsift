import { getJournals } from "@/lib/pocketbase";
import { SPEAKER_CATEGORIES } from "@/lib/speakers";
import { SITE_URL } from "@/lib/seo";

// /sitemap.xml: every public page, with how often it changes and how much it matters relative to the rest.
// Receipts, payment results and empty pages are left out (they are also marked noindex).
export const revalidate = 86400; // Rebuild daily so new journals appear.

const PAGES = [
  ["/", 1.0, "weekly"],
  ["/submission", 0.95, "weekly"],
  ["/registration", 0.95, "weekly"],
  ["/about-conference", 0.85, "monthly"],
  ["/theme-and-topics", 0.85, "monthly"],
  ["/papers-format", 0.8, "monthly"],
  ["/schedule", 0.8, "weekly"],
  ["/venue", 0.8, "monthly"],
  ["/committee", 0.75, "weekly"],
  ["/journals", 0.75, "weekly"],
  ["/mode-of-presentation", 0.7, "monthly"],
  ["/awards", 0.7, "monthly"],
  ["/exhibit-and-sponsor", 0.65, "monthly"],
  ["/proceedings", 0.65, "monthly"],
  ["/gallery", 0.6, "monthly"],
  ["/about-organizers", 0.6, "monthly"],
  ["/about-co-organizers", 0.6, "monthly"],
  ["/contact", 0.6, "yearly"],
  ["/terms-and-conditions", 0.3, "yearly"],
  ["/privacy-policy", 0.3, "yearly"],
  ["/cancellation-policy", 0.3, "yearly"],
  ["/complaints-policy", 0.3, "yearly"],
  ["/equal-treatment-policy", 0.3, "yearly"],
  ["/disability-discrimination-policy", 0.3, "yearly"],
  ["/health-and-safety-policy", 0.3, "yearly"],
];

export default async function sitemap() {
  const now = new Date();
  const entry = (path, priority, changeFrequency, lastModified = now) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const pages = PAGES.map(([path, priority, freq]) => entry(path, priority, freq));
  const speakers = SPEAKER_CATEGORIES.map(({ slug }) => entry(`/speakers/${slug}`, 0.7, "weekly"));

  // Journals come from PocketBase; if it is unreachable the sitemap still lists every other page.
  let journals = [];
  try {
    const records = await getJournals();
    journals = (records || [])
      .filter((journal) => journal?.id && !journal.not_visible)
      .map((journal) => entry(`/journals/${journal.id}`, 0.5, "monthly", journal.updated ? new Date(journal.updated) : now));
  } catch {
    journals = [];
  }

  return [...pages, ...speakers, ...journals];
}
