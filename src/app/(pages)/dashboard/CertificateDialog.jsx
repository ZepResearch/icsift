"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Download, X } from "lucide-react";
import pb from "@/lib/zep-pocketbase";
import { useAuth } from "@/context/AuthContext";
import { CONFERENCE } from "@/constants/conference";
import { Field, describedBy } from "@/components/forms/herb-fields";
import { spanParts, tidy } from "@/lib/dashboard";
import { drawCertificate, downloadCertificatePdf, loadCertificateAssets } from "@/lib/certificate";

// Side panel for one registration's certificate: check the name (editable), choose Participant or Presenter and the
// paper, then generate. Generating records the certificate in conf_certificates (or reuses the one already there)
// and prints its number and verification code on the PDF. The preview is the same drawing as the download.

const ROLES = [
  ["participation", "Participant"],
  ["presentation", "Presenter"],
];

export default function CertificateDialog({ registration, papers, certificates, onClose, onIssued }) {
  const { user } = useAuth();
  const dialog = useRef(null);
  const canvas = useRef(null);
  const [assets, setAssets] = useState(null);
  const [assetsError, setAssetsError] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("participation");
  const [paperId, setPaperId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");

  const conference = registration?.expand?.conference;
  const ownPapers = useMemo(
    () => papers.filter((p) => tidy(p.paper_title) && (!registration?.conference || p.conference === registration.conference)),
    [papers, registration],
  );
  const issued = registration ? certificates.find((c) => c.registration === registration.id && c.certificate_type === type) : null;

  // Open, and reset the form for this registration.
  useEffect(() => {
    if (!registration) {
      if (dialog.current?.open) dialog.current.close();
      return;
    }
    const presenter = ownPapers.length > 0;
    setName(tidy(registration.fullname) || tidy(user?.name));
    setType(presenter ? "presentation" : "participation");
    setPaperId(presenter ? ownPapers[0].id : "");
    setError("");
    setNameError("");
    if (!dialog.current?.open) dialog.current?.showModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registration]);

  useEffect(() => {
    if (!registration || assets) return;
    loadCertificateAssets()
      .then(setAssets)
      .catch(() => setAssetsError(true));
  }, [registration, assets]);

  const paper = type === "presentation" ? ownPapers.find((p) => p.id === paperId) : null;
  const data = registration
    ? {
        name: tidy(name) || "Your name",
        role: type === "presentation" ? "Presenter" : "Participant",
        paperTitle: paper ? tidy(paper.paper_title) : "",
        conferenceTitle: tidy(conference?.title) || CONFERENCE.name.trim(),
        shortForm: tidy(conference?.short_form) || "ICSIFT",
        dates: spanParts(conference),
        venue: tidy(conference?.Venue) || CONFERENCE.venue.location.trim(),
        cpdHours: conference?.cpd_accredited && conference?.cpd_hours ? conference.cpd_hours : null,
        certificateNo: issued?.certificate_no || "",
        verificationCode: issued?.verification_code || "",
      }
    : null;

  // Redraw the preview on every change.
  useEffect(() => {
    if (data && assets && canvas.current) drawCertificate(canvas.current, data, assets, 1);
  });

  const generate = async () => {
    if (!tidy(name)) {
      setNameError("Enter the name to print on the certificate.");
      document.getElementById("cert-name")?.focus();
      return;
    }
    if (type === "presentation" && !paper) {
      setError("Choose the paper you presented.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      let record = issued;
      if (!record) {
        try {
          record = await pb.collection("conf_certificates").create({
            user: user.id,
            registration: registration.id,
            certificate_type: type,
            status: "requested",
            generation_method: "template",
            issue_date: new Date().toISOString(),
            // Kept when the collection has these fields, so a verification can show what was printed.
            name_on_certificate: tidy(name),
            paper_title: paper ? tidy(paper.paper_title) : "",
          });
        } catch (createError) {
          // Already issued (unique per registration and type) but missing from the list: fetch it.
          record = await pb
            .collection("conf_certificates")
            .getFirstListItem(pb.filter("registration = {:r} && certificate_type = {:t}", { r: registration.id, t: type }), { requestKey: null })
            .catch(() => {
              throw createError;
            });
        }
        onIssued(record);
      }
      if (record.status === "rejected") {
        setError(tidy(record.rejection_reason) || "This certificate was declined. Contact info@icsift.com for details.");
        return;
      }
      const out = document.createElement("canvas");
      drawCertificate(out, { ...data, name: tidy(name), certificateNo: record.certificate_no, verificationCode: record.verification_code }, assets, 1.5);
      downloadCertificatePdf(out, { ...data, name: tidy(name) });
    } catch (e) {
      console.error("[certificate]", e?.response || e);
      setError("Your certificate could not be generated just now. Please try again, or contact info@icsift.com.");
    } finally {
      setBusy(false);
    }
  };

  const rejected = issued?.status === "rejected";

  return (
    <dialog
      ref={dialog}
      className="sig herb-dialog !max-w-[100vw] !w-screen lg:!w-[min(1180px,100vw)]"
      aria-labelledby="certificate-title"
      onClose={onClose}
      onClick={(event) => event.target === dialog.current && !busy && dialog.current.close()}
    >
      {registration ? (
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="sig-forest px-6 pt-6 pb-7 sm:px-8">
            <div className="flex items-start justify-between gap-6">
              <p className="sig-tag text-[22px]">Certificate</p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                disabled={busy}
                className="grid h-11 w-11 shrink-0 place-items-center bg-[var(--signal)] text-[var(--forest)] hover:bg-[var(--signal-deep)]"
                aria-label="Close certificate"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <h2 id="certificate-title" className="sig-display mt-5 text-[clamp(2rem,1.6rem+1.4vw,2.8rem)]">
              Check, then generate
            </h2>
            <p className="mt-3 max-w-[40rem] text-[17px] text-[var(--muted)]">
              The name prints exactly as you type it here. Check the spelling, titles and accents before you generate.
            </p>
          </div>

          <div className="grid flex-1 gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
            <div className="grid content-start gap-6">
              <Field id="cert-name" label="Name on the certificate" error={nameError} hint="Include any title you want shown, like Dr. or PhD.">
                <input
                  id="cert-name"
                  value={name}
                  maxLength={80}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  autoComplete="name"
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={describedBy("cert-name", nameError, true)}
                  className="herb-input"
                />
              </Field>

              <fieldset>
                <legend className="text-[15px]">Certificate for</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {ROLES.map(([value, label]) => {
                    const off = value === "presentation" && !ownPapers.length;
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={type === value}
                        disabled={off}
                        onClick={() => setType(value)}
                        className="sig-chip justify-center disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {!ownPapers.length ? (
                  <p className="mt-2 text-[14px] text-[var(--bark-2)]">Presenter needs a paper submitted from this account.</p>
                ) : null}
              </fieldset>

              {type === "presentation" && ownPapers.length ? (
                <Field id="cert-paper" label="Paper presented">
                  <div className="relative">
                    <select id="cert-paper" value={paperId} onChange={(e) => setPaperId(e.target.value)} className="herb-input appearance-none pr-10">
                      {ownPapers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {tidy(p.paper_title)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" strokeWidth={1.6} />
                  </div>
                </Field>
              ) : null}

              {error ? (
                <p role="alert" className="bg-[var(--cream-deep)] px-4 py-3 text-[16px]">
                  {error}
                </p>
              ) : null}

              <button
                type="button"
                onClick={generate}
                disabled={busy || !assets || rejected}
                data-dark=""
                className="sig-btn w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{busy ? "Generating…" : issued ? "Download PDF" : "Generate certificate"}</span>
                {issued ? <Download aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} /> : <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />}
              </button>
              {issued && !rejected ? (
                <p className="text-[15px] text-[var(--bark-2)]">
                  Certificate no. {issued.certificate_no}. You can download it again at any time.
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-[15px] text-[var(--bark-2)]">Preview</p>
              <div className="mt-2 bg-[var(--cream-deep)] p-2 sm:p-3">
                {assetsError ? (
                  <p className="px-4 py-10 text-[16px]">The preview could not load. Refresh the page and try again.</p>
                ) : assets ? (
                  <canvas ref={canvas} role="img" aria-label={`Certificate preview for ${data?.name}`} className="block h-auto w-full" />
                ) : (
                  <div className="aspect-[1600/1131] animate-pulse bg-[var(--cream)]" aria-busy="true" />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
