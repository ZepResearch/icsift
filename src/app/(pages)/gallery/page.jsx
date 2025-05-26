import React from 'react'
import Gallery from './components/gallery'
import { galleryMetadata } from '@/components/metadata';
  export const metadata = galleryMetadata;

function page() {
  return (
    <div>
      <Gallery/>
    </div>
  )
}

export default page
