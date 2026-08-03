'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

type Skill = { name: string; icon: string; darkInvert?: boolean }

const ALL_SKILLS: Skill[] = [
	{ name: 'JavaScript', icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
	{ name: 'TypeScript', icon: `${DEVICON_BASE}/typescript/typescript-original.svg` },
	{ name: 'React', icon: `${DEVICON_BASE}/react/react-original.svg` },
	{ name: 'Angular', icon: `${DEVICON_BASE}/angular/angular-original.svg` },
	{ name: 'Next.js', icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg`, darkInvert: true },
	{ name: 'Tailwind CSS', icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
	{ name: 'HTML5', icon: `${DEVICON_BASE}/html5/html5-original.svg` },
	{ name: 'CSS3', icon: `${DEVICON_BASE}/css3/css3-original.svg` },
	{ name: 'Node.js', icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
	{ name: 'NestJS', icon: `${DEVICON_BASE}/nestjs/nestjs-original.svg` },
	{ name: 'GraphQL', icon: `${DEVICON_BASE}/graphql/graphql-plain.svg` },
	{ name: 'PostgreSQL', icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
	{ name: 'MongoDB', icon: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
	{ name: 'Redis', icon: `${DEVICON_BASE}/redis/redis-original.svg` },
	{ name: 'MySQL', icon: `${DEVICON_BASE}/mysql/mysql-original.svg` },
	{ name: 'Git', icon: `${DEVICON_BASE}/git/git-original.svg` },
	{ name: 'Docker', icon: `${DEVICON_BASE}/docker/docker-original.svg` },
	{
		name: 'AWS',
		icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
		darkInvert: true,
	},
]

const tripled = [...ALL_SKILLS, ...ALL_SKILLS, ...ALL_SKILLS]

const ANIMATION = 'skm-left 90s linear infinite'

function Strip({ textColor, darkIcons, iconsOnly }: { textColor: string; darkIcons: boolean; iconsOnly?: boolean }) {
	return (
		<div
			className='flex items-center py-4'
			style={{ width: 'max-content', animation: ANIMATION, gap: iconsOnly ? '1.5rem' : '2.5rem' }}
		>
			{tripled.map((skill, i) => (
				<div key={i} className='flex items-center gap-2.5 shrink-0'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={skill.icon}
						alt={skill.name}
						className='w-8 h-8 object-contain'
						style={darkIcons && skill.darkInvert ? { filter: 'brightness(0) invert(1)' } : undefined}
					/>
					{!iconsOnly && (
						<>
							<span className='text-[0.72rem] font-mono whitespace-nowrap' style={{ color: textColor }}>
								{skill.name}
							</span>
							<span style={{ color: textColor, marginLeft: '1.5rem' }}>·</span>
						</>
					)}
				</div>
			))}
		</div>
	)
}

export function SkillsMarquee() {
	const wrapRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = wrapRef.current
		if (!el) return
		const t = gsap.to(el, { opacity: 1, duration: 2.5, ease: 'power1.out', delay: 4.0 })
		return () => { t.kill() }
	}, [])

	return (
		<div ref={wrapRef} style={{ opacity: 0 }}>
			<style>{`
				@keyframes skm-left {
					from { transform: translateX(0); }
					to   { transform: translateX(-33.333%); }
				}
				@keyframes skm-right {
					from { transform: translateX(-33.333%); }
					to   { transform: translateX(0); }
				}
			`}</style>

			{/* Mobile — 2 linhas, sentidos opostos */}
			<div className='md:hidden flex flex-col'>
				{/* Linha 1 — light, esquerda */}
				<div className='overflow-hidden bg-[#faf9f7]'>
					<Strip textColor='#111111' darkIcons={false} iconsOnly />
				</div>
				{/* Linha 2 — light, direita */}
				<div className='overflow-hidden bg-[#faf9f7]'>
					<div
						className='flex items-center py-4'
						style={{ width: 'max-content', animation: 'skm-right 90s linear infinite', gap: '1.5rem' }}
					>
						{[...ALL_SKILLS, ...ALL_SKILLS, ...ALL_SKILLS].map((skill, i) => (
							<div key={i} className='flex items-center gap-2.5 shrink-0'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={skill.icon}
									alt={skill.name}
									className='w-8 h-8 object-contain'
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Desktop — split half dark / half light, colado no bottom do hero */}
			<div
				className='hidden md:grid md:absolute md:bottom-0 md:left-0 md:right-0 z-20'
			>
				<div
					className='overflow-hidden'
					style={{ gridArea: '1/1', background: '#111111', clipPath: 'inset(0 50vw 0 0)' }}
				>
					<Strip textColor='white' darkIcons={true} />
				</div>
				<div
					className='overflow-hidden'
					style={{ gridArea: '1/1', background: '#faf9f7', clipPath: 'inset(0 0 0 50vw)' }}
				>
					<Strip textColor='#111111' darkIcons={false} />
				</div>
			</div>
		</div>
	)
}
