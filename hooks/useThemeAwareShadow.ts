import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface UseThemeAwareShadowProps {
  enabled: boolean
  duration?: number
}

/**
 * Hook para aplicar sombra animada que se adapta ao tema (dark/light)
 * Nota: Como o site é apenas dark mode, sempre usará a sombra clara
 * @param enabled - Ativa/desativa a sombra animada
 * @param duration - Duração do ciclo de pulsação (padrão: 2.5s)
 */
export function useThemeAwareShadow({
  enabled,
  duration = 2.5
}: UseThemeAwareShadowProps) {
  const shadowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !shadowRef.current) return

    const applyShadow = () => {
      // Como o site é sempre dark, sempre usa sombra cinza clara
      const shadowColor = "drop-shadow(0px 25px 20px rgba(80,80,80,0.4))"

      gsap.killTweensOf(shadowRef.current, "filter")
      gsap.to(shadowRef.current, {
        filter: shadowColor,
        duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    }

    applyShadow()

    return () => {
      gsap.killTweensOf(shadowRef.current)
    }
  }, [enabled, duration])

  return { shadowRef }
}
