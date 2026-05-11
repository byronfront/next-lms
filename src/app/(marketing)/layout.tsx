import type { Metadata } from "next";
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import type { ReactNode } from "react"
import { brand, brandMetadataTitle } from "@/lib/brand"

export const metadata: Metadata = {
  title: brandMetadataTitle,
  description: brand.description,
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}