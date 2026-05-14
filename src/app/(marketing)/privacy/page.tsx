import type { Metadata } from "next"
import Link from "next/link"
import { brand, brandMetadataTitle } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Privacidad",
  description: `Información sobre el tratamiento de datos personales en ${brand.name}.`,
  openGraph: {
    title: `Privacidad · ${brandMetadataTitle}`,
  },
}

export default function PrivacyPage() {
  const updated = "13 de mayo de 2026"

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="text-primary hover:underline">
          ← Inicio
        </Link>
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Política de privacidad
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{brand.name}</p>
      <p className="mt-6 text-xs text-muted-foreground">
        Última actualización: {updated}
      </p>

      <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-foreground/90">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Responsable del tratamiento</h2>
          <p>
            El titular responsable del tratamiento de los datos facilitados a través de <strong>{brand.name}</strong> es la persona u organización que opera la instancia
            de esta plataforma (<strong>{brand.name}</strong>). Debes incluir nombre o razón social, correo de contacto y, si procede, NIF/CIF dirección antes de lanzar públicamente el servicio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Qué datos tratamos</h2>
          <p>Según cómo uses el servicio, podemos tratar datos como:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>identificadores de cuenta (nombre, correo electrónico);</li>
            <li>contraseña u otros secretos tras el proceso de hashing adecuado en servidor;</li>
            <li>datos que introduzcas en perfiles o formularios dentro de la plataforma;</li>
            <li>información técnica mínima (sesión, seguridad del servicio) para operar la aplicación.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            No debes proporcionar datos personales especialmente protegidos (salud, ideología, etc.) salvo que la funcionalidad lo exija y exista fundamento jurídico.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. Finalidades y bases jurídicas</h2>
          <p>Trataremos tus datos principalmente para:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground/90">Gestionar el acceso</strong> a la cuenta (ejecución de la relación con el usuario o prestación solicitada).
            </li>
            <li>
              <strong className="text-foreground/90">Operar la plataforma</strong>: cursos, inscripciones, progreso y comunicaciones relacionadas con el servicio cuando existan esas características.
            </li>
            <li>
              <strong className="text-foreground/90">Cumplir obligaciones legales</strong> y garantizar seguridad ante abusos, cuando aplique.
            </li>
            <li>
              <strong className="text-foreground/90">Mejora estadística anonimizada</strong> sólo cuando esté configurada y sea compatible con anonimización o consentimiento.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Cesiones y encargados</h2>
          <p className="text-muted-foreground">
            Podemos apoyarnos en proveedores tecnológicos (por ejemplo hosting, base de datos, correo electrónico) que traten datos únicamente según nuestras instrucciones como encargados
            cuando la relación así lo requiera. Si hay transferencias fuera del EEE, aplicaremos garantías aplicables normativamente.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Plazos de conservación</h2>
          <p className="text-muted-foreground">
            Conservaremos los datos el tiempo necesario para las finalidades anteriores, la relación contractual y los plazos legales. Tras cancelar cuentas, podremos retener bloques mínimos
            donde la ley lo exija o para reclamaciones fundamentadas en el plazo ordinario de prescripción.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. Sesiones y proveedores de acceso social</h2>
          <p className="text-muted-foreground">
            La aplicación puede utilizar mecanismos de sesión (por ejemplo mediante cookies necesarias para el inicio de sesión). Si activas iniciar sesión con terceros
            (Google, GitHub u otros), ese proveedor aplicará también su política de privacidad al identificarte frente a su servicio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. Tus derechos</h2>
          <p>
            Cuando seas titular según legislación aplicable (por ejemplo en el Espacio Económico Europeo), puedes solicitar{" "}
            <strong className="text-foreground/90">acceso, rectificación, supresión, limitación, oposición y portabilidad</strong>, y retirar el consentimiento donde el tratamiento se base en él,
            mediante el medio de contacto que publique la organización titular del servicio. También puedes presentar reclamación ante la autoridad de protección de datos de tu país.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. Menores</h2>
          <p className="text-muted-foreground">
            El uso por menores debe cumplir la edad legal y autorización cuando corresponda. La plataforma no está dirigida a recabar datos conscientemente de niños sin el marco adecuado.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">9. Cambios</h2>
          <p className="text-muted-foreground">
            Podremos actualizar esta política. La fecha superior indicará la versión más reciente; los cambios relevantes pueden comunicarse por medios habituales de la cuenta o del sitio.
          </p>
        </section>
      </div>

      <p className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground">
        Texto marco orientativo; no sustituye asesoramiento jurídico. Relacionado con los {""}
        <Link href="/terms" className="text-primary hover:underline">
          términos de uso
        </Link>
        .
      </p>
    </main>
  )
}
