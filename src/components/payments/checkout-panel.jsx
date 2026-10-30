"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
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
      className="sig herb-dialog !max-w-[100vw] !w-screen sm:!w-[min(560px,100vw)]"
      aria-labelledby="checkout-title"
      onClose={onClose}
      onClick={(event) => event.target === dialog.current && !busy && dialog.current.close()}
    >
      {item ? (
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Forest header: what is being bought, its lines and the total set large. */}
          <div className="sig-forest px-6 pt-6 pb-7 sm:px-8">
            <div className="flex items-start justify-between gap-6">
              <p className="sig-tag text-[22px]">Checkout</p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                disabled={busy}
                className="grid h-11 w-11 shrink-0 place-items-center bg-[var(--signal)] text-[var(--forest)] hover:bg-[var(--signal-deep)]"
                aria-label="Close checkout"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <h2 id="checkout-title" className="sig-display mt-5 text-[clamp(2rem,1.6rem+1.4vw,2.8rem)]">
              {item.title}
            </h2>
            <dl className="mt-6 grid gap-2">
              {item.lines.map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4 text-[16px]">
                  <dt className="text-[var(--muted)]">{term}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
              <div className="mt-2 flex items-end justify-between gap-4 bg-[var(--panel)] px-4 py-4">
                <dt className="text-[16px] font-semibold">Total</dt>
                <dd className="sig-display text-[clamp(2rem,1.6rem+1.2vw,2.6rem)] leading-none">{item.total}</dd>
              </div>
            </dl>
          </div>

          <div className="flex-1 px-6 pb-8 sm:px-8">
          {needsSignIn ? (
            <div className="mt-8">
              <p className="text-[17px] text-[var(--bark-2)]">Sign in to register, so your payment is linked to your Zep Research account.</p>
              <button
                type="button"
                onClick={() => {
                  dialog.current?.close();
                  openAuthModal();
                }}
                data-dark=""
                className="sig-btn mt-6 w-full"
              >
                <span>Sign in or create an account</span>
                <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5" aria-busy={busy}>
              <FormAlert>{formError}</FormAlert>
              <Honeypot />
              <h3 className="sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">Billing details</h3>
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
              <button type="submit" disabled={busy} data-dark="" className="sig-btn mt-2 w-full disabled:cursor-wait disabled:opacity-70">
                <span>{busy ? "Opening secure payment…" : `Pay ${item.total} securely`}</span>
                <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
              </button>
              <p className="text-[15px] text-[var(--bark-2)]">
                You will be taken to CCAvenue to pay. The final amount is confirmed on the payment page.
              </p>
            </form>
          )}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
