# ICSIFT UI design

The site currently runs two design systems:

| System | Where | Files |
|---|---|---|
| **Signal** (Part 1) | Home, navbar, footer, translate strip, sign-in panel, checkout panel, and every inner page except the payment result pages: About the conference, About the organisers, About the co-organisers, Mode of presentation, Papers format, Theme and topics, Schedule, Awards, Gallery, Venue, Contact, Committee, Proceedings, Submission (and success), Journals (list, detail, submit, success, loading, not found), Registration, Exhibit and sponsor, and all seven policy pages | `src/styles/signal.css`, `src/components/signal/*` (inner-page kit: `page.jsx`), `Navbar.jsx`, `Footer.jsx`, `auth/AuthModal.jsx`, `payments/checkout-panel.jsx`, `policy/PolicyDocument.jsx` |
| **Herbarium** (Part 2) | Only the payment result pages (payment success, payment failed) are left | `src/styles/herbarium.css`, `src/components/home/primitives.jsx` |

Pages move from Herbarium to Signal one at a time; a new page is built in Signal. Never mix the two systems on one page; the shared navbar, footer and sign-in panel are the only Signal parts on a Herbarium page.

---

# Part 1: the Signal system (home, navbar, footer and Signal inner pages)

The idea in one line: **whole fields of deep forest green, cream paper and signal yellow, stacked down the page, with headlines set huge in a condensed uppercase face.** Each section is one field of one colour that runs edge to edge; the colour change is the section break. The model is the Convoke event template, adapted to ICSIFT's content.

## 1. Where things live

| What | Where |
|---|---|
| Tokens and classes | `src/styles/signal.css` (imported in `src/app/layout.js`) |
| Fonts | `src/components/home/fonts.js`: **Anton** as `--font-display`, **Figtree** as `--font-body` (both on `<body>`) |
| Button | `src/components/signal/SigButton.jsx` |
| Home sections | `src/components/signal/*.jsx`, assembled in `src/app/page.js` |
| Scroll entrance | `src/components/home/Reveal.jsx`, with `data-enter` and `style={{ "--i": n }}` on each part |
| Navbar / footer | `src/components/Navbar.jsx`, `src/components/Footer.jsx` |
| Conference facts | `src/constants/conference.js` and PocketBase only. Never hard-code a date, venue or edition. |

Wrap the page's `<main>` in `sig`:

```jsx
<main className="sig min-h-screen">…fields…</main>
```

`.sig` re-points the Herbarium variable names (`--ink`, `--sheet`, `--green`…) to Signal colours, so shared parts such as `SdgWheel`, `VenueMedia` and `herb-photo` render correctly inside it.

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--forest` | `#213629` | Main dark field, navbar, text on yellow |
| `--forest-deep` | `#182a1f` | Footer, translate strip, FAQ rows, menus |
| `--signal` | `#fdfd60` | Text and buttons on forest; the yellow field |
| `--signal-deep` | `#eaea3c` | Yellow button hover |
| `--cream` | `#f4f1ec` | Light field |
| `--cream-deep` | `#e9e4da` | Panels on cream (fact cards, quotes, SDG rows) |
| `--bark` | `#3a3020` | Text on cream |
| `--bark-2` | `#6b604c` | Secondary text on cream |

Pairings (always one of these, never others):

| Field | Text | Buttons |
|---|---|---|
| Forest | Signal yellow (cream for long answers) | `tone="fill"` + `tone="outline"` |
| Cream | Bark | `tone="dark"` + `tone="dark-outline"` |
| Signal yellow | Forest | `tone="dark"` + `tone="dark-outline"` |

Rhythm on the home page: photo hero → cream (Organised with) → forest (Purpose) → **yellow** (Dates) → forest (Schedule) → cream (Speakers) → forest (Moments) → cream (Goals) → forest (Venue) → cream (Voices) → forest (FAQ) → **yellow** (Closing) → footer. When you reorder sections, re-colour them so the alternation holds. Yellow fields are rare (two per page): the dates and the closing call. Never put two fields of the same colour next to each other.

No gradients except the scrim over the hero photograph. No shadows except on menus. No glass or blur.

## 3. Type

| Role | Face | Size | Class |
|---|---|---|---|
| Hero headline | Anton, uppercase | `clamp(3.6rem, 1.2rem + 8.4vw, 10rem)`, leading 0.92 | `sig-display` |
| Section heading (h2) | Anton, uppercase | `clamp(2.6rem, 1.6rem + 3.4vw, 5rem)` | `sig-h2` |
| Section tag (left column) | Anton, uppercase | `clamp(1.5rem, 1.2rem + 0.8vw, 2rem)` | `sig-tag` |
| Card title, list title, fact value | Anton, uppercase | 22–38px | `sig-display` + size |
| Big figures (55+, 94%) | Anton | `clamp(3.2rem, 2rem + 3.4vw, 5.5rem)` | `sig-display` |
| Lead sentence | Figtree 400–500 | `clamp(1.1rem, 1rem + 0.4vw, 1.3rem)` | Tailwind |
| Body | Figtree 400 | 17–18px, line-height 1.55 | inherited from `.sig` |
| Labels ("When?", "Venue") | Figtree 400 | 16–17px, `--bark-2` or 75% yellow | Tailwind |
| Nav links | Figtree 700, uppercase | 14px | `sig-nav-link` |

Rules:
- Anton is for headlines, figures, card titles and buttons only. Running text is always Figtree, in sentence case.
- Headlines have no full stop, except a two-sentence headline such as "Seventeen goals. Four we work on."
- The hero headline may run to three deliberate lines (one `<span className="block">` per line). Every other heading stays at two lines or fewer.
- Two faces only: Anton and Figtree. Spectral appears only inside the SDG dial's captions.

## 4. Layout

- Every field is full width; its content sits in `mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10`.
- Field padding: `py-28 lg:py-40` (yellow fields `py-24 lg:py-32`).
- **Both columns carry content. No empty column.** A left column that holds only a tag ("Purpose") with everything else on the right reads as a hole; it was removed.
- **Text-and-object layout** (Purpose, Schedule, Dates, FAQ): `lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]`. Left: the `sig-tag` (optional), the `h2`, the lead and any links or buttons. Right: the object of the section (a photograph, the fact rows, the timeline, the questions).
- **Sticky text column:** when the right side is taller than the left, make the left column `lg:sticky lg:top-40 lg:self-start` so it travels with the content instead of leaving a void beneath it.
- **Fill the right side with large items:** facts are full-width rows on `--forest-deep` (icon, label, value, note), not small cells; a photograph is 4:3 at the column's full width.
- **Centred layout** (Goals uses a centred split, Moments a centred heading): only where the content is itself centred (a dial, a strip).
- **Centred** is used once: the "Moments" gallery heading.
- Corners are square, except speaker portraits, which sit in a cream arch (`rounded-t-full`).

## 5. Components

### Buttons: `SigButton`
```jsx
<SigButton href="/submission">Submit a paper</SigButton>
<SigButton href="/registration" tone="outline">Register</SigButton>
```
Square, 52px tall, Anton uppercase with a right arrow that nudges on hover. Tones: `fill` (yellow), `outline` (yellow line), `dark` (forest fill), `dark-outline` (forest line). Submit and Register always appear as a pair: the first filled, the second outlined.

### Hero (`Hero.jsx`)
Full-bleed photograph in green duotone (`sig-duotone`: grey picture over forest, with a scrim toward the type). Every word comes from `CONFERENCE`: the city and dates with icons above the headline; the full conference name as the yellow `h1` bottom-left (`clamp(2.6rem, 1rem + 5vw, 6rem)`, in a `1.6fr` column); bottom-right, the venue block (venue name in Anton, address, edition with dates and location) above the Submit/Register pair.

### Organised with (`Partners.jsx`)
A short cream band directly under the hero: the heading left with a "Co-host the next edition" link; right, white tiles for the organiser, every co-organiser in `CONFERENCE.coOrganizers` and the media partner (logo, name, role). Adding a co-organiser to the constants adds a tile; nothing else changes.

### Figures row (`Purpose.jsx`)
Big Anton numbers, each with a short Figtree label under it. Use only figures already published on the site.

### Fact trio (`Participate.jsx`)
Three full-width rows on `--forest-deep` in the right column: a large icon, the "When? / Where? / Who can join?" label, the value in Anton, and a one-line note (the written date, the address). The section heading sits sticky on the left.

### Timeline (`Dates.jsx`)
On yellow: `sig-chip` tabs over a vertical forest line with square markers. Each item has its title in Anton, the date with a calendar icon, the description and its state. The next deadline gets a ringed marker and a forest tag.

### Speaker portraits (`Speakers.jsx`)
Grey photo in a cream arch, gaining colour and a slight zoom on hover (`sig-portrait`); name in Anton, role and institution in Figtree. Role tabs use `sig-chip`. The biography opens in the `herb-dialog` side panel.
When a role has only one or two people, each becomes a wide feature card on `--cream-deep` instead: the portrait beside the name, role, institution, the start of the biography and a "Read biography" button. A lone small portrait on an empty row is not allowed.

### Gallery strip (`Moments.jsx`)
An endless marquee (`sig-marquee`) of photographs at two alternating heights; hovering pauses it.

### FAQ (`Faq.jsx`)
Native `<details>` rows on `--forest-deep`, the question in Anton, and a plus that turns to ×.

### Navbar
A forest bar under a `--forest-deep` translate strip: the logo with ICSIFT in Anton, uppercase yellow links that underline on hover (the active link is white), dropdowns on `--forest-deep`, and a yellow "Register now" button. The mobile menu is a forest panel with Anton links at 32px.
- The full link row shows from **1360px** (`min-[1360px]:`); below that the menu button takes over. Nine links, the account control and the button do not fit at 1280px.
- Signed in, the bar shows only a compact **account button** (the user's initial in a yellow square and a chevron). Its menu holds "Signed in as" with the full name and a Log out button. Never put the name or a text "Log out" in the bar itself; a long name overflows the row.
- Adding a top-level link costs width: check the bar at 1360px signed in before adding one.

### Footer
`--forest-deep` ground: the logo (`/singleLogo.svg`, 64px) with ICSIFT in Anton and the edition line, then the conference name, facts and the Submit/Register pair left; four link columns with yellow Anton heads right; policies on a forest strip; then **ICSIFT** at full width in yellow Anton as the close.

### Sign-in panel (`components/auth/AuthModal.jsx`)
A right-side `herb-dialog` with the `sig` class: full screen width on phones, 520px from `sm`. A forest header (logo, ICSIFT, the greeting in Anton, a yellow square close button), then a cream body: Sign in / Create account as two `sig-chip` tabs, white fields, a forest `sig-btn` submit, and a white "Continue with Google" button. Errors sit in a plain `--cream-deep` panel (no side bar).

### Checkout panel (`components/payments/checkout-panel.jsx`)
Same frame as the sign-in panel: a forest header with "Checkout", the item in Anton, its lines (accommodation, fee, tax) and the total set large on a `--panel` block; then a cream body with the sign-in prompt or the billing form and a forest "Pay … securely" button. Used by Registration and Exhibit and sponsor.

### Policy pages
All seven policies render through `PolicyDocument`: a forest hero (title, intro, numbered contents), then one cream field with a sticky rail of every policy (the current one forest) beside the numbered sections, and a yellow "Questions about this policy?" band. Paragraphs, bar lists, term panels, tables (forest header row, panel rows) and yellow notes are the only block types. Add a policy by passing data to `PolicyDocument`, never by building a page.

### PocketBase data
Every fetched block keeps all three states: loading skeletons (`animate-pulse` in a tint of the field's text colour), a plain empty sentence, and an error sentence with the recovery. Decode HTML entities in PocketBase text before showing it (see `plain()` in `Speakers.jsx`).

## 6. Motion

- Hero: the photo eases from scale 1.06; the place, headline and lead rise in turn (`sig-rise`).
- Every field: wrap it in `<Reveal>` and mark its parts `data-enter` with `--i` for an 80ms stagger.
- Hover: buttons fill and their arrows nudge, portraits gain colour, nav underlines draw in.
- The gallery marquee is the only loop. `prefers-reduced-motion` turns all of it off (in `signal.css`).

## 7. Inner pages: the page kit (`src/components/signal/page.jsx`)

Every Signal inner page is built from these parts. Wrap the page in `<main className="sig min-h-screen">`.

### Field tones
A page is a stack of `<Field tone="…">` sections. The tone class sets the ground and text, plus four variables every kit component reads, so the same list or card works on any field:

| Tone | Class | Ground / text | `--muted` | `--panel` | `--line` |
|---|---|---|---|---|---|
| `forest` | `sig-forest` | forest / yellow | cream 86% | forest-deep | yellow |
| `deep` | `sig-deep` | forest-deep / yellow | cream 86% | forest | yellow |
| `cream` | `sig-cream` | cream / bark | bark-2 | cream-deep | forest |
| `yellow` | `sig-yellow` | yellow / forest | forest 82% | forest 8% | forest |

Use `text-[var(--muted)]`, `bg-[var(--panel)]` and `border-[var(--line)]` inside a field; never hard-code a colour that only works on one tone.

### Parts
| Part | Use |
|---|---|
| `PageHero` | The page's opening field, always forest: optional `tag`, the `h1` in Anton (`titleClass` to resize a long title), the `lead`, optional `actions`, and an `aside` on the right. Optional `photo` adds a full-width duotone band underneath. |
| `Field` | A full-width section of one tone; wraps its content in `Reveal` so `[data-enter]` parts rise in turn. `reveal={false}` for interactive panels that re-render (the schedule). |
| `StickyIntro` | Left column of a text-and-object field: tag, `h2`, lead; sticky on wide screens. Pair with the `SPLIT` grid and the `LEAD` paragraph class. |
| `FactCells` | Term/value panels with the value in Anton. Facts in heroes and rails. |
| `BarList` | Titled items with an accent bar (audiences, highlights, criteria, culture). |
| `Steps` | An ordered process: the number set large in Anton, title and body beside it (judging, submission steps, requirements, guidelines). |
| `ActionPair` | Two buttons with the right tones for the field (`tone` = the field's tone). |
| `CallBand` | The yellow closing field every inner page ends with: a huge Anton call, a sentence, and an action pair. |

### Hero asides in use
Each inner page's hero differs by what fills its right side, never by colour or type:

| Page | Hero aside |
|---|---|
| About the conference | Four fact panels; a duotone room photograph under the hero |
| About the organisers | "On this page" as four large jump panels |
| About the co-organisers | Two fact panels and a logo jump card per co-organiser |
| Mode of presentation | The two modes as large icon cards that jump to each mode |
| Papers format | The six-part specification as fact panels |
| Theme and topics | The six tracks as numbered jump panels |
| Schedule | The day switch (`role="tablist"`): two large Day panels, the selected one yellow |
| Awards | A 4:5 photograph; the awards index sits under the lead |
| Gallery | A ledger of editions as panels with the photo count set large |
| Venue | The live Bangkok clock (time now, days until the desk opens), address and hours, and an "Open in Google Maps" outline button |
| Contact | The email and phone number set large as two panels, the first yellow |
| Committee | Members and countries (from PocketBase) as big figures on two panels |
| Proceedings | The newest volume as a specimen: cover, facts and a yellow download button |
| Submission | The three-step strip (Sign in, Fill in, Upload and send) as numbered panels, the current step yellow |
| Submission success | The four review stages as numbered panels, "Received" yellow |
| Journals | The search field with the live "N of M journals showing" count set large |
| Journal detail | The journal's cover on a panel with ISSN, index and file type as fact panels; "All journals" link under the title |
| Registration | The two fee choices (accommodation; local or international) as toggle panels, the selected one yellow; they drive the fee table below |
| Exhibit and sponsor | The tier ladder: each tier on a panel with its price and a yellow bar scaled to that price |
| Policy pages (`components/policy/PolicyDocument.jsx`) | The document's contents as numbered jump panels |

### Herbarium parts inside Signal pages (the bridge)
Forms, fetched archives and dialogs written for Herbarium keep working inside `.sig`: `signal.css` restyles them under `.sig`, so they need no rewrite.

| Class | Inside `.sig` it becomes |
|---|---|
| `herb-input` (and `components/forms/herb-fields.jsx`) | White field, 1.5px `--cream-deep` border, forest on hover, forest focus ring (yellow on forest fields) |
| `herb-btn` / `herb-btn[data-primary]` | Anton uppercase button; primary is forest with yellow text (yellow with forest text on forest fields) |
| `herb-link` | Underline in the current text colour |
| `herb-italic` | Figtree, upright (no Spectral on Signal pages) |
| `herb-label` | A borderless `--panel` block |
| `herb-sheet`, `herb-dialog` | No shadow; cream ground |

Put forms on **cream** fields (the inputs are white). For new code, prefer the Signal classes (`sig-btn`, `sig-link`, `sig-chip`, the kit parts); the bridge is for reuse.

### Recipe
1. `PageHero` (forest).
2. Alternate `cream` and `forest` fields, one subject each. Use the text-and-object layout (`SPLIT` + `StickyIntro`) wherever there is a heading and a body of content.
3. Large items on the right: panels, `Steps`, `BarList`, photographs at full column width. No empty column.
4. End with `CallBand` (yellow). Submit and Register stay reachable on every page.

## 8. Checklist for a Signal section

- [ ] One field colour from the pairings table, different from its neighbours.
- [ ] One `h2` in `sig-h2` (or `sig-display`), two lines or fewer.
- [ ] Body text in Figtree at 17px or more, in the field's full text colour.
- [ ] Submit and Register reachable.
- [ ] Every date, venue and edition from `CONFERENCE` or PocketBase.
- [ ] Checked at 390, 768 and 1440 wide: no sideways scroll, nothing clipped.

---

# Part 2: inner pages, the Herbarium Sheet system

Applies only to the Herbarium pages listed in the table at the top. Pages already moved to Signal are documented in Part 1, section 7.

How to build inner pages until they move to Signal.

The idea in one line: **every page is a set of white herbarium sheets mounted on grey-green board.** Each sheet holds one subject, one photograph as its specimen, and its facts in a ruled accession label. The look is premium and minimal. Restraint does the work, not decoration.

---

## 1. Where things live

| What | Where |
|---|---|
| Tokens and shared classes | `src/styles/herbarium.css` (loaded globally in `src/app/layout.js`) |
| Fonts | `src/components/home/fonts.js` (Familjen Grotesk as `--font-sheet`, Spectral as `--font-label`, both on `<body>`) |
| Building blocks | `src/components/home/primitives.jsx`: `ActionLink`, `AccessionLabel` |
| Scroll settle | `src/components/home/Reveal.jsx` |
| Reference sections | `src/components/home/*Sheet.jsx` (copy the closest one) |
| Navbar / footer | Shared with the home page; they follow **Signal** (Part 1) |
| SDG figure | `src/components/home/SdgTurntable.jsx` hosts the Hairline figure `public/hairline/turntable.js` (engine: `public/hairline/kernel.js`, never edited; source copy in `hairline/`) |
| Conference facts | `src/constants/conference.js` and PocketBase only. Never hard-code a date, venue or edition. |

Wrap every page's `<main>` in the `herb` class:

```jsx
<main className="herb min-h-screen">…sheets…</main>
```

---

## 2. Colour

One accent colour. Everything else is ink, board and paper.

| Token | Value | Use |
|---|---|---|
| `--mount` | `#e9ece6` | Page ground (the mount board) |
| `--sheet` | `#ffffff` | Sheets, labels, menus |
| `--ink` | `#0f1a14` | Text, label borders, outline buttons |
| `--ink-2` | `#4f5a53` | Secondary text, captions, label terms |
| `--rule` | `#c9cfc8` | Hairline rules between rows |
| `--rule-soft` | `#e1e5e0` | Loading skeletons |
| `--green` | `#1f5e3b` | **Only** the primary action, the active/current state, and "next" markers |
| `--green-deep` | `#174a2e` | Primary hover |

Rules:
- Green is never a background field, never decoration, and never used for headings.
- No gradients, glass or blur panels, glows, or tinted "blob" shapes.
- Colour from photographs and SDG plates is the only other colour on the page.
- Secondary text on white uses `--ink-2`, never a lighter grey (contrast ≥ 4.5:1).

---

## 3. Type

| Role | Face | Size | Class |
|---|---|---|---|
| Hero display | Familjen Grotesk 400 | `clamp(2.5rem, 1.4rem + 2.7vw, 4rem)` | `herb-display` |
| Section heading (h2) | Familjen Grotesk 400 | `clamp(2.1rem, 1.4rem + 2.6vw, 3.6rem)` | `herb-h2` |
| Card / row title (h3) | Familjen Grotesk 400–500 | 18–26px | Tailwind |
| Body | Familjen Grotesk 400 | 17–18px, line-height 1.6 | inherited from `.herb` |
| Small body | Familjen Grotesk | 15–16px | `herb-muted` for secondary |
| Small caps heading | Familjen Grotesk 600, 13px, `tracking-[0.08em] uppercase` | Column and list headings only |
| Label terms, captions, list numbers | **Spectral italic** 13–15px | `herb-italic` |

Rules:
- Headlines are sentence case, end in a full stop, and use `text-wrap: balance`. Keep them short and concrete ("The dates that matter.").
- Spectral italic is for annotation: label terms, photo captions, list numbers, quotes. Never use it for headlines.
- No eyebrow or kicker above a heading, and no sheet numbers ("Sheet 03"). The heading opens the sheet.
- Keep body text to 65–75 characters a line (`max-w-[34rem]` to `max-w-[44rem]`).
- Numbers are tabular (set on `.herb`).

---

## 4. Shape, space and depth

- **Square corners everywhere.** No `rounded-*` on sheets, buttons, labels, images, inputs or menus.
- **Sheet:** `herb-sheet` (white, soft offset shadow). Padding `p-5 sm:p-8 lg:p-12`. Max width `max-w-[1400px] mx-auto`.
- **Section rhythm:** each section is `px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32`. The last section adds `pb-16 lg:pb-24`.
- **Inside a sheet:** the content grid starts at the top of the sheet, with no extra margin. Use more space above a heading than below it.
- **Rules:** use 1px `--ink` to open a list or table and 1px `--rule` between its rows. Do not stack boxes inside boxes.
- **Depth:** sheets carry the only shadow. Labels and buttons are flat with 1px borders.

---

## 5. Components

### Heroes: one per page, never the same twice
Every inner page gets its own title sheet, built from the same parts (`herb-sheet`, `herb-display`, ruled rules, `ActionLink`, Spectral italic terms) but arranged differently, so each page is recognisable at a glance while still reading as one system.

Patterns already in use. Pick an unused one or invent a new arrangement, and add it to this list:

| Page | Hero pattern |
|---|---|
| Payment success | One sheet, split: title, intro and a "Your conference" label left; a numbered, linked "What to do next" list right |
| Payment failed | One sheet: title and intro, a three-column hairline row of likely causes, then what to do if money left the account, and Try again |

Rules for a new hero:
- Keep it to one sheet with `herb-settle`, a single `h1` in `herb-display`, and at most one primary button.
- Vary the arrangement, not the vocabulary: no new colours, rounded shapes, gradients or decorative imagery.
- A photo is optional. A text-only hero should still have structure (a contents index, a fact strip, a ruled label), not a centred headline on its own.

### Buttons: `ActionLink`
```jsx
<ActionLink href="/submission" primary>Submit a paper</ActionLink>
<ActionLink href="/registration">Register to attend</ActionLink>
```
- A rectangle at least 54px tall, label left and arrow (`ArrowUpRight`) right.
- Primary: green fill. Secondary: 1px ink outline that fills with ink on hover.
- At most one primary per sheet. Submit and Register always appear together and carry equal weight.
- Labels name the action ("Submit a paper", "View the awards"), never "Learn more" or "Click here".
- Inline links use `herb-link` (underline in `--rule`, turning green on hover).

### Accession label
```jsx
<AccessionLabel title="Accession label" rows={[["Dates", CONFERENCE.date], ["Locality", "…"]]} />
```
Use it for any set of facts: dates, venue, fees, eligibility, contact. Terms are in Spectral italic and values in the sheet face. For a fact that is still unknown, show a dashed rule with "To be announced" (see `VenueSheet.jsx`). Never invent a value.

### Photographs (specimens)
```jsx
<div className="herb-mount herb-photo relative aspect-[4/3]">
  <Image src="…" alt="…" fill sizes="…" className="object-cover" />
</div>
<figcaption className="herb-italic mt-3 text-[14px] text-[var(--ink-2)]">Caption, edition</figcaption>
```
- `herb-mount` adds two linen tape straps. Use it on photographs only.
- Every photo gets a caption that names what it shows and which edition.
- Use real photographs from `public/gallery/`, with the 1st, 2nd and 3rd editions labelled correctly. Stock images only when the subject is real (for example the host city) and the caption says what it is.
- Pick photos with open eyes, a clear subject and a natural moment.

### Ruled lists and indexes
Numbered lists use a Spectral italic `01` column, a 1px ink rule on top and `--rule` lines between rows (see `ScopeSheet`, `OutcomesSheet`). Use these instead of grids of icon cards.

### Tabs
`herb-tab` gives text tabs with a green underline on the active tab. Use `role="tablist"` with arrow-key support (see `SpeakersSheet`).

### FAQ
Native `<details>/<summary>` with `herb-faq`, a `Plus` icon that rotates to ×, and ruled rows. No accordion library.

### Side panel
For a detail view (a speaker biography, for example), use a native `<dialog>` with `herb-dialog`: a full-height panel from the right with a square close button.

### Data from PocketBase
Every fetched block needs all three states:
- **Loading:** skeleton bars in `--rule-soft` with `animate-pulse`, plus `aria-busy`.
- **Empty:** one plain sentence ("Speakers for … will be announced here soon.").
- **Error:** a sentence that names the problem and the recovery ("could not load just now. Please refresh the page.").

### Icons
`lucide-react` only, `strokeWidth={1.6}` (1.4 for large icons), sized 16–20px. Use icons only where they carry meaning (arrow, download, play, close, plus). No emoji, and no icon tiles above headings.

---

## 6. Illustrations

Explanatory figures use the **Hairline** style: one-stroke isometric line drawings of a real object that answer the pointer (made with the `/hairline-create` skill). They carry no colour, text or numbers. Names go to the read-out beside the figure, and the one highlight stroke is mapped to `--green` through the `--hairline-*` variables in `herbarium.css`. To add one, write the figure as `hairline/<name>.js`, check it with the skill, copy it to `public/hairline/`, and host it the way `SdgTurntable.jsx` does.

## 7. Motion

- **Settle:** wrap a sheet in `<Reveal>` and it rises 12px and fades in the first time it enters the viewport. Content is visible by default.
- The hero alone uses `herb-settle` and `herb-photo-settle` (the photo eases from scale 1.03).
- Hover: arrows nudge 2px, underlines draw in, photos scale to 1.03.
- Easing is `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`), 200–900ms. Nothing loops or bounces.
- `prefers-reduced-motion` switches all of it off (already in `herbarium.css`).

---

## 8. Page recipes

**Content page** (About, Venue, Awards, Committee):
1. Title sheet: `herb-display` title, 1–2 sentence intro, key facts, and one photo when one exists. Its layout must differ from other pages' heroes (see **Heroes** below).
2. One sheet per topic, with a ruled list or label for its facts.
3. Close with the Submit/Register pair (copy `ClosingSheet`).

**Form page** (Registration, Submission, Contact):
- One sheet. The form fields sit in the left 60%, and the right side holds an accession label of fees, deadlines and help contact.
- Inputs are square with a 1px `--rule` border, turning `--ink` on hover and getting a green focus ring. Labels sit above the field in 15px grotesk; hints and errors go below. Errors name the problem and the fix.
- The submit button is a primary `herb-btn`, full width on mobile.

**Listing page** (Journals, Proceedings, Gallery):
- A title sheet, then a ruled index or a captioned photo grid in mixed sizes (see `EvidenceSheet`), never same-size icon cards.

---

## 9. Do and don't

| Do | Don't |
|---|---|
| One subject per sheet | Several cards competing on one sheet |
| Facts in ruled labels | Big-number stat tiles with icons |
| Real, captioned photos | Unlabelled stock or decorative imagery |
| Green for one action or state | Green panels, gradient text, coloured borders |
| Square corners, 1px rules | Pills, rounded cards, drop-shadowed buttons |
| Sentence-case headlines with a full stop | ALL-CAPS headlines, highlighter swashes, blobs |
| Facts from `conference.js` and PocketBase | Hard-coded dates, cities or edition numbers |

---

## 10. Checklist before shipping a page

- [ ] `<main className="herb">`, no sheet numbers.
- [ ] The hero layout is not a copy of another page's hero.
- [ ] Every date, venue and edition comes from `CONFERENCE` or PocketBase.
- [ ] Submit and Register reachable on the page.
- [ ] Loading, empty and error states for fetched data.
- [ ] Every image has alt text and a caption.
- [ ] Keyboard: focus ring visible, tabs and dialogs operable, Escape closes menus.
- [ ] Checked at 390px and 1440px wide: no sideways scroll, no clipped text.
- [ ] Contrast: body text ≥ 4.5:1 (`--ink-2` is the lightest allowed on white).
