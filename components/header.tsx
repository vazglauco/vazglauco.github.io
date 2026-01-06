"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLoading } from "@/contexts/LoadingContext"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { phase } = useLoading()
  const [hasAnimated, setHasAnimated] = useState(false)

  // Refs for animated elements
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const aboutRef = useRef<HTMLAnchorElement>(null)
  const skillsRef = useRef<HTMLAnchorElement>(null)
  const experienciaRef = useRef<HTMLAnchorElement>(null)
  const formacaoRef = useRef<HTMLAnchorElement>(null)
  const contatoRef = useRef<HTMLAnchorElement>(null)
  const linkedinRef = useRef<HTMLAnchorElement>(null)
  const githubRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["sobre", "skills", "perfil", "experiencia", "formacao", "idiomas", "contato"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Header animation on typing phase
  useEffect(() => {
    console.log("Header phase:", phase, "hasAnimated:", hasAnimated)
    if (phase !== "typing" || hasAnimated) return

    console.log("Starting header animation!")
    const tl = gsap.timeline()

    // Fade in header first
    if (headerRef.current) {
      tl.to(headerRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    // Hide all text elements initially
    const allElements = [
      logoRef.current,
      aboutRef.current,
      skillsRef.current,
      experienciaRef.current,
      formacaoRef.current,
      contatoRef.current,
      linkedinRef.current,
      githubRef.current
    ]

    gsap.set(allElements, { opacity: 0 })

    // Animate logo with typing effect
    tl.to(logoRef.current, {
      duration: 0.8,
      text: { value: "glauco.vaz();" },
      opacity: 1,
      ease: "none"
    })

    // Animate menu items with typing effect (char by char in sequence)
    tl.to(
      aboutRef.current,
      {
        duration: 0.4,
        text: { value: ".sobre()" },
        opacity: 1,
        ease: "none"
      },
      "+=0.1"
    )

    tl.to(
      skillsRef.current,
      {
        duration: 0.4,
        text: { value: ".skills()" },
        opacity: 1,
        ease: "none"
      },
      "+=0.1"
    )

    tl.to(
      experienciaRef.current,
      {
        duration: 0.5,
        text: { value: ".experiência()" },
        opacity: 1,
        ease: "none"
      },
      "+=0.1"
    )

    tl.to(
      formacaoRef.current,
      {
        duration: 0.5,
        text: { value: ".formação()" },
        opacity: 1,
        ease: "none"
      },
      "+=0.1"
    )

    tl.to(
      contatoRef.current,
      {
        duration: 0.4,
        text: { value: ".contato()" },
        opacity: 1,
        ease: "none"
      },
      "+=0.1"
    )

    // Animate social icons (fade-in)
    tl.to(
      [linkedinRef.current, githubRef.current],
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      },
      "+=0.1"
    )

    setHasAnimated(true)

    return () => tl.kill()
  }, [phase, hasAnimated])

  const menuItems = [
    { href: "#sobre", label: ".sobre()", ref: aboutRef },
    { href: "#skills", label: ".skills()", ref: skillsRef },
    { href: "#experiencia", label: ".experiência()", ref: experienciaRef },
    { href: "#formacao", label: ".formação()", ref: formacaoRef },
    { href: "#contato", label: ".contato()", ref: contatoRef },
  ]

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50"
      style={{ opacity: phase === "initial" || phase === "zoom-in" || phase === "spin" || phase === "move-to-position" || phase === "settling" ? 0 : undefined }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with typing */}
          <Link href="#sobre" className="font-light text-lg tracking-tight">
            <span ref={logoRef} className="text-foreground">
              {/* Empty, will be filled by GSAP */}
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                ref={item.ref}
                href={item.href}
                className={`text-sm font-light tracking-wide transition-colors duration-200 ${
                  activeSection === item.href.slice(1)
                    ? "text-highlight"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* Empty, will be filled by GSAP */}
              </Link>
            ))}
          </nav>

          {/* Right side - Social Icons */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                size="icon"
                className="w-9 h-9 rounded-full bg-highlight hover:bg-highlight/90 text-white opacity-0"
                ref={linkedinRef as any}
              >
                <a
                  href="https://linkedin.com/in/glaucovaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="icon"
                className="w-9 h-9 rounded-full bg-highlight hover:bg-highlight/90 text-white opacity-0"
                ref={githubRef as any}
              >
                <a
                  href="https://github.com/vazglauco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-9 h-9 rounded-full hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t-0">
            <nav className="flex flex-col space-y-4 mb-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-light tracking-wide transition-colors duration-200 ${
                    activeSection === item.href.slice(1)
                      ? "text-highlight"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Social Icons */}
            <div className="flex items-center gap-3 px-4">
              <Button
                asChild
                size="icon"
                className="w-9 h-9 rounded-full bg-highlight hover:bg-highlight/90 text-white"
              >
                <a
                  href="https://linkedin.com/in/glaucovaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="icon"
                className="w-9 h-9 rounded-full bg-highlight hover:bg-highlight/90 text-white"
              >
                <a
                  href="https://github.com/vazglauco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
