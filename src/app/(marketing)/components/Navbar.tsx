"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { brand } from "@/lib/brand"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/55 backdrop-blur-xl supports-[backdrop-filter]:bg-background/45 rounded-b-2xl shadow-sm">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">

        <Link href="/" className="font-bold text-lg tracking-tight leading-tight">
          <span className="block">{brand.name}</span>
          <span className="block text-[10px] font-normal text-muted-foreground tracking-normal">
            {brand.focus}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition">
            Contenido
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition">
            Planes
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/signin">Iniciar sesión</Link>
          </Button>

          <Button asChild>
            <Link href="/signup">Crear cuenta</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}