"use client"

import { useEffect, useRef } from "react"

const LINES = [
  "Eu amo programar.",
  "Uso minha paixão e habilidades para construir produtos digitais e experiências.",
  "Sou apaixonado por código limpo, interfaces impecáveis e experiências que parecem mágica.",
]

export function AboutMeSection() {
  const textBlockRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      // The horizontal transition takes 1*vw of scroll.
      // After that, we have extra scroll for text animation.
      const transitionEnd = vw
      const internalScrollLength = 1.5 * vh

      const scrollY = window.scrollY
      const progress = Math.min(1, Math.max(0, (scrollY - transitionEnd) / internalScrollLength))

      // Move text block upward as scroll progresses
      if (textBlockRef.current) {
        const textHeight = textBlockRef.current.scrollHeight
        const startY = vh * 0.35
        const endY = -(textHeight - vh * 0.3)
        const currentY = startY + progress * (endY - startY)
        textBlockRef.current.style.transform = `translateY(${currentY}px)`
      }

      // Highlight lines based on their position on screen
      linesRef.current.forEach((line) => {
        if (!line) return
        const rect = line.getBoundingClientRect()
        const lineCenter = rect.top + rect.height / 2

        const zoneTop = vh * 0.2
        const zoneBottom = vh * 0.55

        if (lineCenter > zoneTop && lineCenter < zoneBottom) {
          line.style.color = "#1a1a1a"
        } else {
          line.style.color = "#d1d1d1"
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full h-full bg-[#faf9f7] overflow-hidden relative">
      {/* Title fixed top-left */}
      <div ref={titleRef} className="absolute top-10 left-8 md:left-16 lg:left-24 z-10 flex items-start gap-5">
        <span className="block w-[4px] h-[4rem] md:h-[6rem] bg-red-500 mt-3 rounded-full" />
        <h2 className="text-[3rem] md:text-[5rem] lg:text-[6.5rem] font-extralight tracking-tight text-neutral-300 uppercase leading-none">
          SOBRE <span className="font-black text-neutral-800">MIM</span>
        </h2>
      </div>

      {/* Scrolling text block */}
      <div
        ref={textBlockRef}
        className="absolute inset-x-0 flex flex-col items-center px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-5xl w-full text-left">
          {LINES.map((text, i) => (
            <p
              key={i}
              ref={(el) => { linesRef.current[i + 1] = el }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight mb-10"
              style={{ color: "#d1d1d1", transition: "color 0.4s ease" }}
            >
              {text}
            </p>
          ))}

          {/* Suits decoration */}
          <div className="flex items-center gap-3 mt-4 text-2xl">
            <span className="text-neutral-300">♠</span>
            <span className="text-red-400">♥</span>
            <span className="text-red-400">♦</span>
            <span className="text-neutral-300">♣</span>
          </div>
        </div>
      </div>
    </div>
  )
}
