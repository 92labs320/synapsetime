'use client'

import { useRef, useCallback } from 'react'
import { toZonedTime } from 'date-fns-tz'
import { format } from 'date-fns'

interface CitySliderProps {
  timezone: string
  referenceTime: Date
  onDrag: (newTime: Date) => void
  onRemove: () => void
}

function parseDisplayName(timezone: string): { city: string; region: string } {
  const parts = timezone.split('/')
  if (parts.length === 1) return { city: timezone, region: '' }
  const city = parts[parts.length - 1].replace(/_/g, ' ')
  const region = parts.slice(0, -1).join(' › ').replace(/_/g, ' ')
  return { city, region }
}

function getUTCOffset(timezone: string, date: Date): string {
  try {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    }).formatToParts(date)
    return parts.find(p => p.type === 'timeZoneName')?.value ?? ''
  } catch {
    return ''
  }
}

function getSegmentInfo(hour: number): { label: string; color: string } {
  if (hour >= 9 && hour < 18) return { label: 'Work', color: '#22C55E' }
  if (hour >= 18 && hour < 23) return { label: 'Leisure', color: '#F97316' }
  return { label: 'Sleep', color: '#EF4444' }
}

// Fixed 24h colour gradient — colours represent local hours (same for every timezone)
// sleep: 0h–9h  = 0% → 37.5%
// work:  9h–18h = 37.5% → 75%
// leisure: 18h–23h = 75% → 95.83%
// sleep: 23h–24h = 95.83% → 100%
const BAR_GRADIENT = [
  'rgba(239,68,68,0.55) 0%',
  'rgba(239,68,68,0.55) 37.5%',
  'rgba(34,197,94,0.55) 37.5%',
  'rgba(34,197,94,0.55) 75%',
  'rgba(249,115,22,0.55) 75%',
  'rgba(249,115,22,0.55) 95.83%',
  'rgba(239,68,68,0.55) 95.83%',
  'rgba(239,68,68,0.55) 100%',
].join(', ')

const HOUR_MARKS = [0, 6, 12, 18, 24] as const

export default function CitySlider({
  timezone,
  referenceTime,
  onDrag,
  onRemove,
}: CitySliderProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const zonedDate = toZonedTime(referenceTime, timezone)
  const localHour =
    zonedDate.getHours() +
    zonedDate.getMinutes() / 60 +
    zonedDate.getSeconds() / 3600
  const cursorPct = (localHour / 24) * 100

  const { city, region } = parseDisplayName(timezone)
  const timeStr = format(zonedDate, 'HH:mm:ss')
  const dateStr = format(zonedDate, 'EEE, dd MMM')
  const offset = getUTCOffset(timezone, referenceTime)
  const segment = getSegmentInfo(zonedDate.getHours())

  const computeNewTime = useCallback(
    (clientX: number): Date => {
      const rect = barRef.current!.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const newLocalHour = (x / rect.width) * 24
      const deltaMs = (newLocalHour - localHour) * 3_600_000
      return new Date(referenceTime.getTime() + deltaMs)
    },
    [localHour, referenceTime]
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      isDragging.current = true
      onDrag(computeNewTime(e.clientX))
    },
    [computeNewTime, onDrag]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return
      onDrag(computeNewTime(e.clientX))
    },
    [computeNewTime, onDrag]
  )

  const handlePointerUp = () => {
    isDragging.current = false
  }

  return (
    <div
      className="group relative rounded-xl p-4 border transition-all duration-200 bg-[#050505]"
      style={{ borderColor: 'rgba(55,65,81,0.5)' }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(75,85,99,0.8)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(55,65,81,0.5)'
      }}
    >
      {/* ── City header ── */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
            style={{
              backgroundColor: segment.color,
              boxShadow: `0 0 8px ${segment.color}80`,
            }}
          />
          <div className="min-w-0">
            <p className="text-white font-bold text-base leading-tight truncate">
              {city}
            </p>
            {region && (
              <p className="text-gray-500 text-xs mt-0.5 truncate">{region}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 flex-shrink-0 ml-3">
          <div className="text-right">
            <p
              className="text-xl font-bold tracking-widest tabular-nums leading-tight"
              style={{ color: '#00FFFF' }}
            >
              {timeStr}
            </p>
            <p className="text-gray-500 text-xs mt-0.5">
              {dateStr}
              {offset && (
                <>
                  {' · '}
                  <span style={{ color: segment.color }}>{offset}</span>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${city}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:text-red-400 hover:bg-red-500/10 text-lg leading-none flex-shrink-0"
          >
            ×
          </button>
        </div>
      </div>

      {/* ── 24h colour bar ── */}
      <div
        ref={barRef}
        className="relative h-10 rounded-lg cursor-ew-resize select-none overflow-visible"
        style={{ background: `linear-gradient(to right, ${BAR_GRADIENT})` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Vertical dividers at 6h / 12h / 18h */}
        {[6, 12, 18].map(h => (
          <div
            key={h}
            className="absolute top-0 h-full w-px bg-black/30 pointer-events-none"
            style={{ left: `${(h / 24) * 100}%` }}
          />
        ))}

        {/* Cursor */}
        <div
          className="absolute top-0 h-full pointer-events-none z-10"
          style={{
            left: `${cursorPct}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Vertical line */}
          <div
            className="w-[2px] h-full bg-white"
            style={{
              boxShadow:
                '0 0 8px rgba(255,255,255,0.9), 0 0 18px rgba(0,255,255,0.5)',
            }}
          />
          {/* Top handle */}
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-[2px] border-black"
            style={{ boxShadow: '0 0 6px rgba(0,255,255,0.8)' }}
          />
          {/* Bottom handle */}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-[2px] border-black"
            style={{ boxShadow: '0 0 6px rgba(0,255,255,0.8)' }}
          />
        </div>
      </div>

      {/* ── Hour labels ── */}
      <div className="relative h-5 mt-2">
        {HOUR_MARKS.map((h, i) => (
          <span
            key={h}
            className="absolute text-[10px] text-gray-600 select-none"
            style={{
              left:
                i === 0
                  ? 0
                  : i === HOUR_MARKS.length - 1
                  ? 'auto'
                  : `${(h / 24) * 100}%`,
              right: i === HOUR_MARKS.length - 1 ? 0 : 'auto',
              transform:
                i === 0 || i === HOUR_MARKS.length - 1
                  ? 'none'
                  : 'translateX(-50%)',
            }}
          >
            {h === 24 ? '24h' : `${h}h`}
          </span>
        ))}
      </div>
    </div>
  )
}
