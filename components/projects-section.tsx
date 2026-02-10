"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  description: string
  stack: string[]
  url: string
  label?: string
}

const PROJECTS: Project[] = [
  {
    title: "Portfolio Pessoal",
    description:
      "Site pessoal com design interativo, scroll horizontal e animações fluídas. Construído com Next.js, GSAP e TailwindCSS.",
    stack: ["Next.js", "TypeScript", "GSAP", "TailwindCSS"],
    url: "https://vazglauco.github.io",
    label: "Visitar",
  },
  {
    title: "Task Flow",
    description:
      "Aplicação de gerenciamento de tarefas com drag & drop, filtros avançados e dashboard com métricas em tempo real.",
    stack: ["Angular", "NestJS", "PostgreSQL", "Docker"],
    url: "#",
    label: "Em breve",
  },
  {
    title: "DevConnect",
    description:
      "Plataforma de networking para desenvolvedores, com sistema de match baseado em skills e interesses técnicos.",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    url: "#",
    label: "Em breve",
  },
  {
    title: "AI Content Studio",
    description:
      "Ferramenta de geração de conteúdo com IA, integração com GPT e fluxos automatizados de criação e publicação.",
    stack: ["Next.js", "Python", "OpenAI API", "Redis"],
    url: "#",
    label: "Em breve",
  },
  {
    title: "FinTrack",
    description:
      "Dashboard financeiro pessoal com gráficos interativos, importação de extratos e categorização automática de gastos.",
    stack: ["Angular", "NestJS", "Chart.js", "PostgreSQL"],
    url: "#",
    label: "Em breve",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        return -(trackWidth - viewportWidth)
      }

      // Main horizontal scroll — pin the section, slide the track left
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      // Each card fades/slides in from the right as it enters the viewport
      cardsRef.current.forEach((card) => {
        if (!card) return

        gsap.fromTo(
          card,
          { x: 120, opacity: 0, scale: 0.92 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 95%",
              end: "left 60%",
              scrub: 0.5,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative bg-white"
    >
      <div className="h-screen flex flex-col justify-center overflow-hidden">
        {/* Header — always visible, no separate scroll trigger */}
        <div className="px-8 md:px-16 lg:px-24 mb-8 md:mb-12 pt-16 shrink-0">
          <div className="flex items-start gap-5 mb-6">
            <span className="block w-[4px] h-[4rem] md:h-[6rem] bg-amber-600 mt-3 rounded-full" />
            <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-black tracking-tight leading-[0.9] text-black uppercase">
              PROJETOS <span className="text-neutral-300">/</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16 max-w-4xl ml-auto mr-8 md:mr-16">
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-amber-700/60 font-mono shrink-0 pt-1">
              (PORTFOLIO)
            </span>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-lg">
              Projetos pessoais e profissionais que refletem minha paixão por
              criar soluções digitais com propósito e qualidade.
            </p>
          </div>
        </div>

        {/* Horizontal cards track */}
        <div
          ref={trackRef}
          className="flex items-center gap-8 px-8 md:px-16 lg:px-24 flex-nowrap"
          style={{ width: "max-content" }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              className="group relative flex-shrink-0 w-[340px] md:w-[400px] lg:w-[440px] h-[420px] md:h-[460px] rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 flex flex-col justify-between transition-shadow duration-300 hover:shadow-2xl hover:shadow-neutral-200/50"
            >
              {/* Card number */}
              <span className="absolute top-6 right-8 text-[0.6rem] font-mono text-neutral-300 tracking-[0.2em] uppercase">
                ({String(i + 1).padStart(2, "0")})
              </span>

              {/* Content */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black leading-tight">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-[35ch]">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 text-xs font-mono font-medium text-amber-800/70 border border-neutral-200 rounded-full bg-neutral-100/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visit button */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full transition-all duration-300 hover:bg-amber-700 hover:scale-105 active:scale-95"
              >
                {project.label || "Visitar"}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}

          {/* Spacer at the end */}
          <div className="flex-shrink-0 w-[100px]" />
        </div>
      </div>
    </section>
  )
}
