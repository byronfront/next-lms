import prisma from "@/lib/prisma"
import { cache } from "react"

export const getCourses = cache(async (tenantId: string) => {
    return prisma.course.findMany({
        where: {
            tenantId,
        },
        include: {
            owner: true,
            _count: {
                select: {
                    enrollments: true,
                    modules: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    })
})
