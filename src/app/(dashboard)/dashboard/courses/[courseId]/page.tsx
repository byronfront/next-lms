import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { getEffectiveTenantIdForUser } from "@/lib/getTenant"
import { isSuperAdmin } from "@/lib/permissions"
import ModulesList from "./components/ModulesList"

const courseInclude = {
  modules: {
    orderBy: { position: "asc" as const },
    include: {
      lessons: {
        orderBy: { position: "asc" as const },
      },
    },
  },
} as const

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const resolvedParams = await params

  const session = await auth()
  if (!session?.user) {
    return <div>Ruta no encontrada</div>
  }

  const tenantId = await getEffectiveTenantIdForUser(session.user)
  const course = isSuperAdmin(session.user.role)
    ? await prisma.course.findFirst({
        where: { id: resolvedParams.courseId },
        include: courseInclude,
      })
    : tenantId
      ? await prisma.course.findFirst({
          where: {
            id: resolvedParams.courseId,
            tenantId,
          },
          include: courseInclude,
        })
      : null

  if (!course) {
    return <div>Ruta no encontrada</div>
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="text-muted-foreground">
          Organiza las partes y las clases de este curso: texto, vídeo o preguntas cortas.
        </p>
        {course.description && (
          <p className="mt-2 text-sm max-w-2xl">{course.description}</p>
        )}
      </div>

      <ModulesList course={course} />

    </div>
  )
}
