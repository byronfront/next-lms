import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { brand } from "@/lib/brand"

export default function LandingPage() {
  return (
    <div className="flex flex-col">

      <section className="py-20 px-6 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
          {brand.focus}
        </p>
        <h1 className="text-5xl font-bold tracking-tight">
          {brand.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {brand.hero}
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">Empezar gratis</Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/signin">Iniciar sesión</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-muted/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          <Card>
            <CardHeader>
              <CardTitle>Rutas de aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              Estructura cursos en módulos y lecciones: fundamentos de LLMs,
              prompting, uso de APIs, RAG ligero y patrones para equipos de
              ingeniería.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progreso y práctica</CardTitle>
            </CardHeader>
            <CardContent>
              Sigue avances por lección, quizzes y entregables pensados para
              reforzar habilidades de IA en el día a día del desarrollo.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Para bootcamps y empresas tech</CardTitle>
            </CardHeader>
            <CardContent>
              Multi-organización, roles claros y escalado cuando tu comunidad
              o tu empresa crece.
            </CardContent>
          </Card>

        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Planes</h2>
          <p className="text-muted-foreground mt-2">
            Elige cómo desplegar tu academia de IA para desarrolladores
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-bold">$0</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>Hasta 50 estudiantes</li>
                <li>5 rutas o cursos</li>
                <li>Ideal para probar contenido de IA dev</li>
              </ul>

              <Button className="w-full" asChild>
                <Link href="/signup">Comenzar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-bold">$29/mo</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>Estudiantes y cursos sin límite práctico</li>
                <li>Métricas de avance por cohorte</li>
                <li>Soporte prioritario</li>
              </ul>

              <Button className="w-full" asChild>
                <Link href="/signup">Elegir plan</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-bold">A medida</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>Integraciones y SSO</li>
                <li>Contenido y marca corporativa</li>
                <li>Infraestructura dedicada</li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">Contactar</Link>
              </Button>
            </CardContent>
          </Card>

        </div>
      </section>

      <section className="py-20 px-6 text-center bg-muted/40">
        <h2 className="text-3xl font-bold">
          Impulsa la alfabetización en IA de tu equipo de desarrollo
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
