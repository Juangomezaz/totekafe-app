"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { formatCurrency } from "@/lib/utils";

export default function OrderSummary() {
  const { items, totalPrice } = useCart();
  const shippingCost = 6000; // Example shipping cost
  const total = totalPrice + shippingCost;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
            {items.map((item) => {
                 const productImage = placeholderImages.find(
                    (p) => p.id === item.product.imageId
                  );
                return (
                    <div key={item.product.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                {productImage && (
                                <Image
                                    src={productImage.imageUrl}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                />
                                )}
                            </div>
                            <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">Cant: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-medium">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                )
            })}
        </div>
        <Separator />
        <div className="space-y-2">
            <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>{formatCurrency(totalPrice)}</p>
            </div>
             <div className="flex justify-between">
                <p className="text-muted-foreground">Envío</p>
                <p>{shippingCost > 0 ? formatCurrency(shippingCost) : 'Gratis'}</p>
            </div>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>{formatCurrency(total)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
