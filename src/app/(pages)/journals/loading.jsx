// Skeleton in the shape of the journals page: a forest hero (title and search panel), then the cream list of panels.
export default function Loading() {
  return (
    <main className="sig min-h-screen" aria-busy="true">
      <div className="sig-forest">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:px-10 lg:py-28">
          <div className="space-y-4">
            <span className="block h-7 w-32 animate-pulse bg-[var(--panel)]" />
            <span className="block h-20 w-4/5 animate-pulse bg-[var(--panel)]" />
            <span className="block h-20 w-3/5 animate-pulse bg-[var(--panel)]" />
          </div>
          <span className="block h-56 w-full animate-pulse bg-[var(--panel)]" />
        </div>
      </div>
      <div className="sig-cream">
        <div className="mx-auto grid max-w-[1400px] gap-2 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-[5.5rem_1fr] gap-5 bg-[var(--panel)] p-6">
              <span className="aspect-[3/4] animate-pulse bg-[var(--cream)]" />
              <span className="h-6 w-2/3 animate-pulse bg-[var(--cream)]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
