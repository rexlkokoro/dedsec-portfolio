import { motion } from 'framer-motion'
import RotatingType from './RotatingType'
import { hoverBeep, unlockAudio } from '../utils/sfx'
import { usePortfolio } from '../context/PortfolioContext'

export default function Hero() {
  const { data } = usePortfolio()
  const { identityName, realName, subtitle, roles, imageSrc, imageAlt } = data.hero

  const scrollToAbout = () => {
    try { unlockAudio() } catch {}
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const identityLabel = `Identity: ${identityName}`

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
            src={imageSrc}
            alt={imageAlt}
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
          <h1 className="text-3xl md:text-5xl font-pixel heading-scan mb-4 glitch" data-text={identityLabel} onMouseEnter={hoverBeep}>
            {identityLabel}
          </h1>
          <div className="text-lg md:text-2xl text-[var(--text)] mb-3">
            <RotatingType
              prefix="Hey, I am "
              initial={realName}
              roles={roles}
              typeSpeed={90}
              deleteSpeed={55}
              startPause={1000}
              endPause={1200}
              betweenPause={250}
            />
          </div>
          <p className="text-[var(--subtext)] text-sm md:text-base mb-8">
            {subtitle}
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
