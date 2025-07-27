import { Mail, Linkedin, MapPin, Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="sobre" className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-foreground">Glauco Vaz</h1>

              <div className="flex items-center gap-4 text-muted-foreground">
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

            <div className="space-y-6">
              <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
                Eu construo sistemas. Possuo 9 anos de experiência desenvolvendo diferentes sistemas web, atuando
                principalmente como Front-end, criando interfaces performáticas e escaláveis, e também no Back-end,
                desenvolvendo APIs.
              </p>

              <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
                Trabalho com JavaScript em conjunto com TypeScript, explorando seu ecossistema de frameworks e
                bibliotecas. Sólido conhecimento em deploys automatizados e ambientes em nuvem (AWS). Forte atuação em
                times ágeis, com foco em entrega de soluções robustas, performáticas e alinhadas ao negócio.
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-4">
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
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden bg-muted">
                <img src="/card.png" alt="Glauco Vaz"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
