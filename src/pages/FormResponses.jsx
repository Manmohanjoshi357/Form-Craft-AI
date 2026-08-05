import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { HiOutlineArchiveBox, HiOutlineArrowLeft } from 'react-icons/hi2'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { deleteResponse } from '../services/responsesService'
import { getFormById } from '../services/formsService'
import { KEYS } from '../utils/storage'
import ResponseSearch from '../components/responses/ResponseSearch'
import ResponseTable from '../components/responses/ResponseTable'
import ResponseDetailModal from '../components/responses/ResponseDetailModal'
import EmptyState from '../components/ui/EmptyState'
import FieldTag from '../components/ui/FieldTag'

export default function FormResponses() {
  const { formId } = useParams()
  const form = useMemo(() => getFormById(formId), [formId])
  const [allResponses, setAllResponses] = useLocalStorage(KEYS.RESPONSES, [])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)

  const responses = useMemo(() => allResponses.filter((r) => r.formId === formId), [allResponses, formId])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return responses
    return responses.filter((r) => Object.values(r.answers || {}).some((val) => String(val).toLowerCase().includes(q)))
  }, [responses, query])

  function handleDelete(id) {
    const next = deleteResponse(id)
    setAllResponses(next)
    if (active?.id === id) setActive(null)
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
        <HiOutlineArrowLeft size={14} /> Back to dashboard
      </Link>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <FieldTag>Responses</FieldTag>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {form ? form.title : 'Unknown form'}
          </h1>
          <p className="mt-3 max-w-xl text-ink-soft">
            {responses.length} {responses.length === 1 ? 'response' : 'responses'} filed for this form.
          </p>
        </div>
        {responses.length > 0 && <ResponseSearch value={query} onChange={setQuery} />}
      </div>

      <div className="mt-8">
        {responses.length === 0 ? (
          <EmptyState
            icon={HiOutlineArchiveBox}
            title="No responses yet"
            description="Share this form's link and responses will appear here as people submit it."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={HiOutlineArchiveBox}
            title="No matches"
            description={`Nothing filed matches "${query}". Try a different search term.`}
          />
        ) : (
          <ResponseTable responses={filtered} onView={setActive} onDelete={handleDelete} />
        )}
      </div>

      <ResponseDetailModal response={active} onClose={() => setActive(null)} onDelete={handleDelete} />
    </section>
  )
}
