import { Hero } from '../../shared/components/Hero'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../shared/components/Card'
import { Carousel } from '../../shared/components/Carousel'
import { FormSection } from '../../shared/components/FormSection'
import { ColorRolesSection } from '../../shared/components/ColorRolesSection'
import { ImageWithSkeleton } from '../../shared/components/ImageWithSkeleton'
import { PricingSection } from '../../shared/components/PricingSection'
import img4 from '../../assets/images/4.jpg'
import img5 from '../../assets/images/5.jpg'
import img6 from '../../assets/images/6.jpg'
import { TeamSection } from '../../shared/components/TeamSection'
import { useGlassStore } from '../../features/glassmorphism/stores/useGlassStore'
import { useEffect } from 'react'
interface ControlProps { label: string; value: number; min: number; max: number; step?: number; onChange:(v:number)=>void; format?: (v:number)=>string }
function Control({ label, value, min, max, step=1, onChange, format }: ControlProps){
  return (
    <label className="flex flex-col gap-2">
      <div className="flex items-center justify-between font-semibold">
        <span>{label}</span>
        <span className="text-primary text-sm">{format?format(value):value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e)=>onChange(Number(e.target.value))} />
    </label>
  )
}

export function GlassmorphismPage() {
  const imgs = [img4, img5, img6]
  const glass = useGlassStore()
  useEffect(()=>{ glass.apply() },[glass.blur, glass.refraction, glass.depth])

  const glassStyle = {
    background: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-backdrop)',
    WebkitBackdropFilter: 'var(--glass-backdrop)',
    border: '1px solid var(--glass-border)',
    borderRadius: 16,
  boxShadow: 'var(--glass-shadow)'
  } as const

  return (
    <div className="page-glassmorphism space-y-8">
      <Hero />

      <section className="component p-6 rounded-2xl space-y-8" style={glassStyle}>
        <h3 className="text-2xl font-bold">Settings</h3>
        <div className="space-y-10">
          <Control label="Blur value" value={glass.blur} min={0} max={80} onChange={glass.setBlur} />
          <Control label="Refraction" value={glass.refraction} min={0} max={0.6} step={0.01} onChange={glass.setRefraction} format={(v)=>v.toFixed(2)} />
          <Control label="Depth" value={glass.depth} min={0} max={40} onChange={glass.setDepth} />
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="button" onClick={glass.reset}>Reset</button>
        </div>
        <div className="mt-4 w-full space-y-2">
          <p className="text-xs opacity-70">CSS actual</p>
          <pre className="component p-3 rounded-md text-[10px] whitespace-pre-wrap overflow-auto" style={{ maxHeight: 160 }}>{`background: var(--glass-bg);\nbackdrop-filter: var(--glass-backdrop);\nbox-shadow: var(--glass-shadow);`}</pre>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {imgs.map((src, i) => (
          <Card key={i} variant={ 'elevated'} hover>
            <CardHeader>
              <CardTitle>Card #{i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ ...glassStyle, padding: 8 }} className="card-media mb-3">
                <ImageWithSkeleton src={src} alt="example" className="w-full h-40" />
              </div>
              <p>Descripción con efecto glass.</p>
            </CardContent>
            <CardFooter>
              <button className="button card-cta">Acción</button>
              <button className="button button-ghost">Secundaria</button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Carrusel</h3>
        <div style={glassStyle} className="p-2">
          <Carousel items={imgs} />
        </div>
      </section>

      <section className="p-4" style={glassStyle}>
        <PricingSection />
      </section>

      <section className="p-6" style={glassStyle}>
        <TeamSection />
      </section>

      <FormSection className="p-6" style={glassStyle} />

      <section className="p-4" style={glassStyle} aria-labelledby="color-roles-glass">
        <ColorRolesSection />
      </section>
    </div>
  )
}
