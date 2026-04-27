import { MetadataRoute } from 'next'
import citiesData from '@/data/cities.json'

const BASE_URL = 'https://synapsetime.net'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents (São → Sao)
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// Build a validated set of slugs from cities.json
const citySlugMap = new Map<string, { name: string; country: string; timezone: string }>(
  (citiesData as { name: string; country: string; timezone: string }[]).map((c) => [
    slugify(c.name),
    c,
  ])
)

const HUBS = [
  'london', 'new-york', 'tokyo', 'paris', 'dubai',
  'singapore', 'sydney', 'toronto', 'berlin', 'mumbai',
  'shanghai', 'hong-kong', 'seoul', 'sao-paulo', 'mexico-city',
  'lagos', 'cairo', 'moscow', 'los-angeles', 'chicago',
].filter((slug) => citySlugMap.has(slug)) // keep only hubs that exist in cities.json

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                 lastModified: new Date(), changeFrequency: 'daily',   priority: 1 },
    { url: `${BASE_URL}/blog`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/compare`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  ]

  const combinations: MetadataRoute.Sitemap = []

  for (const hubSlug of HUBS) {
    for (const [citySlug] of citySlugMap) {
      if (hubSlug === citySlug) continue // skip self-comparison

      const url = `${BASE_URL}/compare/${hubSlug}-vs-${citySlug}`

      // Guard: never emit a URL that contains "undefined"
      if (url.includes('undefined')) continue

      combinations.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return [...staticPages, ...combinations]
}
