import prisma from "@/lib/prisma"
import { isSuperAdmin } from "@/lib/permissions"
import { cache } from "react"

type PublishedCoursesOpts =
  | { tenantId: string; query?: string | null }
  | { allTenants: true; query?: string | null }

export const getPublishedCourses = cache(async (opts: PublishedCoursesOpts) => {
  const q = opts.query?.trim()
  const search = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { description: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {}
  if ("allTenants" in opts && opts.allTenants) {
    return prisma.course.findMany({
      where: {
        isPublished: true,
        ...search,
      },
      include: {
        owner: { select: { name: true } },
        tenant: { select: { name: true, slug: true } },
        _count: { select: { modules: true, enrollments: true } },
      },
      orderBy: { updatedAt: "desc" },
    })
  }

  if ("tenantId" in opts) {
    return prisma.course.findMany({
      where: {
        isPublished: true,
        tenantId: opts.tenantId,
        ...search,
      },
      include: {
        owner: { select: { name: true } },
        _count: { select: { modules: true, enrollments: true } },
      },
      orderBy: { updatedAt: "desc" },
    })
  }

  throw new Error("getPublishedCourses: tenantId o allTenants requerido")
})

export async function getPublishedCourseTenantId(
  courseId: string
): Promise<string | null> {
  const c = await prisma.course.findFirst({
    where: { id: courseId, isPublished: true },
    select: { tenantId: true },
  })
  return c?.tenantId ?? null
}

/** Para usuarios sin tenant en sesión (p. ej. SUPER_ADMIN): usa el tenant del curso publicado. */
export async function resolveTenantIdForLearnSession(
  user: { tenantId?: string | null; role?: string | null },
  courseId: string
): Promise<string | null> {
  if (user.tenantId) return user.tenantId
  if (!isSuperAdmin(user.role)) return null
  return getPublishedCourseTenantId(courseId)
}

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
