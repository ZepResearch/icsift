import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getJournalById } from "@/lib/pocketbase";
import { coverOf, indexName } from "@/lib/journals";
import { FactCells, Field, PageHero } from "@/components/signal/page";
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
    <main className="sig min-h-screen">
      {/* Hero: the journal title as the h1 with an "All journals" link; the cover on a panel and its facts right. */}
      <PageHero
        id="journal-title"
        tag="Journal"
        title={title}
        titleClass="text-[clamp(2.4rem,1.3rem+3.4vw,4.75rem)]"
        lead="Submit your paper to this journal through Zep Research. You will get a confirmation email once it is received."
        actions={
          <Link href="/journals" className="sig-link inline-flex items-center gap-2 text-[17px] font-semibold">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            All journals
          </Link>
        }
        aside={
          <div className="grid gap-2 sm:grid-cols-[minmax(0,11rem)_1fr]">
            <figure className="bg-[var(--panel)] p-4">
              <div className="relative aspect-[3/4] bg-white">
                {cover ? (
                  <Image src={cover} alt={`Cover of ${title}`} fill priority sizes="200px" className="object-contain" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center p-4 text-center text-[15px] text-[var(--bark-2)]">No cover on file</span>
                )}
              </div>
              <figcaption className="mt-3 text-[14.5px] text-[var(--muted)]">Journal cover</figcaption>
            </figure>
            <FactCells
              columns=""
              size="text-[clamp(1.2rem,1.05rem+0.5vw,1.5rem)]"
              facts={[
                ["ISSN", journal.issncode?.trim() || "Not listed"],
                ["Indexed in", indexName(journal.indexType) || "Not listed"],
                ["Files", "PDF, DOC or DOCX, up to 10 MB"],
              ]}
            />
          </div>
        }
      />

      {/* The form left; a sticky rail with the journal's links and help right. */}
      <Field tone="cream" labelledBy="journal-form-title" reveal={false}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <h2 id="journal-form-title" className="sig-h2 mb-10">
              Submit your paper
            </h2>
            <PaperSubmissionForm journalId={journal.id} journalTitle={title} />
          </div>

          <aside className="flex flex-col gap-2 lg:sticky lg:top-40 lg:self-start">
            <div className="bg-[var(--panel)] p-6 sm:p-7">
              <h3 className="sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">This journal</h3>
              <dl className="mt-5 grid gap-4 text-[17px]">
                <div>
                  <dt className="text-[15px] text-[var(--muted)]">Title</dt>
                  <dd className="font-semibold">{title}</dd>
                </div>
                {website ? (
                  <div>
                    <dt className="text-[15px] text-[var(--muted)]">Website</dt>
                    <dd>
                      <a href={website} target="_blank" rel="noopener noreferrer" className="sig-link font-semibold break-all">
                        Visit the journal
                      </a>
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-[15px] text-[var(--muted)]">Help</dt>
                  <dd>
                    <a href="mailto:info@icsift.com" className="sig-link font-semibold">
                      info@icsift.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <p className="bg-[var(--forest)] p-6 text-[17px] text-[var(--signal)]">
              Already submitted? Track it at{" "}
              <a href="https://publication.zepresearch.com/" target="_blank" rel="noopener noreferrer" className="sig-link font-semibold">
                publication.zepresearch.com
              </a>
              .
            </p>
          </aside>
        </div>
      </Field>
    </main>
  );
}
