'use client'

import { Download } from 'lucide-react'

const hash = (a: number, b: number) => (a * 31 + b * 17 + a * b * 7) % 97

function NaipesPattern() {
  const suits = ['♠', '♣', '♥', '♦']
  const rows = 5
  const cols = 10
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <div className="flex flex-col justify-between h-full py-10">
        {Array.from({ length: rows }).map((_, r) => (
          <div
            key={r}
            className="flex justify-between items-center px-8 md:px-16"
            style={{ transform: r % 2 === 1 ? 'translateX(5%)' : 'none' }}
          >
            {Array.from({ length: cols }, (_, i) => {
              const h = hash(r, i)
              const op = 0.025 + (h % 5) / 200
              return (
                <span
                  key={i}
                  className="text-2xl md:text-3xl lg:text-4xl"
                  style={{ color: `rgba(255,255,255,${op})` }}
                >
                  {suits[(r + i) % suits.length]}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ResumeCTAStrip() {
  return (
    <div className="relative bg-[#111111] overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center gap-6 px-8 md:px-16 lg:px-24 py-10 md:py-12">

        {/* heading */}
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-mono text-[0.58rem] text-neutral-500 tracking-[0.3em] uppercase">
            // próximo passo
          </span>
          <h2 className="font-black tracking-tight leading-none uppercase text-white text-[1.8rem] md:text-[2.4rem] lg:text-[3rem]">
            BAIXE MEU CURRÍCULO
            <span className="text-red-600">.</span>
          </h2>
          <span className="font-mono text-[0.58rem] text-neutral-500 tracking-widest">
            glauco-vaz-2025.pdf
          </span>
        </div>

        {/* CTA */}
        <a
          href="/curriculo-glauco-vaz.pdf"
          download="Curriculo-Glauco-Vaz.pdf"
          className="group flex items-center gap-3 px-7 py-3.5 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200 font-bold text-sm uppercase tracking-widest shrink-0"
        >
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          Download PDF
        </a>
      </div>
    </div>
  )
}
