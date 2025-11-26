import { Mail, Phone, MapPin, MessageCircle, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const whatsappMessage = encodeURIComponent(
    "Olá Glauco! Vi seu portfólio e gostaria de conversar sobre oportunidades.",
  )
  const whatsappUrl = `https://wa.me/5511983701618?text=${whatsappMessage}`

  return (
    <section id="contato" className="relative w-screen h-screen overflow-hidden bg-background flex items-center justify-center snap-start snap-always">
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="space-y-12 text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-8">
            contato<span className="text-highlight">.</span>fale_comigo<span className="text-highlight">()</span>
          </h2>

          <div className="max-w-4xl">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <a
                href="mailto:vazz.glauco@gmail.com"
                className="flex flex-col gap-2 p-4 rounded-xl hover:bg-muted/20 transition-colors group"
              >
                <Mail className="h-5 w-5 text-highlight mb-1" />
                <p className="text-xs text-muted-foreground font-light">Email</p>
                <p className="text-sm text-foreground font-light group-hover:text-highlight transition-colors">
                  vazz.glauco@gmail.com
                </p>
              </a>

              <a
                href="tel:+5511983701618"
                className="flex flex-col gap-2 p-4 rounded-xl hover:bg-muted/20 transition-colors group"
              >
                <Phone className="h-5 w-5 text-highlight mb-1" />
                <p className="text-xs text-muted-foreground font-light">Telefone</p>
                <p className="text-sm text-foreground font-light group-hover:text-highlight transition-colors">
                  (11) 98370-1618
                </p>
              </a>

              <div className="flex flex-col gap-2 p-4 rounded-xl">
                <MapPin className="h-5 w-5 text-highlight mb-1" />
                <p className="text-xs text-muted-foreground font-light">Localização</p>
                <p className="text-sm text-foreground font-light">São Paulo, SP, Brasil</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                asChild
                className="rounded-xl px-8 py-6 bg-green-600 hover:bg-green-700 text-white text-base font-light"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5" />
                  Conversar no WhatsApp
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-xl px-8 py-6 border-border hover:bg-muted/50 text-base font-light"
              >
                <a
                  href="/curriculo-glauco-vaz.pdf"
                  download="Curriculo-Glauco-Vaz.pdf"
                  className="flex items-center gap-3"
                >
                  <Download className="h-5 w-5" />
                  Download Currículo
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground font-light mt-8">
              Estou sempre aberto a discutir novas oportunidades e projetos interessantes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
