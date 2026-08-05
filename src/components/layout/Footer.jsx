import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-dim/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 font-display text-base font-bold text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal text-paper">
              <HiOutlineSquares2X2 size={14} />
            </span>
            FormCraft AI
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Describe a form in plain language. FormCraft AI drafts the fields, you keep the data — everything stays
            in this browser.
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <p className="font-tag text-xs uppercase text-ink-faint">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><Link to="/generator" className="hover:text-ink">Generator</Link></li>
              <li><Link to="/responses" className="hover:text-ink">Responses</Link></li>
              <li><Link to="/#features" className="hover:text-ink">Features</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-tag text-xs uppercase text-ink-faint">Guide</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><Link to="/#how-it-works" className="hover:text-ink">How it works</Link></li>
              <li><Link to="/" className="hover:text-ink">Home</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-5 py-4 text-center font-tag text-[11px] uppercase text-ink-faint sm:px-8">
        Filed locally · No server · No account required
      </div>
    </footer>
  )
}
