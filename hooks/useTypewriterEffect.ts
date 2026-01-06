import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

interface TypewriterStep {
  ref: React.RefObject<HTMLElement>
  text: string
  duration: number
  delay?: number
}

interface UseTypewriterEffectProps {
  steps: TypewriterStep[]
  start: boolean
}

/**
 * Hook para criar efeito de digitação progressiva em múltiplos elementos
 * @param steps - Array de passos com ref, texto, duração e delay
 * @param start - Inicia a animação quando true
 */
export function useTypewriterEffect({ steps, start }: UseTypewriterEffectProps) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [hasRun, setHasRun] = useState(false)

  useEffect(() => {
    if (!start || hasRun) return

    // Inicializa todos os elementos vazios
    steps.forEach(({ ref }) => {
      if (ref.current) {
        ref.current.textContent = ""
      }
    })

    // Cria timeline de digitação
    const tl = gsap.timeline({
      onComplete: () => setHasRun(true)
    })

    steps.forEach(({ ref, text, duration, delay = 0 }, index) => {
      if (ref.current) {
        tl.to(ref.current, {
          duration,
          text,
          ease: "none"
        }, index === 0 ? 0 : `+=${delay}`)
      }
    })

    timelineRef.current = tl

    return () => {
      tl.kill()
    }
  }, [start, hasRun])

  return { timeline: timelineRef.current }
}
