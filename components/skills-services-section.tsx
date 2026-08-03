'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const AREAS = [
	{
		number: '01',
		label: 'construir',
		title: 'Desenvolvimento Full Stack',
		description:
			'Transformo ideia em produto funcionando: interface, aplicação, servidor e integração conversando como uma coisa só.',
		items: ['React, Angular, Next.js', 'Node.js, NestJS, Express', 'REST, GraphQL, WebSockets'],
	},
	{
		number: '02',
		label: 'organizar',
		title: 'Visão de Produto',
		description:
			'Ajudo a clarear escopo, prioridade e direção técnica antes da execução virar custo desnecessário.',
		items: ['Definição de escopo', 'Priorização e roadmap', 'Alinhamento com stakeholders'],
	},
	{
		number: '03',
		label: 'colaborar',
		title: 'Colaboração no Time',
		description:
			'Conecto contexto, pessoas e execução para reduzir ruído, destravar decisões e melhorar a qualidade da entrega.',
		items: ['Backlog e tasks', 'Discussões entre áreas', 'Code review e orientação'],
	},
]

export function SkillsServicesSection() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const section = sectionRef.current
		if (!section) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.18 },
		)

		observer.observe(section)
		return () => observer.disconnect()
	}, [])

	return (
		<section
			id='skills'
			ref={sectionRef}
			className='relative scroll-mt-24 overflow-hidden bg-[#111111] px-6 py-40 text-white md:px-12 md:py-52 lg:px-20 lg:py-64'
		>
			<div
				className='pointer-events-none absolute left-0 top-20 hidden h-[58%] w-[26%] select-none opacity-65 md:block lg:w-[24%]'
				aria-hidden='true'
			>
				<Image
					src='/ilustra_trampos.png'
					alt=''
					fill
					className='object-contain object-left-top'
					sizes='26vw'
				/>
			</div>

			<div
				className='pointer-events-none absolute bottom-8 right-0 hidden h-[60%] w-[26%] select-none opacity-65 md:block lg:w-[24%]'
				aria-hidden='true'
			>
				<Image
					src='/ilustra_trampos_2.png'
					alt=''
					fill
					className='object-contain object-right-bottom'
					sizes='26vw'
				/>
			</div>

			<div className='relative z-10 mx-auto max-w-7xl'>
				<div className='mb-14 grid gap-6 md:mb-18 lg:grid-cols-[0.9fr_1.1fr] lg:items-end'>
					<div>
						<p className='mb-4 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500'>
							<span className='text-red-500'>// </span>
							serviços
						</p>
						<h2 className='max-w-[11ch] text-[2.7rem] font-black uppercase leading-[0.88] tracking-tight text-white md:text-[4rem] lg:text-[5.25rem]'>
							como posso te ajudar
							<span className='text-red-500'>.</span>
						</h2>
					</div>

					<p className='max-w-[48rem] text-base leading-loose text-neutral-300 md:text-lg lg:justify-self-end'>
						Atuo onde produto e engenharia se encontram: construindo interfaces, organizando decisões e colaborando para transformar escopo em entrega real.
					</p>
				</div>

				<div className='grid gap-px overflow-hidden border border-neutral-800 bg-neutral-800 md:grid-cols-3'>
					{AREAS.map((area, index) => (
						<article
							key={area.title}
							className='group bg-[#111111] p-6 transition-colors duration-300 hover:bg-[#151515] md:p-8 lg:p-10'
							style={{
								opacity: visible ? 1 : 0,
								transform: visible ? 'translateY(0)' : 'translateY(18px)',
								transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s, background-color 0.3s ease`,
							}}
						>
							<div className='mb-8 flex items-center gap-4 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-neutral-500'>
								<span>
									<span className='text-red-500'>(</span>
									{area.number}
									<span className='text-red-500'>)</span>
								</span>
								<span className='h-px flex-1 bg-neutral-800 transition-colors group-hover:bg-neutral-700' />
								<span className='text-amber-200/80'>{area.label}</span>
							</div>

							<h3 className='mb-5 min-h-[4rem] text-2xl font-black italic leading-none tracking-tight text-white md:text-3xl'>
								{area.title}
								<span className='text-red-500'>.</span>
							</h3>

							<p className='mb-8 text-sm leading-relaxed text-neutral-300'>{area.description}</p>

							<div className='mt-auto flex flex-col divide-y divide-neutral-800'>
								{area.items.map((item, itemIndex) => (
									<div
										key={item}
										className='flex gap-4 py-3 text-sm font-bold leading-snug text-amber-100/80'
									>
										<span className='font-mono text-[0.62rem] font-medium leading-5 text-neutral-600'>
											{String(itemIndex + 1).padStart(2, '0')}
										</span>
										<span>{item}</span>
									</div>
								))}
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
