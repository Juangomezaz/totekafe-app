
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import SiteHeader from "@/components/site-header";
import Link from "next/link";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Por favor, introduce una dirección de correo electrónico válida."),
  password: z.string().min(1, "La contraseña no puede estar vacía."),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (auth?.currentUser) {
      router.push('/');
    }
  }, [auth, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Servicio de autenticación no disponible. Inténtalo de nuevo más tarde.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "¡Bienvenido de nuevo!",
        description: "Has iniciado sesión correctamente.",
      });
      router.push("/");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      let description = "Hubo un problema al iniciar sesión. Por favor, verifica tu correo y contraseña.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        description = "Correo electrónico o contraseña incorrectos.";
      }
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description: description,
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container flex items-center justify-center py-12 md:py-24">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa a tu cuenta de Totekafe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Entrar
                </Button>
              </form>
            </Form>
             <div className="mt-6 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="underline font-medium">
                Regístrate
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
