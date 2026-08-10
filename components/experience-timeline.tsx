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
  return (
    <section
      id="experiencia"
      className="experience-section scroll-mt-24 bg-[#faf9f7] px-6 py-20 md:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex justify-end">
          <div className="flex items-center gap-4 text-right">
            <div>
                    <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
                {EXPERIENCES.length} empresas
                <span className="mx-2 text-red-500">·</span>
                2017<span className="text-red-500">→</span>2025
              </p>
              <h2 className="text-[2.5rem] font-black uppercase leading-none tracking-tight text-black md:text-[3.5rem] lg:text-[4.5rem]">
                experiências
                <span className="text-neutral-300">/</span>
              </h2>
            </div>
            <span className="block h-10 w-[3px] shrink-0 bg-red-500" />
          </div>
        </header>

        <div>
          {EXPERIENCES.map((exp, index) => {
            const title = exp.client ?? exp.company
            const reverse = index % 2 === 1

            return (
              <article
                key={`${exp.company}-${exp.period}`}
                className="border-t border-neutral-200 py-14 last:border-b md:py-20"
              >
                <div
                  className={`grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14 ${
                    reverse ? "lg:grid-cols-[1.1fr_0.9fr]" : ""
                  }`}
                >
                  <div className={reverse ? "lg:order-2" : ""}>
                    <div className="mb-6 flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-neutral-500">
                      <span className="text-red-500">
                        ({String(index + 1).padStart(2, "0")})
                      </span>
                      <span className="h-px flex-1 bg-neutral-200" />
                      <span>{exp.role}</span>
                    </div>

                    <h3 className="text-3xl font-black uppercase leading-none tracking-tight text-black md:text-4xl lg:text-[2.75rem]">
                      {title}
                      <span className="text-red-500">.</span>
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-neutral-500">
                      <span>
                        <Period text={exp.period} />
                      </span>
                      <span>{exp.location}</span>
                    </div>

                      {exp.client && (
                        <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-neutral-500">
                        <span className="text-red-500">via</span> {exp.company}
                      </p>
                    )}
                  </div>

                  <div className={reverse ? "lg:order-1" : ""}>
                    <p className="max-w-[52rem] text-base leading-loose text-neutral-600 md:text-lg">
                      <span className="font-mono text-sm text-red-500">// </span>
                      {exp.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-neutral-200 px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-wide text-neutral-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
