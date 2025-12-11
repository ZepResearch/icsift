import Image from 'next/image'
import React from 'react'

function SDGS() {
  return (
    <div className='max-w-7xl mx-auto rounded-4xl ' >
      <Image src={'/assets/sdgs.png'} alt="SDGs" width={1000} height={500} className="w-full h-auto object-cover rounded-4xl select-none pointer-events-none" />
    </div>
  )
}

export default SDGS
