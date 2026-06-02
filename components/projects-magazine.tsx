"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

type Category = "Landing page" | "Portfolio" | "E-commerce" | "Aplicativo" | "Sistema web"

interface Project {
  title: string
  description: string
  stack: string[]
  url: string
  label?: string
  categories: Category[]
  image: string | null
}

const PROJECTS: Project[] = [
  {
    title: "Portfolio Pessoal",
    description: "Site pessoal com design interativo, scroll horizontal e animações fluídas. Construído com Next.js, GSAP e TailwindCSS.",
    stack: ["Next.js", "TypeScript", "GSAP", "TailwindCSS"],
    url: "https://vazglauco.github.io",
    label: "Visitar",
    categories: ["Portfolio", "Landing page"],
    image: null,
  },
  {
    title: "Task Flow",
    description: "Aplicação de gerenciamento de tarefas com drag & drop, filtros avançados e dashboard com métricas em tempo real.",
    stack: ["Angular", "NestJS", "PostgreSQL", "Docker"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
    image: null,
  },
  {
    title: "DevConnect",
    description: "Plataforma de networking para desenvolvedores, com sistema de match baseado em skills e interesses técnicos.",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
    image: null,
  },
  {
    title: "AI Content Studio",
    description: "Ferramenta de geração de conteúdo com IA, integração com GPT e fluxos automatizados de criação e publicação.",
    stack: ["Next.js", "Python", "OpenAI API", "Redis"],
    url: "#",
    label: "Em breve",
    categories: ["Sistema web"],
    image: null,
  },
  {
    title: "FinTrack",
    description: "Dashboard financeiro pessoal com gráficos interativos, importação de extratos e categorização automática de gastos.",
    stack: ["Angular", "NestJS", "Chart.js", "PostgreSQL"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
    image: null,
  },
  {
    title: "CloudDeploy",
    description: "CLI para automação de deploys em AWS com rollback automático, logs em tempo real e notificações de status.",
    stack: ["Node.js", "AWS SDK", "TypeScript", "Docker"],
    url: "#",
    label: "Em breve",
    categories: ["Sistema web"],
    image: null,
  },
  {
    title: "DesignSys",
    description: "Design system completo com componentes acessíveis, tokens de design e documentação interativa via Storybook.",
    stack: ["React", "Storybook", "CSS Modules", "Figma"],
    url: "#",
    label: "Em breve",
    categories: ["Landing page", "E-commerce"],
    image: null,
  },
]

const SUIT_CHARS = ["♠", "♣", "♥", "♦"]

// Desktop: 3-column grid spans
// Row 1: [0 span-2] [1 span-1]
// Row 2: [2] [3] [4]
// Row 3: [5] [6 span-2]
const DESKTOP_SPANS = [
  "col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-2",
]

const DESKTOP_HEIGHTS = [
  "h-[440px]",
  "h-[440px]",
  "h-[280px]",
  "h-[280px]",
  "h-[280px]",
  "h-[280px]",
  "h-[280px]",
]

function CardBg({ project, index }: { project: Project; index: number }) {
  const suit = SUIT_CHARS[index % SUIT_CHARS.length]
  if (project.image) {
    return <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
  }
  return (
    <div className="absolute inset-0 bg-[#111111] flex items-center justify-center">
      <span
        className="font-black text-neutral-800 pointer-events-none select-none"
        style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
        aria-hidden
      >
        {suit}
      </span>
    </div>
  )
}

export function ProjectsMagazine() {
  return (
    <section className="bg-[#faf9f7] py-16">
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="block w-[3px] h-10 bg-red-500 shrink-0" />
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tight leading-none text-black uppercase">
            PROJETOS<span className="text-neutral-300">/</span>
          </h2>
        </div>
        <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
          Layout A <span className="text-red-500 mx-1">·</span> Magazine
        </span>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-[3px] px-8 md:px-16 lg:px-24">
        {PROJECTS.map((project, i) => {
          const isLive = project.url !== "#"
          return (
            <div
              key={project.title}
              className={`${DESKTOP_SPANS[i]} ${DESKTOP_HEIGHTS[i]} relative overflow-hidden group`}
            >
              <CardBg project={project} index={i} />

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* number — top left */}
              <span className="absolute top-4 left-4 font-mono text-[0.6rem] text-red-500 z-10 leading-none">
                ({String(i + 1).padStart(2, "0")})
              </span>

              {/* category — top right */}
              <span className="absolute top-4 right-4 font-mono text-[0.55rem] text-neutral-500 tracking-widest uppercase z-10 leading-none">
                {project.categories[0]}
              </span>

              {/* info — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="font-black tracking-tight leading-none uppercase text-white mb-3"
                  style={{ fontSize: i === 0 ? "clamp(1.4rem, 2.5vw, 2rem)" : "clamp(1rem, 1.6vw, 1.3rem)" }}>
                  {project.title}
                </h3>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-[0.55rem] text-neutral-400 bg-black/50 border border-neutral-700 px-2 py-0.5 leading-none">
                        {t}
                      </span>
                    ))}
                  </div>
                  {isLive ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[0.6rem] font-bold border border-white text-white px-3 py-1.5 hover:bg-white hover:text-black transition-colors shrink-0"
                    >
                      {project.label || "Visitar"}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="font-mono text-[0.6rem] text-neutral-600 border border-neutral-800 px-3 py-1.5 shrink-0">
                      {project.label}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: first card full-width, rest 2-col */}
      <div className="md:hidden flex flex-col gap-[3px]">
        {/* hero card */}
        <div className="relative h-[260px] overflow-hidden">
          <CardBg project={PROJECTS[0]} index={0} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <span className="absolute top-3 left-4 font-mono text-[0.6rem] text-red-500 z-10">(01)</span>
          <span className="absolute top-3 right-4 font-mono text-[0.55rem] text-neutral-500 tracking-widest uppercase z-10">{PROJECTS[0].categories[0]}</span>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h3 className="font-black tracking-tight leading-none uppercase text-white text-[1.2rem] mb-2">{PROJECTS[0].title}</h3>
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1.5">
                {PROJECTS[0].stack.slice(0, 2).map((t) => (
                  <span key={t} className="font-mono text-[0.5rem] text-neutral-400 bg-black/50 border border-neutral-700 px-1.5 py-0.5 leading-none">{t}</span>
                ))}
              </div>
              <a href={PROJECTS[0].url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[0.55rem] font-bold border border-white text-white px-2.5 py-1 shrink-0">
                {PROJECTS[0].label} <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* rest in 2-col grid */}
        <div className="grid grid-cols-2 gap-[3px]">
          {PROJECTS.slice(1).map((project, j) => {
            const i = j + 1
            const isLive = project.url !== "#"
            return (
              <div key={project.title} className="relative h-[180px] overflow-hidden">
                <CardBg project={project} index={i} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <span className="absolute top-2.5 left-3 font-mono text-[0.55rem] text-red-500 z-10">({String(i + 1).padStart(2, "0")})</span>
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <h3 className="font-black tracking-tight leading-none uppercase text-white text-[0.85rem] mb-1.5">{project.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 2).map((t) => (
                      <span key={t} className="font-mono text-[0.48rem] text-neutral-400 bg-black/50 border border-neutral-700 px-1.5 py-0.5 leading-none">{t}</span>
                    ))}
                  </div>
                  {isLive && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-0.5 font-mono text-[0.5rem] font-bold border border-white text-white px-2 py-1">
                      {project.label} <ArrowUpRight className="w-2 h-2" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
