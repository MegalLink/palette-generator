import { Facebook, Instagram, Twitter } from 'lucide-react'
import { ImageWithSkeleton } from './ImageWithSkeleton'
import animal1 from '../../assets/images/animal1.jpg'
import animal2 from '../../assets/images/animal2.jpg'

interface Member {
  name: string
  role: string
  photo: string
}

const team: Member[] = [
  { name: 'Sophia Emma', role: 'Content Manager', photo: animal1 },
  { name: 'David Henry', role: 'Designer', photo: animal2 },
]

function Socials() {
  const itemClass = 'w-9 h-9 rounded-full inline-flex items-center justify-center border border-border'
  const iconStyle = { color: 'var(--color-foreground)' } as const
  return (
    <div className="flex gap-2">
      <a href="#" className={itemClass} aria-label="Facebook"><Facebook size={16} style={iconStyle} /></a>
      <a href="#" className={itemClass} aria-label="Twitter"><Twitter size={16} style={iconStyle} /></a>
      <a href="#" className={itemClass} aria-label="Instagram"><Instagram size={16} style={iconStyle} /></a>
    </div>
  )
}

export function TeamSection({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <section className={`component p-6 dotted-bg ${className}`} style={style}>
      <div className="grid gap-8 md:grid-cols-2 items-center">
        {/* Left copy */}
        <div>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: 'var(--color-foreground)' }}>
            Meet Our <span className="gradient-text">Professionals</span>
          </h3>
          <p className="opacity-80 mb-5" style={{ color: 'var(--color-foreground)' }}>
            Lorem ipsum dolor sit amet consectetur. In nulla nunc arcu velit consectetur massa mauris molestie hac.
          </p>
          <button
            className="button px-5 py-2 rounded-md"
            style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)', borderColor: 'transparent' }}
          >
            Meet With Us
          </button>
        </div>

        {/* Right members */}
        <div className="grid gap-8 sm:grid-cols-2">
          {team.map((m, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto w-48 h-48 rounded-full overflow-hidden border-4" style={{ borderColor: 'var(--color-primary)' }}>
                <ImageWithSkeleton src={m.photo} alt={m.name} className="w-48 h-48" imgClassName="object-cover" />
              </div>
              <h4 className="mt-4 text-xl font-bold" style={{ color: 'var(--color-foreground)' }}>{m.name}</h4>
              <p className="opacity-80" style={{ color: 'var(--color-foreground)' }}>{m.role}</p>
              <div className="mt-3"><Socials /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
