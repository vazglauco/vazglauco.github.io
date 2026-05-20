"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const SERVICES = [
  {
    number: "01",
    title: "Desenvolvimento Full Stack",
    description:
      "Da interface ao servidor, construo soluções completas. Trabalho com stacks modernas no frontend e no backend, entregando aplicações escaláveis, mantíveis e prontas para o mundo real.",
    skills: [
      "React, Angular, Next.js",
      "Node.js, NestJS, Express",
      "REST APIs, GraphQL, WebSockets",
    ],
  },
  {
    number: "02",
    title: "Visão de Produto",
    description:
      "Entendo o negócio antes de escrever a primeira linha. Participo da definição de escopo, priorização de funcionalidades e alinhamento com stakeholders. Transformo requisitos difusos em decisões claras e entregas com propósito.",
    skills: [
      "Definição de escopo e requisitos",
      "Priorização e roadmap",
      "Alinhamento com stakeholders",
    ],
  },
  {
    number: "03",
    title: "Colaboração no Time",
    description:
      "Trabalho bem com pessoas. Organizo backlogs, participo de cerimônias ágeis, facilito discussões entre áreas e oriento outros desenvolvedores. Acredito que um time alinhado entrega mais do que qualquer talento individual.",
    skills: [
      "Gestão de backlog e tasks",
      "Discussão entre áreas",
      "Orientação e code review",
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
      const hsl = container.closest("[data-extra-scroll-start]") as HTMLElement | null
      if (!hsl) return

      const start = parseFloat(hsl.dataset.extraScrollStart || "0")
      const end = parseFloat(hsl.dataset.extraScrollEnd || "0")
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
    <div ref={containerRef} className="relative bg-[#111111] text-white">
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 pt-24 pb-16">
        <div className="flex items-start gap-5 mb-6">
          <span className="block w-[4px] h-[3rem] md:h-[4.5rem] bg-red-500 mt-2 rounded-full" />
          <h2 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-black tracking-tight leading-[0.9] text-white uppercase">
            O QUE FAÇO <span className="text-neutral-600">/</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-16 mt-12 md:mt-16 max-w-4xl ml-auto mr-8 md:mr-16">
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-amber-200/60 font-mono shrink-0 pt-1">
            (SERVIÇOS)
          </span>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
            Atuo em todas as etapas do desenvolvimento de software: planejamento e análise de requisitos, passando por arquitetura, codificação e testes, até o deploy e a manutenção contínua. Além da parte técnica, participo também dos momentos de definição de produto: onde a ideia ainda está tomando forma.
          </p>
        </div>
      </div>

      {/* Services — image left + sticky stacking cards right */}
      <div className="flex items-end gap-0 pt-12">

        {/* Ilustração sticky canto inferior esquerdo */}
        <div className="hidden md:block shrink-0 w-80 lg:w-[26rem] self-stretch pl-8 md:pl-12 lg:pl-16">
          <div className="sticky top-[30vh]">
            <Image
              src="/ilustra_trampos.png"
              alt="Ilustração"
              width={500}
              height={600}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col flex-1 px-8 md:px-12 lg:px-16">
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
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold italic tracking-tight" style={{ color: "rgb(235 189 51)" }}>
                  {service.title}
                </h3>
              </div>

              {/* Content — always visible, gets covered by next sticky card */}
              <div className="flex flex-col md:grid md:grid-cols-12 md:gap-x-8 min-h-[30vh] md:min-h-[40vh] pt-2">
                <div className="md:col-span-5 md:col-start-8 flex flex-col gap-6 pt-4">
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
      </div>

      {/* Spacer so the last card's content is visible before next section */}
      <div className="h-[10vh]" />
    </div>
  )
}
