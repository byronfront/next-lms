"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CourseForm() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [slug, setSlug] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [price, setPrice] = useState("")
  const [isFree, setIsFree] = useState(true)
  const [isPublished, setIsPublished] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const body: Record<string, unknown> = {
        title,
        description: description.trim() || null,
        isFree,
        isPublished,
        price: isFree ? null : Number(price) || 0,
      }
      if (slug.trim()) {
        body.slug = slug.trim().toLowerCase()
      }
      if (thumbnail.trim()) {
        body.thumbnail = thumbnail.trim()
      }

      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "No se pudo crear la ruta")
        return
      }
      router.push("/dashboard/courses")
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {error && <p className="text-sm text-destructive">{error}</p>}

      <Input
        placeholder="Ej. Fundamentos de LLMs para desarrolladores"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div>
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          className="mt-1 flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          placeholder="Qué aprenderán: prompting, APIs, buenas prácticas…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Input
        placeholder="Slug opcional (ej: mi-curso)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <Input
        placeholder="URL de miniatura (opcional)"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="free"
          checked={isFree}
          onChange={(e) => setIsFree(e.target.checked)}
        />
        <label htmlFor="free">Ruta gratuita</label>
      </div>

      {!isFree && (
        <Input
          type="number"
          step="0.01"
          min="0"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="pub"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <label htmlFor="pub">Publicar en el catálogo (visible en Aprender IA)</label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creando…" : "Crear ruta"}
      </Button>
    </form>
  )
}
