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
        <div className="mesh-page-bg min-h-screen flex">
            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Topbar />

                <main className="p-6 md:p-8">{children}</main>

            </div>
        </div>
    )
}