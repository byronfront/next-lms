"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignUpForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error ?? "No se pudo crear la cuenta")
      }

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Algo salió mal")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Input
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creando..." : "Crear cuenta"}
      </Button>

    </div>
  )
}
