"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

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

  const menuItems = [
    { href: "#sobre", label: ".sobre()" },
    { href: "#skills", label: ".skills()" },
    { href: "#experiencia", label: ".experiência()" },
    { href: "#formacao", label: ".formação()" },
    { href: "#contato", label: ".contato()" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#sobre" className="font-light text-lg tracking-tight">
            <span className="text-foreground">glauco</span>
            <span className="text-highlight">.</span>
            <span className="text-highlight">vaz</span>
            <span className="text-highlight">{"();"}</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-light tracking-wide transition-colors duration-200 ${
                  activeSection === item.href.slice(1)
                    ? "text-highlight"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
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
