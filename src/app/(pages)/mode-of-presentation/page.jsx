import React from 'react'
import ModeOfPresentationPage from './Content'
import { presentationModeMetadata } from '@/components/metadata'

export const metadata = presentationModeMetadata
function page() {
  return (
    <div>
      <ModeOfPresentationPage/>
    </div>
  )
}

export default page
