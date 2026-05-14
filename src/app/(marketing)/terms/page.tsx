import type { Metadata } from "next"
import Link from "next/link"
import { brand, brandMetadataTitle } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Términos de uso",
  description: `Condiciones generales de uso de ${brand.name}.`,
  openGraph: {
    title: `Términos de uso · ${brandMetadataTitle}`,
  },
}

export default function TermsPage() {
  const updated = "13 de mayo de 2026"

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="text-primary hover:underline">
          ← Inicio
        </Link>
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Términos de uso
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{brand.name}</p>
      <p className="mt-6 text-xs text-muted-foreground">
        Última actualización: {updated}
      </p>

      <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-foreground/90">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Aceptación</h2>
          <p>
            Al acceder o utilizar los servicios de <strong>{brand.name}</strong> (en adelante, la «plataforma»), aceptas estos términos. Si no estás de acuerdo,
            debes dejar de usar la plataforma.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Descripción del servicio</h2>
          <p>
            {brand.name} ofrece una herramienta en línea para organizar formación en cursos, contenidos por módulos y lecciones, y hacer seguimiento del progreso
            cuando la funcionalidad esté disponible. La disponibilidad y las prestaciones pueden evolucionar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. Cuentas y seguridad</h2>
          <p>
            Eres responsable de la información que proporciones al registrarte y de mantener la confidencialidad de tu contraseña. Debes notificarnos de forma razonable
            cualquier uso no autorizado de tu cuenta.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Uso permitido</h2>
          <p>Te comprometes a no:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>violentar la ley o derechos de terceros;</li>
            <li>introducir malware, hacer ingeniería inversa indebida o intentar comprometer la seguridad de la plataforma;</li>
            <li>usar la plataforma para spam, phishing u hostigamiento;</li>
            <li>sobrecargar o interferir sistemáticamente con la infraestructura.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Contenidos</h2>
          <p>
            Los organismos e instructores que publican contenido en la plataforma son responsables de que ese material sea lícito y respete derechos de terceros.
            {brand.name} puede retirar o restringir contenido si lo considera necesario por legalidad, seguridad o incumplimiento de estos términos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. Suspensión y baja</h2>
          <p>
            Podemos suspender o limitar el acceso ante incumplimientos graves o necesidades técnicas o legales. Puedes dejar de usar la plataforma en cualquier momento.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. Exclusión de garantías</h2>
          <p className="text-muted-foreground">
            La plataforma se presta «tal cual» y «según disponibilidad». No garantizamos un servicio libre de interrupciones ni que cubra todas las necesidades de tu caso concreto.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. Cambios</h2>
          <p className="text-muted-foreground">
            Podemos modificar estos términos. Publicaremos la versión actualizada y la fecha efectiva cuando sea procedente.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">9. Ley aplicable</h2>
          <p className="text-muted-foreground">
            Salvo obligación imperativa distinta, la legislación aplicable será la correspondiente según donde preste principalmente los servicios el titular del sitio,
            sin perjuicio de derechos imperativos de consumidores que pudieran ser de otro Estado.
          </p>
          <p className="text-sm text-muted-foreground">
            Reemplaza esta sección si tu empresa opera bajo jurisdicción concreta o con mediación/arbitraje definidos por contrato.
          </p>
        </section>
      </div>

      <p className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground">
        Texto orientativo para producto en desarrollo. Revísalo con asesoría legal antes de un uso formal.
        Consulta también la{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          política de privacidad
        </Link>
        .
      </p>
    </main>
  )
}
