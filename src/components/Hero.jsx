'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export default function EventRegistration() {
  return (
    <div className="min-h-full py-12 bg-gradient-to-r from-emerald-900 via-lime-600 to-emerald-950 p-8">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-start mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            3<sup>rd</sup> International Conference on <br /> Sustainability, Innovation and Future Technologies
          </h1>
        </div>

        {/* Video and CPD Section */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Left Side - Large Video (80%) */}
          <div className="relative group lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-black shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/r1GcUCVStsc?start=54&autoplay=1&mute=1&loop=1&playlist=r1GcUCVStsc"
                title="CPD Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
          </div>

          {/* Right Side - Registration Card (20%) */}
          <div className="relative group lg:col-span-2">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-purple-500/30 shadow-2xl p-6 flex flex-col h-full justify-between">
              {/* Content */}
              <div className='flex flex-col justify-center items-center'>
                <h2 className="text-2xl font-bold text-green-50 mb-3 leading-tight">
                  Continuing Professional Development
                </h2>
                <Image
                  src="/assets/cpd2.png"
                  alt="CPA Logo"
                  width={250}
                  height={50}
                  className="mb-4 bg-white/30 rounded-lg p-2"
                />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Commit to lifelong learning and professional growth through CPD. Enhance your skills, knowledge, and competencies to stay current in your field and maintain professional standards.
                </p>
              </div>

              {/* CTA Button */}
              <Link href="/registration" className="w-full mt-6">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-200 via-green-300 to-green-500 text-black font-semibold text-base py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
              >
                Registration
              </Button>
              </Link>
              <Link href="/submission" className="w-full mt-2">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-200 via-green-300 to-green-500 text-black font-semibold text-base py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg mt-1"
              >
                Submit
              </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Conference Details Card */}
        <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-purple-500/30 shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Conference Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Date */}
            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-50" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Date</p>
                <p className="text-white text-lg font-semibold">
                  August 20<sup>th</sup> - 21<sup>st</sup>, 2026
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-green-50" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white text-lg font-semibold">Boracay, Philippines</p>
              </div>
            </div>

            {/* Format */}
            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-50" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Format</p>
                <p className="text-white text-lg font-semibold">In-person & Virtual</p>
              </div>
            </div>
          </div>

  <div className="flex-wrap md:flex items-center justify-evenly border-t border-gray-700 p-6 rounded-4xl bg-white/30 ">

                
                    <Image
                      src={"/assets/zepresearch.png"}
                      alt="Zep Research"
                      width={100}
                      height={40}
                      className="h-12 w-auto object-contain"
                    />
                    <Image
                      src={"/assets/clarivate.png"}
                      alt="Clarivate"
                      width={120}
                      height={40}
                      className="h-12 w-auto object-contain"
                    />
                    <Image
                      src={"/assets/scopus.png"}
                      alt="Scopus"
                      width={100}
                      height={40}
                      className="h-12 w-auto object-contain"
                    />
                 
  </div>

          {/* Rating and Attendees */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <span className="text-white font-semibold">4.8 rating</span>
            </div>
            <div className="text-gray-400">
              500+ attendees
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}