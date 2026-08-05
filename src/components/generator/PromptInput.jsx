import { HiOutlineSparkles } from 'react-icons/hi2'
import Button from '../ui/Button'
import IndexCard from '../ui/IndexCard'
import FieldTag from '../ui/FieldTag'

const SUGGESTIONS = [
  'Create a college feedback form',
  'Create a job application form',
  'Create an event registration form',
  'Create a customer satisfaction survey',
]

export default function PromptInput({ prompt, onPromptChange, onGenerate, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault()
    onGenerate()
  }

  return (
    <IndexCard className="p-6 sm:p-8">
      <FieldTag tone="signal">Describe your form</FieldTag>
      <h2 className="mt-3 font-display text-xl font-semibold text-ink">What do you want to collect?</h2>
      <p className="mt-1.5 text-sm text-ink-soft">
        Write it the way you&apos;d ask a colleague. Mention specific fields if you already know what you need.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          rows={4}
          placeholder="e.g. Create a job application form with resume upload and years of experience"
          className="w-full resize-none rounded-2xl border border-line bg-paper px-5 py-4 text-base text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30"
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="font-tag text-[11px] uppercase text-ink-faint">
            {prompt.trim().length} characters
          </span>
          <Button type="submit" disabled={isLoading || !prompt.trim()}>
            <HiOutlineSparkles size={16} />
            {isLoading ? 'Generating…' : 'Generate form'}
          </Button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-dashed border-line pt-5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPromptChange(s)}
            className="rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-signal hover:text-signal"
          >
            {s}
          </button>
        ))}
      </div>
    </IndexCard>
  )
}
