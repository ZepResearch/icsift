import Image from "next/image";
import Reveal from "@/components/home/Reveal";
import SigButton from "./SigButton";

// Building blocks for inner pages in the Signal system. A page is a stack of <Field>s; each field's tone sets the
// colours its children read (--muted, --panel, --line), so the same list or card works on any field.

const TONES = { forest: "sig-forest", deep: "sig-deep", cream: "sig-cream", yellow: "sig-yellow" };
const DARK = new Set(["forest", "deep"]);

const CONTAINER = "mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10";

// A full-width section of one colour. `reveal` wraps the content so its [data-enter] parts rise in turn.
export function Field({ tone = "cream", id, labelledBy, className = "", inner = "", pad = "py-24 lg:py-36", reveal = true, children }) {
  const Inner = reveal ? Reveal : "div";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${TONES[tone]} scroll-mt-28 ${className}`}>
      <Inner className={`${CONTAINER} ${pad} ${inner}`}>{children}</Inner>
    </section>
  );
}

// Submit / Register (or any pair) with the right button tones for the field. Each action is [href, label] or
// [href, label, true] for a link that opens another site in a new tab.
export function ActionPair({ tone = "cream", primary = ["/submission", "Submit a paper"], secondary = ["/registration", "Register"], className = "" }) {
  const dark = DARK.has(tone);
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {primary ? (
        <SigButton href={primary[0]} tone={dark ? "fill" : "dark"} external={Boolean(primary[2])}>
          {primary[1]}
        </SigButton>
      ) : null}
      {secondary ? (
        <SigButton href={secondary[0]} tone={dark ? "outline" : "dark-outline"} external={Boolean(secondary[2])}>
          {secondary[1]}
        </SigButton>
      ) : null}
    </div>
  );
}

// The opening field of an inner page: forest ground, an optional tag, the h1 in the display face and the lead on the
// left; whatever the page passes as `aside` on the right (facts, an index, a photograph). `photo` adds a full-width
// duotone band under it.
export function PageHero({ id, tag, title, lead, aside, actions, photo, titleClass = "text-[clamp(2.8rem,1.4rem+4.6vw,6rem)]" }) {
  return (
    <section aria-labelledby={id} className="sig-forest relative isolate overflow-hidden">
      <div className={`${CONTAINER} grid gap-12 pt-20 pb-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:pt-28 lg:pb-24`}>
        <div>
          {tag ? <p className="sig-tag sig-rise">{tag}</p> : null}
          <h1 id={id} className={`sig-display sig-rise ${tag ? "mt-5" : ""} ${titleClass}`} style={{ "--i": 1 }}>
            {title}
          </h1>
          {lead ? (
            <p className="sig-rise mt-7 max-w-[36rem] text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] leading-snug text-[var(--muted)]" style={{ "--i": 2 }}>
              {lead}
            </p>
          ) : null}
          {actions ? (
            <div className="sig-rise mt-9" style={{ "--i": 3 }}>
              {actions}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="sig-rise" style={{ "--i": 2 }}>
            {aside}
          </div>
        ) : null}
      </div>
      {photo ? (
        <div className="relative h-[42svh] min-h-[280px] lg:h-[56svh]">
          <div className="sig-duotone sig-hero-photo">
            <Image src={photo.src} alt="" fill priority sizes="100vw" className={`object-cover ${photo.position ?? ""}`} />
          </div>
          <p className={`${CONTAINER} relative flex h-full items-end pb-6 text-[15px] text-[var(--muted)]`}>{photo.caption}</p>
        </div>
      ) : null}
    </section>
  );
}

// Term / value pairs on panels: big value in the display face, the term above in the body face.
export function FactCells({ facts, columns = "sm:grid-cols-2", size = "text-[clamp(1.5rem,1.2rem+0.9vw,2.1rem)]" }) {
  return (
    <dl className={`grid gap-2 ${columns}`}>
      {facts.map(([term, value]) => (
        <div key={term} className="bg-[var(--panel)] px-5 py-5">
          <dt className="text-[15.5px] text-[var(--muted)]">{term}</dt>
          <dd className={`sig-display mt-1.5 leading-[1.04] ${size}`}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

// A list of titled items, each with an accent bar on the left.
export function BarList({ items, className = "", titleClass = "text-[20px] font-semibold" }) {
  return (
    <ul className={`grid gap-6 ${className}`}>
      {items.map(([title, body]) => (
        <li key={title} className="border-l-4 border-[var(--line)] pl-5">
          <p className={`leading-snug ${titleClass}`}>{title}</p>
          {body ? <p className="mt-1 text-[17px] text-[var(--muted)]">{body}</p> : null}
        </li>
      ))}
    </ul>
  );
}

// An ordered process: each step's number large in the display face, the title and body beside it.
export function Steps({ steps }) {
  return (
    <ol className="grid gap-2">
      {steps.map(([title, body], index) => (
        <li key={title} className="grid grid-cols-[3.5rem_1fr] gap-x-5 bg-[var(--panel)] p-6 sm:grid-cols-[4.5rem_1fr] sm:p-7">
          <span aria-hidden="true" className="sig-display text-[clamp(2.6rem,2rem+1.6vw,3.6rem)] leading-[0.85]">
            {index + 1}
          </span>
          <div>
            <h3 className="sig-display text-[clamp(1.4rem,1.1rem+0.8vw,1.9rem)] leading-[1.04]">{title}</h3>
            <p className="mt-2 text-[17px] text-[var(--muted)]">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// The yellow closing call every inner page ends with.
export function CallBand({ id = "page-closing-title", title, text, primary, secondary }) {
  return (
    <Field tone="yellow" labelledBy={id} pad="py-20 lg:py-28">
      <h2 id={id} data-enter className="sig-display text-[clamp(3rem,1.4rem+5.6vw,7rem)]">
        {title}
      </h2>
      <div data-enter style={{ "--i": 1 }} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        {text ? <p className="max-w-[38rem] text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] leading-snug font-medium">{text}</p> : <span />}
        <ActionPair tone="yellow" primary={primary} secondary={secondary} />
      </div>
    </Field>
  );
}

// Left column of a text-and-object field: sticky on wide screens so it travels with a taller right column.
export function StickyIntro({ tag, title, id, children }) {
  return (
    <div className="lg:sticky lg:top-40 lg:self-start">
      {tag ? (
        <p data-enter className="sig-tag">
          {tag}
        </p>
      ) : null}
      <h2 id={id} data-enter style={{ "--i": 1 }} className={`sig-h2 !text-[clamp(2.4rem,1.6rem+2.4vw,4.2rem)] ${tag ? "mt-5" : ""}`}>
        {title}
      </h2>
      {children ? (
        <div data-enter style={{ "--i": 2 }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export const LEAD = "mt-6 max-w-[34rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug";
export const SPLIT = "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16";
