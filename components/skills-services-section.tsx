'use client'

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const CATEGORIES = [
	{
		title: 'FRONTEND',
		skills: [
			{ name: 'JavaScript', icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
			{ name: 'TypeScript', icon: `${DEVICON_BASE}/typescript/typescript-original.svg` },
			{ name: 'React', icon: `${DEVICON_BASE}/react/react-original.svg` },
			{ name: 'Angular', icon: `${DEVICON_BASE}/angular/angular-original.svg` },
			{
				name: 'Next.js',
				icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
				darkInvert: true,
			},
			{ name: 'Tailwind CSS', icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
			{ name: 'HTML5', icon: `${DEVICON_BASE}/html5/html5-original.svg` },
			{ name: 'CSS3', icon: `${DEVICON_BASE}/css3/css3-original.svg` },
			{ name: 'Sass', icon: `${DEVICON_BASE}/sass/sass-original.svg` },
			{ name: 'Redux', icon: `${DEVICON_BASE}/redux/redux-original.svg` },
		],
	},
	{
		title: 'BACKEND',
		skills: [
			{ name: 'Node.js', icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
			{ name: 'NestJS', icon: `${DEVICON_BASE}/nestjs/nestjs-original.svg` },
			{
				name: 'Express.js',
				icon: `${DEVICON_BASE}/express/express-original.svg`,
				darkInvert: true,
			},
			{ name: 'GraphQL', icon: `${DEVICON_BASE}/graphql/graphql-plain.svg` },
			{
				name: 'REST APIs',
				icon: `${DEVICON_BASE}/nodejs/nodejs-plain-wordmark.svg`,
				darkInvert: true,
			},
		],
	},
	{
		title: 'DATABASE',
		skills: [
			{ name: 'PostgreSQL', icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
			{ name: 'MongoDB', icon: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
			{ name: 'Redis', icon: `${DEVICON_BASE}/redis/redis-original.svg` },
			{ name: 'MySQL', icon: `${DEVICON_BASE}/mysql/mysql-original.svg` },
		],
	},
	{
		title: 'TOOLS',
		skills: [
			{ name: 'Git', icon: `${DEVICON_BASE}/git/git-original.svg` },
			{ name: 'Docker', icon: `${DEVICON_BASE}/docker/docker-original.svg` },
			{
				name: 'AWS',
				icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
				darkInvert: true,
			},
			{ name: 'Linux', icon: `${DEVICON_BASE}/linux/linux-original.svg` },
			{ name: 'Nginx', icon: `${DEVICON_BASE}/nginx/nginx-original.svg` },
			{ name: 'Webpack', icon: `${DEVICON_BASE}/webpack/webpack-original.svg` },
		],
	},
]

const SERVICES = [
	{
		number: '01',
		title: 'Desenvolvimento Full Stack',
		description:
			'Da interface ao servidor, construo soluções completas. Trabalho com stacks modernas no frontend e no backend, entregando aplicações escaláveis, mantíveis e prontas para o mundo real.',
		skills: [
			'React, Angular, Next.js',
			'Node.js, NestJS, Express',
			'REST APIs, GraphQL, WebSockets',
		],
	},
	{
		number: '02',
		title: 'Visão de Produto',
		description:
			'Entendo o negócio antes de escrever a primeira linha. Participo da definição de escopo, priorização de funcionalidades e alinhamento com stakeholders. Transformo requisitos difusos em decisões claras e entregas com propósito.',
		skills: [
			'Definição de escopo e requisitos',
			'Priorização e roadmap',
			'Alinhamento com stakeholders',
		],
	},
	{
		number: '03',
		title: 'Colaboração no Time',
		description:
			'Trabalho bem com pessoas. Organizo backlogs, participo de cerimônias ágeis, facilito discussões entre áreas e oriento outros desenvolvedores. Acredito que um time alinhado entrega mais do que qualquer talento individual.',
		skills: ['Gestão de backlog e tasks', 'Discussão entre áreas', 'Orientação e code review'],
	},
]

// Header height ≈ 5.5em (py-5 + text). Offset matches so cards stack cleanly.
const STICKY_CONFIG = [
	{ top: '20vh', mb: 'mb-[16em]' },
	{ top: 'calc(20vh + 5.5em)', mb: 'mb-[10em]' },
	{ top: 'calc(20vh + 11em)', mb: 'mb-[4em]' },
]

export function SkillsServicesSection() {
	return (
		<div
			className='skills-services-section flex flex-col lg:flex-row snap-start'
			style={{ height: 'auto', overflow: 'visible' }}
		>
			{/* LEFT — Skills — white bg — sticky on desktop */}
			<div className='lg:self-start lg:sticky lg:top-0 lg:h-screen w-full lg:w-1/2 bg-[#faf9f7] overflow-hidden flex flex-col px-8 md:px-12 lg:px-14 py-10 lg:py-12'>
				{CATEGORIES.map((cat) => (
					<div
						key={cat.title}
						className='flex flex-col gap-5 flex-1 justify-center border-t border-neutral-100 first:border-t-0 pt-4 first:pt-0'
					>
						<h3 className='text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-black tracking-tight text-neutral-400 uppercase leading-none'>
							{cat.title}
							<span className='text-neutral-800/90 font-light tracking-normal'>
								[]
							</span>
						</h3>
						<div className='grid grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-5'>
							{cat.skills.map((skill) => (
								<div
									key={skill.name}
									className='flex items-center gap-2 group cursor-default'
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={skill.icon}
										alt={skill.name}
										className={`w-7 h-7 md:w-8 md:h-8 object-contain group-hover:scale-110 transition-transform ${skill.darkInvert ? 'brightness-0' : ''}`}
									/>
									<span className='text-sm md:text-base text-neutral-500 group-hover:text-neutral-900 transition-colors'>
										{skill.name}
									</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{/* RIGHT — Services — black bg — sticky card stacking */}
			<div className='w-full lg:w-1/2 bg-[#111111] text-white'>
				{/* Header */}
				<div className='px-8 md:px-12 lg:px-14 pt-20 pb-12'>
					<div className='flex items-start gap-4 mb-5'>
						<span className='block w-[3px] h-[2.5rem] md:h-[3.5rem] bg-red-500 mt-1 rounded-full' />
						<h2 className='text-[1.8rem] md:text-[2.5rem] lg:text-[3rem] font-black tracking-tight leading-[0.9] text-white uppercase'>
							O QUE FAÇO <span className='text-neutral-600'>/</span>
						</h2>
					</div>
					<p className='text-sm text-neutral-400 leading-relaxed max-w-sm mt-8 ml-7'>
						Atuo em todas as etapas do desenvolvimento: planejamento, arquitetura,
						codificação, deploy e manutenção. E também nos momentos de definição de
						produto, onde a ideia ainda está tomando forma.
					</p>
				</div>

				{/* Sticky stacking cards */}
				<div className='flex flex-col px-8 md:px-12 lg:px-14'>
					{SERVICES.map((service, i) => {
						const config = STICKY_CONFIG[i]
						return (
							<div
								key={i}
								className={`sticky border-t border-neutral-800 bg-[#111111] ${config.mb}`}
								style={{ top: config.top }}
							>
								<div className='flex items-baseline gap-6 py-5'>
									<span className='text-xl md:text-2xl font-bold text-neutral-600 shrink-0'>
										({service.number})
									</span>
									<h3
										className='text-xl md:text-3xl lg:text-4xl font-bold italic tracking-tight'
										style={{ color: 'rgb(235 189 51)' }}
									>
										{service.title}
									</h3>
								</div>

								<div className='flex flex-col gap-6 pt-2 pb-6'>
									<p className='text-sm text-neutral-500 leading-relaxed max-w-[40ch] text-balance'>
										{service.description}
									</p>
									<div className='flex flex-col divide-y divide-neutral-800/60'>
										{service.skills.map((skill, j) => (
											<span
												key={j}
												className='flex items-start gap-4 py-3 font-bold text-amber-100/80 text-sm md:text-base'
											>
												<span className='font-mono text-xs font-medium leading-[200%] text-neutral-500'>
													0{j + 1}
												</span>
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
