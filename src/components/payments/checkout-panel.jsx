"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import pb from "@/lib/zep-pocketbase";
import { BILLING_FIELDS, validateBilling } from "@/lib/billing";
import { startCcavenueCheckout } from "@/lib/ccavenue-client";
import { Field, FormAlert, Honeypot, describedBy } from "@/components/forms/herb-fields";

const EMPTY = Object.fromEntries(BILLING_FIELDS.map(([name]) => [name, ""]));

// Side panel that collects billing details and hands off to CCAvenue.
// `item` = { title, lines: [[term, value]], total, request: { kind, ticket_key | amount | package } }.
// The server recomputes the price from `request`; `lines` and `total` are for display only.
export default function CheckoutPanel({ item, onClose, requireAuth = false }) {
  const { user, openAuthModal } = useAuth();
  const dialog = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (item && !dialog.current?.open) dialog.current?.showModal();
    if (!item && dialog.current?.open) dialog.current.close();
  }, [item]);

  // Prefill from the signed-in account, without overwriting anything typed.
  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      billing_name: prev.billing_name || user.name || "",
      billing_email: prev.billing_email || user.email || "",
      billing_tel: prev.billing_tel || user.phone_no || "",
      billing_country: prev.billing_country || user.country || "",
    }));
  }, [user]);

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    if (busy) return;
    const { errors: found } = validateBilling(form);
    if (Object.keys(found).length) {
      setErrors(found);
      setFormError("Some billing details need attention. Each one is marked below.");
      document.getElementById(`checkout-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    setErrors({});
    setFormError(null);
    try {
      const website = new FormData(event.currentTarget).get("website") || "";
      await startCcavenueCheckout({ ...item.request, ...form, website, auth_token: requireAuth ? pb.authStore.token : undefined });
      // The browser is now leaving for CCAvenue; keep the button busy.
    } catch (error) {
      if (error.status === 401) openAuthModal();
      setErrors(error.errors || {});
      setFormError(error.message);
      setBusy(false);
    }
  };

  const needsSignIn = requireAuth && !user;

  return (
    <dialog
      ref={dialog}
      className="herb-dialog sm:!w-[min(560px,100vw)]"
      aria-labelledby="checkout-title"
      onClose={onClose}
      onClick={(event) => event.target === dialog.current && !busy && dialog.current.close()}
    >
      {item ? (
        <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="herb-italic text-[14.5px] text-[var(--ink-2)]">Checkout</p>
              <h2 id="checkout-title" className="mt-1 text-[1.75rem] leading-tight tracking-[-0.02em]">
                {item.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              disabled={busy}
              className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              aria-label="Close checkout"
            >
              <X className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>

          <dl className="mt-6 border-y border-[var(--ink)]">
            {item.lines.map(([term, value]) => (
              <div key={term} className="flex justify-between gap-4 border-b border-[var(--rule)] py-2.5 text-[15.5px] last:border-b-0">
                <dt className="herb-italic text-[var(--ink-2)]">{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-[var(--ink)] py-3">
              <dt className="text-[15.5px] font-semibold">Total</dt>
              <dd className="text-[1.4rem] leading-none tracking-[-0.02em]">{item.total}</dd>
            </div>
          </dl>

          {needsSignIn ? (
            <div className="mt-8">
              <p className="herb-muted">Sign in to register, so your payment is linked to your Zep Research account.</p>
              <button
                type="button"
                onClick={() => {
                  dialog.current?.close();
                  openAuthModal();
                }}
                data-primary
                className="herb-btn mt-6 w-full"
              >
                <span>Sign in or create an account</span>
                <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5" aria-busy={busy}>
              <FormAlert>{formError}</FormAlert>
              <Honeypot />
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Billing details</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {BILLING_FIELDS.map(([name, label, max, autoComplete]) => {
                  const id = `checkout-${name}`;
                  const wide = name === "billing_address" || name === "billing_email";
                  return (
                    <div key={name} className={wide ? "sm:col-span-2" : undefined}>
                      <Field id={id} label={label} error={errors[name]}>
                        <input
                          id={id}
                          name={name}
                          type={name === "billing_email" ? "email" : name === "billing_tel" ? "tel" : "text"}
                          required
                          maxLength={max}
                          autoComplete={autoComplete}
                          value={form[name]}
                          onChange={onChange}
                          aria-invalid={Boolean(errors[name])}
                          aria-describedby={describedBy(id, errors[name])}
                          className="herb-input"
                        />
                      </Field>
                    </div>
                  );
                })}
              </div>
              <button type="submit" disabled={busy} data-primary className="herb-btn mt-2 w-full disabled:cursor-wait disabled:opacity-70">
                <span>{busy ? "Opening secure payment…" : `Pay ${item.total} securely`}</span>
                <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
              </button>
              <p className="herb-muted text-[14px]">
                You will be taken to CCAvenue to pay. The final amount is confirmed on the payment page.
              </p>
            </form>
          )}
        </div>
      ) : null}
    </dialog>
  );
}
