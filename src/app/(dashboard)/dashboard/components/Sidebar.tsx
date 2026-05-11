"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  GraduationCap,
  Shield,
} from "lucide-react"
import { canManageCourses, isSuperAdmin } from "@/lib/permissions"
import { brand } from "@/lib/brand"

function navClass(active: boolean) {
  return `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
    active ? "bg-muted font-medium" : "hover:bg-muted"
  }`
}

export function Sidebar() {
  const pathname = usePathname()
  const { data } = useSession()
  const role = data?.user?.role
  const manage = canManageCourses(role)
  const superAdmin = isSuperAdmin(role)

  return (
    <aside className="w-64 border-r bg-background hidden md:flex flex-col">
      <div className="min-h-16 flex flex-col justify-center px-6 py-3 border-b border-border/50">
        <span className="font-bold text-lg leading-tight">{brand.name}</span>
        <span className="text-[11px] text-muted-foreground font-normal">
          {brand.focus}
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <Link
          href="/dashboard"
          className={navClass(pathname === "/dashboard")}
        >
          <LayoutDashboard size={18} />
          Inicio
        </Link>

        <Link
          href="/dashboard/learn"
          className={navClass(pathname.startsWith("/dashboard/learn"))}
        >
          <GraduationCap size={18} />
          Aprender IA
        </Link>

        {manage && (
          <>
            <Link
              href="/dashboard/courses"
              className={navClass(pathname.startsWith("/dashboard/courses"))}
            >
              <BookOpen size={18} />
              Contenido (admin)
            </Link>

            <Link
              href="/dashboard/students"
              className={navClass(pathname.startsWith("/dashboard/students"))}
            >
              <Users size={18} />
              Estudiantes
            </Link>
          </>
        )}

        {superAdmin && (
          <Link
            href="/dashboard/admin/tenants"
            className={navClass(pathname.startsWith("/dashboard/admin"))}
          >
            <Shield size={18} />
            Organizaciones
          </Link>
        )}

        <Link
          href="/dashboard/settings"
          className={navClass(pathname.startsWith("/dashboard/settings"))}
        >
          <Settings size={18} />
          Ajustes
        </Link>
      </nav>
    </aside>
  )
}
