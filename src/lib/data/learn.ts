import prisma from "@/lib/prisma"
import { cache } from "react"

export const getPublishedCourses = cache(
  async (tenantId: string, query?: string | null) => {
    const q = query?.trim()
    return prisma.course.findMany({
      where: {
        tenantId,
        isPublished: true,
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" as const } },
                {
                  description: { contains: q, mode: "insensitive" as const },
                },
              ],
            }
          : {}),
      },
      include: {
        owner: { select: { name: true } },
        _count: { select: { modules: true, enrollments: true } },
      },
      orderBy: { updatedAt: "desc" },
    })
  }
)

export async function getLearnerCourseOutline(
  courseId: string,
  tenantId: string,
  userId: string
) {
  const course = await prisma.course.findFirst({
    where: { id: courseId, tenantId, isPublished: true },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { position: "asc" },
          },
        },
      },
    },
  })

  if (!course) return null

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    include: {
      progress: true,
    },
  })

  const completedIds = new Set(
    enrollment?.progress.filter((p) => p.isCompleted).map((p) => p.lessonId) ??
      []
  )

  const allLessons = course.modules.flatMap((m) => m.lessons)
  const totalLessons = allLessons.length
  const completedCount = allLessons.filter((l) => completedIds.has(l.id)).length

  return {
    course,
    enrollment,
    completedLessonIds: completedIds,
    totalLessons,
    completedCount,
    progressPercent:
      totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100),
  }
}

export async function getLessonForLearner(
  courseId: string,
  lessonId: string,
  tenantId: string,
  userId: string
) {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      isPublished: true,
      module: { courseId, course: { tenantId, isPublished: true } },
    },
    include: {
      module: {
        include: {
          course: true,
        },
      },
    },
  })

  if (!lesson) return null

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    include: { progress: true },
  })

  const progress = enrollment?.progress.find((p) => p.lessonId === lessonId)

  return { lesson, enrollment, progress }
}
