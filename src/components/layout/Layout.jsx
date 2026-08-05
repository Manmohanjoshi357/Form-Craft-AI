import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ theme, onToggleTheme, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <div className="dot-grid pointer-events-none fixed inset-0 opacity-[0.5] dark:opacity-[0.25]" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar theme={theme} onToggleTheme={onToggleTheme} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
