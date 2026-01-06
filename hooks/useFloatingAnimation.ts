import { useEffect, type RefObject } from "react"
import { gsap } from "gsap"

interface UseFloatingAnimationProps {
  enabled: boolean
  yOffset?: number
  duration?: number
  floatingRef: RefObject<HTMLDivElement>
}

/**
 * Hook para criar animação de flutuação suave
 * @param enabled - Ativa/desativa a animação
 * @param yOffset - Distância vertical da flutuação (padrão: -15px)
 * @param duration - Duração do ciclo de flutuação (padrão: 2.5s)
 * @param floatingRef - Ref do elemento flutuante
 */
export function useFloatingAnimation({
  enabled,
  yOffset = -15,
  duration = 2.5,
  floatingRef
}: UseFloatingAnimationProps) {
  useEffect(() => {
    if (!enabled || !floatingRef.current) return

    // Garante que começa do 0 antes de iniciar a flutuação
    gsap.set(floatingRef.current, { y: 0 })

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
  }, [enabled, yOffset, duration, floatingRef])
}
