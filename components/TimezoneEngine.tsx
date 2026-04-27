'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import CitySlider from './CitySlider'
interface SearchHit {
  label: string
  sublabel: string
  timezone: string
}

const DEFAULT_ZONES = ['America/New_York', 'Europe/Paris', 'Asia/Tokyo']

function getAllTimezones(): string[] {
  try {
    return Intl.supportedValuesOf('timeZone')
  } catch {
    return [
      'UTC',
      'America/New_York',
      'America/Los_Angeles',
      'America/Chicago',
      'America/Sao_Paulo',
      'America/Toronto',
      'Europe/London',
      'Europe/Paris',
      'Europe/Berlin',
      'Europe/Amsterdam',
      'Europe/Moscow',
      'Africa/Cairo',
      'Africa/Johannesburg',
      'Asia/Dubai',
      'Asia/Kolkata',
      'Asia/Bangkok',
      'Asia/Shanghai',
      'Asia/Tokyo',
      'Asia/Seoul',
      'Asia/Singapore',
      'Australia/Sydney',
      'Australia/Melbourne',
      'Pacific/Auckland',
      'Pacific/Honolulu',
    ]
  }
}

function tzCity(tz: string): string {
  const parts = tz.split('/')
  return parts[parts.length - 1].replace(/_/g, ' ')
}

function tzRegion(tz: string): string {
  const parts = tz.split('/')
  return parts.length > 1
    ? parts.slice(0, -1).join(' / ').replace(/_/g, ' ')
    : ''
}

export default function TimezoneEngine() {
  const [zones, setZones] = useState<string[]>(DEFAULT_ZONES)
  const [refTime, setRefTime] = useState<Date>(() => new Date())
  const [isLive, setIsLive] = useState(true)
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<SearchHit[]>([])
  const [showHits, setShowHits] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [citiesData, setCitiesData] = useState<Array<{ name: string; country: string; timezone: string }>>([])
  const [zoneLabels, setZoneLabels] = useState<Record<string, string>>({})

  const allTZ = useRef<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    allTZ.current = getAllTimezones()
  }, [])

  useEffect(() => {
    fetch('/api/cities')
      .then(r => r.json())
      .then(data => setCitiesData(data))
  }, [])

  // Live clock — ticks every second when not frozen
  useEffect(() => {
    if (!isLive) return
    const id = setInterval(() => setRefTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [isLive])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        inputRef.current?.contains(e.target as Node) ||
        dropRef.current?.contains(e.target as Node)
      )
        return
      setShowHits(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const runSearch = useCallback(
    (value: string) => {
      setQuery(value)
      setActiveIdx(-1)
      if (!value.trim()) {
        setHits([])
        setShowHits(false)
        return
      }
      const q = value.toLowerCase()

      // Primary: search cities.json by name or country
      const cityHits: SearchHit[] = citiesData
        .filter(c => !zones.includes(c.timezone))
        .filter(
          c =>
            c.name.toLowerCase().includes(q) ||
            c.country.toLowerCase().includes(q)
        )
        .map(c => ({ label: c.name, sublabel: c.country, timezone: c.timezone }))
        .slice(0, 8)

      // Fallback: supplement with raw Intl timezones if fewer than 8 results
      const cityTZSet = new Set(cityHits.map(h => h.timezone))
      const intlHits: SearchHit[] = allTZ.current
        .filter(tz => !zones.includes(tz) && !cityTZSet.has(tz))
        .filter(
          tz =>
            tz.toLowerCase().includes(q) ||
            tz.toLowerCase().replace(/_/g, ' ').includes(q)
        )
        .slice(0, 8 - cityHits.length)
        .map(tz => ({ label: tzCity(tz), sublabel: tzRegion(tz), timezone: tz }))

      const allHits = [...cityHits, ...intlHits]
      setHits(allHits)
      setShowHits(allHits.length > 0)
    },
    [zones, citiesData]
  )

  const pickZone = useCallback((tz: string, label?: string) => {
    setZones(prev => (prev.includes(tz) ? prev : [...prev, tz]))
    if (label) setZoneLabels(prev => ({ ...prev, [tz]: label }))
    setQuery('')
    setHits([])
    setShowHits(false)
    setActiveIdx(-1)
    inputRef.current?.focus()
  }, [])

  const removeZone = useCallback((tz: string) => {
    setZones(prev => prev.filter(z => z !== tz))
    setZoneLabels(prev => { const next = { ...prev }; delete next[tz]; return next })
  }, [])

  const handleDrag = useCallback((t: Date) => {
    setIsLive(false)
    setRefTime(t)
  }, [])

  const goLive = () => {
    setIsLive(true)
    setRefTime(new Date())
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showHits || hits.length === 0) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIdx(i => Math.min(i + 1, hits.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIdx(i => Math.max(i - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIdx >= 0) pickZone(hits[activeIdx].timezone, hits[activeIdx].label)
        else if (hits.length > 0) pickZone(hits[0].timezone, hits[0].label)
        break
      case 'Escape':
        setShowHits(false)
        break
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      {/* ── Header ── */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-widest select-none">
            <span style={{ color: '#00FFFF' }}>SYNAPSE</span>
            <span className="text-white">TIME</span>
          </h1>
          <p className="text-gray-300 text-xs mt-1 tracking-wide">
            Drag any cursor · all zones sync in real time
          </p>
        </div>

        {isLive ? (
          <div
            className="flex items-center gap-2 text-xs select-none mt-1 flex-shrink-0"
            style={{ color: '#9CA3AF' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Live
          </div>
        ) : (
          <button
            type="button"
            onClick={goLive}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all mt-0.5 flex-shrink-0 hover:bg-cyan-950/20"
            style={{ borderColor: 'rgba(0,255,255,0.35)', color: '#00FFFF' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block" />
            Back to Live
          </button>
        )}
      </header>

      {/* ── Search bar ── */}
      <div className="relative">
        <div
          className="flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-200"
          style={{
            borderColor: showHits ? '#00FFFF' : 'rgba(55,65,81,0.6)',
            backgroundColor: '#080808',
            boxShadow: showHits
              ? '0 0 0 1px rgba(0,255,255,0.12)'
              : 'none',
          }}
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            style={{ color: '#4B5563' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => runSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => hits.length > 0 && setShowHits(true)}
            placeholder="Search city or timezone… (Tokyo, Paris, UTC)"
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-700 min-w-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setHits([])
                setShowHits(false)
              }}
              className="text-gray-700 hover:text-gray-400 transition-colors text-xl leading-none flex-shrink-0"
            >
              ×
            </button>
          )}
        </div>

        {/* ── Autocomplete dropdown ── */}
        {showHits && hits.length > 0 && (
          <div
            ref={dropRef}
            className="absolute z-50 w-full mt-1 rounded-xl border border-gray-800 overflow-hidden animate-fade-in"
            style={{ backgroundColor: '#080808' }}
          >
            {hits.map((hit, idx) => (
              <button
                key={`${hit.timezone}-${hit.label}`}
                type="button"
                onClick={() => pickZone(hit.timezone, hit.label)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-gray-900/70"
                style={{
                  backgroundColor:
                    idx === activeIdx ? 'rgba(0,255,255,0.05)' : undefined,
                  borderLeft: `2px solid ${
                    idx === activeIdx ? '#00FFFF' : 'transparent'
                  }`,
                }}
              >
                <span className="text-white text-sm">{hit.label}</span>
                <span className="text-gray-600 text-xs ml-4 truncate">
                  {hit.sublabel}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs select-none">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-2.5 rounded-sm"
            style={{ backgroundColor: 'rgba(34,197,94,0.6)' }}
          />
          <span className="text-gray-300">Work (9h–18h)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-2.5 rounded-sm"
            style={{ backgroundColor: 'rgba(249,115,22,0.6)' }}
          />
          <span className="text-gray-300">Leisure (18h–23h)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-2.5 rounded-sm"
            style={{ backgroundColor: 'rgba(239,68,68,0.6)' }}
          />
          <span className="text-gray-300">Sleep (23h–9h)</span>
        </div>
      </div>

      {/* ── Sliders ── */}
      <div className="space-y-3">
        {zones.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-3 text-gray-700">
            <svg
              className="w-10 h-10 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-gray-400">No timezones added</p>
            <p className="text-xs text-gray-400">
              Search for a city above to get started
            </p>
          </div>
        ) : (
          zones.map(tz => (
            <CitySlider
              key={tz}
              timezone={tz}
              cityName={zoneLabels[tz]}
              referenceTime={refTime}
              onDrag={handleDrag}
              onRemove={() => removeZone(tz)}
            />
          ))
        )}
      </div>

      {/* ── Footer ── */}
      {zones.length > 0 && (
        <footer className="text-center pt-2 border-t border-gray-900">
          <p className="text-gray-400 text-xs">
            {zones.length} zone{zones.length !== 1 ? 's' : ''} active ·
            Drag a cursor to freeze · &quot;Back to Live&quot; to resume
          </p>
        </footer>
      )}
    </div>
  )
}
