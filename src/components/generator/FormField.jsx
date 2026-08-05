import { HiOutlineExclamationCircle, HiOutlinePaperClip } from 'react-icons/hi2'
import { cn } from '../../utils/cn'

const baseInputClasses =
  'w-full rounded-xl border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:outline-none focus:ring-2 focus:ring-signal/30'

function borderClass(hasError) {
  return hasError ? 'border-stamp focus:border-stamp' : 'border-line focus:border-signal'
}

export default function FormField({ field, value, error, onChange }) {
  const hasError = Boolean(error)
  const inputId = `field-${field.id}`

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 flex items-center gap-1.5 font-display text-sm font-medium text-ink">
        {field.label}
        {field.required && <span className="text-stamp">*</span>}
      </label>

      {renderControl({ field, value, onChange, inputId, hasError })}

      {hasError && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-stamp">
          <HiOutlineExclamationCircle size={13} /> {error}
        </p>
      )}
    </div>
  )
}

function renderControl({ field, value, onChange, inputId, hasError }) {
  const common = {
    id: inputId,
    className: cn(baseInputClasses, borderClass(hasError)),
    placeholder: field.placeholder || undefined,
  }

  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          {...common}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )

    case 'checkbox':
      return (
        <label htmlFor={inputId} className="flex items-center gap-2.5 rounded-xl border border-line bg-paper px-4 py-3">
          <input
            id={inputId}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-line accent-[rgb(var(--color-signal))]"
          />
          <span className="text-sm text-ink-soft">{field.placeholder || 'Yes, that applies to me'}</span>
        </label>
      )

    case 'radio':
      return (
        <div className={cn('flex flex-col gap-2 rounded-xl border p-3', borderClass(hasError))}>
          {(field.options || []).map((option) => (
            <label key={option} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-paper-dim">
              <input
                type="radio"
                name={inputId}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="h-4 w-4 accent-[rgb(var(--color-signal))]"
              />
              <span className="text-sm text-ink-soft">{option}</span>
            </label>
          ))}
        </div>
      )

    case 'dropdown':
      return (
        <select {...common} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>
            {field.placeholder || 'Select an option'}
          </option>
          {(field.options || []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )

    case 'file':
      return (
        <label
          htmlFor={inputId}
          className={cn(
            'flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed bg-paper px-4 py-3 text-sm text-ink-faint hover:border-signal hover:text-signal',
            borderClass(hasError)
          )}
        >
          <HiOutlinePaperClip size={16} />
          {value ? value : 'Choose a file to attach'}
          <input
            id={inputId}
            type="file"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
          />
        </label>
      )

    case 'number':
      return <input {...common} type="number" value={value} onChange={(e) => onChange(e.target.value)} />

    case 'date':
      return <input {...common} type="date" value={value} onChange={(e) => onChange(e.target.value)} />

    case 'password':
      return <input {...common} type="password" value={value} onChange={(e) => onChange(e.target.value)} />

    case 'email':
      return <input {...common} type="email" value={value} onChange={(e) => onChange(e.target.value)} />

    case 'phone':
      return <input {...common} type="tel" value={value} onChange={(e) => onChange(e.target.value)} />

    default:
      return <input {...common} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
  }
}
