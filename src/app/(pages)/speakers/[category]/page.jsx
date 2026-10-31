import Link from "next/link";
import { notFound } from "next/navigation";
import { CONFERENCE } from "@/constants/conference";
import { CallBand, Field, PageHero } from "@/components/signal/page";
import { SPEAKER_CATEGORIES, speakerCategory } from "@/lib/speakers";
import SpeakerList from "./SpeakerList";
import JsonLd from "@/components/seo/JsonLd";
import { SHORT_WHEN, breadcrumbSchema, pageMetadata } from "@/lib/seo";

// One page per speaker category (/speakers/keynote-speaker and so on), built from the fixed list in lib/speakers.js.
// Any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SPEAKER_CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }) {
  const entry = speakerCategory((await params).category);
  if (!entry) return {};
  return pageMetadata({
    path: `/speakers/${entry.slug}`,
    title: entry.title,
    description: `${entry.lead} Meet the ${entry.title.toLowerCase()} of the ${CONFERENCE.shortForm}, ${SHORT_WHEN}.`,
    keywords: [`${CONFERENCE.shortForm} ${entry.title.toLowerCase()}`, "conference speakers", "keynote speakers"],
  });
}

export default async function SpeakerCategoryPage({ params }) {
  const entry = speakerCategory((await params).category);
  if (!entry) notFound();

  return (
    <main className="sig min-h-screen">
      <JsonLd data={breadcrumbSchema([["Key people", "/committee"], [entry.title, `/speakers/${entry.slug}`]])} />
      {/* Hero: the category as the title; every Key People page as jump panels right, this one highlighted. */}
      <PageHero
        id="speakers-title"
        tag="Key people"
        title={entry.title}
        lead={`${entry.lead} ${CONFERENCE.shortForm}, ${CONFERENCE.date}, ${CONFERENCE.venue.location.trim()} and online.`}
        aside={
          <nav aria-label="Key people">
            <p className="text-[16px] text-[var(--muted)]">Key people</p>
            <ul className="mt-3 grid gap-2">
              {[["/committee", "Committee"], ...SPEAKER_CATEGORIES.map((c) => [`/speakers/${c.slug}`, c.title])].map(([href, label]) => {
                const current = href === `/speakers/${entry.slug}`;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={current ? "page" : undefined}
                      className={`sig-display flex items-center justify-between px-5 py-3.5 text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)] leading-none transition-colors duration-200 ${
                        current ? "bg-[var(--signal)] text-[var(--forest)]" : "bg-[var(--panel)] hover:bg-black/20"
                      }`}
                    >
                      {label}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        }
      />

      <Field tone="cream" labelledBy="speakers-title" reveal={false}>
        <SpeakerList category={entry.category} title={entry.title} />
      </Field>

      <CallBand
        title={`Join them at the ${CONFERENCE.shortForm}`}
        text={`${CONFERENCE.date}, ${CONFERENCE.venue.name.trim()} and online. Submit a paper to present it, or register to attend.`}
      />
    </main>
  );
}
