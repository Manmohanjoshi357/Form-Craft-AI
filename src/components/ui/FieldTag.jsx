import { cn } from '../../utils/cn'

export default function FieldTag({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'text-ink-faint border-line',
    signal: 'text-signal border-signal/40 bg-signal-soft',
    stamp: 'text-stamp border-stamp/40 bg-stamp-soft',
  }
  return (
    <span
      className={cn(
        'font-tag inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
