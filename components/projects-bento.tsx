"use client"

import { ArrowUpRight } from "lucide-react"

type Category = "Landing page" | "Portfolio" | "E-commerce" | "Aplicativo" | "Sistema web"

interface Project {
  title: string
  description: string
  stack: string[]
  url: string
  label?: string
  categories: Category[]
  previewVideo: string | null
}

const PROJECTS: Project[] = [
  {
    title: "Mila",
    description:
      "App de organização de rotina para quem quer mais clareza no dia a dia. Hábitos, tarefas e agenda reunidos em uma experiência simples e consistente.",
    stack: ["React Native", "Next.js", "NestJS", "Node.js"],
    url: "https://usemila.app",
    label: "Visitar",
    categories: ["Aplicativo"],
    previewVideo: "/projects/preview_usemila.mp4",
  },
  {
    title: "Angela das Reis",
    description:
      "Portfolio de Angela das Reis, redatora especializada em arte, moda e narrativas digitais. Design limpo com identidade visual forte.",
    stack: ["Next.js", "React"],
    url: "https://angeladasreis.com.br",
    label: "Visitar",
    categories: ["Portfolio", "Landing page"],
    previewVideo: "/projects/preview_angela.mp4",
  },
]

const SUIT_CHARS = ["♠", "♣", "♥", "♦"]

function ProjectPreview({ project, index }: { project: Project; index: number }) {
  if (project.previewVideo) {
    return (
      <div className="relative aspect-[15/8] overflow-hidden bg-[#111111]">
        <video
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
          src={project.previewVideo}
          title={project.title}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-[15/8] overflow-hidden bg-[#111111]">
      <span
        className="absolute inset-0 flex items-center justify-center text-[7rem] font-black text-neutral-800"
        aria-hidden
      >
        {SUIT_CHARS[index % SUIT_CHARS.length]}
      </span>
    </div>
  )
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const isLive = project.url !== "#"
  const reverse = index % 2 === 1

  return (
    <article className="group border-t border-neutral-200 py-12 last:border-b md:py-16">
      <div
        className={`grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 ${
          reverse ? "lg:grid-cols-[1.1fr_0.9fr]" : ""
        }`}
      >
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="mb-6 flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-neutral-500">
            <span className="text-red-500">({String(index + 1).padStart(2, "0")})</span>
            <span className="h-px flex-1 bg-neutral-200" />
            <span>{project.categories.join(" / ")}</span>
          </div>

          <h3 className="text-3xl font-black uppercase leading-none tracking-tight text-black md:text-4xl lg:text-[2.75rem]">
            {project.title}
            <span className="text-red-500">.</span>
          </h3>

          <p className="mt-6 max-w-[48rem] text-base leading-loose text-neutral-600 md:text-lg">
            <span className="font-mono text-sm text-red-500">// </span>
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-neutral-200 px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-wide text-neutral-600"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-9">
            {isLive ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
              >
                {project.label || "Visitar"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
                <span className="inline-flex border border-neutral-300 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
                {project.label}
              </span>
            )}
          </div>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <div className="border border-neutral-200 bg-white p-2 shadow-[0_24px_80px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:-translate-y-1">
            <ProjectPreview project={project} index={index} />
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsBento() {
  return (
    <section id="projetos" className="scroll-mt-24 bg-[#faf9f7] px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
              <span className="text-red-500">// </span>
              cases recentes
            </p>
            <h2 className="text-[2.5rem] font-black uppercase leading-none tracking-tight text-black md:text-[3.5rem] lg:text-[4.5rem]">
              projetos
              <span className="text-neutral-300">/</span>
            </h2>
          </div>

          <p className="max-w-[44rem] text-base leading-loose text-neutral-600 md:text-lg lg:justify-self-end">
            Alguns produtos que mostram meu ponto de encontro entre engenharia, interface e decisão de produto.
          </p>
        </header>

        <div>
          {PROJECTS.map((project, index) => (
            <ProjectCase key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
