import React from 'react'
import ProceedingsContent from './Content'

export const metadata = {
    title: 'Proceedings | ICSIFT',
    description: 'Browse published conference proceedings from ICSIFT featuring cutting-edge research and scholarly contributions.',
}

function ProceedingsPage() {
    return (
        <main>
            <ProceedingsContent />
        </main>
    )
}

export default ProceedingsPage