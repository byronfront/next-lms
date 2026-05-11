import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { isSuperAdmin } from "@/lib/permissions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminTenantsPage() {
  const session = await auth()
  if (!session?.user) {
    return null
  }
  if (!isSuperAdmin(session.user.role)) {
    redirect("/dashboard")
  }

  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { users: true, courses: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organizaciones (tenants)</h1>
        <p className="text-muted-foreground">
          Academias y equipos que imparten formación en IA para desarrollo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las organizaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y rounded-md border">
            {tenants.map((t) => (
              <li
                key={t.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    slug: {t.slug} · plan: {t.plan}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t._count.users} usuarios · {t._count.courses} rutas
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
