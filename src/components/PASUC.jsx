'use client';
import React, { useState } from 'react'

function PASUCEndorsement() {
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
                <img src="pasuc.jpg" alt="PASUC" className="h-36 w-auto" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">Endorsed by</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">PASUC</p>
              </div>
              <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap text-center">
                Official Endorsement
              </span>
            </div>
          </div>

          {/* Right side - Information */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h2 className="text-2xl lg:text-3xl font-bold">
                Endorsed by PASUC
              </h2>
              <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                Official Endorsement
              </span>
            </div>
            <p className="leading-relaxed text-sm lg:text-base">
              This program is officially endorsed by the{' '}
              <strong>Philippine Association of State Universities and Colleges (PASUC)</strong>,
              affirming its quality, relevance, and alignment with national academic and professional standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setShowPDF(true)}
                className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-300 shadow-lg flex items-center gap-2"
              >
                {/* PDF icon */}
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5 5h6M5 7.5h6M5 10h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M10 1v3.5H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                View Endorsement Letter
              </button>
              <a href='/registration' className="border-2 border-emerald-800 text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 hover:text-white transition-colors duration-300 text-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {showPDF && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowPDF(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">PASUC Endorsement Letter</h3>
              <button onClick={() => setShowPDF(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>

            {/* PDF Embed */}
            <div className="p-4">
              <iframe
                src="/pasuc.pdf"
                className="w-full h-90 md:h-[980px] rounded-lg border border-gray-100"
                title="PASUC Endorsement Letter"
              />
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setShowPDF(false)}
                className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <a
                href="assets/pasuc-endorsement.pdf"
                download
                className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PASUCEndorsement