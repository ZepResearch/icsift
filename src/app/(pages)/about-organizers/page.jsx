import React from 'react'
import AboutOrganizersPage from './Content'
import { aboutOrganizersMetadata } from '@/components/metadata'
export const metadata = aboutOrganizersMetadata
function page() {
  return (
    <div>
      <AboutOrganizersPage/>
    </div>
  )
}

export default page
