import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArchiveBox, HiOutlineArrowRight } from 'react-icons/hi2'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { deleteResponse } from '../services/responsesService'
import { KEYS } from '../utils/storage'
import ResponseSearch from '../components/responses/ResponseSearch'
import ResponseTable from '../components/responses/ResponseTable'
import ResponseDetailModal from '../components/responses/ResponseDetailModal'
import EmptyState from '../components/ui/EmptyState'
import FieldTag from '../components/ui/FieldTag'
import Button from '../components/ui/Button'

export default function Responses() {
  const [responses, setResponses] = useLocalStorage(KEYS.RESPONSES, [])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return responses
    return responses.filter((r) => {
      if (r.formTitle.toLowerCase().includes(q)) return true
      return Object.values(r.answers || {}).some((val) => String(val).toLowerCase().includes(q))
    })
  }, [responses, query])

  function handleDelete(id) {
    const next = deleteResponse(id)
    setResponses(next)
    if (active?.id === id) setActive(null)
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <FieldTag>Responses</FieldTag>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            What you&apos;ve collected.
          </h1>
          <p className="mt-3 max-w-xl text-ink-soft">
            Every submission from a generated form is filed here, in your browser&apos;s storage only.
          </p>
        </div>
        {responses.length > 0 && <ResponseSearch value={query} onChange={setQuery} />}
      </div>

      <div className="mt-8">
        {responses.length === 0 ? (
          <EmptyState
            icon={HiOutlineArchiveBox}
            title="Nothing filed yet"
            description="Generate a form and submit it once to see a response appear here."
            action={
              <Button as={Link} to="/generator" size="sm" className="mt-2">
                Go to generator <HiOutlineArrowRight size={14} />
              </Button>
            }
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
