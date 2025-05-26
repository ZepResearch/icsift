import React from 'react'
import TermsAndConditions from './Content'
import { termsMetadata } from '@/components/metadata'


export const metadata = termsMetadata
function page() {
  return (
    <div>
      <TermsAndConditions/>
    </div>
  )
}

export default page
