"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Linkedin, Github } from "lucide-react"
import { gsap } from "gsap"

const POOL = '!<>-_/[]{}=+*^?#@$%~'

function scramble(el: HTMLElement, text: string, onDone?: () => void, steps = 10, ms = 60): () => void {
  let step = 0

  const id = setInterval(() => {
    const progress = step / steps
    el.textContent = text
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (i / text.length < progress) return char
        return POOL[Math.floor(Math.random() * POOL.length)]
      })
      .join('')

    step++
    if (step > steps) {
      el.textContent = text
      clearInterval(id)
      onDone?.()
    }
  }, ms)

  return () => {
    clearInterval(id)
    el.textContent = text
  }
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [lm, setLm] = useState<Record<string, boolean>>({})
  const [isPastHero, setIsPastHero] = useState(false)
  const [sectionIsLight, setSectionIsLight] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  const pathname   = usePathname()
  const headerRef  = useRef<HTMLElement>(null)
  const navRef     = useRef<HTMLElement>(null)
  const logoRef    = useRef<HTMLSpanElement>(null)
  const inicioRef   = useRef<HTMLAnchorElement>(null)
  const aboutRef    = useRef<HTMLAnchorElement>(null)
  const servRef     = useRef<HTMLAnchorElement>(null)
  const projRef     = useRef<HTMLAnchorElement>(null)
  const expRef      = useRef<HTMLAnchorElement>(null)
  const blogRef     = useRef<HTMLAnchorElement>(null)
  const contatoRef  = useRef<HTMLAnchorElement>(null)
  const liRef      = useRef<HTMLAnchorElement>(null)
  const ghRef      = useRef<HTMLAnchorElement>(null)

  // Detect scroll past hero and sample background color behind header center
  useEffect(() => {
    const lum = (r: number, g: number, b: number) => (0.299*r + 0.587*g + 0.114*b) / 255

    const sampleHeaderBg = () => {
      const x = window.innerWidth / 2
      const y = 28
      for (const el of document.elementsFromPoint(x, y)) {
        if (headerRef.current?.contains(el) || el === headerRef.current) continue
        if (el === document.documentElement || el === document.body) continue
        const bg = window.getComputedStyle(el).backgroundColor
        const m  = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (!m) continue
        const alpha = bg.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)/)
        if (alpha && parseFloat(alpha[1]) < 0.05) continue
        setSectionIsLight(lum(+m[1], +m[2], +m[3]) > 0.5)
        return
      }
    }

    const onScroll = () => {
      const heroEl = document.querySelector('[data-hero]') as HTMLElement | null
      const threshold = heroEl ? heroEl.offsetHeight * 0.8 : window.innerHeight * 0.8
      setIsPastHero(window.scrollY > threshold)
      sampleHeaderBg()
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Active section
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 100
      for (const id of ["inicio", "sobre", "skills", "projetos", "experiencia", "blog", "contato"]) {
        const el = document.getElementById(id)
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Per-element background luminance detection
  useEffect(() => {
    let raf: number
    let last = 0

    const lum = (r: number, g: number, b: number) => (0.299*r + 0.587*g + 0.114*b) / 255

    const sample = (ref: React.RefObject<Element | null>): boolean | null => {
      if (!ref.current) return null
      const rect = ref.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top  + rect.height / 2
      for (const el of document.elementsFromPoint(x, y)) {
        if (headerRef.current?.contains(el)) continue
        const bg = window.getComputedStyle(el).backgroundColor
        const m  = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (!m) continue
        const alpha = bg.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)/)
        if (alpha && parseFloat(alpha[1]) < 0.05) continue
        return lum(+m[1], +m[2], +m[3]) > 0.5
      }
      return null
    }

    const refs: [string, React.RefObject<Element | null>][] = [
      ["logo",    logoRef    as React.RefObject<Element | null>],
      ["inicio",  inicioRef  as React.RefObject<Element | null>],
      ["sobre",   aboutRef   as React.RefObject<Element | null>],
      ["serv",    servRef    as React.RefObject<Element | null>],
      ["proj",    projRef    as React.RefObject<Element | null>],
      ["exp",     expRef     as React.RefObject<Element | null>],
      ["blog",    blogRef    as React.RefObject<Element | null>],
      ["contato", contatoRef as React.RefObject<Element | null>],
      ["li",      liRef      as React.RefObject<Element | null>],
      ["gh",      ghRef      as React.RefObject<Element | null>],
    ]

    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop)
      if (ts - last < 80) return
      last = ts
      const next: Record<string, boolean> = {}
      for (const [k, r] of refs) {
        const v = sample(r)
        if (v !== null) next[k] = v
      }
      setLm(prev => {
        const changed = refs.some(([k]) => next[k] !== undefined && next[k] !== prev[k])
        return changed ? { ...prev, ...next } : prev
      })
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Entrance — scramble (same effect as hover, fast stagger)
  useEffect(() => {
    const items = [
      { ref: logoRef,    text: "glauco.vaz();" },
      { ref: inicioRef,  text: ".inicio()"      },
      { ref: aboutRef,   text: ".sobre()"       },
      { ref: servRef,    text: ".serviços()"    },
      { ref: projRef,    text: ".projetos()"    },
      { ref: expRef,     text: ".experiência()" },
      { ref: contatoRef, text: ".contato()"     },
      { ref: blogRef,    text: pathname.startsWith('/blog') ? ".portfolio()" : ".blog()" },
    ]

    // Pre-set text so widths are reserved — no layout shift as items appear
    items.forEach(({ ref, text }) => { if (ref.current) ref.current.textContent = text })

    const allEls = [logoRef, inicioRef, aboutRef, servRef, projRef, expRef, blogRef, contatoRef, liRef, ghRef]
      .map(r => r.current)
    allEls.forEach(el => { if (el) el.style.opacity = '0' })

    const headerTween = gsap.fromTo(headerRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power3.out", onComplete: () => runNext(0) }
    )

    const cleanups: (() => void)[] = [() => headerTween.kill()]
    let cancelled = false

    const STEPS = 8, MS = 32
    const OVERLAP = 140

    const runNext = (index: number) => {
      if (cancelled) return
      if (index >= items.length) {
        const socialEls = [liRef.current, ghRef.current].filter(Boolean) as HTMLElement[]
        gsap.to(socialEls, { opacity: 1, duration: 0.3, stagger: 0.1 })
        return
      }
      const { ref, text } = items[index]
      const el = ref.current as HTMLElement | null
      if (!el) { runNext(index + 1); return }
      el.style.opacity = '1'
      const cancel = scramble(el, text, undefined, STEPS, MS)
      cleanups.push(cancel)
      const tid = setTimeout(() => runNext(index + 1), OVERLAP)
      cleanups.push(() => clearTimeout(tid))
    }

    cleanups.push(() => { cancelled = true })

    return () => cleanups.forEach(c => c())
  }, [pathname])

  // Sliding indicator
  useEffect(() => {
    const sectionMap: Record<string, React.RefObject<HTMLAnchorElement | null>> = {
      inicio: inicioRef,
      sobre: aboutRef,
      skills: servRef,
      projetos: projRef,
      experiencia: expRef,
      contato: contatoRef,
    }
    const ref = sectionMap[activeSection]
    if (!ref?.current || !navRef.current) {
      setIndicator(s => ({ ...s, opacity: 0 }))
      return
    }
    const navRect = navRef.current.getBoundingClientRect()
    const itemRect = ref.current.getBoundingClientRect()
    setIndicator({ left: itemRect.left - navRect.left, width: itemRect.width, opacity: 1 })
  }, [activeSection])

  const menuItems = [
    { href: "#inicio",      ref: inicioRef,  text: ".inicio()"      },
    { href: "#sobre",       ref: aboutRef,   text: ".sobre()"       },
    { href: "#skills",      ref: servRef,    text: ".serviços()"    },
    { href: "#projetos",    ref: projRef,    text: ".projetos()"    },
    { href: "#experiencia", ref: expRef,     text: ".experiência()" },
    { href: "#contato",     ref: contatoRef, text: ".contato()"     },
  ]

  const cancelRefs = useRef<Map<string, () => void>>(new Map())

  const handleHover = (key: string, el: HTMLElement | null, text: string) => {
    if (!el) return
    cancelRefs.current.get(key)?.()
    const cancel = scramble(el, text)
    cancelRefs.current.set(key, cancel)
  }

  const c              = isPastHero && sectionIsLight
    ? "text-black/55 hover:text-black/85"
    : "text-white/65 hover:text-white/90"
  const cFull          = isPastHero && sectionIsLight ? "text-black/90" : "text-white/90"
  const indicatorColor = isPastHero
    ? sectionIsLight ? "bg-red-500" : "bg-red-400"
    : "bg-white"

  const headerBg = isPastHero
    ? sectionIsLight
      ? { background: "#faf9f7" }
      : { background: "#111111" }
    : { mixBlendMode: "difference" as const }

  return (
    <>
      {/* Header — logo + nav com blend mode */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300"
        style={headerBg}
      >
        <div className="relative flex items-center h-14 px-10 md:px-16">

          {/* Logo */}
          <Link href="/"
            onMouseEnter={() => handleHover("logo", logoRef.current, "glauco.vaz();")}
          >
            <span
              ref={logoRef}
              className={`font-light text-sm tracking-tight ${cFull}`}
            />
          </Link>

          {/* Nav — centralizado absoluto, escondido no blog */}
          <nav ref={navRef} className={`hidden absolute left-1/2 -translate-x-1/2 items-center gap-8 pb-px ${pathname.startsWith('/blog') ? '' : 'md:flex'}`}>
            {/* Indicador deslizante */}
            <span
              className={`absolute -bottom-px h-[2px] pointer-events-none transition-[left,width] duration-300 ease-out ${indicatorColor}`}
              style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity, transition: 'left 300ms ease-out, width 300ms ease-out, opacity 200ms ease-out' }}
            />
            {menuItems.map((item) => {
              const hrefKey = item.href.startsWith('/') ? item.href.slice(1) : item.href.slice(1)
              const key = hrefKey === "experiencia" ? "exp"
                        : hrefKey === "skills"       ? "serv"
                        : hrefKey === "projetos"     ? "proj"
                        : hrefKey
              const isActive = item.href.startsWith('/')
                ? pathname.startsWith(item.href)
                : activeSection === item.href.slice(1)
              return (
                <Link
                  key={item.href}
                  ref={item.ref}
                  href={item.href}
                  onMouseEnter={() => handleHover(key, item.ref.current, item.text)}
                  className={`text-[13px] font-light tracking-wide whitespace-nowrap transition-colors duration-200 ${
                    isActive ? cFull : c
                  }`}
                />
              )
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            className={`md:hidden ml-auto w-8 h-8 flex items-center justify-center ${c}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Blog + Socials — fixed separado, sem blend mode */}
      <div className="hidden md:flex fixed top-0 right-0 z-[10000] h-14 items-center gap-3 px-10 md:px-16">
        <Link
          ref={blogRef}
          href={pathname.startsWith('/blog') ? "/" : "/blog"}
          onMouseEnter={() => handleHover("blog", blogRef.current, pathname.startsWith('/blog') ? ".portfolio()" : ".blog()")}
          className={`text-[13px] font-light tracking-wide whitespace-nowrap border px-2.5 py-[3px] rounded-sm transition-all duration-200 group ${
            pathname.startsWith('/blog')
              ? "text-white bg-red-600 border-red-600"
              : lm["blog"]
                ? "text-red-600 border-red-600 hover:text-white hover:bg-red-600"
                : "text-white/70 border-white/30 hover:text-white hover:border-white"
          }`}
        />

        <span className={`text-[10px] select-none ${lm["li"] ? "text-black/20" : "text-white/20"}`}>|</span>

        <a ref={liRef} href="https://linkedin.com/in/glaucovaz" target="_blank"
          rel="noopener noreferrer" aria-label="LinkedIn"
          className={`w-7 h-7 flex items-center justify-center ${
            lm["li"] ? "text-black/50 hover:text-black/80" : "text-white/50 hover:text-white/80"
          }`}>
          <Linkedin className="h-3.5 w-3.5" />
        </a>
        <a ref={ghRef} href="https://github.com/vazglauco" target="_blank"
          rel="noopener noreferrer" aria-label="GitHub"
          className={`w-7 h-7 flex items-center justify-center ${
            lm["gh"] ? "text-black/50 hover:text-black/80" : "text-white/50 hover:text-white/80"
          }`}>
          <Github className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 z-[9998] bg-white border-b border-black/8 px-10 py-5">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <Link key={item.href} href={item.href}
                  className={`py-2.5 text-sm font-light tracking-wide transition-colors duration-300 border-b ${
                    isActive
                      ? "text-black/85 border-black/20"
                      : "text-black/45 border-transparent hover:text-black/70"
                  }`}
                  onClick={() => setIsMenuOpen(false)}>
                  {item.text}
                </Link>
              )
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-black/8 flex flex-col gap-3">
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}
              className={`self-start text-sm font-light tracking-wide border px-3 py-1.5 rounded-sm transition-colors ${
                pathname.startsWith('/blog')
                  ? "text-black/90 border-black/40"
                  : "text-black/50 border-black/20 hover:text-black/75 hover:border-black/40"
              }`}>
              .blog()
            </Link>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/glaucovaz" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-black/45 hover:text-black/70 transition-colors">
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a href="https://github.com/vazglauco" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-black/45 hover:text-black/70 transition-colors">
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
