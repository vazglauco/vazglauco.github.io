"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"
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
  const breathRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const lootTlRef = useRef<gsap.core.Timeline | null>(null)
  const lootYRef = useRef<gsap.core.Tween | null>(null)
  const lootXRef = useRef<gsap.core.Tween | null>(null)
  const glowTweenRef = useRef<gsap.core.Tween | null>(null)
  const isBreathingRef = useRef(false)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const startBreathing = useCallback(() => {
    if (isBreathingRef.current) return
    const card = cardRef.current
    if (!card) return

    isBreathingRef.current = true

    const proxy = { t: 0 }
    lootTlRef.current = gsap.to(proxy, {
      t: Math.PI * 2,
      duration: 14,
      ease: "none",
      repeat: -1,
      onUpdate() {
        if (!cardRef.current) return
        gsap.set(cardRef.current, {
          rotateY: Math.sin(proxy.t) * 22,
          rotateX: Math.sin(proxy.t * 2 + 1.0) * 14,
        })
      }
    }) as unknown as gsap.core.Timeline
  }, [])

  const cardCenterRef = useRef({ x: 0, y: 0 })
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })

  const stopBreathing = useCallback((snapToZero = false) => {
    if (!isBreathingRef.current) return
    isBreathingRef.current = false

    if (lootTlRef.current) { lootTlRef.current.kill(); lootTlRef.current = null }
    if (lootYRef.current) { lootYRef.current.kill(); lootYRef.current = null }
    if (lootXRef.current) { lootXRef.current.kill(); lootXRef.current = null }

    if (snapToZero) {
      const card = cardRef.current
      if (card) gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" })
    } else {
      if (cardRef.current) {
        const computed = gsap.getProperty(cardRef.current, "rotateX") as number
        const computedY = gsap.getProperty(cardRef.current, "rotateY") as number
        mouseCurrent.current.x = computed
        mouseCurrent.current.y = computedY
        gsap.killTweensOf(cardRef.current, "rotateX,rotateY")
      }
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    stopBreathing()
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(startBreathing, 500)

    const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2
    const deltaX = (e.clientX - cardCenterRef.current.x) / maxDistance
    const deltaY = (e.clientY - cardCenterRef.current.y) / maxDistance

    mouseTarget.current.x = -deltaY * 30
    mouseTarget.current.y =  deltaX * 30
  }, [stopBreathing, startBreathing])

  useEffect(() => {
    const cacheCenter = () => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      cardCenterRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    }
    cacheCenter()
    window.addEventListener('resize', cacheCenter)

    startBreathing()

    // mousemove só em desktop
    if (!isMobile) {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      const onTick = () => {
        if (isBreathingRef.current) return
        const card = cardRef.current
        if (!card) return
        mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.08)
        mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.08)
        gsap.set(card, {
          rotateX: mouseCurrent.current.x,
          rotateY: mouseCurrent.current.y,
        })
      }
      window.addEventListener('mousemove', handleMouseMove)
      gsap.ticker.add(onTick)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', cacheCenter)
        gsap.ticker.remove(onTick)
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        if (lootTlRef.current) lootTlRef.current.kill()
        if (lootYRef.current) lootYRef.current.kill()
        if (lootXRef.current) lootXRef.current.kill()
        if (glowTweenRef.current) glowTweenRef.current.kill()
      }
    }

    return () => {
      window.removeEventListener('resize', cacheCenter)
      if (lootTlRef.current) lootTlRef.current.kill()
      if (lootYRef.current) lootYRef.current.kill()
      if (lootXRef.current) lootXRef.current.kill()
      if (glowTweenRef.current) glowTweenRef.current.kill()
    }
  }, [handleMouseMove, startBreathing, isMobile])

  /* ───── MOBILE LAYOUT ───── */
  if (isMobile) {
    return (
      <div className="h-screen w-screen flex flex-col relative overflow-hidden">

        {/* Painel escuro — 58% do topo */}
        <div
          className="relative bg-[#0a0a0a] flex flex-col justify-center px-7 pt-8"
          style={{ flex: "0 0 58%", paddingBottom: "clamp(160px, 24vh, 210px)" }}
        >
          <PatternBackground variant="dark" />

          <div className="relative z-10 flex flex-col gap-4">
            <p className="font-mono text-xs text-neutral-400 tracking-wide">
              <span className="text-neutral-500">{"{ "}</span>
              location
              <span className="text-neutral-500">{": "}</span>
              <span className="text-neutral-300">"São Paulo, Brasil"</span>
              <span className="text-neutral-500">{"}"}</span>
            </p>

            <h1 className="font-black tracking-tight leading-[0.88] text-white text-[2.6rem]">
              <span className="block">glauco</span>
              <span className="block">
                <span className="invisible">gl</span>
                <span className="text-[rgb(200,30,20)]">.</span>vaz
                <span className="text-[rgb(200,30,20)]">();</span>
              </span>
            </h1>

            <div className="font-mono text-xs text-neutral-400 leading-relaxed">
              <p><span className="text-neutral-300">{"// "}</span>construo sistemas, sites e aplicativos</p>
              <p><span className="text-neutral-300">{"// "}</span>do planejamento ao deploy</p>
            </div>

            <div className="flex flex-col gap-3 mt-1">
              <div className="flex gap-2">
                <a
                  href="/blog"
                  className="inline-block bg-[rgb(200,30,20)] hover:bg-[rgb(165,20,12)] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-2 transition-colors"
                >
                  ✦ Leia meu blog
                </a>
                <a
                  href="mailto:ext.glaucobaptista@mentesnotaveis.com.br"
                  className="inline-block border border-neutral-500 hover:border-white text-neutral-300 hover:text-white text-[9px] font-bold tracking-widest uppercase px-3 py-2 transition-colors"
                >
                  Mensagem →
                </a>
              </div>
              <a
                href="/curriculo-glauco-vaz.pdf"
                download="Curriculo-Glauco-Vaz.pdf"
                className="inline-block text-neutral-500 hover:text-neutral-300 text-[10px] font-mono tracking-wide transition-colors"
              >
                ↓ baixar currículo (.pdf)
              </a>
            </div>
          </div>
        </div>

        {/* Painel branco — 42% abaixo */}
        <div
          className="relative bg-white flex flex-col justify-center px-7 pb-6"
          style={{ flex: "0 0 42%", paddingTop: "clamp(160px, 24vh, 210px)" }}
        >
          <PatternBackground variant="light" />

          <div className="relative z-10 text-right">
            {/* Title */}
            <h2 className="font-black text-neutral-900 text-[1.4rem] leading-[1.05] mb-1 whitespace-nowrap">
              Fullstack Engineer<span className="text-[rgb(200,30,20)]">.</span>
            </h2>

            {/* Subtitle */}
            <p className="font-mono text-[12px] text-neutral-400 tracking-wide mb-4">
              desde <span className="text-neutral-700 font-bold">2016</span>
              <span className="mx-1 text-neutral-300">·</span>
              freela &amp; CLT
            </p>

            {/* Stats */}
            <div className="flex gap-6 justify-end mb-4">
              {[
                { value: "9", label: "ANOS" },
                { value: "11", label: "EMPRESAS" },
                { value: "∞", label: "COMMITS" },
              ].map(({ value, label }) => (
                <div key={label} className="text-right">
                  <div className="font-black text-[1.8rem] text-neutral-900 leading-none">
                    {value}<span className="text-[rgb(200,30,20)]">.</span>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 mt-0.5 uppercase">{label}</div>
                </div>
              ))}
            </div>

            {/* Stack */}
            <p className="font-black text-neutral-900 text-[1.1rem]">
              Angular <span className="text-[rgb(200,30,20)]">·</span> React <span className="text-[rgb(200,30,20)]">·</span> Node
            </p>
          </div>

          <div className="absolute bottom-4 left-7 flex items-center gap-2 text-neutral-400 text-[10px] tracking-widest uppercase z-10">
            <ChevronDown className="h-3 w-3 animate-bounce" />
            scroll
          </div>
        </div>

        {/* Carta — centralizada no boundary entre os dois painéis */}
        <div
          className="absolute left-1/2 z-30 pointer-events-none"
          style={{
            top: "58%",
            transform: "translateX(-50%) translateY(-50%)",
            perspective: "800px",
          }}
        >
          <div ref={breathRef}>
            <div ref={cardRef} style={{ backfaceVisibility: "hidden" }}>
              <Image
                src="/FINAL_CARTA GLAUCO.png"
                alt="Glauco Vaz Card"
                width={280}
                height={400}
                className="object-contain drop-shadow-2xl"
                style={{ width: "52vw", height: "auto", maxWidth: "240px" }}
                priority
              />
            </div>
          </div>
        </div>

      </div>
    )
  }

  /* ───── DESKTOP LAYOUT (original) ───── */
  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden relative">

      {/* ===== Card — fixed at center boundary ===== */}
      <div
        className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        style={{ perspective: '1000px' }}
      >
        <div ref={breathRef}>
          <div
            ref={cardRef}
            style={{ backfaceVisibility: 'hidden' }}
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
      </div>

      {/* ===== LEFT PANEL — Dark ===== */}
      <div className="relative flex-1 min-h-[55vh] lg:min-h-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        <PatternBackground variant="dark" />

        <div className="relative z-10 px-8 md:px-12 lg:px-14 max-w-xl w-full">

          <p className="font-mono text-lg text-neutral-400 mb-7 tracking-wide leading-relaxed">
            <span className="text-neutral-500">{"{ "}</span>
            location
            <span className="text-neutral-500">{": "}</span>
            <span className="text-neutral-300">"São Paulo, Brasil"</span>
            <span className="text-neutral-500">{"}"}</span>
          </p>

          <h1 className="font-black tracking-tight leading-[0.88] text-white text-4xl md:text-5xl lg:text-6xl">
            <span className="block">
              glauco
            </span>
            <span className="block">
              <span className="invisible">gla</span>
              <span className="text-[rgb(200,30,20)]">.</span>vaz
              <span className="text-[rgb(200,30,20)]">();</span>
            </span>
          </h1>

          <div className="mt-7 font-mono text-lg text-neutral-400 leading-relaxed">
            <p>
              <span className="text-neutral-300">{"// "}</span>
              construo sistemas, sites e aplicativos
            </p>
            <p>
              <span className="text-neutral-300">{"// "}</span>
              do planejamento ao deploy
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-4">
            <div className="flex gap-3">
              <a
                href="/blog"
                className="inline-block bg-[rgb(200,30,20)] hover:bg-[rgb(165,20,12)] text-white text-sm font-bold tracking-widest uppercase px-6 py-3 transition-colors"
              >
                ✦ Leia meu blog
              </a>
              <a
                href="mailto:ext.glaucobaptista@mentesnotaveis.com.br"
                className="inline-block border border-neutral-500 hover:border-white text-neutral-300 hover:text-white text-sm font-bold tracking-widest uppercase px-6 py-3 transition-colors"
              >
                Me mande uma mensagem →
              </a>
            </div>
            <a
              href="/curriculo-glauco-vaz.pdf"
              download="Curriculo-Glauco-Vaz.pdf"
              className="inline-block text-neutral-500 hover:text-neutral-300 text-xs font-mono tracking-wide transition-colors"
            >
              ↓ baixar currículo (.pdf)
            </a>
          </div>

        </div>

        <div className="absolute bottom-6 left-8 md:left-12 lg:left-14 flex items-center gap-2 text-neutral-300 text-[11px] tracking-widest uppercase">
          <ChevronDown className="h-3 w-3 animate-bounce" />
          scroll
        </div>
      </div>

      {/* ===== RIGHT PANEL — White ===== */}
      <div className="relative flex-1 min-h-[45vh] lg:min-h-0 bg-white flex items-center justify-center overflow-hidden">
        <PatternBackground variant="light" />

        <div className="relative z-10 px-8 md:px-12 lg:px-14 max-w-xl w-full text-right">

          {/* Title */}
          <h2 className="font-black text-neutral-900 leading-[1.05] mb-1 whitespace-nowrap" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}>
            Fullstack Engineer<span className="text-[rgb(200,30,20)]">.</span>
          </h2>

          {/* Subtitle */}
          <p className="font-mono text-[13px] text-neutral-400 tracking-wide mb-10">
            desde <span className="text-neutral-700 font-bold">2016</span>
            <span className="mx-2 text-neutral-300">·</span>
            freela &amp; CLT
          </p>

          {/* Stats */}
          <div className="flex gap-8 justify-end mb-10">
            {[
              { value: "9", label: "ANOS" },
              { value: "11", label: "EMPRESAS" },
              { value: "∞", label: "COMMITS" },
            ].map(({ value, label }) => (
              <div key={label} className="text-right">
                <div className="font-black text-neutral-900 leading-none" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                  {value}<span className="text-[rgb(200,30,20)]">.</span>
                </div>
                <div className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 mt-1 uppercase">{label}</div>
              </div>
            ))}
          </div>

          {/* Stack */}
          <p className="font-black text-neutral-900 mb-10" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
            Angular
            <span className="text-[rgb(200,30,20)] mx-2">·</span>
            React
            <span className="text-[rgb(200,30,20)] mx-2">·</span>
            Node
          </p>

          {/* Quote */}
          <blockquote className="italic font-light text-neutral-600 leading-relaxed tracking-wide -ml-16 text-right" style={{ fontSize: "clamp(0.82rem, 1.4vw, 1.1rem)" }}>
            Acredito que programação seja a arte de transformar pensamentos em realidade<span className="text-[rgb(200,30,20)]">.</span><br />
            é o que eu acho<span className="text-[rgb(200,30,20)]">.</span>
          </blockquote>

        </div>
      </div>
    </div>
  )
}
