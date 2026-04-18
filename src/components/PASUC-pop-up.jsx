'use client';
import React, { useState } from 'react'

function PASUCEndorsementPOPUP() {
  const [isOpen, setIsOpen] = useState(true)
  const [showPDF, setShowPDF] = useState(false)

  return (
    <>
      {/* Floating popup card - bottom left */}
      <div className="fixed bottom-28 left-6 z-50">
        {/* Expanded card */}
        {isOpen && (
          <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
            {/* Card header */}
            <div className="bg-emerald-50 px-4 pt-4 pb-3 flex items-center gap-3 relative">
              <div className=" rounded-full bg-emerald-900 flex items-center justify-center flex-shrink-0">
                <img src="pasuc.jpg" alt="PASUC" className="h-16 w-auto" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-900 leading-tight">Endorsed by PASUC</p>
                <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block">
                  Official Endorsement
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Card body */}
            <div className="px-4 py-3">
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Officially endorsed by the{' '}
                <strong className="text-gray-800">Philippine Association of State Universities and Colleges (PASUC)</strong>,
                affirming its quality and national academic standards alignment.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPDF(true)}
                  className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M5 5h6M5 7.5h6M5 10h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    <path d="M10 1v3.5H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  View Letter
                </button>
                <a
                  href="/registration"
                  className="flex-1 border-1.5 border-emerald-600 text-emerald-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-colors text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}

        {/* FAB trigger button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white pl-2 pr-4 py-2.5 rounded-full shadow-lg hover:bg-emerald-700 hover:shadow-emerald-200 transition-all duration-200 text-sm font-semibold"
          >
            <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <img src="pasuc.jpg" alt="" className="w-5 h-5 rounded-full object-cover" />
            </span>
            PASUC <span className="md:block hidden"> Endorsed</span> 
          </button>
        )}
      </div>

      {/* PDF Modal (unchanged) */}
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
            <div className="p-4">
              <iframe src="/pasuc.pdf" className="w-full h-[500px] md:h-[700px] rounded-lg border border-gray-100" title="PASUC Endorsement Letter" />
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setShowPDF(false)} className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors">Close</button>
              <a href="/pasuc.pdf" download className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2">Download PDF</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PASUCEndorsementPOPUP