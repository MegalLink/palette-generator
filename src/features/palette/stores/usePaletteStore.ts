import { create } from 'zustand'
import chroma from 'chroma-js'

export type Color = string

interface PaletteStore {
  colors: Color[]
  locked: boolean[]
  history: Color[][]
  saved: Color[][]
  generatePalette: () => void
  toggleLock: (index: number) => void
  applyPaletteToTheme: () => void
  setColor: (index: number, value: string) => void
  restorePalette: (index: number) => void
  clearHistory: () => void
  saveCurrentPalette: () => void
  loadSaved: (index: number) => void
  deleteSaved: (index: number) => void
  clearSaved: () => void
}

export const colorLabels = ['Primary', 'Secondary', 'Accent'] as const
export const cssVars = ['--color-primary', '--color-secondary', '--color-accent'] as const

const LS_KEYS = {
  current: 'pg:palette:current',
  history: 'pg:palette:history',
  saved: 'pg:palette:saved',
} as const

function safeLoad<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as T) : fallback
  } catch {
    return fallback
  }
}

export const usePaletteStore = create<PaletteStore>((set, get) => ({
  colors: safeLoad<Color[]>(LS_KEYS.current, ['#6366f1', '#8b5cf6', '#06b6d4']),
  locked: [false, false, false],
  history: safeLoad<Color[][]>(LS_KEYS.history, []),
  saved: safeLoad<Color[][]>(LS_KEYS.saved, []),
  generatePalette: () => {
    const current = get().colors
    const next = current.map((c, i) => (get().locked[i] ? c : chroma.random().hex()))
    // Evita duplicar si es igual
    const changed = next.some((c, i) => c.toLowerCase() !== current[i].toLowerCase())
    set((s) => {
      const history = changed ? [[...next], ...s.history.slice(0, 14)] : s.history
      if (typeof window !== 'undefined') {
        localStorage.setItem(LS_KEYS.current, JSON.stringify(next))
        localStorage.setItem(LS_KEYS.history, JSON.stringify(history))
      }
      return { colors: next, history }
    })
  },
  toggleLock: (i) => set((s) => ({ locked: s.locked.map((v, idx) => (idx === i ? !v : v)) })),
  setColor: (i, value) => set((s) => {
    const updated = s.colors.map((v, idx) => (idx === i ? value : v))
    if (typeof window !== 'undefined') localStorage.setItem(LS_KEYS.current, JSON.stringify(updated))
    return { colors: updated }
  }),
  restorePalette: (index) => {
    const item = get().history[index]
    if (!item) return
    set((s) => {
      if (typeof window !== 'undefined') localStorage.setItem(LS_KEYS.current, JSON.stringify(item))
      return { colors: [...item], history: s.history }
    })
  },
  clearHistory: () => set(() => {
    if (typeof window !== 'undefined') localStorage.setItem(LS_KEYS.history, JSON.stringify([]))
    return { history: [] }
  }),
  saveCurrentPalette: () => {
    const palette = [...get().colors]
    set((s) => {
      // evita duplicados exactos
      const exists = s.saved.some((p) => p.every((c, i) => c.toLowerCase() === palette[i].toLowerCase()))
      if (exists) return s
      const saved = [palette, ...s.saved].slice(0, 30)
      if (typeof window !== 'undefined') localStorage.setItem(LS_KEYS.saved, JSON.stringify(saved))
      return { saved }
    })
  },
  loadSaved: (index) => {
    const item = get().saved[index]
    if (!item) return
    set(() => {
      if (typeof window !== 'undefined') localStorage.setItem(LS_KEYS.current, JSON.stringify(item))
      return { colors: [...item] }
    })
  },
  deleteSaved: (index) => set((s) => {
    const saved = s.saved.filter((_, i) => i !== index)
    if (typeof window !== 'undefined') localStorage.setItem(LS_KEYS.saved, JSON.stringify(saved))
    return { saved }
  }),
  clearSaved: () => set(() => {
    if (typeof window !== 'undefined') localStorage.setItem(LS_KEYS.saved, JSON.stringify([]))
    return { saved: [] }
  }),
  applyPaletteToTheme: () => {
    const [primary, secondary, accent] = get().colors
    const root = document.documentElement
    root.style.setProperty('--color-primary', primary)
    root.style.setProperty('--color-secondary', secondary)
    root.style.setProperty('--color-accent', accent)

    // Usa el background del tema activo
    const s = getComputedStyle(root)
    const bg = s.getPropertyValue('--color-background').trim() || '#ffffff'

    // Ajuste de borde según fondo
    try {
      const border = chroma(bg).darken(chroma.contrast(bg, '#fff') > 3 ? 0.6 : 0.2).hex()
      root.style.setProperty('--color-border', border)
    } catch {}

    // Foregrounds en función de sus fondos
    const setFg = (bgVar: string, fgVar: string) => {
      const base = s.getPropertyValue(bgVar).trim() || '#ffffff'
      const best = chroma.contrast(base, '#000') > chroma.contrast(base, '#fff') ? '#000000' : '#ffffff'
      root.style.setProperty(fgVar, best)
    }
    setFg('--color-primary', '--color-primary-foreground')
    setFg('--color-secondary', '--color-secondary-foreground')
    setFg('--color-accent', '--color-accent-foreground')

    // Texto vs fondo del tema
    const bestFg = chroma.contrast(bg, '#000') > chroma.contrast(bg, '#fff') ? '#000000' : '#ffffff'
    root.style.setProperty('--color-foreground', bestFg)

  // Notifica posibles listeners
  window.dispatchEvent(new Event('palette:reapply'))
  },
}))
