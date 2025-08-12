import { create } from 'zustand'

interface GlassState {
  blur: number // px
  refraction: number // alpha multiplier for background color lightness overlay
  depth: number // shadow intensity
  apply: () => void
  setBlur: (v: number) => void
  setRefraction: (v: number) => void
  setDepth: (v: number) => void
  reset: () => void
}

const LS_KEY = 'pg:glass:config'

function persist(p: { blur: number; refraction: number; depth: number }) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(p)) } catch {}
}

function load() {
  try { const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : null } catch { return null }
}

export const useGlassStore = create<GlassState>((set, get) => ({
  blur: load()?.blur ?? 20,
  refraction: load()?.refraction ?? 0.25,
  depth: load()?.depth ?? 10,
  apply: () => {
    const { blur, refraction, depth } = get()
    const root = document.documentElement
    const isDark = root.classList.contains('dark')
  // Use white as base for translucent pane regardless of theme so refraction only changes alpha
  const bg = '255 255 255'
  const border = isDark ? '148 163 184' : '255 255 255'
    root.style.setProperty('--glass-backdrop', `blur(${blur}px)`)
    root.style.setProperty('--glass-bg', `rgba(${bg}, ${refraction})`)
    const t = Math.min(Math.max(depth, 0), 40) / 40 // normalize 0..1
    const borderAlpha = Math.min(0.05 + depth / 80, 0.5).toFixed(2)
    root.style.setProperty('--glass-border', `rgba(${border}, ${borderAlpha})`)
    // Layered shadow: outer drop, top highlight, bottom subtle, inner glow scaled by depth
    const outerBlur = Math.round(32 + 12 * t) // 32 -> 44
    const glowBlur = (46 + (60 - 46) * t).toFixed(1) // 46 -> 60
    const glowSpread = (23 + (30 - 23) * t).toFixed(1) // 23 -> 30
    // Alpha > 1 no válido; escalamos dentro de 0..1 (user example usaba 2.3..3 para indicar intensidad)
    const glowAlpha = (0.6 + 0.3 * t).toFixed(2) // 0.60 -> 0.90
    const multi = [
      `0 8px ${outerBlur}px rgba(0,0,0,0.1)`,
      `inset 0 1px 0 rgba(255,255,255,0.5)`,
      `inset 0 -1px 0 rgba(255,255,255,0.1)`,
      `inset 0 0 ${glowBlur}px ${glowSpread}px rgba(255,255,255,${glowAlpha})`
    ].join(', ')
    root.style.setProperty('--glass-shadow', multi)
  },
  setBlur: (v) => { set({ blur: v }); persist({ blur: v, refraction: get().refraction, depth: get().depth }); get().apply() },
  setRefraction: (v) => { set({ refraction: v }); persist({ blur: get().blur, refraction: v, depth: get().depth }); get().apply() },
  setDepth: (v) => { set({ depth: v }); persist({ blur: get().blur, refraction: get().refraction, depth: v }); get().apply() },
  reset: () => { set({ blur: 20, refraction: 0.25, depth: 10 }); persist({ blur: 20, refraction: 0.25, depth: 10 }); get().apply() }
}))

if (typeof window !== 'undefined') {
  requestAnimationFrame(() => {
    try { useGlassStore.getState().apply() } catch {}
  })
}
