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
          <h1 className="text-3xl font-bold">Tu formación en IA</h1>
          <p className="text-muted-foreground">
            Avanza en rutas sobre IA aplicada al desarrollo y revisa tu progreso
            por lección.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/learn">Ver rutas publicadas</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Rutas inscritas" value={s.enrolledCourses} />
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
            <Link href="/dashboard/learn">Explorar rutas de IA para devs</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
