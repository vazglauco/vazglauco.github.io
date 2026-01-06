import type React from "react"
import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import "./globals.css"
import { LoadingProvider } from "@/contexts/LoadingContext"

const firaCode = Fira_Code({ subsets: ["latin"] })

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className={firaCode.className}>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  )
}
