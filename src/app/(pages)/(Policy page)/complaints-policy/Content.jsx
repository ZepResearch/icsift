import { Mail, Phone, MapPin } from "lucide-react"

export default function ComplaintsPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-green-600 to-[#4d724d] px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Complaints Policy</h1>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a311a] mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                The Organizing Committee of the International Conference on Sustainability, Innovation, and Future Technologies
                (ICSIFT) is committed to providing a professional, respectful, and inclusive environment for all
                participants. We aim to handle all complaints fairly, consistently, and promptly to maintain the
                integrity and quality of the conference.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a311a] mb-4">2. Scope of the Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This policy applies to all participants including authors, reviewers, session chairs, keynote speakers,
                attendees, volunteers, and sponsors. Complaints may relate to, but are not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Conference content or program issues</li>
                <li>Review process or editorial fairness</li>
                <li>Speaker or participant behavior</li>
                <li>Technical or logistical problems</li>
                <li>Discrimination or harassment</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a311a] mb-4">3. Lodging a Complaint</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Complaints must be submitted in writing and include:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                <li>Name and contact details of the complainant</li>
                <li>A clear description of the issue</li>
                <li>Supporting evidence (if any)</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-[#3a633a] p-4 rounded">
                <p className="text-gray-700">
                  <strong>Complaints should be sent via email to:</strong> info@icsift.com
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Subject line:</strong> Formal Complaint – ICSIFT 2025
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a311a] mb-4">4. Complaint Review Process</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Upon receipt, an acknowledgment will be sent within 3 working days.</li>
                <li>The complaint will be reviewed confidentially by the Conference Ethics and Integrity Panel.</li>
                <li>
                  A response will be provided within 10–15 working days, depending on the nature and complexity of the
                  issue.
                </li>
                <li>If required, further investigation or mediation will be initiated.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a311a] mb-4">5. Resolution and Outcomes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on the findings, the Organizing Committee may take appropriate action, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Issuing an apology</li>
                <li>Re-review of submissions (if applicable)</li>
                <li>Disqualification or removal of participants from the event</li>
                <li>Future participation restrictions</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a311a] mb-4">6. Confidentiality</h2>
              <p className="text-gray-700 leading-relaxed">
                All complaints and investigations will be treated with the utmost confidentiality. Personal data will be
                processed in accordance with applicable privacy laws and only shared with those directly involved in the
                resolution.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a311a] mb-4">7. Appeals</h2>
              <p className="text-gray-700 leading-relaxed">
                If a complainant is not satisfied with the outcome, they may submit an appeal in writing within 7 days
                of the decision. The appeal will be reviewed by an independent subcommittee, and a final decision will
                be communicated within 10 working days.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a311a] mb-4">8. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">For queries or complaints, please contact:</p>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3 text-[#4d724d]">
                  <Mail className="w-5 h-5" />
                  <span>info@icsift.com</span>
                </div>
                <div className="flex items-center space-x-3 text-[#4d724d]">
                  <Phone className="w-5 h-5" />
                  <span>+91 82606 84845</span>
                </div>
                <div className="flex items-center space-x-3 text-[#4d724d]">
                  <MapPin className="w-5 h-5" />
                  <span>Bangkok, Thailand</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

    
    </div>
  )
}