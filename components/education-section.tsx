import { GraduationCap, Calendar } from "lucide-react"

export function EducationSection() {
  const education = [
    {
      degree: "Análise e Desenvolvimento de Sistemas",
      institution: "UTFPR",
      period: "2016 - 2017",
      type: "Graduação",
    },
    {
      degree: "Ensino Médio e Técnico em Desenvolvimento de Sistemas",
      institution: "IDEIA",
      period: "2013 - 2015",
      type: "Ensino Técnico",
    },
  ]

  return (
    <section id="formacao" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-4">Formação Acadêmica</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:bg-muted/20 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center">
                      <GraduationCap className="h-7 w-7 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span className="font-light">{edu.period}</span>
                    </div>

                    <h3 className="text-lg font-medium text-foreground mb-2 leading-tight">{edu.degree}</h3>

                    <p className="text-muted-foreground font-light mb-4">{edu.institution}</p>

                    <span className="inline-block bg-muted text-muted-foreground text-sm px-4 py-2 rounded-full font-light">
                      {edu.type}
                    </span>
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
