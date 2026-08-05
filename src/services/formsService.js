import { readJSON, writeJSON, KEYS } from '../utils/storage'
import { deleteResponsesForForm } from './responsesService'

function generateFormId() {
  return `form_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

export function getAllForms() {
  return readJSON(KEYS.FORMS, [])
}

export function getFormById(formId) {
  return getAllForms().find((form) => form.id === formId) || null
}

export function createForm({ schema, prompt }) {
  const forms = getAllForms()
  const form = {
    id: generateFormId(),
    title: schema.title,
    prompt: prompt || '',
    schema,
    published: false,
    createdAt: new Date().toISOString(),
  }
  writeJSON(KEYS.FORMS, [form, ...forms])
  return form
}

export function updateForm(formId, updates) {
  let updated = null
  const next = getAllForms().map((form) => {
    if (form.id !== formId) return form
    updated = { ...form, ...updates }
    return updated
  })
  writeJSON(KEYS.FORMS, next)
  return updated
}

export function publishForm(formId) {
  return updateForm(formId, { published: true })
}

export function deleteForm(formId) {
  const forms = getAllForms().filter((form) => form.id !== formId)
  writeJSON(KEYS.FORMS, forms)
  deleteResponsesForForm(formId)
  return forms
}
