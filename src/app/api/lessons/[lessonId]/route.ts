import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { updateLessonSchema } from "@/lib/validation"
import {
  assertCanManage,
  assertLessonInTenant,
  badRequest,
  forbidden,
  requireSession,
  unauthorized,
} from "@/lib/api-route"
import { Prisma } from "@/lib/generated/prisma/client"

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ lessonId: string }> }
) {
  const session = await auth()
  const user = requireSession(session)
  if (!user?.tenantId) {
    return unauthorized()
  }
  if (!assertCanManage(user)) {
    return forbidden()
  }

  const { lessonId } = await ctx.params
  const lesson = await assertLessonInTenant(lessonId, user.tenantId)
  if (!lesson) {
    return NextResponse.json({ error: "Lección no encontrada" }, { status: 404 })
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return badRequest("JSON inválido")
  }

  const parsed = updateLessonSchema.safeParse(json)
  if (!parsed.success) {
    return badRequest(parsed.error.issues.map((i) => i.message).join(", "))
  }

  const data = parsed.data

  const updated = await prisma.lesson.update({
    where: { id: lesson.id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.videoUrl !== undefined && { videoUrl: data.videoUrl }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
      ...(data.isFree !== undefined && { isFree: data.isFree }),
      ...(data.quizData !== undefined && {
        quizData:
          data.quizData === null
            ? Prisma.JsonNull
            : (JSON.parse(JSON.stringify(data.quizData)) as Prisma.InputJsonValue),
      }),
    },
  })

  return NextResponse.json(updated)
}
