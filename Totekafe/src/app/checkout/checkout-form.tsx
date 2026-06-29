"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo electrónico válida."),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres."),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres."),
  zip: z.string().regex(/^\d{5}$/, "Por favor, introduce un código postal válido de 5 dígitos."),
  card: z.string().regex(/^\d{16}$/, "El número de tarjeta debe tener 16 dígitos."),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "La fecha de caducidad debe tener el formato MM/AA."),
  cvc: z.string().regex(/^\d{3,4}$/, "El CVC debe tener 3 o 4 dígitos."),
});

export default function CheckoutForm() {
  const { clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      zip: "",
      card: "",
      expiry: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Pedido realizado:", values);
    clearCart();
    toast({
      title: "¡Pedido Exitoso!",
      description: "Gracias por tu compra. Hemos recibido tu pedido.",
    });
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Calle del Café" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                        <Input placeholder="Villa Grano" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Código Postal</FormLabel>
                    <FormControl>
                        <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-xl font-headline">Detalles de Pago</h3>
             <FormField
              control={form.control}
              name="card"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Tarjeta</FormLabel>
                  <FormControl>
                    <Input placeholder="•••• •••• •••• ••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="expiry"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Caducidad (MM/AA)</FormLabel>
                    <FormControl>
                        <Input placeholder="MM/AA" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                        <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </div>

        <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Realizar Pedido
        </Button>
      </form>
    </Form>
  );
}
