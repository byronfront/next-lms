"use client"

import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { signOutAndRedirectHome } from "@/actions/auth-actions"
import { NotificationsPopover } from "./NotificationsPopover"

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b border-border/50 bg-background/75 backdrop-blur-md flex items-center justify-between px-6 shadow-sm rounded-b-2xl">

      <div className="w-full max-w-sm">
        <Input placeholder="Buscar en el panel…" />
      </div>

      <div className="flex items-center gap-3">

        <ThemeToggle />

        <NotificationsPopover />

        <div className="flex items-center gap-2 text-sm">
          <User className="h-5 w-5" />
          <span className="hidden md:inline">
            {session?.user?.name || "Usuario"}
          </span>
        </div>

        <form action={signOutAndRedirectHome}>
          <Button type="submit" variant="outline">
            Cerrar sesión
          </Button>
        </form>

      </div>

    </header>
  )
}