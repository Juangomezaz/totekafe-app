"use client";

import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(product);
    toast({
      title: "Añadido al carrito",
      description: `${product.name} ha sido añadido a tu carrito.`,
    });
  };

  return (
    <Button onClick={handleAddToCart} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
      <ShoppingCart className="mr-2 h-4 w-4" />
      Añadir
    </Button>
  );
}
