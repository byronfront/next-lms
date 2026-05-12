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
  return `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
    active
      ? "bg-primary/12 text-foreground font-medium shadow-sm ring-1 ring-primary/15"
      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
  }`
}

export function Sidebar() {
  const pathname = usePathname()
  const { data } = useSession()
  const role = data?.user?.role
  const manage = canManageCourses(role)
  const superAdmin = isSuperAdmin(role)

  return (
    <aside className="w-64 border-r border-sidebar-border/60 bg-sidebar/85 backdrop-blur-xl hidden md:flex flex-col shadow-sm rounded-br-3xl overflow-hidden">
      <div className="min-h-16 flex flex-col justify-center px-5 py-4 border-b border-sidebar-border/50 rounded-b-2xl bg-sidebar-accent/30">
        <span className="font-bold text-lg leading-tight tracking-tight">{brand.name}</span>
        <span className="text-[11px] text-muted-foreground font-normal">
          {brand.focus}
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1.5">
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
          {brand.navCatalog}
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
