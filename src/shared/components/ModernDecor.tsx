
type ModernDecorProps = {
  variant?: 'hero' | 'section'
  className?: string
}

/** Decorative blurred gradient bubbles for Modern page.
 * hero variant = larger, more intense bubbles.
 * section variant = lighter, smaller set for readability.
 */
export function ModernDecor({ variant = 'section', className = '' }: ModernDecorProps) {
  const isHero = variant === 'hero'
  return (
    <div
      className={`modern-decor ${!isHero ? 'modern-decor--section' : ''} ${className}`}
      aria-hidden="true"
    >
      {isHero ? (
        <>
          <span />
          <span />
          <span />
          <span />
        </>
      ) : (
        <>
          <span />
          <span />
          <span />
        </>
      )}
    </div>
  )
}
