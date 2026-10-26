# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A mixed audience, in roughly equal measure: university academics and research scholars, plus industry professionals, policymakers, and potential sponsors. Academics come to submit a paper and present it, in person or virtually. Industry visitors come to attend, sponsor, or exhibit. Most participants are based in Asia, with co-organizing universities in the Philippines.

## Product Purpose

The website for ICSIFT, the International Conference on Sustainability, Innovation, and Future Technologies, organized by Zep Research. The site's job is to turn visitors into paper submissions and registrations for the current edition. It also has to give the conference's details: dates, venue, important dates, speakers, committee, schedule, and policies.

Current edition: 4th ICSIFT, February 21–22, 2027, Bangkok, Thailand (hybrid). The full venue address is still to be announced.

## Positioning

People choose ICSIFT for career credit they can show:
- a publication route to Scopus- and Clarivate (Web of Science)-indexed journals and proceedings;
- certified CPD hours;
- 15+ awards recognizing contributions.

The proof that this happens is a track record of previous editions (1st 2024; 2nd 2025 in Bangkok; 3rd), with real photographs and videos.

## Operating Context

- Paper submission (`/submission`), paper format guidelines and templates (`/papers-format`), registration with online payment (`/registration`, CCAvenue), and published proceedings (`/proceedings`).
- Downloadable materials (brochure, templates, copyright and registration forms) served from PocketBase.
- Important dates and speakers are managed in PocketBase (`ICSIFT_date`, `ICSIFT_speakers`, `ICSIFT_download_material`) and change during the cycle.
- Participation is hybrid: in person in Bangkok or virtual.

## Capabilities and Constraints

- Next.js 15 (App Router), React 19, Tailwind CSS v4, framer-motion, lucide-react, shadcn/ui components.
- Conference facts live in `src/constants/conference.js` and must stay the single source for name, dates, and venue.
- The shared layout includes a Google Translate menu, a navbar, a footer, a Tawk.to chat, a WhatsApp button, and an auth modal.
- Undecided: the full venue address ("full venue will be updated soon").

## Brand Commitments

- Name: ICSIFT; the edition is written as "4th ICSIFT". Organizer: Zep Research. Organizing partner: Polytechnic University of the Philippines (logo at `public/co-org/PUTP.jpeg`, which reads "Quezon City"). Media partner: Conference Locate (Clocate).
- Theme line: "Sustainable Innovation: Bridging Technology and Environmental Stewardship".
- Indexing marks: Scopus, Clarivate (`public/assets/scopus.png`, `public/assets/clarivate.png`).
- The site logo is in the navbar.
- Pinned visual reference (user supplied, 2026-10-23, superseding the earlier "category standard" preference from the same day): the "Terrava" green-infrastructure landing page shots. Soft, airy, nature-photography-led; off-white page with large-radius inset photo cards; light-weight display sans with a single italic serif glyph accent; small pill chips as section labels; one dark olive accent card; black square arrow-buttons; a closing CTA on a landscape photo with the giant wordmark cut off at the page bottom. The direction is the look, not the copy or structure: the page must still read as a conference (dates, venue, submit and register, speakers, proof from past editions).

## Evidence on Hand

- Photos from previous editions: `public/gallery/` (2nd and 3rd ICSIFT), plus highlight graphics in `public/assets/a2–a5.jpeg`.
- Highlight videos on YouTube: `DTUzRphTBWA`, `r1GcUCVStsc`.
- Testimonials and statistics, confirmed real by the user: 94% rated the experience excellent or very good, 32 countries represented, 87% made valuable connections. Attendee scale: 55+ academicians, 125+ research scholars, 10+ industry professionals from over 10 countries. 15+ awards.
- SDG commitment graphic: `public/assets/sdgs.png`.

## Product Principles

1. Lead with the two actions that matter: submit a paper and register. Give them equal weight.
2. Show the credit before asking: put indexing, CPD hours, and awards where a scholar weighing the cost will see them.
3. Prove it with past editions: real photos, videos, and numbers beat adjectives.
4. Keep facts in one place: dates, venue, and edition come from the constants or PocketBase, never hard-coded copies.
