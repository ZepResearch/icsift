"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "./primitives";
import Reveal from "./Reveal";

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
      return { ...record, state: days === 0 ? "Today" : `Next · in ${days} day${days === 1 ? "" : "s"}`, next: true };
    }
    return { ...record, state: "Upcoming" };
  });
}

export default function DatesSheet() {
  const [dates, setDates] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [failed, setFailed] = useState({ dates: false, materials: false });

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

  return (
    <section id="dates" aria-labelledby="dates-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 id="dates-title" className="herb-h2">
              The dates that matter.
            </h2>
            <p className="herb-muted mt-4 max-w-[34rem]">
              Every deadline for the {CONFERENCE.edition} edition, in order. The next one is marked.
            </p>

            <div className="mt-10 border-t border-[var(--ink)]" aria-live="polite" aria-busy={dates === null}>
              {dates === null
                ? [0, 1, 2, 3].map((i) => (
                    <div key={i} className="grid gap-2 border-b border-[var(--rule)] py-5 sm:grid-cols-[13rem_1fr]">
                      <span className="h-4 w-32 animate-pulse bg-[var(--rule-soft)]" />
                      <span className="h-4 w-3/4 animate-pulse bg-[var(--rule-soft)]" />
                    </div>
                  ))
                : null}
              {dates && dates.length === 0 ? (
                <p className="border-b border-[var(--rule)] py-5 text-[16px]">
                  {failed.dates
                    ? "The dates could not load just now. Refresh the page, or see the full schedule."
                    : `Dates for the ${CONFERENCE.edition} edition will be published here shortly.`}
                </p>
              ) : null}
              {dates?.map((item) => (
                <div
                  key={item.id}
                  className={`grid gap-x-6 gap-y-1 border-b border-[var(--rule)] py-5 sm:grid-cols-[13rem_1fr_auto] ${
                    item.state === "Closed" ? "text-[var(--ink-2)]" : ""
                  }`}
                >
                  <p className="text-[17px] font-medium">{item.date}</p>
                  <div>
                    <p className="text-[17px]">{item.name}</p>
                  </div>
                  {item.state ? (
                    <p
                      className={`herb-italic text-[14.5px] sm:text-right ${item.next ? "text-[var(--green)]" : "text-[var(--ink-2)]"}`}
                    >
                      {item.state}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Forms and templates</h3>
              <ul className="mt-4 border-t border-[var(--ink)]">
                {materials === null ? (
                  <li className="border-b border-[var(--rule)] py-3">
                    <span className="block h-4 w-40 animate-pulse bg-[var(--rule-soft)]" />
                  </li>
                ) : null}
                {materials && materials.length === 0 ? (
                  <li className="herb-muted border-b border-[var(--rule)] py-3 text-[15.5px]">
                    {failed.materials ? "Downloads could not load. Please refresh." : "Downloads will be posted soon."}
                  </li>
                ) : null}
                {materials?.map((item) => (
                  <li key={item.id} className="border-b border-[var(--rule)]">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-3 text-[16px] hover:text-[var(--green)]"
                    >
                      {item.title}
                      <Download aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.6} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3">
              <ActionLink href="/papers-format">Paper format and template</ActionLink>
              <ActionLink href="/submission" primary>
                Submit a paper
              </ActionLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
