"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CreateLessonForm({ moduleId }: { moduleId: string }) {
  const [title, setTitle] = useState("")
  const router = useRouter()

  const handleCreate = async () => {
    if (!title) return

    await fetch("/api/lessons", {
      method: "POST",
      body: JSON.stringify({
        title,
        moduleId,
      }),
    })

    setTitle("")
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Nueva lección"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button size="sm" onClick={handleCreate}>
        + Lección
      </Button>
    </div>
  )
}