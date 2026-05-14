import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MarketingFeatureCards,
  MarketingPlanCards,
} from "./components/marketing-cards"
import { brand } from "@/lib/brand"

export default function LandingPage() {
  return (
    <div className="flex flex-col">

      <section className="relative overflow-hidden py-24 px-6 text-center">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-[22rem] w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl motion-safe:animate-pulse"
          aria-hidden
        />
        <p className="relative text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
          {brand.focus}
        </p>
        <h1 className="relative mt-2 text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground via-primary to-chart-2 bg-clip-text text-transparent">
          {brand.name}
        </h1>
        <p className="relative mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {brand.hero}
        </p>

        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">Empezar gratis</Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/signin">Iniciar sesión</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="py-20 px-6 border-y border-border/40 bg-muted/35 backdrop-blur-sm">
        <MarketingFeatureCards />
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Planes</h2>
          <p className="text-muted-foreground mt-2">
            Elige un plan según cuánta gente vas a tener y cuántos cursos quieres subir
          </p>
        </div>

        <MarketingPlanCards />
      </section>

      <section className="py-20 px-6 text-center border-t border-border/40 bg-gradient-to-b from-muted/25 to-background">
        <h2 className="text-3xl font-bold">
          Pon tus cursos en internet con {brand.name}
        </h2>

        <div className="mt-6">
          <Button size="lg" asChild>
            <Link href="/signup">Crear cuenta</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
