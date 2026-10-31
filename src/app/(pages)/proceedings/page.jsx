import React from 'react'
import ProceedingsContent from './Content'
import { proceedingsMetadata } from "@/components/metadata";


export const metadata = proceedingsMetadata;

function ProceedingsPage() {
    return <ProceedingsContent />
}

export default ProceedingsPage