import Link from "next/link"
import { auth } from "@/lib/auth"
import { getPublishedCourses } from "@/lib/data/learn"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LearnSearch from "./components/LearnSearch"

export default async function LearnCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const session = await auth()
  if (!session?.user) {
    return null
  }

  const tenantId = session.user.tenantId
  if (!tenantId) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Aprender IA</h1>
        <p className="text-muted-foreground">
          Tu cuenta no tiene una organización asignada.
        </p>
      </div>
    )
  }

  const { q } = await searchParams
  const courses = await getPublishedCourses(tenantId, q ?? undefined)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Catálogo de rutas</h1>
          <p className="text-muted-foreground">
            Cursos y módulos publicados por tu organización sobre IA para el
            desarrollo de software.
          </p>
        </div>
        <LearnSearch initialQuery={q ?? ""} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rutas publicadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {courses.length === 0 && (
            <p className="text-muted-foreground">
              {q
                ? "No hay rutas que coincidan con la búsqueda."
                : "Aún no hay rutas publicadas."}
            </p>
          )}
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col gap-3 border rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Por {course.owner.name ?? "Instructor"} ·{" "}
                  {course._count.modules} módulos · {course._count.enrollments}{" "}
                  inscritos
                </p>
              </div>
              <Button asChild>
                <Link href={`/dashboard/learn/${course.id}`}>Abrir ruta</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
