import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MarketingFeatureCards } from "../components/marketing-cards"
import { brand, brandMetadataTitle } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Qué ofrecemos",
  description: `${brand.name}: características para organizar formación online con cursos, módulos y seguimiento del progreso.`,
  openGraph: {
    title: `Qué ofrecemos · ${brandMetadataTitle}`,
  },
}

export default function OfrecemosPage() {
  return (
    <main className="flex flex-col">
      <div className="border-b border-border/40 px-6 py-10 text-center sm:py-14">
        <p className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="text-primary hover:underline">
            ← Inicio
          </Link>
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Qué ofrecemos
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{brand.hero}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/signup">Crear cuenta gratis</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/planes">Ver planes</Link>
          </Button>
        </div>
      </div>

      <section className="border-y border-border/40 bg-muted/35 backdrop-blur-sm px-6 py-20">
        <MarketingFeatureCards />
      </section>

      <section className="px-6 py-16 text-center border-t border-border/40 bg-gradient-to-b from-muted/25 to-background">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Pon tus cursos en internet con {brand.name}
        </h2>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/signup">Empezar</Link>
        </Button>
      </section>
    </main>
  )
}
