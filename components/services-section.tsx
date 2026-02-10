"use client"

import { useEffect, useRef } from "react"

const SERVICES = [
  {
    number: "01",
    title: "Full-Stack Development",
    description:
      "Da interação no frontend até APIs robustas no backend, construo soluções web completas. Trabalho com stacks modernas para entregar aplicações escaláveis, mantíveis e prontas para o mundo real.",
    skills: [
      "React, Angular, Next.js",
      "Node.js, NestJS, Express",
      "REST APIs, GraphQL, WebSockets",
    ],
  },
  {
    number: "02",
    title: "UI/UX & Frontend",
    description:
      "Design é mais do que aparência — é sobre clareza e conexão. Crio interfaces limpas, responsivas e intuitivas em qualquer dispositivo. Meu foco está em acessibilidade e experiências fluidas.",
    skills: [
      "Next.js, TailwindCSS, GSAP",
      "Figma to Code",
      "HTML, CSS, JavaScript, TypeScript",
    ],
  },
  {
    number: "03",
    title: "Arquitetura & DevOps",
    description:
      "Além do código, atuo na automação e entrega contínua, garantindo estabilidade e eficiência em cada etapa. Projeto arquiteturas escaláveis e pipelines otimizados.",
    skills: [
      "Docker, AWS, CI/CD",
      "Microserviços, Microfrontends",
      "PostgreSQL, MongoDB, Redis",
    ],
  },
]

// Each card sticks at an increasing `top`, so the next card scrolls up
// and covers the previous card's content — pure CSS sticky stacking.
// mb = scroll space before the next card reaches its sticky position.
const STICKY_CONFIG = [
  { top: "20vh", mb: "mb-[22em] sm:mb-[20em] lg:mb-[21em]" },
  { top: "calc(20vh + 6em)", mb: "mb-[14em] sm:mb-[13em] lg:mb-[14em]" },
  { top: "calc(20vh + 12em)", mb: "mb-[8em]" },
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const hsl = container.closest("[data-hsl-extra-start]") as HTMLElement | null
      if (!hsl) return

      const start = parseFloat(hsl.dataset.hslExtraStart || "0")
      const end = parseFloat(hsl.dataset.hslExtraEnd || "0")
      if (end <= start) return

      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)))
      container.scrollTop = progress * (container.scrollHeight - container.clientHeight)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    const timer = setTimeout(handleScroll, 300)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative bg-[#111111] text-white h-full overflow-hidden">
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 pt-24 pb-16">
        <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[8rem] font-black tracking-tight leading-[0.9] text-white uppercase">
          WHAT I DO <span className="text-neutral-600">/</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-16 mt-12 md:mt-16 max-w-4xl ml-auto mr-8 md:mr-16">
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-amber-200/60 font-mono shrink-0 pt-1">
            (SERVICES)
          </span>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
            Sou especialista em construir aplicações web full-stack que são rápidas, confiáveis e fáceis de usar. Com uma base sólida em tecnologias de frontend e backend, ajudo a transformar ideias em realidade.
          </p>
        </div>
      </div>

      {/* Services — sticky stacking cards */}
      <div className="flex flex-col px-8 md:px-16 lg:px-24 pt-12">
        {SERVICES.map((service, i) => {
          const config = STICKY_CONFIG[i]

          return (
            <div
              key={i}
              className={`sticky border-t border-neutral-800 bg-[#111111] ${config.mb}`}
              style={{ top: config.top }}
            >
              {/* Header row — number + title */}
              <div className="flex items-baseline gap-8 md:gap-16 py-5 md:py-6">
                <span className="text-xl md:text-3xl lg:text-4xl font-bold text-neutral-600 shrink-0">
                  ({service.number})
                </span>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold italic tracking-tight text-amber-100/90">
                  {service.title}
                </h3>
              </div>

              {/* Content — always visible, gets covered by next sticky card */}
              <div className="flex flex-col md:grid md:grid-cols-12 md:gap-x-8 min-h-[30vh] md:min-h-[40vh] pt-2">
                <div className="md:col-span-7 md:col-start-6 flex flex-col gap-6 pt-4">
                  <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-[40ch] text-balance">
                    {service.description}
                  </p>

                  <div className="flex flex-col divide-y divide-neutral-800/60">
                    {service.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="flex items-start gap-4 py-3 font-bold text-amber-100/80 text-base md:text-lg"
                      >
                        <span className="font-mono text-sm font-medium leading-[200%] text-neutral-500">
                          0{j + 1}
                        </span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Spacer so the last card's content is visible before next section */}
      <div className="h-[10vh]" />
    </div>
  )
}
