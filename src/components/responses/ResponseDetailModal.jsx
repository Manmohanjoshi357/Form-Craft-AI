import { useEffect } from 'react'
import { HiOutlineXMark, HiOutlineTrash } from 'react-icons/hi2'
import FieldTag from '../ui/FieldTag'
import Button from '../ui/Button'
import { formatFieldValue } from '../../utils/fieldTypes'

export default function ResponseDetailModal({ response, onClose, onDelete }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!response) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-paper-card shadow-xl animate-rise">
        <div className="flex items-start justify-between border-b border-dashed border-line px-6 py-5">
          <div>
            <FieldTag tone="signal">Filed response</FieldTag>
            <h3 className="mt-2 font-display text-lg font-semibold text-ink">{response.formTitle}</h3>
            <p className="mt-1 text-xs text-ink-faint">
              {new Date(response.submittedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close response detail"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft hover:text-ink"
          >
            <HiOutlineXMark size={16} />
          </button>
        </div>

        <div className="scrollbar-thin max-h-[55vh] overflow-y-auto px-6 py-5">
          <dl className="space-y-4">
            {response.schema.fields.map((field) => (
              <div key={field.id} className="border-b border-line pb-3 last:border-b-0">
                <dt className="font-tag text-[10px] uppercase text-ink-faint">{field.label}</dt>
                <dd className="mt-1 text-sm text-ink">{formatFieldValue(field, response.answers?.[field.id])}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex justify-end gap-3 border-t border-dashed border-line px-6 py-4">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="stamp" size="sm" onClick={() => onDelete(response.id)}>
            <HiOutlineTrash size={14} /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
