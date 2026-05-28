'use client'

import { useRef, useEffect, useState } from 'react'
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

// Each card slides in over 40vh of scroll. After all cards are in, 30vh of dwell before exit.
const PHASE_VH = 0.4
const DWELL_VH = 0.3

export function SkillsServicesSection() {
	const outerRef = useRef<HTMLDivElement>(null)
	const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
	const heightsRef = useRef([200, 200, 200])
	const phaseRef = useRef(320)

	const [outerHeight, setOuterHeight] = useState('auto')
	// translateY for each card — cards 1 and 2 start off the bottom
	const [translates, setTranslates] = useState<[number, number, number]>([0, 9999, 9999])

	useEffect(() => {
		const measure = () => {
			heightsRef.current = cardRefs.current.map(r => r?.offsetHeight ?? 200)
			phaseRef.current = window.innerHeight * PHASE_VH
			const totalScroll =
				window.innerHeight +
				(SERVICES.length - 1) * phaseRef.current +
				window.innerHeight * DWELL_VH
			setOuterHeight(`${totalScroll}px`)
			updateTranslates()
		}

		const updateTranslates = () => {
			if (!outerRef.current) return
			const scrolled = Math.max(0, -outerRef.current.getBoundingClientRect().top)
			const ph = phaseRef.current
			const [h0, h1] = heightsRef.current
			const vh = window.innerHeight

			// t1: 0→1 during first phase scroll
			const t1 = Math.max(0, Math.min(1, scrolled / ph))
			// t2: 0→1 during second phase scroll
			const t2 = Math.max(0, Math.min(1, (scrolled - ph) / ph))

			// card 0 always at 0, card 1 slides vh→h0, card 2 slides vh→(h0+h1)
			setTranslates([
				0,
				vh + (h0 - vh) * t1,
				vh + (h0 + h1 - vh) * t2,
			])
		}

		measure()

		const obs = new ResizeObserver(measure)
		cardRefs.current.forEach(r => r && obs.observe(r))
		window.addEventListener('scroll', updateTranslates, { passive: true })
		window.addEventListener('resize', measure)

		return () => {
			obs.disconnect()
			window.removeEventListener('scroll', updateTranslates)
			window.removeEventListener('resize', measure)
		}
	}, [])

	return (
		<div ref={outerRef} style={{ height: outerHeight }} className='bg-[#111111] text-white'>
			{/* Single sticky container — all cards exit together when outer div ends */}
			<div
				style={{
					position: 'sticky',
					top: 100,
					height: '100vh',
					overflow: 'hidden',
				}}
				className='flex'
			>
				{/* Left image column */}
				<div className='hidden md:flex w-[22%] h-full items-center justify-center px-6 shrink-0'>
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
				<div className='relative flex-1 overflow-hidden h-full'>
					{SERVICES.map((service, i) => (
						<div
							key={i}
							ref={el => {
								cardRefs.current[i] = el
							}}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								transform: `translateY(${translates[i]}px)`,
							}}
							className={`bg-[#111111] px-8 pt-8 pb-8${i > 0 ? ' border-t border-neutral-800' : ''}`}
						>
							<div className='flex items-baseline gap-4 mb-5'>
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

							<div className='grid md:grid-cols-3 gap-8'>
								<p className='text-sm text-neutral-500 leading-relaxed'>
									{service.description}
								</p>
								<div className='md:col-span-2 flex flex-col divide-y divide-neutral-800/60 md:self-start'>
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
						</div>
					))}
				</div>

				{/* Right image column */}
				<div className='hidden md:flex w-[22%] h-full items-center justify-center px-6 shrink-0'>
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
