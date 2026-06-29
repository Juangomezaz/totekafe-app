
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { placeholderImages } from '@/lib/placeholder-images.json';
import ProductCard from '@/components/product-card';
import SiteHeader from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Coffee, Globe, Users } from 'lucide-react';

export default function Home() {
  const heroImg = placeholderImages.find(p => p.id === 'hero-image-tote');
  const historyImg = placeholderImages.find(p => p.id === 'historia-totekafe-img');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative h-[60vh] w-full text-white">
          {heroImg && (
            <Image
              src={heroImg.imageUrl}
              alt={heroImg.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="container relative flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold md:text-5xl font-headline tracking-tighter text-shadow-lg">
              De la finca a tu taza, cada grano cuenta una historia.
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-shadow">
              ToteKafé nace en El Retiro, Antioquia, con la misión de que cada grano cuente la historia de su origen y caficultor. Ofrecemos café altamente seleccionado con trazabilidad total, de la finca a la taza.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg font-kaushan tracking-wider">
              <Link href="#products">Compra Ahora</Link>
            </Button>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
               <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
                {historyImg && <Image
                  src={historyImg.imageUrl}
                  alt="Taza de café en una finca"
                  fill
                  className="object-cover"
                />}
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-headline tracking-tight">CONOCE LA HISTORIA DE TOTEKAFÉ</h2>
                <p className="text-muted-foreground md:text-lg">
                  En El Retiro, Antioquia, nace ToteKafé, una marca creada con la convicción de que el café debe contar la historia de su origen y de quienes lo cultivan.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  Nuestro propósito es ofrecer un café de origen altamente seleccionado, donde el caficultor sea protagonista y cada grano tenga trazabilidad total, desde la finca hasta la taza.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="space-y-6 rounded-lg bg-background p-6 lg:p-10 shadow-lg border">
                    <h3 className="text-2xl md:text-3xl font-headline tracking-tight text-center">UNA EXPERIENCIA AUTÉNTICA</h3>
                    <p className="max-w-3xl mx-auto text-center text-muted-foreground md:text-lg">
                    Con ToteKafé, cada taza se convierte en un viaje: al cafetal, a la finca, a las manos del caficultor y a la cultura que hay detrás de nuestro café. Creemos en un consumo más consciente, donde se reconoce y valora el trabajo de quienes hacen posible esta bebida que nos representa como país.
                    </p>
                    <div className="flex justify-around pt-4">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Coffee className="h-8 w-8 text-accent" />
                        <span className="text-sm font-medium">Calidad Premium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Users className="h-8 w-8 text-accent" />
                        <span className="text-sm font-medium">Apoyo al Caficultor</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Globe className="h-8 w-8 text-accent" />
                        <span className="text-sm font-medium">Origen Colombiano</span>
                    </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="products" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-kaushan tracking-tight text-center mb-12">
              Edición Fundadores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container flex flex-col items-center justify-center gap-4">
          <p>&copy; {new Date().getFullYear()} Totekafe. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
