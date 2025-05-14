import React from 'react'
import OrganizingCommittee from './components/OrganizingCommittee'
import { committeeMetadata } from '@/components/metadata'
export const metadata = committeeMetadata
function page() {
  return (
    <div><h1></h1>
         <OrganizingCommittee/>
    </div>
  )
}

export default page