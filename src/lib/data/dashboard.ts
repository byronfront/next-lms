import prisma from "@/lib/prisma"
import { cache } from "react"

export const getDashboardStats = cache(async (tenantId: string) => {
    const [students, courses, enrollments, completedLessons, totalLessons] =
        await Promise.all([

            prisma.user.count({
                where: { tenantId, role: "STUDENT" },
            }),

            prisma.course.count({
                where: { tenantId },
            }),

            prisma.enrollment.count({
                where: {
                    course: { tenantId },
                },
            }),

            prisma.lessonProgress.count({
                where: {
                    isCompleted: true,
                    enrollment: {
                        course: { tenantId },
                    },
                },
            }),

            prisma.lesson.count({
                where: {
                    module: {
                        course: { tenantId },
                    },
                },
            }),
        ])

    const progress =
        totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100)

    return {
        students,
        courses,
        enrollments,
        progress,
    }
})