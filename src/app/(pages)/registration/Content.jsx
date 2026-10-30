"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, CallBand, FactCells, Field, LEAD, PageHero, SPLIT, StickyIntro, Steps } from "@/components/signal/page";
import { Field as FormField } from "@/components/forms/herb-fields";
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

// A two-way choice set as two large toggle panels; the selected one turns yellow. Native radios keep it accessible.
function Choice({ legend, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="text-[16px] text-[var(--muted)]">{legend}</legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {options.map(([optionValue, label]) => {
          const checked = value === optionValue;
          return (
            <label
              key={optionValue}
              className={`sig-display flex min-h-[64px] cursor-pointer items-center px-5 text-[clamp(1.2rem,1rem+0.6vw,1.55rem)] leading-[1.05] transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--signal)] ${
                checked ? "bg-[var(--signal)] text-[var(--forest)]" : "bg-[var(--panel)] hover:bg-black/20"
              }`}
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
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the two fee choices right as toggle panels, which drive the fee table below. */}
      <PageHero
        id="registration-title"
        tag="Registration"
        title={`Register for the ${CONFERENCE.shortForm}`}
        lead={`Presenting a paper or attending to listen, every registration includes the keynotes, panel discussions and networking. ${CONFERENCE.date}, ${CONFERENCE.venue.location.trim()} and online.`}
        actions={<ActionPair tone="forest" primary={["#fees", "See the fees"]} secondary={["/submission", "Submit a paper"]} />}
        aside={
          <div className="grid gap-5">
            <Choice legend="Accommodation" name="plan" options={PLANS} value={plan} onChange={setPlan} />
            <Choice legend="You are" name="participant" options={PARTICIPANTS} value={participant} onChange={setParticipant} />
            <p className="text-[15.5px] text-[var(--muted)]">
              {EARLY_BIRD_ACTIVE ? "Early Bird prices are open. " : ""}Fees are in US dollars; {TAX_RATE * 100}% tax is added at checkout.
            </p>
          </div>
        }
      />

      {/* Fee table: one row per category; each price is a button that opens checkout. */}
      <Field tone="cream" id="fees" labelledBy="fees-title" reveal={false}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="fees-title" className="sig-h2">
            Choose your fee
          </h2>
          <p className="bg-[var(--forest)] px-4 py-2 text-[16px] font-semibold text-[var(--signal)]" aria-live="polite">
            {participantName.charAt(0).toUpperCase() + participantName.slice(1)} participants, {planName}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-y-2 text-left">
            <thead>
              <tr className="text-[16px]">
                <th scope="col" className="pb-2 pl-6 font-semibold text-[var(--muted)]">
                  Category
                </th>
                {priceTypes.map(([type, label]) => (
                  <th key={type} scope="col" className="w-[12rem] px-2 pb-2 font-semibold text-[var(--muted)]">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.category} className="bg-[var(--panel)] align-top">
                  <th scope="row" className="py-5 pr-6 pl-6 text-left font-normal">
                    <span className="sig-display block text-[clamp(1.4rem,1.15rem+0.7vw,1.85rem)] leading-[1.04]">{row.category}</span>
                    <details className="mt-3">
                      <summary className="sig-link w-fit cursor-pointer text-[15.5px] font-semibold">What is included</summary>
                      <ul className="mt-3 grid gap-1.5 text-[15.5px] text-[var(--muted)]">
                        {row.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </details>
                  </th>
                  {priceTypes.map(([type, label]) => (
                    <td key={type} className="px-2 py-5 pr-4">
                      {row.prices[type] ? (
                        <button
                          type="button"
                          onClick={() => chooseTicket(row.category, type)}
                          className="group flex w-full flex-col items-start bg-white px-4 py-3 text-left transition-colors duration-200 hover:bg-[var(--forest)] hover:text-[var(--signal)]"
                          aria-label={`Choose ${row.category}, ${label}, ${money(row.prices[type])}`}
                        >
                          <span className="sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)] leading-none">{money(row.prices[type])}</span>
                          <span className="mt-2 flex items-center gap-1.5 text-[14.5px] font-semibold">
                            Choose
                            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.4} />
                          </span>
                        </button>
                      ) : (
                        <span className="text-[15px] text-[var(--muted)]">Not offered</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-[44rem] text-[16.5px] text-[var(--muted)]">
          For group discounts, contact the coordinator at{" "}
          <a href="mailto:info@icsift.com" className="sig-link font-semibold text-[var(--bark)]">
            info@icsift.com
          </a>
          . Offers are also available for outstanding contributors.
        </p>
      </Field>

      {/* How it works */}
      <Field tone="forest" labelledBy="steps-title">
        <div className={SPLIT}>
          <StickyIntro tag="Process" id="steps-title" title="How registration works">
            <p className={`${LEAD} text-[var(--muted)]`}>Check your details before you pay; they appear on your receipt.</p>
          </StickyIntro>
          <div data-enter style={{ "--i": 2 }}>
            <Steps steps={STEPS} />
          </div>
        </div>
      </Field>

      {/* Custom payment */}
      <Field tone="cream" id="custom" labelledBy="custom-title" reveal={false}>
        <div className={SPLIT}>
          <div className="lg:sticky lg:top-40 lg:self-start">
            <p className="sig-tag">Custom amount</p>
            <h2 id="custom-title" className="sig-h2 mt-5 !text-[clamp(2.4rem,1.6rem+2.4vw,4.2rem)]">
              Paying a different amount?
            </h2>
            <p className={`${LEAD} text-[var(--muted)]`}>
              For an amount agreed with the organisers, such as a balance or an extra service, enter it here. {TAX_RATE * 100}% tax is
              added.
            </p>
          </div>
          <form onSubmit={chooseCustom} noValidate className="grid gap-5 self-start bg-[var(--panel)] p-6 sm:p-8">
            <FormField id="custom-amount" label="Amount in US dollars" error={customError} hint="Between $1 and $10,000.">
              <div className="relative">
                <span aria-hidden="true" className="sig-display absolute top-1/2 left-4 -translate-y-1/2 text-[24px]">
                  $
                </span>
                <input
                  id="custom-amount"
                  inputMode="decimal"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  aria-invalid={Boolean(customError)}
                  aria-describedby={customError ? "custom-amount-error" : "custom-amount-hint"}
                  className="herb-input !py-4 !pl-10 text-[22px]"
                />
              </div>
            </FormField>
            {customPreview ? (
              <dl className="grid grid-cols-3 gap-2">
                {[
                  ["Amount", money(customPreview.price)],
                  [TAX_LABEL, money(customPreview.taxAmount)],
                  ["Total", money(customPreview.totalAmount)],
                ].map(([term, value], index) => (
                  <div key={term} className={`px-4 py-3 ${index === 2 ? "bg-[var(--forest)] text-[var(--signal)]" : "bg-white"}`}>
                    <dt className={`text-[14.5px] ${index === 2 ? "text-[var(--cream)]/80" : "text-[var(--muted)]"}`}>{term}</dt>
                    <dd className="sig-display mt-1 text-[clamp(1.2rem,1rem+0.6vw,1.6rem)] leading-none">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <button type="submit" className="sig-btn w-full sm:max-w-[22rem]" data-dark="">
              <span>Continue to payment</span>
              <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </button>
          </form>
        </div>
      </Field>

      {/* Benefits and the cancellation policy */}
      <Field tone="forest" labelledBy="benefits-title">
        <h2 id="benefits-title" data-enter className="sig-h2">
          What registration gives you
        </h2>
        <ul className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(([term, value], index) => (
            <li key={term} data-enter style={{ "--i": 1 + (index % 4) }} className="bg-[var(--panel)] p-6">
              <h3 className="sig-display text-[clamp(1.3rem,1.1rem+0.6vw,1.65rem)] leading-[1.05]">{term}</h3>
              <p className="mt-2 text-[16.5px] text-[var(--muted)]">{value}</p>
            </li>
          ))}
        </ul>

        <div data-enter style={{ "--i": 2 }} className="mt-20 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <h3 className="sig-display text-[clamp(2rem,1.5rem+1.6vw,3rem)]">Cancellation policy</h3>
            <p className="mt-4 max-w-[30rem] text-[17px] text-[var(--muted)]">
              The short version. The full policy covers every case.
            </p>
            <Link href="/cancellation-policy" className="sig-link mt-5 inline-block text-[17px] font-semibold">
              Read the full policy
            </Link>
          </div>
          <FactCells
            size="text-[clamp(1.15rem,1rem+0.5vw,1.45rem)]"
            facts={[
              ["60+ days before", "Full refund if you cancel more than 60 days before the event"],
              ["60 days or less", "No refund"],
              ["How", "All cancellations must be made in writing"],
              ["Transfers", "Allowed to another person up to 7 days before the event"],
            ]}
          />
        </div>
      </Field>

      <CallBand
        title="Presenting? Submit your paper too"
        text="Registration secures your place; your paper is submitted separately."
        primary={["/submission", "Submit a paper"]}
        secondary={["#fees", "Choose your fee"]}
      />

      <CheckoutPanel item={checkout} onClose={() => setCheckout(null)} requireAuth />
    </main>
  );
}
