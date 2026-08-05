import { readJSON, writeJSON, KEYS } from '../utils/storage'

export function getAllResponses() {
  return readJSON(KEYS.RESPONSES, [])
}

export function saveResponse({ formId, formTitle, schema, answers }) {
  const responses = getAllResponses()
  const entry = {
    id: `resp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    formId: formId || null,
    formTitle,
    schema,
    answers,
    submittedAt: new Date().toISOString(),
  }
  const next = [entry, ...responses]
  writeJSON(KEYS.RESPONSES, next)
  return entry
}

export function getResponsesByFormId(formId) {
  return getAllResponses().filter((r) => r.formId === formId)
}

export function deleteResponsesForForm(formId) {
  const responses = getAllResponses().filter((r) => r.formId !== formId)
  writeJSON(KEYS.RESPONSES, responses)
  return responses
}

export function deleteResponse(id) {
  const responses = getAllResponses().filter((r) => r.id !== id)
  writeJSON(KEYS.RESPONSES, responses)
  return responses
}

export function clearAllResponses() {
  writeJSON(KEYS.RESPONSES, [])
}
