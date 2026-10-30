import { ExternalLink, Mail } from "lucide-react"
import { Field, PageHero } from "@/components/signal/page"
import SigButton from "@/components/signal/SigButton"

export const metadata = {
  title: "Submission Successful - International Conference on Sustainable Tourism & Hospitality Management",
  description:
    "Your paper has been successfully submitted to the International Conference on Sustainable Tourism & Hospitality Management",
}

// A receipt: the confirmation as the hero, then what happens next as two panels.
export default function SuccessPage() {
  return (
    <main className="sig min-h-screen">
      <PageHero
        id="journal-success-title"
        tag="Submitted"
        title="Submission successful"
        lead="Your journal paper has been successfully submitted to the ICSIFT."
        actions={
          <div className="flex flex-wrap gap-3">
            <SigButton href="/">Return to homepage</SigButton>
            <SigButton href="https://publication.zepresearch.com/" tone="outline" external>
              Check submission status
            </SigButton>
          </div>
        }
      />

      <Field tone="cream" labelledBy="journal-next-title">
        <h2 id="journal-next-title" data-enter className="sig-h2">
          What happens next
        </h2>
        <div className="mt-12 grid gap-2 md:grid-cols-2">
          <div data-enter style={{ "--i": 1 }} className="bg-[var(--panel)] p-7 sm:p-9">
            <Mail aria-hidden="true" className="h-9 w-9" strokeWidth={1.5} />
            <h3 className="sig-display mt-5 text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">Check your email</h3>
            <p className="mt-3 text-[18px] text-[var(--muted)]">
              A confirmation email has been sent to your email address. Our team will review your submission and get back to you
              soon.
            </p>
          </div>
          <div data-enter style={{ "--i": 2 }} className="bg-[var(--panel)] p-7 sm:p-9">
            <ExternalLink aria-hidden="true" className="h-9 w-9" strokeWidth={1.5} />
            <h3 className="sig-display mt-5 text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">Track its status</h3>
            <p className="mt-3 text-[18px] text-[var(--muted)]">
              You can check the status of your submission on the main website:{" "}
              <a
                href="https://publication.zepresearch.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="sig-link font-semibold text-[var(--bark)]"
              >
                publication.zepresearch.com
              </a>
            </p>
          </div>
        </div>
      </Field>
    </main>
  )
}
