import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckBadge,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2'
import { getFormById, updateForm, publishForm } from '../services/formsService'
import { generateFormSchema } from '../services/geminiService'
import FormRenderer from '../components/generator/FormRenderer'
import ErrorBanner from '../components/generator/ErrorBanner'
import CopyLinkButton from '../components/ui/CopyLinkButton'
import EmptyState from '../components/ui/EmptyState'
import FieldTag from '../components/ui/FieldTag'
import Button from '../components/ui/Button'

export default function FormView() {
  const { formId } = useParams()
  const [form, setForm] = useState(() => getFormById(formId))
  const [renderKey, setRenderKey] = useState(0)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regenError, setRegenError] = useState('')

  useEffect(() => {
    setForm(getFormById(formId))
    setRenderKey(0)
    setRegenError('')
  }, [formId])

  const shareLink = useMemo(() => `${window.location.origin}/form/${formId}`, [formId])

  async function handleRegenerate() {
    if (!form) return
    setIsRegenerating(true)
    setRegenError('')
    try {
      const schema = await generateFormSchema(form.prompt)
      const updated = updateForm(form.id, { schema })
      setForm(updated)
      setRenderKey((k) => k + 1)
    } catch (err) {
      setRegenError(err.message || 'Could not regenerate this form. Try again.')
    } finally {
      setIsRegenerating(false)
    }
  }

  function handleClearFields() {
    setRenderKey((k) => k + 1)
  }

  function handlePublish() {
    const updated = publishForm(form.id)
    setForm(updated)
  }

  if (!form) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <EmptyState
          icon={HiOutlineDocumentMagnifyingGlass}
          title="Form not found"
          description="This form doesn't exist in this browser's storage, or it may have been deleted."
          action={
            <Button as={Link} to="/generator" size="sm" className="mt-2">
              Generate a new form
            </Button>
          }
        />
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
        <HiOutlineArrowLeft size={14} /> Back to dashboard
      </Link>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FieldTag tone={form.published ? 'signal' : 'default'}>
            {form.published ? 'Published' : 'Draft'}
          </FieldTag>
          <span className="font-tag text-[11px] uppercase text-ink-faint">
            Filed {new Date(form.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <CopyLinkButton link={shareLink} />
          {form.published ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-4 py-2 font-tag text-[10px] uppercase text-signal">
              <HiOutlineCheckBadge size={14} /> Live
            </span>
          ) : (
            <Button size="sm" onClick={handlePublish}>
              <HiOutlineRocketLaunch size={14} /> Publish form
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <ErrorBanner message={regenError} />
        <FormRenderer
          key={renderKey}
          schema={form.schema}
          formId={form.id}
          onRegenerate={handleRegenerate}
          onReset={handleClearFields}
          isRegenerating={isRegenerating}
        />
      </div>
    </section>
  )
}
