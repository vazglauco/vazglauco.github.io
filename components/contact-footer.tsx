"use client"

import Image from "next/image"
import { ArrowUpRight, ArrowDown } from "lucide-react"

const LINKS = [
  { label: "E-mail", href: "mailto:vazz.glauco@gmail.com", external: false, download: false },
  { label: "WhatsApp", href: "https://wa.me/5511983701618?text=Ol%C3%A1%20Glauco%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20oportunidades.", external: true, download: false },
  { label: "LinkedIn", href: "https://linkedin.com/in/vazglauco", external: true, download: false },
  { label: "GitHub", href: "https://github.com/vazglauco", external: true, download: false },
  { label: "Currículo", href: "/curriculo-glauco-vaz.pdf", external: false, download: true },
]

export function ContactFooter() {
  return (
    <section id="contato" className="bg-white">

      {/* Main — 4 columns */}
      <div className="px-8 md:px-16 lg:px-24 pt-14 pb-10 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 lg:gap-10 items-center">

        {/* Col 1: heading */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.6rem] text-neutral-400 tracking-[0.3em] uppercase">
            // entre em contato
          </span>
          <h2 className="font-black tracking-tight leading-[0.88] uppercase text-black text-[2.8rem] md:text-[3rem] lg:text-[4.5rem]">
            VAMOS<br />CONVERSAR<span className="text-red-600">.</span>
          </h2>
        </div>

        {/* Col 2–3: todos os links */}
        <div className="col-span-2 flex flex-col">
          {LINKS.map(({ label, href, external, download }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              download={download ? "Curriculo-Glauco-Vaz.pdf" : undefined}
              className="group flex items-center justify-between py-4 border-b border-black/10 hover:border-black transition-colors"
            >
              <span className="font-black text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] tracking-tight uppercase text-black/30 group-hover:text-black transition-colors leading-none">
                {label}
              </span>
              {download
                ? <ArrowDown className="w-5 h-5 text-black/20 group-hover:text-black transition-colors shrink-0" />
                : <ArrowUpRight className="w-5 h-5 text-black/20 group-hover:text-black transition-colors shrink-0" />
              }
            </a>
          ))}
        </div>

        {/* Col 4: illustration */}
        <div className="relative w-full aspect-square select-none">
          <Image
            src="/ilustra_contato.png"
            alt=""
            fill
            className="object-contain object-top"
            aria-hidden
          />
        </div>

      </div>

      {/* Footer bottom */}
      <div className="px-8 md:px-16 lg:px-24 py-6 border-t border-black/10 flex items-center justify-between">
        <p className="text-[0.6rem] font-mono text-neutral-400">
          © {new Date().getFullYear()} Glauco Vaz
          <span className="text-red-600"> · </span>
          Todos os direitos reservados.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 text-[0.6rem] font-mono text-neutral-400 hover:text-black transition-colors tracking-widest uppercase"
        >
          Voltar ao topo
          <span className="group-hover:text-red-600 transition-colors">↑</span>
        </button>
      </div>

    </section>
  )
}
