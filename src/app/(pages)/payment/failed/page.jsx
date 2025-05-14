



import React from 'react'

import PaymentFailedPage from './Content'
import { paymentMetadataFailed } from '@/components/metadata'

export const metadata = paymentMetadataFailed
function Content() {
  return (
    <div>
      <PaymentFailedPage/>
    </div>
  )
}

export default Content
