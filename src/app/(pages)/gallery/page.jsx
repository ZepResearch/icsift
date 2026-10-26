import Gallery from './components/gallery'
import { galleryMetadata } from '@/components/metadata'

export const metadata = galleryMetadata

export default function page() {
  return <Gallery />
}
