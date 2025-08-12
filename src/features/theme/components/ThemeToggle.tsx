import { useEffect, useState } from 'react'
import chroma from 'chroma-js'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

    // Recalcula variables derivadas basadas en el background del tema activo
    const recalc = () => {
      const s = getComputedStyle(document.documentElement)
      const bg = s.getPropertyValue('--color-background').trim() || '#ffffff'

      // Border en función del fondo
      try {
        const border = chroma(bg).darken(chroma.contrast(bg, '#fff') > 3 ? 0.6 : 0.2).hex()
        root.style.setProperty('--color-border', border)
      } catch {}

      const setFg = (bgVar: string, fgVar: string) => {
        const base = s.getPropertyValue(bgVar).trim() || '#ffffff'
        const best = chroma.contrast(base, '#000') > chroma.contrast(base, '#fff') ? '#000000' : '#ffffff'
        root.style.setProperty(fgVar, best)
      }

      setFg('--color-primary', '--color-primary-foreground')
      setFg('--color-secondary', '--color-secondary-foreground')
      setFg('--color-accent', '--color-accent-foreground')
      setFg('--color-destructive', '--color-destructive-foreground')

      const bestText = chroma.contrast(bg, '#000') > chroma.contrast(bg, '#fff') ? '#000000' : '#ffffff'
      root.style.setProperty('--color-foreground', bestText)

      const muted = s.getPropertyValue('--color-muted').trim() || '#f8fafc'
      const mutedFg = chroma.contrast(muted, '#000') > chroma.contrast(muted, '#fff') ? '#111827' : '#94a3b8'
      root.style.setProperty('--color-muted-foreground', mutedFg)
    }

    // Espera al siguiente frame para asegurar cascada aplicada
    requestAnimationFrame(recalc)

    // Notifica (por compatibilidad) que el tema cambió
  window.dispatchEvent(new Event('palette:reapply'))
  window.dispatchEvent(new Event('theme:changed'))
  }, [isDark])

  return (
    <button className="button" title="Toggle theme" onClick={() => setIsDark((v) => !v)}>
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
