"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
  {
    period: "out 2025 — presente",
    role: "Desenvolvedor Front-end",
    company: "DOMVS iT · Mentes Notáveis",
    location: "São Paulo, SP",
    description:
      "Atuei no desenvolvimento de diferentes frentes de uma plataforma de educação complementar gamificada. Construí painéis administrativos com React e Next.js e as aplicações principais em Angular, responsáveis pela experiência dos alunos. Também desenvolvi jogos educacionais com TypeScript e Phaser.",
    stack: ["Angular", "React", "Next.js", "TypeScript", "Phaser"],
  },
  {
    period: "dez 2024 — jun 2025",
    role: "Software Engineer Fullstack",
    company: "Innvo Labs · Porto Seguro",
    location: "São Paulo, SP · Remoto",
    description:
      "Atuei em produtos voltados à jornada de contratação de seguros. No Portal das Imobiliárias, desenvolvi novas funcionalidades como fullstack. No sistema de Capitalização, liderei tecnicamente a implementação de um novo método de pagamento, participando da definição da arquitetura e conduzindo a integração com o gateway interno da Porto Seguro.",
    stack: ["React", "Angular", "Node.js", "TypeScript"],
  },
  {
    period: "jun 2024 — dez 2024",
    role: "Software Engineer Frontend",
    company: "Sinqia",
    location: "São Paulo, SP · Híbrido",
    description:
      "Atuei na modernização de um sistema legado do mercado financeiro, originado nos anos 90. Defini e implementei a estratégia de migração com micro frontends em Angular, conduzindo a evolução incremental da aplicação. Em alguns fluxos, realizamos migração completa; em outros, aplicamos estrangulamento integrando o legado em Java.",
    stack: ["Angular", "Microfrontends", "TypeScript", "Java"],
  },
  {
    period: "fev 2022 — fev 2024",
    role: "Software Engineer Frontend / Fullstack",
    company: "AgileThought · Santander",
    location: "São Paulo, SP",
    description:
      "Trabalhei em três frentes dentro do ambiente corporativo do banco. Desenvolvi micro frontends em Angular para jornadas de contratação de seguros, evoluí um sistema interno de gestão de contratos atuando também no back-end em Java, e liderei tecnicamente o desenvolvimento front-end da segunda versão do painel PJ com integração ao Open Finance.",
    stack: ["Angular", "Microfrontends", "Java", "Open Finance", "TypeScript"],
  },
  {
    period: "abr 2021 — set 2021",
    role: "Software Engineer Frontend",
    company: "Poupachef",
    location: "São Paulo, SP",
    description:
      "Atuei no desenvolvimento e sustentação de funcionalidades nos sistemas web da empresa, contribuindo na construção e manutenção das interfaces com React.",
    stack: ["React", "JavaScript", "Git"],
  },
  {
    period: "out 2019 — set 2020",
    role: "Software Engineer Fullstack",
    company: "Conquest · Guide Investimentos",
    location: "São Paulo, SP",
    description:
      "Contribuí no desenvolvimento de um sistema de backoffice para operações internas, atuando tanto no front-end em Angular quanto no back-end em Ruby on Rails. Também apoiei desenvolvedores mais juniores na orientação sobre processos e fundamentos de desenvolvimento.",
    stack: ["Angular", "Ruby on Rails", "REST APIs", "Git"],
  },
  {
    period: "fev 2019 — out 2019",
    role: "Software Engineer Frontend",
    company: "Indra · Santander",
    location: "São Paulo, SP",
    description:
      "Fui responsável pelo desenvolvimento de um dashboard para controle de dados internos do Santander, atuando na construção do front-end da aplicação com Angular.",
    stack: ["Angular", "TypeScript", "JavaScript"],
  },
  {
    period: "jun 2018 — jan 2019",
    role: "Software Engineer Frontend",
    company: "GFT · Serasa Experian",
    location: "São Paulo, SP",
    description:
      "Alocado na Serasa Experian, atuei no desenvolvimento de novas funcionalidades em um dashboard de insights georreferenciados, contribuindo na evolução da aplicação e melhorias na visualização de dados. Trabalhei principalmente no front-end com Angular.",
    stack: ["Angular", "JavaScript", "Git"],
  },
  {
    period: "mar 2017 — mai 2018",
    role: "Software Engineer Fullstack",
    company: "Creditoo",
    location: "São Paulo, SP",
    description:
      "Atuei desde o início do desenvolvimento da segunda versão da aplicação de uma fintech de crédito consignado com contratação 100% online. Contribuí na construção do front-end em Angular e no back-end em PHP com Laravel, além de atuar na sustentação de sistemas legados e APIs existentes.",
    stack: ["Angular", "PHP", "Laravel", "JavaScript"],
  },
]

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const entriesRef = useRef<HTMLDivElement[]>([])
  const periodsRef = useRef<HTMLDivElement[]>([])
  const contentsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const scroller =
      (sectionRef.current.closest(".snap-container") as HTMLElement) || undefined

    const ctx = gsap.context(() => {
      entriesRef.current.forEach((entry, i) => {
        const period = periodsRef.current[i]
        const content = contentsRef.current[i]
        if (!entry || !period || !content) return

        gsap.fromTo(
          period,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: entry,
              scroller,
              start: "top 85%",
              end: "top 40%",
              scrub: 0.5,
            },
          }
        )

        gsap.fromTo(
          content,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: entry,
              scroller,
              start: "top 75%",
              end: "top 35%",
              scrub: 0.5,
            },
          }
        )
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="experience-section relative bg-white text-black">
      {/* Timeline entries + imagem sticky direita */}
      <div className="flex items-start pt-16">
        <div className="flex-1 px-8 md:px-16 lg:px-24 pb-32">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) entriesRef.current[i] = el
            }}
            className="border-t border-neutral-200 md:min-h-[80vh] flex flex-col md:grid md:grid-cols-12 md:gap-x-8 relative"
          >
            {/* Left — Period (sticky) */}
            <div className="md:col-span-5 pt-8 md:pt-12">
              <div
                ref={(el) => {
                  if (el) periodsRef.current[i] = el
                }}
                className="sticky top-[25vh]"
              >
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

            {/* Right — Content (sticky) */}
            <div className="md:col-span-7 pt-6 md:pt-12 pb-16 md:pb-24">
              <div
                ref={(el) => {
                  if (el) contentsRef.current[i] = el
                }}
                className="sticky top-[25vh]"
              >
                <div className="flex flex-col gap-6">
                  {/* Role & Company */}
                  <div>
                    <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold italic tracking-tight text-black mb-2">
                      {exp.role}
                    </h4>
                    <div className="flex items-center gap-3 text-sm md:text-base">
                      <span className="text-amber-700/80 font-semibold">
                        {exp.company}
                      </span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-neutral-500">{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-[45ch] text-balance">
                    {exp.description}
                  </p>

                  {/* Tech stack */}
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
          </div>
        ))}
        {/* Bottom border */}
        <div className="border-t border-neutral-200" />
        </div>

        {/* Título + ilustração sticky canto direito */}
        <div className="hidden md:block shrink-0 w-72 lg:w-[26rem] self-stretch pr-8 md:pr-12 lg:pr-16">
          <div className="sticky top-14">
            <div
              className="text-right mb-6 select-none"
              style={{ fontFamily: "var(--font-fira-code), monospace" }}
            >
              <div className="flex items-baseline justify-end gap-3">
                <span className="text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-black tracking-tight leading-none text-black uppercase">
                  EXPERIENCE
                </span>
                <span className="text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-black text-red-500 leading-none">
                  /
                </span>
              </div>
            </div>
            <Image
              src="/ilustra_trampos_2.png"
              alt="Ilustração"
              width={500}
              height={600}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
