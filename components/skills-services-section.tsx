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
const TITLE_HEIGHT = 100 // px — collapsed card shows only its title on mobile

export function SkillsServicesSection() {
	const outerRef = useRef<HTMLDivElement>(null)
	const stickyRef = useRef<HTMLDivElement>(null)
	const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
	const titleRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
	const heightsRef = useRef([200, 200, 200, 0])
	const titleHeightsRef = useRef([80, 80, 80])
	const phaseRef = useRef(320)
	const isMobileRef = useRef(false)

	// Mirrors the rendered 100svh of the sticky container — single source of truth for JS math
	const stableHeightRef = useRef(800)

	const [outerHeight, setOuterHeight] = useState('auto')
	const [translates, setTranslates] = useState<number[]>([0, 9999, 9999, 9999])
	const [clipHeights, setClipHeights] = useState<(number | string)[]>(['auto', 'auto', 'auto'])
	const [isMobile, setIsMobile] = useState(false)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const el = outerRef.current
		if (!el) return
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) { setVisible(true); io.disconnect() }
		}, { threshold: 0.05 })
		io.observe(el)
		return () => io.disconnect()
	}, [])

	useEffect(() => {
		// Use the actual rendered height of the sticky container (= 100svh in px)
		// so JS scroll math stays in sync with CSS
		stableHeightRef.current = stickyRef.current?.offsetHeight ?? window.innerHeight

		const mq = window.matchMedia('(max-width: 1023px)')
		isMobileRef.current = mq.matches
		setIsMobile(mq.matches)

		const updateTranslates = () => {
			if (!outerRef.current) return
			const scrolled = Math.max(0, -outerRef.current.getBoundingClientRect().top)
			const ph = phaseRef.current
			// Use scrollHeight so natural height is preserved even when card is clipped
			const [h0, h1] = heightsRef.current
			const vh = stableHeightRef.current

			const t1 = Math.max(0, Math.min(1, scrolled / ph))
			const t2 = Math.max(0, Math.min(1, (scrolled - ph) / ph))

			if (isMobileRef.current) {
				const [th0, th1] = titleHeightsRef.current
				// Collapse only starts in the second half of each card's travel
				const clip1 = Math.max(0, Math.min(1, (t1 - 0.5) / 0.5))
				const clip2 = Math.max(0, Math.min(1, (t2 - 0.5) / 0.5))
				const t3 = Math.max(0, Math.min(1, (scrolled - 2 * ph) / ph))

				setTranslates([
					0,
					vh + (th0 - vh) * t1,
					vh + (th0 + th1 - vh) * t2,
					vh * (1 - t3),
				])
				setClipHeights([
					h0 + (th0 - h0) * clip1,
					h1 + (th1 - h1) * clip2,
					'auto',
				])
			} else {
				setTranslates([
					0,
					vh + (h0 - vh) * t1,
					vh + (h0 + h1 - vh) * t2,
				])
				setClipHeights(['auto', 'auto', 'auto'])
			}
		}

		const measure = () => {
			// scrollHeight gives natural height even when overflow:hidden clips the element
			heightsRef.current = cardRefs.current.map(r => r?.scrollHeight ?? 200)
			// pt-8 (32px) + title row height + 16px breathing room
			titleHeightsRef.current = titleRefs.current.map(r => 32 + (r?.offsetHeight ?? 40) + 16)
			phaseRef.current = stableHeightRef.current * PHASE_VH
			const extraPhase = isMobileRef.current ? 1 : 0
			const totalScroll =
				stableHeightRef.current +
				(SERVICES.length - 1 + extraPhase) * phaseRef.current +
				stableHeightRef.current * DWELL_VH
			setOuterHeight(`${totalScroll}px`)
			updateTranslates()
		}

		measure()

		const mqHandler = (e: MediaQueryListEvent) => {
			isMobileRef.current = e.matches
			setIsMobile(e.matches)
			measure()
		}
		mq.addEventListener('change', mqHandler)

		const onResize = () => {
			const newH = stickyRef.current?.offsetHeight ?? window.innerHeight
			if (Math.abs(newH - stableHeightRef.current) > 100) {
				stableHeightRef.current = newH
				measure()
			}
		}

		const obs = new ResizeObserver(measure)
		cardRefs.current.forEach(r => r && obs.observe(r))
		window.addEventListener('scroll', updateTranslates, { passive: true })
		window.addEventListener('resize', onResize)

		return () => {
			obs.disconnect()
			mq.removeEventListener('change', mqHandler)
			window.removeEventListener('scroll', updateTranslates)
			window.removeEventListener('resize', onResize)
		}
	}, [])

	return (
		<div id="skills" ref={outerRef} style={{ height: outerHeight, opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }} className='bg-[#111111] text-white'>
			{/* Single sticky container — all cards exit together when outer div ends */}
			<div
				ref={stickyRef}
				style={{
					position: 'sticky',
					top: 100,
					height: '100svh',
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
								...(isMobile && i < 2 ? { height: clipHeights[i], overflow: 'hidden' } : {}),
							}}
							className={`bg-[#111111] px-8 pt-8 pb-8${i > 0 ? ' border-t border-neutral-800' : ''}`}
						>
							<div ref={el => { titleRefs.current[i] = el }} className='flex items-baseline gap-4 mb-5'>
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

					{/* Mobile closing card — image only, slides in to cover everything */}
					<div
						ref={el => { cardRefs.current[3] = el }}
						className='lg:hidden absolute top-0 left-0 right-0 bg-[#111111] flex items-center justify-center'
						style={{
							transform: `translateY(${translates[3] ?? 9999}px)`,
							height: '100svh',
						}}
					>
						<div className='relative w-full h-[75%]'>
							<Image
								src='/ilustra_trampos.png'
								alt='Ilustração de trampos'
								fill
								className='object-contain'
							/>
						</div>
					</div>
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
