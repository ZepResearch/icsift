import React from 'react'
import ComplaintsPolicy from './Content'
import { complaintsMetadata } from "@/components/metadata";


export const metadata = complaintsMetadata;
 

function page() {
  return (
    <div>
      <ComplaintsPolicy/>
    </div>
  )
}

export default page
