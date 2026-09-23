"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Linkedin, Menu, X } from "lucide-react"

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
  const [lm, setLm] = useState<Record<string, boolean>>({})
  const [isPastHero, setIsPastHero] = useState(false)
  const [sectionIsLight, setSectionIsLight] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })
  const [transitionPage, setTransitionPage] = useState<'inicio' | 'sites' | 'blog' | null>(null)

  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const inicioRef = useRef<HTMLAnchorElement>(null)
  const sitesRef = useRef<HTMLAnchorElement>(null)
  const blogRef = useRef<HTMLAnchorElement>(null)
  const liRef = useRef<HTMLAnchorElement>(null)
  const ghRef = useRef<HTMLAnchorElement>(null)

  const currentPage = pathname.startsWith('/sites')
    ? 'sites'
    : pathname.startsWith('/blog')
      ? 'blog'
      : 'inicio'
  const activePage = transitionPage ?? currentPage

  const menuItems = [
    { href: '/sites', section: 'sites', ref: sitesRef, text: '.sites()' },
    { href: '/', section: 'inicio', ref: inicioRef, text: '.portfolio()' },
    { href: '/blog', section: 'blog', ref: blogRef, text: '.blog()' },
  ]

  useEffect(() => {
    const onTransitionStart = (event: Event) => {
      const destination = (event as CustomEvent<{ pathname: string }>).detail.pathname
      setTransitionPage(destination.startsWith('/sites') ? 'sites' : destination.startsWith('/blog') ? 'blog' : 'inicio')
    }
    const onTransitionEnd = () => setTransitionPage(null)

    window.addEventListener('route-transition:start', onTransitionStart)
    window.addEventListener('route-transition:end', onTransitionEnd)
    return () => {
      window.removeEventListener('route-transition:start', onTransitionStart)
      window.removeEventListener('route-transition:end', onTransitionEnd)
    }
  }, [])

  useEffect(() => {
    const lum = (r: number, g: number, b: number) => (0.299 * r + 0.587 * g + 0.114 * b) / 255

    const sampleHeaderBg = () => {
      const x = window.innerWidth / 2
      const y = 28
      for (const el of document.elementsFromPoint(x, y)) {
        if (headerRef.current?.contains(el) || el === headerRef.current) continue
        if (el === document.documentElement || el === document.body) continue
        const bg = window.getComputedStyle(el).backgroundColor
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
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

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    let raf: number
    let last = 0

    const lum = (r: number, g: number, b: number) => (0.299 * r + 0.587 * g + 0.114 * b) / 255

    const sample = (ref: React.RefObject<Element | null>): boolean | null => {
      if (!ref.current) return null
      const rect = ref.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      for (const el of document.elementsFromPoint(x, y)) {
        if (headerRef.current?.contains(el)) continue
        const bg = window.getComputedStyle(el).backgroundColor
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (!m) continue
        const alpha = bg.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)/)
        if (alpha && parseFloat(alpha[1]) < 0.05) continue
        return lum(+m[1], +m[2], +m[3]) > 0.5
      }
      return null
    }

    const refs: [string, React.RefObject<Element | null>][] = [
      ['logo', logoRef],
      ['inicio', inicioRef],
      ['sites', sitesRef],
      ['blog', blogRef],
      ['li', liRef],
      ['gh', ghRef],
    ]

    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop)
      if (ts - last < 200) return
      last = ts
      const next: Record<string, boolean> = {}
      for (const [key, ref] of refs) {
        const value = sample(ref)
        if (value !== null) next[key] = value
      }
      setLm((previous) => {
        const changed = refs.some(([key]) => next[key] !== undefined && next[key] !== previous[key])
        return changed ? { ...previous, ...next } : previous
      })
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [isPastHero, pathname])

  useEffect(() => {
    const pageMap: Record<string, React.RefObject<HTMLAnchorElement | null>> = {
      inicio: inicioRef,
      sites: sitesRef,
      blog: blogRef,
    }

    const updateIndicator = () => {
      const ref = pageMap[activePage]
      if (!ref?.current || !navRef.current) {
        setIndicator((state) => ({ ...state, opacity: 0 }))
        return
      }
      const navRect = navRef.current.getBoundingClientRect()
      const itemRect = ref.current.getBoundingClientRect()
      setIndicator({ left: itemRect.left - navRect.left, width: itemRect.width, opacity: 1 })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activePage])

  const cancelRefs = useRef<Map<string, () => void>>(new Map())

  const handleHover = (key: string, el: HTMLElement | null, text: string) => {
    if (!el) return
    cancelRefs.current.get(key)?.()
    const cancel = scramble(el, text)
    cancelRefs.current.set(key, cancel)
  }

  const c = isPastHero && sectionIsLight
    ? 'text-black/70 hover:text-black/90'
    : 'text-white/80 hover:text-white/95'
  const cFull = isPastHero && sectionIsLight ? 'text-black/90' : 'text-white/95'
  const indicatorColor = isPastHero
    ? sectionIsLight ? 'bg-[#8f211b]' : 'bg-red-400'
    : 'bg-white'

  const headerBg = isPastHero
    ? sectionIsLight
      ? { background: '#faf9f7' }
      : { background: '#111111' }
    : { mixBlendMode: 'difference' as const }

  return (
    <>
      <header
        ref={headerRef}
        className='fixed left-0 right-0 top-0 z-[9999] transition-all duration-300'
        style={headerBg}
      >
        <div className='relative flex h-14 items-center px-10 md:px-16'>
          <Link href='/' onMouseEnter={() => handleHover('logo', logoRef.current, 'glauco.vaz();')}>
            <span ref={logoRef} className={`text-sm font-light tracking-tight ${cFull}`}>glauco.vaz();</span>
          </Link>

          <nav ref={navRef} className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 pb-px md:flex'>
            <span
              className={`pointer-events-none absolute -bottom-px h-[2px] ${indicatorColor}`}
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
                transition: 'left 680ms cubic-bezier(0.4, 0, 0.2, 1) 60ms, width 680ms cubic-bezier(0.4, 0, 0.2, 1) 60ms, opacity 200ms ease-out',
              }}
            />
            {menuItems.map((item) => {
              const isActive = activePage === item.section
              return (
                <Link
                  key={item.href}
                  ref={item.ref}
                  href={item.href}
                  onMouseEnter={() => handleHover(item.section, item.ref.current, item.text)}
                  className={`whitespace-nowrap text-[13px] font-light tracking-wide transition-colors duration-200 ${
                    isActive ? cFull : c
                  }`}
                >{item.text}</Link>
              )
            })}
          </nav>

          <button
            className={`ml-auto flex h-8 w-8 items-center justify-center md:hidden ${c}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Abrir menu'
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
          </button>
        </div>
      </header>

      <div className='fixed right-0 top-0 z-[10000] hidden h-14 items-center gap-3 px-10 md:flex md:px-16'>
        <a
          ref={liRef}
          href='https://linkedin.com/in/glaucovaz'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='LinkedIn'
          className={`flex h-11 w-11 items-center justify-center ${
            lm.li ? 'text-black/60 hover:text-black/90' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <Linkedin className='h-4 w-4' />
        </a>
        <a
          ref={ghRef}
          href='https://github.com/vazglauco'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub'
          className={`flex h-11 w-11 items-center justify-center ${
            lm.gh ? 'text-black/60 hover:text-black/90' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <Github className='h-4 w-4' />
        </a>
      </div>

      {isMenuOpen && (
        <div className='fixed left-0 right-0 top-14 z-[9998] border-b border-black/8 bg-white px-10 py-5 md:hidden'>
          <nav className='flex flex-col gap-1'>
            {menuItems.map((item) => {
              const isActive = activePage === item.section
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b py-2.5 text-sm font-light tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'border-black/20 text-black/85'
                      : 'border-transparent text-black/45 hover:text-black/70'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.text}
                </Link>
              )
            })}
          </nav>
          <div className='mt-4 flex gap-4 border-t border-black/8 pt-4'>
            <a
              href='https://linkedin.com/in/glaucovaz'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-xs text-black/45 transition-colors hover:text-black/70'
            >
              <Linkedin className='h-3.5 w-3.5' /> LinkedIn
            </a>
            <a
              href='https://github.com/vazglauco'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-xs text-black/45 transition-colors hover:text-black/70'
            >
              <Github className='h-3.5 w-3.5' /> GitHub
            </a>
          </div>
        </div>
      )}
    </>
  )
}
