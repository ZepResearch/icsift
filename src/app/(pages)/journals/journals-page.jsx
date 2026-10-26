"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { ActionLink } from "@/components/home/primitives";
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
    <main className="herb min-h-screen">
      {/* Title sheet: title left; a search field with a live count right. */}
      <section aria-labelledby="journals-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:p-12">
          <div>
            <h1 id="journals-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Find a journal for your paper.
            </h1>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
              Indexed journals that accept submissions through Zep Research. Choose one to see its details and submit your
              paper directly.
            </p>
          </div>

          <div>
            <label htmlFor="journal-search" className="text-[13px] font-semibold tracking-[0.08em] uppercase">
              Search by title or ISSN
            </label>
            <div className="relative mt-3">
              <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--ink-2)]" strokeWidth={1.6} />
              <input
                id="journal-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. artificial intelligence, 2789-2557"
                className="herb-input py-4 pl-12 text-[17px]"
                autoComplete="off"
              />
            </div>
            <p className="herb-italic mt-3 text-[15px] text-[var(--ink-2)]" aria-live="polite">
              Showing {shown.length} of {journals.length} journals
            </p>
          </div>
        </div>
      </section>

      {/* The index */}
      <section aria-labelledby="index-title" className="px-3 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <h2 id="index-title" className="sr-only">
            Journals
          </h2>
          <div role="tablist" aria-label="Filter by index" className="flex flex-wrap gap-x-7 gap-y-1 border-b border-[var(--rule)]">
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
                className="herb-tab"
              >
                {label} <span className="herb-italic text-[14px] text-[var(--ink-2)]">{counts[value]}</span>
              </button>
            ))}
          </div>

          <div id="journal-list" role="tabpanel" className="mt-8">
            {journals.length === 0 ? (
              <p className="herb-muted py-8 text-[17px]">The journal list could not load just now. Please refresh the page.</p>
            ) : shown.length === 0 ? (
              <p className="herb-muted py-8 text-[17px]">
                No journals match {needle ? `“${query.trim()}”` : "this filter"}.{" "}
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActive("all");
                  }}
                  className="herb-link"
                >
                  Show all journals
                </button>
              </p>
            ) : (
              <ol className="border-t border-[var(--ink)]">
                {shown.map((journal) => {
                  const cover = coverOf(journal);
                  const index = indexName(journal.indexType);
                  return (
                    <li key={journal.id} className="border-b border-[var(--rule)]">
                      <Link
                        href={`/journals/${journal.id}`}
                        className="group grid grid-cols-[4rem_1fr] items-center gap-x-5 gap-y-2 py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)_11rem_auto] sm:gap-x-8"
                      >
                        <div className="relative aspect-[3/4] border border-[var(--rule)] bg-[var(--rule-soft)]">
                          {cover ? <Image src={cover} alt="" fill sizes="72px" className="object-contain" /> : null}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[18px] leading-snug group-hover:text-[var(--green)]">{journal.title || "Untitled journal"}</p>
                          {journal.issncode ? (
                            <p className="herb-italic mt-1 text-[14.5px] text-[var(--ink-2)]">ISSN {journal.issncode.trim()}</p>
                          ) : null}
                        </div>
                        <p className="col-start-2 text-[15px] sm:col-start-auto">{index || <span className="text-[var(--ink-2)]">Not listed</span>}</p>
                        <span className="col-start-2 inline-flex items-center gap-1.5 text-[15px] sm:col-start-auto">
                          Submit a paper
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section aria-labelledby="journals-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <div className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="journals-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Presenting at the conference first?
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Papers accepted at the conference are recommended to indexed journals and proceedings.
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/submission" primary>
              Submit a paper
            </ActionLink>
            <ActionLink href="/registration">Register to attend</ActionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
