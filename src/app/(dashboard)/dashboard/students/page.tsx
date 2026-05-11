import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { canManageCourses } from "@/lib/permissions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function StudentsPage() {
  const session = await auth()
  if (!session?.user?.tenantId) {
    redirect("/dashboard")
  }
  if (!canManageCourses(session.user.role)) {
    redirect("/dashboard/learn")
  }

  const students = await prisma.user.findMany({
    where: {
      tenantId: session.user.tenantId,
      role: "STUDENT",
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { enrollments: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Estudiantes</h1>
        <p className="text-muted-foreground">
          Personas en rol estudiante que siguen tus rutas sobre IA y desarrollo.
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
                  <div>
                    <p className="font-medium">{u.name ?? "Sin nombre"}</p>
                    <p className="text-sm text-muted-foreground">{u.email}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
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
