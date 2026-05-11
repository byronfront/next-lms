"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CompleteLessonButton({
  courseId,
  lessonId,
  disabled,
  label,
}: {
  courseId: string
  lessonId: string
  disabled: boolean
  label: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const mark = async () => {
    setLoading(true)
    try {
      await fetch("/api/lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId, isCompleted: true }),
      })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={mark} disabled={disabled || loading} variant="default">
      {loading ? "Guardando…" : label}
    </Button>
  )
}
