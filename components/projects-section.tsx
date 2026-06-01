"use client"

import { useState, useEffect } from "react"
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

const CATEGORIES: Category[] = [
  "Landing page",
  "Portfolio",
  "E-commerce",
  "Aplicativo",
  "Sistema web",
]

const PROJECTS: Project[] = [
  {
    title: "Portfolio Pessoal",
    description:
      "Site pessoal com design interativo, scroll horizontal e animações fluídas. Construído com Next.js, GSAP e TailwindCSS.",
    stack: ["Next.js", "TypeScript", "GSAP", "TailwindCSS"],
    url: "https://vazglauco.github.io",
    label: "Visitar",
    categories: ["Portfolio", "Landing page"],
    image: null,
  },
  {
    title: "Task Flow",
    description:
      "Aplicação de gerenciamento de tarefas com drag & drop, filtros avançados e dashboard com métricas em tempo real.",
    stack: ["Angular", "NestJS", "PostgreSQL", "Docker"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
    image: null,
  },
  {
    title: "DevConnect",
    description:
      "Plataforma de networking para desenvolvedores, com sistema de match baseado em skills e interesses técnicos.",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
    image: null,
  },
  {
    title: "AI Content Studio",
    description:
      "Ferramenta de geração de conteúdo com IA, integração com GPT e fluxos automatizados de criação e publicação.",
    stack: ["Next.js", "Python", "OpenAI API", "Redis"],
    url: "#",
    label: "Em breve",
    categories: ["Sistema web"],
    image: null,
  },
  {
    title: "FinTrack",
    description:
      "Dashboard financeiro pessoal com gráficos interativos, importação de extratos e categorização automática de gastos.",
    stack: ["Angular", "NestJS", "Chart.js", "PostgreSQL"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
    image: null,
  },
  {
    title: "CloudDeploy",
    description:
      "CLI para automação de deploys em AWS com rollback automático, logs em tempo real e notificações de status.",
    stack: ["Node.js", "AWS SDK", "TypeScript", "Docker"],
    url: "#",
    label: "Em breve",
    categories: ["Sistema web"],
    image: null,
  },
  {
    title: "DesignSys",
    description:
      "Design system completo com componentes acessíveis, tokens de design e documentação interativa via Storybook.",
    stack: ["React", "Storybook", "CSS Modules", "Figma"],
    url: "#",
    label: "Em breve",
    categories: ["Landing page", "E-commerce"],
    image: null,
  },
]

const SUIT_CHARS = ["♠", "♣", "♥", "♦"]

function ProjectImagePlaceholder({ index }: { index: number }) {
  const suit = SUIT_CHARS[index % SUIT_CHARS.length]
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-100 select-none">
      <span
        className="font-black text-neutral-200 pointer-events-none"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
        aria-hidden
      >
        {suit}
      </span>
    </div>
  )
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Set<Category>>(new Set())
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function toggle(cat: Category) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      setOpenIndex(0)
      return next
    })
  }

  const filtered =
    selected.size === 0
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.some((c) => selected.has(c)))

  const filters = (
    <div className="px-8 md:px-16 lg:px-24 mb-0 flex gap-1 flex-wrap">
      <button
        onClick={() => { setSelected(new Set()); setCurrentIndex(0) }}
        className={`font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1.5 border transition-colors ${
          selected.size === 0
            ? "border-black bg-black text-white"
            : "border-neutral-200 text-neutral-400 hover:border-neutral-600 hover:text-neutral-600"
        }`}
      >
        todos
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => toggle(cat)}
          className={`font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1.5 border transition-colors ${
            selected.has(cat)
              ? "border-red-500 text-red-500"
              : "border-neutral-200 text-neutral-400 hover:border-neutral-600 hover:text-neutral-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )

  if (isMobile) {
    return (
      <section id="projetos" className="bg-[#faf9f7] py-16 flex flex-col">
        {/* Header */}
        <div className="px-8 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="block w-[3px] h-10 bg-red-500 shrink-0" />
            <h2 className="text-[2.5rem] font-black tracking-tight leading-none text-black uppercase">
              PROJETOS<span className="text-neutral-300">/</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-400 tracking-widest">
            {filtered.length} trabalhos
          </span>
        </div>

        {filters}

        <div className="mt-6 border-t border-neutral-200 mx-8">
          {filtered.length === 0 && (
            <div className="flex items-center justify-center h-40 text-neutral-300 text-sm font-mono">
              nenhum projeto nessa categoria
            </div>
          )}

          {filtered.map((project, i) => {
            const isOpen = openIndex === i
            const isLive = project.url !== "#"
            return (
              <div key={project.title} className="border-b border-neutral-200">
                {/* Row — always visible */}
                <button
                  className="w-full flex items-center justify-between py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.6rem] text-red-500 shrink-0">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <span className="font-black tracking-tight uppercase text-neutral-800 text-base leading-tight">
                      {project.title}
                    </span>
                  </div>
                  <span
                    className="font-mono text-neutral-400 text-lg leading-none shrink-0 ml-3 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>

                {/* Expanded content */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: isOpen ? '500px' : '0px' }}
                >
                  <div className="pb-5 flex flex-col gap-3">
                    <div className="w-full h-44 border border-neutral-200 overflow-hidden relative">
                      {project.image ? (
                        <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
                      ) : (
                        <ProjectImagePlaceholder index={i} />
                      )}
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      <span className="text-red-500 font-mono text-xs">// </span>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((t) => (
                        <span key={t} className="font-mono text-[0.58rem] text-neutral-400 border border-neutral-200 px-2 py-1 leading-none">
                          {t}
                        </span>
                      ))}
                    </div>
                    {isLive ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start inline-flex items-center gap-1.5 font-mono text-xs font-bold border border-black text-black px-4 py-2"
                      >
                        {project.label || "Visitar"}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="self-start font-mono text-xs text-neutral-300 border border-neutral-200 px-4 py-2">
                        {project.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section id="projetos" className="bg-[#faf9f7] py-16 min-h-screen flex flex-col">

      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="block w-[3px] h-10 bg-red-500 shrink-0" />
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tight leading-none text-black uppercase">
            PROJETOS<span className="text-neutral-300">/</span>
          </h2>
        </div>
        <span className="font-mono text-xs text-neutral-400 tracking-widest hidden md:block">
          {filtered.length} trabalhos
        </span>
      </div>

      {filters}

      {/* Project rows */}
      <div className="mt-6 border-t border-neutral-200 mx-8 md:mx-16 lg:mx-24">
        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-40 text-neutral-300 text-sm font-mono">
            nenhum projeto nessa categoria
          </div>
        )}

        {filtered.map((project, i) => {
          const isLive = project.url !== "#"
          return (
            <div
              key={project.title}
              className="border-b border-neutral-200 flex items-stretch group hover:bg-[#f0ede8] transition-colors duration-150"
            >
              {/* Content */}
              <div className="flex-1 py-6 flex flex-col gap-3 pr-6">
                <span className="font-mono text-[0.6rem] text-red-500 leading-none">
                  ({String(i + 1).padStart(2, "0")})
                </span>

                <h3 className="font-black tracking-tight leading-none uppercase text-neutral-800 text-[1.4rem] md:text-[1.7rem] lg:text-[2rem]">
                  {project.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed max-w-[55ch]">
                  <span className="text-red-500 font-mono text-xs">// </span>
                  {project.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-2 flex-wrap gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.58rem] text-neutral-400 border border-neutral-200 px-2 py-1 leading-none"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {isLive ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold border border-black text-black px-4 py-2 hover:bg-black hover:text-white transition-colors shrink-0"
                    >
                      {project.label || "Visitar"}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-neutral-300 border border-neutral-200 px-4 py-2 shrink-0">
                      {project.label}
                    </span>
                  )}
                </div>
              </div>

              {/* Image */}
              <div className="w-[38%] md:w-[40%] shrink-0 border-l border-neutral-200 overflow-hidden self-stretch relative">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <ProjectImagePlaceholder index={i} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
