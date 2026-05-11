import Link from "next/link"
import { auth } from "@/lib/auth"
import { getLearnerCourseOutline } from "@/lib/data/learn"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { brand } from "@/lib/brand"

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const session = await auth()
  const { courseId } = await params

  if (!session?.user?.tenantId || !session.user.id) {
    return null
  }

  const data = await getLearnerCourseOutline(
    courseId,
    session.user.tenantId,
    session.user.id
  )

  if (!data || !data.enrollment) {
    return (
      <p className="text-muted-foreground">
        No tienes acceso a este certificado.
      </p>
    )
  }

  const complete =
    data.totalLessons > 0 && data.completedCount === data.totalLessons

  if (!complete) {
    return (
      <div className="space-y-4">
        <p>Completa todas las lecciones para obtener el certificado.</p>
        <Button asChild>
          <Link href={`/dashboard/learn/${courseId}`}>Volver a la ruta</Link>
        </Button>
      </div>
    )
  }

  const userName = session.user.name ?? session.user.email ?? "Estudiante"
  const date = new Date().toLocaleDateString("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button asChild variant="ghost" className="mb-4">
        <Link href={`/dashboard/learn/${courseId}`}>← Volver a la ruta</Link>
      </Button>

      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Certificado de finalización</CardTitle>
          <p className="text-muted-foreground text-sm">
            {brand.name} · {brand.focus}
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4 py-8">
          <p className="text-lg">Se certifica que</p>
          <p className="text-3xl font-bold">{userName}</p>
          <p className="text-muted-foreground">
            ha completado la ruta de formación
          </p>
          <p className="text-xl font-semibold">{data.course.title}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        Puedes imprimir esta página como comprobante.
      </p>
    </div>
  )
}
