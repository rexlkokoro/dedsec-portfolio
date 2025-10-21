import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dedsec, setDedsec] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme-dedsec')
    const isDedsec = saved === '1'
    setDedsec(isDedsec)
    document.documentElement.classList.toggle('dedsec', isDedsec)
  }, [])

  const toggle = () => {
    const next = !dedsec
    setDedsec(next)
    localStorage.setItem('theme-dedsec', next ? '1' : '0')
    document.documentElement.classList.toggle('dedsec', next)
  }

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-40 btn-neon bg-black/40"
      aria-label="Toggle DedSec theme"
    >
      {dedsec ? 'DedSec Mode' : 'Normal Mode'}
    </button>
  )
}
