export function getAudioCtx() {
  try {
    if (typeof window === 'undefined') return null
    if (window.__sfxCtx) return window.__sfxCtx
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return null
    const ctx = new Ctx()
    window.__sfxCtx = ctx
    return ctx
  } catch {
    return null
  }
}


export function unlockAudio() {
  try {
    const ctx = getAudioCtx()
    if (!ctx) return false
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    window.__sfxUnlocked = true
    return true
  } catch {
    return false
  }
}

export function beep(volume = 0.08, duration = 0.05) {
  try {
    const ctx = getAudioCtx()
    if (!ctx) return
    if (ctx.state === 'suspended') {
      try { ctx.resume() } catch {}
    }
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'square'
    o.frequency.value = 400 + Math.random() * 600
    o.connect(g)
    g.connect(ctx.destination)
    const t = ctx.currentTime
    const vol = Math.max(0.005, volume + (Math.random() - 0.5) * 0.02)
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    o.start(t)
    o.stop(t + duration)
  } catch {}
}

let __lastBeep = 0
export function hoverBeep() {
  try {
    const now = Date.now()
    if (now - __lastBeep < 100) return
    __lastBeep = now
    beep(0.1, 0.05)
  } catch {}
}
