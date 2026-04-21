import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: { cities: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const raw = decodeURIComponent(params.cities)
  const cityList = raw
    .split(',')
    .map(c => c.trim().split('/').pop()?.replace(/_/g, ' ') ?? c.trim())
    .join(' vs ')

  return {
    title: `${cityList} — SynapseTime`,
    description: `Compare timezones: ${cityList}. Drag the cursor to sync all clocks.`,
    openGraph: {
      title: `${cityList} Timezone Comparison`,
      description: `Real-time timezone comparison for ${cityList}.`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${cityList} — SynapseTime`,
      description: `Real-time timezone comparison for ${cityList}.`,
    },
  }
}

export default function ComparePage({ params }: Props) {
  const raw = decodeURIComponent(params.cities)
  const zones = raw.split(',').map(z => z.trim())

  return (
    <main className="min-h-screen bg-black font-mono flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-widest">
          <span style={{ color: '#00FFFF' }}>SYNAPSE</span>
          <span className="text-white">TIME</span>
        </h1>
        <p className="text-gray-500 text-sm">Shared comparison link</p>
      </div>

      <div
        className="border rounded-xl p-6 max-w-sm w-full space-y-3"
        style={{ borderColor: 'rgba(55,65,81,0.5)', backgroundColor: '#050505' }}
      >
        <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-4">
          Timezones in this view
        </p>
        {zones.map((zone, i) => {
          const city = zone.split('/').pop()?.replace(/_/g, ' ') ?? zone
          const region = zone.includes('/')
            ? zone.split('/').slice(0, -1).join('/').replace(/_/g, ' ')
            : ''
          return (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#00FFFF' }}
              />
              <span className="text-white text-sm">{city}</span>
              {region && (
                <span className="text-gray-600 text-xs ml-auto">{region}</span>
              )}
            </div>
          )
        })}
      </div>

      <Link
        href="/"
        className="text-sm transition-all hover:underline underline-offset-4"
        style={{ color: '#00FFFF' }}
      >
        ← Open in SynapseTime
      </Link>
    </main>
  )
}
