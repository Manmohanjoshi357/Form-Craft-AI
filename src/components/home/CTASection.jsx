import { Link } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import Button from '../ui/Button'

export default function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink px-8 py-16 text-center dark:bg-paper-card sm:px-16">
        <div className="dot-grid absolute inset-0 opacity-[0.08] text-paper" aria-hidden="true" />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
            Your next form is one sentence away.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-paper/70">
            Open the generator, describe what you need, and have a working form before your coffee cools.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as={Link} to="/generator" size="lg" className="bg-paper text-ink hover:brightness-95">
              Open the generator <HiOutlineArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
