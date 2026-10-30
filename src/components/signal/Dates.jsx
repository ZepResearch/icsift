"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Download } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { CONFERENCE } from "@/constants/conference";
import Reveal from "@/components/home/Reveal";
import SigButton from "./SigButton";

const DAY = 86400000;

// Dates arrive as free text from PocketBase ("29th November, 2026"); only those that parse get a state.
const timeOf = (text) => Date.parse(String(text).replace(/(\d+)(st|nd|rd|th)\b/gi, "$1").replace(/,/g, " "));

function withStates(records) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let nextSeen = false;
  const sorted = [...records].sort((a, b) => {
    const ta = timeOf(a.date);
    const tb = timeOf(b.date);
    if (Number.isNaN(ta) || Number.isNaN(tb)) return Number.isNaN(ta) - Number.isNaN(tb);
    return ta - tb;
  });
  return sorted.map((record) => {
    const time = timeOf(record.date);
    if (Number.isNaN(time)) return { ...record, state: null };
    if (time < today.getTime()) return { ...record, state: "Closed" };
    if (!nextSeen) {
      nextSeen = true;
      const days = Math.round((time - today.getTime()) / DAY);
      return { ...record, state: days === 0 ? "Today" : `Next, in ${days} day${days === 1 ? "" : "s"}`, next: true };
    }
    return { ...record, state: "Upcoming" };
  });
}

const TABS = [
  ["dates", "Deadlines"],
  ["downloads", "Forms and templates"],
];

// Signal-yellow field: heading and intro left; right, a tab pair over a vertical timeline of deadlines (or the downloads).
export default function Dates() {
  const [dates, setDates] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [failed, setFailed] = useState({ dates: false, materials: false });
  const [tab, setTab] = useState("dates");

  useEffect(() => {
    pb.collection("ICSIFT_date")
      .getFullList({ sort: "created", requestKey: null })
      .then((records) => setDates(withStates(records.map((r) => ({ id: r.id, name: r.name, description: r.description, date: r.date })))))
      .catch(() => {
        setDates([]);
        setFailed((f) => ({ ...f, dates: true }));
      });
    pb.collection("ICSIFT_download_material")
      .getFullList({ sort: "created", requestKey: null })
      .then((records) =>
        setMaterials(
          records.map((r) => ({
            id: r.id,
            title: r.title,
            href: `https://conference.pockethost.io/api/files/${r.collectionName}/${r.id}/${r.file}`,
          })),
        ),
      )
      .catch(() => {
        setMaterials([]);
        setFailed((f) => ({ ...f, materials: true }));
      });
  }, []);

  const onTabKey = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = tab === "dates" ? "downloads" : "dates";
    setTab(next);
    document.getElementById(`dates-tab-${next}`)?.focus();
  };

  return (
    <section id="dates" aria-labelledby="dates-title" className="sig-on-signal bg-[var(--signal)] text-[var(--forest)]">
      <Reveal className="mx-auto grid max-w-[1400px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20 lg:px-10 lg:py-32">
        <div data-enter className="lg:sticky lg:top-40 lg:self-start">
          <h2 id="dates-title" className="sig-h2">
            What happens, and when
          </h2>
          <p className="mt-6 max-w-[30rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
            Every deadline for the {CONFERENCE.shortForm}, in order, leading to {CONFERENCE.date}. The next one is marked.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <SigButton href="/submission" tone="dark">
              Submit a paper
            </SigButton>
            <SigButton href="/schedule" tone="dark-outline">
              Full schedule
            </SigButton>
          </div>
        </div>

        <div data-enter style={{ "--i": 1 }}>
          <div role="tablist" aria-label="Dates and downloads" className="flex flex-wrap gap-2">
            {TABS.map(([id, label]) => (
              <button
                key={id}
                id={`dates-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={tab === id}
                aria-controls="dates-panel"
                tabIndex={tab === id ? 0 : -1}
                onClick={() => setTab(id)}
                onKeyDown={onTabKey}
                className="sig-chip"
              >
                {id === "dates" ? <CalendarDays aria-hidden="true" className="h-4 w-4" strokeWidth={2} /> : null}
                {id === "downloads" ? <Download aria-hidden="true" className="h-4 w-4" strokeWidth={2} /> : null}
                {label}
              </button>
            ))}
          </div>

          <div id="dates-panel" role="tabpanel" aria-labelledby={`dates-tab-${tab}`} className="mt-10" aria-live="polite">
            {tab === "dates" ? (
              <ol aria-busy={dates === null} className="relative">
                {dates === null
                  ? [0, 1, 2, 3].map((i) => (
                      <li key={i} className="relative pb-10 pl-10">
                        <span className="absolute top-1.5 left-0 h-3.5 w-3.5 bg-[var(--forest)]/30" />
                        <span className="block h-6 w-2/3 animate-pulse bg-[var(--forest)]/15" />
                        <span className="mt-3 block h-4 w-1/3 animate-pulse bg-[var(--forest)]/15" />
                      </li>
                    ))
                  : null}
                {dates && dates.length === 0 ? (
                  <li className="text-[18px]">
                    {failed.dates
                      ? "The dates could not load just now. Refresh the page, or see the full schedule."
                      : `Dates for the ${CONFERENCE.shortForm} will be published here shortly.`}
                  </li>
                ) : null}
                {dates?.map((item, index) => (
                  <li
                    key={item.id}
                    className={`relative pb-10 pl-10 last:pb-0 ${item.state === "Closed" ? "opacity-55" : ""}`}
                  >
                    {index < dates.length - 1 ? (
                      <span aria-hidden="true" className="absolute top-6 bottom-0 left-[6px] w-[2px] bg-[var(--forest)]" />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={`absolute top-2 left-0 h-3.5 w-3.5 bg-[var(--forest)] ${item.next ? "outline-4 outline-offset-2 outline-[var(--forest)]/25" : ""}`}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="sig-display text-[clamp(1.6rem,1.2rem+1vw,2.2rem)] leading-[1.02]">{item.name}</h3>
                      <p className="sig-display flex items-center gap-2 text-[20px]">
                        <CalendarDays aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                        {item.date}
                      </p>
                    </div>
                    {item.description ? <p className="mt-2 max-w-[38rem] text-[17px]">{item.description}</p> : null}
                    {item.state ? (
                      <p className={`mt-2 text-[15px] font-semibold ${item.next ? "inline-block bg-[var(--forest)] px-2 py-0.5 text-[var(--signal)]" : ""}`}>
                        {item.state}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : (
              <ul aria-busy={materials === null} className="grid gap-2">
                {materials === null ? <li className="h-14 animate-pulse bg-[var(--forest)]/15" /> : null}
                {materials && materials.length === 0 ? (
                  <li className="text-[18px]">
                    {failed.materials ? "Downloads could not load. Please refresh." : "Downloads will be posted soon."}
                  </li>
                ) : null}
                {materials?.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 bg-[var(--forest)]/[0.07] px-5 py-4 text-[18px] font-semibold transition-colors duration-200 hover:bg-[var(--forest)] hover:text-[var(--signal)]"
                    >
                      {item.title}
                      <Download aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
