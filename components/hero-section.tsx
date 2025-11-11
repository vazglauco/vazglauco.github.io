"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imageRef.current) return

    const tl = gsap.timeline({ repeat: -1 })

    // Antecipação + Rotação 180° (de cabeça pra baixo)
    tl.to(imageRef.current, {
      rotate: -15,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out"
    })
      .to(imageRef.current, {
        rotate: 180,
        scale: 1,
        duration: 2.5,
        ease: "elastic.out(1, 0.5)"
      })
      // Pausa
      .to(imageRef.current, {
        duration: 1
      })
      // Antecipação + Flip 3D no eixo Y
      .to(imageRef.current, {
        rotateY: -20,
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(imageRef.current, {
        rotateY: 180,
        scale: 1,
        duration: 2.5,
        ease: "back.out(1.4)"
      })
      // Pausa
      .to(imageRef.current, {
        duration: 1
      })
      // Antecipação + Volta ao normal (de cabeça pra cima)
      .to(imageRef.current, {
        rotate: 195,
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(imageRef.current, {
        rotate: 0,
        scale: 1,
        duration: 2.5,
        ease: "elastic.out(1, 0.5)"
      })
      // Pausa
      .to(imageRef.current, {
        duration: 1
      })
      // Antecipação + Desfaz o flip 3D
      .to(imageRef.current, {
        rotateY: 200,
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(imageRef.current, {
        rotateY: 0,
        scale: 1,
        duration: 2.5,
        ease: "back.out(1.4)"
      })
      // Pausa final antes de repetir
      .to(imageRef.current, {
        duration: 1.5
      })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="sobre" className="h-screen flex items-center bg-background relative snap-start snap-always">
      <div className="w-full flex items-center justify-between gap-12 pl-20 md:pl-32 lg:pl-48 pr-6">
        {/* Left content */}
        <div className="flex-1">
          {/* Main content */}
          <div className="space-y-6">
            {/* Name with code-like styling */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              <span className="text-foreground">glauco</span>
              <span className="text-highlight">.</span>
              <span className="text-highlight">vaz</span>
              <span className="text-highlight">{"();"}</span>
            </h1>

            {/* Subtitle in highlight color */}
            <p className="text-xl md:text-2xl font-normal text-highlight">
              Software Engineer
            </p>

            {/* Description */}
            <div className="space-y-2 text-muted-foreground max-w-2xl">
              <p className="text-base md:text-lg font-light">
                Desenvolvedor Full Stack Sr. apaixonado por tecnologia, negócios e criação de produtos digitais. Acredito que código é mais do que lógica, é a arte que transforma ideias em realidade.
              </p>
              <p className="text-base md:text-lg font-light">
                Construo sites, sistemas e apps; do planejamento ao deploy.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-highlight hover:bg-highlight/90 text-white font-normal"
              >
                <a href="#skills">Conheça minhas Habilidades</a>
              </Button>
              
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-50 text-foreground border border-border font-normal dark:bg-white dark:text-black dark:hover:bg-gray-100"
              >
                <a href="#contact">Entre em contato</a>
              </Button>
            </div>

            {/* PDF Link */}
            <div className="pt-2">
              <a 
                href="/curriculo-glauco-vaz.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
              >
                Veja meu currículo em PDF
              </a>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="hidden lg:flex flex-1 justify-center items-center pr-36">
          <img 
            ref={imageRef}
            src="/FINAL_CARTA GLAUCO.png" 
            alt="Glauco Vaz" 
            className="w-full max-w-xs h-auto"
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      </div>
    </section>
  )
}
