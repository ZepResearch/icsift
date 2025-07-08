import React from 'react'
import ComplaintsPolicy from './Content'

export const metadata = {
  title: 'Complaints Policy - International Conference on Sustainability, Innovation, and Future Technologies',
  description: 'Join ICSIFT 2025 in Bangkok, Thailand. A 2-day multidisciplinary conference bringing together 1000+ academics and professionals from 50+ countries for cutting-edge research in sustainability, innovation, and future technologies.',
  keywords: ['ICSIFT', 'sustainability conference', 'innovation conference', 'future technologies conference', 'academic conference Bangkok', 'research conference 2025'],
  alternates: {
    canonical: 'https://www.icsift.com/complaints-policy',
  },
  openGraph: {
    title: 'ICSIFT 2025 - International Conference on Sustainability, Innovation, and Future Technologies',
    description: 'Join ICSIFT 2025 in Bangkok, Thailand. A premier academic conference featuring 30+ workshops and global researchers.',
   
    type: 'website',
    locale: 'en_US',
    site_name: 'ICSIFT 2025',
  },
}
 
}
function page() {
  return (
    <div>
      <ComplaintsPolicy/>
    </div>
  )
}

export default page
