import { Hero } from '../../shared/components/Hero'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../shared/components/Card'
import { Carousel } from '../../shared/components/Carousel'
import { FormSection } from '../../shared/components/FormSection'
import { ColorRolesSection } from '../../shared/components/ColorRolesSection'
import { ImageWithSkeleton } from '../../shared/components/ImageWithSkeleton'
import { PricingSection } from '../../shared/components/PricingSection'
import img1 from '../../assets/images/1.jpg'
import img2 from '../../assets/images/2.jpg'
import img3 from '../../assets/images/3.jpg'
import { TeamSection } from '../../shared/components/TeamSection'
import { useNeomorphismStore } from '../../features/neomorphism/stores/useNeomorphismStore'
import { useEffect, useState } from 'react'

interface ControlProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  suffix?: string
}

function Control({ label, value, min, max, step = 1, onChange, suffix }: ControlProps) {
  return (
    <label className="component p-3 rounded-md flex flex-col gap-2">
      <div className="flex justify-between text-xs opacity-70"><span>{label}</span><span>{value}{suffix}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  )
}

export function NeomorphismPage() {
  const imgs = [img1, img2, img3]
  const neo = useNeomorphismStore()

  // Additional extended controls (color, size, radius) local UI state
  const [baseColor, setBaseColor] = useState('#e0e0e0')
  const [size, setSize] = useState(200) // width/height in px for preview square
  const [radius, setRadius] = useState(32)

  useEffect(() => {
    // apply surface background color live
    document.documentElement.style.setProperty('--neo-demo-bg', baseColor)
  }, [baseColor])

  // Reset sombras al cambiar el tema (dark/light)
  useEffect(() => {
    const handler = () => neo.reset()
    window.addEventListener('theme:changed', handler)
    return () => window.removeEventListener('theme:changed', handler)
  }, [neo])

  return (
    <div className="page-neomorphism space-y-8">
      <Hero />

      <section className="component p-6 rounded-2xl space-y-6" style={{ boxShadow: 'var(--shadow-neu-light)' }}>
        <h3 className="text-lg font-semibold">Configuración Neomorphism</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="flex items-center gap-3 text-sm font-medium">
              <span>Pick a color</span>
              <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-10 h-10 rounded border border-border" />
              <input value={baseColor} onChange={(e)=> setBaseColor(e.target.value)} className="component p-2 flex-1" />
            </label>
            <div className="flex flex-col gap-4">
              <Control label="Size" value={size} min={60} max={400} onChange={setSize} suffix="px" />
              <Control label="Radius" value={radius} min={0} max={180} onChange={setRadius} suffix="px" />
              <Control label="Distance" value={neo.distance} min={4} max={60} onChange={neo.setDistance} suffix="px" />
              <Control label="Intensity" value={neo.intensity} min={0.4} max={2} step={0.05} onChange={neo.setIntensity} />
              <Control label="Blur" value={neo.blur} min={10} max={160} onChange={neo.setBlur} suffix="px" />
            </div>
            <button className="button mt-2" onClick={neo.reset}>Reset sombras</button>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div
              className="flex items-center justify-center text-xs"
              style={{
                width: size,
                height: size,
                borderRadius: radius,
                background: 'var(--neo-demo-bg, #e0e0e0)',
                boxShadow: 'var(--shadow-neu-inset)'
              }}
            >
              inset
            </div>
            <div className="w-full">
              <p className="text-xs opacity-70 mb-1">CSS generado</p>
              <pre className="component p-3 text-xs overflow-auto rounded-md" style={{ maxHeight: 140 }}>
{`border-radius: ${radius}px;\nbackground: ${baseColor};\nbox-shadow:  ${neo.distance}px ${neo.distance}px ${neo.blur}px rgba(0,0,0,0.2),\n             -${neo.distance}px -${neo.distance}px ${neo.blur}px rgba(255,255,255,0.9);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {imgs.map((src, i) => (
          <Card key={i} variant={'elevated'} className="rounded-2xl" hover>
            <CardHeader>
              <CardTitle>Card #{i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="card-media mb-3">
                <ImageWithSkeleton src={src} alt="example" className="w-full h-40" />
              </div>
              <p>Contenido con estilo neomorphism.</p>
            </CardContent>
            <CardFooter>
              <button className="button" style={{ boxShadow: 'var(--shadow-neu-light)', border: 'none', borderRadius: 16 }}>Primario</button>
              <button className="button" style={{ boxShadow: 'var(--shadow-neu-inset)', border: 'none', borderRadius: 16 }}>Inset</button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Carrusel</h3>
        <Carousel items={imgs} />
      </section>

      <section className="component p-4 rounded-2xl" style={{ boxShadow: 'var(--shadow-neu-light)' }}>
        <PricingSection />
      </section>

      <section className="component p-6 rounded-2xl" style={{ boxShadow: 'var(--shadow-neu-light)' }}>
        <TeamSection />
      </section>

      <FormSection className="rounded-2xl" style={{ boxShadow: 'var(--shadow-neu-light)' }} />

      <section className="component p-4 rounded-2xl" style={{ boxShadow: 'var(--shadow-neu-light)' }}>
        <ColorRolesSection />
      </section>
    </div>
  )
}
