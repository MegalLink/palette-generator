import chroma from 'chroma-js'

// Calculate WCAG contrast ratio between two colors
export function calculateContrast(color1: string, color2: string): number {
  try {
    return Number(chroma.contrast(color1, color2).toFixed(2))
  } catch {
    return 0
  }
}

// Check if a contrast ratio meets the provided WCAG level for normal text
export function meetsWCAG(ratio: number, level: 'AA' | 'AAA'): boolean {
  if (level === 'AAA') return ratio >= 7
  return ratio >= 4.5
}

// Suggest a color derived from baseColor that meets at least the targetRatio against the current background
// Strategy: adjust Lch lightness until contrast is met, trying both directions and picking the smallest delta
export function suggestBetterContrast(baseColor: string, targetRatio: number, against: string = 'white'): string {
  try {
    const bg = chroma(against)
    const base = chroma(baseColor)

    const tryAdjust = (dir: 1 | -1) => {
      let l = base.lch()[0]
      for (let i = 0; i < 100; i++) {
        l = Math.min(100, Math.max(0, l + dir * 1.2))
        const cand = chroma.lch(l, base.lch()[1], base.lch()[2])
        if (chroma.contrast(cand, bg) >= targetRatio) return cand.hex()
      }
      return base.hex()
    }

    const up = tryAdjust(1)
    const down = tryAdjust(-1)

    // pick the closer in L channel to the original
    const dlUp = Math.abs(chroma(up).lch()[0] - base.lch()[0])
    const dlDown = Math.abs(chroma(down).lch()[0] - base.lch()[0])
    return dlUp < dlDown ? up : down
  } catch {
    return baseColor
  }
}
