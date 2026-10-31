// app/journals/page.tsx  (Server Component)
import { getJournals } from "@/lib/pocketbase"
import JournalsPageClient from "./journals-page.jsx"   // ← the client component above
import { journalsMetadata } from "@/components/metadata";

export const metadata = journalsMetadata;



export const dynamic = "force-dynamic"

export default async function JournalsPage() {
  const journals = await getJournals()
  return <JournalsPageClient journals={journals} />
}