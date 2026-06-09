import { motion } from 'framer-motion'
import { beep, hoverBeep } from '../utils/sfx'
import { usePortfolio } from '../context/PortfolioContext'

export default function Contact() {
  const { data } = usePortfolio()
  const links = data.contact.links

  return (
    <section id="contact" className="py-20 md:py-28" onMouseOver={hoverBeep}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl mb-6 heading-scan glitch"
          data-text="Contact"
        >
          Contact
        </motion.h2>

        <div className="card-neon rounded-md p-6 md:p-8">
          <ul className="flex flex-wrap gap-3 md:flex-col md:gap-0 md:space-y-3 text-sm md:text-base">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  onMouseEnter={beep}
                  className="inline-flex items-center gap-3 border border-[var(--accent)]/30 md:border-0 md:border-b rounded md:rounded-none px-4 py-2 md:px-0 md:py-0 md:pb-2 hover:border-[var(--accent)] transition-colors"
                >
                  <span className="text-[var(--accent)]">$</span>
                  <span className="glitch" data-text={l.label}>{l.label}</span>
                  <span className="hidden md:inline text-[var(--subtext)]">{l.href.replace('mailto:', '')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
