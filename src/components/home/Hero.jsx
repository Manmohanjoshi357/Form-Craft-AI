import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSparkles } from 'react-icons/hi2'
import Button from '../ui/Button'
import FieldTag from '../ui/FieldTag'
import IndexCard from '../ui/IndexCard'

const MOCK_FIELDS = [
  { tag: 'TEXT', label: 'Full name' },
  { tag: 'EMAIL', label: 'Work email' },
  { tag: 'RADIO', label: 'Team size' },
  { tag: 'TEXTAREA', label: 'What are you building?' },
]

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-rise">
          <FieldTag tone="signal">
            <HiOutlineSparkles className="mr-1.5" size={12} /> Prompt to form, in seconds
          </FieldTag>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Describe the form.
            <br />
            <span className="text-signal">FormCraft</span> files the fields.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Type a sentence, get a fully working form — validation, field types, and a response log included.
            No drag-and-drop builder, no backend to run, no account to create.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button as={Link} to="/generator" size="lg">
              Start drafting <HiOutlineArrowRight size={16} />
            </Button>
            <Button as={Link} to="/responses" variant="secondary" size="lg">
              View responses
            </Button>
          </div>
          <p className="mt-6 font-tag text-[11px] uppercase text-ink-faint">
            Frontend only · Gemini-powered · Stored in your browser
          </p>
        </div>

        <div className="relative animate-rise [animation-delay:120ms] [animation-fill-mode:backwards]">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-signal-soft/60 blur-2xl" aria-hidden="true" />
          <IndexCard className="p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-dashed border-line pb-4">
              <div>
                <p className="font-tag text-[10px] uppercase text-ink-faint">Generated just now</p>
                <h3 className="font-display text-lg font-semibold text-ink">Product Feedback Form</h3>
              </div>
              <FieldTag>04 fields</FieldTag>
            </div>
            <ul className="mt-5 space-y-3.5">
              {MOCK_FIELDS.map((field, i) => (
                <li
                  key={field.label}
                  className="flex items-center gap-3 rounded-xl border border-line bg-paper-dim/50 px-3.5 py-3 animate-rise"
                  style={{ animationDelay: `${220 + i * 110}ms`, animationFillMode: 'backwards' }}
                >
                  <span className="font-tag shrink-0 text-[10px] text-signal">{field.tag}</span>
                  <span className="h-px flex-1 bg-line" />
                  <span className="text-sm text-ink-soft">{field.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-tag text-[10px] uppercase text-ink-faint">Ready to publish</span>
              <span className="rounded-full bg-signal px-4 py-2 font-tag text-[10px] uppercase text-paper">
                Submit
              </span>
            </div>
          </IndexCard>
        </div>
      </div>
    </section>
  )
}
