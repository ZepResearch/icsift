import React from 'react'

function CPD() {
  return (
    <div className='my-9 max-w-6xl mx-auto px-4'>
      {/* CTA Banner Style Container */}
      <div className="bg-[#edf6e1]  rounded-2xl shadow-md overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0  opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Content Container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center p-8 lg:p-12">
          {/* Left side - Logo */}
          <div className="flex justify-center lg:justify-start lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img 
                src="assets/cpd2.png" 
                alt="CPD" 
                className="h-48 w-auto mx-auto"
              />
            </div>
          </div>
          
          {/* Right side - Information */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-2xl lg:text-3xl font-bold  mb-4">
              Continuing Professional Development
            </h2>
            <p className="leading-relaxed text-sm lg:text-base">
              Commit to lifelong learning and professional growth through CPD. Enhance your skills, knowledge, and competencies to stay current in your field and maintain professional standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href='https://www.cpdstandards.com/become-accredited/events-conferences/' className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-300 shadow-lg">
                Learn More
              </a>
              <a href='/registration' className="border-2 border-white  px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-700 transition-colors duration-300">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CPD