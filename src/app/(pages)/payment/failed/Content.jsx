import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";

const REASONS = [
  ["The card was declined", "Your bank may have declined the transaction. Check with them, or try another card or payment method."],
  ["The gateway had a problem", "The payment service may have had a temporary issue. Wait a few minutes and try again."],
  ["The connection dropped", "The connection was interrupted during payment. Make sure it is stable, then try again."],
];

export default function PaymentFailedPage() {
  return (
    <main className="herb min-h-screen">
      {/* One sheet: title, then a three-column hairline row of likely causes, then the recovery actions. */}
      <section aria-labelledby="failed-title" className="px-3 pt-3 pb-16 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8 lg:pb-24">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 id="failed-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              The payment did not go through.
            </h1>
            <p className="herb-muted max-w-[32rem] text-[17.5px] leading-relaxed">
              Your payment for the {CONFERENCE.shortForm} was not completed, so your place is not confirmed yet. You can try
              again now.
            </p>
          </div>

          <h2 className="mt-12 text-[13px] font-semibold tracking-[0.08em] uppercase">What may have happened</h2>
          <ol className="mt-4 grid gap-px border-y border-[var(--ink)] bg-[var(--rule)] md:grid-cols-3">
            {REASONS.map(([title, body], index) => (
              <li key={title} className="bg-[var(--sheet)] py-6 md:px-6 md:first:pl-0 md:last:pr-0">
                <span className="herb-italic block text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-1 block text-[19px] leading-snug">{title}</span>
                <span className="herb-muted mt-2 block text-[15.5px]">{body}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <p className="max-w-[38rem] text-[16.5px]">
              If money left your account but you landed here, do not pay again. Write to{" "}
              <a href="mailto:info@icsift.com" className="herb-link">
                info@icsift.com
              </a>{" "}
              with the order number from your &ldquo;Payment initiated&rdquo; email, and we will sort it out.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <ActionLink href="/registration" primary>
                Try the payment again
              </ActionLink>
              <ActionLink href="/contact">Contact support</ActionLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
