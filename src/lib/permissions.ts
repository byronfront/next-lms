import type { Role } from "@generated/prisma/client"

const MANAGE_ROLES: Role[] = ["SUPER_ADMIN", "ADMIN", "INSTRUCTOR"]

export function canManageCourses(role: string | undefined | null): boolean {
  if (!role) return false
  return MANAGE_ROLES.includes(role as Role)
}

export function isSuperAdmin(role: string | undefined | null): boolean {
  return role === "SUPER_ADMIN"
}
