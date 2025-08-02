import React from 'react';
import { Scale, Target, Globe, Shield, FileText, Users, AlertCircle, UserCheck } from 'lucide-react';

const EqualTreatmentPolicy = () => {
  return (
    <div className="min-h-screen ">
      {/* Header */}


      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-green-800 to-green-700 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Scale className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Equal Treatment Policy</h1>
        
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-8">
            {/* Introduction */}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The International Conference on Sustainability, Innovation and Future Technologies   (ICSIFT 2025) is committed to fostering an inclusive, respectful, and equitable environment for all participants. This policy ensures that every attendee, including authors, presenters, delegates, session chairs, reviewers, organizers, and sponsors, is treated fairly and without any form of discrimination.
              </p>
            </div>

            {/* Purpose */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">1. Purpose</h2>
              </div>
              <p className="text-gray-700 mb-4">The purpose of this Equal Treatment Policy is to:</p>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">Promote diversity, inclusivity, and fairness throughout all conference activities.</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">Prevent discrimination and ensure that opportunities for participation are equally available to all.</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">Maintain a professional and welcoming environment for academic and professional engagement.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Scope */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900">2. Scope</h2>
              </div>
              <p className="text-gray-700 mb-4">This policy applies to:</p>
              <div className="grid md:grid-cols-1 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">All conference participants (on-site and online)</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Organizing committees, scientific committees, reviewers, and session chairs</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">All ICSIFT 2025 events, including presentations, workshops, networking sessions, and social gatherings</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Commitment to Equal Treatment */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">3. Commitment to Equal Treatment</h2>
              </div>
              <p className="text-gray-700 mb-6">ICSIFT 2025 ensures that:</p>
              
              <div className="space-y-6">
                {/* Non-Discrimination */}
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Non-Discrimination</h3>
                  </div>
                  <p className="text-gray-700 text-sm ml-11">
                    No participant shall be discriminated against based on race, ethnicity, nationality, gender, gender identity, sexual orientation, religion, age, disability, marital status, socio-economic status, or academic background.
                  </p>
                </div>

                {/* Equal Opportunities */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Equal Opportunities</h3>
                  </div>
                  <p className="text-gray-700 text-sm ml-11">
                    All participants have equal access to submit papers, participate in sessions, present research, and attend all conference activities.
                  </p>
                </div>

                {/* Inclusive Review Process */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Inclusive Review Process</h3>
                  </div>
                  <p className="text-gray-700 text-sm ml-11">
                    Submissions are reviewed anonymously and solely on academic merit, ensuring fairness in selection.
                  </p>
                </div>

                {/* Accessibility */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
                  </div>
                  <p className="text-gray-700 text-sm ml-11">
                    The conference strives to accommodate special needs or disabilities to ensure full participation.
                  </p>
                </div>

                {/* Respectful Environment */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Respectful Environment</h3>
                  </div>
                  <p className="text-gray-700 text-sm ml-11">
                    Harassment, discrimination, or any inappropriate behavior is strictly prohibited and will result in removal from the event.
                  </p>
                </div>
              </div>
            </section>

            {/* Reporting and Resolution */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900">4. Reporting and Resolution</h2>
              </div>
              <div className="grid md:grid-cols-1 gap-4">
                <div className="bg-green-50 p-6 rounded-lg border-2 border-dashed border-green-300">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">
                        Any participant who experiences or witnesses unfair treatment, harassment, or discrimination is encouraged to report the issue to the ICSIFT 2025 organizing committee.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">
                        All complaints will be handled confidentially, with impartial investigation and appropriate action.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Responsibility */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <UserCheck className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">5. Responsibility</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Participant Responsibility</h3>
                      <p className="text-gray-700 text-sm">All participants share the responsibility of upholding this policy</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Committee Oversight</h3>
                      <p className="text-gray-700 text-sm">The organizing committee will monitor compliance and take prompt action against violations</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

       
      </main>

      
    </div>
  );
};

export default EqualTreatmentPolicy;