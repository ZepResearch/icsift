import React from 'react'
import AwardsPage from './Content'
import { awardsMetadata } from '@/components/metadata'
export const metadata = awardsMetadata
function page() {
  return (
    <div>
      <AwardsPage/>
    </div>
  )
}

export default page
