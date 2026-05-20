import type React from "react"
import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Header } from "@/components/header"

const GA_ID = "G-PXMB866NT3"

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
    <html lang="pt-BR" className="dark">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={firaCode.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
