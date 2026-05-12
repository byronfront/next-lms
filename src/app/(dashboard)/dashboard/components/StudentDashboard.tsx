import Link from "next/link"
import { getStudentDashboardSummary } from "@/lib/data/student-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "./StatCard"

export default async function StudentDashboard({
  tenantId,
  userId,
}: {
  tenantId: string
  userId: string
}) {
  const s = await getStudentDashboardSummary(tenantId, userId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tu aprendizaje</h1>
          <p className="text-muted-foreground">
            Sigue tus cursos inscritos y revisa el progreso lección a lección.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/learn">Ver cursos publicados</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Cursos inscritos" value={s.enrolledCourses} />
        <StatCard
          title="Lecciones completadas"
          value={`${s.completedLessons} / ${s.totalLessons}`}
        />
        <StatCard title="Progreso global" value={`${s.progressPercent}%`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Siguiente paso</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/learn">Ver todos los cursos</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
