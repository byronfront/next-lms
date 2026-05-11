import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { canManageCourses } from "@/lib/permissions"

export default async function CoursesManagementLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/signin")
  }
  if (!canManageCourses(session.user.role)) {
    redirect("/dashboard/learn")
  }
  return children
}
