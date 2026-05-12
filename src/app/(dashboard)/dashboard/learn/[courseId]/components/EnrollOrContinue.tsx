"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function EnrollOrContinue({
  courseId,
  isEnrolled,
}: {
  courseId: string
  isEnrolled: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const enroll = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      })
      if (res.ok) {
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  if (isEnrolled) {
    return (
      <p className="text-sm text-muted-foreground">
        Ya estás inscrito en este curso. Elige una lección abajo.
      </p>
    )
  }

  return (
    <Button onClick={enroll} disabled={loading}>
      {loading ? "Inscribiendo…" : "Inscribirme en este curso"}
    </Button>
  )
}
