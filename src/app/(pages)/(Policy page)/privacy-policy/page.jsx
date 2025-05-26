import React from 'react'
import PrivacyPolicy from './Content'
import { privacyMetadata } from '@/components/metadata'


export const metadata = privacyMetadata
function page() {
  return (
    <div>
      <PrivacyPolicy/>
    </div>
  )
}

export default page
