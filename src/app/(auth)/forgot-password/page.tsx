"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    setErr(null)
    setLoading(true)
    try {
      const res = await fetch("/api/account/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErr(data.error ?? "Error")
        return
      }
      setMsg(data.message ?? "Listo.")
      if (data._devResetUrl) {
        setMsg(
          `${data.message} (dev: ${data._devResetUrl})`
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 mesh-page-bg">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Restablecer contraseña</CardTitle>
          <CardDescription>
            Te enviaremos un enlace si el email está registrado con contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {err && <p className="text-sm text-destructive">{err}</p>}
            {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Enviando…" : "Enviar"}
            </Button>
            <p className="text-center text-sm">
              <Link href="/signin" className="text-primary underline">
                Volver al inicio de sesión
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
