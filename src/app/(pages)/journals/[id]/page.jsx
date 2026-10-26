import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getJournalById } from "@/lib/pocketbase";
import { coverOf, indexName } from "@/lib/journals";
import { AccessionLabel } from "@/components/home/primitives";
import PaperSubmissionForm from "./components/Form";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const journal = await getJournalById(id);
  if (!journal || journal.not_visible) return { title: "Journal not found | ICSIFT" };
  return {
    title: `Submit to ${journal.title} | ICSIFT`,
    description: `Submit your paper to ${journal.title}${journal.issncode ? ` (ISSN ${journal.issncode.trim()})` : ""} through Zep Research.`,
  };
}

export default async function JournalDetailPage({ params }) {
  const { id } = await params;
  const journal = await getJournalById(id);
  if (!journal || journal.not_visible) notFound();

  const title = journal.title || "Untitled journal";
  const cover = coverOf(journal);
  const website = /^https?:\/\//.test(journal.web_url || "") ? journal.web_url : null;

  return (
    <main className="herb min-h-screen">
      {/* One sheet: title over an ink rule; the form left, the journal's cover set as a specimen in the right rail. */}
      <section aria-labelledby="journal-title" className="px-3 pt-3 pb-16 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8 lg:pb-24">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="border-b border-[var(--ink)] pb-10">
            <h1 id="journal-title" className="herb-display max-w-[24ch] text-[clamp(2.25rem,1.3rem+2.8vw,4rem)]">
              {title}
            </h1>
            <p className="herb-muted mt-5 max-w-[40rem] text-[17.5px] leading-relaxed">
              Submit your paper to this journal through Zep Research. You will get a confirmation email once it is received.
            </p>
            <Link href="/journals" className="herb-link mt-5 inline-flex items-center gap-2 text-[15.5px]">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
              All journals
            </Link>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
            <PaperSubmissionForm journalId={journal.id} journalTitle={title} />

            <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
              <figure className="max-w-[260px]">
                <div className="relative aspect-[3/4] border border-[var(--rule)] bg-[var(--rule-soft)]">
                  {cover ? (
                    <Image src={cover} alt={`Cover of ${title}`} fill priority sizes="260px" className="object-contain" />
                  ) : (
                    <span className="herb-italic absolute inset-0 grid place-items-center p-4 text-center text-[14px] text-[var(--ink-2)]">
                      No cover on file
                    </span>
                  )}
                </div>
                <figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">Journal cover</figcaption>
              </figure>

              <AccessionLabel
                title="This journal"
                rows={[
                  ["ISSN", journal.issncode?.trim() || "Not listed"],
                  ["Indexed in", indexName(journal.indexType) || "Not listed"],
                  ...(website
                    ? [
                        [
                          "Website",
                          <a key="web" href={website} target="_blank" rel="noopener noreferrer" className="herb-link break-all">
                            Visit the journal
                          </a>,
                        ],
                      ]
                    : []),
                  ["Files", "PDF, DOC or DOCX, up to 10 MB"],
                  [
                    "Help",
                    <a key="help" href="mailto:info@icsift.com" className="herb-link">
                      info@icsift.com
                    </a>,
                  ],
                ]}
              />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
