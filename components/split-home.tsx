"use client"

import { useRef, useEffect, useCallback } from "react"
import { Linkedin, Github, Mail, ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"

/* ───── background pattern suits ───── */

function PatternBackground({ variant }: { variant: "dark" | "light" }) {
  const isDark = variant === "dark"
  const suits = isDark ? ["♠", "♣"] : ["♥", "♦"]
  const suitColor = isDark
    ? "text-white/[0.06]"
    : "text-red-400/[0.08]"

  const rows = 8
  const itemsPerRow = 12

  const buildRow = (rowIdx: number) => {
    const items = []
    for (let i = 0; i < itemsPerRow; i++) {
      const suit = suits[(rowIdx + i) % suits.length]
      items.push(
        <span key={i} className={`flex-shrink-0 ${suitColor} mx-10 md:mx-14 lg:mx-20`}>{suit}</span>
      )
    }
    return items
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      <div className="flex flex-col justify-between h-full py-6">
        {Array.from({ length: rows }).map((_, r) => {
          const goRight = r % 2 === 0
          return (
            <div
              key={r}
              className="flex items-center whitespace-nowrap text-xl md:text-2xl lg:text-3xl"
              style={{
                animation: `${goRight ? "patternScrollRight" : "patternScrollLeft"} ${25 + r * 3}s linear infinite`,
              }}
            >
              {buildRow(r)}
              {buildRow(r)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function SplitHome() {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2

    // Distance from card center, normalized to -1..1 range based on viewport
    const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2
    const deltaX = (e.clientX - cardCenterX) / maxDistance
    const deltaY = (e.clientY - cardCenterY) / maxDistance

    // Tilt: rotateY follows X, rotateX follows inverted Y
    const tiltX = -deltaY * 45 // max 45deg
    const tiltY = deltaX * 45

    cardRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden relative">
      {/* ===== Card image fixed center ===== */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none" style={{ perspective: '1000px' }}>
        <div
          ref={cardRef}
          style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
        >
          <Image
            src="/FINAL_CARTA GLAUCO.png"
            alt="Glauco Vaz Card"
            width={280}
            height={400}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* ===== LEFT PANEL — Dark ===== */}
      <div className="relative flex-1 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        <PatternBackground variant="dark" />

        <div className="relative z-10 px-8 md:px-14 lg:px-16 max-w-xl w-full">
          {/* Label */}
          <p className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.25em] text-neutral-300 mb-6 font-light">
            <span className="text-red-500">♠</span> São Paulo, Brasil
          </p>

          {/* Name — big & bold */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-white">
            GLAUCO
            <br />
            <span className="text-white">VAZ</span>
            <span className="text-red-500 text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none">.</span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-sm">
            Transformando ideias em produtos digitais com{" "}
            <span className="text-red-500">código</span>,{" "}
            <span className="text-red-500">arquitetura</span> e paixão por tecnologia.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-10">
            <a
              href="https://linkedin.com/in/vazglauco"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-neutral-700 hover:border-neutral-500 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/vazglauco"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-neutral-700 hover:border-neutral-500 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="mailto:vazz.glauco@gmail.com"
              className="w-11 h-11 rounded-full border border-neutral-700 hover:border-neutral-500 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-8 md:left-14 lg:left-16 flex items-center gap-2 text-neutral-400 text-xs tracking-wider uppercase">
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          Scroll
        </div>
      </div>

      {/* ===== RIGHT PANEL — Light ===== */}
      <div className="relative flex-1 bg-[#faf9f7] flex items-center justify-center overflow-hidden">
        <PatternBackground variant="light" />

        <div className="relative z-10 px-8 md:px-14 lg:px-16 max-w-xl w-full text-right">
          {/* Label */}
          <p className="flex items-center justify-end gap-2 text-xs md:text-sm uppercase tracking-[0.25em] text-neutral-500 mb-6 font-light">
            <span className="text-red-500">♦</span> Desde 2012
          </p>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-neutral-800 uppercase">
            Software
            <br />
            Engineer<span className="text-red-500">.</span>
          </h2>

          {/* Tech stack */}
          <p className="mt-10 text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            Front-end <span className="text-red-500">·</span> Back-end <span className="text-red-500">·</span> Arquitetura <span className="text-red-500">·</span> AWS
          </p>
        </div>

        {/* Top-right link */}
        <a
          href="/curriculo-glauco-vaz.pdf"
          download="Curriculo-Glauco-Vaz.pdf"
          className="absolute top-6 right-8 text-xs uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors font-medium"
        >
          Currículo
        </a>
      </div>
    </div>
  )
}
