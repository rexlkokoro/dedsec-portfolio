import { useEffect, useRef, useState } from 'react'

export default function RotatingType({
  prefix = "Hey, I’m ",
  initial = 'Manas Kumar Singh',
  roles = [],
  typeSpeed = 90,
  deleteSpeed = 55,
  startPause = 800,
  endPause = 1200,
  betweenPause = 200,
  className = ''
}) {
  const [display, setDisplay] = useState(prefix + initial)
  const [mode, setMode] = useState('idle') // idle | deleting | typing
  const [roleIndex, setRoleIndex] = useState(0)
  const timerRef = useRef(null)

  // Kick off by deleting the initial suffix after a short pause
  useEffect(() => {
    timerRef.current = setTimeout(() => setMode('deleting'), startPause)
    return () => clearTimeout(timerRef.current)
  }, [startPause])

  useEffect(() => {
    if (mode === 'idle') return

    // Ensure we always keep the prefix intact
    const currentSuffix = display.startsWith(prefix) ? display.slice(prefix.length) : ''

    if (mode === 'deleting') {
      if (currentSuffix.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplay(prefix + currentSuffix.slice(0, -1))
        }, deleteSpeed)
      } else {
        // Done deleting, pause a bit then switch to typing next role
        timerRef.current = setTimeout(() => setMode('typing'), betweenPause)
      }
      return () => clearTimeout(timerRef.current)
    }

    if (mode === 'typing') {
      const targetSuffix = roles.length ? (roles[roleIndex % roles.length]) : ''
      const targetFull = prefix + targetSuffix
      if (display.length < targetFull.length) {
        const nextChar = targetFull.slice(display.length, display.length + 1)
        timerRef.current = setTimeout(() => setDisplay(display + nextChar), typeSpeed)
      } else {
        // Finished typing this role; pause then start deleting for next one
        timerRef.current = setTimeout(() => {
          setMode('deleting')
          setRoleIndex((i) => (i + 1) % Math.max(roles.length, 1))
        }, endPause)
      }
      return () => clearTimeout(timerRef.current)
    }
  }, [mode, display, prefix, roles, roleIndex, typeSpeed, deleteSpeed, betweenPause, endPause])

  return (
    <span className={className}>
      {display}
      <span className="opacity-60">_</span>
    </span>
  )
}
