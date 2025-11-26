"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(TextPlugin)

export function HeroSection() {
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  
  // Refs para efeito de digitação
  const nameRef = useRef<HTMLSpanElement>(null)
  const nameSuffixRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const desc1Ref = useRef<HTMLParagraphElement>(null)
  const desc2Ref = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const pdfLinkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageRef.current || !containerRef.current || !cardWrapperRef.current || !shineRef.current) return

    // === EFEITO DE DIGITAÇÃO PROGRESSIVO ===
    const typingTl = gsap.timeline()
    
    // Textos originais
    const texts = {
      name: "glauco",
      nameSuffix: ".vaz();",
      subtitle: "Software Engineer",
      desc1: "Desenvolvedor Full Stack Sr. apaixonado por tecnologia, negócios e criação de produtos digitais. Acredito que código é mais do que lógica, é a arte que transforma ideias em realidade.",
      desc2: "Construo sites, sistemas e apps; do planejamento ao deploy.",
      pdfLink: "Veja meu currículo em PDF"
    }
    
    // Inicializa elementos vazios e invisíveis
    if (nameRef.current) nameRef.current.textContent = ""
    if (nameSuffixRef.current) nameSuffixRef.current.textContent = ""
    if (subtitleRef.current) subtitleRef.current.textContent = ""
    if (desc1Ref.current) desc1Ref.current.textContent = ""
    if (desc2Ref.current) desc2Ref.current.textContent = ""
    if (buttonsRef.current) gsap.set(buttonsRef.current, { opacity: 0 })
    if (pdfLinkRef.current) {
      const linkEl = pdfLinkRef.current.querySelector('a')
      if (linkEl) linkEl.textContent = ""
    }
    
    // Digitação do nome (parte branca)
    typingTl.to(nameRef.current, {
      duration: 1.2,
      text: texts.name,
      ease: "none"
    })
    // Digitação do sufixo (parte vermelha/highlight)
    .to(nameSuffixRef.current, {
      duration: 1.4,
      text: texts.nameSuffix,
      ease: "none"
    })
    // Digitação do subtítulo
    .to(subtitleRef.current, {
      duration: 1.5,
      text: texts.subtitle,
      ease: "none"
    }, "+=0.5")
    // Digitação da descrição 1
    .to(desc1Ref.current, {
      duration: 4,
      text: texts.desc1,
      ease: "none"
    }, "+=0.4")
    // Digitação da descrição 2
    .to(desc2Ref.current, {
      duration: 2,
      text: texts.desc2,
      ease: "none"
    }, "+=0.4")
    // Fade in dos botões
    .to(buttonsRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "+=0.5")
    // Digitação do link PDF
    .to(pdfLinkRef.current?.querySelector('a'), {
      duration: 1,
      text: texts.pdfLink,
      ease: "none"
    }, "+=0.4")

    // Função para aplicar a sombra baseada no tema
    const applyShadow = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const shadowColor = isDark 
        ? "drop-shadow(0px 25px 20px rgba(80,80,80,0.4))"   // Sombra cinza clara no dark
        : "drop-shadow(0px 25px 20px rgba(0,0,0,0.2))"     // Sombra preta mais sutil no light
      
      gsap.killTweensOf(containerRef.current, "filter")
      gsap.to(containerRef.current, {
        filter: shadowColor,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    }
    
    // === Flutuar + Inclinação 3D + Flip Vertical ===
    
    // Flutuação suave para cima e para baixo (constante)
    gsap.to(containerRef.current, {
      y: -15,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })

    // Aplica sombra inicial
    applyShadow()
    
    // Observer para mudança de tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          applyShadow()
        }
      })
    })
    
    observer.observe(document.documentElement, { attributes: true })

    // Shine effect - brilho que passa pela carta
    const shineTl = gsap.timeline({ repeat: -1, repeatDelay: 4 })
    shineTl.set(shineRef.current, { left: "-40%" })
    shineTl.to(shineRef.current, {
      left: "140%",
      duration: 1.2,
      ease: "power2.inOut"
    })

    // Timeline principal: LOOP INFINITO PERFEITO E HIPNOTIZANTE
    function createAnimation() {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(cardWrapperRef.current, { rotateX: 0, rotateY: 0, rotate: 0 })
          createAnimation()
        }
      })
      
      const duration = 3
      const ease = "power1.inOut"
      
      tl.to(cardWrapperRef.current, {
        rotateX: 20,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(cardWrapperRef.current, {
        rotateX: -15,
        rotateY: 25,
        rotate: 5,
        duration,
        ease
      })
      .to(cardWrapperRef.current, {
        rotateX: 180,
        rotateY: -22,
        rotate: -5,
        duration,
        ease
      })
      .to(cardWrapperRef.current, {
        rotateX: 165,
        rotateY: 25,
        rotate: 6,
        duration,
        ease
      })
      .to(cardWrapperRef.current, {
        rotateX: 200,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(cardWrapperRef.current, {
        rotateX: 360,
        rotateY: 25,
        rotate: 5,
        duration,
        ease
      })
      .to(cardWrapperRef.current, {
        rotateX: 380,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(cardWrapperRef.current, {
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
      gsap.killTweensOf(cardWrapperRef.current)
      gsap.killTweensOf(containerRef.current)
      gsap.killTweensOf(shineRef.current)
      observer.disconnect()
    }
    
  }, [])

  return (
    <section id="sobre" className="h-screen flex items-center bg-background relative snap-start snap-always">
      <div className="w-full mx-auto flex items-center justify-center gap-72 px-8 md:px-16 lg:px-24">
        {/* Left content */}
        <div className="flex-shrink-0 w-[1100px]">
          {/* Main content */}
          <div className="space-y-6">
            {/* Name with code-like styling */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              <span ref={nameRef} className="text-foreground"></span>
              <span ref={nameSuffixRef} className="text-highlight"></span>
            </h1>

            {/* Subtitle in highlight color */}
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl font-normal text-highlight h-8"
            ></p>

            {/* Description */}
            <div className="space-y-2 text-muted-foreground">
              <p ref={desc1Ref} className="text-base md:text-lg font-light min-h-[4.5rem]"></p>
              <p ref={desc2Ref} className="text-base md:text-lg font-light min-h-[1.75rem]"></p>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
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
            <div ref={pdfLinkRef} className="pt-2">
              <a 
                href="/curriculo-glauco-vaz.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
              ></a>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="hidden lg:flex flex-shrink-0 justify-center items-center">
          <div 
            ref={containerRef}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            {/* Glow de fundo pulsante */}
            <div className="absolute -inset-8 blur-3xl opacity-40 bg-gradient-radial from-yellow-500/50 via-red-500/30 to-transparent rounded-full animate-pulse" />
            
            {/* Wrapper que rotaciona - contém carta e shine */}
            <div
              ref={cardWrapperRef}
              className="relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Carta */}
              <img 
                ref={imageRef}
                src="/FINAL_CARTA GLAUCO.png" 
                alt="Glauco Vaz" 
                className="w-full max-w-xs h-auto relative z-10 block"
              />
              
              {/* Shine effect - brilho que passa pela carta */}
              <div
                ref={shineRef}
                className="absolute top-0 left-0 w-1/3 h-full z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
                  mixBlendMode: "overlay"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
