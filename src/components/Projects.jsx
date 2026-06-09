import { motion } from 'framer-motion'
import { hoverBeep } from '../utils/sfx'
import { usePortfolio } from '../context/PortfolioContext'

export default function Projects() {
  const { data } = usePortfolio()
  const projects = data.projects

  return (
    <section id="projects" className="py-20 md:py-28" onMouseOver={hoverBeep}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl mb-6 heading-scan glitch"
          onMouseEnter={hoverBeep}
          data-text="Projects"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -6, rotateX: 0.6, rotateY: -0.6 }}
              className="card-neon rounded-md p-6 flex flex-col"
              onMouseEnter={hoverBeep}
              style={{ perspective: '800px' }}
            >
              <div className="text-xl text-[var(--accent)] mb-2">{p.title}</div>
              <p className="text-[var(--text)]/90 mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs border border-[var(--accent)]/40 rounded">
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[var(--accent)] underline underline-offset-2 hover:opacity-80 mt-1 self-start"
                  onMouseEnter={hoverBeep}
                >
                  View Project →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
