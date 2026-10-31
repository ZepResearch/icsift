import { Field, LEAD, PageHero } from '@/components/signal/page'
import PaperSubmissionForm from './components/Form'
import { journalSubmitMetadata } from "@/components/metadata";

export const metadata = journalSubmitMetadata;



function page() {
  return (
    <main className="sig min-h-screen">
      <PageHero
        id="journal-submit-title"
        tag="Journals"
        title="Submit your research"
        lead="Submit your paper for review and publication in an indexed journal through Zep Research."
      />

      {/* The form left; who to ask right. */}
      <Field tone="cream" labelledBy="journal-submit-form-title" reveal={false}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <h2 id="journal-submit-form-title" className="sig-h2 mb-10">
              Your details
            </h2>
            <PaperSubmissionForm />
          </div>
          <aside className="bg-[var(--panel)] p-6 sm:p-7 lg:sticky lg:top-40 lg:self-start">
            <h3 className="sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">Before you send</h3>
            <p className={LEAD}>Send your paper as a PDF, DOC or DOCX file, up to 10 MB.</p>
            <p className="mt-5 text-[17px] text-[var(--muted)]">
              Questions?{' '}
              <a href="mailto:info@icsift.com" className="sig-link font-semibold text-[var(--bark)]">
                info@icsift.com
              </a>
            </p>
          </aside>
        </div>
      </Field>
    </main>
  )
}

export default page
