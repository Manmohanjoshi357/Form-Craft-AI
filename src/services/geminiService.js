const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = 'gemini-flash-latest'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const ALLOWED_TYPES = [
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

function buildSystemPrompt(userPrompt) {
  return `You are a form-schema generator. Given a description of a form, output ONLY a single valid JSON object describing that form. Do not include markdown fences, explanations, or any text outside the JSON.

The JSON must follow this exact shape:
{
  "title": "string",
  "description": "string",
  "fields": [
    {
      "type": "one of: ${ALLOWED_TYPES.join(', ')}",
      "label": "string",
      "required": true or false,
      "options": ["only for radio and dropdown fields, an array of 2-6 short strings"],
      "placeholder": "optional short placeholder string"
    }
  ]
}

Rules:
- Produce between 4 and 10 fields that make sense for the request.
- Always include "options" for "radio" and "dropdown" fields, never for other types.
- Never include an "options" key for field types other than radio or dropdown.
- Keep labels concise and human-friendly.
- Include a submit-worthy set of fields, do not add a literal submit button field, the app renders that automatically.
- Respond with raw JSON only, no code fences, no commentary.

Form request: "${userPrompt}"`
}

function extractJSON(text) {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenced ? fenced[1] : trimmed
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1 || end < start) {
    throw new Error('No JSON object found in the response.')
  }
  return candidate.slice(start, end + 1)
}

function normalizeSchema(schema) {
  if (!schema || typeof schema !== 'object') {
    throw new Error('The generated schema was not an object.')
  }
  if (!Array.isArray(schema.fields) || schema.fields.length === 0) {
    throw new Error('The generated schema had no fields.')
  }

  const fields = schema.fields
    .filter((f) => f && typeof f.label === 'string' && f.label.trim().length > 0)
    .map((f, index) => {
      const type = ALLOWED_TYPES.includes(f.type) ? f.type : 'text'
      const needsOptions = type === 'radio' || type === 'dropdown'
      let options = Array.isArray(f.options) ? f.options.filter((o) => typeof o === 'string' && o.trim()) : []
      if (needsOptions && options.length < 2) {
        options = ['Option A', 'Option B', 'Option C']
      }
      return {
        id: `field_${index}_${Date.now()}`,
        type,
        label: f.label.trim(),
        required: Boolean(f.required),
        placeholder: typeof f.placeholder === 'string' ? f.placeholder : '',
        options: needsOptions ? options : undefined,
      }
    })

  if (fields.length === 0) {
    throw new Error('No valid fields could be parsed from the schema.')
  }

  return {
    title: typeof schema.title === 'string' && schema.title.trim() ? schema.title.trim() : 'Untitled Form',
    description: typeof schema.description === 'string' ? schema.description.trim() : '',
    fields,
  }
}

export async function generateFormSchema(userPrompt) {
  if (!userPrompt || !userPrompt.trim()) {
    throw new Error('Please describe the form you want to create.')
  }

  if (!API_KEY) {
    throw new Error(
      'Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env file and restart the dev server.'
    )
  }

  let response
  try {
    response = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: buildSystemPrompt(userPrompt) }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: 'application/json',
        },
      }),
    })
  } catch {
    throw new Error('Could not reach Gemini. Check your internet connection and try again.')
  }

  if (!response.ok) {
    let message = `Gemini request failed (${response.status}).`
    try {
      const errBody = await response.json()
      if (errBody?.error?.message) message = errBody.error.message
    } catch {
      /* ignore parse failure */
    }
    throw new Error(message)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') ?? ''

  if (!text) {
    throw new Error('Gemini returned an empty response. Try rephrasing your prompt.')
  }

  let parsed
  try {
    const jsonText = extractJSON(text)
    parsed = JSON.parse(jsonText)
  } catch {
    throw new Error('Gemini returned malformed JSON. Try generating again.')
  }

  return normalizeSchema(parsed)
}
