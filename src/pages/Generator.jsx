import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormGenerator } from '../hooks/useFormGenerator'
import { createForm } from '../services/formsService'
import PromptInput from '../components/generator/PromptInput'
import ErrorBanner from '../components/generator/ErrorBanner'
import LoadingStamp from '../components/ui/LoadingStamp'
import FieldTag from '../components/ui/FieldTag'

export default function Generator() {
  const { prompt, updatePrompt, isLoading, error, generate, reset } = useFormGenerator()
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)

  async function handleGenerate() {
    const schema = await generate()
    if (!schema) return

    setIsSaving(true)
    const form = createForm({ schema, prompt })
    reset()
    navigate(`/form/${form.id}`)
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
      <FieldTag>Generator</FieldTag>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Draft a form from a sentence.
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Gemini reads your description, returns a structured field list, and FormCraft saves it as a
        shareable form — ready to publish, fill, and file.
      </p>

      <div className="mt-8 space-y-6">
        <PromptInput
          prompt={prompt}
          onPromptChange={updatePrompt}
          onGenerate={handleGenerate}
          isLoading={isLoading || isSaving}
        />

        <ErrorBanner message={error} />

        {(isLoading || isSaving) && (
          <LoadingStamp label={isSaving ? 'Filing your new form…' : 'Drafting your fields…'} />
        )}
      </div>
    </section>
  )
}
