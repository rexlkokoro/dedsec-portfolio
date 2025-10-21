import { useEffect, useState } from 'react'
import BootScreen from './components/BootScreen'
import { beep } from './utils/sfx'
import { unlockAudio } from './utils/sfx'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('booted')
    if (saved === '1') setBooted(true)
  }, [])

  // Ensure audio is unlocked on the first real user gesture so hover beeps can play
  useEffect(() => {
    const unlock = () => unlockAudio()
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('touchstart', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  const completeBoot = () => {
    setBooted(true)
    localStorage.setItem('booted', '1')
  }

  const reboot = () => {
    localStorage.setItem('booted', '0')
    setBooted(false)
    try { window.scrollTo({ top: 0, behavior: 'smooth' }) } catch {}
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-pixel">
      {!booted && <BootScreen onComplete={completeBoot} />}
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
        <footer className="py-12 text-center">
          <button onClick={reboot} onMouseEnter={beep} className="btn-neon">REBOOT SYSTEM</button>
        </footer>
      </main>
    </div>
  )
}

export default App
