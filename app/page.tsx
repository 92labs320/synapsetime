import dynamic from 'next/dynamic'

const TimezoneEngine = dynamic(
  () => import('@/components/TimezoneEngine'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <p className="text-[#00FFFF] text-sm font-mono tracking-widest animate-pulse">
          SYNAPSE<span className="text-white">TIME</span>
        </p>
        <p className="text-gray-700 text-xs">Initializing clocks…</p>
      </div>
    ),
  }
)

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <TimezoneEngine />
    </main>
  )
}
