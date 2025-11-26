import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface UseShineEffectProps {
  enabled: boolean
  duration?: number
  repeatDelay?: number
}

/**
 * Hook para criar efeito de brilho que passa sobre um elemento
 * @param enabled - Ativa/desativa o efeito
 * @param duration - Duração do movimento do brilho (padrão: 1.2s)
 * @param repeatDelay - Delay entre repetições (padrão: 4s)
 */
export function useShineEffect({
  enabled,
  duration = 1.2,
  repeatDelay = 4
}: UseShineEffectProps) {
  const shineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !shineRef.current) return

    const shineTl = gsap.timeline({ repeat: -1, repeatDelay })

    shineTl.set(shineRef.current, { left: "-40%" })
    shineTl.to(shineRef.current, {
      left: "140%",
      duration,
      ease: "power2.inOut"
    })

    return () => {
      shineTl.kill()
    }
  }, [enabled, duration, repeatDelay])

  return { shineRef }
}
