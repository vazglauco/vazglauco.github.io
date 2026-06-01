"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Linkedin, Github } from "lucide-react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

const POOL = '!<>-_/[]{}=+*^?#@$%~'

function scramble(el: HTMLElement, text: string, onDone?: () => void): () => void {
  const steps = 10
  const ms    = 30
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

  const pathname   = usePathname()
  const headerRef  = useRef<HTMLElement>(null)
  const logoRef    = useRef<HTMLSpanElement>(null)
  const aboutRef   = useRef<HTMLAnchorElement>(null)
  const skillsRef  = useRef<HTMLAnchorElement>(null)
  const expRef     = useRef<HTMLAnchorElement>(null)
  const contatoRef = useRef<HTMLAnchorElement>(null)
  const blogRef    = useRef<HTMLAnchorElement>(null)
  const liRef      = useRef<HTMLAnchorElement>(null)
  const ghRef      = useRef<HTMLAnchorElement>(null)

  // Active section
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 100
      for (const id of ["sobre", "skills", "projetos", "experiencia", "blog", "contato"]) {
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
      ["logo", logoRef as React.RefObject<Element | null>],
      ["sobre", aboutRef as React.RefObject<Element | null>],
      ["skills", skillsRef as React.RefObject<Element | null>],
      ["exp", expRef as React.RefObject<Element | null>],
      ["contato", contatoRef as React.RefObject<Element | null>],
      ["blog", blogRef as React.RefObject<Element | null>],
      ["li", liRef as React.RefObject<Element | null>],
      ["gh", ghRef as React.RefObject<Element | null>],
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

  // Entrance + typewriter
  useEffect(() => {
    const all = [logoRef, aboutRef, skillsRef, expRef, contatoRef, blogRef, liRef, ghRef]
      .map(r => r.current)

    gsap.set(all, { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(headerRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
    tl.to(logoRef.current,    { duration: 0.7, text: { value: "glauco.vaz();" }, opacity: 1, ease: "none" }, "-=0.1")
    tl.to(aboutRef.current,   { duration: 0.3, text: { value: ".sobre()" },       opacity: 1, ease: "none" }, "+=0.06")
    tl.to(skillsRef.current,  { duration: 0.3, text: { value: ".skills()" },      opacity: 1, ease: "none" }, "+=0.06")
    tl.to(expRef.current,     { duration: 0.4, text: { value: ".experiência()" }, opacity: 1, ease: "none" }, "+=0.06")
    tl.to(contatoRef.current, { duration: 0.3, text: { value: ".contato()" },     opacity: 1, ease: "none" }, "+=0.06")
    tl.to(blogRef.current,   { duration: 0.3, text: { value: ".blog()" },        opacity: 1, ease: "none" }, "+=0.06")
    tl.to([liRef.current, ghRef.current], { opacity: 1, duration: 0.3, stagger: 0.08 }, "+=0.06")

    return () => tl.kill()
  }, [])

  const menuItems = [
    { href: "#sobre",       ref: aboutRef,   text: ".sobre()"       },
    { href: "#skills",      ref: skillsRef,  text: ".skills()"      },
    { href: "#experiencia", ref: expRef,     text: ".experiência()" },
    { href: "#contato",     ref: contatoRef, text: ".contato()"     },
    { href: "/blog",        ref: blogRef,    text: ".blog()"        },
  ]

  const cancelRefs = useRef<Map<string, () => void>>(new Map())

  const handleHover = (key: string, el: HTMLElement | null, text: string) => {
    if (!el) return
    cancelRefs.current.get(key)?.()
    const cancel = scramble(el, text)
    cancelRefs.current.set(key, cancel)
  }

  const c        = "text-white/75 hover:text-white/95"
  const cFull    = "text-white/90"
  const activeLine = "border-b border-white/40"

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[9999]"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="flex items-center justify-between h-14 px-10 md:px-16">

          {/* Logo */}
          <Link href="/"
            onMouseEnter={() => handleHover("logo", logoRef.current, "glauco.vaz();")}
          >
            <span
              ref={logoRef}
              className={`font-light text-sm tracking-tight ${cFull}`}
            />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const hrefKey = item.href.startsWith('/') ? item.href.slice(1) : item.href.slice(1)
              const key = hrefKey === "experiencia" ? "exp"
                        : hrefKey === "formacao"    ? "form"
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
                  className={`text-xs font-light tracking-wide whitespace-nowrap pb-px ${
                    isActive
                      ? `${cFull} ${activeLine}`
                      : `${c} border-b border-transparent`
                  }`}
                />
              )
            })}
          </nav>

          {/* Socials + mobile */}
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center gap-0.5">
              <a ref={liRef} href="https://linkedin.com/in/glaucovaz" target="_blank"
                rel="noopener noreferrer" aria-label="LinkedIn"
                className={`w-7 h-7 flex items-center justify-center ${c}`}>
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a ref={ghRef} href="https://github.com/vazglauco" target="_blank"
                rel="noopener noreferrer" aria-label="GitHub"
                className={`w-7 h-7 flex items-center justify-center ${c}`}>
                <Github className="h-3.5 w-3.5" />
              </a>
            </div>

            <button
              className={`md:hidden w-8 h-8 flex items-center justify-center ${c}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

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
          <div className="flex gap-4 mt-5 pt-4 border-t border-black/8">
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
      )}
    </>
  )
}
