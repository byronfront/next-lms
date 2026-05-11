"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CreateModuleForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("")
  const router = useRouter()

  const handleCreate = async () => {
    if (!title) return

    await fetch("/api/modules", {
      method: "POST",
      body: JSON.stringify({
        title,
        courseId,
      }),
    })

    setTitle("")
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Nuevo módulo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button onClick={handleCreate}>
        Crear módulo
      </Button>
    </div>
  )
}