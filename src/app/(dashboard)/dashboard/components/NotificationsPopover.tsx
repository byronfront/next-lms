"use client"

import { Bell } from "lucide-react"
import { Popover } from "radix-ui"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Panel del icono campana (hoy sin backend de notificaciones; estado vacío explícito). */
export function NotificationsPopover() {
  return (
    <Popover.Root modal={false}>
      <Popover.Trigger
        type="button"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        aria-label="Abrir notificaciones"
      >
        <Bell className="h-5 w-5" aria-hidden />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          collisionPadding={16}
          className={cn(
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 w-[min(calc(100vw-2rem),22rem)] origin-top-right rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none",
            "duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out"
          )}
        >
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold tracking-tight">
              Notificaciones
            </h2>
          </div>

          <div className="px-4 py-10 text-center sm:py-12">
            <p className="text-sm font-medium text-foreground">
              No hay notificaciones
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Cuando tengamos avisos sobre tus cursos o tu centro,
              aparecerán aquí.
            </p>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
