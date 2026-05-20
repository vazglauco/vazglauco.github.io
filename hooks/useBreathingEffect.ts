import { useEffect, useRef, type RefObject } from "react"
import { gsap } from "gsap"

interface UseBreathingEffectProps {
  enabled: boolean
  idleDelay?: number
  cardRef: RefObject<HTMLDivElement>
  glowRef: RefObject<HTMLDivElement>
}

/**
 * Hook que detecta ociosidade do mouse e inicia efeito de "respiração" na carta.
 * Após `idleDelay` ms sem movimento, a carta pulsa suavemente em escala e o glow
 * de fundo intensifica. Quando o mouse volta a mover, tudo retorna ao normal.
 */
export function useBreathingEffect({
  enabled,
  idleDelay = 2500,
  cardRef,
  glowRef
}: UseBreathingEffectProps) {
  const scaleTweenRef = useRef<gsap.core.Tween | null>(null)
  const glowTweenRef = useRef<gsap.core.Tween | null>(null)
  const isBreathingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled) return

    const startBreathing = () => {
      if (isBreathingRef.current) return
      const card = cardRef.current
      const glow = glowRef.current
      if (!card || !glow) return

      isBreathingRef.current = true

      // Escala suave na carta — useCardAnimation só usa rotateX/Y/rotate, não scale
      scaleTweenRef.current = gsap.to(card, {
        scale: 1.07,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })

      // Glow expande e intensifica fortemente
      glowTweenRef.current = gsap.to(glow, {
        opacity: 0.9,
        scale: 1.6,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    }

    const stopBreathing = () => {
      if (!isBreathingRef.current) return
      isBreathingRef.current = false

      if (scaleTweenRef.current) {
        scaleTweenRef.current.kill()
        scaleTweenRef.current = null
      }
      if (glowTweenRef.current) {
        glowTweenRef.current.kill()
        glowTweenRef.current = null
      }

      const card = cardRef.current
      const glow = glowRef.current

      if (card) {
        gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out" })
      }
      if (glow) {
        gsap.to(glow, { opacity: 0.4, scale: 1, duration: 0.5, ease: "power2.out" })
      }
    }

    const handleMouseMove = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      stopBreathing()
      timerRef.current = setTimeout(startBreathing, idleDelay)
    }

    // Inicia o timer de ociosidade imediatamente ao habilitar
    timerRef.current = setTimeout(startBreathing, idleDelay)

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timerRef.current) clearTimeout(timerRef.current)
      if (scaleTweenRef.current) scaleTweenRef.current.kill()
      if (glowTweenRef.current) glowTweenRef.current.kill()
    }
  }, [enabled, idleDelay, cardRef, glowRef])
}
