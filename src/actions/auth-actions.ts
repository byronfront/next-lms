"use server"

import { signOut } from "@/lib/auth"

/** Cierre de sesión en servidor (evita el fetch del cliente que a veces falla en prod / Vercel). */
export async function signOutAndRedirectHome() {
  await signOut({ redirectTo: "/" })
}
