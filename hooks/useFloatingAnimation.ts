import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface UseFloatingAnimationProps {
  enabled: boolean
  yOffset?: number
  duration?: number
}

/**
 * Hook para criar animação de flutuação suave
 * @param enabled - Ativa/desativa a animação
 * @param yOffset - Distância vertical da flutuação (padrão: -15px)
 * @param duration - Duração do ciclo de flutuação (padrão: 2.5s)
 */
export function useFloatingAnimation({
  enabled,
  yOffset = -15,
  duration = 2.5
}: UseFloatingAnimationProps) {
  const floatingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !floatingRef.current) return

    // Flutuação suave
    const floatingTween = gsap.to(floatingRef.current, {
      y: yOffset,
      duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })

    return () => {
      floatingTween.kill()
    }
  }, [enabled, yOffset, duration])

  return { floatingRef }
}
