import React from 'react'
import PapersFormatPage from './Content'
import { papersFormatMetadata } from '@/components/metadata'
export const metadata = papersFormatMetadata
function page() {
  return (
    <div>
      <PapersFormatPage/>
    </div>
  )
}

export default page
