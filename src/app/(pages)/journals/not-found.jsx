import { ActionPair, PageHero } from "@/components/signal/page"

export default function NotFound() {
  return (
    <main className="sig min-h-screen">
      <PageHero
        id="journal-missing-title"
        tag="Journals"
        title="Journal not found"
        lead="The journal you're looking for doesn't exist or has been removed from our collection."
        actions={<ActionPair tone="forest" primary={["/journals", "Back to journals"]} secondary={["/submission", "Submit a paper"]} />}
      />
    </main>
  )
}
