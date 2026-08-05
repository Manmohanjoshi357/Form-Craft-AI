import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineRectangleStack } from 'react-icons/hi2'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { KEYS } from '../utils/storage'
import { deleteForm } from '../services/formsService'
import FormCard from '../components/dashboard/FormCard'
import EmptyState from '../components/ui/EmptyState'
import FieldTag from '../components/ui/FieldTag'
import Button from '../components/ui/Button'

export default function Dashboard() {
  const [forms, setForms] = useLocalStorage(KEYS.FORMS, [])
  const [responses] = useLocalStorage(KEYS.RESPONSES, [])

  const responseCounts = useMemo(() => {
    const counts = {}
    responses.forEach((r) => {
      if (!r.formId) return
      counts[r.formId] = (counts[r.formId] || 0) + 1
    })
    return counts
  }, [responses])

  function handleDelete(formId) {
    if (!window.confirm('Delete this form and all of its responses? This cannot be undone.')) return
    const next = deleteForm(formId)
    setForms(next)
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <FieldTag>Dashboard</FieldTag>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your forms.
          </h1>
          <p className="mt-3 max-w-xl text-ink-soft">
            Every form generated in this browser lives here — open it, publish it, or file it away.
          </p>
        </div>
        <Button as={Link} to="/generator" size="md">
          New form <HiOutlineArrowRight size={16} />
        </Button>
      </div>

      <div className="mt-8">
        {forms.length === 0 ? (
          <EmptyState
            icon={HiOutlineRectangleStack}
            title="No forms yet"
            description="Generate your first form and it will show up here, ready to publish and share."
            action={
              <Button as={Link} to="/generator" size="sm" className="mt-2">
                Go to generator <HiOutlineArrowRight size={14} />
              </Button>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {forms.map((form) => (
              <FormCard
                key={form.id}
                form={form}
                responseCount={responseCounts[form.id] || 0}
                onDelete={() => handleDelete(form.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
