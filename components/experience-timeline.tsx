"use client"

import { useState } from "react"

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
    client: null,
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
  const [selected, setSelected] = useState(0)
  const [openMobile, setOpenMobile] = useState<number | null>(0)

  const exp = EXPERIENCES[selected]

  return (
    <div className="experience-section bg-[#faf9f7]">

      {/* ── DESKTOP: two-panel layout ── */}
      <div className="hidden lg:flex items-start gap-8 xl:gap-12 px-12 xl:px-20 py-16 xl:py-20">

        {/* Left — company list (dark card) */}
        <div className="w-[38%] bg-[#0a0a0a] text-white flex flex-col justify-center px-10 xl:px-14 py-14 overflow-y-auto shrink-0">
          <div className="mb-8">
            <h2 className="text-[1.6rem] xl:text-[2rem] font-black tracking-tight uppercase text-white leading-none mb-2">
              EXPERIÊNCIAS<span className="text-red-500">.</span>
            </h2>
            <span className="font-mono text-sm text-neutral-400">
              {EXPERIENCES.length} empresas{" "}
              <span className="text-red-500">·</span>{" "}
              2017<span className="text-red-500">→</span>2025
            </span>
          </div>

          <nav className="flex flex-col">
            {EXPERIENCES.map((e, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="text-left py-3 border-b border-neutral-900 group flex items-center gap-3 focus:outline-none"
              >
                <span
                  className={`font-mono text-[0.6rem] w-4 shrink-0 transition-colors ${
                    selected === i ? "text-red-500" : "text-transparent"
                  }`}
                >
                  →
                </span>
                <span
                  className={`font-black tracking-tight transition-all duration-150 ${
                    selected === i
                      ? "text-white text-[1.1rem]"
                      : "text-neutral-400 text-[0.95rem] group-hover:text-neutral-100"
                  }`}
                >
                  {e.client ?? e.company}
                </span>
                <span className="font-mono text-[0.65rem] text-neutral-400 ml-auto shrink-0 group-hover:text-white transition-colors">
                  {e.client
                    ? <><span className="text-red-500">via</span> {e.company}</>
                    : null
                  }
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right — detail panel */}
        <div className="flex-1 flex flex-col justify-center px-4 xl:px-8 py-14">
          <div key={selected} className="flex flex-col gap-5" style={{
            animation: "fadeIn 0.25s ease"
          }}>
            <span className="font-mono text-[0.62rem] text-neutral-400 tracking-widest">
              <Period text={exp.period} />
            </span>

            <div>
              <h3 className="text-[2.8rem] xl:text-[3.5rem] font-black tracking-tight leading-none text-black">
                {exp.company}
                <span className="text-red-500">.</span>
              </h3>
              <p className="text-base font-light italic text-neutral-500 mt-2">
                {exp.role}
              </p>
            </div>

            <div className="w-10 h-[2px] bg-red-500" />

            <p className="text-[0.85rem] text-neutral-500 leading-relaxed max-w-[54ch]">
              <span className="text-red-500 font-mono text-xs">// </span>
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {exp.stack.map((tech, j) => (
                <span
                  key={j}
                  className="px-3 py-1 text-[0.62rem] font-mono text-neutral-400 border border-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            {(exp.client || exp.location) && (
              <p className="text-[0.62rem] font-mono text-neutral-400">
                {exp.client && (
                  <>
                    <span className="text-red-500">via</span> {exp.client}{" "}
                    <span className="text-red-500">·</span>{" "}
                  </>
                )}
                {exp.location}
              </p>
            )}

            <span className="font-mono text-[0.58rem] text-neutral-400 mt-2">
              ({String(selected + 1).padStart(2, "0")}/
              {String(EXPERIENCES.length).padStart(2, "0")})
            </span>
          </div>
        </div>
      </div>

      {/* ── MOBILE: accordion ── */}
      <div className="lg:hidden py-12">
        <div className="px-8 mb-6 flex items-baseline justify-between">
          <span className="text-[0.58rem] font-mono tracking-[0.25em] uppercase text-neutral-500">
            experiências
          </span>
          <span className="text-[0.58rem] font-mono text-neutral-500">
            {EXPERIENCES.length} empresas{" "}
            <span className="text-red-500">·</span> 2017
            <span className="text-red-500">→</span>2025
          </span>
        </div>

        <div className="border-t border-neutral-700/40 mx-8">
          {EXPERIENCES.map((e, i) => {
            const isActive = openMobile === i
            return (
              <div key={i} className="border-b border-neutral-700/40">
                <button
                  onClick={() => setOpenMobile(isActive ? null : i)}
                  className={`w-full text-left px-0 py-3.5 flex items-center gap-4 transition-colors group focus:outline-none ${
                    isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="font-mono text-[0.58rem] shrink-0 w-9 text-neutral-500 select-none">
                    <span className="text-red-500">(</span>
                    {String(i + 1).padStart(2, "0")}
                    <span className="text-red-500">)</span>
                  </span>
                  <span
                    className={`font-black text-sm tracking-tight shrink-0 transition-colors leading-none ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 group-hover:text-white"
                    }`}
                  >
                    {e.company}
                  </span>
                  <span className="text-red-500 text-xs shrink-0 select-none hidden sm:block">·</span>
                  <span
                    className={`text-[0.72rem] font-light italic transition-colors hidden sm:block leading-none ${
                      isActive
                        ? "text-neutral-300"
                        : "text-neutral-600 group-hover:text-neutral-400"
                    }`}
                  >
                    {e.role}
                  </span>
                  <span
                    className={`ml-auto font-mono text-base font-semibold shrink-0 transition-colors select-none leading-none ${
                      isActive
                        ? "text-red-500"
                        : "text-neutral-600 group-hover:text-neutral-400"
                    }`}
                  >
                    {isActive ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isActive ? "max-h-64" : "max-h-0"
                  }`}
                >
                  <div className="pb-5 pt-1 pl-[52px]">
                    <p className="font-mono text-[0.58rem] text-neutral-500 mb-2">
                      <Period text={e.period} />
                    </p>
                    <p className="text-[0.72rem] text-neutral-400 leading-relaxed max-w-[62ch] mb-3">
                      <span className="text-red-500 font-mono">// </span>
                      {e.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {e.stack.map((tech, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 text-[0.56rem] font-mono text-neutral-400 border border-neutral-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {(e.client || e.location) && (
                      <p className="text-[0.58rem] font-mono text-neutral-500">
                        {e.client && (
                          <>
                            via {e.client}
                            <span className="text-red-500"> · </span>
                          </>
                        )}
                        {e.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
