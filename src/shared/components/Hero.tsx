import { Palette, Play } from 'lucide-react'

export function Hero() {
  return (
    <section className="component p-8 md:p-10">
      <div className="max-w-5xl mx-auto text-center md:text-left">
        {/* Eyebrow */}
        <span
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full mb-3"
          style={{ background: 'var(--color-secondary)', color: 'var(--color-secondary-foreground)' }}
        >
          <Palette size={14} />
          PALETTE GENERATOR
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
          <span style={{ color: 'var(--color-foreground)' }}>We are the best</span>{' '}
          <span className="gradient-text">Palette Generator</span>{' '}
          <span
            className="inline-block align-middle px-3 py-1 rounded-full mt-2 md:mt-0"
            style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
          >
            Accessible
          </span>
        </h1>

        {/* Description */}
        <p className="opacity-80 max-w-2xl mt-3" style={{ color: 'var(--color-foreground)' }}>
          Genera paletas hermosas, verifica accesibilidad y visualízalas en estilos Normal, Neomorphism y Glassmorphism.
        </p>

        {/* CTAs */}
        <div className="mt-5 flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <a className="button button-primary" href="/">Generar paleta</a>

          <a href="#" className="inline-flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border"
              style={{ borderColor: 'var(--color-accent)' }}
            >
              <Play size={16} style={{ color: 'var(--color-accent)' }} />
            </span>
            <span style={{ color: 'var(--color-accent)' }}>Ver video</span>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <div className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--color-primary)' }}>3,600+</div>
            <div className="text-sm opacity-80" style={{ color: 'var(--color-foreground)' }}>Total Customers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--color-accent)' }}>25+</div>
            <div className="text-sm opacity-80" style={{ color: 'var(--color-foreground)' }}>Years Experience</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--color-primary)' }}>300+</div>
            <div className="text-sm opacity-80" style={{ color: 'var(--color-foreground)' }}>Team Members</div>
          </div>
        </div>
      </div>
    </section>
  )
}
