import React from 'react';
import { Shield, Heart, AlertTriangle, Users, Activity, RefreshCw, MapPin, Phone } from 'lucide-react';

const HealthSafetyPolicy = () => {
  return (
    <div className="min-h-screen ">
      {/* Header */}
    

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Health and Safety Policy</h1>
            </div>
          </div>

          <div className="px-8 py-6 space-y-8">
            {/* Introduction */}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The Organizing Committee of the  ICSIFT is committed to ensuring the health, safety, and well-being of all participants, including delegates, speakers, exhibitors, sponsors, and staff. We aim to provide a secure and comfortable environment that fosters knowledge exchange and professional networking.
              </p>
            </div>

            {/* Commitment to Health and Safety */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">1. Commitment to Health and Safety</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Compliance with all local, national, and international health and safety regulations.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Implementation of preventive measures to reduce potential risks and hazards during the conference.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Continuous monitoring of health advisories and emergency protocols from local authorities and the World Health Organization (WHO).</p>
                </div>
              </div>
            </section>

            {/* Venue Safety Measures */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900">2. Venue Safety Measures</h2>
              </div>
              <p className="text-gray-700 mb-4">The venue will be equipped with:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-medium text-gray-900 mb-2">Emergency Infrastructure</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">Clearly marked emergency exits and evacuation routes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">Fire safety equipment and certified personnel</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-medium text-gray-900 mb-2">Medical Support</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">Accessible first-aid stations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">On-site medical support</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Facility Standards:</strong> Regular inspections to ensure clean, hazard-free, and accessible facilities for all participants.
                </p>
              </div>
            </section>

            {/* Emergency Preparedness */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-semibold text-gray-900">3. Emergency Preparedness</h2>
              </div>
              <div className="grid md:grid-cols-1 gap-4">
                <div className="space-y-3">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Emergency Response Team</h3>
                        <p className="text-gray-700 text-sm">Available during all sessions for immediate assistance</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Evacuation Procedures</h3>
                        <p className="text-gray-700 text-sm">Plans and procedures will be communicated to participants at the start of the conference</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Medical Coordination</h3>
                        <p className="text-gray-700 text-sm">Direct coordination with local hospitals and emergency services for rapid assistance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Health Precautions */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">4. Health Precautions</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">Promotion of good hygiene practices such as hand sanitizing and mask usage (if applicable)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">Availability of sanitization points at the venue</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">Monitoring for symptoms of illness and facilitating medical assistance where needed</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">Adherence to public health guidelines in case of any outbreak or pandemic situation</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Personal Responsibility */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900">5. Personal Responsibility of Participants</h2>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <p className="text-gray-700 text-sm">All attendees are expected to follow venue safety rules and health protocols</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <p className="text-gray-700 text-sm">Participants should inform the organizers immediately in case of any health or safety concern</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <p className="text-gray-700 text-sm">Delegates with pre-existing health conditions are encouraged to take necessary precautions and carry personal medications</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Continuous Improvement */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <RefreshCw className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">6. Continuous Improvement</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Policy Updates</h3>
                  <p className="text-gray-700 text-sm">The Organizing Committee will review and update health and safety measures as required</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Participant Feedback</h3>
                  <p className="text-gray-700 text-sm">Feedback from participants will be used to enhance future conference safety policies</p>
                </div>
              </div>
            </section>

            {/* Agreement Section */}
            <section className="border-t border-gray-200 pt-6">
              <div className="bg-gradient-to-r from-green-100 to-green-100 p-6 rounded-lg border-2 border-dashed border-green-300">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Participant Agreement</h3>
                  <p className="text-gray-700 text-sm max-w-2xl mx-auto">
                    By attending the  ICSIFT, all participants agree to adhere to this Health and Safety Policy, ensuring a secure and professional conference environment.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Emergency Contact Information */}
        
      </main>

      {/* Footer */}
     
    </div>
  );
};

export default HealthSafetyPolicy;