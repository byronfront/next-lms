import Link from "next/link"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { getTenantId } from "@/lib/getTenant"
import { Button } from "@/components/ui/button"
import EditLessonForm from "./EditLessonForm"

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const { courseId, lessonId } = await params
  const tenantId = await getTenantId()

  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      module: { courseId, course: { tenantId } },
    },
    include: {
      module: { include: { course: { select: { title: true } } } },
    },
  })

  if (!lesson) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/dashboard/courses/${courseId}`}>← Volver al curso</Link>
        </Button>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Editar lección</h1>
        <p className="text-muted-foreground text-sm">
          {lesson.module.course.title} · {lesson.module.title}
        </p>
      </div>
      <EditLessonForm lesson={lesson} courseId={courseId} />
    </div>
  )
}
