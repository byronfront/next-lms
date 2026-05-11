import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { enrollSchema } from "@/lib/validation"
import {
  badRequest,
  requireSession,
  unauthorized,
} from "@/lib/api-route"

export async function GET() {
  const session = await auth()
  const user = requireSession(session)
  if (!user?.tenantId) {
    return unauthorized()
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      course: { tenantId: user.tenantId },
    },
    include: {
      course: {
        include: {
          modules: {
            include: { lessons: true },
          },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return NextResponse.json(enrollments)
}

export async function POST(req: Request) {
  const session = await auth()
  const user = requireSession(session)
  if (!user?.tenantId) {
    return unauthorized()
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return badRequest("JSON inválido")
  }

  const parsed = enrollSchema.safeParse(json)
  if (!parsed.success) {
    return badRequest(parsed.error.issues.map((i) => i.message).join(", "))
  }

  const { courseId } = parsed.data
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      tenantId: user.tenantId,
      isPublished: true,
    },
  })

  if (!course) {
    return NextResponse.json(
      { error: "Ruta no disponible o no publicada" },
      { status: 404 }
    )
  }

  const enrollment = await prisma.enrollment.upsert({
    where: {
      userId_courseId: { userId: user.id, courseId },
    },
    create: {
      userId: user.id,
      courseId,
      status: "ACTIVE",
    },
    update: { status: "ACTIVE" },
  })

  return NextResponse.json(enrollment)
}
