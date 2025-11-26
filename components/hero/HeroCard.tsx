"use client"

import { useCardAnimation } from "@/hooks/useCardAnimation"
import { useFloatingAnimation } from "@/hooks/useFloatingAnimation"
import { useShineEffect } from "@/hooks/useShineEffect"
import { useThemeAwareShadow } from "@/hooks/useThemeAwareShadow"

export function HeroCard() {
  const { cardRef } = useCardAnimation({ enabled: true })
  const { floatingRef } = useFloatingAnimation({ enabled: true })
  const { shineRef } = useShineEffect({ enabled: true })
  const { shadowRef } = useThemeAwareShadow({ enabled: true })

  return (
    <div className="flex flex-shrink-0 justify-center items-center min-w-0">
      <div
        ref={floatingRef}
        className="relative"
      >
        <div
          ref={shadowRef}
          className="relative"
          style={{ perspective: "1000px" }}
        >
          {/* Glow de fundo pulsante */}
          <div className="absolute -inset-3 md:-inset-6 lg:-inset-8 blur-xl md:blur-2xl lg:blur-3xl opacity-40 bg-gradient-radial from-yellow-500/50 via-red-500/30 to-transparent rounded-full animate-pulse" />

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
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
                mixBlendMode: "overlay"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
