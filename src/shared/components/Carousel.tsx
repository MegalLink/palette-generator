import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'

export function Carousel({ items = [] as string[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: 'start',
    loop: false,
    containScroll: 'trimSnaps',
    dragFree: false,
  })

  useEffect(() => {
    embla?.reInit()
  }, [embla, items.length])

  useEffect(() => {
    const onResize = () => embla?.reInit()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [embla])

  return (
    <div className="component overflow-hidden" ref={emblaRef} aria-roledescription="carousel">
      <div className="flex gap-4">
        {items.map((src, i) => (
          <div
            key={i}
            className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_33%]"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} de ${items.length}`}
          >
            <img
              src={src}
              alt={`slide ${i + 1}`}
              className="w-full h-40 object-cover rounded-md border border-border"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
