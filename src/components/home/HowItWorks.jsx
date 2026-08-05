import FieldTag from '../ui/FieldTag'

const STEPS = [
  {
    step: '01',
    title: 'Describe your form',
    body: '"Create a job application form" is enough — mention any fields you already know you need.',
  },
  {
    step: '02',
    title: 'Gemini drafts the schema',
    body: 'Your prompt goes to Gemini, which returns a structured JSON blueprint: title, description, and fields.',
  },
  {
    step: '03',
    title: 'FormCraft renders it live',
    body: 'The JSON is parsed and rendered into a real, validating form — every field type, dynamically.',
  },
  {
    step: '04',
    title: 'Collect and review answers',
    body: 'Submissions are filed in your response log, ready to search, open, or delete.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-line bg-paper-dim/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <FieldTag tone="stamp">The process</FieldTag>
        <h2 className="mt-4 max-w-lg font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Four steps, no build tools required.
        </h2>

        <div className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative border-l border-line px-6 py-2 first:border-l-0 sm:first:border-l lg:first:border-l-0">
              <span className="font-tag text-3xl font-semibold text-line">{s.step}</span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              {i < STEPS.length - 1 && (
                <span className="absolute right-0 top-9 hidden h-px w-6 translate-x-full bg-line lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
