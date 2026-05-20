"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  title: string
  excerpt: string
  date: string
  tag: string
  url: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: "Micro Frontends na Prática",
    excerpt:
      "Como implementar micro frontends com Module Federation e Webpack 5, compartilhando dependências e mantendo autonomia entre times.",
    date: "2026",
    tag: "Arquitetura",
    url: "#",
  },
  {
    title: "GSAP + Next.js: Animações de Scroll",
    excerpt:
      "Um guia prático sobre como criar animações de scroll fluídas com GSAP ScrollTrigger em projetos Next.js com App Router.",
    date: "2026",
    tag: "Frontend",
    url: "#",
  },
  {
    title: "NestJS: Arquitetura Limpa",
    excerpt:
      "Aplicando princípios de Clean Architecture em APIs NestJS para criar backends escaláveis, testáveis e de fácil manutenção.",
    date: "2025",
    tag: "Backend",
    url: "#",
  },
  {
    title: "De Dev a Empreendedor Digital",
    excerpt:
      "Lições aprendidas na transição de desenvolvedor para criador de produtos digitais próprios. Mindset, ferramentas e estratégias.",
    date: "2025",
    tag: "Carreira",
    url: "#",
  },
]

export function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.5,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="w-full h-full bg-[#0a0a0a] flex flex-col justify-center overflow-hidden relative"
    >
      {/* Ilustração canto inferior esquerdo */}
      <div className="absolute bottom-0 left-0 w-48 md:w-64 lg:w-72 pointer-events-none select-none z-0">
        <Image
          src="/ilustra_blog.png"
          alt="Ilustração blog"
          width={400}
          height={520}
          className="object-contain w-full h-auto"
        />
      </div>
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 mb-10 md:mb-14 pt-20 md:pt-24">
        <div className="flex items-start gap-5 mb-6">
          <span className="block w-[4px] h-[3rem] md:h-[4.5rem] bg-red-500 mt-2 rounded-full" />
          <h2 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-black tracking-tight leading-[0.9] text-white uppercase">
            BLOG <span className="text-neutral-600">/</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-16 max-w-4xl ml-auto mr-8 md:mr-16">
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-amber-200/60 font-mono shrink-0 pt-1">
            (ARTIGOS)
          </span>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
            Reflexões, tutoriais e aprendizados sobre desenvolvimento,
            arquitetura e carreira em tecnologia.
          </p>
        </div>
      </div>

      {/* Blog posts list */}
      <div className="px-8 md:px-16 lg:px-24 w-full flex justify-center">
        <div className="max-w-5xl w-full flex flex-col">
          {BLOG_POSTS.map((post, i) => (
            <a
              key={i}
              href={post.url}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
              className="group flex items-center gap-6 md:gap-10 py-6 border-b border-neutral-800 hover:bg-neutral-900/30 transition-colors px-2 -mx-2 rounded-lg"
            >
              <span className="text-[0.6rem] font-mono text-neutral-600 tracking-[0.2em] uppercase shrink-0">
                ({String(i + 1).padStart(2, "0")})
              </span>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 flex-1 min-w-0">
                <h3 className="text-base md:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-100 transition-colors shrink-0 md:w-[45%]">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-1 flex-1 hidden md:block">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-mono text-amber-500/70 tracking-wider uppercase hidden sm:inline">
                  {post.tag}
                </span>
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
