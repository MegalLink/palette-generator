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

export function NeomorphismPage() {
  const imgs = [img1, img2, img3]

  return (
    <div className="page-neomorphism space-y-8">
      <Hero />

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
