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

export function ExamplesPage() {
  const imgs = [img1, img2, img3]

  return (
    <div className="page-examples space-y-8">
      <Hero />

      <section className="grid gap-4 md:grid-cols-3">
        {imgs.map((src, i) => (
          <Card key={i} variant={ 'elevated'} hover>
            <CardHeader>
              <CardTitle>Card #{i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="card-media mb-3">
                <ImageWithSkeleton src={src} alt="example" className="w-full h-40" />
              </div>
              <p className="text-sm">Descripción breve de la tarjeta con texto de ejemplo.</p>
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
        <Carousel items={imgs} />
      </section>

      <PricingSection />

      <TeamSection />

      <FormSection />
      <ColorRolesSection />
    </div>
  )
}
