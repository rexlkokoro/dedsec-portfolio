import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Typewriter from './Typewriter'
import { unlockAudio } from '../utils/sfx'

export default function BootScreen({ onComplete }) {
  const lines = [
    'Initializing system...',
    'Loading assets...',
    'Access granted.',
    'Welcome, <PRIVATE_USER>.'
  ]

  const [step, setStep] = useState(0)

  const resumeAudio = () => {
    try { unlockAudio() } catch {}
  }

  useEffect(() => {
    if (step >= lines.length) {
      const t = setTimeout(() => onComplete && onComplete(), 500)
      return () => clearTimeout(t)
    }
  }, [step, lines.length, onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 grid place-items-center bg-black text-[var(--text)] font-pixel"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onMouseDown={resumeAudio}
        onTouchStart={resumeAudio}
      >
        <div className="w-[min(800px,90vw)]">
          <div className="mb-8 text-center">
            <span className="heading-scan text-3xl md:text-4xl glow">SYSTEM BOOT</span>
          </div>
          <div className="bg-[var(--card)]/60 border border-[var(--accent)]/40 rounded-md p-6 text-sm md:text-base tracking-wide">
            {lines.map((t, i) => (
              <div key={i} className="h-6 md:h-7">
                {i === step && (
                  <Typewriter
                    text={t}
                    speed={90}
                    startDelay={i === 0 ? 250 : 250}
                    sound={true}
                    onDone={() => setStep(step + 1)}
                    className="text-[var(--text)]"
                  />
                )}
                {i < step && <span className="text-[var(--subtext)]">{t}</span>}
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute top-4 right-4 btn-neon"
          onClick={() => setStep(lines.length)}
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
