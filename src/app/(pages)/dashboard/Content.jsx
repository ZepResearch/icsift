"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Download,
  FileText,
  Headphones,
  Home,
  Image as ImageIcon,
  Images,
  LogIn,
  LogOut,
  MapPin,
  Megaphone,
  Play,
  Receipt,
  Star,
  User,
  Users,
  Zap,
} from "lucide-react";
import pb from "@/lib/zep-pocketbase";
import { useAuth } from "@/context/AuthContext";
import { CONFERENCE } from "@/constants/conference";
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
  tidy,
} from "@/lib/dashboard";
import { downloadInvoice } from "@/lib/invoice";
import CertificateDialog from "./CertificateDialog";

// The signed-in user's conference portal: a blue sidebar, a top bar with notifications and the account menu, a welcome
// banner, the user's conferences (each with certificate, proceedings, agenda, speakers, highlights and photos), a
// profile summary, the next Zep Research conference, quick access tiles, conference highlights and support.
// Choosing a section in the sidebar shows that section alone; the choice lives in the URL hash, so Back and shared
// links work. The site header and footer are hidden here (components/SiteChrome.jsx).
// Protected on the client: signed-out visitors get the sign-in prompt.

const NAV = [
  ["overview", "Dashboard", Home],
  ["conferences", "My Conferences", CalendarDays],
  ["profile", "My Profile", User],
  ["publications", "Publications", BookOpen],
  ["future", "Future Conferences", Star],
  ["promotional", "Promotional Materials", Megaphone],
];

const VIEWS = new Set(NAV.map(([id]) => id));
const viewFromHash = () => {
  const id = typeof window === "undefined" ? "" : window.location.hash.slice(1);
  return VIEWS.has(id) ? id : "overview";
};

function useView() {
  const [view, setView] = useState("overview");
  useEffect(() => {
    const sync = () => {
      setView(viewFromHash());
      window.scrollTo({ top: 0 });
    };
    setView(viewFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return view;
}

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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "26–27 Feb 2027"
function compactSpan(conference) {
  const span = conferenceSpan(conference);
  if (!span) return "Dates to be announced";
  const { start, end } = span;
  const m = (d) => MONTHS[d.getUTCMonth()];
  if (start.getUTCMonth() === end.getUTCMonth()) {
    if (start.getUTCDate() === end.getUTCDate()) return `${start.getUTCDate()} ${m(end)} ${end.getUTCFullYear()}`;
    return `${start.getUTCDate()}–${end.getUTCDate()} ${m(end)} ${end.getUTCFullYear()}`;
  }
  return `${start.getUTCDate()} ${m(start)} – ${end.getUTCDate()} ${m(end)} ${end.getUTCFullYear()}`;
}

const initialsOf = (name) =>
  (name || "?")
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "?";

const CARD = "rounded-2xl border border-[#e3e9f4] bg-white shadow-[0_2px_10px_rgba(16,42,94,0.06)]";

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
  const view = useView();

  if (!mounted) return <main className="min-h-screen bg-[#f3f6fb]" aria-busy="true" />;
  if (!signedIn) return <SignedOut onSignIn={openAuthModal} />;

  const displayName = tidy(user.name || user.username || user.email);
  const upcomingRegistrations = registrations.items.filter((r) => !hasEnded(r.expand?.conference)).length;
  const publicationsCount = papers.items.length + journals.items.length;
  const fileOf = (record) => record.file && fileUrl(record, Array.isArray(record.file) ? record.file[0] : record.file, { download: 1 });
  const count = (state, value) => (state.status === "ok" ? value : state.status === "loading" ? "…" : "–");
  const stats = {
    total: count(registrations, registrations.items.length),
    upcoming: count(registrations, upcomingRegistrations),
    publications: papers.status === "ok" && journals.status === "ok" ? publicationsCount : papers.status === "loading" || journals.status === "loading" ? "…" : "–",
  };

  const conferenceRow = (registration) => (
    <ConferenceRow
      key={registration.id}
      registration={registration}
      certificates={certificates.items.filter((c) => c.registration === registration.id)}
      certificatesLoading={certificates.status === "loading"}
      onCertificate={() => setCertFor(registration)}
    />
  );

  const myConferences = (focused) => (
    <Panel
      icon={CalendarDays}
      title="My Conferences"
      as={focused ? "h1" : "h2"}
      action={focused ? <BackLink /> : <ViewAll href="#conferences" />}
    >
      <StateList
        state={registrations}
        retry={reloadRegistrations}
        empty={
          <>
            No {CONFERENCE.shortForm} registration on this account yet.{" "}
            <Link href="/registration" className="font-semibold text-[#1a5fe0] hover:underline">
              Register now
            </Link>
          </>
        }
      >
        <ul className="grid gap-3">{(focused ? registrations.items : registrations.items.slice(0, 3)).map(conferenceRow)}</ul>
      </StateList>
    </Panel>
  );

  const publications = (
    <div className="grid gap-5">
      <Panel icon={FileText} title="Paper Submissions" as="h1" action={<BackLink />}>
        <StateList
          state={papers}
          retry={reloadPapers}
          empty={
            <>
              You have not submitted a paper to this conference yet.{" "}
              <Link href="/submission" className="font-semibold text-[#1a5fe0] hover:underline">
                Submit a paper
              </Link>
            </>
          }
        >
          <ul className="grid gap-3 xl:grid-cols-2">
            {papers.items.map((paper) => (
              <SubmissionRow
                key={paper.id}
                title={paper.paper_title}
                meta={[paper.paper_type, paper.presentation_type && `${paper.presentation_type} presentation`, paper.created && `Sent ${shortDate(paper.created)}`]}
                status={paper.status}
                file={fileOf(paper)}
              />
            ))}
          </ul>
        </StateList>
      </Panel>
      <Panel icon={BookOpen} title="Journal Submissions">
        <StateList
          state={journals}
          retry={reloadJournals}
          empty={
            <>
              You have not submitted to a journal yet.{" "}
              <Link href="/journals" className="font-semibold text-[#1a5fe0] hover:underline">
                Browse journals
              </Link>
            </>
          }
        >
          <ul className="grid gap-3 xl:grid-cols-2">
            {journals.items.map((paper) => (
              <SubmissionRow
                key={paper.id}
                kicker={tidy(paper.journal_name)}
                title={paper.paper_title}
                meta={[paper.created && `Sent ${shortDate(paper.created)}`]}
                status={paper.status}
                file={fileOf(paper)}
              />
            ))}
          </ul>
        </StateList>
      </Panel>
    </div>
  );

  const futureConferences = (
    <Panel icon={Star} title="Future Conferences" as="h1" action={<BackLink />}>
      <StateList state={upcoming} retry={reloadUpcoming} empty="No other conferences are open just now. New ones appear here as they are announced.">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {upcoming.items.map((conference) => (
            <FutureCard key={conference.id} conference={conference} />
          ))}
        </ul>
      </StateList>
    </Panel>
  );

  const views = {
    conferences: myConferences(true),
    profile: (
      <div className="grid gap-5 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:items-start">
        <ProfileCard name={displayName} email={user.email} stats={stats} focused />
        <Panel icon={User} title="Account details">
          <dl className="grid gap-3 text-[15px] sm:grid-cols-2">
            {[
              ["Full name", displayName],
              ["Email", user.email],
              ["Member since", shortDate(user.created) || "—"],
              ["Account", "Zep Research"],
            ].map(([term, value]) => (
              <div key={term} className="rounded-xl border border-[#e8edf6] bg-[#f8faff] px-4 py-3">
                <dt className="text-[13px] font-medium text-[#6b7a99]">{term}</dt>
                <dd className="mt-0.5 truncate font-semibold text-[#14213d]">{value}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
    ),
    publications,
    future: futureConferences,
    promotional: (
      <Panel icon={Megaphone} title="Promotional Materials" as="h1" action={<BackLink />}>
        <QuickTiles large />
      </Panel>
    ),
  };

  return (
    <main className="min-h-screen bg-[#f3f6fb] font-[family-name:var(--font-geist-sans)] text-[#14213d] lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <Sidebar active={view} onLogout={logout} />

      <div className="min-w-0">
        <TopBar name={displayName} notifications={upcomingRegistrations} onLogout={logout} />

        <div className="grid gap-5 px-4 pb-8 sm:px-6 lg:px-6">
          {view === "overview" ? (
            <>
              <Welcome />

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px] xl:items-start">
                <div className="grid gap-5">
                  {myConferences(false)}
                  <Panel icon={Star} iconClass="text-[#5b3fd6] fill-[#5b3fd6]" title="Future Conferences" action={<ViewAll href="#future" />}>
                    <StateList state={upcoming} retry={reloadUpcoming} empty="No other conferences are open just now. New ones appear here as they are announced.">
                      <ul className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                        {upcoming.items.slice(0, 3).map((conference) => (
                          <FutureCard key={conference.id} conference={conference} />
                        ))}
                      </ul>
                    </StateList>
                  </Panel>
                </div>
                <div className="grid gap-5">
                  <ProfileCard name={displayName} email={user.email} stats={stats} />
                  <FutureSpotlight state={upcoming} retry={reloadUpcoming} />
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[320px_minmax(0,1fr)_330px]">
                <Panel icon={Zap} iconClass="text-[#f5a524] fill-[#f5a524]" title="Quick Access" compact>
                  <QuickTiles />
                </Panel>
                <Highlights />
                <NeedHelp />
              </div>
            </>
          ) : (
            views[view]
          )}
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

/* ---------------------------------------------------------------------------------------------------------------- */
/* Chrome                                                                                                           */
/* ---------------------------------------------------------------------------------------------------------------- */

function Logo({ dark = false }) {
  return (
    <Link href="/" aria-label="Zep Research home" className="block leading-none">
      <span className={`block text-[30px] font-bold tracking-[-0.02em] ${dark ? "text-[#0d2a6b]" : "text-white"}`}>
        Zep<span className={dark ? "text-[#1a5fe0]" : "text-[#cfe0ff]"}>Research</span>
      </span>
      <span className={`mt-1.5 block text-[11px] font-medium tracking-[0.01em] ${dark ? "text-[#4a5a7a]" : "text-white/85"}`}>
        Conferences • Publications • Beyond
      </span>
    </Link>
  );
}

// Dotted globe in the bottom of the sidebar.
function GlobeArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 300" className="pointer-events-none absolute -bottom-10 -left-16 h-[340px] w-[340px] opacity-70">
      <defs>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2f7bff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2f7bff" stopOpacity="0" />
        </radialGradient>
        <pattern id="globe-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="#6ea8ff" fillOpacity="0.55" />
        </pattern>
        <clipPath id="globe-clip">
          <circle cx="150" cy="150" r="120" />
        </clipPath>
      </defs>
      <circle cx="150" cy="150" r="150" fill="url(#globe-glow)" />
      <circle cx="150" cy="150" r="120" fill="#0a2a6e" fillOpacity="0.6" />
      <rect width="300" height="300" fill="url(#globe-dots)" clipPath="url(#globe-clip)" />
      <g fill="none" stroke="#7fb2ff" strokeOpacity="0.35" strokeWidth="0.8" clipPath="url(#globe-clip)">
        <ellipse cx="150" cy="150" rx="120" ry="40" />
        <ellipse cx="150" cy="150" rx="120" ry="80" />
        <ellipse cx="150" cy="150" rx="40" ry="120" />
        <ellipse cx="150" cy="150" rx="80" ry="120" />
        <line x1="30" y1="150" x2="270" y2="150" />
        <line x1="150" y1="30" x2="150" y2="270" />
      </g>
      <g stroke="#9cc4ff" strokeOpacity="0.5" strokeWidth="0.7" fill="#cfe2ff">
        <path d="M60 120 L120 90 L180 110 L240 80 M90 200 L150 170 L210 190" fill="none" />
        <circle cx="60" cy="120" r="2" />
        <circle cx="120" cy="90" r="2" />
        <circle cx="180" cy="110" r="2" />
        <circle cx="240" cy="80" r="2" />
        <circle cx="150" cy="170" r="2" />
        <circle cx="210" cy="190" r="2" />
      </g>
    </svg>
  );
}

const NAV_ITEM = "flex min-h-[48px] shrink-0 items-center gap-3.5 rounded-lg px-5 text-[15px] font-medium whitespace-nowrap transition-colors lg:rounded-none lg:rounded-r-xl";

function Sidebar({ active, onLogout }) {
  return (
    <aside className="relative overflow-hidden bg-gradient-to-b from-[#0d2f7a] via-[#0b2766] to-[#071a49] text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
      <div className="hidden lg:block">
        <GlobeArt />
      </div>

      <div className="relative flex items-center justify-between gap-4 px-5 pt-5 lg:px-7 lg:pt-8">
        <Logo />
        <button type="button" onClick={onLogout} className="text-[14px] font-semibold text-white/90 hover:text-white lg:hidden">
          Logout
        </button>
      </div>

      <nav aria-label="Dashboard" className="relative mt-4 lg:mt-12 lg:flex-1">
        <ul className="flex gap-1 overflow-x-auto px-4 pb-3 lg:flex-col lg:gap-2 lg:px-0 lg:pr-0 lg:pb-0">
          {NAV.map(([id, label, Icon]) => {
            const current = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current ? "page" : undefined}
                  className={`${NAV_ITEM} ${current ? "bg-[#1f6bea] text-white shadow-[0_6px_18px_rgba(31,107,234,0.45)] lg:py-1" : "text-white/90 hover:bg-white/10"}`}
                >
                  <Icon aria-hidden="true" className="h-[22px] w-[22px] shrink-0" strokeWidth={current ? 2.2 : 1.9} fill={current ? "currentColor" : "none"} />
                  {label}
                </a>
              </li>
            );
          })}
          <li>
            <Link href="/contact" className={`${NAV_ITEM} text-white/90 hover:bg-white/10`}>
              <Headphones aria-hidden="true" className="h-[22px] w-[22px] shrink-0" strokeWidth={1.9} />
              Support
            </Link>
          </li>
          <li className="mx-5 my-2 hidden border-t border-white/20 lg:block" aria-hidden="true" />
          <li className="hidden lg:block">
            <button type="button" onClick={onLogout} className={`${NAV_ITEM} w-full text-left text-white/90 hover:bg-white/10`}>
              <LogIn aria-hidden="true" className="h-[22px] w-[22px] shrink-0" strokeWidth={1.9} />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function TopBar({ name, notifications, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <header className="flex h-[76px] items-center justify-end gap-6 px-4 sm:px-6">
      <a href="#conferences" className="relative grid h-10 w-10 place-items-center text-[#1d3b7a] hover:text-[#1a5fe0]" aria-label={`Notifications${notifications ? `: ${notifications} upcoming` : ""}`}>
        <Bell aria-hidden="true" className="h-[26px] w-[26px]" strokeWidth={1.9} />
        {notifications ? (
          <span className="absolute top-0.5 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ef3b3b] px-1 text-[11px] font-bold text-white ring-2 ring-[#f3f6fb]">
            {notifications}
          </span>
        ) : null}
      </a>
      <div ref={ref} className="relative">
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex items-center gap-3">
          <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1f63d8] text-[15px] font-semibold text-white">
            {initialsOf(name)}
          </span>
          <span className="hidden max-w-[14rem] truncate text-[16px] font-semibold text-[#14213d] sm:block">{name}</span>
          <ChevronDown aria-hidden="true" className="h-4 w-4 text-[#14213d]" strokeWidth={2.4} />
        </button>
        {open ? (
          <div className="absolute right-0 z-40 mt-2 w-52 overflow-hidden rounded-xl border border-[#e3e9f4] bg-white py-1.5 shadow-lg">
            <a href="#profile" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] hover:bg-[#f3f6fb]">
              <User aria-hidden="true" className="h-4 w-4" /> My Profile
            </a>
            <Link href="/" className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] hover:bg-[#f3f6fb]">
              <Home aria-hidden="true" className="h-4 w-4" /> Back to website
            </Link>
            <button type="button" onClick={onLogout} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[14px] text-[#d92d20] hover:bg-[#fff1f0]">
              <LogOut aria-hidden="true" className="h-4 w-4" /> Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function SignedOut({ onSignIn }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f6fb] px-4 py-16 font-[family-name:var(--font-geist-sans)] text-[#14213d]">
      <div className={`${CARD} w-full max-w-[32rem] p-8 sm:p-10`}>
        <Logo dark />
        <h1 className="mt-10 text-[30px] leading-tight font-bold">Sign in to your Conference Portal</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-[#4a5a7a]">
          Your {CONFERENCE.shortForm} registrations, invoices, paper submissions and certificates are kept with your Zep Research account.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <button type="button" onClick={onSignIn} className="inline-flex items-center gap-2 rounded-lg bg-[#1a5fe0] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#164fc0]">
            Sign in
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
          </button>
          <Link href="/" className="text-[15px] font-semibold text-[#1a5fe0] hover:underline">
            Back to the website
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* Building blocks                                                                                                  */
/* ---------------------------------------------------------------------------------------------------------------- */

function Panel({ icon: Icon, iconClass = "text-[#1a5fe0]", title, as: Heading = "h2", action, compact = false, children }) {
  return (
    <section className={`${CARD} ${compact ? "p-4" : "p-4 sm:p-5"}`}>
      <div className="mb-4 flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-3">
          <Icon aria-hidden="true" className={`h-[26px] w-[26px] shrink-0 ${iconClass}`} strokeWidth={2} />
          <Heading className="text-[20px] font-bold text-[#14213d] sm:text-[22px]">{title}</Heading>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function ViewAll({ href, small = false }) {
  return (
    <a href={href} className={`inline-flex shrink-0 items-center gap-1.5 font-semibold text-[#1a5fe0] hover:underline ${small ? "text-[13px]" : "text-[15px]"}`}>
      View All
      <ArrowRight aria-hidden="true" className={small ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2.4} />
    </a>
  );
}

function BackLink() {
  return (
    <a href="#overview" className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-[#1a5fe0] hover:underline">
      <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
      Dashboard
    </a>
  );
}

function StateList({ state, retry, empty, children }) {
  if (state.status === "loading")
    return (
      <div className="grid gap-3" aria-busy="true" aria-label="Loading">
        {[0, 1].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-[#eef2f9]" />
        ))}
      </div>
    );
  if (state.status === "error")
    return (
      <p className="rounded-xl bg-[#f6f8fc] px-5 py-5 text-[15px]">
        This could not load just now.{" "}
        <button type="button" onClick={retry} className="font-semibold text-[#1a5fe0] hover:underline">
          Try again
        </button>{" "}
        or refresh the page.
      </p>
    );
  if (!state.items.length) return <p className="rounded-xl bg-[#f6f8fc] px-5 py-5 text-[15px] text-[#4a5a7a]">{empty}</p>;
  return children;
}

function Welcome() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#0a1f5c] text-white shadow-[0_8px_24px_rgba(10,31,92,0.25)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_40%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#081a52] via-[#0b2a7a]/90 to-[#0b2a7a]/25" />
      <div className="relative flex min-h-[190px] flex-col justify-center gap-4 px-6 py-8 sm:px-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="max-w-[34rem] text-[clamp(1.75rem,1.2rem+1.6vw,2.4rem)] leading-[1.12] font-bold">Welcome to ZepResearch Conference Portal!</h1>
          <p className="mt-3 max-w-[30rem] text-[16px] leading-snug text-white/90 sm:text-[17px]">
            Your one-stop access to all your conference information, resources and more.
          </p>
        </div>
        <p className="shrink-0 text-[18px] font-medium italic">
          Learn • Share • Grow
          <svg aria-hidden="true" viewBox="0 0 160 10" className="mt-1 block h-2.5 w-40">
            <path d="M2 8 C 50 1, 110 1, 158 4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </p>
      </div>
    </section>
  );
}

const TILE_ACTIONS = [
  ["Proceedings", "/proceedings", FileText, "text-[#7b4ce0]"],
  ["Agenda", "/schedule", CalendarDays, "text-[#27a35a]"],
  ["Speakers", "/speakers/keynote-speaker", Users, "text-[#f08c1a]"],
  ["Highlights", "/gallery", ImageIcon, "text-[#5b5ff0]"],
  ["Photos", "/gallery", Images, "text-[#14a39a]"],
];

const TILE = "flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-lg border border-[#e6ebf4] bg-white px-2 py-2 text-[13.5px] font-medium text-[#24324f] shadow-[0_1px_3px_rgba(16,42,94,0.06)] transition hover:-translate-y-0.5 hover:border-[#c9d7f2] hover:shadow-md";

const availableAt = (date) =>
  date.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });

function ConferenceRow({ registration, certificates, certificatesLoading, onCertificate }) {
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

  const image = conference?.img ? fileUrl(conference, conference.img, { thumb: "640x360" }) : "/venue.webp";
  const year = span ? span.start.getUTCFullYear() : CONFERENCE.year;
  const shortName = tidy(conference?.short_form) || CONFERENCE.shortForm;
  const name = /\d{4}$/.test(shortName) ? shortName : `${shortName} ${year}`;
  const venue = tidy(conference?.Venue) || CONFERENCE.venue.location.trim();
  const certificateNote = span ? `Your certificate opens on ${availableAt(span.closes)}, when the conference ends.` : "Your certificate opens after the conference.";

  return (
    <li className="rounded-xl border border-[#eef1f7] bg-[#fbfcfe] p-2 shadow-[0_1px_4px_rgba(16,42,94,0.05)]">
      <div className="grid gap-4 sm:grid-cols-[210px_minmax(0,1fr)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" className="aspect-[16/9] h-full max-h-[124px] w-full rounded-lg object-cover sm:aspect-auto" />

        <div className="min-w-0 pr-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <h3 className="text-[20px] font-bold text-[#14213d]">{name}</h3>
              <span className="rounded-md bg-[#e3f6e9] px-2.5 py-0.5 text-[13px] font-semibold text-[#1e8a4c]">{ended ? "Attended" : "Registered"}</span>
            </div>
            <button
              type="button"
              onClick={onInvoice}
              disabled={invoiceBusy}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a5fe0] hover:underline disabled:cursor-wait disabled:opacity-60"
            >
              <Receipt aria-hidden="true" className={`h-4 w-4 ${invoiceBusy ? "animate-pulse" : ""}`} strokeWidth={2} />
              {invoiceBusy ? "Preparing…" : "Invoice"}
            </button>
          </div>
          <p className="mt-0.5 truncate text-[14.5px] text-[#4a5a7a]">
            {venue}, {compactSpan(conference)}
          </p>

          <div className="mt-2.5 grid grid-cols-3 gap-2 md:grid-cols-6">
            <button
              type="button"
              onClick={onCertificate}
              disabled={!ended || certificatesLoading}
              title={ended ? (issued.length ? "Download certificate" : "Generate certificate") : certificateNote}
              className={`${TILE} disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:shadow-none`}
            >
              <Download aria-hidden="true" className="h-5 w-5 text-[#1a5fe0]" strokeWidth={2.4} />
              Certificate
            </button>
            {TILE_ACTIONS.map(([label, href, Icon, color]) => (
              <Link key={label} href={href} className={TILE}>
                <Icon aria-hidden="true" className={`h-5 w-5 ${color}`} strokeWidth={2.2} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {!ended ? <p className="px-2 pt-2 text-[12.5px] text-[#6b7a99]">{certificateNote}</p> : null}
      {invoiceError ? (
        <p role="alert" className="px-2 pt-2 text-[13.5px] font-semibold text-[#d92d20]">
          {invoiceError}
        </p>
      ) : null}
      {rejected && !issued.length ? (
        <p className="px-2 pt-2 text-[13.5px] text-[#4a5a7a]">
          <strong className="font-semibold text-[#14213d]">A certificate request was declined.</strong> {tidy(rejected.rejection_reason) || "Contact info@icsift.com for details."}
        </p>
      ) : null}
    </li>
  );
}

function ProfileCard({ name, email, stats, focused = false }) {
  const rows = [
    ["Total Conferences", stats.total, CalendarDays, "#conferences"],
    ["Upcoming", stats.upcoming, Star, "#conferences"],
    ["Publications", stats.publications, BookOpen, "#publications"],
  ];
  return (
    <section className={`${CARD} p-4 sm:p-5`} aria-label="Your profile">
      <div className="flex items-center gap-4 border-b border-[#edf1f7] pb-4">
        <span aria-hidden="true" className="grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full bg-[#1f63d8] text-[30px] font-semibold text-white">
          {initialsOf(name)}
        </span>
        <div className="min-w-0">
          {focused ? <h1 className="truncate text-[21px] font-bold">{name}</h1> : <p className="truncate text-[21px] font-bold">{name}</p>}
          <p className="truncate text-[15px] text-[#4a5a7a]">{email}</p>
          {focused ? null : (
            <a href="#profile" className="mt-1.5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1a5fe0] hover:underline">
              View Profile <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
            </a>
          )}
        </div>
      </div>
      <ul className="mt-3 grid gap-1">
        {rows.map(([label, value, Icon, href]) => (
          <li key={label}>
            <a href={href} className="flex items-center gap-3 rounded-lg px-1 py-1.5 text-[15.5px] hover:bg-[#f5f8fd]">
              <Icon aria-hidden="true" className="h-5 w-5 text-[#1a5fe0]" strokeWidth={2.2} fill={Icon === Star || Icon === BookOpen ? "currentColor" : "none"} />
              <span className="flex-1">{label}</span>
              <span className="font-semibold">{value}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const conferenceImage = (conference) => (conference.img ? fileUrl(conference, conference.img, { thumb: "640x360" }) : "/venue.webp");
const registerHref = (conference) => conference.registration_url || conference.websiteUrl || "";

function FutureSpotlight({ state, retry }) {
  const next = state.items.find((c) => c.id !== CONFERENCE.zepConferenceId) || state.items[0];
  return (
    <section className="rounded-2xl border border-[#dfe3fb] bg-gradient-to-b from-[#eceefd] to-[#f6f7ff] p-4 shadow-[0_2px_10px_rgba(16,42,94,0.06)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Star aria-hidden="true" className="h-5 w-5 fill-[#5b3fd6] text-[#5b3fd6]" />
          <h2 className="text-[17px] font-bold">Future Conferences</h2>
        </div>
        <ViewAll href="#future" small />
      </div>
      {state.status === "loading" ? (
        <div className="h-36 animate-pulse rounded-xl bg-white/60" aria-busy="true" />
      ) : state.status === "error" ? (
        <p className="text-[14px]">
          Could not load.{" "}
          <button type="button" onClick={retry} className="font-semibold text-[#1a5fe0] hover:underline">
            Try again
          </button>
        </p>
      ) : !next ? (
        <p className="text-[14px] text-[#4a5a7a]">New conferences appear here as they are announced.</p>
      ) : (
        <>
          <div className="flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={conferenceImage(next)} alt="" loading="lazy" className="h-[88px] w-[100px] shrink-0 rounded-lg object-cover" />
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-[17px] leading-tight font-bold">{tidy(next.short_form) || tidy(next.title)}</h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#3c4a66]">
                <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                {compactSpan(next)}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-[#3c4a66]">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                <span className="truncate">{tidy(next.Venue) || tidy(next.format) || "To be announced"}</span>
              </p>
            </div>
          </div>
          {registerHref(next) ? (
            <a
              href={registerHref(next)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 block rounded-md bg-[#5b2fd6] py-2 text-center text-[14px] font-semibold text-white transition-colors hover:bg-[#4a22bd]"
            >
              Register Now
            </a>
          ) : null}
        </>
      )}
    </section>
  );
}

function FutureCard({ conference }) {
  const href = registerHref(conference);
  return (
    <li className="flex flex-col overflow-hidden rounded-xl border border-[#e6ebf4] bg-white shadow-[0_1px_4px_rgba(16,42,94,0.05)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={conferenceImage(conference)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[18px] leading-tight font-bold">{tidy(conference.short_form)}</h3>
        <p className="mt-1 line-clamp-2 text-[14px] text-[#4a5a7a]">{tidy(conference.title)}</p>
        <p className="mt-2 flex items-center gap-1.5 text-[13.5px] text-[#3c4a66]">
          <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} />
          {compactSpan(conference)}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[13.5px] text-[#3c4a66]">
          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} />
          {[tidy(conference.Venue), tidy(conference.format)].filter(Boolean).join(" · ") || "To be announced"}
        </p>
        <div className="mt-auto flex gap-2 pt-4">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-md bg-[#5b2fd6] py-2 text-center text-[14px] font-semibold text-white hover:bg-[#4a22bd]">
              Register Now
            </a>
          ) : null}
          {conference.websiteUrl ? (
            <a href={conference.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-md border border-[#d7def0] py-2 text-center text-[14px] font-semibold text-[#1a5fe0] hover:bg-[#f3f6fb]">
              Website
            </a>
          ) : null}
        </div>
      </div>
    </li>
  );
}

const QUICK = [
  ["Publications", "#publications", BookOpen, "bg-[#eef0fd] border-[#dfe3fa]", "text-[#5b3fd6] fill-[#5b3fd6]/25", false],
  ["Promotional Videos", "/gallery", Play, "bg-[#e9f7ef] border-[#d3eedd]", "text-[#1f9d55] fill-[#1f9d55]", false],
  ["Download Brochure", "/templates/poster.jpg", FileText, "bg-[#fdf1e4] border-[#f7e0c5]", "text-[#f08c1a] fill-[#f08c1a]/25", true],
  ["Support", "/contact", Headphones, "bg-[#e8f1fe] border-[#d4e4fb]", "text-[#1a5fe0]", false],
];

function QuickTiles({ large = false }) {
  return (
    <ul className={`grid grid-cols-2 gap-2.5 ${large ? "sm:grid-cols-4" : ""}`}>
      {QUICK.map(([label, href, Icon, tone, iconTone, download]) => {
        const className = `flex h-full flex-col items-center justify-center gap-1.5 rounded-lg border px-2 text-center text-[14px] leading-tight font-semibold text-[#2b2f6b] transition hover:-translate-y-0.5 hover:shadow-md ${tone} ${large ? "min-h-[140px] text-[16px]" : "min-h-[74px]"}`;
        const icon = <Icon aria-hidden="true" className={`${large ? "h-9 w-9" : "h-6 w-6"} ${iconTone}`} strokeWidth={2.2} />;
        return (
          <li key={label}>
            {download ? (
              <a href={href} download className={className}>
                {icon}
                {label}
              </a>
            ) : (
              <Link href={href} className={className}>
                {icon}
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const SLIDES = [
  ["/gallery/3rd-icsift (2).jpg", "3rd ICSIFT: A Grand Success!", "Relive the best moments from our international conference."],
  ["/gallery/2nd-ICSIFT_01.jpg", "2nd ICSIFT in Bangkok", "Keynotes, panels and paper sessions from the 2nd edition."],
  ["/gallery/3rd-icsift (5).jpg", "Voices of the Community", "Researchers and practitioners sharing ideas across borders."],
  ["/gallery/2nd-ICSIFT_04.jpg", "Awards & Recognition", "Celebrating outstanding papers and presentations."],
];

function Highlights() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, [index]);
  const [image, title, text] = SLIDES[index];

  return (
    <section className={`${CARD} p-4`}>
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <Star aria-hidden="true" className="h-[22px] w-[22px] fill-[#f5a524] text-[#f5a524]" />
          <h2 className="text-[18px] font-bold">Conference Highlights</h2>
        </div>
        <ViewAll href="/gallery" small />
      </div>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={image} src={image} alt="" className="aspect-[16/9] w-full rounded-lg object-cover" />
        <div aria-live="polite">
          <h3 className="text-[19px] leading-tight font-bold">{title}</h3>
          <p className="mt-2 text-[14.5px] leading-snug text-[#4a5a7a]">{text}</p>
          <Link href="/gallery" className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1a5fe0] hover:underline">
            Watch Highlights <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2.5 sm:w-[53%]">
        {SLIDES.map(([src], i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show highlight ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-2 w-2 rounded-full transition-colors ${i === index ? "bg-[#1a5fe0]" : "bg-[#c9d2e3] hover:bg-[#a9b6cf]"}`}
          />
        ))}
      </div>
    </section>
  );
}

function NeedHelp() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#dbe6f8] bg-gradient-to-br from-white via-[#f3f8ff] to-[#e3eeff] p-4 shadow-[0_2px_10px_rgba(16,42,94,0.06)]">
      <svg aria-hidden="true" viewBox="0 0 300 120" className="pointer-events-none absolute right-0 bottom-0 w-full opacity-60">
        <path d="M0 90 C 80 40, 160 120, 300 50 L300 120 L0 120 Z" fill="#d7e6ff" />
        <path d="M0 110 C 100 70, 200 120, 300 85 L300 120 L0 120 Z" fill="#c4d9ff" />
      </svg>
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <Headphones aria-hidden="true" className="h-6 w-6 text-[#1a5fe0]" strokeWidth={2.2} />
          <h2 className="text-[18px] font-bold">Need Help?</h2>
        </div>
        <p className="mt-3 text-[15px] leading-snug text-[#3c4a66]">Our support team is here to help you with any queries.</p>
        <Link
          href="/contact"
          className="mt-5 mb-6 flex items-center justify-center gap-2 rounded-md bg-[#0b5fe8] py-2.5 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(11,95,232,0.35)] transition-colors hover:bg-[#094fc2]"
        >
          Contact Support <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
        </Link>
      </div>
    </section>
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
  const tone = label === "Accepted" ? "bg-[#e3f6e9] text-[#1e8a4c]" : label === "Not accepted" ? "bg-[#fdecec] text-[#c2362b]" : "bg-[#fff4e0] text-[#b86e00]";
  return (
    <li className="grid gap-3 rounded-xl border border-[#eef1f7] bg-[#fbfcfe] px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0">
        {kicker ? <p className="truncate text-[12px] font-semibold tracking-[0.05em] text-[#6b7a99] uppercase">{kicker}</p> : null}
        <h3 className="mt-0.5 text-[17px] leading-snug font-bold">{tidy(title) || "Untitled paper"}</h3>
        <p className="mt-1 text-[14px] text-[#4a5a7a]">{meta.filter(Boolean).join("  ·  ")}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:flex-col sm:items-end">
        {label ? <span className={`rounded-md px-2.5 py-0.5 text-[13px] font-semibold ${tone}`}>{label}</span> : null}
        {file ? (
          <a href={file} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1a5fe0] hover:underline" target="_blank" rel="noopener noreferrer">
            <Download aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            Your file
          </a>
        ) : null}
      </div>
    </li>
  );
}
