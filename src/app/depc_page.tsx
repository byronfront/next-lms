import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SignOut } from "@/components/auth-components";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="flex flex-col items-center bg-neutral-800 rounded-lg p-6 max-w-xl w-full">
        <h1 className="text-white text-xl mb-4 text-center">Auth.js + Prisma</h1>
        <div className="text-center text-white">Bienvenido {session.user?.name}</div>
        <SignOut />
      </div>
    </div>
  );
}
