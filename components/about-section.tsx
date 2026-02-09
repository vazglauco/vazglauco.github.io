"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

export function AboutSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="about"
      className="relative w-screen h-screen overflow-hidden bg-background flex items-center justify-center snap-start snap-always"
    >
      {/* Conteúdo */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="space-y-12 text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-8">
            sobre<span className="text-highlight">.</span>mim<span className="text-highlight">()</span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl font-light text-muted-foreground" style={{ lineHeight: '1.7' }}>
            Minha trajetória na programação começa em <span className="text-highlight">2012</span>, movido pela curiosidade e pelo desejo de entender como a tecnologia funciona. Aos poucos, o hobby virou <span className="text-highlight">paixão</span>. Desde então passei noites estudando, testando ideias e criando meus primeiros projetos, e nunca mais parei de <span className="text-highlight">aprender</span> e de <span className="text-highlight">construir</span>.
          </p>

          <p className="text-base md:text-lg lg:text-xl font-light text-muted-foreground" style={{ lineHeight: '1.7' }}>
            Hoje atuo como desenvolvedor <span className="text-highlight">Full Stack</span> Sr., com foco em <span className="text-highlight">Angular, NestJS, Node.js e Next.js</span>. Tenho experiência em <span className="text-highlight">arquitetura de sistemas</span> e na criação de soluções completas, da concepção ao produto final. Meu foco está em unir técnica e propósito: transformar <span className="text-highlight">ideias</span> em produtos reais que geram valor, <span className="text-highlight">impacto</span> e liberdade para quem os usa.
          </p>

          <p className="text-base md:text-lg lg:text-xl font-light text-muted-foreground" style={{ lineHeight: '1.7' }}>
            Nos últimos anos, venho expandindo meu trabalho além do <span className="text-highlight">código</span>: explorando inteligência artificial, automações e modelos de negócio próprios. Acredito que a <span className="text-highlight">tecnologia</span> é mais do que uma ferramenta: é a <span className="text-highlight">arte</span> de transformar ideias em <span className="text-highlight">realidade</span>, criar oportunidades, inspirar <span className="text-highlight">pessoas</span> e abrir <span className="text-highlight">caminhos</span> para o novo.
          </p>
        </div>
      </div>

      {/* Imagem no canto inferior direito */}
      <div className="absolute bottom-0 right-0 z-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        <Image
          src="/FINAL_CARTA GLAUCO.png"
          alt="Glauco Vaz"
          width={384}
          height={384}
          className="object-contain opacity-30 hover:opacity-50 transition-opacity duration-500"
          priority
        />
      </div>
    </section>
  )
}
