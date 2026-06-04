'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function LineContent({ index }: { index: number }) {
	if (index === 0) return <>Salve.</>
	if (index === 1)
		return (
			<>
				Atuo no desenvolvimento de sistemas e sites desde <strong>2016</strong>. Construí
				minha carreira com forte atuação em aplicações Front End, e atualmente atuo também
				desenvolvendo APIs e soluções Back End, sendo um{' '}
				<strong>Full Stack &ldquo;coringa&rdquo;</strong>, que joga em diversas posições do
				desenvolvimento de software, desde o planejamento estratégico, definição de
				arquitetura e requisitos, até a entrega final.
			</>
		)
	if (index === 2)
		return (null
		// 	<>
		// 		Atualmente vivo em <strong>São Paulo</strong>, movido pela curiosidade constante de
		// 		descobrir e experimentar o novo. Fora do código, gosto de drama e suspense. Escuto
		// 		muito <strong>Rap, Funk e Samba</strong>.{' '}
		// 		<strong>Feijoada e bolo de cenoura</strong>.
		// 	</>
		)
	return (null
		// <>
		// 	<em className='font-semibold'>Omo Orisa e Omo Ifa.</em> Trago comigo a disciplina e
		// 	postura que aprendi com quem veio antes.
		// </>
	)
}

const LINE_NUMS = ['01', '02', '03', '04']

export function AboutMeSection() {
	const sectionRef = useRef<HTMLDivElement>(null)
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

	if (isMobile) {
		return (
			<div id="sobre" ref={sectionRef} className='w-full bg-[#faf9f7] relative'>
				<div className='px-8 pt-20 pb-[480px]'>
					<div className='mb-10 text-right'>
						<div className='flex items-baseline justify-end gap-2'>
							<span className='text-[2rem] font-black tracking-tight leading-none text-black uppercase'>
								SOBRE
							</span>
							<span className='text-[2rem] font-black text-red-500 leading-none'>
								|
							</span>
						</div>
						<div className='flex items-baseline justify-end gap-2'>
							<span className='text-[2rem] font-black tracking-tight leading-none text-black uppercase'>
								MIM
							</span>
							<span className='text-[1.75rem] font-black text-red-500 leading-none'>
								/
							</span>
						</div>
					</div>

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
		<div id="sobre" ref={sectionRef} className='w-full min-h-screen bg-[#faf9f7] overflow-hidden relative'>
			{/* Title — top right */}
			<div
				className='absolute top-14 lg:top-24 right-8 md:right-14 lg:right-20 z-10 text-right select-none'
				style={{ fontFamily: 'var(--font-fira-code), monospace' }}
			>
				<div className='flex items-baseline justify-end gap-3'>
					<span className='text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-black tracking-tight leading-none text-black uppercase'>
						SOBRE
					</span>
					<span className='text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-black text-red-500 leading-none'>
						|
					</span>
				</div>
				<div className='flex items-baseline justify-end gap-3'>
					<span className='text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-black tracking-tight leading-none text-black uppercase'>
						MIM
					</span>
					<span className='text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-black text-red-500 leading-none'>
						/
					</span>
				</div>
			</div>

			{/* Text block — left side, vertically centered */}
			<div className='absolute inset-y-0 left-0 right-[36%] flex flex-col justify-center px-8 md:px-16 lg:px-24'>
				{LINE_NUMS.map((num, i) => (
					<div key={i}>
						<div
							ref={(el) => {
								linesRef.current[i] = el
							}}
							className='flex items-start gap-4 mb-10'
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
										? 'text-3xl md:text-4xl lg:text-[2.6rem] font-black italic leading-tight'
										: i === 3
											? 'text-base md:text-lg lg:text-xl font-medium leading-loose tracking-wide italic text-neutral-600'
											: 'text-base md:text-lg lg:text-xl font-medium leading-loose tracking-wide'
								}
							>
								<LineContent index={i} />
							</p>
						</div>
						{i === 0 && (
							<div
								className='w-14 h-[2px] bg-red-500 mb-10 ml-7'
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
				className='absolute top-[30%] bottom-0 right-0 z-0 w-64 md:w-80 lg:w-[26rem] pointer-events-none select-none border-l-2 border-neutral-300 flex flex-col justify-end'
				style={{
					opacity: visible ? 1 : 0,
					transform: visible ? 'translateY(0)' : 'translateY(24px)',
					transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
				}}
			>
				<Image
					src='/ilustra_about.png'
					alt='Ilustração Glauco'
					width={480}
					height={560}
					className='object-contain w-full h-auto'
					priority
				/>
			</div>
		</div>
	)
}
