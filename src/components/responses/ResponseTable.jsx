import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi2'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export default function ResponseTable({ responses, onView, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper-card">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-dim/60 font-tag text-[10px] uppercase text-ink-faint">
              <th className="px-5 py-3 font-medium">Form</th>
              <th className="px-5 py-3 font-medium">Fields</th>
              <th className="px-5 py-3 font-medium">Filed</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((r) => (
              <tr key={r.id} className="border-b border-line last:border-b-0 hover:bg-paper-dim/40">
                <td className="px-5 py-4">
                  <p className="font-display font-medium text-ink">{r.formTitle}</p>
                  <p className="font-tag mt-0.5 text-[10px] uppercase text-ink-faint">{r.id.slice(0, 14)}</p>
                </td>
                <td className="px-5 py-4 text-ink-soft">{r.schema?.fields?.length ?? 0}</td>
                <td className="px-5 py-4 text-ink-soft">{formatDate(r.submittedAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(r)}
                      aria-label={`View response for ${r.formTitle}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-signal hover:text-signal"
                    >
                      <HiOutlineEye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(r.id)}
                      aria-label={`Delete response for ${r.formTitle}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-stamp hover:text-stamp"
                    >
                      <HiOutlineTrash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
