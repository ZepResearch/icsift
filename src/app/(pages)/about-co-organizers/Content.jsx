import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionLink } from "@/components/home/primitives";
import Reveal from "@/components/home/Reveal";

// Current co-organisers. Each entry renders as its own sheet; past partners are kept below, commented out.
const CO_ORGANIZERS = [
  {
    id: "pup",
    name: "Polytechnic University of the Philippines",
    logo: "/co-org/PUTP.jpeg",
    about:
      "Polytechnic University of the Philippines is a public university established in 1904, with its main campus in Manila. Known as the “People’s University”, it provides affordable, quality education, with undergraduate and graduate programmes in business, engineering, education, technology and the social sciences for thousands of students.",
    vision: "To be a globally recognized university for higher education and research that is accessible to all.",
    mission:
      "To provide higher education offering quality programs that are responsive to societal needs through effective teaching, research, and community engagement.",
    mandate:
      "PUP is mandated to provide advanced instruction and professional training in technology, science, arts, and economics, and to promote research, advanced studies, and progressive leadership in these fields.",
    values: ["Pananalig", "Ugnayan", "Paglilingkod"],
    culture: ["Inclusive education", "Academic integrity", "Community development", "Lifelong learning"],
    competencies: ["Research and innovation", "Technical and vocational training", "Community outreach", "Quality instruction"],
    contact: {
      website: "www.pup.edu.ph",
      facebook: "https://www.facebook.com/ThePUPOfficials",
    },
  },
  // {
  //   id: "ssc",
  //   name: "Sulu State College",
  //   logo: "/co-org/sulunew.png",
  //   about: "The Sulu State College as Center of Excellence in BARMM producing globally competitive graduates and as institutional stewards in the development of the region.",
  //   vision: "The Sulu State College as Center of Excellence in BARMM producing globally competitive graduates and as institutional stewards in the development of the region.",
  //   mission: "SSC is committed to develop academic stalwart and globally competent professionals, producing cutting edge research, knowledge and technologies for sustainable development; engage in partnership and viable resource generation programs.",
  //   mandate: "Sulu State College is mandated to provide higher technological, professional, and vocational instruction and training in science, agricultural, and industrial fields, as well as short-term technical or vocational courses. It shall promote research, advanced studies, and progressive leadership in its areas of specialization (Philippine Batas Pambansa Blg. 208 Section 2).",
  //   values: ["Solidarity", "Professionalism", "Integrity", "Commitment", "Excellence"],
  //   culture: ["Continuous improvement", "Administrative accountability", "Community engagement", "Commitment to quality and innovation"],
  //   competencies: ["Quality excellence and continuous improvement", "Building partnerships with stakeholders", "Providing accessible services to current and potential students", "Continuous learning and development for employees"],
  //   contact: { website: "sulustatecollege.edu.ph", email: "sulustatecollege@gmail.com", facebook: "facebook.com/sulustatecollege" },
  // },
  // {
  //   id: "asu",
  //   name: "Aklan State University",
  //   logo: "/co-org/asu.jpeg",
  //   about: "Aklan State University is a provincial state university in Aklan province, Philippines. Its seat of governance is in ASU - Banga, with four other campuses across the province. ASU focuses on agriculture, fishery, arts and sciences, engineering and technology, and education. It gained university status on April 4, 2001, with Republic Act 9055.",
  //   vision: "To be a leading state university in agriculture, fisheries, engineering, and education, producing globally competent graduates and promoting sustainable development.",
  //   mission: "To provide quality instruction, conduct relevant research, and deliver community extension services in agriculture, fisheries, arts and sciences, engineering, technology, and education.",
  //   mandate: "ASU is mandated to provide advanced education, research, and extension services in agriculture, fisheries, engineering, and allied disciplines to support regional and national development.",
  //   values: ["Accountability", "Service excellence", "Unity"],
  //   culture: ["Academic excellence", "Sustainable development", "Community engagement", "Innovation and research"],
  //   competencies: ["Agriculture and fisheries", "Engineering and technology", "Arts and sciences", "Education and teacher training", "Research and extension services"],
  //   contact: { website: "https://asu.edu.ph/online/", email: "asumail@asu.edu.ph", phone: "+63 36 267 5801", facebook: "https://www.facebook.com/ASUInfoOffice/" },
  // },
  // {
  //   id: "apserp",
  //   name: "Asia Pacific Society of Educators, Researchers and Professionals",
  //   logo: "/co-org/PCERP.jpeg",
  //   about: "An academic organization that promotes collaboration among teachers, researchers, and professionals across the Asia-Pacific region, organizing conferences, workshops, and research activities to support knowledge sharing, professional development, and innovation.",
  //   vision: "To be the leading network of educators and researchers dedicated to improving education and professional practices in the Asia-Pacific.",
  //   mission: "To foster partnerships, organize knowledge-sharing events, and support research initiatives that elevate teaching and learning across the region.",
  //   mandate: "APSERP is committed to strengthening education by creating platforms for collaboration, professional development, and research dissemination.",
  //   values: ["Academia", "Partnership", "Service", "Excellence", "Research"],
  //   culture: ["Collaborative research", "Professional growth", "Innovation in education", "Global networking"],
  //   competencies: ["Conference and workshop organization", "Research collaboration", "Professional development", "Cross-cultural knowledge exchange"],
  //   contact: { email: "apserp2025@gmail.com", facebook: "https://www.facebook.com/profile.php?id=61572166725005" },
  // },
  // {
  //   id: "feati",
  //   name: "FEATI University",
  //   logo: "/co-org/FU.jpeg",
  //   about: "FEATI University is a leading university in the Philippines, renowned for its pioneering role in aviation education and excellence across engineering, science, education, architecture, business, arts, maritime studies, and information technology.",
  //   vision: "To be a premier university developing competent professionals and leaders grounded in technical excellence and ethical values.",
  //   mission: "To deliver quality education through innovative programs, industry partnerships, and value-driven instruction.",
  //   mandate: "FEATI is mandated to provide technological and professional education geared towards producing globally competitive graduates.",
  //   values: ["Faith", "Excellence", "Accountability", "Teamwork", "Integrity"],
  //   culture: ["Innovation and creativity", "Industry engagement", "Student-centered learning", "Ethical leadership"],
  //   competencies: ["Aviation and engineering education", "Technical research", "Industry partnerships", "Leadership development"],
  //   contact: { website: "www.featiu.edu.ph", email: "info@featiu.edu.ph", facebook: "www.facebook.com/featiuniversity" },
  // },
  // {
  //   id: "isufst",
  //   name: "Iloilo State University of Fisheries Science and Technology",
  //   logo: "/co-org/isufst.jpeg",
  //   about: "ISUFST is a state university in the Philippines specializing in fisheries, marine sciences, agriculture, and technology-driven education, committed to quality instruction, impactful research, and community engagement.",
  //   vision: "To be a recognized center of excellence in fisheries, aquatic sciences, and technology-driven education, producing globally competitive graduates committed to sustainable development.",
  //   mission: "To provide quality instruction, conduct impactful research, and engage communities through programs anchored in fisheries, marine sciences, agriculture, and allied fields.",
  //   mandate: "ISUFST is mandated to offer advanced education and training in fisheries and aquatic sciences, promote scientific research, and support sustainable development in coastal and rural communities.",
  //   values: ["Integrity", "Service", "Unity", "Faith", "Sustainability", "Teamwork"],
  //   culture: ["Innovation and sustainability", "Community engagement", "Interdisciplinary research", "Environmental stewardship"],
  //   competencies: ["Fisheries and aquatic sciences", "Marine and environmental studies", "Agriculture and food technology", "Engineering and applied sciences", "Business, management, and social sciences", "Education and community development"],
  //   contact: { website: "www.isufst.edu.ph", email: "president@isufst.edu.ph", facebook: "https://www.facebook.com/ISUFSTOfficialPage" },
  // },
];

const withProtocol = (url) => (/^https?:\/\//.test(url) ? url : `https://${url}`);

function contactRows({ website, email, phone, facebook }) {
  return [
    website && ["Website", website.replace(/^https?:\/\//, "").replace(/\/$/, ""), withProtocol(website)],
    email && ["Email", email, `mailto:${email}`],
    phone && ["Phone", phone, `tel:${phone.replace(/\s/g, "")}`],
    facebook && ["Facebook", "Official page", withProtocol(facebook)],
  ].filter(Boolean);
}

function RuledList({ title, items }) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase">{title}</h3>
      <ul className="mt-3 border-t border-[var(--ink)]">
        {items.map((item) => (
          <li key={item} className="border-b border-[var(--rule)] py-2.5 text-[16px]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrganizerSheet({ org }) {
  const contacts = contactRows(org.contact);
  return (
    <section id={org.id} aria-labelledby={`${org.id}-name`} className="scroll-mt-24 px-3 pt-24 sm:px-6 lg:px-10 lg:pt-32">
      <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-12 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:p-12">
        <div>
          <div className="flex aspect-square w-full max-w-[220px] items-center justify-center border border-[var(--rule)] p-6">
            <Image src={org.logo} alt={`${org.name} logo`} width={200} height={200} className="max-h-full w-auto object-contain" />
          </div>
          <h2 id={`${org.id}-name`} className="mt-8 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-[1.1] font-normal tracking-[-0.02em] text-balance">
            {org.name}
          </h2>
          {org.values?.length ? (
            <p className="herb-italic mt-3 text-[15px] text-[var(--ink-2)]">{org.values.join(" · ")}</p>
          ) : null}

          {contacts.length ? (
            <dl className="herb-label mt-8 divide-y divide-[var(--rule)]">
              {contacts.map(([term, label, href]) => (
                <div key={term} className="grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-2.5">
                  <dt>{term}</dt>
                  <dd className="min-w-0 break-words">
                    <a
                      href={href}
                      className="herb-link"
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {label}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div>
          <p className="max-w-[44rem] text-[18px] leading-relaxed">{org.about}</p>

          <dl className="mt-10 border-t border-[var(--ink)]">
            {[
              ["Vision", org.vision],
              ["Mission", org.mission],
              ["Mandate", org.mandate],
            ]
              .filter(([, value]) => value)
              .map(([term, value]) => (
                <div key={term} className="grid gap-x-6 gap-y-1 border-b border-[var(--rule)] py-5 sm:grid-cols-[7rem_1fr]">
                  <dt className="herb-italic text-[15px] text-[var(--ink-2)]">{term}</dt>
                  <dd className="text-[16.5px] leading-relaxed">{value}</dd>
                </div>
              ))}
          </dl>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {org.culture?.length ? <RuledList title="Culture" items={org.culture} /> : null}
            {org.competencies?.length ? <RuledList title="Core competencies" items={org.competencies} /> : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function AboutCoOrganizersPage() {
  return (
    <main className="herb min-h-screen">
      {/* Title sheet: full-width title over three ruled columns (intro, facts, action). */}
      <section aria-labelledby="coorg-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <h1 id="coorg-title" className="herb-display max-w-[20ch] text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
            The institutions that host the work with us.
          </h1>

          {/* The 1px gap shows the rule colour through, drawing hairlines between the columns. */}
          <div className="mt-12 grid gap-px border-t border-[var(--ink)] bg-[var(--rule)] lg:grid-cols-3">
            <div className="bg-[var(--sheet)] py-6 lg:pr-8">
              <p className="herb-muted text-[17px] leading-relaxed">
                Each edition of ICSIFT is co-organised with universities and academic bodies that share its work on
                sustainability, innovation and future technologies.
              </p>
            </div>
            <dl className="bg-[var(--sheet)] py-6 lg:px-8">
              {[
                ["Conference", CONFERENCE.shortForm],
                ["Dates", CONFERENCE.date],
                ["Locality", `${CONFERENCE.venue.location.trim()} · and online`],
              ].map(([term, value]) => (
                <div key={term} className="grid grid-cols-[6.5rem_1fr] gap-3 py-1">
                  <dt className="herb-italic text-[15px] text-[var(--ink-2)]">{term}</dt>
                  <dd className="text-[16px]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-3 bg-[var(--sheet)] py-6 lg:pl-8">
              <ActionLink href="#partner" primary>
                Become a co-organiser
              </ActionLink>
              {CO_ORGANIZERS.map((org) => (
                <a key={org.id} href={`#${org.id}`} className="herb-link w-fit text-[15.5px]">
                  {org.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {CO_ORGANIZERS.map((org) => (
        <OrganizerSheet key={org.id} org={org} />
      ))}

      {/* Closing: invite partners, keep Submit and Register reachable. */}
      <section id="partner" aria-labelledby="partner-title" className="scroll-mt-24 px-3 pt-24 pb-16 sm:px-6 lg:px-10 lg:pt-32 lg:pb-24">
        <Reveal className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-12">
          <div>
            <h2 id="partner-title" className="herb-display text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              Co-organise the {CONFERENCE.shortForm}.
            </h2>
            <p className="herb-muted mt-6 max-w-[34rem] text-[17.5px]">
              Interested in partnering with us? Get in touch to explore how your institution can join the conference.
            </p>
          </div>
          <div className="grid gap-3">
            <ActionLink href="/contact" primary>
              Contact the organisers
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
