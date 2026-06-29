"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function CartSheet() {
  const { items, totalItems, totalPrice, updateItemQuantity, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Mi Carrito
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full flex items-center justify-center p-0"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu Carrito ({totalItems})</SheetTitle>
        </SheetHeader>
        {totalItems > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="flex flex-col gap-4 px-6">
                {items.map((item) => {
                  const productImage = placeholderImages.find(
                    (p) => p.id === item.product.imageId
                  );
                  return (
                    <div key={item.product.id} className="flex items-start gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        {productImage && (
                          <Image
                            src={productImage.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            data-ai-hint={productImage.imageHint}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.product.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateItemQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateItemQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
                <div className="w-full space-y-4">
                  <Separator />
                  <div className="flex justify-between items-center font-semibold">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/checkout">Finalizar Compra</Link>
                  </Button>
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
            <SheetTrigger asChild>
                <Button variant="outline">Continuar Comprando</Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
