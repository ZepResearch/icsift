import React from 'react';
import { Shield, Heart, Users, FileText, Phone, Eye } from 'lucide-react';
import Link from 'next/link';

const DisabilityPolicy = () => {
  return (
    <div className="min-h-screen ">
 
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Disability Discrimination Policy</h1>
            </div>
          </div>

          <div className="px-8 py-6 space-y-8">
            {/* Introduction */}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The  International Conference on Applied Science, Engineering & Management (ICSIFT 2025) is committed to fostering an inclusive, accessible, and discrimination-free environment for all participants, regardless of physical, sensory, intellectual, or mental health conditions.
              </p>
            </div>

            {/* Policy Statement */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">1. Policy Statement</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                ICSIFT 2025 strictly prohibits any form of discrimination, harassment, or exclusion based on disability. All conference organizers, staff, and participants are expected to support and uphold the principles of inclusivity and equal access to conference activities, both in physical and virtual formats.
              </p>
            </section>

            {/* Accessibility Commitment */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900">2. Accessibility Commitment</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Venue Accessibility</h3>
                  <p className="text-gray-700 text-sm">
                    The conference venue will comply with international accessibility standards, including barrier-free access to conference halls, restrooms, and networking areas.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Virtual Access</h3>
                  <p className="text-gray-700 text-sm">
                    For participants attending online, the conference platform will be compatible with assistive technologies such as screen readers and will include captioned sessions wherever feasible.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Materials & Communication</h3>
                  <p className="text-gray-700 text-sm">
                    Conference materials, including programs and presentations, will be available in accessible formats upon request.
                  </p>
                </div>
              </div>
            </section>

            {/* Reasonable Accommodations */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">3. Reasonable Accommodations</h2>
              </div>
              <p className="text-gray-700 mb-4">
                ICSIFT 2025 will provide reasonable accommodations to ensure the full participation of individuals with disabilities, which may include:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Reserved seating or accessible seating arrangements</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Assistance with mobility or orientation at the venue</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Sign language interpretation or live captioning (on prior request)</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Adaptation of schedules for participants with special needs</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> Participants requiring accommodations are encouraged to notify the Organizing Committee in advance via info@icsift.com to ensure timely arrangements.
                </p>
              </div>
            </section>

            {/* Non-Discrimination & Anti-Harassment */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900">4. Non-Discrimination & Anti-Harassment</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Any form of discriminatory behavior, harassment, or stigmatization based on disability will not be tolerated.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Complaints or concerns will be addressed promptly and confidentially by the conference&apos;s designated Accessibility & Inclusion Officer.</p>
                </div>
              </div>
            </section>

            {/* Reporting & Support */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">5. Reporting & Support</h2>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-gray-700 text-sm">
                  If any participant experiences or witnesses disability-related discrimination, they may report the issue to the Organizing Committee through the official email or helpdesk. Appropriate action will be taken to resolve the matter and ensure the safety and dignity of all participants.
                </p>
              </div>
            </section>

            {/* Compliance & Review */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900">6. Compliance & Review</h2>
              </div>
              <p className="text-gray-700 text-sm">
                This policy is aligned with the UN Convention on the Rights of Persons with Disabilities (CRPD) and relevant national laws. The Organizing Committee will review and update this policy periodically to ensure best practices in inclusivity.
              </p>
            </section>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Need Assistance?</h3>
            <p className="text-gray-600 text-sm mb-4">
              For accommodation requests or policy-related questions, please contact our team
            </p>
            <Link href={'/contact'}>
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Contact us</span>
            </div>
            </Link>
          </div>
        </div>
      </main>


    </div>
  );
};

export default DisabilityPolicy;