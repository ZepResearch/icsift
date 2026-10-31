import { CONFERENCE } from "@/constants/conference";
import { ActionPair, Field, PageHero } from "@/components/signal/page";

const REASONS = [
  ["The card was declined", "Your bank may have declined the transaction. Check with them, or try another card or payment method."],
  ["The gateway had a problem", "The payment service may have had a temporary issue. Wait a few minutes and try again."],
  ["The connection dropped", "The connection was interrupted during payment. Make sure it is stable, then try again."],
];

// The failure in the hero with the two recovery actions; the likely causes as panels; then the money-left-your-account note.
export default function PaymentFailedPage() {
  return (
    <main className="sig min-h-screen">
      <PageHero
        id="failed-title"
        tag="Payment not completed"
        title="The payment did not go through"
        lead={`Your payment for the ${CONFERENCE.shortForm} was not completed, so your place is not confirmed yet. You can try again now.`}
        actions={<ActionPair tone="forest" primary={["/registration", "Try the payment again"]} secondary={["/contact", "Contact support"]} />}
      />

      <Field tone="cream" labelledBy="reasons-title">
        <h2 id="reasons-title" data-enter className="sig-h2">
          What may have happened
        </h2>
        <ul className="mt-12 grid gap-2 md:grid-cols-3">
          {REASONS.map(([title, body], index) => (
            <li key={title} data-enter style={{ "--i": 1 + index }} className="bg-[var(--panel)] p-6 sm:p-7">
              <h3 className="sig-display text-[clamp(1.5rem,1.2rem+0.8vw,2rem)] leading-[1.04]">{title}</h3>
              <p className="mt-3 text-[17px] text-[var(--muted)]">{body}</p>
            </li>
          ))}
        </ul>

        <p data-enter style={{ "--i": 4 }} className="mt-10 max-w-[46rem] bg-[var(--signal)] px-6 py-5 text-[18px] text-[var(--forest)]">
          <strong className="font-semibold">If money left your account but you landed here, do not pay again.</strong> Write to{" "}
          <a href="mailto:info@icsift.com" className="sig-link font-semibold">
            info@icsift.com
          </a>{" "}
          with the order number from your &ldquo;Payment initiated&rdquo; email, and we will sort it out.
        </p>
      </Field>
    </main>
  );
}
