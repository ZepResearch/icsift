---
version: 1
slug: "src-app-page-js"
primary_target: "src/app/page.js"
related_targets: []
---

Scope: home page (src/app/page.js). Visitor mode: Persuade.

Audience: academics and industry, mixed. Job: decide to submit a paper or register for the 4th ICSIFT (Feb 21–22, 2027, Bangkok, hybrid). Action: Submit Paper and Register, equal weight. Proof: Scopus/Clarivate indexing, CPD hours, 15+ awards, photos and videos from previous editions, real testimonials and stats.
Constraints: user asked (2026-10-23) for a new layout and new content presentation; old components are content reference only. Facts stay true and come from src/constants/conference.js and PocketBase. Cover every old section's purpose (partner, about, downloads, dates, speakers, SDGs, venue, future opportunities, FAQ, testimonials and stats, media partner). The shared navbar and footer are out of scope. The SDG section is an interactive isometric figure built with the anatomy skill: a herbarium cabinet of 17 drawers, the four ICSIFT goals (4, 8, 9, 17) drawn out.
User steer: "premium and minimal" after two re-rolls; the Terrava pin is withdrawn.

## Direction contract

THESIS: The 4th ICSIFT mounted as a herbarium sheet: each section is one white sheet on grey-green mount board, one photograph as the specimen, facts held in ruled accession labels. It refuses the photo-hero-plus-card-row conference template and the old site's sage blobs and highlighter swashes.

OWN-WORLD: Mount board #E9ECE6 ground, sheet #FFFFFF, ink #0F1A14, muted ink #4F5A53, rule #C9CFC8, one botanical green #1F5E3B for primary actions and the active state only. Familjen Grotesk regular at 56–88px for headlines, 16–18px body; Spectral italic only inside accession labels and captions. Square corners everywhere; 1px ink rules on labels; photographs held by small linen tape straps; sheet numbers "ICSIFT·04·Sheet 03" top-left of each sheet. Buttons are rectangles: green fill for the primary, 1px ink outline for the second.

STORY: The visitor sees the edition, city and dates on the label, takes Submit or Register at once, then reads what they earn (indexing, CPD, awards), the collection scope, the date ledger with each date's state, speakers, the SDG cabinet, proof from past editions, the venue, and answers, closing on one last sheet with both actions.

FIRST VIEWPORT: Mount board with one large white sheet centred below the navbar. Left 55% of the sheet: a tall photograph from the 3rd ICSIFT, taped at two corners. Right: sheet number, a 56–72px headline with the theme, a one-line conference name, then Submit a paper (green) and Register (outline) stacked full width. Bottom-right: the accession label, ruled box: Locality Bangkok, Thailand (hybrid); Dates 21–22 February 2027; Indexed Scopus · Clarivate; Organised by Zep Research with Polytechnic University of the Philippines.

FORM: Herbarium Sheet, third on the safer-register lineup the user picked from after two re-rolls; seed:66f3bdaa85617e4d. Signature interaction: the SDG specimen cabinet, an isometric 17-drawer cabinet whose four ICSIFT drawers stand open and whose drawers slide out on hover/focus with a live label readout. Motion grammar: sheets settle up 12px once on entry; photographs ease from 1.03 to 1 scale; nothing loops.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
