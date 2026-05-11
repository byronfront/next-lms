"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LearnSearch({ initialQuery }: { initialQuery: string }) {
  const router = useRouter()
  const params = useSearchParams()
  const [q, setQ] = useState(initialQuery)
  const [pending, startTransition] = useTransition()

  const apply = () => {
    const next = new URLSearchParams(params?.toString())
    if (q.trim()) {
      next.set("q", q.trim())
    } else {
      next.delete("q")
    }
    startTransition(() => {
      router.push(`/dashboard/learn?${next.toString()}`)
    })
  }

  return (
    <div className="flex w-full max-w-md gap-2">
      <Input
        placeholder="Buscar rutas (ej. prompting, RAG)…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && apply()}
      />
      <Button type="button" onClick={apply} disabled={pending}>
        Buscar
      </Button>
    </div>
  )
}
