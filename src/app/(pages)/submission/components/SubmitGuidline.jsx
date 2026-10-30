"use client";

import { useState } from "react";
import Image from "next/image";
import { BarList, Field, LEAD, SPLIT, StickyIntro } from "@/components/signal/page";

const MIN_WORDS = 250;
const MAX_WORDS = 300;

// Each value set large, its meaning beneath.
const FORMAT = [
  ["250–300", "words in the abstract"],
  ["12 pt", "Arial or Times New Roman"],
  ["Single", "line spacing"],
  [".docx", "Word file, or .doc"],
];

const STRUCTURE = [
  ["Title", "A clear, concise title of up to 15 words."],
  ["Author(s)", "Full name, affiliation and email address for every author. Identify the corresponding author."],
  ["Keywords", "Three to five keywords related to the topic."],
  ["Abstract body", "The objective, methodology, results and significance of the research, briefly."],
];

const RULES = [
  "Submit through the online form above.",
  "Abstracts sent by email are not accepted unless specifically permitted.",
  "Abstracts that do not meet these requirements may be rejected without review.",
];

const AFTER = [
  ["/gallery/3rd-icsift (12).jpg", "A presenter at the lectern during a paper session", "Present it to the session room"],
  ["/gallery/3rd-icsift (19).jpg", "A delegate answering a question into a microphone at a round table", "Take questions from fellow researchers"],
  ["/gallery/3rd-icsift (5).jpg", "Two delegates holding a certificate in front of the conference backdrop", "Leave with your certificate"],
];

const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);

function verdict(words) {
  if (!words) return "Paste your abstract body to count its words.";
  if (words < MIN_WORDS) return `${MIN_WORDS - words} more ${MIN_WORDS - words === 1 ? "word" : "words"} to reach the minimum.`;
  if (words > MAX_WORDS) return `${words - MAX_WORDS} ${words - MAX_WORDS === 1 ? "word" : "words"} over. Trim it to ${MAX_WORDS}.`;
  return "Within the limit. Ready to send.";
}

function WordCheck() {
  const [text, setText] = useState("");
  const words = countWords(text);
  const fits = words >= MIN_WORDS && words <= MAX_WORDS;
  const fill = Math.min(words / MAX_WORDS, 1);

  return (
    <div className="sig-yellow p-6 sm:p-9">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
        <div>
          <h3 className="sig-display text-[clamp(2rem,1.5rem+1.6vw,3rem)]">Check your abstract</h3>
          <p className="mt-3 max-w-[26rem] text-[17px] text-[var(--muted)]">
            Paste the abstract body here to count its words. Nothing is sent or saved.
          </p>
          <p className="mt-8 flex items-baseline gap-3" aria-live="polite">
            <span className="sig-display text-[clamp(4rem,2.4rem+4.6vw,7rem)] leading-none tabular-nums">{words}</span>
            <span className="text-[18px] font-semibold">
              of {MIN_WORDS}–{MAX_WORDS} words
            </span>
          </p>
          <div aria-hidden="true" className="relative mt-5 h-3 bg-[var(--forest)]/15">
            <span
              className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--forest)] transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${fill})` }}
            />
            <span className="absolute -inset-y-1 w-[3px] bg-[var(--signal)]" style={{ left: `${(MIN_WORDS / MAX_WORDS) * 100}%` }} />
          </div>
          <p className={`mt-4 text-[18px] ${fits ? "font-semibold" : "text-[var(--muted)]"}`}>{verdict(words)}</p>
        </div>
        <div>
          <label htmlFor="abstract-check" className="sr-only">
            Abstract body
          </label>
          <textarea
            id="abstract-check"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={10}
            placeholder="Paste your abstract body here…"
            className="block h-full min-h-[14rem] w-full resize-y bg-white p-4 text-[16px] leading-relaxed text-[var(--bark)] placeholder:text-[var(--bark-2)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--forest)]"
          />
        </div>
      </div>
    </div>
  );
}

export default function AbstractSubmissionGuidelines() {
  return (
    <>
      {/* Guidelines on forest: format figures as panels, structure and rules beside a sticky intro, then the word check. */}
      <Field tone="forest" labelledBy="guidelines-title">
        <div className={SPLIT}>
          <StickyIntro tag="Guidelines" id="guidelines-title" title="Abstract guidelines">
            <p className={LEAD}>
              Follow these so your abstract meets the submission standard. For technical problems, write to{" "}
              <a href="mailto:info@icsift.com" className="sig-link font-semibold">
                info@icsift.com
              </a>
              .
            </p>
          </StickyIntro>

          <div className="grid gap-12">
            <dl data-enter style={{ "--i": 2 }} className="grid grid-cols-2 gap-2">
              {FORMAT.map(([value, meaning]) => (
                <div key={value} className="flex flex-col-reverse justify-end bg-[var(--panel)] px-5 py-6">
                  <dt className="mt-2 text-[16px] text-[var(--muted)]">{meaning}</dt>
                  <dd className="sig-display text-[clamp(2.4rem,1.6rem+2.4vw,3.8rem)] leading-none">{value}</dd>
                </div>
              ))}
            </dl>

            <div data-enter style={{ "--i": 3 }}>
              <h3 className="sig-display text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)]">What the abstract contains</h3>
              <BarList items={STRUCTURE} className="mt-6 sm:grid-cols-2" />
            </div>

            <div data-enter style={{ "--i": 4 }}>
              <h3 className="sig-display text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)]">How to send it</h3>
              <ul className="mt-6 grid gap-2">
                {RULES.map((rule) => (
                  <li key={rule} className="bg-[var(--panel)] px-5 py-4 text-[17px] leading-snug text-[var(--cream)]">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div data-enter style={{ "--i": 5 }} className="mt-16">
          <WordCheck />
        </div>
      </Field>

      {/* After you send it: three photographs on cream. */}
      <Field tone="cream" labelledBy="after-title">
        <div data-enter className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 id="after-title" className="sig-h2">
            After you send it
          </h2>
          <p className="max-w-[32rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug text-[var(--muted)]">
            Accepted papers are presented in Bangkok or online, in front of fellow researchers. This is how the 3rd ICSIFT
            looked.
          </p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {AFTER.map(([src, alt, caption], index) => (
            <figure key={src} data-enter style={{ "--i": 1 + index }}>
              <div className="herb-photo relative aspect-[4/5]">
                <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="sig-display mt-4 text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)] leading-[1.05]">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </Field>
    </>
  );
}
