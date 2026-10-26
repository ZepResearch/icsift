export default function Loading() {
  return (
    <main className="herb min-h-screen" aria-busy="true">
      <div className="px-3 pt-3 pb-16 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="space-y-4 border-b border-[var(--ink)] pb-10">
            <span className="block h-12 w-3/4 animate-pulse bg-[var(--rule-soft)]" />
            <span className="block h-5 w-1/2 animate-pulse bg-[var(--rule-soft)]" />
          </div>
          <div className="mt-10 grid gap-12 lg:grid-cols-[3fr_2fr]">
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="block h-12 animate-pulse bg-[var(--rule-soft)]" />
              ))}
            </div>
            <span className="block aspect-[3/4] max-w-[260px] animate-pulse bg-[var(--rule-soft)]" />
          </div>
        </div>
      </div>
    </main>
  )
}
