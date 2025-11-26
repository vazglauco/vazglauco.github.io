"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageRef.current || !containerRef.current) return

    // === Flutuar + Inclinação 3D + Flip Vertical ===
    
    // Flutuação suave para cima e para baixo (constante)
    gsap.to(containerRef.current, {
      y: -15,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })

    // Sombra dinâmica que pulsa
    gsap.to(containerRef.current, {
      filter: "drop-shadow(0px 30px 25px rgba(0,0,0,0.35))",
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })

    // Timeline principal: LOOP INFINITO PERFEITO E HIPNOTIZANTE
    function createAnimation() {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(imageRef.current, { rotateX: 0, rotateY: 0, rotate: 0 })
          createAnimation()
        }
      })
      
      const duration = 3
      const ease = "power1.inOut"
      
      tl.to(imageRef.current, {
        rotateX: 20,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(imageRef.current, {
        rotateX: -15,
        rotateY: 25,
        rotate: 5,
        duration,
        ease
      })
      .to(imageRef.current, {
        rotateX: 180,
        rotateY: -22,
        rotate: -5,
        duration,
        ease
      })
      .to(imageRef.current, {
        rotateX: 165,
        rotateY: 25,
        rotate: 6,
        duration,
        ease
      })
      .to(imageRef.current, {
        rotateX: 200,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(imageRef.current, {
        rotateX: 360,
        rotateY: 25,
        rotate: 5,
        duration,
        ease
      })
      .to(imageRef.current, {
        rotateX: 380,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(imageRef.current, {
        rotateX: 360,
        rotateY: 0,
        rotate: 0,
        duration,
        ease
      })
      
      return tl
    }
    
    const mainTimeline = createAnimation()

    return () => {
      gsap.killTweensOf(imageRef.current)
      gsap.killTweensOf(containerRef.current)
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
          <div 
            ref={containerRef}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            {/* Glow de fundo pulsante */}
            <div className="absolute -inset-8 blur-3xl opacity-40 bg-gradient-radial from-yellow-500/50 via-red-500/30 to-transparent rounded-full animate-pulse" />
            
            {/* Carta */}
            <img 
              ref={imageRef}
              src="/FINAL_CARTA GLAUCO.png" 
              alt="Glauco Vaz" 
              className="w-full max-w-xs h-auto relative z-10 card-shine"
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
