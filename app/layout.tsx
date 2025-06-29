import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoMart (demo)",
  description:
    "Every Cart Counts – Buy Better, Live Greener. Sustainable e-commerce platform promoting eco-friendly choices.",
    generator: 'Akmal'
    , icons: [
      { rel: "icon", url: "https://one.walmart.com/content/converge/en_in/tools/header/_jcr_content/header/favicon.img.png" }
    ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
