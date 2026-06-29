import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { placeholderImages } from '@/lib/placeholder-images.json';
import SiteHeader from '@/components/site-header';
import AddToCartButton from '@/components/add-to-cart-button';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const productImage = placeholderImages.find(p => p.id === product.imageId);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container py-12 md:py-24">
        <div className="mb-8">
            <Button asChild variant="outline">
                <Link href="/#products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a productos
                </Link>
            </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
            {productImage ? (
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className={product.imageId === 'merch-tote' ? 'object-contain p-8' : 'object-cover'}
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={productImage.imageHint}
              />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-headline font-bold">{product.name}</h1>
            <p className="text-muted-foreground text-lg">{product.description}</p>
            <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold">{formatCurrency(product.price)}</span>
                {product.isCourse && <span className="text-accent font-medium">Curso</span>}
            </div>
            <div className="max-w-xs">
                <AddToCartButton product={product} />
            </div>
            
            {/* You can add more product details here */}
            <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Detalles Adicionales</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {product.isCourse ? (
                        <>
                            <li>Acceso de por vida al contenido.</li>
                            <li>Certificado de finalización.</li>
                            <li>Comunidad exclusiva de estudiantes.</li>
                        </>
                    ) : (
                        <>
                            <li>Peso: 250g</li>
                            <li>Origen: El Retiro, Antioquia</li>
                            <li>Tostado: Medio</li>
                            <li>Proceso: Lavado</li>
                        </>
                    )}
                </ul>
            </div>

          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Totekafe. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
