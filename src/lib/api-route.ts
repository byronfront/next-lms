import { NextResponse } from "next/server"
import type { Session } from "next-auth"
import prisma from "@/lib/prisma"
import { canManageCourses } from "@/lib/permissions"

export function unauthorized(message = "No autorizado") {
  return NextResponse.json({ error: message }, { status: 401 })
}

export function forbidden(message = "Prohibido") {
  return NextResponse.json({ error: message }, { status: 403 })
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export type ApiSessionUser = NonNullable<Session["user"]> & {
  id: string
  tenantId: string | null
  role: string
}

export function requireSession(session: Session | null): ApiSessionUser | null {
  if (!session?.user?.id) return null
  return session.user as ApiSessionUser
}

export function requireTenantId(user: ApiSessionUser): string | null {
  return user.tenantId ?? null
}

export async function assertCourseInTenant(courseId: string, tenantId: string) {
  return prisma.course.findFirst({
    where: { id: courseId, tenantId },
  })
}

export async function assertModuleInTenant(moduleId: string, tenantId: string) {
  return prisma.module.findFirst({
    where: { id: moduleId, course: { tenantId } },
    include: { course: true },
  })
}

export async function assertLessonInTenant(lessonId: string, tenantId: string) {
  return prisma.lesson.findFirst({
    where: { id: lessonId, module: { course: { tenantId } } },
    include: { module: { include: { course: true } } },
  })
}

export function assertCanManage(user: ApiSessionUser) {
  return canManageCourses(user.role)
}
