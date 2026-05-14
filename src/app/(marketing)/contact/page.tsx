import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { brand, brandMetadataTitle } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacto y consultas sobre ${brand.name}.`,
  openGraph: {
    title: `Contacto · ${brandMetadataTitle}`,
  },
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-lg px-6 py-16 text-center">
      <p className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="text-primary hover:underline">
          ← Inicio
        </Link>
      </p>
      <h1 className="text-3xl font-bold tracking-tight">Contacto</h1>
      <p className="mt-6 text-muted-foreground leading-relaxed">
        Para planes Enterprise, integraciones o acuerdos con tu organización, escribe desde el correo corporativo indicando tamaño del equipo y necesidades.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button asChild variant="outline">
          <Link href="/planes">Ver planes</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Crear cuenta</Link>
        </Button>
      </div>
      <p className="mt-12 text-xs text-muted-foreground">
        Sustituye este bloque por un formulario de contacto o un correo público cuando lo tengáis definido.
      </p>
    </main>
  )
}
