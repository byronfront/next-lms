import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { canManageCourses, isSuperAdmin } from "@/lib/permissions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function StudentsPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/dashboard")
  }

  const superAdmin = isSuperAdmin(session.user.role)
  const tenantId = session.user.tenantId

  if (!tenantId && !superAdmin) {
    redirect("/dashboard")
  }
  if (!canManageCourses(session.user.role)) {
    redirect("/dashboard/learn")
  }

  const students = await prisma.user.findMany({
    where: {
      role: "STUDENT",
      ...(superAdmin ? {} : { tenantId: tenantId! }),
    },
    orderBy: { createdAt: "desc" },
    include: {
      tenant: superAdmin ? { select: { name: true, slug: true } } : false,
      _count: { select: { enrollments: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Estudiantes</h1>
        <p className="text-muted-foreground">
          {superAdmin
            ? "Usuarios con rol estudiante en todas las organizaciones."
            : "Estudiantes inscritos en los cursos de tu organización."}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <p className="text-muted-foreground">No hay estudiantes aún.</p>
          ) : (
            <ul className="divide-y rounded-md border">
              {students.map((u) => (
                <li
                  key={u.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{u.name ?? "Sin nombre"}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {u.email ?? "Sin correo"}
                    </p>
                    {superAdmin && u.tenant && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {u.tenant.name}
                      </p>
                    )}
                    {superAdmin && !u.tenant && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Sin organización asignada
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground shrink-0">
                    {u._count.enrollments} inscripciones
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
