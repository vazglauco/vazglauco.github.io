import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Glauco Vaz - Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack com 9 anos de experiência em projetos web de alta complexidade. Especialista em Angular, React, Node.js e arquitetura de software.",
  keywords: "desenvolvedor, full stack, angular, react, nodejs, typescript, javascript, são paulo",
  authors: [{ name: "Glauco Vaz" }],
  openGraph: {
    title: "Glauco Vaz - Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack com 9 anos de experiência em projetos web de alta complexidade.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
