import { auth } from "@/lib/auth"
import { Suspense } from "react"
import Link from "next/link"
import { canManageCourses, isSuperAdmin } from "@/lib/permissions"
import Stats from "./components/Stats"
import RecentActivity from "./components/RecentActivity"
import StudentDashboard from "./components/StudentDashboard"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  const tenantId = session.user.tenantId

  if (isSuperAdmin(session.user.role) && !tenantId) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Panel</h1>
          <p className="text-muted-foreground">
            Super administrador de la plataforma de IA para desarrollo.{" "}
            <Link href="/dashboard/admin/tenants" className="text-primary underline">
              Gestionar organizaciones
            </Link>
          </p>
        </div>
      </div>
    )
  }

  if (!tenantId) {
    throw new Error("Usuario sin tenant asignado")
  }

  if (!canManageCourses(session.user.role)) {
    return (
      <Suspense fallback={<div>Cargando…</div>}>
        <StudentDashboard tenantId={tenantId} userId={session.user.id} />
      </Suspense>
    )
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Panel</h1>
        <p className="text-muted-foreground">
          Vista general de tu academia: estudiantes, rutas de IA y actividad.
        </p>
      </div>

      <Suspense fallback={<div>Cargando métricas...</div>}>
        <Stats tenantId={tenantId} />
      </Suspense>

      <Suspense fallback={<div>Cargando actividad...</div>}>
        <RecentActivity tenantId={tenantId} />
      </Suspense>

    </div>
  )
}