"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, toggleTheme } = useTheme()

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
    { href: "#sobre", label: "Sobre" },
    { href: "#skills", label: "Skills" },
    { href: "#perfil", label: "Perfil" },
    { href: "#experiencia", label: "Experiência" },
    { href: "#formacao", label: "Formação" },
    { href: "#idiomas", label: "Idiomas" },
    { href: "#contato", label: "Contato" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="#sobre" className="font-medium text-xl tracking-tight text-foreground">
            Glauco Vaz
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-12">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-light tracking-wide transition-colors duration-200 ${
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-10 h-10 rounded-full hover:bg-muted">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-10 h-10 rounded-full hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-light tracking-wide transition-colors duration-200 ${
                    activeSection === item.href.slice(1)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
