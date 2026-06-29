import SiteHeader from "@/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./register-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container flex items-center justify-center py-12 md:py-24">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Crear una Cuenta</CardTitle>
            <CardDescription>
              Únete a la familia Totekafe para guardar tus pedidos y preferencias.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
