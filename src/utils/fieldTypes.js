export const FIELD_TYPES = [
  'text',
  'email',
  'password',
  'number',
  'phone',
  'date',
  'textarea',
  'checkbox',
  'radio',
  'dropdown',
  'file',
]

export const CHOICE_FIELD_TYPES = ['radio', 'dropdown']

export function fieldTag(type) {
  return type ? type.toUpperCase() : 'FIELD'
}

export function emptyValueForField(field) {
  if (field.type === 'checkbox') return false
  return ''
}

export function formatFieldValue(field, value) {
  if (field.type === 'checkbox') return value ? 'Yes' : 'No'
  if (field.type === 'file') return value ? value : 'No file'
  if (value === '' || value === undefined || value === null) return '—'
  return String(value)
}
