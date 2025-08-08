import { create } from 'zustand'
import chroma from 'chroma-js'

export type Color = string

interface PaletteStore {
  colors: Color[]
  locked: boolean[]
  generatePalette: () => void
  toggleLock: (index: number) => void
  applyPaletteToTheme: () => void
  setColor: (index: number, value: string) => void
}

export const colorLabels = ['Primary', 'Secondary', 'Accent'] as const
export const cssVars = ['--color-primary', '--color-secondary', '--color-accent'] as const

export const usePaletteStore = create<PaletteStore>((set, get) => ({
  colors: ['#6366f1', '#8b5cf6', '#06b6d4'], // primary, secondary, accent
  locked: [false, false, false],
  generatePalette: () => {
    const current = get().colors
    const next = current.map((c, i) => (get().locked[i] ? c : chroma.random().hex()))
    set({ colors: next })
  },
  toggleLock: (i) => set((s) => ({ locked: s.locked.map((v, idx) => (idx === i ? !v : v)) })),
  setColor: (i, value) => set((s) => ({ colors: s.colors.map((v, idx) => (idx === i ? value : v)) })),
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
