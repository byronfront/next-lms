"use server"

import { signOut } from "@/lib/auth"
import { redirect } from "next/navigation"

/**
 * Cierra sesión en servidor y redirige a / usando el mismo host de la petición.
 * Sin esto, Auth.js puede enviar Location a localhost si AUTH_URL/NEXTAUTH_URL lo definen así en Vercel.
 */
export async function signOutAndRedirectHome() {
  await signOut({ redirect: false })
  redirect("/")
}
