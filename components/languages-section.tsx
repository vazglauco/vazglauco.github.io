import { Globe } from "lucide-react"

export function LanguagesSection() {
  const languages = [
    {
      language: "Português",
      level: "Fluente",
      percentage: 100,
      description: "Idioma nativo",
    },
    {
      language: "Inglês",
      level: "Intermediário",
      percentage: 60,
      description: "Compreende bem, escreve bem, lê bem e fala razoavelmente",
    },
  ]

  return (
    <section id="idiomas" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-4">Idiomas</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border hover:bg-muted/20 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center">
                      <Globe className="h-7 w-7 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-foreground">{lang.language}</h3>
                      <span className="text-sm font-light text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {lang.level}
                      </span>
                    </div>

                    <p className="text-sm font-light text-muted-foreground mb-6">{lang.description}</p>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-foreground h-2 rounded-full transition-all duration-500"
                        style={{ width: `${lang.percentage}%` }}
                      ></div>
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
