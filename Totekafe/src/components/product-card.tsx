import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";
import AddToCartButton from "./add-to-cart-button";
import { Button } from "./ui/button";
import { Info, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productImage = placeholderImages.find(p => p.id === product.imageId);

  return (
    <Link href={`/product/${product.id}`} className="flex h-full">
        <Card className="flex flex-col h-full w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
        <CardHeader className="p-0">
            <div className="relative aspect-video w-full">
            {productImage ? (
                <>
                    <Image
                    src={productImage.imageUrl}
                    alt={product.name}
                    fill
                    className={product.imageId === 'merch-tote' ? 'object-contain p-4' : 'object-cover'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={productImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Eye className="h-10 w-10 text-white/80" />
                    </div>
                </>
            ) : (
                <div className="w-full h-full bg-muted" />
            )}
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-1 flex flex-col">
            <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
            <CardDescription className="mt-2 text-sm flex-1">{product.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
            <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
            <div className="w-1/2">
                {product.isCourse ? (
                    <Button variant="outline" className="w-full" asChild>
                        <Link href={`/product/${product.id}`}>
                            <Info className="mr-2 h-4 w-4" />
                            Más Info
                        </Link>
                    </Button>
                ) : (
                    <AddToCartButton product={product} />
                )}
            </div>
        </CardFooter>
        </Card>
    </Link>
  );
}
