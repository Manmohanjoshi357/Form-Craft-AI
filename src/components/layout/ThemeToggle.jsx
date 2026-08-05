import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-9 w-16 items-center rounded-full border border-line bg-paper-dim px-1 transition-colors"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-paper-card border border-line text-ink shadow-sm transition-transform duration-300 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? <HiOutlineMoon size={14} /> : <HiOutlineSun size={14} />}
      </span>
    </button>
  )
}
