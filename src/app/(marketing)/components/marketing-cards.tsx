import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MarketingFeatureCards() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
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
  )
}

export function MarketingPlanCards() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
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

      <Card className="border-primary ring-2 ring-primary/25 shadow-lg md:motion-safe:scale-[1.02]">
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
  )
}
