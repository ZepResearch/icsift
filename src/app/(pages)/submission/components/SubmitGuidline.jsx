"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/home/Reveal";

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
    <div className="bg-[var(--green)] p-5 text-white sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
        <div>
          <h3 className="text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight tracking-[-0.02em]">Check your abstract.</h3>
          <p className="mt-3 max-w-[26rem] text-[16px] text-white/85">
            Paste the abstract body here to count its words. Nothing is sent or saved.
          </p>
          <p className="mt-8 flex items-baseline gap-3" aria-live="polite">
            <span className="herb-display text-[clamp(3.5rem,2rem+4vw,6rem)] tabular-nums">{words}</span>
            <span className="herb-italic text-[17px] text-white/85">
              of {MIN_WORDS}–{MAX_WORDS} words
            </span>
          </p>
          <div aria-hidden="true" className="relative mt-4 h-2 bg-[var(--green-deep)]">
            <span
              className="absolute inset-y-0 left-0 w-full origin-left bg-white transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${fill})` }}
            />
            <span className="absolute inset-y-0 w-[2px] bg-[var(--green)]" style={{ left: `${(MIN_WORDS / MAX_WORDS) * 100}%` }} />
          </div>
          <p className={`mt-4 text-[17px] ${fits ? "font-medium" : "text-white/85"}`}>{verdict(words)}</p>
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
            className="block h-full min-h-[14rem] w-full resize-y bg-white p-4 text-[16px] leading-relaxed text-[var(--ink)] placeholder:text-[var(--ink-2)] focus:outline-2 focus:outline-offset-2 focus:outline-white"
          />
        </div>
      </div>
    </div>
  );
}

export default function AbstractSubmissionGuidelines() {
  return (
    <>
      <section aria-labelledby="guidelines-title" className="px-4 pt-28 sm:px-6 lg:px-10 lg:pt-40">
        <Reveal className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div data-enter className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h2 id="guidelines-title" className="herb-h2">
              Abstract guidelines.
            </h2>
            <p className="max-w-[32rem] text-[17px]">
              Follow these so your abstract meets the submission standard. For technical problems, write to{" "}
              <a href="mailto:info@icsift.com" className="herb-link">
                info@icsift.com
              </a>
              .
            </p>
          </div>

          <dl data-enter style={{ "--i": 1 }} className="mt-12 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {FORMAT.map(([value, meaning]) => (
              <div key={value} className="flex flex-col-reverse justify-end bg-[var(--mount)] px-5 py-6">
                <dt className="herb-italic mt-2 text-[15px] text-[var(--ink-2)]">{meaning}</dt>
                <dd className="herb-display text-[clamp(2.25rem,1.4rem+2.6vw,3.75rem)]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
            <div data-enter style={{ "--i": 2 }}>
              <h3 className="text-[22px] leading-tight tracking-[-0.01em]">What the abstract contains</h3>
              <ol className="mt-6 grid gap-6 sm:grid-cols-2">
                {STRUCTURE.map(([title, body]) => (
                  <li key={title} className="border-l-[3px] border-[var(--green)] pl-5">
                    <p className="text-[20px] leading-snug">{title}</p>
                    <p className="herb-muted mt-1 text-[16px]">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div data-enter style={{ "--i": 3 }}>
              <h3 className="text-[22px] leading-tight tracking-[-0.01em]">How to send it</h3>
              <ul className="mt-6 grid gap-2">
                {RULES.map((rule) => (
                  <li key={rule} className="bg-[var(--mount)] px-5 py-4 text-[17px] leading-snug">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div data-enter style={{ "--i": 4 }} className="mt-14">
            <WordCheck />
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="after-title" className="px-4 pt-28 pb-16 sm:px-6 lg:px-10 lg:pt-40 lg:pb-24">
        <Reveal className="mx-auto max-w-[1400px]">
          <div data-enter className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h2 id="after-title" className="herb-h2">
              After you send it.
            </h2>
            <p className="max-w-[32rem] text-[17px]">
              Accepted papers are presented in Bangkok or online, in front of fellow researchers. This is how the 3rd ICSIFT
              looked.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {AFTER.map(([src, alt, caption], index) => (
              <figure key={src} data-enter style={{ "--i": 1 + index }}>
                <div className="herb-photo relative aspect-[4/5]">
                  <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-[17px] leading-snug">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
