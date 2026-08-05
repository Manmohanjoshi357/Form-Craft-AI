import { useCallback, useState } from 'react'
import { generateFormSchema } from '../services/geminiService'
import { readJSON, writeJSON, KEYS } from '../utils/storage'

export function useFormGenerator() {
  const [prompt, setPrompt] = useState(() => readJSON(KEYS.DRAFT_PROMPT, ''))
  const [schema, setSchema] = useState(() => readJSON(KEYS.DRAFT_FORM, null))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const updatePrompt = useCallback((value) => {
    setPrompt(value)
    writeJSON(KEYS.DRAFT_PROMPT, value)
  }, [])

  const generate = useCallback(async (overridePrompt) => {
    const targetPrompt = overridePrompt ?? prompt
    setIsLoading(true)
    setError('')
    try {
      const result = await generateFormSchema(targetPrompt)
      setSchema(result)
      writeJSON(KEYS.DRAFT_FORM, result)
      return result
    } catch (err) {
      setError(err.message || 'Something went wrong while generating your form.')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [prompt])

  const reset = useCallback(() => {
    setSchema(null)
    setError('')
    writeJSON(KEYS.DRAFT_FORM, null)
  }, [])

  return { prompt, updatePrompt, schema, setSchema, isLoading, error, generate, reset }
}
