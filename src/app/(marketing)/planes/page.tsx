import type { Metadata } from "next"
import Link from "next/link"
import { MarketingPlanCards } from "../components/marketing-cards"
import { brand, brandMetadataTitle } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Planes",
  description: `Planes Starter, Pro y Enterprise de ${brand.name}.`,
  openGraph: {
    title: `Planes · ${brandMetadataTitle}`,
  },
}

export default function PlanesPage() {
  return (
    <main className="flex flex-col pb-16">
      <div className="border-b border-border/40 px-6 py-10 text-center sm:py-12">
        <p className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="text-primary hover:underline">
            ← Inicio
          </Link>
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Planes</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Elige un plan según cuánta gente vas a tener y cuántos cursos quieres subir.
        </p>
      </div>

      <section className="px-6 pt-14">
        <MarketingPlanCards />
      </section>

      <p className="mx-auto mt-12 max-w-2xl px-6 text-center text-xs text-muted-foreground">
        Los límites y precios pueden variar cuando actives cobro integrado en la plataforma.
        {" "}
        <Link href="/ofrecemos" className="text-primary hover:underline">
          Qué ofrecemos
        </Link>
      </p>
    </main>
  )
}
