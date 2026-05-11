"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-lg"
        className="shrink-0"
        aria-hidden
        disabled
      >
        <Sun className="h-5 w-5 opacity-50" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      className="shrink-0"
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}
