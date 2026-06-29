import SiteHeader from "@/components/site-header";
import CheckoutForm from "./checkout-form";
import OrderSummary from "./order-summary";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container py-12 md:py-24">
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-center mb-12">
          Finalizar Compra
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-headline mb-6">Información de Envío</h2>
            <CheckoutForm />
          </div>
          <div>
            <h2 className="text-2xl font-headline mb-6">Resumen del Pedido</h2>
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
}
