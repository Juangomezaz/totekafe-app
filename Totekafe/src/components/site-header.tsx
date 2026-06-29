"use client";

import Link from "next/link";
import TotekafeLogo from "./totekafe-logo";
import Image from "next/image";
import CartSheet from "./cart-sheet";
import { Button } from "./ui/button";
import { LogIn, Instagram, Facebook, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";


export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-auto items-center py-4">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <div className="h-16 w-16 md:h-20 md:w-20">
            <TotekafeLogo />
          </div>
          <div className="relative h-10 w-40 md:h-12 md:w-48">
            <Image
              src="https://i.imgur.com/a7KqFkU.png"
              alt="Totekafe"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/contenido">Contenido</Link>
            </Button>
            <Link href="#" aria-label="Instagram" className="text-foreground/80 hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-foreground/80 hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </Link>
             <Button asChild>
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                </Link>
            </Button>
            <CartSheet />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
            <CartSheet />
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <SheetHeader className="mb-8">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                      <div className="h-16 w-16">
                        <TotekafeLogo />
                      </div>
                      <div className="relative h-10 w-40">
                        <Image
                          src="https://i.imgur.com/a7KqFkU.png"
                          alt="Totekafe"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </Link>
                </SheetHeader>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                    <Link href="/contenido" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Contenido</Link>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Iniciar Sesión</Link>
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <Link href="#" aria-label="Instagram" className="text-foreground/80 hover:text-foreground">
                        <Instagram className="h-6 w-6" />
                      </Link>
                      <Link href="#" aria-label="Facebook" className="text-foreground/80 hover:text-foreground">
                        <Facebook className="h-6 w-6" />
                      </Link>
                    </div>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
