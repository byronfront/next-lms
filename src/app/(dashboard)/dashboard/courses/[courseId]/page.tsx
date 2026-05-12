import prisma from "@/lib/prisma"
import { getTenantId } from "@/lib/getTenant"
import ModulesList from "./components/ModulesList"

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const resolvedParams = await params

  const tenantId = await getTenantId()

  const course = await prisma.course.findFirst({
    where: {
      id: resolvedParams.courseId,
      tenantId,
    },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" },
          },
        },
      },
    },
  })

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