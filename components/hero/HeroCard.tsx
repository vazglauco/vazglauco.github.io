"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useCardAnimation } from "@/hooks/useCardAnimation"
import { useFloatingAnimation } from "@/hooks/useFloatingAnimation"
import { useShineEffect } from "@/hooks/useShineEffect"
import { useThemeAwareShadow } from "@/hooks/useThemeAwareShadow"
import { useBreathingEffect } from "@/hooks/useBreathingEffect"
import { useLoading } from "@/contexts/LoadingContext"

export function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const breathRef = useRef<HTMLDivElement>(null)

  const { phase, setPhase, config, isLoadingComplete } = useLoading()
  const [hasAnimated, setHasAnimated] = useState(false)

  // Run loading animation
  useEffect(() => {
    if (hasAnimated || !cardRef.current || !floatingRef.current) return

    const card = cardRef.current
    const floating = floatingRef.current
    const tl = gsap.timeline()

    // Calcula a distância do centro da tela até a posição natural da carta
    const rect = floating.getBoundingClientRect()
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2

    // Offset necessário para centralizar a carta
    const offsetX = centerX - cardCenterX
    const offsetY = centerY - cardCenterY

    // Setup: carta está no seu lugar natural, mas TRANSLADADA para o centro
    gsap.set(floating, {
      x: offsetX,
      y: offsetY,
      zIndex: 10000
    })
    gsap.set(card, { scale: 0, rotateY: 0 })

    // Fase 1: Zoom in (1s)
    setPhase("zoom-in")
    tl.to(card, {
      scale: 1,
      duration: config.zoomInDuration,
      ease: "power2.out"
    })

    // Fase 2: Spin (3s) - 3 voltas completas com easing dramático
    tl.add(() => setPhase("spin"))
    tl.to(card, {
      rotateY: 1080,
      duration: config.spinDuration,
      ease: "power2.inOut"
    })

    // Fase 3: Move to position (1s) - volta para x:0, y:0 (posição natural)
    tl.add(() => setPhase("move-to-position"))
    tl.to(floating, {
      x: 0,
      y: 0,
      duration: config.moveToPositionDuration,
      ease: "power2.inOut"
    })

    // Simultaneamente, rotação volta para 0 de forma suave
    tl.to(
      card,
      {
        rotateY: 0,
        scale: 1,
        duration: config.moveToPositionDuration,
        ease: "power2.out"
      },
      "<"
    )

    // Fase 4: Settling (1s) - aguarda antes de digitar
    tl.add(() => setPhase("settling"))
    tl.to({}, { duration: config.settlingDelay })

    // Transição para typing phase
    tl.add(() => setPhase("typing"))

    // Aguarda mais 1s antes de ativar animações infinitas
    tl.to({}, { duration: 1 })

    // Fase final: Complete
    tl.add(() => {
      setPhase("complete")
      setHasAnimated(true)
      // Garante que x e y estão em 0 (sem transforms pendentes)
      // Isso previne conflito com useFloatingAnimation
      gsap.set(floating, {
        x: 0,
        y: 0,
        zIndex: "auto"
      })
    })

    return () => tl.kill()
  }, [hasAnimated, config, setPhase])

  // Infinite animations - only run after loading complete
  useCardAnimation({ enabled: isLoadingComplete, cardRef })
  useFloatingAnimation({ enabled: isLoadingComplete, floatingRef })
  useShineEffect({ enabled: isLoadingComplete, shineRef })
  useThemeAwareShadow({ enabled: isLoadingComplete, shadowRef })
  useBreathingEffect({ enabled: isLoadingComplete, cardRef: breathRef, glowRef })

  return (
    <>
      <div className="flex flex-shrink-0 justify-center items-center min-w-0">
        {/* Carta - usa transform (x, y) do GSAP para centralizar e voltar */}
        <div ref={floatingRef} className="relative">
          <div
            ref={shadowRef}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            {/* Glow de fundo pulsante */}
            <div ref={glowRef} className="absolute -inset-3 md:-inset-6 lg:-inset-8 blur-xl md:blur-2xl lg:blur-3xl opacity-40 bg-gradient-radial from-yellow-500/50 via-red-500/30 to-transparent rounded-full" />

            {/* Wrapper de respiração - isola o scale do breathing do overflow-hidden */}
            <div ref={breathRef}>

            {/* Wrapper que rotaciona - contém carta e shine */}
            <div
              ref={cardRef}
              className="relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Carta */}
              <img
                src="/FINAL_CARTA GLAUCO.png"
                alt="Glauco Vaz"
                className="w-auto h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[50vh] xl:h-[55vh] max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[280px] xl:max-w-xs relative z-10 block"
              />

              {/* Shine effect - brilho que passa pela carta */}
              <div
                ref={shineRef}
                className="absolute top-0 left-0 w-1/3 h-full z-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
                  mixBlendMode: "overlay"
                }}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
