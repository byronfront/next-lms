"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type Question = {
  prompt: string
  options: string[]
  correctIndex: number
}

export default function QuizPlayer({
  courseId,
  lessonId,
  quiz,
  initiallyCompleted,
}: {
  courseId: string
  lessonId: string
  quiz: Question[]
  initiallyCompleted: boolean
}) {
  const router = useRouter()
  const [answers, setAnswers] = useState<number[]>(
    () => quiz.map(() => -1)
  )
  const [done, setDone] = useState(initiallyCompleted)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!Array.isArray(quiz) || quiz.length === 0) {
    return (
      <p className="text-muted-foreground">
        Este quiz no tiene preguntas configuradas.
      </p>
    )
  }

  const submit = async () => {
    setError(null)
    const ok = quiz.every(
      (q, i) => answers[i] === q.correctIndex
    )
    if (!ok) {
      setError("Revisa las respuestas: alguna no es correcta.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId, isCompleted: true }),
      })
      if (res.ok) {
        setDone(true)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {quiz.map((q, qi) => (
        <div key={qi} className="rounded-lg border p-4 space-y-2">
          <p className="font-medium">
            {qi + 1}. {q.prompt}
          </p>
          <div className="space-y-1">
            {q.options.map((opt, oi) => (
              <label
                key={oi}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name={`q-${qi}`}
                  checked={answers[qi] === oi}
                  onChange={() => {
                    const next = [...answers]
                    next[qi] = oi
                    setAnswers(next)
                  }}
                  disabled={done}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!done && (
        <Button
          onClick={submit}
          disabled={loading || answers.some((a) => a < 0)}
        >
          {loading ? "Comprobando…" : "Enviar respuestas"}
        </Button>
      )}

      {done && (
        <p className="text-sm font-medium text-green-600 dark:text-green-400">
          ¡Quiz completado!
        </p>
      )}
    </div>
  )
}
