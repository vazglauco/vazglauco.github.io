"use client"

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

const CATEGORIES = [
  {
    title: "FRONTEND",
    skills: [
      { name: "JavaScript", icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
      { name: "TypeScript", icon: `${DEVICON_BASE}/typescript/typescript-original.svg` },
      { name: "React", icon: `${DEVICON_BASE}/react/react-original.svg` },
      { name: "Angular", icon: `${DEVICON_BASE}/angular/angular-original.svg` },
      { name: "Next.js", icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg`, invert: true },
      { name: "Tailwind CSS", icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
      { name: "HTML5", icon: `${DEVICON_BASE}/html5/html5-original.svg` },
      { name: "CSS3", icon: `${DEVICON_BASE}/css3/css3-original.svg` },
      { name: "Sass", icon: `${DEVICON_BASE}/sass/sass-original.svg` },
      { name: "Redux", icon: `${DEVICON_BASE}/redux/redux-original.svg` },
    ],
  },
  {
    title: "BACKEND",
    skills: [
      { name: "Node.js", icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
      { name: "NestJS", icon: `${DEVICON_BASE}/nestjs/nestjs-original.svg` },
      { name: "Express.js", icon: `${DEVICON_BASE}/express/express-original.svg`, invert: true },
      { name: "GraphQL", icon: `${DEVICON_BASE}/graphql/graphql-plain.svg` },
      { name: "REST APIs", icon: `${DEVICON_BASE}/nodejs/nodejs-plain-wordmark.svg`, invert: true },
    ],
  },
  {
    title: "DATABASE",
    skills: [
      { name: "PostgreSQL", icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", icon: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
      { name: "Redis", icon: `${DEVICON_BASE}/redis/redis-original.svg` },
      { name: "MySQL", icon: `${DEVICON_BASE}/mysql/mysql-original.svg` },
    ],
  },
  {
    title: "TOOLS",
    skills: [
      { name: "Git", icon: `${DEVICON_BASE}/git/git-original.svg` },
      { name: "Docker", icon: `${DEVICON_BASE}/docker/docker-original.svg` },
      { name: "AWS", icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true },
      { name: "Linux", icon: `${DEVICON_BASE}/linux/linux-original.svg` },
      { name: "Nginx", icon: `${DEVICON_BASE}/nginx/nginx-original.svg` },
      { name: "Webpack", icon: `${DEVICON_BASE}/webpack/webpack-original.svg` },
    ],
  },
]

export function SkillsPanel() {
  return (
    <div className="w-full min-h-screen bg-[#111111] relative py-20 px-8 md:px-16 lg:px-24">
      {/* Decorative dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-neutral-700/60"
            style={{
              left: `${10 + (i * 37) % 80}%`,
              top: `${5 + (i * 53) % 90}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16 md:space-y-20">
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            {/* Category title */}
            <h3 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tight text-neutral-700/50 uppercase leading-none shrink-0 md:w-[280px] lg:w-[320px]">
              {cat.title}
            </h3>

            {/* Skills grid */}
            <div className="flex flex-wrap gap-x-10 gap-y-5 md:gap-x-14 md:gap-y-6 pt-1 md:pt-3">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-3 group cursor-default"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform ${skill.invert ? "invert" : ""}`}
                  />
                  <span className="text-base md:text-lg lg:text-xl text-neutral-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
