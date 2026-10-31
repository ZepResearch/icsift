import { CONFERENCE } from "@/constants/conference";
import { SHORT_WHEN, pageMetadata } from "@/lib/seo";

// Page metadata for every route. Built on pageMetadata() in src/lib/seo.js, so the edition, year, city and dates all
// come from src/constants/conference.js. Titles are short: the layout appends " | ICSIFT <year>".
// Descriptions stay near 150–160 characters and lead with what the page offers.

const short = CONFERENCE.shortForm;
const year = CONFERENCE.year;
const city = CONFERENCE.venue.city || CONFERENCE.venue.location.split(",")[0].trim();

// Home
export const homeMetadata = pageMetadata({
  path: "/",
  absoluteTitle: `${short} ${year}: Sustainability & Innovation Conference, ${city}`,
  description: `International Conference on Sustainability, Innovation and Future Technologies, ${SHORT_WHEN}. Call for papers: Scopus and WoS publication.`,
  keywords: ["sustainability conference", "green technology conference", "SDG conference", "research conference Thailand", "academic conference 2027"],
});

// About
export const aboutConferenceMetadata = pageMetadata({
  path: "/about-conference",
  title: "About the Conference",
  description: `What ${short} is and who it is for: research, keynotes and workshops on sustainability, innovation and future technologies, ${SHORT_WHEN}.`,
  keywords: ["about ICSIFT", "conference objectives", "who should attend"],
});

export const aboutOrganizersMetadata = pageMetadata({
  path: "/about-organizers",
  title: "About the Organisers: Zep Research",
  description: `${short} is organised by Zep Research, which runs international research conferences and collaboration programmes. Meet the organisers and partner with us.`,
  keywords: ["Zep Research", "conference organiser", "research conferences"],
});

export const coOrganizersMetadata = pageMetadata({
  path: "/about-co-organizers",
  title: "Co-organisers",
  description: `The universities and academic bodies that co-organise ${short}, ${SHORT_WHEN}. Apply to co-organise the conference with your institution.`,
  keywords: ["co-organiser", "university partner", "academic partnership", "co-host a conference"],
});

// Programme
export const themesTopicsMetadata = pageMetadata({
  path: "/theme-and-topics",
  title: "Theme, Tracks and Topics",
  description: `The ${short} theme, Sustainable Innovation: Bridging Technology and Environmental Stewardship, and six tracks from renewable energy and AI to smart cities.`,
  keywords: ["conference tracks", "conference topics", "renewable energy", "artificial intelligence", "smart cities", "circular economy", "sustainable development"],
});

export const papersFormatMetadata = pageMetadata({
  path: "/papers-format",
  title: "Paper Format and Templates",
  description: `Download the ${short} abstract and full-paper templates and check the format: 300-word abstracts, 8 to 12 page papers, IEEE citations, Word files.`,
  keywords: ["paper template", "abstract template", "paper format", "IEEE citation style", "submission guidelines"],
});

export const presentationModeMetadata = pageMetadata({
  path: "/mode-of-presentation",
  title: "Modes of Presentation: In Person or Online",
  description: `Present your paper at ${short} in person in ${city} or online. A 15-minute talk with Q&A, what to prepare, and guidelines for every presenter.`,
  keywords: ["oral presentation", "virtual presentation", "hybrid conference", "presentation guidelines"],
});

export const scheduleMetadata = pageMetadata({
  path: "/schedule",
  title: "Schedule and Programme",
  description: `The ${short} programme hour by hour for ${CONFERENCE.date}: keynotes, technical sessions, panels and breaks, in ${city} and online.`,
  keywords: ["conference schedule", "conference programme", "keynote speeches", "technical sessions"],
});

export const awardsMetadata = pageMetadata({
  path: "/awards",
  title: "Awards and Scholarships",
  description: `Best paper, best presentation and outstanding contributor awards at ${short}, plus scholarships and up to 20% off your next registration. Criteria and judging.`,
  keywords: ["best paper award", "conference awards", "research scholarship", "student scholarship"],
});

export const galleryMetadata = pageMetadata({
  path: "/gallery",
  title: "Gallery: Photos and Films from Past Editions",
  description: "Photographs and films from every ICSIFT edition: sessions, keynotes, certificates and delegates from the conferences in Bangkok and the Philippines.",
  keywords: ["conference photos", "conference gallery", "past conference", "ICSIFT highlights"],
});

// Key people
export const committeeMetadata = pageMetadata({
  path: "/committee",
  title: "Committee",
  description: `Meet the ${short} committee: researchers and academics who review submissions, chair sessions and shape the programme on sustainability and technology.`,
  keywords: ["conference committee", "reviewers", "program committee", "scientific committee"],
});

// Taking part
export const submissionMetadata = pageMetadata({
  path: "/submission",
  title: "Call for Papers: Submit Your Paper",
  description: `Submit your abstract or full paper to ${short}, ${SHORT_WHEN}. Accepted papers go to Scopus and Web of Science indexed journals.`,
  keywords: ["call for papers 2027", "submit paper", "abstract submission", "paper submission", "Scopus publication"],
});

export const submissionSuccessMetadata = pageMetadata({
  path: "/submission/success",
  title: "Paper Received",
  description: `Your paper has reached the ${short} team. What happens next: review, decision and the final paper.`,
  noindex: true,
});

export const registrationMetadata = pageMetadata({
  path: "/registration",
  title: "Registration and Fees",
  description: `Register for ${short}, ${SHORT_WHEN}. Physical and virtual fees for academicians and students, Early Bird rates and Scopus packages.`,
  keywords: ["conference registration", "registration fees", "early bird registration", "student registration", "virtual registration"],
});

export const exhibitSponsorMetadata = pageMetadata({
  path: "/exhibit-and-sponsor",
  title: "Exhibit and Sponsor",
  description: `Sponsor ${short} and reach researchers, academics and industry leaders in sustainability and technology. Platinum, Diamond, Gold and Silver packages.`,
  keywords: ["conference sponsorship", "sponsor packages", "exhibitor", "brand visibility"],
});

export const paymentMetadataSuccess = pageMetadata({
  path: "/payment/success",
  title: "Payment Successful",
  description: `Your payment for ${short} is confirmed. Check your email for the receipt.`,
  noindex: true,
});

export const paymentMetadataFailed = pageMetadata({
  path: "/payment/failed",
  title: "Payment Not Completed",
  description: `Your payment for ${short} did not go through. Try again, or contact info@icsift.com.`,
  noindex: true,
});

// Event information
export const venueMetadata = pageMetadata({
  path: "/venue",
  title: `Venue: ${CONFERENCE.venue.name.trim()}, ${city}`,
  description: `${short} meets at ${CONFERENCE.venue.name.trim()}, ${CONFERENCE.venue.location.trim()}, on ${CONFERENCE.date}. Getting there, getting around and what to see.`,
  keywords: [`${city} venue`, "conference venue", "travel to Bangkok", "Suvarnabhumi airport", "Sukhumvit"],
});

export const contactMetadata = pageMetadata({
  path: "/contact",
  title: "Contact the Team",
  description: `Questions about ${short} submissions, registration, sponsorship or travel? Email info@icsift.com, call +91 82600 80050, or send a message.`,
  keywords: ["contact ICSIFT", "conference contact"],
});

// Publications
export const journalsMetadata = pageMetadata({
  path: "/journals",
  title: "Indexed Journals: Find a Journal for Your Paper",
  description: "Search Scopus, Web of Science, ABDC and Google Scholar indexed journals that accept submissions through Zep Research, by title or ISSN, and submit your paper.",
  keywords: ["Scopus indexed journals", "Web of Science journals", "ABDC journals", "journal publication", "submit to journal"],
});

export const journalSubmitMetadata = pageMetadata({
  path: "/journals/submit",
  title: "Submit to a Journal",
  description: "Send your paper to an indexed journal through Zep Research. Upload your manuscript and the team confirms by email.",
  keywords: ["journal submission", "submit manuscript"],
});

export const journalSuccessMetadata = pageMetadata({
  path: "/journals/success",
  title: "Journal Submission Received",
  description: "Your journal submission has reached the Zep Research team. Check your email for the confirmation.",
  noindex: true,
});

export const proceedingsMetadata = pageMetadata({
  path: "/proceedings",
  title: "Conference Proceedings",
  description: "Download the published ICSIFT conference proceedings: research papers on sustainability, innovation and future technologies from past editions.",
  keywords: ["conference proceedings", "proceedings PDF", "published papers", "ISBN proceedings"],
});

export const previousReportMetadata = pageMetadata({
  path: "/previous-conference-report",
  title: "Previous Conference Report",
  description: "Reports from past ICSIFT editions.",
  noindex: true, // The page has no content yet; keep it out of search until it does.
});

// Policies
const policy = (path, title, about) =>
  pageMetadata({
    path,
    title,
    description: `The ${short} ${about}`,
    keywords: ["conference policy"],
  });

export const termsMetadata = policy(
  "/terms-and-conditions",
  "Terms and Conditions",
  "terms and conditions: registration and payment, cancellations, intellectual property, liability and the code of conduct.",
);
export const privacyMetadata = policy(
  "/privacy-policy",
  "Privacy Policy",
  "privacy policy: what personal information we collect, how we use and protect it, cookies, and your rights.",
);
export const cancellationMetadata = policy(
  "/cancellation-policy",
  "Cancellation and Refund Policy",
  "cancellation and refund policy: full refunds more than 60 days out, transfers to another person, and how to cancel.",
);
export const complaintsMetadata = policy(
  "/complaints-policy",
  "Complaints Policy",
  "complaints policy: how to raise a concern, how it is handled and the response times you can expect.",
);
export const equalTreatmentMetadata = policy(
  "/equal-treatment-policy",
  "Equal Treatment Policy",
  "equal treatment policy: our commitment to a fair, inclusive conference free of discrimination.",
);
export const disabilityMetadata = policy(
  "/disability-discrimination-policy",
  "Disability Discrimination Policy",
  "disability discrimination policy: accessibility, reasonable adjustments and support for participants with disabilities.",
);
export const healthSafetyMetadata = policy(
  "/health-and-safety-policy",
  "Health and Safety Policy",
  "health and safety policy: keeping every participant safe at the venue and during the conference.",
);
