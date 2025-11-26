import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface UseCardAnimationProps {
  enabled: boolean
  duration?: number
  ease?: string
}

/**
 * Hook para criar animação 3D infinita de rotação do card
 * @param enabled - Ativa/desativa a animação
 * @param duration - Duração de cada fase da rotação (padrão: 3s)
 * @param ease - Easing da animação (padrão: "power1.inOut")
 */
export function useCardAnimation({
  enabled,
  duration = 3,
  ease = "power1.inOut"
}: UseCardAnimationProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !cardRef.current) return

    function createAnimation() {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(cardRef.current, { rotateX: 0, rotateY: 0, rotate: 0 })
          createAnimation()
        }
      })

      tl.to(cardRef.current, {
        rotateX: 20,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(cardRef.current, {
        rotateX: -15,
        rotateY: 25,
        rotate: 5,
        duration,
        ease
      })
      .to(cardRef.current, {
        rotateX: 180,
        rotateY: -22,
        rotate: -5,
        duration,
        ease
      })
      .to(cardRef.current, {
        rotateX: 165,
        rotateY: 25,
        rotate: 6,
        duration,
        ease
      })
      .to(cardRef.current, {
        rotateX: 200,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(cardRef.current, {
        rotateX: 360,
        rotateY: 25,
        rotate: 5,
        duration,
        ease
      })
      .to(cardRef.current, {
        rotateX: 380,
        rotateY: -25,
        rotate: -5,
        duration,
        ease
      })
      .to(cardRef.current, {
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
      gsap.killTweensOf(cardRef.current)
      mainTimeline.kill()
    }
  }, [enabled, duration, ease])

  return { cardRef }
}
