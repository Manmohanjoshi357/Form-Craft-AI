const KEYS = {
  RESPONSES: 'formcraft_responses',
  FORMS: 'formcraft_forms',
  THEME: 'formcraft_theme',
  DRAFT_FORM: 'formcraft_draft_form',
  DRAFT_PROMPT: 'formcraft_draft_prompt',
}

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeKey(key) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

export { KEYS }
