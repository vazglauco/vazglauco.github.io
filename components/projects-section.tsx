"use client"

import Image from "next/image"
import { useState } from "react"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

type Category = "Landing page" | "Portfolio" | "E-commerce" | "Aplicativo" | "Sistema web"

interface Project {
  title: string
  description: string
  stack: string[]
  url: string
  label?: string
  categories: Category[]
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
  },
  {
    title: "Task Flow",
    description:
      "Aplicação de gerenciamento de tarefas com drag & drop, filtros avançados e dashboard com métricas em tempo real.",
    stack: ["Angular", "NestJS", "PostgreSQL", "Docker"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
  },
  {
    title: "DevConnect",
    description:
      "Plataforma de networking para desenvolvedores, com sistema de match baseado em skills e interesses técnicos.",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
  },
  {
    title: "AI Content Studio",
    description:
      "Ferramenta de geração de conteúdo com IA, integração com GPT e fluxos automatizados de criação e publicação.",
    stack: ["Next.js", "Python", "OpenAI API", "Redis"],
    url: "#",
    label: "Em breve",
    categories: ["Sistema web"],
  },
  {
    title: "FinTrack",
    description:
      "Dashboard financeiro pessoal com gráficos interativos, importação de extratos e categorização automática de gastos.",
    stack: ["Angular", "NestJS", "Chart.js", "PostgreSQL"],
    url: "#",
    label: "Em breve",
    categories: ["Aplicativo", "Sistema web"],
  },
  {
    title: "CloudDeploy",
    description:
      "CLI para automação de deploys em AWS com rollback automático, logs em tempo real e notificações de status.",
    stack: ["Node.js", "AWS SDK", "TypeScript", "Docker"],
    url: "#",
    label: "Em breve",
    categories: ["Sistema web"],
  },
  {
    title: "DesignSys",
    description:
      "Design system completo com componentes acessíveis, tokens de design e documentação interativa via Storybook.",
    stack: ["React", "Storybook", "CSS Modules", "Figma"],
    url: "#",
    label: "Em breve",
    categories: ["Landing page", "E-commerce"],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLive = project.url !== "#"

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-100">
      <span className="text-[0.55rem] font-mono text-neutral-300 tracking-[0.2em] uppercase">
        ({String(index + 1).padStart(2, "0")})
      </span>

      <h3 className="text-lg font-bold tracking-tight text-black leading-tight">
        {project.title}
      </h3>

      <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.stack.slice(0, 3).map((tech, j) => (
          <span
            key={j}
            className="px-2.5 py-1 text-[0.65rem] font-mono font-medium text-neutral-400 border border-neutral-200 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={project.url}
        target={isLive ? "_blank" : undefined}
        rel={isLive ? "noopener noreferrer" : undefined}
        className={`inline-flex items-center gap-1.5 self-start mt-1 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 active:scale-95 ${
          isLive
            ? "text-white bg-black hover:bg-neutral-800"
            : "text-neutral-400 bg-neutral-100 cursor-default"
        }`}
        onClick={isLive ? undefined : (e) => e.preventDefault()}
      >
        {project.label || "Visitar"}
        {isLive && <ExternalLink className="w-3 h-3" />}
      </a>
    </div>
  )
}

const PER_PAGE = 6 // 3 cols × 2 rows

export function ProjectsSection() {
  const [selected, setSelected] = useState<Set<Category>>(new Set())
  const [page, setPage] = useState(0)

  function toggle(cat: Category) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
    setPage(0)
  }

  const filtered =
    selected.size === 0
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.some((c) => selected.has(c)))

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const pageItems = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section
      id="projetos"
      className="relative bg-[#faf9f7] flex items-start pt-16 pb-12 px-8 md:px-16 lg:px-24"
    >
      <div className="flex gap-10 xl:gap-14 items-start w-full">

        {/* Category filter — vertical, left */}
        <div className="hidden lg:flex flex-col gap-2 shrink-0">
          <span className="text-[0.6rem] font-mono tracking-[0.2em] uppercase text-neutral-300 mb-1">
            filtrar
          </span>
          {CATEGORIES.map((cat) => {
            const active = selected.has(cat)
            return (
              <button
                key={cat}
                onClick={() => toggle(cat)}
                className={`text-left px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-150 whitespace-nowrap ${
                  active
                    ? "bg-black text-white border-black"
                    : "bg-[#faf9f7] text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-neutral-600"
                }`}
              >
                {cat}
              </button>
            )
          })}
          {selected.size > 0 && (
            <button
              onClick={() => { setSelected(new Set()); setPage(0) }}
              className="mt-1 text-[0.6rem] font-mono tracking-widest uppercase text-neutral-300 hover:text-red-500 transition-colors text-left"
            >
              limpar
            </button>
          )}
        </div>

        {/* Center: title + grid + pagination */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <span className="block w-[3px] h-10 bg-red-500 mt-1 rounded-full shrink-0" />
              <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-black tracking-tight leading-[0.9] text-black uppercase">
                PROJETOS <span className="text-neutral-300">/</span>
              </h2>
            </div>

            {/* Arrows + page counter */}
            {totalPages > 1 && (
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[0.65rem] font-mono text-neutral-300 tracking-widest">
                  {String(page + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(totalPages).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:border-black hover:text-black disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:border-black hover:text-black disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {pageItems.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={page * PER_PAGE + i} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-300 text-sm font-mono">
              nenhum projeto nessa categoria
            </div>
          )}
        </div>

        {/* Right: oval image — fixed to bottom of section */}
        <div className="hidden lg:block shrink-0 w-[180px] xl:w-[220px]">
          <div className="w-full rounded-full overflow-hidden" style={{ height: "72vh" }}>
            <Image
              src="/ilustra_trampos.png"
              alt=""
              width={220}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
