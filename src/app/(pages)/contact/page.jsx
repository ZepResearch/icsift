import React from 'react'
import ContactPage from './Content'
import { contactMetadata } from '@/components/metadata'


export const metadata = contactMetadata
function page() {
  return (
    <div>
      <ContactPage/>
    </div>
  )
}

export default page
