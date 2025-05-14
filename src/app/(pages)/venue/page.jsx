import React from 'react'
import VenuePage from './Content'
import { venueMetadata } from '@/components/metadata'
export const metadata = venueMetadata
function page() {
  return (
    <div>
      <VenuePage/>
    </div>
  )
}

export default page
