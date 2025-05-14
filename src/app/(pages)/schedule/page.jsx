import React from 'react'
import ConferenceSchedule from './Content'
import {  scheduleMetadata } from '@/components/metadata'
export const metadata = scheduleMetadata
function page() {
  return (
    <div>
      <ConferenceSchedule/>
    </div>
  )
}

export default page
