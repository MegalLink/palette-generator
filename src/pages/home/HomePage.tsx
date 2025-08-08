import { useEffect, useState } from 'react'
import chroma from 'chroma-js'
import { Card } from '../../shared/components/Card'
import { usePaletteStore, colorLabels, cssVars } from '../../features/palette/stores/usePaletteStore'

export function HomePage() {
  const { colors, locked, generatePalette, toggleLock, applyPaletteToTheme, setColor } = usePaletteStore()
  const [textVars, setTextVars] = useState<{ name: string; value: string }[]>([])

  const refreshTextVars = () => {
    const names = [
      '--color-foreground',
      '--color-primary-foreground',
      '--color-secondary-foreground',
      '--color-accent-foreground',
    ]
    const s = getComputedStyle(document.documentElement)
    setTextVars(names.map((n) => ({ name: n, value: s.getPropertyValue(n).trim() })))
  }

  useEffect(() => {
    applyPaletteToTheme()
    requestAnimationFrame(refreshTextVars)
  }, [colors])

  useEffect(() => {
    const handler = () => {
      applyPaletteToTheme()
      requestAnimationFrame(refreshTextVars)
    }
    window.addEventListener('palette:reapply', handler)
    return () => window.removeEventListener('palette:reapply', handler)
  }, [applyPaletteToTheme])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Palette Generator</h1>
      <p className="text-sm opacity-80 mb-4">La paleta controla Primary, Secondary y Accent. El Background lo define el tema (Light/Dark).</p>
      <div className="flex gap-2 mb-4">
        <button className="button button-primary" onClick={generatePalette}>Generar paleta</button>
        <button className="button button-secondary" onClick={applyPaletteToTheme}>Aplicar</button>
      </div>

      {/* Paleta base */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {colors.map((c, i) => (
          <Card key={i}>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2">
                <strong>{colorLabels[i]}</strong>
                <code className="text-xs opacity-75">{cssVars[i]}</code>
              </div>
              <div style={{ background: c }} className="w-full h-20 rounded-lg border border-border" />
              <div className="text-xs">HEX: {c.toUpperCase()} · RGB: {(() => { try { const [r,g,b]=chroma(c).rgb(); return `${r}, ${g}, ${b}` } catch { return '—' } })()}</div>
              <div className="flex items-center gap-2">
                <input aria-label={`Elegir ${colorLabels[i]}`} type="color" value={c} onChange={(e) => setColor(i, e.target.value)} />
                <input aria-label={`HEX ${colorLabels[i]}`} className="component p-2 flex-1" value={c} onChange={(e)=>setColor(i, e.target.value)} placeholder="#RRGGBB" />
              </div>
              <div className="flex gap-2">
                <button className="button" onClick={() => navigator.clipboard.writeText(c)}>Copiar</button>
                <button className="button" onClick={() => toggleLock(i)}>{locked[i] ? 'Desbloquear' : 'Bloquear'}</button>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Variables de texto derivadas */}
      <section className="component p-4">
        <h2 className="text-lg font-semibold mb-3">Colores de texto derivados</h2>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {textVars.map((tv, idx) => (
            <Card key={idx}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm">{tv.name.replace('--color-','')}</strong>
                  <code className="text-xs opacity-75">{tv.name}</code>
                </div>
                <div className="flex items-center gap-3">
                  <div style={{ background: tv.value }} className="w-8 h-8 rounded border border-border" />
                  <span className="text-xs">{tv.value || '—'}</span>
                </div>
                <button className="button" onClick={() => navigator.clipboard.writeText(tv.value)}>Copiar</button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
