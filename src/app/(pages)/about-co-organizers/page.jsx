'use client';

import { useState } from 'react';
import Image from 'next/image';

// Organizers data structure
const organizersData = [
  {
    id: 1,
    name: "Sulu State College",
    logo: "/co-org/sulu.png",
    image: "/co-org/sulubuilding.jpg",
    about: "The Sulu State College as Center of Excellence in BARMM producing globally competitive graduates and as institutional stewards in the development of the region",
    vision: "The Sulu State College as Center of Excellence in BARMM producing globally competitive graduates and as institutional stewards in the development of the region.",
    mission: "SSC is committed to develop academic stalwart and globally competent professionals, producing cutting edge research, knowledge and technologies for sustainable development; engage in partnership and viable resource generation programs.",
    mandate: "Sulu State College is mandated to provide higher technological, professional, and vocational instruction and training in science, agricultural, and industrial fields, as well as short-term technical or vocational courses. It shall promote research, advanced studies, and progressive leadership in its areas of specialization (Philippine Batas Pambansa Blg. 208 Section 2).To the latter ends, the college believes in a system of management devolution to affect an efficient and effective supervision of processes and resources for a sustained delivery of quality outputs, the generation of knowledge on a more global orientation, and the provision of its academic resources, to the extent feasible, to institutions, both local and international, that are involved in development activities. ",
    coreValues: [
      { letter: 'S', value: 'Solidarity', color: 'bg-yellow-400' },
      { letter: 'P', value: 'Professionalism', color: 'bg-blue-900' },
      { letter: 'I', value: 'Integrity', color: 'bg-yellow-400' },
      { letter: 'C', value: 'Commitment', color: 'bg-blue-900' },
      { letter: 'E', value: 'Excellence', color: 'bg-yellow-400' }
    ],
    culture: [
      "Continuous Improvement",
      "Administrative Accountability",
      "Community Engagement",
      "Commitment to Quality and Innovation"
    ],
    competencies: [
      "Quality Excellence and Continuous Improvement",
      "Building Partnerships with Stakeholders",
      "Providing Accessible Services to Current and Potential Students",
      "Continuous Learning and Development for Employees"
    ],
    accreditations: [
      { name: "WURI Rankings", logo: "/images/wuri.png" },
      { name: "ISO Certified", logo: "/images/iso.png" },
      { name: "CHED Recognition", logo: "/images/ched.png" }
    ],
    contact: {
      facebook: "facebook.com/sulustatecollege",
      email: "sulustatecollege@gmail.com",
    //   phone: "+63 XXX XXX XXXX",
      website: "sulustatecollege.edu.ph"
    },
    theme: {
      primary: 'blue',
      gradient: 'from-blue-900 to-blue-600'
    }
  },
  
];

export default function CoOrganizerSection() {
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);

  const openDialog = (organizer) => setSelectedOrganizer(organizer);
  const closeDialog = () => setSelectedOrganizer(null);

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16 animate-fadeInDown">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Co-Organizers
            </h2>
            <p className="text-xl text-gray-600">
              Meet our partner institutions driving excellence
            </p>
          </header>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 lg:gap-12">
            {organizersData.map((org, index) => (
              <OrganizerCard
                key={org.id}
                organizer={org}
                onShowMore={() => openDialog(org)}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dialog Modal */}
      {selectedOrganizer && (
        <Dialog organizer={selectedOrganizer} onClose={closeDialog} />
      )}
    </>
  );
}

// Organizer Card Component
function OrganizerCard({ organizer, onShowMore, delay }) {
  return (
    <article
      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fadeInUp group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${organizer.theme.gradient}`}>
          {/* Placeholder for image */}
          <Image src={organizer.image} alt={`${organizer.name} Building`} fill className="object-cover object-center opacity-80" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Logo */}
        <div className="relative z-20 -bottom-12 left-8 w-32 h-32 bg-white rounded-2xl shadow-2xl p-3 border-4 border-white">
          <div className={`w-full h-full flex items-center justify-center text-3xl font-bold text-${organizer.theme.primary}-900`}>
            <Image src={organizer.logo} alt={`${organizer.name} Logo`} width={200} height={200} className="object-contain" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 px-8 pb-8">
        {/* Name */}
        <h3 className={`font-serif text-3xl font-bold text-${organizer.theme.primary}-900 mb-4`}>
          {organizer.name}
        </h3>

        {/* About */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📖</span>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              About
            </h4>
          </div>
          <p className="text-gray-700 leading-relaxed line-clamp-3">
            {organizer.about}
          </p>
        </div>

        {/* Core Values */}
        <div className="mb-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
            Core Values
          </h4>
          <div className="flex flex-wrap gap-2">
            {organizer.coreValues.slice(0, 5).map((value, idx) => (
              <div
                key={idx}
                className={`${value.color} text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 animate-slideInLeft`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="text-lg font-bold">{value.letter}</span>
                <span className="text-xs">{value.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Show More Button */}
        <button
          onClick={onShowMore}
          className={`w-full bg-gradient-to-r ${organizer.theme.gradient} text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group`}
        >
          <span>View Details</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
}

// Dialog Modal Component
function Dialog({ organizer, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scaleIn">
        {/* Header */}
        <div className={`bg-gradient-to-r ${organizer.theme.gradient} p-8 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
          </div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 bg-white rounded-2xl shadow-xl p-2">
                <div className={`w-full h-full flex items-center justify-center text-2xl font-bold text-${organizer.theme.primary}-900`}>
                          <Image src={organizer.logo} alt={`${organizer.name} Logo`} width={100} height={100} className="object-contain" />

                </div>
              </div>
              <div>
                <h2 className="font-serif text-4xl font-bold mb-2">
                  {organizer.name}
                </h2>
                <p className="text-white/90 text-sm">Complete Organization Profile</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-8">
          <div className="space-y-8">
            {/* Vision */}
            <InfoSection
              icon="🎯"
              title="Vision"
              content={organizer.vision}
            />

            {/* Mission */}
            <InfoSection
              icon="🚀"
              title="Mission"
              content={organizer.mission}
            />

            {/* Mandate */}
            {organizer.mandate && (
              <InfoSection
                icon="📋"
                title="Mandate"
                content={organizer.mandate}
              />
            )}

            {/* Core Values */}
            <div>
              <SectionHeader icon="💎" title="Core Values" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {organizer.coreValues.map((value, idx) => (
                  <div
                    key={idx}
                    className={`${value.color} text-white p-4 rounded-xl`}
                  >
                    <div className="text-3xl font-bold mb-1">{value.letter}</div>
                    <div className="text-sm font-semibold">{value.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizational Culture */}
            {organizer.culture.length > 0 && (
              <div>
                <SectionHeader icon="🏛️" title="Organizational Culture" />
                <ul className="mt-4 space-y-3">
                  {organizer.culture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`text-${organizer.theme.primary}-600 mt-1`}>▸</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Competencies */}
            {organizer.competencies.length > 0 && (
              <div>
                <SectionHeader icon="⚡" title="Core Competencies" />
                <ul className="mt-4 space-y-3">
                  {organizer.competencies.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`text-${organizer.theme.primary}-600 mt-1`}>▸</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accreditations */}
            {organizer.accreditations.length > 0 && (
              <div>
                <SectionHeader icon="🏆" title="Accreditations & Recognition" />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {organizer.accreditations.map((acc, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-xl p-6 flex items-center justify-center hover:bg-yellow-50 transition-colors"
                    >
                      <span className="text-center text-sm font-semibold text-gray-700">
                        {acc.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <SectionHeader icon="📞" title="Get in Touch" />
              <div className="mt-4 space-y-3">
                {organizer.contact.website && (
                  <ContactLink
                    icon="🌐"
                    label="Website"
                    value={organizer.contact.website}
                    href={`https://${organizer.contact.website}`}
                    gradient={organizer.theme.gradient}
                  />
                )}
                {organizer.contact.email && (
                  <ContactLink
                    icon="✉️"
                    label="Email"
                    value={organizer.contact.email}
                    href={`mailto:${organizer.contact.email}`}
                    gradient={organizer.theme.gradient}
                  />
                )}
                {organizer.contact.facebook && (
                  <ContactLink
                    icon="📘"
                    label="Facebook"
                    value="Visit our page"
                    href={`https://${organizer.contact.facebook}`}
                    gradient={organizer.theme.gradient}
                  />
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function InfoSection({ icon, title, content }) {
  return (
    <div>
      <SectionHeader icon={icon} title={title} />
      <p className="mt-3 text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 border-b-2 border-gray-100 pb-2">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
        {title}
      </h3>
    </div>
  );
}

function ContactLink({ icon, label, value, href, gradient }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${gradient} text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <div className="text-xs text-white/80 uppercase tracking-wider">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}