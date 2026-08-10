'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

type Skill = { name: string; icon: string; darkInvert?: boolean }

const ALL_SKILLS: Skill[] = [
	{ name: 'JavaScript', icon: '/icons/javascript.svg' },
	{ name: 'TypeScript', icon: '/icons/typescript.svg' },
	{ name: 'React', icon: '/icons/react.svg' },
	{ name: 'Angular', icon: '/icons/angular.svg' },
	{ name: 'Next.js', icon: '/icons/nextjs.svg', darkInvert: true },
	{ name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
	{ name: 'HTML5', icon: '/icons/html5.svg' },
	{ name: 'CSS3', icon: '/icons/css3.svg' },
	{ name: 'Node.js', icon: '/icons/nodejs.svg' },
	{ name: 'NestJS', icon: '/icons/nestjs.svg' },
	{ name: 'GraphQL', icon: '/icons/graphql.svg' },
	{ name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
	{ name: 'MongoDB', icon: '/icons/mongodb.svg' },
	{ name: 'Redis', icon: '/icons/redis.svg' },
	{ name: 'MySQL', icon: '/icons/mysql.svg' },
	{ name: 'Git', icon: '/icons/git.svg' },
	{ name: 'Docker', icon: '/icons/docker.svg' },
	{
		name: 'AWS',
		icon: '/icons/aws.svg',
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
					<img
						src={skill.icon}
						alt={skill.name}
						className='w-8 h-8 object-contain'
						style={darkIcons && skill.darkInvert ? { filter: 'brightness(0) invert(1)' } : undefined}
						loading='lazy'
						width={32}
						height={32}
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
								<img
									src={skill.icon}
									alt={skill.name}
									className='w-8 h-8 object-contain'
									loading='lazy'
									width={32}
									height={32}
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
