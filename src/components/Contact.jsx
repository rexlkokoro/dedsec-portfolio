import { motion } from 'framer-motion'
import { beep, hoverBeep } from '../utils/sfx'

const links = [
  { label: 'GitHub', href: 'https://github.com/rexlkokoro' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/manas-kumar-singh-03b0b4367/' },
  { label: 'Email', href: 'mailto:manaskumarsingh2005@gmail.com' },
]

export default function Contact() {
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
          <ul className="space-y-3 text-sm md:text-base">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  onMouseEnter={beep}
                  className="inline-flex items-center gap-3 border-b border-[var(--accent)]/30 pb-2 hover:border-[var(--accent)] transition-colors"
                >
                  <span className="text-[var(--accent)]">$</span>
                  <span className="glitch" data-text={l.label}>{l.label}</span>
                  <span className="text-[var(--subtext)]">{l.href.replace('mailto:', '')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
