import { getDashboardStats } from "@/lib/data/dashboard"
import { StatCard } from "./StatCard"

export default async function Stats({ tenantId }: { tenantId: string }) {
  const stats = await getDashboardStats(tenantId)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard title="Estudiantes" value={stats.students} />
      <StatCard title="Rutas activas" value={stats.courses} />
      <StatCard title="Progreso" value={`${stats.progress}%`} />
    </div>
  )
}