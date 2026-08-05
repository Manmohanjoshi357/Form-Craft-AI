import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArrowPath, HiOutlineCheckCircle, HiOutlineTrash } from 'react-icons/hi2'
import FormField from './FormField'
import Button from '../ui/Button'
import IndexCard from '../ui/IndexCard'
import FieldTag from '../ui/FieldTag'
import { emptyValueForField } from '../../utils/fieldTypes'
import { saveResponse } from '../../services/responsesService'

export default function FormRenderer({ schema, formId, onRegenerate, onReset, isRegenerating }) {
  const initialValues = useMemo(() => {
    const values = {}
    schema.fields.forEach((field) => {
      values[field.id] = emptyValueForField(field)
    })
    return values
  }, [schema])

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(fieldId, value) {
    setValues((v) => ({ ...v, [fieldId]: value }))
    setErrors((e) => (e[fieldId] ? { ...e, [fieldId]: null } : e))
  }

  function validate() {
    const nextErrors = {}
    schema.fields.forEach((field) => {
      if (!field.required) return
      const val = values[field.id]
      const isEmpty = field.type === 'checkbox' ? val !== true : !val || String(val).trim() === ''
      if (isEmpty) {
        nextErrors[field.id] = 'This field is required.'
      }
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    saveResponse({ formId, formTitle: schema.title, schema, answers: values })
    setSubmitted(true)
  }

  function handleFillAnother() {
    setValues(initialValues)
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <IndexCard className="flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-signal-soft text-signal">
          <HiOutlineCheckCircle size={26} />
        </div>
        <h3 className="font-display text-xl font-semibold text-ink">Response filed</h3>
        <p className="max-w-sm text-sm text-ink-soft">
          Your answers for &ldquo;{schema.title}&rdquo; were saved to this browser&apos;s response log.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button variant="secondary" onClick={handleFillAnother}>
            Fill it again
          </Button>
          <Button as={Link} to={formId ? `/form/${formId}/responses` : '/responses'} variant="primary">
            View responses
          </Button>
        </div>
      </IndexCard>
    )
  }

  return (
    <IndexCard className="p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-line pb-5">
        <div>
          <FieldTag tone="signal">{schema.fields.length} fields</FieldTag>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink">{schema.title}</h2>
          {schema.description && <p className="mt-1.5 text-sm text-ink-soft">{schema.description}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRegenerate}
            disabled={isRegenerating}
            title="Regenerate from the same prompt"
          >
            <HiOutlineArrowPath size={14} className={isRegenerating ? 'animate-spin' : ''} />
            Regenerate
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onReset} title="Clear this form">
            <HiOutlineTrash size={14} />
            Reset
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        {schema.fields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            value={values[field.id]}
            error={errors[field.id]}
            onChange={(val) => handleChange(field.id, val)}
          />
        ))}

        <div className="flex items-center justify-between border-t border-dashed border-line pt-5">
          <span className="font-tag text-[11px] uppercase text-ink-faint">
            <span className="text-stamp">*</span> required field
          </span>
          <Button type="submit" size="md">
            Submit form
          </Button>
        </div>
      </form>
    </IndexCard>
  )
}
