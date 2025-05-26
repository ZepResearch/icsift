import React from 'react'
import CancellationPolicy from './Content'
import { cancellationMetadata } from '@/components/metadata'

export const metadata = cancellationMetadata



function page() {
  return (
    <div>
      <CancellationPolicy/>
    </div>
  )
}

export default page
