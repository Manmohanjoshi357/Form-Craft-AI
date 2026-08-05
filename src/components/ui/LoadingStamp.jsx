export default function LoadingStamp({ label = 'Drafting your form…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="relative h-14 w-14">
        <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
          <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-line" />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-signal animate-stitch"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="font-tag text-xs uppercase text-ink-faint">{label}</p>
    </div>
  )
}
