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

export function GlassmorphismPage() {
  const imgs = [img4, img5, img6]

  const glassStyle = {
    background: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-backdrop)',
    border: '1px solid var(--glass-border)',
    borderRadius: 16,
  } as const

  return (
    <div className="page-glassmorphism space-y-8">
      <Hero />

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
