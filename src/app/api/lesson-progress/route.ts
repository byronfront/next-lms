import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { lessonProgressSchema } from "@/lib/validation"
import {
  badRequest,
  requireSession,
  unauthorized,
} from "@/lib/api-route"

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

  const parsed = lessonProgressSchema.safeParse(json)
  if (!parsed.success) {
    return badRequest(parsed.error.issues.map((i) => i.message).join(", "))
  }

  const { courseId, lessonId, isCompleted } = parsed.data

  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      module: { courseId, course: { tenantId: user.tenantId } },
    },
  })

  if (!lesson) {
    return NextResponse.json({ error: "Lección no encontrada" }, { status: 404 })
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId: user.id, courseId },
    },
  })

  if (!enrollment) {
    return NextResponse.json(
      { error: "Debes inscribirte en la ruta primero" },
      { status: 400 }
    )
  }

  const now = new Date()
  const progress = await prisma.lessonProgress.upsert({
    where: {
      enrollmentId_lessonId: {
        enrollmentId: enrollment.id,
        lessonId,
      },
    },
    create: {
      enrollmentId: enrollment.id,
      lessonId,
      isCompleted,
      completedAt: isCompleted ? now : null,
    },
    update: {
      isCompleted,
      completedAt: isCompleted ? now : null,
    },
  })

  return NextResponse.json(progress)
}
