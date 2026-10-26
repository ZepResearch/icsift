import OrganizingCommittee from './components/OrganizingCommittee'
import { committeeMetadata } from '@/components/metadata'

export const metadata = committeeMetadata

export default function page() {
  return <OrganizingCommittee />
}
