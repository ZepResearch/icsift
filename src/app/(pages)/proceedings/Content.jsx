"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

const fileUrl = (record, filename) =>
  filename ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${filename}` : null;

const organisersOf = (record) =>
  record.organized_by ? record.organized_by.split(",").map((o) => o.trim()).filter(Boolean) : [];

function factsOf(record) {
  return [
    ["Date", record.date],
    ["Locality", record.location],
    ["ISBN", record.isbn],
    ["Organised by", organisersOf(record).join(", ")],
  ].filter(([, value]) => value);
}

function Cover({ record, sizes, priority = false }) {
  const cover = fileUrl(record, record.cover_img);
  return (
    <div className="herb-photo relative aspect-[3/4] w-full border border-[var(--rule)] bg-[var(--rule-soft)]">
      {cover ? (
        <Image src={cover} alt={`Cover of the ${record.conference_name} proceedings`} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <span className="herb-italic absolute inset-0 grid place-items-center p-4 text-center text-[14px] text-[var(--ink-2)]">
          {record.conference_acronym || "Proceedings"}
        </span>
      )}
    </div>
  );
}

function DownloadLink({ record, className = "" }) {
  const pdf = fileUrl(record, record.proceedings_pdf);
  if (!pdf) return <span className="herb-italic text-[14.5px] text-[var(--ink-2)]">PDF to be published</span>;
  return (
    <a href={pdf} target="_blank" rel="noopener noreferrer" className={`herb-link inline-flex items-center gap-2 text-[15.5px] ${className}`}>
      <Download aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
      Download PDF
    </a>
  );
}

export default function ProceedingsContent() {
  const [records, setRecords] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    pb.collection("ICSIFT_proceedings")
      .getFullList({ sort: "-created", requestKey: null })
      .then(setRecords)
      .catch(() => {
        setRecords([]);
        setFailed(true);
      });
  }, []);

  const loading = records === null;
  const latest = records?.[0];

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title left; the newest volume, with cover and facts, set as a specimen on the right. */}
      <section aria-labelledby="proceedings-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:p-12">
          <div className="flex flex-col">
            <h1 id="proceedings-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              The research, bound and published.
            </h1>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px] leading-relaxed">
              Published conference proceedings, with research and scholarly contributions from academics around the world.
              Download any volume as a PDF.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15.5px] lg:mt-auto lg:pt-10">
              <a href="#catalogue" className="herb-link">
                All volumes
              </a>
              <Link href="/journals" className="herb-link">
                Indexed journals
              </Link>
              <Link href="/papers-format" className="herb-link">
                Paper format
              </Link>
            </div>
          </div>

          <div aria-busy={loading} aria-live="polite">
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Latest volume</h2>
            <div className="mt-4 grid gap-6 border-t border-[var(--ink)] pt-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
              {loading ? (
                <>
                  <div className="aspect-[3/4] animate-pulse bg-[var(--rule-soft)]" />
                  <div className="space-y-3">
                    <span className="block h-6 w-4/5 animate-pulse bg-[var(--rule-soft)]" />
                    <span className="block h-4 w-2/3 animate-pulse bg-[var(--rule-soft)]" />
                    <span className="block h-4 w-1/2 animate-pulse bg-[var(--rule-soft)]" />
                  </div>
                </>
              ) : latest ? (
                <>
                  <Cover record={latest} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw" priority />
                  <div>
                    {latest.conference_acronym ? (
                      <p className="herb-italic text-[15px] text-[var(--ink-2)]">{latest.conference_acronym}</p>
                    ) : null}
                    <p className="mt-1 text-[clamp(1.35rem,1.1rem+0.7vw,1.7rem)] leading-tight tracking-[-0.02em]">{latest.conference_name}</p>
                    <dl className="mt-5 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                      {factsOf(latest).map(([term, value]) => (
                        <div key={term} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2">
                          <dt className="herb-italic text-[14.5px] text-[var(--ink-2)]">{term}</dt>
                          <dd className="text-[15px]">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    {fileUrl(latest, latest.proceedings_pdf) ? (
                      <ActionLink href={fileUrl(latest, latest.proceedings_pdf)} external primary className="mt-6">
                        Download the proceedings
                      </ActionLink>
                    ) : (
                      <p className="herb-italic mt-6 text-[15px] text-[var(--ink-2)]">The PDF will be published here soon.</p>
                    )}
                  </div>
                </>
              ) : (
                <p className="herb-muted sm:col-span-2">
                  {failed ? "The proceedings could not load just now. Please refresh the page." : "Proceedings will be published here soon."}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue: a ruled index of every volume. */}
      {records?.length ? (
        <section id="catalogue" aria-labelledby="catalogue-title" className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
          <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="catalogue-title" className="herb-h2">
                All volumes.
              </h2>
              <p className="herb-italic text-[16px] text-[var(--ink-2)]">
                {records.length} {records.length === 1 ? "volume" : "volumes"}, newest first
              </p>
            </div>
            <ol className="mt-10 border-t border-[var(--ink)]">
              {records.map((record) => (
                <li
                  key={record.id}
                  className="grid grid-cols-[5.5rem_1fr] gap-x-6 gap-y-4 border-b border-[var(--rule)] py-6 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-start"
                >
                  <Cover record={record} sizes="112px" />
                  <div className="min-w-0">
                    {record.conference_acronym ? (
                      <p className="herb-italic text-[14.5px] text-[var(--ink-2)]">{record.conference_acronym}</p>
                    ) : null}
                    <h3 className="mt-0.5 text-[19px] leading-snug">{record.conference_name}</h3>
                    <dl className="mt-3 grid gap-x-6 gap-y-1 text-[14.5px] md:grid-cols-2">
                      {factsOf(record).map(([term, value]) => (
                        <div key={term} className="flex gap-2">
                          <dt className="herb-italic shrink-0 text-[var(--ink-2)]">{term}</dt>
                          <dd className="min-w-0 break-words">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="col-start-2 sm:col-start-3">
                    <DownloadLink record={record} className="whitespace-nowrap" />
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>
      ) : null}

      {/* Closing */}
      <section aria-labelledby="proceedings-closing-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="proceedings-closing-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Get your paper into the next volume.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">Submit your paper to present it at the next edition.</p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/submission" primary>
              Submit a paper
            </ActionLink>
            <ActionLink href="/registration">Register to attend</ActionLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
