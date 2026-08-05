import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineSquares2X2, HiBars3, HiXMark } from 'react-icons/hi2'
import ThemeToggle from './ThemeToggle'
import { cn } from '../../utils/cn'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/generator', label: 'Generator' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/responses', label: 'Responses' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <NavLink to="/" className="flex items-center gap-2 font-display text-base font-bold tracking-tight text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-paper">
            <HiOutlineSquares2X2 size={16} />
          </span>
          FormCraft <span className="text-signal">AI</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 font-tag text-xs uppercase transition-colors',
                  isActive ? 'bg-signal-soft text-signal' : 'text-ink-soft hover:text-ink'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            {open ? <HiXMark size={18} /> : <HiBars3 size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 font-tag text-xs uppercase',
                  isActive ? 'bg-signal-soft text-signal' : 'text-ink-soft'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
