import { Check } from 'lucide-react'

export function FormSection({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <section className={`component p-6 ${className}`} style={style}>
      <div className="grid gap-6 md:grid-cols-2 items-stretch">
        {/* Left: Form Card */}
        <div className="component p-5 md:p-6 rounded-xl h-full">
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <input className="component p-3 rounded-md" placeholder="Tu nombre" aria-label="Your name" required />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <input id="phone" type="tel" className="component p-3 rounded-md" placeholder="Tu teléfono" aria-label="Your phone" />
              <input id="email" type="email" className="component p-3 rounded-md" placeholder="Tu email" aria-label="Your email" required />
            </div>
            <select id="topic" className="component p-3 rounded-md" aria-label="Select Services">
              <option>Soporte</option>
              <option>Ventas</option>
              <option>Colaboración</option>
              <option>Otro</option>
            </select>
            <textarea id="message" className="component p-3 rounded-md min-h-32" placeholder="Cuéntanos más..." aria-label="Additional details" />
            <button
              type="submit"
              className="w-full px-5 py-3 rounded-full font-medium"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))',
                color: 'var(--color-primary-foreground)',
                border: '1px solid transparent',
              }}
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center p-2 md:p-4">
          <span
            className="self-start text-xs tracking-wide px-3 py-1 rounded-full mb-3"
            style={{ background: 'var(--color-secondary)', color: 'var(--color-secondary-foreground)' }}
          >
            SOLICITAR CITA
          </span>

          <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-3">
            ¿Necesitas asesoría para <span className="gradient-text font-bold">marketing en redes sociales?</span>
          </h3>
          <p className="opacity-80 mb-4" style={{ color: 'var(--color-foreground)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              'Optimización del ranking del motor',
              'Mayor satisfacción del cliente',
              'Escuchar y interactuar con los seguidores',
              'Investigar tu mercado',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={18} style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm" style={{ color: 'var(--color-foreground)' }}>{text}</span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-1">Nuestra ubicación</h4>
              <p className="text-sm opacity-80" style={{ color: 'var(--color-foreground)' }}>
                Jl. Raya Kuta No. 70, Badung
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Más información</h4>
              <p className="text-sm opacity-80" style={{ color: 'var(--color-foreground)' }}>
                support@domain.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
