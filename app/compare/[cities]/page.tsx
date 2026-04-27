import { Metadata } from 'next'
import citiesData from '@/data/cities.json'

// Force fully dynamic rendering — no static generation, no 404 on unknown slugs
export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Types & helpers
// ---------------------------------------------------------------------------

interface City {
  name: string
  country: string
  timezone: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function getCityBySlug(slug: string): City | undefined {
  return (citiesData as City[]).find((c) => slugify(c.name) === slug)
}

function fallbackCity(slug: string): City {
  const name = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  let timezone = 'UTC'
  try {
    const allTZ = Intl.supportedValuesOf('timeZone')
    timezone =
      allTZ.find(
        (tz) =>
          tz.toLowerCase().includes(slug.replace(/-/g, '_')) ||
          tz.toLowerCase().replace(/_/g, '-').includes(slug)
      ) ?? 'UTC'
  } catch {
    // Intl.supportedValuesOf not available — keep UTC
  }

  return { name, country: '', timezone }
}

function getCity(slug: string): City {
  return getCityBySlug(slug) ?? fallbackCity(slug)
}

function parseSlugs(param: string): { slugA: string; slugB: string } {
  // Split on the literal "-vs-" to handle multi-word city slugs (e.g. "new-york-vs-los-angeles")
  const idx = param.indexOf('-vs-')
  if (idx !== -1) {
    return { slugA: param.slice(0, idx), slugB: param.slice(idx + 4) }
  }
  // Fallback: treat whole param as slugA, compare against UTC
  return { slugA: param, slugB: 'utc' }
}

function getTimezoneOffset(tz: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    }).formatToParts(new Date())
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? 'UTC'
  } catch {
    return 'UTC'
  }
}

function calculateOffsetDifference(tz1: string, tz2: string): number {
  try {
    const now = new Date()
    const d1 = new Date(now.toLocaleString('en-US', { timeZone: tz1 }))
    const d2 = new Date(now.toLocaleString('en-US', { timeZone: tz2 }))
    return Math.round((d1.getTime() - d2.getTime()) / 3_600_000)
  } catch {
    return 0
  }
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { cities: string }
}): Promise<Metadata> {
  const { slugA, slugB } = parseSlugs(params.cities)
  const cityA = getCity(slugA)
  const cityB = getCity(slugB)

  const title = `${cityA.name} vs ${cityB.name} — Décalage horaire | SynapseTime`
  const description = `Comparez l'heure entre ${cityA.name}${cityA.country ? ` (${cityA.country})` : ''} et ${cityB.name}${cityB.country ? ` (${cityB.country})` : ''}. Planifiez vos réunions au bon moment.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://synapsetime.net/compare/${params.cities}`,
    },
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ComparisonPage({
  params,
}: {
  params: { cities: string }
}) {
  const { slugA, slugB } = parseSlugs(params.cities)
  const cityA = getCity(slugA)
  const cityB = getCity(slugB)

  const offsetA = getTimezoneOffset(cityA.timezone)
  const offsetB = getTimezoneOffset(cityB.timezone)
  const diff = calculateOffsetDifference(cityA.timezone, cityB.timezone)
  const absDiff = Math.abs(diff)

  const diffText =
    diff === 0
      ? 'sont sur le même fuseau horaire'
      : diff > 0
      ? `${cityA.name} a ${absDiff} heure(s) d'avance sur ${cityB.name}`
      : `${cityA.name} a ${absDiff} heure(s) de retard sur ${cityB.name}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Quel est le décalage horaire entre ${cityA.name} et ${cityB.name} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Le décalage horaire entre ${cityA.name} (${offsetA}) et ${cityB.name} (${offsetB}) est de ${absDiff} heure(s). Actuellement, ${diffText}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Quel est le meilleur moment pour une réunion entre ${cityA.name} et ${cityB.name} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Le meilleur moment se situe généralement pendant les heures de chevauchement (9h-11h pour la ville la plus à l'ouest). Pour ${cityA.name} et ${cityB.name}, utilisez notre comparateur pour visualiser la grille horaire complète.`,
        },
      },
    ],
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {cityA.name} vs {cityB.name}
        </h1>
        <p className="text-xl text-gray-400">
          Comparaison des fuseaux horaires et planificateur de réunion
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-1">{cityA.name}</h2>
          {cityA.country && (
            <p className="text-gray-500 text-sm mb-4">{cityA.country}</p>
          )}
          <div className="text-3xl font-mono font-bold" style={{ color: '#00FFFF' }}>
            {offsetA}
          </div>
          <p className="text-gray-600 text-xs mt-1">{cityA.timezone}</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-1">{cityB.name}</h2>
          {cityB.country && (
            <p className="text-gray-500 text-sm mb-4">{cityB.country}</p>
          )}
          <div className="text-3xl font-mono font-bold" style={{ color: '#00FFFF' }}>
            {offsetB}
          </div>
          <p className="text-gray-600 text-xs mt-1">{cityB.timezone}</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl text-center mb-12">
        <h3 className="text-xl font-bold mb-2">Décalage Horaire</h3>
        <p className="text-lg text-gray-300">{diffText}.</p>
      </div>

      <section className="space-y-4 text-gray-300">
        <h2 className="text-2xl font-bold text-white">Planifiez votre réunion</h2>
        <p>
          Travailler entre <strong className="text-white">{cityA.name}</strong> et{' '}
          <strong className="text-white">{cityB.name}</strong> nécessite une
          coordination précise. Utilisez le comparateur SynapseTime pour
          visualiser en temps réel les fuseaux horaires et trouver le créneau
          idéal.
        </p>
        <div className="h-48 bg-gray-950 rounded-xl flex items-center justify-center border border-dashed border-gray-800">
          <p className="text-gray-600 text-sm">Grille interactive SynapseTime</p>
        </div>
      </section>
    </main>
  )
}
