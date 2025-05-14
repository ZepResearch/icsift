import React from 'react'
import AboutConferencePage from './Content'
import { aboutConferenceMetadata } from '@/components/metadata'

export const metadata = aboutConferenceMetadata
function page() {
  return (
    <div>
      <AboutConferencePage/>
    </div>
  )
}

export default page
