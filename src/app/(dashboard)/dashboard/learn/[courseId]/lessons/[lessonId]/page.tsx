import Link from "next/link"
import { auth } from "@/lib/auth"
import {
  getLessonForLearner,
  resolveTenantIdForLearnSession,
} from "@/lib/data/learn"
import { Button } from "@/components/ui/button"
import CompleteLessonButton from "./components/CompleteLessonButton"
import QuizPlayer from "./components/QuizPlayer"
import { LessonMarkdown } from "@/components/learn/LessonMarkdown"

export default async function LearnLessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const session = await auth()
  const { courseId, lessonId } = await params

  if (!session?.user?.id) {
    return null
  }

  const tenantId = await resolveTenantIdForLearnSession(session.user, courseId)
  if (!tenantId) {
    return null
  }

  const data = await getLessonForLearner(
    courseId,
    lessonId,
    tenantId,
    session.user.id
  )

  if (!data) {
    return <p className="text-muted-foreground">Lección no disponible.</p>
  }

  const { lesson, enrollment, progress } = data

  if (!enrollment) {
    return (
      <div className="space-y-4">
        <p>Debes inscribirte en este curso para ver esta lección.</p>
        <Button asChild>
          <Link href={`/dashboard/learn/${courseId}`}>Volver al curso</Link>
        </Button>
      </div>
    )
  }

  const isDone = progress?.isCompleted ?? false

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Link
          href={`/dashboard/learn/${courseId}`}
          className="hover:text-foreground"
        >
          ← Volver al curso
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{lesson.title}</h1>

      {lesson.type === "VIDEO" && lesson.videoUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            title={lesson.title}
            src={lesson.videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {lesson.type === "TEXT" && lesson.content && (
        <LessonMarkdown markdown={lesson.content} />
      )}

      {lesson.type === "QUIZ" && lesson.quizData && (
        <QuizPlayer
          courseId={courseId}
          lessonId={lesson.id}
          quiz={lesson.quizData as QuizPayload}
          initiallyCompleted={isDone}
        />
      )}

      {lesson.type !== "QUIZ" && (
        <CompleteLessonButton
          courseId={courseId}
          lessonId={lesson.id}
          disabled={isDone}
          label={isDone ? "Completada" : "Marcar como completada"}
        />
      )}
    </div>
  )
}

type QuizPayload = {
  prompt: string
  options: string[]
  correctIndex: number
}[]
