import { useEffect, useMemo, useState } from 'react'
import { calculateContrast, meetsWCAG, suggestBetterContrast } from '../utils/contrast'

interface Props {
  pairs?: Array<{ fg: string; bg: string; label?: string }>
}

export function ContrastChecker({ pairs }: Props) {
  const [resolved, setResolved] = useState<Array<{ label: string; fg: string; bg: string }>>([])

  // If no pairs provided, check common system vars
  const computedPairs = useMemo(() => {
    if (pairs && pairs.length) return pairs
    const s = getComputedStyle(document.documentElement)
    return [
      { fg: s.getPropertyValue('--color-foreground').trim(), bg: s.getPropertyValue('--color-background').trim(), label: 'Text vs Background' },
      { fg: s.getPropertyValue('--color-primary-foreground').trim(), bg: s.getPropertyValue('--color-primary').trim(), label: 'Primary' },
      { fg: s.getPropertyValue('--color-secondary-foreground').trim(), bg: s.getPropertyValue('--color-secondary').trim(), label: 'Secondary' },
      { fg: s.getPropertyValue('--color-accent-foreground').trim(), bg: s.getPropertyValue('--color-accent').trim(), label: 'Accent' },
      { fg: s.getPropertyValue('--color-destructive-foreground').trim(), bg: s.getPropertyValue('--color-destructive').trim(), label: 'Destructive' },
    ]
  }, [pairs])

  useEffect(() => {
    setResolved(
      computedPairs.map((p) => ({
        label: p.label || 'Pair',
        fg: p.fg,
        bg: p.bg,
      }))
    )
  }, [computedPairs])

  return (
    <div className="component p-4">
      <h3 className="text-lg font-semibold mb-3">WCAG Contrast Checker</h3>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {resolved.map((p, idx) => {
          const ratio = calculateContrast(p.fg, p.bg)
          const okAA = meetsWCAG(ratio, 'AA')
          const okAAA = meetsWCAG(ratio, 'AAA')
          const suggestAA = okAA ? null : suggestBetterContrast(p.fg, 4.5, p.bg)
          const suggestAAA = okAAA ? null : suggestBetterContrast(p.fg, 7, p.bg)

          return (
            <div key={idx} className="p-3 rounded border border-border" style={{ background: p.bg, color: p.fg }}>
              <div className="flex items-center justify-between mb-2">
                <strong>{p.label}</strong>
                <span className="text-xs opacity-80">{ratio.toFixed(2)}:1</span>
              </div>
              <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
              <div className="mt-2 text-xs">
                <div>AA: {okAA ? '✅ Pass' : '❌ Fail'}</div>
                <div>AAA: {okAAA ? '✅ Pass' : '❌ Fail'}</div>
                {!okAA && (
                  <div className="mt-2">
                    <div className="opacity-80">Sugerencias:</div>
                    {suggestAA && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block w-4 h-4 rounded border border-border" style={{ background: suggestAA }} />
                        <code className="opacity-80">AA fg: {suggestAA}</code>
                      </div>
                    )}
                    {suggestAAA && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block w-4 h-4 rounded border border-border" style={{ background: suggestAAA }} />
                        <code className="opacity-80">AAA fg: {suggestAAA}</code>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
