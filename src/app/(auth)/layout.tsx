import type { Metadata } from "next";
import type { ReactNode } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { brand, brandMetadataTitle } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Cuenta · ${brandMetadataTitle}`,
  description: brand.description,
};

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen">
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            {children}
        </div>
    )
}