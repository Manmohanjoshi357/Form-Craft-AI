import { HiOutlineBolt, HiOutlineShieldCheck, HiOutlineSquares2X2, HiOutlineArchiveBox, HiOutlineAdjustmentsHorizontal, HiOutlineMoon } from 'react-icons/hi2'
import FieldTag from '../ui/FieldTag'

const FEATURES = [
  {
    icon: HiOutlineBolt,
    title: 'One sentence in, a full form out',
    body: 'Describe the form in plain language. FormCraft AI drafts titles, fields, and validation rules in one pass.',
  },
  {
    icon: HiOutlineSquares2X2,
    title: 'Eleven field types, rendered dynamically',
    body: 'Text, email, password, number, phone, date, textarea, checkbox, radio, dropdown, and file upload — no hardcoded layouts.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Required fields, actually enforced',
    body: 'Every generated form validates required fields before it lets someone submit, with clear inline messages.',
  },
  {
    icon: HiOutlineArchiveBox,
    title: 'Responses filed automatically',
    body: 'Every submission lands in your local response log — searchable, viewable, and deletable, entry by entry.',
  },
  {
    icon: HiOutlineAdjustmentsHorizontal,
    title: 'Regenerate or start over',
    body: "Didn't land right? Regenerate from the same prompt or reset the canvas without losing your draft prompt.",
  },
  {
    icon: HiOutlineMoon,
    title: 'Built for both lighting conditions',
    body: 'A considered light and dark palette, not an inverted afterthought — switch anytime from the top bar.',
  },
]

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="max-w-xl">
        <FieldTag>What&apos;s inside</FieldTag>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Everything a form needs, nothing it doesn&apos;t.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-line bg-paper-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_-12px_rgba(20,20,20,0.18)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-soft text-signal transition-colors group-hover:bg-signal group-hover:text-paper">
              <f.icon size={18} />
            </div>
            <p className="mt-4 font-tag text-[10px] uppercase text-ink-faint">FIELD {String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-1 font-display text-base font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
