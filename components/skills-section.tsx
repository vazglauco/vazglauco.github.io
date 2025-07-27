import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Cloud, Server, Globe, Database, GitBranch, Zap, Layers, Monitor, Smartphone } from "lucide-react"

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
      { name: "Ruby on Rails", icon: Server },
      { name: "Laravel", icon: Server },
      { name: "PHP", icon: Code },
      { name: "REST APIs", icon: Database },
      { name: "GraphQL", icon: Database },
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Redis", icon: Database },
    ],
    devops: [
      { name: "AWS", icon: Cloud },
      { name: "Azure", icon: Cloud },
      { name: "Docker", icon: Database },
      { name: "Git", icon: GitBranch },
      { name: "CI/CD", icon: Layers },
      { name: "Linux", icon: Server },
      { name: "Nginx", icon: Server },
      { name: "Webpack", icon: Layers },
      { name: "Jest", icon: Code },
      { name: "Cypress", icon: Monitor },
    ],
  }

  const SkillCard = ({ skill }: { skill: { name: string; icon: any } }) => {
    const IconComponent = skill.icon

    return (
      <div className="group relative bg-card border border-border rounded-2xl p-6 hover:bg-muted/50 transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors bg-muted group-hover:bg-muted-foreground/10">
              <IconComponent className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium transition-colors text-foreground group-hover:text-foreground">
              {skill.name}
            </h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-4">Skills</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-muted/50 border border-border rounded-2xl p-1">
              <TabsTrigger
                value="frontend"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-light"
              >
                <Monitor className="h-4 w-4" />
                Front-end
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-light"
              >
                <Server className="h-4 w-4" />
                Back-end
              </TabsTrigger>
              <TabsTrigger
                value="devops"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-light"
              >
                <Cloud className="h-4 w-4" />
                DevOps
              </TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skillCategories.frontend.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backend" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skillCategories.backend.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="devops" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
