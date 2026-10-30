// Skeleton in the shape of a journal page: a forest hero (title, cover and facts), then the cream form field.
export default function Loading() {
  return (
    <main className="sig min-h-screen" aria-busy="true">
      <div className="sig-forest">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:px-10 lg:py-28">
          <div className="space-y-4">
            <span className="block h-7 w-28 animate-pulse bg-[var(--panel)]" />
            <span className="block h-16 w-4/5 animate-pulse bg-[var(--panel)]" />
            <span className="block h-5 w-1/2 animate-pulse bg-[var(--panel)]" />
          </div>
          <div className="grid gap-2 sm:grid-cols-[11rem_1fr]">
            <span className="block aspect-[3/4] animate-pulse bg-[var(--panel)]" />
            <span className="block h-full min-h-40 animate-pulse bg-[var(--panel)]" />
          </div>
        </div>
      </div>
      <div className="sig-cream">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[3fr_2fr] lg:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="block h-14 animate-pulse bg-[var(--panel)]" />
            ))}
          </div>
          <span className="block h-64 animate-pulse bg-[var(--panel)]" />
        </div>
      </div>
    </main>
  )
}
