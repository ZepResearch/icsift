'use client';
import Link from 'next/link';
import React, { useState } from 'react'

function OurPatner() {
  const [showPDF, setShowPDF] = useState(false)

  return (
    <div className='my-9 max-w-6xl mx-auto px-4'>
      <div className="bg-[#edf6e1] rounded-2xl shadow-md overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Content Container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center p-8 lg:p-12">
          {/* Left side - Logo */}
          <div className="flex justify-center lg:justify-start lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center mx-auto gap-3">
              <div className=" rounded-full bg-emerald-900 flex items-center justify-center">
                {/* Replace with your PASUC logo */}
                <img src="assets/cl.jpeg" alt="PASUC" className="h-30 w-auto" />
              </div>
              <div className="text-center">
                {/* <p className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">Endorsed by</p> */}
                {/* <p className="text-sm font-semibold text-gray-800 mt-1"> Conference Locate</p> */}
              </div>
              <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap text-center">
               Our Media Partners
              </span>
            </div>
          </div>

          {/* Right side - Information */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {/* <h2 className="text-2xl lg:text-3xl font-bold">
               Conference Locate 
              </h2> */}
              {/* <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                Official Endorsement
              </span> */}
            </div>
            <p className="leading-relaxed text-sm lg:text-base">
             Conference Locate (Clocate) is a global conference and exhibition directory that helps you discover international conferences, exhibitions, seminars, and workshops in one place. Search upcoming events, explore opportunities worldwide, and submit your own listings to reach a global audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="https://www.clocate.com/international-conference-on-sustainability-innovation-and-future-technologies-icsift/105213/" target='_blank'>
              <button
                className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-300 shadow-lg flex items-center gap-2"
                >
                {/* PDF icon */}
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5 5h6M5 7.5h6M5 10h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M10 1v3.5H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
             Learn more 
              </button>
                  </Link>
              <a href='/registration' className="border-2 border-emerald-800 text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 hover:text-white transition-colors duration-300 text-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  )
}

export default OurPatner