import type React from "react"
import type { Metadata, Viewport } from "next"
import { Fira_Code } from "next/font/google"
import Script from "next/script"
import Link from "next/link"
import "./globals.css"
import { Header } from "@/components/header"
import { RouteTransition } from "@/components/route-transition"
import { ClickTracker } from "@/components/click-tracker"

const GA_ID = "G-PXMB866NT3"

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Glauco Vaz - Software Engineer Full Stack",
  description:
    "Engenheiro de software full stack com 9 anos de experiência em bancos, fintechs e seguros. Angular, React, Node.js, arquitetura de sistemas e IA aplicada. Aberto a novas oportunidades.",
  keywords: "software engineer, desenvolvedor, full stack, arquitetura, ia, angular, react, nodejs, typescript, javascript, são paulo",
  authors: [{ name: "Glauco Vaz" }],
  openGraph: {
    title: "Glauco Vaz - Software Engineer Full Stack",
    description: "Engenheiro de software full stack com 9 anos de experiência em bancos, fintechs e seguros. Aberto a novas oportunidades.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/FINAL_CARTA GLAUCO.webp"
          fetchPriority="high"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${firaCode.className} ${firaCode.variable}`}>
        <ClickTracker />
        <Header />
        <RouteTransition>
          <Link href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[99999] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded">
            Pular para o conteúdo principal
          </Link>
          <main id="main-content">
            {children}
          </main>
        </RouteTransition>
      </body>
    </html>
  )
}
