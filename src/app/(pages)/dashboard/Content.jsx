"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Download,
  FileText,
  Home,
  Layers,
  LayoutDashboard,
  LogOut,
  MapPin,
  Receipt,
} from "lucide-react";
import pb from "@/lib/zep-pocketbase";
import { useAuth } from "@/context/AuthContext";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair } from "@/components/signal/page";
import {
  conferenceSpan,
  fetchCertificates,
  fetchJournalSubmissions,
  fetchPapers,
  fetchRegistrations,
  fetchUpcomingConferences,
  fileUrl,
  hasEnded,
  shortDate,
  spanLabel,
  tidy,
} from "@/lib/dashboard";
import { downloadInvoice } from "@/lib/invoice";
import CertificateDialog from "./CertificateDialog";

// The signed-in user's dashboard, laid out as an app: a forest sidebar, a top bar, a greeting with the four counts,
// then the user's ICSIFT registrations (invoice, certificate), ICSIFT papers, journal submissions and the conferences
// coming up as cards on a cream board. The site header and footer are hidden here (components/SiteChrome.jsx).
// Protected on the client: signed-out visitors get the sign-in prompt.

const SECTIONS = [
  ["registrations", "My registrations", CalendarCheck],
  ["papers", "Paper submissions", FileText],
  ["journals", "Journal submissions", BookOpen],
  ["upcoming", "Upcoming conferences", Layers],
];

const LOADING = { status: "loading", items: [] };

function useCollection(load, userId) {
  const [state, setState] = useState(LOADING);
  const reload = useCallback(() => {
    if (!userId) return;
    setState(LOADING);
    load(userId)
      .then((items) => setState({ status: "ok", items }))
      .catch((error) => {
        console.error("[dashboard]", load.name, error?.status, error?.message, error?.response);
        setState({ status: "error", items: [] });
      });
  }, [load, userId]);
  useEffect(reload, [reload]);
  return [state, reload, setState];
}

// Which section is in view, for the sidebar's current item.
function useActiveSection(ids, enabled) {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);
  return active;
}

const SECTION_IDS = ["overview", ...SECTIONS.map(([id]) => id)];

export default function DashboardContent() {
  const { user, openAuthModal, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const signedIn = mounted && Boolean(user) && pb.authStore.isValid;
  const userId = signedIn ? user.id : null;

  const [registrations, reloadRegistrations] = useCollection(fetchRegistrations, userId);
  const [papers, reloadPapers] = useCollection(fetchPapers, userId);
  const [journals, reloadJournals] = useCollection(fetchJournalSubmissions, userId);
  const [certificates, reloadCertificates, setCertificates] = useCollection(fetchCertificates, userId);
  const [upcoming, reloadUpcoming] = useCollection(fetchUpcomingConferences, userId);
  const [certFor, setCertFor] = useState(null);
  const active = useActiveSection(SECTION_IDS, signedIn);

  if (!mounted) return <main className="sig min-h-screen bg-[var(--forest)]" aria-busy="true" />;
  if (!signedIn) return <SignedOut onSignIn={openAuthModal} />;

  const displayName = tidy(user.name || user.username || user.email);
  const firstName = displayName.split(" ")[0] || "there";
  const states = { registrations, papers, journals, upcoming };

  return (
    <main className="sig min-h-screen bg-[var(--forest)] lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <Sidebar active={active} onLogout={logout} />

      <div className="min-w-0">
        <TopBar name={displayName} email={user.email} />

        <div className="grid gap-5 p-4 sm:p-6 lg:gap-6 lg:p-8">
          {/* Greeting and the four counts. */}
          <section id="overview" aria-labelledby="dashboard-title" className="sig-deep scroll-mt-24 grid gap-8 p-6 sm:p-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] xl:items-center lg:p-10">
            <div>
              <p className="sig-tag sig-rise">Dashboard</p>
              <h1 id="dashboard-title" className="sig-display sig-rise mt-3 text-[clamp(2.6rem,1.6rem+3vw,4.6rem)] leading-[0.95]" style={{ "--i": 1 }}>
                Hello, {firstName}
              </h1>
              <p className="sig-rise mt-5 max-w-[34rem] text-[clamp(1.05rem,1rem+0.3vw,1.2rem)] leading-snug text-[var(--muted)]" style={{ "--i": 2 }}>
                Your {CONFERENCE.shortForm} registrations, papers and certificates, signed in as {user.email}.
              </p>
              <ActionPair tone="forest" className="sig-rise mt-8" />
            </div>
            <ul className="sig-rise grid gap-2 sm:grid-cols-2" style={{ "--i": 2 }}>
              {SECTIONS.map(([id, label, Icon]) => {
                const state = states[id];
                const value = state.status === "ok" ? state.items.length : state.status === "loading" ? "…" : "–";
                return (
                  <li key={id}>
                    <a href={`#${id}`} className="group grid h-full grid-cols-[auto_1fr_auto] items-end gap-x-4 bg-[var(--panel)] p-5 transition-colors hover:bg-black/20">
                      <Icon aria-hidden="true" className="mb-2 h-7 w-7 self-center text-[var(--cream)]" strokeWidth={1.5} />
                      <span>
                        <span className="block text-[15px] text-[var(--muted)]">{label}</span>
                        <span className="sig-display mt-1 block text-[clamp(2.2rem,1.8rem+1.2vw,3rem)] leading-none">{value}</span>
                      </span>
                      <ArrowRight aria-hidden="true" className="mb-1 h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* The board: registrations and conferences left, papers and journals right. */}
          {/* .sig-cream sets its own ground, so the darker board colour goes inline. */}
          <div style={{ background: "var(--cream-deep)" }} className="sig-cream grid gap-5 p-3 sm:p-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] xl:items-start">
            <div className="grid gap-5">
              <Card id="registrations" icon={CalendarCheck} title="Your registrations" lead="Download the invoice for any paid registration. Once the conference is over, generate your certificate here." state={registrations} retry={reloadRegistrations} limit={3}
                empty={<>No {CONFERENCE.shortForm} registration on this account yet. <Link href="/registration" className="sig-link font-semibold">Register</Link></>}
                render={(registration) => (
                  <RegistrationCard
                    key={registration.id}
                    registration={registration}
                    certificates={certificates.items.filter((c) => c.registration === registration.id)}
                    certificatesLoading={certificates.status === "loading"}
                    onCertificate={() => setCertFor(registration)}
                  />
                )}
              />
              <Card id="upcoming" icon={Layers} title="Upcoming conferences" lead="More Zep Research conferences you can submit to or attend." state={upcoming} retry={reloadUpcoming} limit={4} grid
                empty="No other conferences are open just now. New ones appear here as they are announced."
                render={(conference) => <ConferenceCard key={conference.id} conference={conference} />}
              />
            </div>
            <div className="grid gap-5">
              <Card id="papers" icon={FileText} title="Paper submissions" lead={`Every paper you have sent to ${CONFERENCE.shortForm} from this account, with the file you uploaded.`} state={papers} retry={reloadPapers} limit={4}
                empty={<>You have not submitted a paper to this conference yet. <Link href="/submission" className="sig-link font-semibold">Submit a paper</Link></>}
                render={(paper) => (
                  <SubmissionRow
                    key={paper.id}
                    title={paper.paper_title}
                    meta={[paper.paper_type, paper.presentation_type && `${paper.presentation_type} presentation`, paper.created && `Sent ${shortDate(paper.created)}`]}
                    status={paper.status}
                    file={paper.file && fileUrl(paper, Array.isArray(paper.file) ? paper.file[0] : paper.file, { download: 1 })}
                  />
                )}
              />
              <Card id="journals" icon={BookOpen} title="Journal submissions" lead="Papers you have sent to partner journals through Zep Research." state={journals} retry={reloadJournals} limit={4}
                empty={<>You have not submitted to a journal yet. <Link href="/journals" className="sig-link font-semibold">Browse journals</Link></>}
                render={(paper) => (
                  <SubmissionRow
                    key={paper.id}
                    kicker={tidy(paper.journal_name)}
                    title={paper.paper_title}
                    meta={[paper.created && `Sent ${shortDate(paper.created)}`]}
                    status={paper.status}
                    file={paper.file && fileUrl(paper, Array.isArray(paper.file) ? paper.file[0] : paper.file, { download: 1 })}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <CertificateDialog
        registration={certFor}
        papers={papers.items}
        certificates={certificates.items}
        onClose={() => setCertFor(null)}
        onIssued={(record) => {
          setCertificates((prev) => ({ ...prev, items: [record, ...prev.items.filter((c) => c.id !== record.id)] }));
          reloadCertificates();
        }}
      />
    </main>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="ICSIFT home">
      <span className="relative h-12 w-12 lg:h-14 lg:w-14">
        <Image src="/singleLogo.svg" alt="" fill sizes="56px" className="object-contain" priority />
      </span>
      <span className="flex flex-col leading-none">
        <span className="sig-display text-[26px] leading-none text-[var(--signal)]">ICSIFT</span>
        <span className="mt-1 text-[12.5px] font-medium text-[var(--cream)]/80">
          {CONFERENCE.shortForm.replace("ICSIFT", "edition").trim()} · {CONFERENCE.venue.location.split(",")[0].trim()} {CONFERENCE.year}
        </span>
      </span>
    </Link>
  );
}

const NAV_ITEM =
  "flex min-h-[48px] shrink-0 items-center gap-3 px-4 text-[16px] font-semibold whitespace-nowrap transition-colors lg:min-h-[50px]";

// Vertical on wide screens (sticky, full height); a logo row and a scrolling row of links on phones.
function Sidebar({ active, onLogout }) {
  const items = [["overview", "Dashboard", LayoutDashboard], ...SECTIONS];
  return (
    <aside className="sig-deep border-b border-[var(--forest-line)] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between gap-4 px-4 pt-4 sm:px-6 lg:px-5 lg:pt-6">
        <Logo />
        <button type="button" onClick={onLogout} className="sig-link text-[15px] font-semibold text-[var(--cream)] lg:hidden">
          Log out
        </button>
      </div>

      <nav aria-label="Dashboard" className="mt-4 lg:mt-10 lg:flex-1">
        <ul className="flex gap-1 overflow-x-auto px-4 pb-3 sm:px-6 lg:flex-col lg:px-4 lg:pb-0">
          {items.map(([id, label, Icon]) => {
            const current = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current ? "location" : undefined}
                  className={`${NAV_ITEM} ${current ? "bg-[var(--forest)] text-[var(--signal)]" : "text-[var(--cream)]/85 hover:bg-[var(--forest)]/60 hover:text-[var(--signal)]"}`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.7} />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden px-4 pb-6 lg:block">
        <p className="border-t border-[var(--forest-line)] px-4 pt-5 text-[14px] font-semibold text-[var(--cream)]/70">Account</p>
        <ul className="mt-2 grid gap-1">
          <li>
            <Link href="/" className={`${NAV_ITEM} text-[var(--cream)]/85 hover:bg-[var(--forest)]/60 hover:text-[var(--signal)]`}>
              <Home aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
              Back to the website
            </Link>
          </li>
          <li>
            <button type="button" onClick={onLogout} className={`${NAV_ITEM} w-full text-left text-[var(--cream)]/85 hover:bg-[var(--forest)]/60 hover:text-[var(--signal)]`}>
              <LogOut aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
              Log out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

function TopBar({ name, email }) {
  const initial = (name || "?").charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-4 border-b border-[var(--forest-line)] bg-[var(--forest)] px-4 sm:px-6 lg:px-8">
      <p className="sig-display text-[24px] leading-none text-[var(--signal)]">Dashboard</p>
      <div className="flex min-w-0 items-center gap-3">
        <span aria-hidden="true" className="sig-display grid h-[42px] w-[42px] shrink-0 place-items-center bg-[var(--signal)] text-[20px] text-[var(--forest)]">
          {initial}
        </span>
        <span className="hidden min-w-0 leading-tight sm:block">
          <span className="block truncate text-[16px] font-semibold text-[var(--cream)]">{name}</span>
          <span className="block truncate text-[14px] text-[var(--cream)]/70">{email}</span>
        </span>
      </div>
    </header>
  );
}

function SignedOut({ onSignIn }) {
  return (
    <main className="sig sig-forest grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-[34rem]">
        <Logo />
        <p className="sig-tag mt-14">Dashboard</p>
        <h1 className="sig-display mt-3 text-[clamp(2.6rem,1.6rem+3vw,4.4rem)] leading-[0.95]">Sign in to see your dashboard</h1>
        <p className="mt-6 text-[clamp(1.05rem,1rem+0.3vw,1.2rem)] leading-snug text-[var(--muted)]">
          Your {CONFERENCE.shortForm} registrations, invoices, paper submissions and certificates are kept with your Zep Research account.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <button type="button" onClick={onSignIn} className="sig-btn" data-fill="">
            <span>Sign in</span>
            <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
          </button>
          <Link href="/" className="sig-link text-[16px] font-semibold">
            Back to the website
          </Link>
        </div>
      </div>
    </main>
  );
}

// A board card: icon and title, a sentence, then the list in its loading, error, empty or filled state. Lists longer
// than `limit` show the first few with a "Show all" toggle.
function Card({ id, icon: Icon, title, lead, state, retry, empty, render, limit, grid = false }) {
  const [open, setOpen] = useState(false);
  const items = open ? state.items : state.items.slice(0, limit);
  const more = state.items.length > limit;
  const layout = grid ? "grid gap-2 sm:grid-cols-2 2xl:grid-cols-3" : "grid gap-2";

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 bg-[var(--cream)] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Icon aria-hidden="true" className="mt-0.5 h-7 w-7 shrink-0 text-[var(--forest)]" strokeWidth={1.6} />
          <div>
            <h2 id={`${id}-title`} className="sig-display text-[clamp(1.6rem,1.4rem+0.6vw,2rem)] leading-none text-[var(--forest)]">
              {title}
            </h2>
            <p className="mt-2 max-w-[32rem] text-[16px] leading-snug text-[var(--muted)]">{lead}</p>
          </div>
        </div>
        {more ? (
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-[var(--forest)] hover:underline">
            {open ? "Show fewer" : `Show all ${state.items.length}`}
            <ArrowRight aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? "-rotate-90" : "rotate-90"}`} strokeWidth={2} />
          </button>
        ) : null}
      </div>

      <div className="mt-5">
        {state.status === "loading" ? (
          <div className={layout} aria-busy="true" aria-label="Loading">
            {[0, 1].map((i) => (
              <div key={i} className="h-28 animate-pulse bg-[var(--panel)]" />
            ))}
          </div>
        ) : state.status === "error" ? (
          <p className="bg-[var(--panel)] px-5 py-5 text-[16px]">
            This could not load just now.{" "}
            <button type="button" onClick={retry} className="sig-link font-semibold">
              Try again
            </button>{" "}
            or refresh the page.
          </p>
        ) : !state.items.length ? (
          <p className="bg-[var(--panel)] px-5 py-5 text-[16px]">{empty}</p>
        ) : (
          <ul className={layout}>{items.map(render)}</ul>
        )}
      </div>
    </section>
  );
}

function Tag({ children, strong = false }) {
  return (
    <span
      className={`inline-flex min-h-[28px] shrink-0 items-center px-2.5 text-[13.5px] font-semibold ${
        strong ? "bg-[var(--line)] text-[var(--on-line)]" : "border-[1.5px] border-[var(--line)]"
      }`}
    >
      {children}
    </span>
  );
}

const STATUS = {
  pending: "Under review",
  approve: "Accepted",
  approved: "Accepted",
  accepted: "Accepted",
  reject: "Not accepted",
  rejected: "Not accepted",
};

function SubmissionRow({ title, kicker, meta, status, file }) {
  const label = STATUS[String(status || "").toLowerCase()] || (status ? tidy(status) : "");
  return (
    <li className="grid gap-3 bg-[var(--panel)] px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0">
        {kicker ? <p className="truncate text-[13.5px] font-semibold tracking-[0.04em] text-[var(--muted)] uppercase">{kicker}</p> : null}
        <h3 className="sig-display mt-0.5 text-[22px] leading-[1.08]">{tidy(title) || "Untitled paper"}</h3>
        <p className="mt-1 text-[15px] text-[var(--muted)]">{meta.filter(Boolean).join("  ·  ")}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:flex-col sm:items-end">
        {label ? <Tag strong={label === "Accepted"}>{label}</Tag> : null}
        {file ? (
          <a href={file} className="sig-link inline-flex items-center gap-1.5 text-[15px] font-semibold" target="_blank" rel="noopener noreferrer">
            <FileText aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            Your uploaded file
          </a>
        ) : null}
      </div>
    </li>
  );
}

// "4 Nov 2026, 10:30 pm IST", in the visitor's own time zone.
const availableAt = (date) =>
  date.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });

function RegistrationCard({ registration, certificates, certificatesLoading, onCertificate }) {
  const conference = registration.expand?.conference;
  const span = conferenceSpan(conference);
  const [, setTick] = useState(0);
  const ended = hasEnded(conference);

  // Unlock the certificate by itself when its time comes, if the page is still open (timers cap at ~24 days).
  useEffect(() => {
    if (!span || ended) return;
    const wait = span.closes.getTime() - Date.now() + 1000;
    if (wait > 2 ** 31 - 1) return;
    const timer = setTimeout(() => setTick((t) => t + 1), Math.max(wait, 0));
    return () => clearTimeout(timer);
  }, [span?.closes.getTime(), ended]); // eslint-disable-line react-hooks/exhaustive-deps

  const issued = certificates.filter((c) => c.status !== "rejected");
  const rejected = certificates.find((c) => c.status === "rejected");
  const [invoiceBusy, setInvoiceBusy] = useState(false);
  const [invoiceError, setInvoiceError] = useState("");

  const onInvoice = async () => {
    setInvoiceBusy(true);
    setInvoiceError("");
    try {
      await downloadInvoice(registration);
    } catch (error) {
      console.error("[dashboard] invoice", error);
      setInvoiceError("The invoice could not be made just now. Please try again.");
    } finally {
      setInvoiceBusy(false);
    }
  };

  return (
    <li className="bg-[var(--panel)]">
      <div className="px-5 pt-5 pb-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="text-[15px] text-[var(--muted)]">Registered {shortDate(registration.created)}</p>
          <Tag strong>{ended ? "Attended" : "Registered"}</Tag>
        </div>
        <h3 className="sig-display mt-2 text-[clamp(1.5rem,1.3rem+0.6vw,1.9rem)] leading-[1.05]">{tidy(registration.ticket_name) || "Conference registration"}</h3>
        <p className="mt-1.5 text-[16.5px] leading-snug">{conference ? tidy(conference.title) : CONFERENCE.name.trim()}</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[15.5px] text-[var(--muted)]">
          <li className="inline-flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            {conference ? spanLabel(conference) : CONFERENCE.date}
          </li>
          <li className="inline-flex items-center gap-2">
            <MapPin aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            {tidy(conference?.Venue) || CONFERENCE.venue.location.trim()}
          </li>
          {registration.order_id ? <li>Order {registration.order_id}</li> : null}
        </ul>
      </div>

      <div className="grid border-t-[1.5px] border-[var(--cream)] sm:grid-cols-2">
        <button
          type="button"
          onClick={onInvoice}
          disabled={invoiceBusy}
          className="flex min-h-[60px] items-center gap-3 px-5 text-left text-[16.5px] font-semibold transition-colors hover:bg-black/5 disabled:cursor-wait disabled:opacity-70 sm:px-6"
        >
          {invoiceBusy ? <Download aria-hidden="true" className="h-5 w-5 animate-pulse" strokeWidth={1.8} /> : <Receipt aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />}
          {invoiceBusy ? "Preparing invoice…" : "Download invoice"}
        </button>

        {ended ? (
          <button
            type="button"
            onClick={onCertificate}
            disabled={certificatesLoading}
            className="flex min-h-[60px] items-center gap-3 bg-[var(--forest)] px-5 text-left text-[16.5px] font-semibold text-[var(--signal)] transition-colors hover:bg-[var(--forest-deep)] disabled:opacity-70 sm:px-6"
          >
            <Award aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            {issued.length ? "Download certificate" : "Generate certificate"}
          </button>
        ) : (
          <p className="flex min-h-[60px] items-center gap-3 border-t-[1.5px] border-[var(--cream)] px-5 text-[15px] leading-snug text-[var(--muted)] sm:border-t-0 sm:border-l-[1.5px] sm:px-6">
            <Award aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.8} />
            {span ? (
              <span>
                Your certificate opens here on{" "}
                <strong className="font-semibold text-[var(--bark)]">
                  <time dateTime={span.closes.toISOString()}>{availableAt(span.closes)}</time>
                </strong>
                , when the conference ends.
              </span>
            ) : (
              "Your certificate opens here after the conference."
            )}
          </p>
        )}
      </div>
      {invoiceError ? (
        <p role="alert" className="px-5 pb-4 text-[15px] font-semibold sm:px-6">
          {invoiceError}
        </p>
      ) : null}
      {rejected && !issued.length ? (
        <p className="px-5 pb-5 text-[15px] sm:px-6">
          <strong className="font-semibold">A certificate request was declined.</strong> {tidy(rejected.rejection_reason) || "Contact info@icsift.com for details."}
        </p>
      ) : null}
    </li>
  );
}

function ConferenceCard({ conference }) {
  const image = conference.img ? fileUrl(conference, conference.img, { thumb: "640x360" }) : "";
  const isThis = conference.id === CONFERENCE.zepConferenceId;
  const links = [
    [conference.websiteUrl, "Website"],
    [conference.website_submittion_url, "Submit"],
    [conference.registration_url, "Register"],
  ].filter(([href]) => href);
  return (
    <li className="sig-forest flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden bg-black/20">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : null}
        {isThis ? <span className="absolute top-2.5 left-2.5 bg-[var(--signal)] px-2 py-0.5 text-[13px] font-semibold text-[var(--forest)]">This conference</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="sig-display text-[24px] leading-none">{tidy(conference.short_form)}</p>
        <h3 className="mt-2 text-[15px] leading-snug font-medium text-[var(--cream)]">{tidy(conference.title)}</h3>
        <ul className="mt-3 grid gap-1 text-[14px] text-[var(--muted)]">
          <li className="inline-flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            {shortDate(conference.date)}
          </li>
          <li className="inline-flex items-start gap-2">
            <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
            {[tidy(conference.Venue), tidy(conference.format)].filter(Boolean).join("  ·  ")}
          </li>
        </ul>
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4">
          {links.map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="sig-link text-[15px] font-semibold">
              {label}
            </a>
          ))}
        </div>
      </div>
    </li>
  );
}
