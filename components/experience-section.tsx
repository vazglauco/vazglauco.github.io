import { Calendar, MapPin } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      period: "Dezembro 2024 – Junho 2025",
      company: "Innvo Labs – Porto Seguro",
      position: "Desenvolvedor Full Stack Sênior",
      seniority: "Sênior",
      description:
        "Desenvolvimento e manutenção de produtos digitais voltados à contratação de seguros, atuando em diferentes frentes da stack tecnológica.",
      achievements: [
        "Manutenção de aplicações legadas em React.js",
        "Criação de SPA com Angular para novos fluxos do produto",
        "Sustentação e melhorias em APIs desenvolvidas com Node.js e NestJS",
      ],
      skills: [
        "Angular",
        "React.js",
        "Node.js",
        "NestJS",
        "TypeScript",
        "JavaScript",
        "REST APIs",
        "Arquitetura de Software",
      ],
    },
    {
      period: "Junho 2024 – Dezembro 2024",
      company: "Sinqia",
      position: "Desenvolvedor Front-End Sênior",
      seniority: "Sênior",
      description:
        "Modernização de sistema legado de fundos de investimento, entregando melhorias estruturais e visuais em arquitetura baseada em micro frontends.",
      achievements: [
        "Criação de novos layouts e interfaces de usuário",
        "Desenvolvimento de micro frontends com Webpack e Module Federation",
        "Planejamento técnico de demandas em conjunto com o time de negócio",
      ],
      skills: [
        "Angular",
        "Micro Frontends",
        "Webpack",
        "Module Federation",
        "UX/UI",
        "Git",
        "TypeScript",
        "HTML5",
        "CSS3",
      ],
    },
    {
      period: "Fevereiro 2022 - Fevereiro 2024",
      company: "AgileThought – Banco Santander",
      position: "Desenvolvedor Front-End Angular",
      seniority: "Sênior",
      description:
        "Desenvolvimento de aplicações bancárias de missão crítica, com foco em performance, escalabilidade e experiência do usuário.",
      achievements: [
        "Implementação de SPAs e micro frontends em Angular 12",
        "Colaboração no desenvolvimento de BFFs (Back-end for Front-end)",
        "Coordenação técnica de equipes, definição de padrões de arquitetura e práticas de desenvolvimento",
        "Participação estratégica na concepção de novas funcionalidades, com foco em segurança, escalabilidade e eficiência",
      ],
      skills: [
        "Angular 12",
        "Arquitetura de Software",
        "Micro Frontends",
        "Git",
        "JavaScript",
        "TypeScript",
        "Agile",
        "BFF",
        "Clean Code",
      ],
    },
    {
      period: "Abril 2021 - Setembro 2021",
      company: "Poupachef",
      position: "Desenvolvedor Front-End",
      seniority: "Pleno",
      description:
        "Evolução e manutenção dos sistemas da empresa, desenvolvendo novas funcionalidades e melhorias na interface do usuário.",
      achievements: [
        "Implementação de componentes e funcionalidades com React.js",
        "Correções e aprimoramentos contínuos da experiência do usuário",
      ],
      skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Git", "UI/UX"],
    },
    {
      period: "Outubro 2019 - Setembro 2020",
      company: "Conquest One – Guide Investimentos",
      position: "Desenvolvedor Full Stack",
      seniority: "Pleno",
      description:
        "Desenvolvimento de soluções para o sistema de back office da corretora, entregando funcionalidades técnicas de alto impacto.",
      achievements: [
        "Implementação de funcionalidades em SPA Angular 8",
        "Desenvolvimento de APIs REST em Ruby on Rails",
        "Mentoria para desenvolvedor júnior, promovendo boas práticas e integração à equipe",
      ],
      skills: ["Angular 8", "Ruby on Rails", "APIs REST", "Git", "TypeScript", "JavaScript", "Mentoria Técnica"],
    },
    {
      period: "Fevereiro 2019 - Outubro 2019",
      company: "Indra – Banco Santander",
      position: "Engenheiro de Software – Front-End",
      seniority: "Pleno",
      description:
        "Criação de dashboard para controle de dados internos, desenvolvendo WebApp completo com foco em usabilidade.",
      achievements: ["Utilização de Angular 7 e boas práticas de desenvolvimento front-end"],
      skills: ["Angular 7", "JavaScript", "HTML", "CSS", "Git", "UX"],
    },
    {
      period: "Junho 2018 - Janeiro 2019",
      company: "GFT Technologies – Serasa Experian",
      position: "Desenvolvedor Front-End",
      seniority: "Júnior",
      description:
        "Desenvolvimento em squad ágil no projeto Polis, contribuindo para funcionalidades e componentes em plataforma de insights georreferenciados.",
      achievements: ["Desenvolvimento em AngularJS de dashboards interativos"],
      skills: ["AngularJS", "JavaScript", "HTML", "CSS", "Git", "Agile", "MVVM"],
    },
    {
      period: "Março 2017 - Maio 2018",
      company: "Creditoo",
      position: "Analista de Sistemas Full Stack (JavaScript e PHP)",
      seniority: "Júnior",
      description:
        "Desenvolvimento da segunda versão do front-end da plataforma de crédito consignado e manutenção de APIs back-end.",
      achievements: [
        "Criação do front-end em Angular 4",
        "Desenvolvimento e sustentação de APIs em Laravel",
        "Uso de Docker para ambientes de desenvolvimento",
      ],
      skills: ["Angular 4", "Laravel", "PHP", "JavaScript", "REST APIs", "Docker", "Git", "Arquitetura de Software"],
    },
  ]

  return (
    <section id="experiencia" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-4">
            Experiência Profissional
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-foreground rounded-full border-4 border-background shadow-sm"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-card border border-border rounded-2xl p-8 hover:bg-muted/20 transition-all duration-300">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </div>

                    <h3 className="text-xl font-medium text-foreground mb-2 flex items-center gap-3 flex-wrap">
                      {exp.position}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-light ${
                          exp.seniority === "Sênior"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : exp.seniority === "Pleno"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                        }`}
                      >
                        {exp.seniority}
                      </span>
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="font-light">{exp.company}</span>
                    </div>

                    <p className="text-muted-foreground font-light leading-relaxed mb-6">{exp.description}</p>

                    <ul className="list-disc list-inside text-sm text-muted-foreground mb-6 space-y-2 font-light">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full font-light"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
