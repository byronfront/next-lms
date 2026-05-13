import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { createModuleSchema } from "@/lib/validation"
import {
  assertCanManage,
  assertCourseInTenant,
  badRequest,
  forbidden,
  requireSession,
  unauthorized,
} from "@/lib/api-route"
import { getEffectiveTenantIdForUser } from "@/lib/getTenant"
import { isSuperAdmin } from "@/lib/permissions"

export async function POST(req: Request) {
  const session = await auth()
  const user = requireSession(session)
  if (!user) {
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

  const parsed = createModuleSchema.safeParse(json)
  if (!parsed.success) {
    return badRequest(parsed.error.issues.map((i) => i.message).join(", "))
  }

  const { courseId, title } = parsed.data
  const tenantId = await getEffectiveTenantIdForUser(user)
  const course = isSuperAdmin(user.role)
    ? await prisma.course.findUnique({ where: { id: courseId } })
    : tenantId
      ? await assertCourseInTenant(courseId, tenantId)
      : null
  if (!course) {
    return NextResponse.json({ error: "Ruta no encontrada" }, { status: 404 })
  }

  const last = await prisma.module.findFirst({
    where: { courseId },
    orderBy: { position: "desc" },
  })

  const createdModule = await prisma.module.create({
    data: {
      title,
      courseId,
      position: last ? last.position + 1 : 0,
    },
  })

  return NextResponse.json(createdModule)
}
