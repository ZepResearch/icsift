import Image from "next/image";
import { CONFERENCE } from "@/constants/conference";
import { ActionPair, BarList, CallBand, FactCells, Field, PageHero, SPLIT } from "@/components/signal/page";
import CoOrganizerForm from "./CoOrganizerForm";

// Current co-organisers. Each entry renders as its own field; past partners are kept below, commented out.
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
  {
  id: "bulacan-deped",
  name: "Department of Education – Schools Division Office of Bulacan",
  logo: "/co-org/bulacandeped.jpeg",
  about:
    "The Department of Education – Schools Division Office of Bulacan is a government education office under the Department of Education in the Philippines. Located in the Provincial Capitol Compound, Guinhawa, City of Malolos, Bulacan, it oversees and supports public and private elementary and secondary schools, promotes equitable access to quality basic education, and implements educational programs and initiatives that support learner development and lifelong learning.",
  vision:
    "We dream of Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation. As a learner-centered public institution, the Department of Education continuously improves itself to better serve its stakeholders.",
  mission:
    "To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education. Students learn in a child-friendly, gender-sensitive, safe, and motivating environment; teachers facilitate learning and nurture every learner; administrators and staff ensure a supportive learning environment; and families, communities, and stakeholders share responsibility for developing lifelong learners.",
  mandate:
    "The Department of Education formulates, implements, and coordinates policies, plans, programs, and projects for formal and non-formal basic education. It supervises elementary and secondary education institutions, including alternative learning systems, and supports a complete, adequate, and integrated basic education system aligned with national development goals.",
  values: [
    "Maka-Diyos",
    "Maka-tao",
    "Makakalikasan",
    "Makabansa"
  ],
  culture: [
    "Inclusive and equitable education",
    "Learner-centered teaching and learning",
    "Community and stakeholder engagement",
    "Safe and supportive learning environments"
  ],
  competencies: [
    "Basic education governance and supervision",
    "Curriculum implementation",
    "Teacher development and instructional support",
    "Inclusive education and learner support",
  ],
  contact: {
    website: "https://bulacandeped.com.ph",
    email: "bulacan@deped.gov.ph",
    facebook: "https://www.facebook.com/sdobulacan/",
    history: "https://bulacandeped.com.ph/history/"
  }
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

// One field per co-organiser, alternating cream and forest. Left (sticky): logo tile, name, values, contacts.
// Right: about, vision / mission / mandate as panels, then culture and competencies as bar lists.
function OrganizerField({ org, tone }) {
  const contacts = contactRows(org.contact);
  return (
    <Field tone={tone} id={org.id} labelledBy={`${org.id}-name`}>
      <div className={SPLIT}>
        <div className="lg:sticky lg:top-40 lg:self-start">
          <div data-enter className="flex aspect-square w-full max-w-[200px] items-center justify-center bg-white p-6">
            <Image src={org.logo} alt={`${org.name} logo`} width={200} height={200} className="max-h-full w-auto object-contain" />
          </div>
          <h2 id={`${org.id}-name`} data-enter style={{ "--i": 1 }} className="sig-display mt-8 text-[clamp(2.2rem,1.5rem+2.2vw,3.6rem)]">
            {org.name}
          </h2>
          {org.values?.length ? (
            <ul data-enter style={{ "--i": 2 }} className="mt-5 flex flex-wrap gap-2">
              {org.values.map((value) => (
                <li key={value} className="bg-[var(--panel)] px-3 py-1.5 text-[15px] font-semibold">
                  {value}
                </li>
              ))}
            </ul>
          ) : null}
          {contacts.length ? (
            <dl data-enter style={{ "--i": 3 }} className="mt-8 grid gap-3 text-[16.5px]">
              {contacts.map(([term, label, href]) => (
                <div key={term}>
                  <dt className="text-[15px] text-[var(--muted)]">{term}</dt>
                  <dd className="min-w-0 break-words">
                    <a
                      href={href}
                      className="sig-link font-semibold"
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

        <div className="grid content-start gap-10">
          <p data-enter style={{ "--i": 2 }} className="max-w-[44rem] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-snug">
            {org.about}
          </p>
          <dl data-enter style={{ "--i": 3 }} className="grid gap-2">
            {[
              ["Vision", org.vision],
              ["Mission", org.mission],
              ["Mandate", org.mandate],
            ]
              .filter(([, value]) => value)
              .map(([term, value]) => (
                <div key={term} className="bg-[var(--panel)] p-6 sm:p-7">
                  <dt className="sig-display text-[24px] leading-none">{term}</dt>
                  <dd className="mt-3 text-[17px] text-[var(--muted)]">{value}</dd>
                </div>
              ))}
          </dl>
          <div data-enter style={{ "--i": 4 }} className="grid gap-10 sm:grid-cols-2">
            {org.culture?.length ? (
              <div>
                <h3 className="sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">Culture</h3>
                <BarList items={org.culture.map((item) => [item])} className="mt-5 !gap-3" titleClass="text-[17px] font-medium" />
              </div>
            ) : null}
            {org.competencies?.length ? (
              <div>
                <h3 className="sig-display text-[clamp(1.6rem,1.3rem+0.8vw,2.1rem)]">Core competencies</h3>
                <BarList items={org.competencies.map((item) => [item])} className="mt-5 !gap-3" titleClass="text-[17px] font-medium" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Field>
  );
}

export default function AboutCoOrganizersPage() {
  return (
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the conference facts and a jump link to each co-organiser right. */}
      <PageHero
        id="coorg-title"
        tag="Co-organisers"
        title="The institutions that host the work with us"
        titleClass="text-[clamp(2.8rem,1.4rem+4.6vw,6rem)]"
        lead="Each edition of ICSIFT is co-organised with universities and academic bodies that share its work on sustainability, innovation and future technologies."
        actions={<ActionPair tone="forest" primary={["#apply", "Become a co-organiser"]} secondary={null} />}
        aside={
          <div className="grid gap-2">
            <FactCells
              facts={[
                ["Conference", CONFERENCE.shortForm],
                ["Dates", CONFERENCE.date],
              ]}
              size="text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)]"
            />
            <ul className="grid gap-2">
              {CO_ORGANIZERS.map((org) => (
                <li key={org.id}>
                  <a
                    href={`#${org.id}`}
                    className="flex items-center gap-4 bg-[var(--panel)] p-4 transition-colors duration-200 hover:bg-[var(--signal)] hover:text-[var(--forest)]"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center bg-white p-1.5">
                      <Image src={org.logo} alt="" width={48} height={48} className="max-h-full w-auto object-contain" />
                    </span>
                    <span className="text-[17px] leading-snug font-semibold">{org.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {CO_ORGANIZERS.map((org, index) => (
        <OrganizerField key={org.id} org={org} tone={index % 2 ? "forest" : "cream"} />
      ))}

      <div id="partner" className="scroll-mt-28">
        <CallBand
          title={`Co-organise the ${CONFERENCE.shortForm}`}
          text="Interested in partnering with us? Send an application, and the team will reply within a few working days."
          primary={["#apply", "Become a co-organiser"]}
          secondary={["/contact", "Contact the organisers"]}
        />
      </div>

      <CoOrganizerForm />
    </main>
  );
}
