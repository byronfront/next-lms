import prisma from "@/lib/prisma"
import { cache } from "react"

export const getStudentDashboardSummary = cache(
  async (tenantId: string, userId: string) => {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId,
        course: { tenantId },
      },
      include: {
        course: {
          include: {
            modules: { include: { lessons: { where: { isPublished: true } } } },
          },
        },
        progress: true,
      },
    })

    let completedLessons = 0
    let totalLessons = 0

    for (const e of enrollments) {
      const lessons = e.course.modules.flatMap((m) => m.lessons)
      totalLessons += lessons.length
      const done = new Set(
        e.progress.filter((p) => p.isCompleted).map((p) => p.lessonId)
      )
      completedLessons += lessons.filter((l) => done.has(l.id)).length
    }

    return {
      enrolledCourses: enrollments.length,
      completedLessons,
      totalLessons,
      progressPercent:
        totalLessons === 0
          ? 0
          : Math.round((completedLessons / totalLessons) * 100),
    }
  }
)
