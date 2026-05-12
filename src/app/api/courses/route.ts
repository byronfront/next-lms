import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { createCourseSchema } from "@/lib/validation"
import {
  assertCanManage,
  badRequest,
  forbidden,
  requireSession,
  unauthorized,
} from "@/lib/api-route"
import { slugify } from "@/lib/slugify"

export async function POST(req: Request) {
  const session = await auth()
  const user = requireSession(session)
  if (!user?.tenantId) {
    return unauthorized("Se requiere organización (tenant)")
  }
  if (!assertCanManage(user)) {
    return forbidden("No tienes permiso para crear cursos")
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return badRequest("JSON inválido")
  }

  const parsed = createCourseSchema.safeParse(json)
  if (!parsed.success) {
    return badRequest(parsed.error.issues.map((i) => i.message).join(", "))
  }

  const data = parsed.data
  const baseSlug = data.slug ?? slugify(data.title)
  let slug = baseSlug
  let n = 0
  while (
    await prisma.course.findUnique({
      where: { tenantId_slug: { tenantId: user.tenantId, slug } },
    })
  ) {
    n += 1
    slug = `${baseSlug}-${n}`
  }

  const course = await prisma.course.create({
    data: {
      title: data.title,
      slug,
      description: data.description ?? null,
      price: data.isFree ? null : data.price ?? null,
      isFree: data.isFree ?? true,
      isPublished: data.isPublished ?? false,
      thumbnail:
        data.thumbnail && data.thumbnail.length > 0 ? data.thumbnail : null,
      tenantId: user.tenantId,
      ownerId: user.id,
    },
  })

  return NextResponse.json(course)
}
