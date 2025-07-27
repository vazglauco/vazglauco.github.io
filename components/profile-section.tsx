import { Code, Server, ShoppingCart } from "lucide-react"

export function ProfileSection() {
  return (
    <section id="perfil" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-4">Perfil</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Card 1 - Desenvolvedor Front-end */}
          <div className="bg-card rounded-2xl p-8 border border-border hover:bg-muted/20 transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="bg-blue-500/10 p-4 rounded-2xl flex-shrink-0">
                <Code className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light tracking-tight text-foreground mb-4">Desenvolvedor Front-end</h3>
                <ul className="space-y-2 text-muted-foreground font-light">
                  <li>• Desenvolvimento de interfaces modernas e responsivas com Angular e React</li>
                  <li>• Implementação de arquiteturas escaláveis e micro frontends</li>
                  <li>• Otimização de performance e experiência do usuário</li>
                  <li>• Integração com APIs REST e GraphQL</li>
                  <li>• Aplicação de boas práticas de desenvolvimento e clean code</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 - Desenvolvedor Full Stack */}
          <div className="bg-card rounded-2xl p-8 border border-border hover:bg-muted/20 transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="bg-green-500/10 p-4 rounded-2xl flex-shrink-0">
                <Server className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light tracking-tight text-foreground mb-4">Desenvolvedor Full Stack</h3>
                <ul className="space-y-2 text-muted-foreground font-light">
                  <li>• Desenvolvimento e manutenção de APIs com Node.js e NestJS</li>
                  <li>• Integração entre front-end e back-end com foco em performance</li>
                  <li>• Modelagem e otimização de bancos de dados relacionais e NoSQL</li>
                  <li>• Implementação de autenticação e autorização seguras</li>
                  <li>• Deploy e configuração de aplicações em ambientes cloud</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3 - Freelancer */}
          <div className="bg-card rounded-2xl p-8 border border-border hover:bg-muted/20 transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="bg-purple-500/10 p-4 rounded-2xl flex-shrink-0">
                <ShoppingCart className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light tracking-tight text-foreground mb-4">Freelancer & E-commerce</h3>
                <ul className="space-y-2 text-muted-foreground font-light">
                  <li>• Desenvolvimento de sites institucionais e landing pages</li>
                  <li>• Criação de e-commerces completos com integração de pagamento</li>
                  <li>• Consultoria técnica e planejamento de projetos digitais</li>
                  <li>• Otimização SEO e performance para melhor conversão</li>
                  <li>• Suporte técnico e manutenção de sistemas em produção</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
