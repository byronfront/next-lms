import Link from "next/link"
import CreateLessonForm from "./CreateLessonForm"
import { Button } from "@/components/ui/button"

export default function LessonsList({
  courseId,
  module,
}: {
  courseId: string
  module: { id: string; lessons: { id: string; title: string; type: string; isPublished: boolean }[] }
}) {
  return (
    <div className="space-y-3 ml-4">

      <CreateLessonForm moduleId={module.id} />

      {module.lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="text-sm border p-2 rounded-md flex flex-wrap items-center justify-between gap-2"
        >
          <span>
            {lesson.title}{" "}
            <span className="text-muted-foreground">
              ({lesson.type}
              {lesson.isPublished ? "" : ", borrador"})
            </span>
          </span>
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/courses/${courseId}/lessons/${lesson.id}/edit`}>
              Editar
            </Link>
          </Button>
        </div>
      ))}

    </div>
  )
}