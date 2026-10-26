"use client";

import { useState } from "react";
import Link from "next/link";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink, AccessionLabel } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";
import { Field } from "@/components/forms/herb-fields";
import CheckoutPanel from "@/components/payments/checkout-panel";
import {
  EARLY_BIRD_ACTIVE,
  PARTICIPANTS,
  PLANS,
  PRICE_TYPES,
  REGISTRATION,
  TAX_RATE,
  customAmountProblem,
  money,
  resolveTicket,
  ticketKey,
  withTax,
} from "@/lib/pricing";

const TAX_LABEL = `Tax (${TAX_RATE * 100}%)`;

const STEPS = [
  ["Choose your fee", "Pick your category, how you will take part, and whether you need accommodation."],
  ["Sign in", "Registration is tied to your Zep Research account, so you can find it again later."],
  ["Enter billing details", "Your name, organisation and address, as they should appear on the receipt."],
  ["Pay through CCAvenue", "You are taken to CCAvenue's secure page to complete the payment."],
  ["Confirmation", "You receive a confirmation email with your payment details and an official receipt."],
];

const BENEFITS = [
  ["Conference materials", "Access to proceedings, papers and presentation materials."],
  ["Networking", "Connect with researchers and professionals from around the world."],
  ["Interactive sessions", "Workshops, panel discussions and Q&A sessions."],
  ["Career development", "New skills, career prospects and business ideas."],
  ["Publication", "Publication in Scopus, Web of Science and Google Scholar indexed journals."],
  ["Knowledge exchange", "With presenters, session chairs, speakers and other attendees."],
  ["Video documentation", "Videos of your talk and highlights posted on Facebook and YouTube."],
  ["Digital certificates", "Official participation and presentation certificates."],
];

function Choice({ legend, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="text-[13px] font-semibold tracking-[0.08em] uppercase">{legend}</legend>
      <div className="mt-3 grid grid-cols-2 border border-[var(--ink)]">
        {options.map(([optionValue, label], index) => {
          const checked = value === optionValue;
          return (
            <label
              key={optionValue}
              className={`relative cursor-pointer px-4 py-3.5 text-[16px] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--green)] ${
                index ? "border-l border-[var(--ink)]" : ""
              } ${checked ? "bg-[var(--ink)] text-white" : "hover:bg-[var(--rule-soft)]"}`}
            >
              <input type="radio" name={name} value={optionValue} checked={checked} onChange={() => onChange(optionValue)} className="sr-only" />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function RegistrationPage() {
  const [plan, setPlan] = useState("noAccommodation");
  const [participant, setParticipant] = useState("local");
  const [customAmount, setCustomAmount] = useState("");
  const [customError, setCustomError] = useState(null);
  const [checkout, setCheckout] = useState(null);

  const rows = REGISTRATION[plan][participant];
  const priceTypes = PRICE_TYPES.filter(
    ([type]) => (type !== "earlyBird" || EARLY_BIRD_ACTIVE) && rows.some((row) => row.prices[type]),
  );
  const planName = PLANS.find(([v]) => v === plan)[1].toLowerCase();
  const participantName = PARTICIPANTS.find(([v]) => v === participant)[1].toLowerCase();

  const chooseTicket = (category, priceType) => {
    const ticket = resolveTicket(ticketKey(plan, participant, category, priceType));
    if (!ticket) return;
    setCheckout({
      title: ticket.name,
      lines: [
        ["Accommodation", plan === "withAccommodation" ? "Included" : "Not included"],
        ["Fee", money(ticket.price)],
        [TAX_LABEL, money(ticket.taxAmount)],
      ],
      total: money(ticket.totalAmount),
      request: { kind: "ticket", ticket_key: ticket.key },
    });
  };

  const chooseCustom = (event) => {
    event.preventDefault();
    const problem = customAmountProblem(customAmount);
    setCustomError(problem);
    if (problem) return;
    const { price, taxAmount, totalAmount } = withTax(Number(customAmount));
    setCheckout({
      title: "Custom payment",
      lines: [
        ["Amount", money(price)],
        [TAX_LABEL, money(taxAmount)],
      ],
      total: money(totalAmount),
      request: { kind: "custom", amount: customAmount.trim() },
    });
  };

  const customPreview = !customAmountProblem(customAmount) ? withTax(Number(customAmount)) : null;

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title and intro left; the two fee choices right, which drive the fee table below. */}
      <section aria-labelledby="registration-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:p-12">
          <div>
            <h1 id="registration-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Register for the {CONFERENCE.shortForm}.
            </h1>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
              Presenting a paper or attending to listen, every registration includes the keynotes, panel discussions and
              networking. {CONFERENCE.date}, {CONFERENCE.venue.location.trim()} and online.
            </p>
          </div>

          <div className="grid gap-6">
            <Choice legend="Accommodation" name="plan" options={PLANS} value={plan} onChange={setPlan} />
            <Choice legend="You are" name="participant" options={PARTICIPANTS} value={participant} onChange={setParticipant} />
            <p className="herb-italic text-[15px] text-[var(--ink-2)]">
              {EARLY_BIRD_ACTIVE ? "Early Bird prices are open. " : ""}Fees are in US dollars; {TAX_RATE * 100}% tax is added at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Fee table */}
      <section id="fees" aria-labelledby="fees-title" className="scroll-mt-24 px-3 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="fees-title" className="herb-h2 max-w-[16ch]">
              Choose your fee.
            </h2>
            <p className="herb-italic text-[16px] text-[var(--ink-2)]" aria-live="polite">
              {participantName.charAt(0).toUpperCase() + participantName.slice(1)} participants, {planName}
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--ink)] text-[13px] tracking-[0.08em] uppercase">
                  <th scope="col" className="py-3 pr-6 font-semibold">Category</th>
                  {priceTypes.map(([type, label]) => (
                    <th key={type} scope="col" className="w-[11rem] px-2 py-3 font-semibold">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.category} className="border-b border-[var(--rule)] align-top">
                    <th scope="row" className="py-5 pr-6 text-left font-normal">
                      <span className="block text-[19px] leading-snug">{row.category}</span>
                      <details className="mt-2">
                        <summary className="herb-link w-fit cursor-pointer text-[14.5px]">What is included</summary>
                        <ul className="mt-2 grid gap-1 text-[15px] text-[var(--ink-2)]">
                          {row.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </details>
                    </th>
                    {priceTypes.map(([type, label]) => (
                      <td key={type} className="px-2 py-5">
                        {row.prices[type] ? (
                          <button
                            type="button"
                            onClick={() => chooseTicket(row.category, type)}
                            className="group flex w-full flex-col items-start border border-[var(--rule)] px-3 py-2.5 text-left hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
                            aria-label={`Choose ${row.category}, ${label}, ${money(row.prices[type])}`}
                          >
                            <span className="text-[1.35rem] leading-none tracking-[-0.02em]">{money(row.prices[type])}</span>
                            <span className="mt-1.5 text-[13.5px] text-[var(--ink-2)] group-hover:text-white">Choose</span>
                          </button>
                        ) : (
                          <span className="herb-italic text-[14px] text-[var(--ink-2)]">Not offered</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="herb-muted mt-6 max-w-[44rem] text-[15px]">
            For group discounts, contact the coordinator at{" "}
            <a href="mailto:info@icsift.com" className="herb-link">
              info@icsift.com
            </a>
            . Offers are also available for outstanding contributors.
          </p>
        </div>
      </section>

      {/* Custom payment */}
      <section id="custom" aria-labelledby="custom-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:p-12">
          <div>
            <h2 id="custom-title" className="herb-h2 max-w-[14ch]">
              Paying a different amount?
            </h2>
            <p className="herb-muted mt-5 max-w-[32rem]">
              For an amount agreed with the organisers, such as a balance or an extra service, enter it here.{" "}
              {TAX_RATE * 100}% tax is added.
            </p>
          </div>
          <form onSubmit={chooseCustom} noValidate className="grid gap-5 self-end">
            <Field id="custom-amount" label="Amount in US dollars" error={customError} hint={`Between $1 and $10,000.`}>
              <div className="relative">
                <span aria-hidden="true" className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--ink-2)]">
                  $
                </span>
                <input
                  id="custom-amount"
                  inputMode="decimal"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  aria-invalid={Boolean(customError)}
                  aria-describedby={customError ? "custom-amount-error" : "custom-amount-hint"}
                  className="herb-input pl-8 text-[18px]"
                />
              </div>
            </Field>
            {customPreview ? (
              <dl className="grid grid-cols-3 border-y border-[var(--rule)] py-3 text-[15px]">
                <div>
                  <dt className="herb-italic text-[var(--ink-2)]">Amount</dt>
                  <dd>{money(customPreview.price)}</dd>
                </div>
                <div>
                  <dt className="herb-italic text-[var(--ink-2)]">{TAX_LABEL}</dt>
                  <dd>{money(customPreview.taxAmount)}</dd>
                </div>
                <div>
                  <dt className="herb-italic text-[var(--ink-2)]">Total</dt>
                  <dd className="font-semibold">{money(customPreview.totalAmount)}</dd>
                </div>
              </dl>
            ) : null}
            <button type="submit" className="herb-btn w-full sm:max-w-[22rem]">
              <span>Continue to payment</span>
            </button>
          </form>
        </Reveal>
      </section>

      {/* How it works */}
      <section aria-labelledby="steps-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="steps-title" className="herb-h2 max-w-[13ch]">
              How registration works.
            </h2>
            <p className="herb-muted mt-5 max-w-[26rem]">Check your details before you pay; they appear on your receipt.</p>
          </div>
          <Reveal as="ol" className="border-t border-[var(--ink)]">
            {STEPS.map(([title, body], index) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-y-1 border-b border-[var(--rule)] py-5 sm:grid-cols-[2.5rem_13rem_1fr] sm:gap-x-6">
                <span className="herb-italic text-[14px] text-[var(--ink-2)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-[18px] leading-snug font-medium">{title}</h3>
                <p className="herb-muted col-start-2 text-[15.5px] sm:col-start-3">{body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Benefits and policy */}
      <section aria-labelledby="benefits-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-12 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16 lg:p-12">
          <div>
            <h2 id="benefits-title" className="herb-h2 max-w-[16ch]">
              What registration gives you.
            </h2>
            <dl className="mt-10 grid border-t border-[var(--ink)] sm:grid-cols-2 sm:gap-x-10">
              {BENEFITS.map(([term, value]) => (
                <div key={term} className="border-b border-[var(--rule)] py-4">
                  <dt className="text-[17px]">{term}</dt>
                  <dd className="herb-muted mt-1 text-[15px]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="self-start">
            <AccessionLabel
              title="Cancellation policy"
              rows={[
                ["60+ days", "Full refund if you cancel more than 60 days before the event"],
                ["60 days or less", "No refund"],
                ["How", "All cancellations must be made in writing"],
                ["Transfers", "Allowed to another person up to 7 days before the event"],
              ]}
            />
            <Link href="/cancellation-policy" className="herb-link mt-4 inline-block text-[15.5px]">
              Read the full policy
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section aria-labelledby="registration-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="registration-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Presenting? Submit your paper too.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Registration secures your place; your paper is submitted separately.
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/submission" primary>
              Submit a paper
            </ActionLink>
            <ActionLink href="#fees">Register to attend</ActionLink>
          </div>
        </Reveal>
      </section>

      <CheckoutPanel item={checkout} onClose={() => setCheckout(null)} requireAuth />
    </main>
  );
}
