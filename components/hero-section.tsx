import { Mail, Linkedin, MapPin, Calendar, Phone, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="sobre" className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-foreground">Glauco Vaz</h1>

              <div className="flex items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-light">27 anos</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-light">São Paulo, SP</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                Sou desenvolvedor com 9 anos de experiência na construção de sistemas web. Atuo principalmente como
                Front-end, com foco na criação de interfaces escaláveis e de alta performance, e também tenho
                experiência no Back-end, com desenvolvimento de APIs.
              </p>

              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                Trabalho com JavaScript e TypeScript, explorando seu ecossistema de frameworks e bibliotecas. Tenho
                experiência com automação de deploys e com ambientes em nuvem, especialmente na AWS. Atuo em equipes
                ágeis, com foco na entrega de soluções eficientes e alinhadas aos objetivos do negócio.
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 font-light border-border hover:bg-muted/50 bg-transparent"
              >
                <a href="mailto:vazz.glauco@gmail.com" className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  vazz.glauco@gmail.com
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 font-light border-border hover:bg-muted/50 bg-transparent"
              >
                <a href="tel:+5511983701618" className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  (11) 98370-1618
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 font-light border-border hover:bg-muted/50 bg-transparent"
              >
                <a
                  href="https://linkedin.com/in/glaucovaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>

<<<<<<< HEAD
          {/* Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden bg-muted">
                <img src="/card.png" alt="Glauco Vaz"  />
              </div>
=======
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 font-light border-border hover:bg-muted/50 bg-transparent"
              >
                <a
                  href="https://github.com/vazglauco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
>>>>>>> 5860007d2a559b8ae8c7b85323bc7ac95c5bd874
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
