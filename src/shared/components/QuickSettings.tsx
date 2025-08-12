import { useEffect, useState } from 'react'
import { Settings, Lock, LockOpen, X } from 'lucide-react'
import { usePaletteStore, colorLabels, cssVars } from '../../features/palette/stores/usePaletteStore'
import { ThemeToggle } from '../../features/theme/components/ThemeToggle'

type Mode = 'floating' | 'header'

export function QuickSettings({ mode = 'floating' }: { mode?: Mode }) {
  const { colors, locked, history, saved, generatePalette, toggleLock, setColor, applyPaletteToTheme, restorePalette, clearHistory, saveCurrentPalette, loadSaved, deleteSaved, clearSaved } = usePaletteStore()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    // ensure derived vars are up-to-date when panel opens
    requestAnimationFrame(applyPaletteToTheme)
  }, [open, applyPaletteToTheme])

  // Allow toggling from header button via global event
  useEffect(() => {
    const handler = () => setOpen((v) => !v)
    window.addEventListener('quicksettings:toggle', handler)
    return () => window.removeEventListener('quicksettings:toggle', handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className={mode === 'floating' ? 'fixed bottom-4 right-4 z-50' : 'fixed right-4 top-16 z-50'}>
      {mode === 'floating' && (
        <button
          aria-label="Open quick settings"
          className="button card-cta w-12 h-12 rounded-full shadow-lg"
          style={{ borderColor: 'transparent' }}
          onClick={() => setOpen((v) => !v)}
          title="Configuración"
        >
          <Settings size={18} />
        </button>
      )}

      {open && (
        <div className="mt-3 w-[420px] md:w-[480px] max-w-[95vw] component p-5 rounded-xl border border-border shadow-lg flex flex-col items-center relative" role="dialog" aria-modal="true" aria-label="Panel de configuración rápida">
          <button
            className="absolute top-2 right-2 button w-12 h-12 flex items-center justify-center"
            aria-label="Cerrar panel"
            title="Cerrar"
            onClick={() => setOpen(false)}
          >
            <X size={16} />
          </button>
          <div className="flex items-center justify-center gap-3 mb-3">
            <strong>Apariencia</strong>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            <button className="button button-primary" onClick={generatePalette}>Generar paleta</button>
            <button className="button" onClick={applyPaletteToTheme}>Aplicar</button>
            <button className="button" onClick={saveCurrentPalette} title="Guardar paleta actual">Guardar</button>
          </div>

          <div className="grid gap-3 w-full">
            {colors.map((c, i) => (
              <div key={i} className="component p-3 rounded-md">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-sm font-medium">{colorLabels[i]}</div>
                  <code className="text-xs opacity-70">{cssVars[i]}</code>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-2">
                  <div style={{ background: c }} className="w-9 h-9 rounded border border-border" />
                  <input aria-label={`Elegir ${colorLabels[i]}`} type="color" value={c} onChange={(e) => setColor(i, e.target.value)} />
                  <input aria-label={`HEX ${colorLabels[i]}`} className="component p-2 w-[150px] sm:w-[180px] md:w-[200px]" value={c} onChange={(e)=>setColor(i, e.target.value)} placeholder="#RRGGBB" />
                  <button className="button" onClick={() => toggleLock(i)} title={locked[i] ? 'Desbloquear' : 'Bloquear'}>
                    {locked[i] ? <Lock size={16} /> : <LockOpen size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {history.length > 0 && (
            <div className="w-full mt-6">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-sm">Historial ({history.length})</strong>
                <button className="button text-xs" onClick={clearHistory}>Limpiar</button>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {history.map((h, idx) => (
                  <button
                    key={idx}
                    className="component p-2 rounded-md flex items-center gap-2 text-left hover:opacity-90"
                    onClick={() => restorePalette(idx)}
                    title="Restaurar esta paleta"
                  >
                    {h.map((col, ci) => (
                      <span key={ci} className="w-6 h-6 rounded border border-border" style={{ background: col }} />
                    ))}
                    <span className="ml-auto text-xs opacity-70">#{history.length - idx}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {saved.length > 0 && (
            <div className="w-full mt-6">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-sm">Guardadas ({saved.length})</strong>
                <div className="flex gap-2">
                  <button className="button text-xs" onClick={clearSaved} title="Eliminar todas">Vaciar</button>
                </div>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {saved.map((p, idx) => (
                  <div key={idx} className="component p-2 rounded-md flex items-center gap-2">
                    {p.map((col, ci) => (
                      <span key={ci} className="w-6 h-6 rounded border border-border" style={{ background: col }} />
                    ))}
                    <div className="ml-auto flex gap-1">
                      <button className="button text-xs" onClick={() => loadSaved(idx)} title="Aplicar">Usar</button>
                      <button className="button text-xs" onClick={() => deleteSaved(idx)} title="Borrar">X</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
