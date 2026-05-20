"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const LINES = [
  "Salve! Eu sou o Glauco.",
  "Atuo no desenvolvimento de sistemas e sites desde 2016. Construí minha carreira com forte atuação em aplicações Front End, e atualmente atuo também desenvolvendo APIs e soluções Back End, sendo um Full Stack \"coringa\", que joga em diversas posições do desenvolvimento de software, desde o planejamento estratégico, definição de arquitetura e requisitos, até a entrega final.",
  "Atualmente vivo em São Paulo, movido pela curiosidade constante de descobrir e experimentar o novo. Fora do código, gosto de drama e suspense. Escuto muito Rap, Funk e Samba. Feijoada e bolo de cenoura.",
  "Omo Orisa e Omo Ifa. Trago comigo a disciplina e postura que aprendi com quem veio antes.",
]

export function AboutMeSection() {
  const textBlockRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const vh = window.innerHeight
      const scrollY = window.scrollY

      const horizontalContainer = sectionRef.current.closest('[data-extra-scroll-start]') as HTMLElement

      if (!horizontalContainer) return

      const extraScrollStart = Number(horizontalContainer.dataset.extraScrollStart || 0)
      const extraScrollEnd = Number(horizontalContainer.dataset.extraScrollEnd || 0)
      const internalScrollLength = extraScrollEnd - extraScrollStart

      if (internalScrollLength <= 0) return

      const progress = Math.min(1, Math.max(0, (scrollY - extraScrollStart) / internalScrollLength))

      if (textBlockRef.current) {
        const textHeight = textBlockRef.current.scrollHeight
        const startY = vh * 0.35
        const endY = -(textHeight - vh * 0.3)
        const currentY = startY + progress * (endY - startY)
        textBlockRef.current.style.transform = `translateY(${currentY}px)`
      }

      if (imageRef.current) {
        const startY = 0
        const endY = -(vh * 0.35)
        const currentY = startY + progress * (endY - startY)
        imageRef.current.style.transform = `translateY(${currentY}px)`
      }

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

    const initTimeout = setTimeout(handleScroll, 150)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      clearTimeout(initTimeout)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMobile])

  // Mobile: layout simples sem mecânicas de scroll
  if (isMobile) {
    return (
      <div className="w-full bg-[#faf9f7] relative overflow-hidden">
        <div className="px-8 pt-20 pb-10">
          <div className="flex items-start gap-4 mb-10">
            <span className="block w-[4px] h-[2.5rem] bg-red-500 mt-1 rounded-full" />
            <h2 className="text-[2rem] font-black tracking-tight leading-[0.9] text-black uppercase">
              SOBRE MIM <span className="text-neutral-300">/</span>
            </h2>
          </div>

          <div className="flex flex-col gap-7">
            {LINES.map((text, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-neutral-700 font-medium"
              >
                {text}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-10 text-xl">
            <span className="text-neutral-300">♠</span>
            <span className="text-red-400">♥</span>
            <span className="text-red-400">♦</span>
            <span className="text-neutral-300">♣</span>
          </div>
        </div>

        <div className="flex justify-end px-8 pb-16 mt-4">
          <Image
            src="/ilustra_about.png"
            alt="Ilustração Glauco"
            width={280}
            height={320}
            className="object-contain w-48 h-auto"
          />
        </div>
      </div>
    )
  }

  // Desktop: layout original com animações de scroll
  return (
    <div ref={sectionRef} className="w-full h-full bg-[#faf9f7] overflow-hidden relative">
      {/* Title fixed top-left */}
      <div ref={titleRef} className="absolute top-24 left-8 md:left-16 lg:left-24 z-10 flex items-start gap-5">
        <span className="block w-[4px] h-[3rem] md:h-[4.5rem] bg-red-500 mt-2 rounded-full" />
        <h2 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-black tracking-tight leading-[0.9] text-black uppercase">
          SOBRE MIM <span className="text-neutral-300">/</span>
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
              className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-medium leading-loose tracking-wide mb-14"
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

      {/* Ilustração canto inferior direito */}
      <div
        ref={imageRef}
        className="absolute bottom-0 right-0 z-0 w-64 md:w-80 lg:w-96 pointer-events-none select-none"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/ilustra_about.png"
          alt="Ilustração Glauco"
          width={480}
          height={560}
          className="object-contain w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}
