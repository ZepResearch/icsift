"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { pb } from "@/lib/pocketbase";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, CallBand, Field, LEAD, PageHero } from "@/components/signal/page";

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

// A member: grey portrait in an arch (colour on hover), name in the display face, role and institution beneath.
function MemberCard({ member }) {
  return (
    <li id={`member-${member.id}`} className="scroll-mt-32">
      {member.img ? (
        <div className="sig-portrait relative aspect-[4/5] overflow-hidden rounded-t-full bg-[var(--panel)]">
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
          className="sig-display flex aspect-[4/5] items-center justify-center rounded-t-full bg-[var(--panel)] text-[3rem]"
        >
          {initialsOf(member.name)}
        </div>
      )}
      <h3 className="sig-display mt-5 text-[clamp(1.4rem,1.1rem+0.8vw,1.8rem)] leading-[1.02]">{member.name}</h3>
      {member.designation ? <p className="mt-2 text-[16px] leading-snug font-semibold">{member.designation}</p> : null}
      {member.details ? <p className="mt-1 text-[15.5px] leading-snug text-[var(--muted)]">{member.details}</p> : null}
      {member.country ? <p className="mt-1 text-[15px] text-[var(--muted)]">{member.country}</p> : null}
      {member.linkedin || member.twitter ? (
        <p className="mt-3 flex gap-5 text-[15px] font-semibold">
          {member.linkedin ? (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="sig-link">
              LinkedIn
            </a>
          ) : null}
          {member.twitter ? (
            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="sig-link">
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
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the member and country counts set large on panels right. */}
      <PageHero
        id="committee-title"
        tag="Committee"
        title="The committee behind the programme"
        lead={`Experts from environmental science, renewable energy, green technology and sustainable development, who shape and review the ${CONFERENCE.shortForm}.`}
        actions={<ActionPair tone="forest" primary={["#members", "Meet the committee"]} secondary={["/contact", "Join as a reviewer"]} />}
        aside={
          <dl className="grid grid-cols-2 gap-2" aria-busy={loading}>
            {[
              ["Members", committee?.length],
              ["Countries", countries.length],
            ].map(([term, value]) => (
              <div key={term} className="flex flex-col-reverse justify-end bg-[var(--panel)] p-6 sm:p-8">
                <dt className="mt-3 text-[17px] text-[var(--muted)]">{term}</dt>
                <dd className="sig-display text-[clamp(3.6rem,2rem+4.6vw,6.5rem)] leading-none">
                  {loading ? (
                    <span className="inline-block h-[0.8em] w-[1.2em] animate-pulse bg-[var(--forest)]" />
                  ) : failed ? (
                    "–"
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Roll call: every member's name as running text, each a jump to their portrait. */}
      <Field tone="cream" labelledBy="rollcall-title">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <h2 id="rollcall-title" data-enter className="sig-h2 !text-[clamp(2.4rem,1.6rem+2.4vw,4.2rem)]">
              Roll call
            </h2>
            <p data-enter style={{ "--i": 1 }} className="mt-4 text-[17px] text-[var(--muted)]">
              Select a name to see the member.
            </p>
          </div>
          <div data-enter style={{ "--i": 2 }} aria-busy={loading}>
            {loading ? (
              <div className="space-y-3">
                <span className="block h-6 w-full animate-pulse bg-[var(--panel)]" />
                <span className="block h-6 w-5/6 animate-pulse bg-[var(--panel)]" />
                <span className="block h-6 w-2/3 animate-pulse bg-[var(--panel)]" />
              </div>
            ) : committee.length ? (
              <p className="text-[clamp(1.2rem,1rem+0.7vw,1.7rem)] leading-[1.6] font-medium">
                {committee.map((member, index) => (
                  <span key={member.id}>
                    <a href={`#member-${member.id}`} className="decoration-[var(--forest)] decoration-2 underline-offset-4 hover:underline">
                      {member.name}
                    </a>
                    {index < committee.length - 1 ? (
                      <span aria-hidden="true" className="px-2 text-[var(--muted)]">
                        ·
                      </span>
                    ) : null}
                  </span>
                ))}
              </p>
            ) : (
              <p className={LEAD}>
                {failed ? "The committee list could not load just now." : "Committee members will be listed here soon."}
              </p>
            )}
          </div>
        </div>
      </Field>

      {/* Members: portraits in arches on forest. */}
      <Field tone="forest" id="members" labelledBy="members-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="members-title" data-enter className="sig-h2">
            Meet the committee
          </h2>
          <p data-enter style={{ "--i": 1 }} className="max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug text-[var(--muted)]">
            Diverse expertise and perspectives, brought together to make the conference rigorous and useful.
          </p>
        </div>

        <div className="mt-14" aria-live="polite" aria-busy={loading}>
          {loading ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="aspect-[4/5] animate-pulse rounded-t-full bg-[var(--panel)]" />
                  <div className="mt-4 h-5 w-2/3 animate-pulse bg-[var(--panel)]" />
                  <div className="mt-2 h-4 w-1/2 animate-pulse bg-[var(--panel)]" />
                </div>
              ))}
            </div>
          ) : committee.length === 0 ? (
            <p className="py-6 text-[19px]">
              {failed
                ? "The committee could not load just now. Please refresh the page."
                : `The committee for the ${CONFERENCE.shortForm} will be announced here soon.`}
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
              {committee.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </ul>
          )}
        </div>
      </Field>

      <CallBand
        id="contribute-title"
        title="Review for future editions"
        text="We are always looking for experts to join the reviewer pool. Share your expertise and help shape the future of sustainability and innovation research."
        primary={["/contact", "Express interest"]}
        secondary={["/submission", "Submit a paper"]}
      />
    </main>
  );
}
