import { create } from 'zustand'
import chroma from 'chroma-js'

interface NeomorphismStore {
  distance: number
  blur: number
  intensity: number // multiplier for darken/brighten
  apply: () => void
  setDistance: (v: number) => void
  setBlur: (v: number) => void
  setIntensity: (v: number) => void
  reset: () => void
}

const LS_KEY = 'pg:neo:config'

function persist(partial: { distance: number; blur: number; intensity: number }) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(partial)) } catch {}
}

function load() {
  try { const raw = localStorage.getItem(LS_KEY); if (!raw) return null; return JSON.parse(raw) } catch { return null }
}

export const useNeomorphismStore = create<NeomorphismStore>((set, get) => ({
  distance: load()?.distance ?? 20,
  blur: load()?.blur ?? 60,
  intensity: load()?.intensity ?? 1.2,
  apply: () => {
    const { distance, blur, intensity } = get()
    const root = document.documentElement
    const s = getComputedStyle(root)
    const bg = s.getPropertyValue('--color-background').trim() || '#ffffff'
    try {
      const light = chroma(bg).brighten(intensity).hex()
      const dark = chroma(bg).darken(intensity).hex()
      const d = distance
      const b = blur
      const outer = `${d}px ${d}px ${b}px ${dark}, -${d}px -${d}px ${b}px ${light}`
      const inset = `inset ${d}px ${d}px ${b}px ${dark}, inset -${d}px -${d}px ${b}px ${light}`
      root.style.setProperty('--shadow-neu-light', outer)
      root.style.setProperty('--shadow-neu-inset', inset)
    } catch {}
  },
  setDistance: (v) => { set({ distance: v }); persist({ distance: v, blur: get().blur, intensity: get().intensity }); get().apply() },
  setBlur: (v) => { set({ blur: v }); persist({ distance: get().distance, blur: v, intensity: get().intensity }); get().apply() },
  setIntensity: (v) => { set({ intensity: v }); persist({ distance: get().distance, blur: get().blur, intensity: v }); get().apply() },
  reset: () => { set({ distance: 20, blur: 60, intensity: 1.2 }); persist({ distance: 20, blur: 60, intensity: 1.2 }); get().apply() }
}))

// Auto-apply on load in browser
if (typeof window !== 'undefined') {
  requestAnimationFrame(() => {
    try { useNeomorphismStore.getState().apply() } catch {}
  })
}
