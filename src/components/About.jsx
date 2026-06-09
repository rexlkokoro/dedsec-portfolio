import { motion } from 'framer-motion'
import { hoverBeep } from '../utils/sfx'
import { usePortfolio } from '../context/PortfolioContext'

export default function About() {
  const { data } = usePortfolio()
  const { heading, summaries, stacks } = data.about

  return (
    <section id="about" className="py-20 md:py-28" onMouseOver={hoverBeep}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl mb-2 heading-scan glitch"
          onMouseEnter={hoverBeep}
          data-text="About Me"
        >
          About Me
        </motion.h2>

        <div className="text-[var(--subtext)] mb-6">{heading}</div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="card-neon rounded-md p-6 md:p-8 space-y-4"
          onMouseEnter={hoverBeep}
        >
          <div className="text-[var(--accent)] font-semibold">Professional Summary</div>
          {summaries.map((s, i) => (
            <p key={i} className="text-[var(--text)]/90 leading-relaxed">{s}</p>
          ))}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mt-10 mb-4 text-xl text-[var(--accent)]"
        >
          Tech Stack
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stacks.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="card-neon rounded-md p-5"
              onMouseEnter={hoverBeep}
            >
              <div className="text-[var(--accent)] font-semibold mb-2">{s.title}</div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs border border-[var(--accent)]/40 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
