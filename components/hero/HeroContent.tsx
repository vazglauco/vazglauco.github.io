"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useTypewriterEffect } from "@/hooks/useTypewriterEffect"

export function HeroContent() {
  // Refs para efeito de digitação
  const nameRef = useRef<HTMLSpanElement>(null)
  const nameSuffixRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const desc1Ref = useRef<HTMLParagraphElement>(null)
  const desc2Ref = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const pdfLinkRef = useRef<HTMLDivElement>(null)

  // Textos
  const texts = {
    name: "glauco",
    nameSuffix: ".vaz();",
    subtitle: "Software Engineer",
    desc1: "Desenvolvedor Full Stack Sr. apaixonado por tecnologia, negócios e criação de produtos digitais. Acredito que código é mais do que lógica, é a arte que transforma ideias em realidade.",
    desc2: "Construo sites, sistemas e apps; do planejamento ao deploy.",
    pdfLink: "Veja meu currículo em PDF"
  }

  // Configuração do efeito de digitação
  useTypewriterEffect({
    start: true,
    steps: [
      { ref: nameRef, text: texts.name, duration: 1.2, delay: 0 },
      { ref: nameSuffixRef, text: texts.nameSuffix, duration: 1.4, delay: 0 },
      { ref: subtitleRef, text: texts.subtitle, duration: 1.5, delay: 0.5 },
      { ref: desc1Ref, text: texts.desc1, duration: 4, delay: 0.4 },
      { ref: desc2Ref, text: texts.desc2, duration: 2, delay: 0.4 }
    ]
  })

  // Fade in dos botões e link PDF usando TypewriterEffect
  useTypewriterEffect({
    start: true,
    steps: [
      { ref: pdfLinkRef as React.RefObject<HTMLElement>, text: "", duration: 0, delay: 11.5 }
    ]
  })

  return (
    <div className="flex-shrink w-full min-w-0 max-w-[380px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1000px]">
      <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6">
        {/* Name with code-like styling */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-tight">
          <span ref={nameRef} className="text-foreground"></span>
          <span ref={nameSuffixRef} className="text-highlight"></span>
        </h1>

        {/* Subtitle in highlight color */}
        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-highlight h-5 sm:h-6 md:h-7 lg:h-8"
        ></p>

        {/* Description */}
        <div className="space-y-1 md:space-y-2 text-muted-foreground">
          <p ref={desc1Ref} className="text-xs sm:text-sm md:text-base lg:text-lg font-light min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] lg:min-h-[4rem] xl:min-h-[4.5rem]"></p>
          <p ref={desc2Ref} className="text-xs sm:text-sm md:text-base lg:text-lg font-light min-h-[1.2rem] sm:min-h-[1.5rem] md:min-h-[1.6rem] lg:min-h-[1.75rem]"></p>
        </div>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-1 sm:pt-2 md:pt-3 lg:pt-4 opacity-0 animate-[fadeIn_0.8s_ease-in-out_10.5s_forwards]">
          <Button
            asChild
            size="sm"
            className="bg-highlight hover:bg-highlight/90 text-white font-normal text-xs sm:text-sm md:text-base lg:h-10 xl:h-11"
          >
            <a href="#skills">Conheça minhas Habilidades</a>
          </Button>

          <Button
            asChild
            size="sm"
            className="bg-white hover:bg-gray-50 text-foreground border border-border font-normal dark:bg-white dark:text-black dark:hover:bg-gray-100 text-xs sm:text-sm md:text-base lg:h-10 xl:h-11"
          >
            <a href="#contact">Entre em contato</a>
          </Button>
        </div>

        {/* PDF Link */}
        <div ref={pdfLinkRef} className="pt-1 md:pt-2 opacity-0 animate-[fadeIn_0.8s_ease-in-out_11.5s_forwards]">
          <a
            href="/curriculo-glauco-vaz.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs md:text-sm text-muted-foreground hover:text-foreground underline transition-colors"
          >
            {texts.pdfLink}
          </a>
        </div>
      </div>
    </div>
  )
}
