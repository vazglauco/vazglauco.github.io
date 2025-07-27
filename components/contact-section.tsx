import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const whatsappMessage = encodeURIComponent(
    "Olá Glauco! Vi seu portfólio e gostaria de conversar sobre oportunidades.",
  )
  const whatsappUrl = `https://wa.me/5511983701618?text=${whatsappMessage}`

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-4">Entre em Contato</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="bg-card rounded-2xl p-12 border border-border text-center">
            <div className="mb-12">
              <h3 className="text-2xl font-medium text-foreground mb-8">Informações de Contato</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Email</p>
                    <a
                      href="mailto:vazz.glauco@gmail.com"
                      className="text-muted-foreground font-light hover:text-foreground transition-colors"
                    >
                      vazz.glauco@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                    <Phone className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Telefone</p>
                    <a
                      href="tel:+5511983701618"
                      className="text-muted-foreground font-light hover:text-foreground transition-colors"
                    >
                      (11) 98370-1618
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Localização</p>
                    <p className="text-muted-foreground font-light">São Paulo, SP, Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="space-y-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto">
                <MessageCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>

              <div>
                <h4 className="text-xl font-medium text-foreground mb-3">Vamos conversar?</h4>
                <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">
                  Entre em contato comigo pelo WhatsApp para discutirmos sobre oportunidades e projetos interessantes.
                </p>
              </div>

              <Button
                asChild
                className="rounded-full px-12 py-6 bg-green-600 hover:bg-green-700 text-white text-lg font-light"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5" />
                  Conversar no WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground font-light">
                Estou sempre aberto a discutir novas oportunidades e projetos interessantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
