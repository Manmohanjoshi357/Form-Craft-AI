# FormCraft AI

Describe a form in plain language and get a fully working, validating form back — rendered live from a Gemini-generated JSON schema. Frontend-only: no backend, no database, no auth. Responses are stored in your browser's Local Storage.

## Stack

- React 18 + Vite 6
- JavaScript (no TypeScript)
- Tailwind CSS 3 (PostCSS-based, `tailwind.config.js` + `postcss.config.js`)
- React Router 6
- React Icons
- Gemini API (`gemini-2.0-flash`, called directly via `fetch`)
- Local Storage (no backend of any kind)

## Getting started

```bash
npm install
cp .env.example .env
# edit .env and paste your Gemini API key
npm run dev
```

Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey), then set it in `.env`:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Restart `npm run dev` after editing `.env` — Vite only reads env files on startup.

## Building for production

```bash
npm run build
npm run preview
```

The build output in `dist/` is fully static and can be hosted anywhere (Netlify, Vercel, GitHub Pages, S3, etc.) — there is no server component.

## How it works

1. **Generator page** — you describe the form you want in a textarea.
2. Your prompt is sent to the Gemini API with a system instruction that asks for a strict JSON schema (`title`, `description`, `fields[]`).
3. The response is parsed defensively — malformed or fenced JSON is cleaned up, unknown field types fall back to `text`, and `radio`/`dropdown` fields without valid options get sensible defaults.
4. The schema is rendered into a live form by `FormRenderer` / `FormField` — every one of the 11 supported field types (text, email, password, number, phone, date, textarea, checkbox, radio, dropdown, file) is handled dynamically, nothing is hardcoded per-form.
5. Submitting validates required fields client-side, then saves the answers to Local Storage.
6. **Responses page** — lists every filed response in a searchable table; you can view a full response in a modal or delete it.

## Project structure

```
src/
  components/
    layout/      Navbar, Footer, Layout, ThemeToggle
    home/        Hero, Features, HowItWorks, CTASection
    generator/   PromptInput, FormField, FormRenderer, ErrorBanner
    responses/   ResponseSearch, ResponseTable, ResponseDetailModal
    ui/          Button, IndexCard, FieldTag, LoadingStamp, EmptyState
  pages/         Home, Generator, Responses
  services/      geminiService.js, responsesService.js
  hooks/         useTheme, useLocalStorage, useFormGenerator
  utils/         cn.js, fieldTypes.js, storage.js
```

## Notes

- Draft prompts and generated (but not yet submitted) forms are cached in Local Storage too, so a page refresh on the Generator page won't lose your work.
- Light and dark mode are both fully styled and persisted across sessions.
- If `VITE_GEMINI_API_KEY` is missing, the Generator page shows a clear inline error instead of failing silently.
