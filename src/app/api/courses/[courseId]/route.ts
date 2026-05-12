import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { updateCourseSchema } from "@/lib/validation"
import {
  assertCanManage,
  assertCourseInTenant,
  badRequest,
  forbidden,
  requireSession,
  unauthorized,
} from "@/lib/api-route"
import { slugify } from "@/lib/slugify"

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ courseId: string }> }
) {
  const session = await auth()
  const user = requireSession(session)
  if (!user?.tenantId) {
    return unauthorized()
  }
  if (!assertCanManage(user)) {
    return forbidden()
  }

  const { courseId } = await ctx.params
  const course = await assertCourseInTenant(courseId, user.tenantId)
  if (!course) {
    return NextResponse.json({ error: "Ruta no encontrada" }, { status: 404 })
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return badRequest("JSON inválido")
  }

  const parsed = updateCourseSchema.safeParse(json)
  if (!parsed.success) {
    return badRequest(parsed.error.issues.map((i) => i.message).join(", "))
  }

  const data = parsed.data
  let slug = course.slug
  if (data.slug !== undefined) {
    slug = data.slug
  } else if (data.title !== undefined) {
    slug = slugify(data.title)
  }

  if (slug !== course.slug) {
    const clash = await prisma.course.findFirst({
      where: {
        tenantId: user.tenantId,
        slug,
        NOT: { id: course.id },
      },
    })
    if (clash) {
      return badRequest("Ya existe un curso con ese slug")
    }
  }

  const updated = await prisma.course.update({
    where: { id: course.id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.slug !== undefined || data.title !== undefined ? { slug } : {}),
      ...(data.description !== undefined && {
        description: data.description,
      }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.isFree !== undefined && { isFree: data.isFree }),
      ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
      ...(data.thumbnail !== undefined && {
        thumbnail:
          data.thumbnail && data.thumbnail.length > 0 ? data.thumbnail : null,
      }),
    },
  })

  return NextResponse.json(updated)
}
