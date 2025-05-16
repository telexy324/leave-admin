import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@leave-admin/ui/globals.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Leave Admin",
  description: "Leave Management System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="stylesheet" href="@leave-admin/ui/globals.css" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
} 