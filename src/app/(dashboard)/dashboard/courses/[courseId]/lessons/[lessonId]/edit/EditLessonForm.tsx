"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { LessonType } from "@generated/prisma/client"

type LessonFields = {
  id: string
  title: string
  content: string | null
  videoUrl: string | null
  type: LessonType
  isPublished: boolean
  isFree: boolean
  quizData: unknown
}

export default function EditLessonForm({
  lesson,
  courseId,
}: {
  lesson: LessonFields
  courseId: string
}) {
  const router = useRouter()
  const [title, setTitle] = useState(lesson.title)
  const [content, setContent] = useState(lesson.content ?? "")
  const [videoUrl, setVideoUrl] = useState(lesson.videoUrl ?? "")
  const [type, setType] = useState<LessonType>(lesson.type)
  const [isPublished, setIsPublished] = useState(lesson.isPublished)
  const [isFree, setIsFree] = useState(lesson.isFree)
  const [quizJson, setQuizJson] = useState(
    lesson.quizData
      ? JSON.stringify(lesson.quizData, null, 2)
      : `[
  {
    "prompt": "¿Primera pregunta del quiz?",
    "options": ["Opción A", "Opción B", "Opción C"],
    "correctIndex": 0
  }
]`
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      let quizData: unknown = undefined
      if (type === "QUIZ") {
        try {
          quizData = JSON.parse(quizJson) as unknown
        } catch {
          setError("JSON del quiz inválido")
          setLoading(false)
          return
        }
      }

      const res = await fetch(`/api/lessons/${lesson.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: content || null,
          videoUrl: videoUrl || null,
          type,
          isPublished,
          isFree,
          ...(type === "QUIZ" ? { quizData } : { quizData: null }),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Error al guardar")
        return
      }
      router.push(`/dashboard/courses/${courseId}`)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      {error && <p className="text-sm text-destructive">{error}</p>}

      <div>
        <label className="text-sm font-medium">Título</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Tipo</label>
        <select
          className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          value={type}
          onChange={(e) => setType(e.target.value as LessonType)}
        >
          <option value="TEXT">Texto</option>
          <option value="VIDEO">Vídeo</option>
          <option value="QUIZ">Quiz</option>
        </select>
      </div>

      {type === "TEXT" && (
        <div>
          <label className="text-sm font-medium">Contenido</label>
          <textarea
            className="mt-1 flex min-h-[160px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}

      {type === "VIDEO" && (
        <div>
          <label className="text-sm font-medium">
            URL del reproductor (iframe src)
          </label>
          <Input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
            className="mt-1"
          />
        </div>
      )}

      {type === "QUIZ" && (
        <div>
          <label className="text-sm font-medium">Preguntas (JSON)</label>
          <textarea
            className="mt-1 flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-xs"
            value={quizJson}
            onChange={(e) => setQuizJson(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Publicada (visible para estudiantes)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
          />
          Vista previa gratuita
        </label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando…" : "Guardar lección"}
      </Button>
    </form>
  )
}
