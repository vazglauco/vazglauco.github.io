"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ─────────────────────────────────────────────────────────── */

const EXPERIENCES = [
  {
    period: "2024 — Present",
    role: "Senior Full-Stack Developer",
    company: "Tech Company",
    location: "São Paulo, BR",
    description:
      "Liderança técnica no desenvolvimento de aplicações web escaláveis com React, Next.js e Node.js. Responsável pela arquitetura de microfrontends e integração de APIs.",
    stack: ["Next.js", "TypeScript", "Node.js", "AWS", "PostgreSQL"],
  },
  {
    period: "2022 — 2024",
    role: "Full-Stack Developer",
    company: "Digital Agency",
    location: "São Paulo, BR",
    description:
      "Desenvolvimento de soluções web completas, desde a concepção do design até deploy em produção. Colaboração direta com equipes de produto e design.",
    stack: ["React", "Angular", "NestJS", "Docker", "MongoDB"],
  },
  {
    period: "2020 — 2022",
    role: "Frontend Developer",
    company: "Startup",
    location: "São Paulo, BR",
    description:
      "Construção de interfaces responsivas e acessíveis, implementação de design systems e otimização de performance no frontend.",
    stack: ["React", "TypeScript", "TailwindCSS", "GraphQL", "Firebase"],
  },
  {
    period: "2018 — 2020",
    role: "Junior Developer",
    company: "Software House",
    location: "São Paulo, BR",
    description:
      "Desenvolvimento de funcionalidades em aplicações web, manutenção de sistemas legados e aprendizado contínuo de novas tecnologias.",
    stack: ["JavaScript", "HTML/CSS", "Node.js", "MySQL", "Git"],
  },
]

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

/* ─── Component ────────────────────────────────────────────────────── */

/**
 * Combined Experience → Projects layout.
 *
 * Single pinned container with three scroll-driven phases:
 *  Phase 1 – Experience content scrolls vertically (translateY)
 *  Phase 2 – Horizontal slide from Experience panel to Projects panel
 *  Phase 3 – Projects cards track scrolls horizontally
 */
export function ExperienceProjectsLayout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const expContentRef = useRef<HTMLDivElement>(null)
  const expEntriesRef = useRef<(HTMLDivElement | null)[]>([])
  const projectsTrackRef = useRef<HTMLDivElement>(null)
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    const expContent = expContentRef.current
    const projectsTrack = projectsTrackRef.current
    if (!container || !track || !expContent || !projectsTrack) return

    const ctx = gsap.context(() => {
      const vh = window.innerHeight
      const vw = window.innerWidth

      /* ── Distances ─────────────────────────────────── */
      const expScrollDist = Math.max(0, expContent.scrollHeight - vh)
      const pauseDist = vh * 0.3          // breathing room between phases
      const horizDist = vw                // one full viewport slide
      const projTrackScroll = Math.max(0, projectsTrack.scrollWidth - vw)
      const totalScroll = expScrollDist + pauseDist + horizDist + projTrackScroll

      /* ── Timeline ──────────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      })

      /* Phase 1 — vertical scroll of experience content */
      if (expScrollDist > 0) {
        tl.to(
          expContent,
          { y: -expScrollDist, duration: expScrollDist, ease: "none" },
          0,
        )
      }

      /* Entry reveal animations (run during Phase 1) */
      expEntriesRef.current.forEach((entry) => {
        if (!entry) return
        const entryTop = entry.offsetTop
        // Entries already visible on load — skip animation
        if (entryTop < vh * 0.8) return
        const triggerAt = Math.max(0, entryTop - vh * 0.7)
        gsap.set(entry, { opacity: 0, y: 50 })
        tl.to(
          entry,
          { opacity: 1, y: 0, duration: vh * 0.35, ease: "power2.out" },
          triggerAt,
        )
      })

      /* Pause — nothing moves, user absorbs last entry */
      tl.to({}, { duration: pauseDist }, expScrollDist)

      /* Phase 2 — horizontal slide Experience → Projects */
      tl.to(
        track,
        { x: -vw, duration: horizDist, ease: "none" },
        expScrollDist + pauseDist,
      )

      /* Phase 3 — horizontal scroll of projects cards track */
      if (projTrackScroll > 0) {
        tl.to(
          projectsTrack,
          { x: -projTrackScroll, duration: projTrackScroll, ease: "none" },
          expScrollDist + pauseDist + horizDist,
        )
      }

      /* Card reveal animations (run during Phase 3) */
      projectCardsRef.current.forEach((card) => {
        if (!card) return
        const cardLeft = card.offsetLeft
        // Cards already in view when panel enters — skip
        if (cardLeft < vw - 100) return
        const enterAt = Math.max(0, cardLeft - vw + 300)
        gsap.set(card, { opacity: 0.3, y: 25 })
        tl.to(
          card,
          { opacity: 1, y: 0, duration: vw * 0.25, ease: "power2.out" },
          expScrollDist + pauseDist + horizDist + enterAt,
        )
      })
    }, container)

    return () => ctx.revert()
  }, [])

  /* ── JSX ──────────────────────────────────────────────────────────── */

  return (
    <div ref={containerRef} className="overflow-hidden h-screen">
      <div
        ref={trackRef}
        className="flex flex-nowrap"
        style={{ width: "200vw" }}
      >
        {/* ═══════ Panel 1 — Experience ═══════ */}
        <div className="w-screen h-screen flex-shrink-0 overflow-hidden bg-white">
          <div ref={expContentRef}>
            {/* Header */}
            <div className="px-8 md:px-16 lg:px-24 pt-24 pb-16">
              <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[8rem] font-black tracking-tight leading-[0.9] text-black uppercase">
                EXPERIENCE <span className="text-neutral-300">/</span>
              </h2>

              <div className="flex flex-col md:flex-row gap-4 md:gap-16 mt-12 md:mt-16 max-w-4xl ml-auto mr-8 md:mr-16">
                <span className="text-[0.65rem] tracking-[0.25em] uppercase text-amber-700/60 font-mono shrink-0 pt-1">
                  (TIMELINE)
                </span>
                <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-lg">
                  Minha trajetória profissional, construída com dedicação e
                  evolução constante em cada projeto e equipe.
                </p>
              </div>
            </div>

            {/* Timeline entries */}
            <div className="px-8 md:px-16 lg:px-24 pb-[30vh]">
              {EXPERIENCES.map((exp, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    expEntriesRef.current[i] = el
                  }}
                  className="border-t border-neutral-200 min-h-[60vh] md:min-h-[70vh] flex flex-col md:grid md:grid-cols-12 md:gap-x-8 relative"
                >
                  {/* Left — Period */}
                  <div className="md:col-span-5 pt-8 md:pt-12">
                    <div>
                      <span className="text-[0.6rem] font-mono text-neutral-400 tracking-[0.2em] uppercase block mb-3">
                        ({String(i + 1).padStart(2, "0")})
                      </span>
                      <h3 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[0.9] tracking-tight text-neutral-800">
                        {exp.period.split("—")[0].trim()}
                        <span className="text-neutral-300"> — </span>
                        <br />
                        <span className="text-neutral-400">
                          {exp.period.split("—")[1]?.trim() || ""}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Right — Content */}
                  <div className="md:col-span-7 pt-6 md:pt-12 pb-16 md:pb-24">
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold italic tracking-tight text-black mb-2">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-3 text-sm md:text-base">
                          <span className="text-amber-700/80 font-semibold">
                            {exp.company}
                          </span>
                          <span className="text-neutral-300">•</span>
                          <span className="text-neutral-500">
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-[45ch] text-balance">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.stack.map((tech, j) => (
                          <span
                            key={j}
                            className="px-3 py-1.5 text-xs md:text-sm font-mono font-medium text-amber-800/70 border border-neutral-200 rounded-full bg-neutral-100/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-neutral-200" />
            </div>
          </div>
        </div>

        {/* ═══════ Panel 2 — Projects ═══════ */}
        <div className="w-screen h-screen flex-shrink-0 overflow-hidden bg-white flex flex-col justify-center">
          {/* Header */}
          <div className="px-8 md:px-16 lg:px-24 mb-8 md:mb-12 shrink-0">
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

          {/* Cards track */}
          <div
            ref={projectsTrackRef}
            className="flex items-center gap-8 px-8 md:px-16 lg:px-24 flex-nowrap"
            style={{ width: "max-content" }}
          >
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                ref={(el) => {
                  projectCardsRef.current[i] = el
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

            {/* End spacer */}
            <div className="flex-shrink-0 w-[100px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
