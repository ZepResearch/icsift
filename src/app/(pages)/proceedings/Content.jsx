"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { CallBand, Field, PageHero } from "@/components/signal/page";

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
    <div className="herb-photo relative aspect-[3/4] w-full bg-[var(--panel)]">
      {cover ? (
        <Image src={cover} alt={`Cover of the ${record.conference_name} proceedings`} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <span className="sig-display absolute inset-0 grid place-items-center p-4 text-center text-[22px]">
          {record.conference_acronym || "Proceedings"}
        </span>
      )}
    </div>
  );
}

function DownloadButton({ record, tone = "dark" }) {
  const pdf = fileUrl(record, record.proceedings_pdf);
  if (!pdf) return <span className="text-[15.5px] text-[var(--muted)]">PDF to be published</span>;
  return (
    <a href={pdf} target="_blank" rel="noopener noreferrer" className="sig-btn" {...{ [`data-${tone}`]: "" }}>
      <Download aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
      <span>Download PDF</span>
    </a>
  );
}

// The newest volume as the hero's specimen: cover on a panel beside its name, facts and the download.
function LatestVolume({ loading, failed, latest }) {
  return (
    <div aria-busy={loading} aria-live="polite">
      <p className="text-[16px] text-[var(--muted)]">Latest volume</p>
      <div className="mt-3 grid gap-5 bg-[var(--panel)] p-5 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] sm:p-6">
        {loading ? (
          <>
            <div className="aspect-[3/4] animate-pulse bg-[var(--forest)]" />
            <div className="space-y-3">
              <span className="block h-7 w-4/5 animate-pulse bg-[var(--forest)]" />
              <span className="block h-5 w-2/3 animate-pulse bg-[var(--forest)]" />
              <span className="block h-5 w-1/2 animate-pulse bg-[var(--forest)]" />
            </div>
          </>
        ) : latest ? (
          <>
            <Cover record={latest} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 35vw, 100vw" priority />
            <div className="flex flex-col">
              {latest.conference_acronym ? <p className="text-[15.5px] text-[var(--muted)]">{latest.conference_acronym}</p> : null}
              <p className="sig-display mt-1 text-[clamp(1.5rem,1.2rem+0.9vw,2.1rem)] leading-[1.04]">{latest.conference_name}</p>
              <dl className="mt-5 grid gap-3">
                {factsOf(latest).map(([term, value]) => (
                  <div key={term}>
                    <dt className="text-[14.5px] text-[var(--muted)]">{term}</dt>
                    <dd className="mt-0.5 text-[16.5px] font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                {fileUrl(latest, latest.proceedings_pdf) ? (
                  <a href={fileUrl(latest, latest.proceedings_pdf)} target="_blank" rel="noopener noreferrer" className="sig-btn" data-fill="">
                    <Download aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
                    <span className="whitespace-nowrap">Download PDF</span>
                  </a>
                ) : (
                  <p className="text-[16px] text-[var(--muted)]">The PDF will be published here soon.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-[17px] sm:col-span-2">
            {failed ? "The proceedings could not load just now. Please refresh the page." : "Proceedings will be published here soon."}
          </p>
        )}
      </div>
    </div>
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
    <main className="sig min-h-screen">
      {/* Hero: title, lead and links left; the newest volume as a specimen right. */}
      <PageHero
        id="proceedings-title"
        tag="Proceedings"
        title="The research, bound and published"
        lead="Published conference proceedings, with research and scholarly contributions from academics around the world. Download any volume as a PDF."
        actions={
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[16px] font-semibold">
            <a href="#catalogue" className="sig-link">
              All volumes
            </a>
            <Link href="/journals" className="sig-link">
              Indexed journals
            </Link>
            <Link href="/papers-format" className="sig-link">
              Paper format
            </Link>
          </div>
        }
        aside={<LatestVolume loading={loading} failed={failed} latest={latest} />}
      />

      {/* Catalogue: every volume as a panel with its cover, facts and download. */}
      {records?.length ? (
        <Field tone="cream" id="catalogue" labelledBy="catalogue-title">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="catalogue-title" data-enter className="sig-h2">
              All volumes
            </h2>
            <p data-enter style={{ "--i": 1 }} className="text-[17px] font-semibold text-[var(--muted)]">
              {records.length} {records.length === 1 ? "volume" : "volumes"}, newest first
            </p>
          </div>
          <ol className="mt-12 grid gap-2 lg:grid-cols-2">
            {records.map((record, index) => (
              <li
                key={record.id}
                data-enter
                style={{ "--i": 2 + (index % 4) }}
                className="grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-5 bg-[var(--panel)] p-5 sm:grid-cols-[8rem_1fr] sm:grid-rows-[auto_1fr] sm:p-6"
              >
                <div className="sm:row-span-2">
                  <Cover record={record} sizes="128px" />
                </div>
                <div className="min-w-0">
                  {record.conference_acronym ? <p className="text-[15px] text-[var(--muted)]">{record.conference_acronym}</p> : null}
                  <h3 className="sig-display mt-1 text-[clamp(1.25rem,1.1rem+0.6vw,1.7rem)] leading-[1.05]">{record.conference_name}</h3>
                </div>
                <div className="col-span-2 flex min-w-0 flex-col sm:col-span-1 sm:col-start-2">
                  <dl className="grid gap-y-1 text-[15.5px]">
                    {factsOf(record).map(([term, value]) => (
                      <div key={term} className="flex gap-2">
                        <dt className="shrink-0 text-[var(--muted)]">{term}</dt>
                        <dd className="min-w-0 break-words font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 sm:mt-auto sm:pt-5">
                    <DownloadButton record={record} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Field>
      ) : null}

      <CallBand
        id="proceedings-closing-title"
        title="Get your paper into the next volume"
        text="Submit your paper to present it at the next edition."
      />
    </main>
  );
}
