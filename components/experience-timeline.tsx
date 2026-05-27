"use client"

import { useEffect, useState } from "react"

const EXPERIENCES = [
  {
    period: "out 2025 — presente",
    role: "Desenvolvedor Front-end",
    company: "DOMVS iT",
    client: "Mentes Notáveis",
    location: "São Paulo, SP",
    description:
      "Desenvolvimento de plataforma de educação gamificada. Painéis administrativos com React e Next.js. Aplicações principais em Angular. Jogos educacionais com TypeScript e Phaser.",
    stack: ["Angular", "React", "Next.js", "TypeScript", "Phaser"],
  },
  {
    period: "dez 2024 — jun 2025",
    role: "Software Engineer Fullstack",
    company: "Innvo Labs",
    client: "Porto Seguro",
    location: "São Paulo, SP · Remoto",
    description:
      "Produtos voltados à jornada de contratação de seguros. Liderança técnica na implementação de novo método de pagamento integrado ao gateway interno da Porto Seguro.",
    stack: ["React", "Angular", "Node.js", "TypeScript"],
  },
  {
    period: "jun 2024 — dez 2024",
    role: "Software Engineer Frontend",
    company: "Sinqia",
    client: null,
    location: "São Paulo, SP · Híbrido",
    description:
      "Modernização de sistema legado do mercado financeiro. Estratégia de migração com micro frontends em Angular, evolução incremental com estrangulamento do legado em Java.",
    stack: ["Angular", "Microfrontends", "TypeScript", "Java"],
  },
  {
    period: "fev 2022 — fev 2024",
    role: "Software Engineer Frontend / Fullstack",
    company: "AgileThought",
    client: "Santander",
    location: "São Paulo, SP",
    description:
      "Micro frontends em Angular para jornadas de seguros. Sistema interno de gestão de contratos com back-end em Java. Liderança técnica no painel PJ com integração ao Open Finance.",
    stack: ["Angular", "Microfrontends", "Java", "Open Finance", "TypeScript"],
  },
  {
    period: "abr 2021 — set 2021",
    role: "Software Engineer Frontend",
    company: "Poupachef",
    client: null,
    location: "São Paulo, SP",
    description:
      "Desenvolvimento e sustentação de funcionalidades nos sistemas web da empresa, contribuindo na construção e manutenção das interfaces com React.",
    stack: ["React", "JavaScript", "Git"],
  },
  {
    period: "out 2019 — set 2020",
    role: "Software Engineer Fullstack",
    company: "Conquest",
    client: "Guide Investimentos",
    location: "São Paulo, SP",
    description:
      "Sistema de backoffice para operações internas com Angular e Ruby on Rails. Apoio a desenvolvedores juniores na orientação sobre processos e fundamentos.",
    stack: ["Angular", "Ruby on Rails", "REST APIs", "Git"],
  },
  {
    period: "fev 2019 — out 2019",
    role: "Software Engineer Frontend",
    company: "Indra",
    client: "Santander",
    location: "São Paulo, SP",
    description:
      "Desenvolvimento de dashboard para controle de dados internos do Santander, construindo o front-end da aplicação com Angular.",
    stack: ["Angular", "TypeScript", "JavaScript"],
  },
  {
    period: "jun 2018 — jan 2019",
    role: "Software Engineer Frontend",
    company: "GFT",
    client: "Serasa Experian",
    location: "São Paulo, SP",
    description:
      "Dashboard de insights georreferenciados na Serasa Experian. Desenvolvimento de novas funcionalidades e melhorias na visualização de dados com Angular.",
    stack: ["Angular", "JavaScript", "Git"],
  },
  {
    period: "mar 2017 — mai 2018",
    role: "Software Engineer Fullstack",
    company: "Creditoo",
    client: null,
    location: "São Paulo, SP",
    description:
      "Segunda versão de fintech de crédito consignado 100% online. Front-end em Angular, back-end em PHP com Laravel, sustentação de sistemas legados e APIs.",
    stack: ["Angular", "PHP", "Laravel", "JavaScript"],
  },
]

function Period({ text }: { text: string }) {
  const [start, end] = text.split("—").map((s) => s.trim())
  return (
    <span>
      {start} <span className="text-red-500">→</span> {end}
    </span>
  )
}

export function ExperienceTimeline() {
  const [openQueue, setOpenQueue] = useState<number[]>([0, 1])

  const toggle = (i: number) =>
    setOpenQueue((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i)
      const next = [...prev, i]
      return next.length > 2 ? next.slice(1) : next
    })

  return (
    <div className="experience-section bg-[#0a0a0a] text-white flex flex-col justify-center py-16 min-h-screen">
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 mb-6 flex items-baseline justify-between">
        <span className="text-[0.58rem] font-mono tracking-[0.25em] uppercase text-neutral-500">
          experiências
        </span>
        <span className="text-[0.58rem] font-mono text-neutral-500">
          {EXPERIENCES.length} empresas{" "}
          <span className="text-red-500">·</span> 2017
          <span className="text-red-500">→</span>2025
        </span>
      </div>

      {/* Log list */}
      <div className="border-t border-neutral-700/40 mx-8 md:mx-16 lg:mx-24">
        {EXPERIENCES.map((exp, i) => {
          const isActive = openQueue.includes(i)
          return (
            <div key={i} className="border-b border-neutral-700/40">
              {/* Row — always visible */}
              <button
                onClick={() => toggle(i)}
                className={`w-full text-left px-0 py-3.5 flex items-center gap-4 md:gap-5 transition-colors group focus:outline-none ${
                  isActive
                    ? "bg-white/[0.04]"
                    : "hover:bg-white/[0.06]"
                }`}
              >
                {/* Index */}
                <span className="font-mono text-[0.58rem] shrink-0 w-9 text-neutral-500 select-none">
                  <span className="text-red-500">(</span>
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-red-500">)</span>
                </span>

                {/* Period */}
                <span className="hidden md:block font-mono text-[0.58rem] text-neutral-500 shrink-0 w-44 leading-none">
                  <Period text={exp.period} />
                </span>

                {/* Company */}
                <span
                  className={`font-black text-sm md:text-[0.9rem] tracking-tight shrink-0 transition-colors leading-none ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 group-hover:text-white"
                  }`}
                >
                  {exp.company}
                </span>

                <span className="text-red-500 text-xs shrink-0 hidden sm:block select-none">
                  ·
                </span>

                {/* Role */}
                <span
                  className={`text-[0.72rem] font-light italic transition-colors hidden sm:block leading-none ${
                    isActive
                      ? "text-neutral-300"
                      : "text-neutral-600 group-hover:text-neutral-400"
                  }`}
                >
                  {exp.role}
                </span>

                {/* Toggle indicator */}
                <span className={`ml-auto font-mono text-base font-semibold shrink-0 transition-colors select-none leading-none ${
                  isActive
                    ? "text-red-500"
                    : "text-neutral-600 group-hover:text-neutral-400"
                }`}>
                  {isActive ? "−" : "+"}
                </span>
              </button>

              {/* Expanded detail */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  isActive ? "max-h-56" : "max-h-0"
                }`}
              >
                <div className="pb-5 pt-1 pl-[52px] md:pl-[252px]">
                  {/* Period on mobile */}
                  <p className="md:hidden font-mono text-[0.58rem] text-neutral-500 mb-2">
                    <Period text={exp.period} />
                  </p>

                  {/* Description */}
                  <p className="text-[0.72rem] text-neutral-400 leading-relaxed max-w-[62ch] mb-3">
                    <span className="text-red-500 font-mono">// </span>
                    {exp.description}
                  </p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {exp.stack.map((tech, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 text-[0.56rem] font-mono text-neutral-400 border border-neutral-700 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Client · Location */}
                  {(exp.client || exp.location) && (
                    <p className="text-[0.58rem] font-mono text-neutral-500">
                      {exp.client && (
                        <>
                          via {exp.client}
                          <span className="text-red-500"> · </span>
                        </>
                      )}
                      {exp.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
