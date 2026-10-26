export default function Loading() {
  return (
    <main className="herb min-h-screen" aria-busy="true">
      <div className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet mx-auto grid max-w-[1400px] gap-10 p-5 sm:p-8 lg:grid-cols-2 lg:p-12">
          <div className="space-y-4">
            <span className="block h-14 w-4/5 animate-pulse bg-[var(--rule-soft)]" />
            <span className="block h-14 w-3/5 animate-pulse bg-[var(--rule-soft)]" />
          </div>
          <span className="block h-14 w-full self-end animate-pulse bg-[var(--rule-soft)]" />
        </div>
      </div>
      <div className="px-3 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="border-t border-[var(--ink)]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[4.5rem_1fr] items-center gap-6 border-b border-[var(--rule)] py-4">
                <span className="aspect-[3/4] animate-pulse bg-[var(--rule-soft)]" />
                <span className="h-5 w-2/3 animate-pulse bg-[var(--rule-soft)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
