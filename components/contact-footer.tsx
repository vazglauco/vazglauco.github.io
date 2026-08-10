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
    <section id="contato" className="scroll-mt-24 bg-white overflow-visible relative z-10">

      {/* Main — 2 cols: content left, image right */}
      <div className="flex items-stretch min-h-[420px]">

        {/* Left: heading + links */}
        <div className="flex-1 px-8 md:px-16 lg:px-24 pt-14 pb-10 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.6rem] text-neutral-500 tracking-[0.3em] uppercase">
              // entre em contato
            </span>
            <h2 className="font-black tracking-tight leading-[0.88] uppercase text-black text-[2.8rem] md:text-[3rem] lg:text-[4.5rem]">
              VAMOS<br />CONVERSAR<span className="text-red-600">.</span>
            </h2>
          </div>

          <div className="flex flex-col">
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
        </div>

        {/* Right: large illustration overflowing top and bottom */}
        <div className="hidden md:block relative shrink-0 select-none" style={{ width: '42%' }}>
          <div className="absolute left-0 right-0 pointer-events-none" style={{ top: '-180px', bottom: '24px' }}>
            <Image
              src="/ilustra_contato.webp"
              alt=""
              fill
              className="object-contain object-bottom"
              aria-hidden
              sizes="42vw"
            />
          </div>
        </div>

      </div>

      {/* Footer bottom */}
      <div className="px-8 md:px-16 lg:px-24 py-6 border-t border-black/10 flex items-center justify-between">
        <p className="text-[0.6rem] font-mono text-neutral-500">
          © {new Date().getFullYear()} Glauco Vaz
          <span className="text-red-600"> · </span>
          Todos os direitos reservados.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo da página"
          className="group flex items-center gap-2 text-[0.6rem] font-mono text-neutral-500 hover:text-black transition-colors tracking-widest uppercase"
        >
          Voltar ao topo
          <span className="group-hover:text-red-600 transition-colors">↑</span>
        </button>
      </div>

    </section>
  )
}
