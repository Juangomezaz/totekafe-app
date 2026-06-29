import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Mic, Video, Camera } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images.json";

export default function ContentPage() {
  const podcastImage = placeholderImages.find(p => p.id === 'curso-asesoria-cafe-img');
  const mainVideoImage = placeholderImages.find(p => p.id === 'hero-image-tote');

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container py-12 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-kaushan tracking-tight text-primary">
            Contenido de Valor
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Un espacio para que aprendas, te inspires y conectes con el fascinante mundo del café.
          </p>
        </div>

        {/* Podcast Section */}
        <section id="podcast" className="mb-20">
          <h2 className="text-3xl font-headline font-bold tracking-tight mb-8 flex items-center gap-3">
            <Mic className="h-8 w-8 text-accent" />
            Podcast: El Arte del Café
          </h2>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-1 relative min-h-[250px]">
                {podcastImage && (
                    <Image 
                        src={podcastImage.imageUrl}
                        alt="Podcast cover"
                        fill
                        className="object-cover"
                    />
                )}
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-1">Episodio 01</p>
                <h3 className="text-2xl font-headline mb-4">El Origen: De la Semilla a la Taza</h3>
                <p className="text-muted-foreground mb-6">
                  Sumérgete en el viaje del grano de café, desde las altas montañas de Colombia hasta tu taza. Descubre los secretos del cultivo y la cosecha.
                </p>
                <div className="flex items-center gap-4">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Escuchar Ahora
                  </Button>
                  <p className="text-sm text-muted-foreground">Duración: 25 min</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Videos Section */}
        <section id="videos" className="mb-20">
          <h2 className="text-3xl font-headline font-bold tracking-tight mb-8 flex items-center gap-3">
            <Video className="h-8 w-8 text-accent" />
            Nuestros Videos
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                 <Card className="relative group overflow-hidden rounded-lg aspect-video">
                    {mainVideoImage && (
                        <Image 
                            src={mainVideoImage.imageUrl}
                            alt="Main video thumbnail"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                </Card>
                <h3 className="text-xl font-headline">Tutorial: Prepara el Chemex Perfecto</h3>
                <p className="text-muted-foreground">Aprende la técnica para extraer el mejor sabor con el método Chemex. Una guía paso a paso para principiantes y aficionados.</p>
            </div>
            <div className="space-y-4">
                {[1,2,3].map((i) => (
                    <div key={i} className="flex items-center gap-4 group">
                        <div className="relative shrink-0 w-32 h-20 rounded-lg overflow-hidden">
                             <Image 
                                src={`https://picsum.photos/seed/video${i}/300/200`}
                                alt={`Video ${i} thumbnail`}
                                fill
                                className="object-cover"
                            />
                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <PlayCircle className="h-8 w-8 text-white/80 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold group-hover:text-accent transition-colors">Video Título {i}</h4>
                            <p className="text-sm text-muted-foreground">Una breve descripción del video.</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section id="gallery">
           <h2 className="text-3xl font-headline font-bold tracking-tight mb-8 flex items-center gap-3">
            <Camera className="h-8 w-8 text-accent" />
            Galería
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                     <Image 
                        src={`https://picsum.photos/seed/gallery${i}/600/600`}
                        alt={`Gallery image ${i}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint="coffee lifestyle"
                    />
                </div>
            ))}
          </div>
        </section>

      </main>
      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Totekafe. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}