"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MessageCircle, Download, Github, Linkedin, ArrowUp } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export function ContactFooter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.4,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const whatsappMessage = encodeURIComponent(
    "Olá Glauco! Vi seu portfólio e gostaria de conversar sobre oportunidades."
  )
  const whatsappUrl = `https://wa.me/5511983701618?text=${whatsappMessage}`

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative bg-[#faf9f7] text-black min-h-screen flex flex-col justify-between"
    >
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24">
        {/* Header */}
        <div
          ref={(el) => { if (el) itemsRef.current[0] = el }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-[3rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] font-black tracking-tight leading-[0.85] text-black uppercase">
            VAMOS
            <br />
            <span className="text-amber-500">CONVERSAR</span>
            <span className="text-neutral-400">.</span>
          </h2>
        </div>

        {/* Contact links + imagem */}
        <div className="flex items-stretch gap-8 lg:gap-16">
          <div className="flex flex-col gap-0 max-w-4xl w-full">
          <a
            ref={(el) => { if (el) itemsRef.current[1] = el }}
            href="mailto:vazz.glauco@gmail.com"
            className="group flex items-center justify-between py-6 border-b border-neutral-200 hover:border-amber-800/40 transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <Mail className="w-5 h-5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
              <span className="text-lg md:text-2xl font-bold tracking-tight group-hover:text-amber-100 transition-colors">
                vazz.glauco@gmail.com
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase hidden sm:block">
              Email
            </span>
          </a>

          <a
            ref={(el) => { if (el) itemsRef.current[2] = el }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 border-b border-neutral-200 hover:border-green-800/40 transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <MessageCircle className="w-5 h-5 text-neutral-400 group-hover:text-green-500 transition-colors" />
              <span className="text-lg md:text-2xl font-bold tracking-tight group-hover:text-green-100 transition-colors">
                WhatsApp
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase hidden sm:block">
              Chat
            </span>
          </a>

          <a
            ref={(el) => { if (el) itemsRef.current[3] = el }}
            href="https://linkedin.com/in/vazglauco"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 border-b border-neutral-200 hover:border-blue-800/40 transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-lg md:text-2xl font-bold tracking-tight group-hover:text-blue-100 transition-colors">
                LinkedIn
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase hidden sm:block">
              Rede
            </span>
          </a>

          <a
            ref={(el) => { if (el) itemsRef.current[4] = el }}
            href="https://github.com/vazglauco"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 border-b border-neutral-200 hover:border-neutral-600 transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <Github className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              <span className="text-lg md:text-2xl font-bold tracking-tight group-hover:text-neutral-100 transition-colors">
                GitHub
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase hidden sm:block">
              Código
            </span>
          </a>

          <a
            ref={(el) => { if (el) itemsRef.current[5] = el }}
            href="/curriculo-glauco-vaz.pdf"
            download="Curriculo-Glauco-Vaz.pdf"
            className="group flex items-center justify-between py-6 border-b border-neutral-200 hover:border-amber-800/40 transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <Download className="w-5 h-5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
              <span className="text-lg md:text-2xl font-bold tracking-tight group-hover:text-amber-100 transition-colors">
                Download Currículo
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase hidden sm:block">
              PDF
            </span>
          </a>
          </div>

          {/* Ilustração centralizada na segunda coluna */}
          <div className="hidden md:flex shrink-0 w-56 lg:w-72 xl:w-80 items-center justify-center">
            <Image
              src="/ilustra_contato.png"
              alt="Ilustração contato"
              width={400}
              height={480}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 md:px-16 lg:px-24 py-8 border-t border-neutral-200 flex items-center justify-between">
        <p className="text-xs text-neutral-400 font-mono">
          © {new Date().getFullYear()} Glauco Vaz. Todos os direitos reservados.
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-500 transition-colors"
        >
          Voltar ao topo
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  )
}
