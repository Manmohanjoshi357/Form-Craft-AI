import { cn } from '../../utils/cn'

export default function IndexCard({ className = '', notch = true, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-paper-card shadow-[0_1px_2px_rgba(20,20,20,0.04)]',
        notch && 'card-notch',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
