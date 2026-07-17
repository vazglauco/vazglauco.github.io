'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

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

export function SkillsServicesSection() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const el = sectionRef.current
		if (!el) return
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) { setVisible(true); io.disconnect() }
		}, { threshold: 0.1 })
		io.observe(el)
		return () => io.disconnect()
	}, [])

	return (
		<div
			id="skills"
			ref={sectionRef}
			className='bg-[#111111] text-white py-20 md:py-28 lg:py-32'
			style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}
		>
			<h2 className='text-center font-black tracking-tight leading-none uppercase text-white text-[2rem] md:text-[2.5rem] lg:text-[3rem] mb-12 md:mb-16'>
				como posso te ajudar
				<span className='text-red-600'>.</span>
			</h2>

			<div className='flex items-stretch min-h-[60vh] px-6 md:px-10 lg:px-14 gap-4 lg:gap-6'>
				{/* Left image column */}
				<div className='hidden md:flex w-[22%] items-center justify-center shrink-0'>
					<div className='relative w-full h-[70%]'>
						<Image
							src='/ilustra_trampos.png'
							alt='Ilustração de trabalho'
							fill
							className='object-contain'
						/>
					</div>
				</div>

				{/* Center cards area */}
				<div className='flex-1 grid md:grid-cols-3 gap-6 lg:gap-8'>
					{SERVICES.map((service, i) => (
						<div
							key={i}
							className='border border-neutral-800 bg-[#111111] p-6 md:p-8 flex flex-col'
							style={{
								opacity: visible ? 1 : 0,
								transform: visible ? 'translateY(0)' : 'translateY(16px)',
								transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
							}}
						>
							<div className='flex items-baseline gap-3 mb-5'>
								<span className='text-lg font-bold text-neutral-600 shrink-0'>
									({service.number})
								</span>
								<h3
									className='text-xl md:text-2xl font-bold italic tracking-tight'
									style={{ color: 'rgb(235 189 51)' }}
								>
									{service.title}
								</h3>
							</div>

							<p className='text-sm text-neutral-500 leading-relaxed mb-6'>
								{service.description}
							</p>

							<div className='mt-auto flex flex-col divide-y divide-neutral-800/60'>
								{service.skills.map((skill, j) => (
									<span
										key={j}
										className='flex items-start gap-4 py-2.5 font-bold text-amber-100/80 text-sm'
									>
										<span className='font-mono text-xs font-medium leading-[200%] text-neutral-500'>
											0{j + 1}
										</span>
										{skill}
									</span>
									))}
								</div>
							</div>
						))}
					</div>

				{/* Right image column */}
				<div className='hidden md:flex w-[22%] items-center justify-center shrink-0'>
					<div className='relative w-full h-[70%]'>
						<Image
							src='/ilustra_trampos_2.png'
							alt='Ilustração de trabalho 2'
							fill
							className='object-contain'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
