import { cn } from '../../utils/cn'

const VARIANTS = {
  primary:
    'bg-signal text-paper hover:brightness-110 shadow-[0_1px_0_rgba(0,0,0,0.05)] disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-transparent text-ink border border-line hover:border-ink/40 hover:bg-paper-dim disabled:opacity-50 disabled:cursor-not-allowed',
  stamp: 'bg-stamp text-paper hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed',
  ghost: 'bg-transparent text-ink-soft hover:text-ink hover:bg-paper-dim disabled:opacity-50',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-200 active:scale-[0.98]',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
