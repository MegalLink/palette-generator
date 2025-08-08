import { Hero } from '../../shared/components/Hero'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../shared/components/Card'
import { Carousel } from '../../shared/components/Carousel'
import { FormSection } from '../../shared/components/FormSection'
import { ColorRolesSection } from '../../shared/components/ColorRolesSection'
import { ImageWithSkeleton } from '../../shared/components/ImageWithSkeleton'
import { PricingSection } from '../../shared/components/PricingSection'
import { TeamSection } from '../../shared/components/TeamSection'
import img1 from '../../assets/images/1.jpg'
import img2 from '../../assets/images/2.jpg'
import img3 from '../../assets/images/3.jpg'

export function ModernPage() {
  const imgs = [img1, img2, img3]

  return (
    <div className="page-modern space-y-10">
      <section className="rounded-2xl p-[1px] modern-gradient">
        <div className="component p-10 rounded-2xl text-center modern-surface">
          <Hero />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {imgs.map((src, i) => (
          <div key={i} className="rounded-2xl p-[1px] modern-gradient">
            <Card className="rounded-2xl modern-surface" variant={'elevated'} hover>
              <CardHeader className="rounded-2xl">
                <CardTitle className="gradient-text">Card #{i + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="card-media mb-3">
                  <ImageWithSkeleton src={src} alt={`modern-${i + 1}`} className="w-full h-44" />
                </div>
                <p className="text-sm opacity-80">Interfaz moderna con gradientes y superficies suaves.</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <button className="button modern-button">Acción</button>
                <button className="button button-ghost">Secundaria</button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </section>

      <section className="rounded-2xl p-[1px] modern-gradient">
        <div className="rounded-2xl p-3 modern-surface">
          <h3 className="text-lg font-semibold mb-3">Carrusel</h3>
          <Carousel items={imgs} />
        </div>
      </section>

      <section className="rounded-2xl p-[1px] modern-gradient">
        <div className="rounded-2xl p-4 modern-surface">
          <PricingSection />
        </div>
      </section>

      <section className="rounded-2xl p-[1px] modern-gradient">
        <TeamSection className="rounded-2xl modern-surface" />
      </section>

      <section className="rounded-2xl p-[1px] modern-gradient">
        <FormSection className="rounded-2xl modern-surface" />
      </section>

      <section className="rounded-2xl p-[1px] modern-gradient">
        <div className="rounded-2xl p-4 modern-surface">
          <ColorRolesSection />
        </div>
      </section>
    </div>
  )
}
