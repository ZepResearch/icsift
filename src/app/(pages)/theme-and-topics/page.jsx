import React from 'react'
import ThemeAndTopicsPage from './Content'
import {  themesTopicsMetadata } from '@/components/metadata'
export const metadata = themesTopicsMetadata
function page() {
  return (
    <div>
      <ThemeAndTopicsPage/>
    </div>
  )
}

export default page
