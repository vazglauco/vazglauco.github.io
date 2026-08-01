'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function LineContent({ index }: { index: number }) {
	if (index === 0) return <>Olá! Sou Glauco, desenvolvedor full stack com foco em front-end</>
	if (index === 1)
		return (
			<>
				Há mais de nove anos construo produtos digitais, criando desde interfaces até a
				arquitetura que sustenta aplicações escaláveis. Gosto de transformar problemas
				complexos em soluções simples, intuitivas e fáceis de evoluir.
			</>
		)
	if (index === 2)
		return (
			<>
				No front-end, meu foco está em criar interfaces que pareçam naturais de usar.
				Valorizo consistência, acessibilidade, performance e sistemas de componentes que
				permitam a evolução do produto sem aumentar sua complexidade. No back-end, gosto de
				desenhar APIs bem definidas, integrações confiáveis e arquiteturas distribuídas que
				permaneçam simples de manter mesmo à medida que o sistema cresce.
			</>
		)
	return (
		<>
			Ao longo da carreira participei da evolução de produtos utilizados por milhões de
			pessoas e empresas, passando por fintechs, mercado financeiro, seguros e educação.
			Trabalhei em projetos para empresas como Santander, Sinqia, Porto Seguro e Serasa
			Experian, sempre envolvido em desafios de modernização de sistemas, arquitetura de
			aplicações, migração de legados e construção de novas experiências digitais.
		</>
	)
}

const LINE_NUMS = ['01', '02', '03', '04']

export function AboutMeSection() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const visualRef = useRef<HTMLDivElement>(null)
	const linesRef = useRef<(HTMLDivElement | null)[]>([])
	const [visible, setVisible] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mq = window.matchMedia('(max-width: 1023px)')
		setIsMobile(mq.matches)
		const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
		mq.addEventListener('change', handler)
		return () => mq.removeEventListener('change', handler)
	}, [])

	// Animate lines in when section snaps into view
	useEffect(() => {
		const section = sectionRef.current
		if (!section) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
				} else {
					setVisible(false)
				}
			},
			{ threshold: 0.4 },
		)

		observer.observe(section)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (isMobile) return

		const updateVisualPosition = () => {
			const section = sectionRef.current
			const visual = visualRef.current
			if (!section || !visual) return

			const sectionRect = section.getBoundingClientRect()
			const sectionTop = window.scrollY + sectionRect.top
			const visualHeight = visual.offsetHeight
			const desiredTop = window.scrollY + window.innerHeight - visualHeight - sectionTop
			const maxTop = Math.max(0, section.offsetHeight - visualHeight)
			const clampedTop = Math.max(0, Math.min(desiredTop, maxTop))

			visual.style.transform = `translateY(${clampedTop}px)`
		}

		updateVisualPosition()
		window.addEventListener('scroll', updateVisualPosition, { passive: true })
		window.addEventListener('resize', updateVisualPosition)

		return () => {
			window.removeEventListener('scroll', updateVisualPosition)
			window.removeEventListener('resize', updateVisualPosition)
		}
	}, [isMobile])

	if (isMobile) {
		return (
			<div id="sobre" ref={sectionRef} className='w-full scroll-mt-24 bg-[#faf9f7] relative'>
				<div className='px-8 pt-28 pb-[560px]'>
					<div className='flex flex-col gap-7'>
						{[0, 1, 2].map((i) => (
							<div key={i}>
								<div className='flex items-start gap-3'>
									<span className='text-[10px] font-mono text-neutral-400 mt-1 shrink-0 w-6'>
										{LINE_NUMS[i]}.
									</span>
									<p
										className={
											i === 0
												? 'text-xl font-black italic font-serif leading-tight text-neutral-800'
												: 'text-base leading-relaxed text-neutral-700 font-medium'
										}
									>
										<LineContent index={i} />
									</p>
								</div>
{i === 0 && <div className='w-12 h-[2px] bg-red-500 mt-5 ml-9' />}
						</div>
					))}

						{/* Parágrafo 04 */}
						<div className='flex items-start gap-3'>
							<span className='text-[10px] font-mono text-neutral-400 mt-1 shrink-0 w-6'>
								{LINE_NUMS[3]}.
							</span>
							<p className='text-base leading-relaxed text-neutral-700 italic'>
								<LineContent index={3} />
							</p>
						</div>
					</div>
				</div>

				<div className='absolute bottom-0 left-0 pointer-events-none select-none'>
					<Image
						src='/ilustra_about.png'
						alt='Ilustração Glauco'
						width={280}
						height={320}
						className='object-contain w-full h-auto'
					/>
				</div>
			</div>
		)
	}

	return (
		<div id="sobre" ref={sectionRef} className='grid w-full scroll-mt-24 grid-cols-[minmax(0,1fr)_clamp(26rem,36vw,34rem)] bg-[#faf9f7] relative'>
			{/* Text block — left side, vertically centered */}
			<div className='relative z-10 col-start-1 row-start-1 flex flex-col justify-center px-8 py-32 md:px-16 md:py-36 lg:px-20 xl:px-24 xl:py-44 min-[1500px]:mx-auto min-[1500px]:my-32 min-[1500px]:max-w-[980px] min-[1500px]:px-0 min-[1500px]:py-12'>
				{LINE_NUMS.map((num, i) => (
					<div key={i}>
						<div
							ref={(el) => {
								linesRef.current[i] = el
							}}
							className='flex items-start gap-4 mb-5 xl:mb-7'
							style={{
								color: '#1a1a1a',
								opacity: visible ? 1 : 0,
								transform: visible ? 'translateY(0)' : 'translateY(16px)',
								transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
							}}
						>
							<span className='text-[11px] font-mono mt-[0.35em] shrink-0 text- neutral-400'>
								{num}.
							</span>
							<p
								className={
									i === 0
										? 'text-3xl md:text-4xl lg:text-[clamp(2rem,3vw,2.6rem)] font-black italic leading-tight'
										: i === 3
											? 'text-base md:text-lg lg:text-[clamp(0.95rem,1.35vw,1.18rem)] font-medium leading-relaxed xl:leading-loose tracking-wide italic text-neutral-600'
											: 'text-base md:text-lg lg:text-[clamp(0.95rem,1.35vw,1.18rem)] font-medium leading-relaxed xl:leading-loose tracking-wide'
								}
							>
								<LineContent index={i} />
							</p>
						</div>
						{i === 0 && (
							<div
								className='w-14 h-[2px] bg-red-500 mb-6 xl:mb-8 ml-7'
								style={{
									opacity: visible ? 1 : 0,
									transition: 'opacity 0.4s ease 0.05s',
								}}
							/>
						)}
					</div>
				))}
			</div>

			{/* Illustration — bottom right */}
			<div
				className='relative col-start-2 row-start-1 z-0 border-l-2 border-neutral-300 pointer-events-none select-none'
			>
				<div
					ref={visualRef}
					className='absolute right-0 top-0 ml-auto flex h-[clamp(26rem,36vw,34rem)] max-h-[calc(100svh-5rem)] w-full max-w-[clamp(26rem,36vw,34rem)] items-end justify-end'
				>
				<Image
					src='/ilustra_about.png'
					alt='Ilustração Glauco'
					width={480}
					height={560}
					className='object-contain w-full h-auto max-h-full'
					priority
				/>
				</div>
			</div>
		</div>
	)
}
