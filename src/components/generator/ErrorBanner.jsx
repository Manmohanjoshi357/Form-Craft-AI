import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

export default function ErrorBanner({ message }) {
  if (!message) return null
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-stamp/40 bg-stamp-soft px-5 py-4 text-sm text-stamp">
      <HiOutlineExclamationTriangle size={18} className="mt-0.5 shrink-0" />
      <div>
        <p className="font-display font-semibold">Couldn&apos;t generate that form</p>
        <p className="mt-0.5 text-stamp/90">{message}</p>
      </div>
    </div>
  )
}
