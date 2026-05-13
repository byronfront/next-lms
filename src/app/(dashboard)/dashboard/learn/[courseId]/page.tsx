import Link from "next/link"
import { auth } from "@/lib/auth"
import {
  getLearnerCourseOutline,
  resolveTenantIdForLearnSession,
} from "@/lib/data/learn"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EnrollOrContinue from "./components/EnrollOrContinue"

export default async function LearnCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const session = await auth()
  const { courseId } = await params

  if (!session?.user?.id) {
    return null
  }

  const tenantId = await resolveTenantIdForLearnSession(session.user, courseId)
  if (!tenantId) {
    return null
  }

  const data = await getLearnerCourseOutline(
    courseId,
    tenantId,
    session.user.id
  )

  if (!data) {
    return <p className="text-muted-foreground">Ruta no encontrada o no publicada.</p>
  }

  const { course, enrollment, completedLessonIds, progressPercent } = data

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          {course.description && (
            <p className="mt-2 text-muted-foreground max-w-2xl">
              {course.description}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 items-stretch md:items-end">
          <EnrollOrContinue
            courseId={course.id}
            isEnrolled={!!enrollment}
          />
          {enrollment &&
            progressPercent === 100 &&
            data.totalLessons > 0 && (
            <Button asChild variant="outline">
              <Link href={`/dashboard/learn/${course.id}/certificate`}>
                Ver certificado
              </Link>
            </Button>
          )}
        </div>
      </div>

      {enrollment && (
        <Card>
          <CardHeader>
            <CardTitle>Tu progreso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {data.completedCount} de {data.totalLessons} lecciones completadas
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Contenido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {course.modules.map((mod) => (
            <div key={mod.id}>
              <h2 className="font-semibold mb-2">{mod.title}</h2>
              <ul className="space-y-2 ml-4">
                {mod.lessons.map((lesson) => {
                  const done = completedLessonIds.has(lesson.id)
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={
                          enrollment
                            ? `/dashboard/learn/${course.id}/lessons/${lesson.id}`
                            : "#"
                        }
                        className={
                          enrollment
                            ? "text-primary hover:underline"
                            : "text-muted-foreground pointer-events-none"
                        }
                      >
                        {done ? "✓ " : ""}
                        {lesson.title}
                        <span className="text-xs text-muted-foreground ml-2">
                          ({lesson.type})
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
