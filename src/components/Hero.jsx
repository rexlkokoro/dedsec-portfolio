import { motion } from 'framer-motion'
import RotatingType from './RotatingType'
import { hoverBeep, unlockAudio } from '../utils/sfx'

export default function Hero() {
  const scrollToAbout = () => {
    try { unlockAudio() } catch {}
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28" onMouseOver={hoverBeep}>
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src="/assets/reaper.png"
            alt="Reaper logo"
            className="max-w-xs md:max-w-sm glow flicker"
            onMouseEnter={hoverBeep}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-left"
        >
          <h1 className="text-3xl md:text-5xl font-pixel heading-scan mb-4 glitch" data-text="Identity: Rexl Kokoro" onMouseEnter={hoverBeep}>
            Identity: Rexl Kokoro
          </h1>
          <div className="text-lg md:text-2xl text-[var(--text)] mb-3">
            <RotatingType
              prefix="Hey, I am "
              initial="Manas Kumar Singh"
              roles={[
                'a Programmer.',
                'a Coder.',
                'a Builder.',
                'a Creator.',
                'a Designer.',
                'an Innovator.',
                'a Visionary.',
                'an Artist.',
                'a Poet.',
                'a Storyteller.',
                'a Thinker.',
                'a Philosopher.',
                'a Dreamer.',
                'an Explorer.',
                'a Listener.'
              ]}
              typeSpeed={90}
              deleteSpeed={55}
              startPause={1000}
              endPause={1200}
              betweenPause={250}
            />
          </div>
          <p className="text-[var(--subtext)] text-sm md:text-base mb-8">
            B.Tech CSE | Web Developer | Cyber & AI Enthusiast
          </p>

          <button onClick={scrollToAbout} onMouseEnter={hoverBeep} className="btn-neon">
            ENTER SYSTEM
          </button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(179,225,13,0.06),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(179,225,13,0.05),transparent_40%)]" />
    </section>
  )
}
