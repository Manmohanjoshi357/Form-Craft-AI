import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

export default function ResponseSearch({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <HiOutlineMagnifyingGlass
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by form or answer…"
        className="w-full rounded-full border border-line bg-paper-card py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30"
      />
    </div>
  )
}
