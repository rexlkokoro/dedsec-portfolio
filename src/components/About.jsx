import { motion } from 'framer-motion'
import { hoverBeep } from '../utils/sfx'

export default function About() {
  const heading = 'B.Tech CSE Student | Web Developer | Cyber & AI Enthusiast'

  const summary1 = `I’m Manas Kumar Singh, a Computer Science and Engineering student driven by curiosity and creativity. I love experimenting with technology, building intuitive web experiences, exploring AI reasoning systems, or tinkering with experimental projects just because it’s possible.`
  const summary2 = `My work spans web development, data systems, and AI experimentation, with a special interest in LLM-based automation and intelligent agents that can plan, adapt, and interact meaningfully.`
  const summary3 = `Outside academics, I take on freelance projects on Discord and Twitter, helping communities and individuals with art, tech projects, and writing. I blend technical depth with personality, building things that not only work, but feel alive.`

  const stacks = [
    { title: 'Frontend Development', items: ['HTML', 'CSS', 'JavaScript'] },
    { title: 'Backend Development', items: ['Python', 'Node.js (JavaScript)'] },
    { title: 'Databases', items: ['SQL', 'SQLite', 'DBMS'] },
    { title: 'AI / Data Systems', items: ['NLP', 'RAG', 'Information Retrieval', 'Data Processing', 'MCP (Memory, Context & Planning)', 'Open Source Debugging', 'Python'] },
    { title: 'Business & Analytics', items: ['Power BI', 'Microsoft Excel', 'BI Analysis'] },
    { title: 'Networking & Systems', items: ['Network Deployment', 'Server Management', 'Computer Hardware Repair'] },
    { title: 'Design & Tools', items: ['AutoCAD', 'Regex', 'Git / GitHub'] },
    { title: 'Deployment & Hosting', items: ['Netlify', 'Vercel', 'GitHub Pages', 'Static Site Hosting'] },
  ]

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
          <p className="text-[var(--text)]/90 leading-relaxed">{summary1}</p>
          <p className="text-[var(--text)]/90 leading-relaxed">{summary2}</p>
          <p className="text-[var(--text)]/90 leading-relaxed">{summary3}</p>
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
              key={s.title}
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
