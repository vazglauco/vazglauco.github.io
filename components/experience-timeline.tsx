"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const entriesRef = useRef<HTMLDivElement[]>([])
  const periodsRef = useRef<HTMLDivElement[]>([])
  const contentsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      entriesRef.current.forEach((entry, i) => {
        const period = periodsRef.current[i]
        const content = contentsRef.current[i]
        if (!entry || !period || !content) return

        // The period text fades/slides in when entry enters
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
              start: "top 85%",
              end: "top 40%",
              scrub: 0.5,
            },
          }
        )

        // Content slides in from right
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
              start: "top 75%",
              end: "top 35%",
              scrub: 0.5,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative bg-white text-black">
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
            Minha trajetória profissional, construída com dedicação e evolução
            constante em cada projeto e equipe.
          </p>
        </div>
      </div>

      {/* Timeline entries */}
      <div className="px-8 md:px-16 lg:px-24 pb-32">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) entriesRef.current[i] = el
            }}
            className="border-t border-neutral-200 min-h-[70vh] md:min-h-[80vh] flex flex-col md:grid md:grid-cols-12 md:gap-x-8 relative"
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
    </div>
  )
}
