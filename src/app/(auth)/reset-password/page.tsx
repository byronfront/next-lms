"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

function ResetForm() {
  const router = useRouter()
  const params = useSearchParams()
  const email = params.get("email") ?? ""
  const token = params.get("token") ?? ""

  const [password, setPassword] = useState("")
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      const res = await fetch("/api/account/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErr(data.error ?? "Error")
        return
      }
      router.push("/signin")
    } finally {
      setLoading(false)
    }
  }

  if (!email || !token) {
    return (
      <p className="text-sm text-muted-foreground">
        Enlace incompleto. Solicita un nuevo restablecimiento desde{" "}
        <Link href="/forgot-password" className="underline">
          aquí
        </Link>
        .
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="text-sm text-muted-foreground">Email: {email}</p>
      <Input
        type="password"
        required
        minLength={6}
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {err && <p className="text-sm text-destructive">{err}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Guardando…" : "Actualizar contraseña"}
      </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Nueva contraseña</CardTitle>
          <CardDescription>Elige una contraseña segura.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<p className="text-sm">Cargando…</p>}>
            <ResetForm />
          </Suspense>
          <p className="text-center text-sm mt-4">
            <Link href="/signin" className="text-primary underline">
              Ir a iniciar sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
