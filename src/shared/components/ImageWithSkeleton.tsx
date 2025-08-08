import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string // Wrapper styles: size, border, rounding, margins
  imgClassName?: string // Extra classes for the img element
}

export function ImageWithSkeleton({ src, alt, className = '', imgClassName = '' }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-[var(--color-muted)] ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}

      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm opacity-70 text-[color:var(--color-foreground)]">
          Imagen no disponible
        </div>
      )}
    </div>
  )}
