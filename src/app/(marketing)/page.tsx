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
              <CardTitle>Tu curso, en partes claras</CardTitle>
            </CardHeader>
            <CardContent>
              Junta el contenido por bloques y clases: texto, vídeo o pequeñas
              preguntas para repasar. Así quien estudia no se pierde.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ver quién va avanzando</CardTitle>
            </CardHeader>
            <CardContent>
              Marca qué clases ya vio cada persona y usa preguntas cortas cuando
              quieras comprobar que se entendió el tema.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Para academias, empresas y equipos</CardTitle>
            </CardHeader>
            <CardContent>
              Varios centros o marcas en un mismo sitio, con quien enseña y quien
              aprende bien separado. Crece sin liar las cosas.
            </CardContent>
          </Card>

        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Planes</h2>
          <p className="text-muted-foreground mt-2">
            Elige un plan según cuánta gente vas a tener y cuántos cursos quieres subir
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
                <li>Hasta 5 cursos publicados</li>
                <li>Ideal para probar antes de abrir al público</li>
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
                <li>Cursos y estudiantes sin tope rígido en el día a día</li>
                <li>Resumen de cómo va cada grupo</li>
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
                <li>Conexión con otras herramientas que ya usáis</li>
                <li>Tu logo y tu estilo en lo que ven los alumnos</li>
                <li>Más capacidad y acompañamiento a medida</li>
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
