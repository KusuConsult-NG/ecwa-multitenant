import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ECWA Multi-Tenant App",
  description: "Multi-tenant ECWA financial management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
