"use client"

import { signOut, useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Bell } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">

      <div className="w-full max-w-sm">
        <Input placeholder="Buscar en el panel…" />
      </div>

      <div className="flex items-center gap-3">

        <ThemeToggle />

        <Button variant="ghost">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 text-sm">
          <User className="h-5 w-5" />
          <span className="hidden md:inline">
            {session?.user?.name || "Usuario"}
          </span>
        </div>

        <Button
          variant="outline"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Cerrar sesión
        </Button>

      </div>

    </header>
  )
}