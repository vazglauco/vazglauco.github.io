"use client"

import { Mail, Phone, MapPin, Linkedin, Github, Download, Calendar, ExternalLink, Code, Server, Cloud, Globe, Database, GitBranch, Zap, Layers, Monitor, Smartphone } from "lucide-react"

export function SplitHome() {
  const experiences = [
    {
      period: "Dez 2024 – Jun 2025",
      company: "Innvo Labs – Porto Seguro",
      position: "Desenvolvedor Full Stack Sênior",
      seniority: "Sênior",
      description:
        "Desenvolvimento e manutenção de produtos digitais voltados à contratação de seguros.",
      skills: ["Angular", "React.js", "Node.js", "NestJS", "TypeScript"],
    },
    {
      period: "Jun 2024 – Dez 2024",
      company: "Sinqia",
      position: "Desenvolvedor Front-End Sênior",
      seniority: "Sênior",
      description:
        "Modernização de sistema legado de fundos de investimento com micro frontends.",
      skills: ["Angular", "Micro Frontends", "Webpack", "Module Federation"],
    },
    {
      period: "Fev 2022 – Fev 2024",
      company: "AgileThought – Banco Santander",
      position: "Desenvolvedor Front-End Angular",
      seniority: "Sênior",
      description:
        "Desenvolvimento de aplicações bancárias de missão crítica com foco em performance e escalabilidade.",
      skills: ["Angular 12", "Micro Frontends", "BFF", "Clean Code"],
    },
    {
      period: "Abr 2021 – Set 2021",
      company: "Poupachef",
      position: "Desenvolvedor Front-End",
      seniority: "Pleno",
      description:
        "Evolução e manutenção dos sistemas, desenvolvendo novas funcionalidades com React.js.",
      skills: ["React.js", "JavaScript", "HTML5", "CSS3"],
    },
    {
      period: "Out 2019 – Set 2020",
      company: "Conquest One – Guide Investimentos",
      position: "Desenvolvedor Full Stack",
      seniority: "Pleno",
      description:
        "Desenvolvimento de soluções para o sistema de back office da corretora.",
      skills: ["Angular 8", "Ruby on Rails", "APIs REST"],
    },
    {
      period: "Fev 2019 – Out 2019",
      company: "Indra – Banco Santander",
      position: "Engenheiro de Software – Front-End",
      seniority: "Pleno",
      description:
        "Criação de dashboard para controle de dados internos.",
      skills: ["Angular 7", "JavaScript", "UX"],
    },
    {
      period: "Jun 2018 – Jan 2019",
      company: "GFT Technologies – Serasa Experian",
      position: "Desenvolvedor Front-End",
      seniority: "Júnior",
      description:
        "Desenvolvimento em squad ágil no projeto Polis, dashboards interativos.",
      skills: ["AngularJS", "JavaScript", "Agile"],
    },
    {
      period: "Mar 2017 – Mai 2018",
      company: "Creditoo",
      position: "Analista de Sistemas Full Stack",
      seniority: "Júnior",
      description:
        "Desenvolvimento da plataforma de crédito consignado e manutenção de APIs.",
      skills: ["Angular 4", "Laravel", "PHP", "Docker"],
    },
  ]

  const skills = {
    frontend: ["JavaScript", "TypeScript", "Angular", "React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Microfrontends", "PWA"],
    backend: ["Node.js", "NestJS", "REST APIs", "GraphQL", "PostgreSQL", "MongoDB", "Redis"],
    devops: ["AWS", "Docker", "Git", "CI/CD", "Linux", "Nginx"],
  }

  const seniorityColor = (s: string) => {
    if (s === "Sênior") return "bg-green-500/10 text-green-500 border-green-500/20"
    if (s === "Pleno") return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* ===== LEFT PANEL (Fixed) ===== */}
      <aside className="lg:w-[380px] xl:w-[420px] lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:overflow-y-auto bg-card border-r border-border p-8 lg:p-10 flex flex-col">
        {/* Avatar */}
        <div className="flex flex-col items-center lg:items-start gap-6 mb-8">
          <div className="w-28 h-28 rounded-full bg-muted border-2 border-highlight/30 flex items-center justify-center text-4xl font-light text-highlight select-none">
            GV
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-2xl xl:text-3xl font-light tracking-tight text-foreground">
              Glauco<span className="text-highlight">.Vaz</span>
            </h1>
            <p className="text-sm text-highlight font-light mt-1">Software Engineer</p>
            <p className="text-xs text-muted-foreground font-light mt-0.5">Full Stack Sr. · 8+ anos</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-6" />

        {/* Contact Info */}
        <div className="space-y-3 mb-8">
          <a href="mailto:vazz.glauco@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <Mail className="h-4 w-4 text-highlight/70 group-hover:text-highlight" />
            <span className="font-light">vazz.glauco@gmail.com</span>
          </a>
          <a href="tel:+5511983701618" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <Phone className="h-4 w-4 text-highlight/70 group-hover:text-highlight" />
            <span className="font-light">(11) 98370-1618</span>
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-highlight/70" />
            <span className="font-light">São Paulo, SP, Brasil</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3 mb-8">
          <a
            href="https://linkedin.com/in/vazglauco"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-xs font-light"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/vazglauco"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-xs font-light"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-6" />

        {/* Skills Quick View */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-light">Tecnologias</h3>
          <div className="flex flex-wrap gap-1.5">
            {["Angular", "React", "Next.js", "Node.js", "NestJS", "TypeScript", "PostgreSQL", "MongoDB", "AWS", "Docker"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-light rounded-full bg-muted/50 text-muted-foreground border border-border/50 hover:border-highlight/30 hover:text-foreground transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Download CV */}
        <div className="mt-auto pt-6">
          <a
            href="/curriculo-glauco-vaz.pdf"
            download="Curriculo-Glauco-Vaz.pdf"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-highlight hover:bg-highlight/90 text-white text-sm font-light transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Currículo
          </a>
        </div>
      </aside>

      {/* ===== RIGHT PANEL (Scrollable) ===== */}
      <main className="flex-1 lg:ml-[380px] xl:ml-[420px]">
        {/* About */}
        <section className="px-8 md:px-12 lg:px-16 py-16 lg:py-20 border-b border-border">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8">
            sobre<span className="text-highlight">.</span>mim<span className="text-highlight">()</span>
          </h2>
          <div className="space-y-5 max-w-3xl">
            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              Minha trajetória na programação começa em <span className="text-highlight">2012</span>, movido pela curiosidade e pelo desejo de entender como a tecnologia funciona. Aos poucos, o hobby virou <span className="text-highlight">paixão</span>. Desde então passei noites estudando, testando ideias e criando meus primeiros projetos, e nunca mais parei de <span className="text-highlight">aprender</span> e de <span className="text-highlight">construir</span>.
            </p>
            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              Hoje atuo como desenvolvedor <span className="text-highlight">Full Stack</span> Sr., com foco em <span className="text-highlight">Angular, NestJS, Node.js e Next.js</span>. Tenho experiência em <span className="text-highlight">arquitetura de sistemas</span> e na criação de soluções completas, da concepção ao produto final. Meu foco está em unir técnica e propósito: transformar <span className="text-highlight">ideias</span> em produtos reais que geram valor, <span className="text-highlight">impacto</span> e liberdade para quem os usa.
            </p>
            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              Nos últimos anos, venho expandindo meu trabalho além do <span className="text-highlight">código</span>: explorando inteligência artificial, automações e modelos de negócio próprios. Acredito que a <span className="text-highlight">tecnologia</span> é mais do que uma ferramenta: é a <span className="text-highlight">arte</span> de transformar ideias em <span className="text-highlight">realidade</span>.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="px-8 md:px-12 lg:px-16 py-16 lg:py-20 border-b border-border">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-10">
            experiência<span className="text-highlight">.</span>profissional<span className="text-highlight">()</span>
          </h2>

          <div className="relative max-w-3xl">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-highlight bg-background z-10" />

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-muted-foreground font-light flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-light ${seniorityColor(exp.seniority)}`}>
                        {exp.seniority}
                      </span>
                    </div>

                    <h3 className="text-sm font-medium text-foreground">{exp.position}</h3>
                    <p className="text-xs text-muted-foreground font-light">{exp.company}</p>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">{exp.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-xs font-light rounded-full bg-muted/50 text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="px-8 md:px-12 lg:px-16 py-16 lg:py-20 border-b border-border bg-muted/20">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-10">
            <span className="text-highlight">.</span>skills<span className="text-highlight">()</span>
          </h2>

          <div className="max-w-3xl space-y-8">
            {/* Frontend */}
            <div>
              <h3 className="text-sm font-light text-foreground mb-3 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-highlight" />
                Front-end
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-light rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-highlight/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-sm font-light text-foreground mb-3 flex items-center gap-2">
                <Server className="h-4 w-4 text-highlight" />
                Back-end
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-light rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-highlight/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* DevOps */}
            <div>
              <h3 className="text-sm font-light text-foreground mb-3 flex items-center gap-2">
                <Cloud className="h-4 w-4 text-highlight" />
                DevOps & Infra
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.devops.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-light rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-highlight/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-8 md:px-12 lg:px-16 py-16 lg:py-20">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8">
            contato<span className="text-highlight">.</span>fale_comigo<span className="text-highlight">()</span>
          </h2>

          <div className="max-w-3xl space-y-6">
            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              Estou sempre aberto a discutir novas oportunidades e projetos interessantes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="mailto:vazz.glauco@gmail.com"
                className="flex flex-col gap-2 p-4 rounded-xl bg-card border border-border hover:border-highlight/30 transition-colors group"
              >
                <Mail className="h-4 w-4 text-highlight" />
                <p className="text-xs text-muted-foreground font-light">Email</p>
                <p className="text-xs text-foreground font-light group-hover:text-highlight transition-colors">
                  vazz.glauco@gmail.com
                </p>
              </a>

              <a
                href="tel:+5511983701618"
                className="flex flex-col gap-2 p-4 rounded-xl bg-card border border-border hover:border-highlight/30 transition-colors group"
              >
                <Phone className="h-4 w-4 text-highlight" />
                <p className="text-xs text-muted-foreground font-light">Telefone</p>
                <p className="text-xs text-foreground font-light group-hover:text-highlight transition-colors">
                  (11) 98370-1618
                </p>
              </a>

              <div className="flex flex-col gap-2 p-4 rounded-xl bg-card border border-border">
                <MapPin className="h-4 w-4 text-highlight" />
                <p className="text-xs text-muted-foreground font-light">Localização</p>
                <p className="text-xs text-foreground font-light">São Paulo, SP, Brasil</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={`https://wa.me/5511983701618?text=${encodeURIComponent("Olá Glauco! Vi seu portfólio e gostaria de conversar sobre oportunidades.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-light transition-colors"
              >
                Conversar no WhatsApp
              </a>

              <a
                href="/curriculo-glauco-vaz.pdf"
                download="Curriculo-Glauco-Vaz.pdf"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted/50 text-foreground text-sm font-light transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Currículo
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 md:px-12 lg:px-16 py-8 border-t border-border">
          <p className="text-xs text-muted-foreground font-light">
            © {new Date().getFullYear()} Glauco Vaz. Feito com Next.js & Tailwind CSS.
          </p>
        </footer>
      </main>
    </div>
  )
}
