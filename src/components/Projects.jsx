import { motion } from 'framer-motion'
import { hoverBeep } from '../utils/sfx'

const projects = [
  {
    title: 'NeoPedia',
    desc: 'A lightweight offline Wikipedia Q&A system that extracts dumps, indexes articles for fast search, and uses small NLP models to generate concise, context-aware answers.',
    tags: ['Python', 'NLP', 'Indexing'],
  },
  {
    title: 'ASAS (QR Code Attendance)',
    desc: 'A Docker-based attendance tracker integrating QR code and facial recognition (OpenCV + MySQL) to securely verify and log attendance automatically.',
    tags: ['Python', 'OpenCV', 'MySQL', 'Docker'],
  },
  {
    title: 'ICEweather',
    desc: 'A modern, responsive weather application with real-time data, iOS liquid glass style, animated day/night transitions, and dynamic weather effects built using vanilla HTML, CSS, and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
  },
  {
    title: 'Project Strawberry',
    desc: 'A pastel-themed interactive webpage with music playback and smooth modals, combining front-end art and design into a playful, aesthetic micro-project.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI'],
  }
]

export default function Projects() {
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
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -6, rotateX: 0.6, rotateY: -0.6 }}
              className="card-neon rounded-md p-6"
              onMouseEnter={hoverBeep}
              style={{ perspective: '800px' }}
            >
              <div className="text-xl text-[var(--accent)] mb-2">{p.title}</div>
              <p className="text-[var(--text)]/90 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
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
