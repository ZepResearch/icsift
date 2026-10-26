"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { pb } from "@/lib/pocketbase";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

const photoOf = (m) => `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${m.collectionId}/${m.id}/${m.img}`;

const initialsOf = (name = "") =>
  name
    .replace(/^(dr|prof|mr|ms|mrs|engr)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function MemberCard({ member }) {
  return (
    <li id={`member-${member.id}`} className="scroll-mt-24">
      {member.img ? (
        <div className="herb-mount herb-photo relative aspect-[4/5] bg-[var(--rule-soft)]">
          <Image
            src={photoOf(member)}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-[4/5] items-center justify-center border border-[var(--rule)] text-[2.5rem] tracking-[-0.02em] text-[var(--ink-2)]"
        >
          {initialsOf(member.name)}
        </div>
      )}
      <h3 className="mt-5 text-[18px] leading-snug font-medium">{member.name}</h3>
      {member.designation ? <p className="mt-1 text-[15px] leading-snug">{member.designation}</p> : null}
      {member.details ? <p className="herb-muted mt-2 text-[14.5px] leading-snug">{member.details}</p> : null}
      {member.country ? (
        <p className="herb-italic mt-2 text-[14px] text-[var(--ink-2)]">{member.country}</p>
      ) : null}
      {member.linkedin || member.twitter ? (
        <p className="mt-3 flex gap-5 text-[14.5px]">
          {member.linkedin ? (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="herb-link">
              LinkedIn
            </a>
          ) : null}
          {member.twitter ? (
            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="herb-link">
              X / Twitter
            </a>
          ) : null}
        </p>
      ) : null}
    </li>
  );
}

export default function OrganizingCommittee() {
  const [committee, setCommittee] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    pb.collection("ICSIFT_committee")
      .getFullList({ sort: "name", requestKey: null })
      .then(setCommittee)
      .catch(() => {
        setCommittee([]);
        setFailed(true);
      });
  }, []);

  const loading = committee === null;
  const countries = [...new Set((committee ?? []).map((m) => m.country?.trim()).filter(Boolean))];

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title and intro over a running roll call of every member's name. */}
      <section aria-labelledby="committee-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 id="committee-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              The committee behind the programme.
            </h1>
            <div>
              <p className="herb-muted max-w-[34rem] text-[17.5px] leading-relaxed">
                Experts from environmental science, renewable energy, green technology and sustainable development, who shape
                and review the {CONFERENCE.shortForm}.
              </p>
              <dl className="mt-6 grid grid-cols-2 border-t border-[var(--ink)]">
                {[
                  ["Members", committee?.length],
                  ["Countries", countries.length],
                ].map(([term, value], index) => (
                  <div key={term} className={`pt-4 ${index ? "border-l border-[var(--rule)] pl-5" : ""}`}>
                    <dt className="herb-italic text-[14.5px] text-[var(--ink-2)]">{term}</dt>
                    <dd className="mt-1 text-[1.75rem] leading-none tracking-[-0.02em]">
                      {loading ? <span className="inline-block h-6 w-10 animate-pulse bg-[var(--rule-soft)]" /> : failed ? "–" : value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-12 border-t border-[var(--ink)] pt-5" aria-busy={loading}>
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">Roll call</h2>
            {loading ? (
              <div className="mt-4 space-y-3">
                <span className="block h-4 w-full animate-pulse bg-[var(--rule-soft)]" />
                <span className="block h-4 w-2/3 animate-pulse bg-[var(--rule-soft)]" />
              </div>
            ) : committee.length ? (
              <p className="mt-4 text-[clamp(1.1rem,0.95rem+0.5vw,1.4rem)] leading-[1.6]">
                {committee.map((member, index) => (
                  <span key={member.id}>
                    <a href={`#member-${member.id}`} className="hover:text-[var(--green)]">
                      {member.name}
                    </a>
                    {index < committee.length - 1 ? <span className="herb-italic px-2 text-[var(--ink-2)]">·</span> : null}
                  </span>
                ))}
              </p>
            ) : (
              <p className="herb-muted mt-4">
                {failed ? "The committee list could not load just now." : "Committee members will be listed here soon."}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Members */}
      <section aria-labelledby="members-title" className="px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="members-title" className="herb-h2 max-w-[14ch]">
              Meet the committee.
            </h2>
            <p className="herb-muted max-w-[28rem]">
              Diverse expertise and perspectives, brought together to make the conference rigorous and useful.
            </p>
          </div>

          <div className="mt-10 border-t border-[var(--ink)] pt-10" aria-live="polite" aria-busy={loading}>
            {loading ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="aspect-[4/5] animate-pulse bg-[var(--rule-soft)]" />
                    <div className="mt-4 h-4 w-2/3 animate-pulse bg-[var(--rule-soft)]" />
                    <div className="mt-2 h-4 w-1/2 animate-pulse bg-[var(--rule-soft)]" />
                  </div>
                ))}
              </div>
            ) : committee.length === 0 ? (
              <p className="herb-muted py-6 text-[17px]">
                {failed
                  ? "The committee could not load just now. Please refresh the page."
                  : `The committee for the ${CONFERENCE.shortForm} will be announced here soon.`}
              </p>
            ) : (
              <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
                {committee.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </section>

      {/* Closing: join the reviewer pool, keep Submit and Register reachable. */}
      <section aria-labelledby="contribute-title" className="px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="contribute-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Review for future editions.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              We are always looking for experts to join the reviewer pool. Share your expertise and help shape the future of
              sustainability and innovation research.
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/contact" primary>
              Express interest
            </ActionLink>
            <div className="grid gap-3 sm:grid-cols-2">
              <ActionLink href="/submission">Submit a paper</ActionLink>
              <ActionLink href="/registration">Register to attend</ActionLink>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
