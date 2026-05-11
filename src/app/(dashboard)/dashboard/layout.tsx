import type { Metadata } from "next";
import type { ReactNode } from "react"
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { brand, brandMetadataTitle } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Panel · ${brandMetadataTitle}`,
  description: brand.description,
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex bg-muted/30">
            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Topbar />

                <main className="p-6">{children}</main>

            </div>
        </div>
    )
}