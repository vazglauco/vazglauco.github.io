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
    title: "Mila",
    description: "App de organização de rotina para quem quer mais clareza no dia a dia. Hábitos, tarefas e agenda reunidos em uma experiência simples e consistente.",
    stack: ["React Native", "Next.js", "NestJS", "Node.js"],
    url: "https://usemila.app",
    label: "Visitar",
    categories: ["Aplicativo"],
    image: "/mila.png",
  },
  {
    title: "Angela das Reis",
    description: "Portfolio de Angela das Reis, redatora especializada em arte, moda e narrativas digitais. Design limpo com identidade visual forte.",
    stack: ["Next.js", "React"],
    url: "https://angeladasreis.com.br",
    label: "Visitar",
    categories: ["Portfolio", "Landing page"],
    image: "/angela.png",
  },
]

const SUIT_CHARS = ["♠", "♣", "♥", "♦"]

const BENTO_SPANS = ["col-span-1", "col-span-1"]
const BENTO_HEIGHTS = ["h-[480px]", "h-[480px]"]

function CardBg({ project, index }: { project: Project; index: number }) {
  const suit = SUIT_CHARS[index % SUIT_CHARS.length]
  if (project.image) {
    return <Image src={project.image} alt={project.title} fill className="object-cover object-left-top" />
  }
  return (
    <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
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

export function ProjectsBento() {
  return (
    <section id="projetos" className="bg-[#faf9f7] py-16">
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="block w-[3px] h-10 bg-red-500 shrink-0" />
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tight leading-none text-black uppercase">
            PROJETOS<span className="text-neutral-300">/</span>
          </h2>
        </div>
        <span className="font-mono text-xs text-neutral-400 tracking-widest hidden md:block">
          {PROJECTS.length} projetos
        </span>
      </div>

      {/* Desktop bento grid */}
      <div className="hidden md:grid grid-cols-3 gap-[4px] px-8 md:px-16 lg:px-24">
        {PROJECTS.map((project, i) => {
          const isLive = project.url !== "#"
          return (
            <div
              key={project.title}
              className={`${BENTO_SPANS[i]} ${BENTO_HEIGHTS[i]} relative overflow-hidden group cursor-pointer`}
            >
              <CardBg project={project} index={i} />

              {/* info panel — always visible */}
              <div className="absolute inset-x-0 bottom-0 bg-[#111111] border-t border-neutral-800 p-5 z-10">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[0.6rem] text-red-500 leading-none shrink-0">
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <h3
                    className="font-black tracking-tight leading-none uppercase text-white"
                    style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
                  >
                    {project.title}
                  </h3>
                  <span className="font-mono text-[0.55rem] text-neutral-600 tracking-widest uppercase leading-none ml-auto shrink-0">
                    {project.categories[0]}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  <span className="text-red-500 font-mono text-xs">// </span>
                  {project.description}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-[0.55rem] text-neutral-500 border border-neutral-800 px-2 py-0.5 leading-none">
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

      {/* Mobile: dois cards empilhados */}
      <div className="md:hidden flex flex-col gap-[4px]">
        {PROJECTS.map((project, i) => {
          const isLive = project.url !== "#"
          return (
            <div key={project.title} className="relative h-[280px] overflow-hidden">
              <CardBg project={project} index={i} />
              <div className="absolute bottom-0 left-0 right-0 bg-[#111111] border-t border-neutral-800 p-4 z-10">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="font-mono text-[0.55rem] text-red-500 leading-none shrink-0">
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <h3 className="font-black tracking-tight leading-none uppercase text-white text-[1rem]">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[0.5rem] text-neutral-600 tracking-widest uppercase leading-none ml-auto shrink-0">
                    {project.categories[0]}
                  </span>
                </div>
                <p className="font-mono text-[0.6rem] text-neutral-400 leading-relaxed mb-2">
                  <span className="text-red-500">// </span>
                  {project.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {project.stack.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-[0.5rem] text-neutral-500 border border-neutral-800 px-1.5 py-0.5 leading-none">{t}</span>
                    ))}
                  </div>
                  {isLive && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[0.55rem] font-bold border border-white text-white px-2.5 py-1 shrink-0">
                      {project.label} <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
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
