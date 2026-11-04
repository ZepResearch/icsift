export const CONFERENCE = {   name: "4th International Conference on Sustainability, Innovation and Future Technologies ",
  shortForm: "4th ICSIFT",

scheduleDates: {
    month: 1,        // 0-indexed: 1 = February
    year: 2027,
    days: [26, 27],  // Conference days
  },

  year: 2027,
  date: "February 26th - 27th, 2027",
  venue: {
    location: " Bangkok, Thailand",
    name: "Radisson Suites Bangkok Sukhumvit ",
    address: "23/2-3 Sukhumvit Road, Soi 13, Klongtoey Nua, Wattana, Bangkok, TH",
    // Used for search engines (event schema). Update all four when the venue moves.
    city: "Bangkok",
    country: "TH",
    utcOffset: "+07:00",
    hours: ["09:00", "18:00"],
  },
coOrganizers: [
 
   {
    name: "Polytechnic University of the Philippines",
    logo: "/co-org/PUTP.jpeg",
  }, {
    name: "Department of Education – Schools Division Office of Bulacan",
    logo: "/co-org/bulacandeped.jpeg",
  },
],

  // This conference's record in the Zep Research PocketBase ("Conference" collection). Submissions and
  // registrations link to it, and the dashboard reads the user's ICSIFT records by it.
  zepConferenceId: "9cj5n4788ilx2ms",

  // Certificates generated from the dashboard (src/lib/certificate.js). Logos and signatures live in
  // public/certificate/. A signature image that is missing leaves a blank space above the name to sign by hand.
  // The CPD badge shows only when the PocketBase conference record has cpd_accredited switched on.
  certificate: {
    logos: {
      organiser: "/certificate/zepresearch.png",
      conference: "/certificate/conference-logo.svg",
      cpd: "/certificate/cpd.png",
    },
    signatories: [
      { name: "Mrs. Priyanka Sahu", role: ["Director,", "Zep Research"], signature: "/certificate/signatures/priyanka-sahu.png" },
      // Optional: set to null to print two signatures. Leave `name` empty to take it from the signature's file
      // name, e.g. "/certificate/signatures/Dr. Jane Doe.png" prints "Dr. Jane Doe".
      { name: "", role: ["Organizing Secretary,", "4th ICSIFT-2027"], signature: "" },
      { name: "Ankit Rath", role: ["CEO,", "Zep Research"], signature: "/certificate/signatures/ankit-rath.png" },
    ],
  },

  // Printed on invoices downloaded from the dashboard. Add the registered address and tax number before relying on
  // them as tax invoices.
  issuer: {
    name: "Zep Research",
    address: "",
    taxId: "",
    email: "info@icsift.com",
    website: "icsift.com",
  },
};
