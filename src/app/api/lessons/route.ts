import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { createLessonSchema } from "@/lib/validation"
import {
  assertCanManage,
  assertModuleInTenant,
  badRequest,
  forbidden,
  requireSession,
  unauthorized,
} from "@/lib/api-route"

export async function POST(req: Request) {
  const session = await auth()
  const user = requireSession(session)
  if (!user?.tenantId) {
    return unauthorized()
  }
  if (!assertCanManage(user)) {
    return forbidden()
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return badRequest("JSON inválido")
  }

  const parsed = createLessonSchema.safeParse(json)
  if (!parsed.success) {
    return badRequest(parsed.error.issues.map((i) => i.message).join(", "))
  }

  const { moduleId, title, type } = parsed.data
  const mod = await assertModuleInTenant(moduleId, user.tenantId)
  if (!mod) {
    return NextResponse.json({ error: "Módulo no encontrado" }, { status: 404 })
  }

  const last = await prisma.lesson.findFirst({
    where: { moduleId },
    orderBy: { position: "desc" },
  })

  const createdLesson = await prisma.lesson.create({
    data: {
      title,
      moduleId,
      position: last ? last.position + 1 : 0,
      type: type ?? "TEXT",
    },
  })

  return NextResponse.json(createdLesson)
}
