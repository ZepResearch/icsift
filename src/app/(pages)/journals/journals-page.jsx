"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { CallBand, Field, PageHero } from "@/components/signal/page";
import { INDEX_TABS, coverOf, indexName } from "@/lib/journals";

export default function JournalsPageClient({ journals }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => Object.fromEntries(INDEX_TABS.map(([value]) => [value, value === "all" ? journals.length : journals.filter((j) => j.indexType === value).length])),
    [journals],
  );
  const tabs = INDEX_TABS.filter(([value]) => value === "all" || counts[value] > 0);

  const needle = query.trim().toLowerCase();
  const shown = journals.filter(
    (j) =>
      (active === "all" || j.indexType === active) &&
      (!needle || (j.title || "").toLowerCase().includes(needle) || (j.issncode || "").replace(/\s/g, "").includes(needle.replace(/\s/g, ""))),
  );

  const onTabKey = (event, index) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + tabs.length) % tabs.length;
    setActive(tabs[next][0]);
    document.getElementById(`index-tab-${next}`)?.focus();
  };

  return (
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the search field and the live count set large right. */}
      <PageHero
        id="journals-title"
        tag="Journals"
        title="Find a journal for your paper"
        lead="Indexed journals that accept submissions through Zep Research. Choose one to see its details and submit your paper directly."
        aside={
          <div className="bg-[var(--panel)] p-6 sm:p-8">
            <label htmlFor="journal-search" className="text-[17px] font-semibold">
              Search by title or ISSN
            </label>
            <div className="relative mt-3">
              <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--bark-2)]" strokeWidth={2} />
              <input
                id="journal-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. artificial intelligence, 2789-2557"
                className="herb-input !py-4 !pl-12 text-[17px]"
                autoComplete="off"
              />
            </div>
            <p className="mt-6 flex items-baseline gap-3" aria-live="polite">
              <span className="sig-display text-[clamp(3.2rem,2.2rem+2.8vw,5rem)] leading-none">{shown.length}</span>
              <span className="text-[17px] text-[var(--muted)]">
                of {journals.length} journals showing
              </span>
            </p>
          </div>
        }
      />

      {/* The index: filter chips, then each journal as a panel. */}
      <Field tone="cream" labelledBy="index-title" reveal={false}>
        <h2 id="index-title" className="sig-h2">
          Journals
        </h2>
        <div role="tablist" aria-label="Filter by index" className="mt-8 flex flex-wrap gap-2">
          {tabs.map(([value, label], index) => (
            <button
              key={value}
              id={`index-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={active === value}
              aria-controls="journal-list"
              tabIndex={active === value ? 0 : -1}
              onClick={() => setActive(value)}
              onKeyDown={(event) => onTabKey(event, index)}
              className="sig-chip"
            >
              {label}
              <span className="font-[family-name:var(--font-body)] text-[15px] font-semibold opacity-80">{counts[value]}</span>
            </button>
          ))}
        </div>

        <div id="journal-list" role="tabpanel" className="mt-10">
          {journals.length === 0 ? (
            <p className="py-8 text-[18px] text-[var(--muted)]">The journal list could not load just now. Please refresh the page.</p>
          ) : shown.length === 0 ? (
            <p className="py-8 text-[18px] text-[var(--muted)]">
              No journals match {needle ? `“${query.trim()}”` : "this filter"}.{" "}
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActive("all");
                }}
                className="sig-link font-semibold text-[var(--bark)]"
              >
                Show all journals
              </button>
            </p>
          ) : (
            <ol className="grid gap-2 lg:grid-cols-2">
              {shown.map((journal) => {
                const cover = coverOf(journal);
                const index = indexName(journal.indexType);
                return (
                  <li key={journal.id}>
                    <Link
                      href={`/journals/${journal.id}`}
                      className="group grid h-full grid-cols-[4.5rem_1fr] gap-x-5 bg-[var(--panel)] p-5 transition-colors duration-200 hover:bg-[var(--forest)] hover:text-[var(--signal)] sm:grid-cols-[5.5rem_1fr] sm:p-6"
                    >
                      <div className="relative row-span-2 aspect-[3/4] self-start bg-white">
                        {cover ? <Image src={cover} alt="" fill sizes="88px" className="object-contain" /> : null}
                      </div>
                      <div className="min-w-0">
                        <p className="sig-display text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)] leading-[1.05]">{journal.title || "Untitled journal"}</p>
                        <p className="mt-2 text-[15.5px] text-[var(--muted)] transition-colors group-hover:text-[var(--cream)]">
                          {[journal.issncode ? `ISSN ${journal.issncode.trim()}` : null, index || "Index not listed"].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <span className="sig-display mt-4 inline-flex items-center gap-2 self-end text-[18px] uppercase">
                        Submit a paper
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </Field>

      <CallBand
        id="journals-closing-title"
        title="Presenting at the conference first?"
        text="Papers accepted at the conference are recommended to indexed journals and proceedings."
      />
    </main>
  );
}
