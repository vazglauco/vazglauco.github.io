"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Cloud, Server, Globe, Database, GitBranch, Zap, Layers, Monitor, Smartphone } from "lucide-react"
import Image from "next/image"

export function SkillsSection() {
  const skillCategories = {
    frontend: [
      { name: "JavaScript", icon: Code },
      { name: "TypeScript", icon: Code },
      { name: "Angular", icon: Zap },
      { name: "React", icon: Zap },
      { name: "Next.js", icon: Globe },
      { name: "HTML5", icon: Monitor },
      { name: "CSS3", icon: Monitor },
      { name: "Tailwind CSS", icon: Monitor },
      { name: "Microfrontends", icon: Layers },
      { name: "PWA", icon: Smartphone },
    ],
    backend: [
      { name: "Node.js", icon: Server },
      { name: "NestJS", icon: Server },
      { name: "REST APIs", icon: Database },
      { name: "GraphQL", icon: Database },
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Redis", icon: Database },
    ],
    devops: [
      { name: "AWS", icon: Cloud },
      { name: "Docker", icon: Database },
      { name: "Git", icon: GitBranch },
      { name: "CI/CD", icon: Layers },
      { name: "Linux", icon: Server },
      { name: "Nginx", icon: Server },
      { name: "Webpack", icon: Layers },
    ],
  }

  const SkillCard = ({ skill }: { skill: { name: string; icon: any } }) => {
    const IconComponent = skill.icon

    return (
      <div className="group relative bg-card border border-border rounded-xl p-4 hover:bg-muted/50 transition-all duration-300 cursor-pointer">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2 w-full">
            <span className="text-highlight text-base font-light">$</span>
            <h3 className="text-xs font-light text-foreground group-hover:text-foreground">
              {skill.name}
            </h3>
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors bg-muted/50 group-hover:bg-muted">
            <IconComponent className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="skills" className="relative w-screen h-screen overflow-hidden bg-muted/30 flex items-center justify-center snap-start snap-always">
      {/* Imagem na borda esquerda */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        <Image
          src="/FINAL_CARTA GLAUCO.png"
          alt="Glauco Vaz"
          width={384}
          height={384}
          className="object-contain opacity-30 hover:opacity-50 transition-opacity duration-500"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="space-y-12 text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-8">
            <span className="text-highlight">.</span>skills<span className="text-highlight">()</span>
          </h2>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="flex gap-6 mb-12 bg-transparent border-0 p-0 h-auto">
              <TabsTrigger
                value="frontend"
                className="bg-card border border-border px-6 py-3 rounded-xl font-light text-base text-muted-foreground data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:border-highlight/50 hover:text-foreground hover:bg-muted/30 hover:border-border/80 transition-all cursor-pointer dark:data-[state=active]:text-black"
              >
                <span className="text-highlight">.</span>frontend<span className="text-highlight">()</span>
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                className="bg-card border border-border px-6 py-3 rounded-xl font-light text-base text-muted-foreground data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:border-highlight/50 hover:text-foreground hover:bg-muted/30 hover:border-border/80 transition-all cursor-pointer dark:data-[state=active]:text-black"
              >
                <span className="text-highlight">.</span>backend<span className="text-highlight">()</span>
              </TabsTrigger>
              <TabsTrigger
                value="devops"
                className="bg-card border border-border px-6 py-3 rounded-xl font-light text-base text-muted-foreground data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:border-highlight/50 hover:text-foreground hover:bg-muted/30 hover:border-border/80 transition-all cursor-pointer dark:data-[state=active]:text-black"
              >
                <span className="text-highlight">.</span>devops<span className="text-highlight">()</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="mt-8">
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Como desenvolvedor front-end, uno arquitetura e design para criar interfaces escaláveis, funcionais e intuitivas. Busco sempre aplicar padrões sólidos de desenvolvimento, escolhendo a melhor abordagem para cada contexto. Trabalho com diferentes frameworks e metodologias, mantendo foco em performance, organização do código e testes que garantem a qualidade e a consistência das aplicações.
                <br />
                <span className="text-foreground">Transformo ideias em interfaces bem estruturadas e cheias de propósito.</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {skillCategories.frontend.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backend" className="mt-8">
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Como desenvolvedor back-end, projeto e mantenho APIs escaláveis, seguras e bem estruturadas. Trabalho com diferentes bancos de dados e padrões de arquitetura, sempre buscando eficiência, organização e fácil integração com o front-end. Tenho foco em performance, autenticação, autorização e boas práticas que garantem aplicações estáveis e prontas para crescer.
                <br />
                <span className="text-foreground">Transformo lógica e arquitetura em bases sólidas para produtos digitais.</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {skillCategories.backend.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="devops" className="mt-8">
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Como desenvolvedor com foco em DevOps, atuo na automação e entrega contínua de aplicações, garantindo estabilidade e eficiência em cada etapa do ciclo de desenvolvimento. Trabalho na integração entre código, infraestrutura e deploy, otimizando pipelines, ambientes e fluxos de versionamento.
                <br />
                <span className="text-foreground">Transformo processos complexos em operações simples, seguras e escaláveis.</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {skillCategories.devops.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
