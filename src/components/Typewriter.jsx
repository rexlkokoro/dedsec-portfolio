import { useEffect, useRef, useState } from 'react'
import { getAudioCtx } from '../utils/sfx'

export default function Typewriter({ text = '', speed = 35, startDelay = 0, onDone, className = '', sound = false }) {
  const [display, setDisplay] = useState('')
  const audioRef = useRef(null)

  const click = () => {
    if (!sound) return
    try {
      if (!audioRef.current) {
        const ctxNew = getAudioCtx()
        if (!ctxNew) return
        audioRef.current = ctxNew
      }
      const ctx = audioRef.current
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'square'
      o.frequency.value = 300 + Math.random() * 700 // 300-1000 Hz
      o.connect(g)
      g.connect(ctx.destination)
      const t = ctx.currentTime
      const vol = 0.02 + Math.random() * 0.02
      g.gain.setValueAtTime(vol, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045)
      o.start(t)
      o.stop(t + 0.045)
    } catch {}
  }

  useEffect(() => {
    let index = 0
    let intervalId
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setDisplay(text.slice(0, index))
        if (sound && Math.random() < 0.75) click()
        if (index >= text.length) {
          clearInterval(intervalId)
          onDone && onDone()
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, speed, startDelay, onDone, sound])

  return (
    <span className={className}>
      {display}
      <span className="opacity-60">_</span>
    </span>
  )
}
