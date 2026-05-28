'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

/* ───── background pattern suits ───── */

const hash = (a: number, b: number) => (a * 31 + b * 17 + a * b * 7) % 97

function PatternBackground({ variant }: { variant: 'dark' | 'light' }) {
	const isDark = variant === 'dark'
	const suits = isDark ? ['♠', '♣'] : ['♥', '♦']
	const baseColor = isDark ? '255,255,255' : '220,38,38'
	const rows = 8
	const cols = 12

	return (
		<div
			className='absolute inset-0 overflow-hidden pointer-events-none select-none'
			aria-hidden
		>
			<div className='flex flex-col justify-between h-full py-6'>
				{Array.from({ length: rows }).map((_, r) => (
					<div
						key={r}
						className='flex justify-between items-center px-8 md:px-12'
						style={{ transform: r % 2 === 1 ? 'translateX(4%)' : 'none' }}
					>
						{Array.from({ length: cols }, (_, i) => {
							const suit = suits[(r + i) % suits.length]
							const h = hash(r, i)
							const peakOp = 0.04 + (h % 8) / 100
							const valleyOp = 0.005 + ((h * 3) % 4) / 100
							const duration = 1.8 + (hash(i, r) % 55) / 10
							const delay = (hash(r + 1, i + 1) % 80) / 10
							return (
								<span
									key={i}
									className='text-xl md:text-2xl lg:text-3xl'
									style={{
										color: `rgba(${baseColor}, ${peakOp})`,
										['--valley' as string]: valleyOp,
										animation: `suitBreath ${duration}s ${delay}s ease-in-out infinite`,
									}}
								>
									{suit}
								</span>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}

export function SplitHome() {
	const cardRef = useRef<HTMLDivElement>(null)
	const breathRef = useRef<HTMLDivElement>(null)
	const glowRef = useRef<HTMLDivElement>(null)

	const lootTlRef = useRef<gsap.core.Timeline | null>(null)
	const isBreathingRef = useRef(false)
	const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mq = window.matchMedia('(max-width: 1023px)')
		setIsMobile(mq.matches)
		const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
		mq.addEventListener('change', handler)
		return () => mq.removeEventListener('change', handler)
	}, [])

	const startBreathing = useCallback(() => {
		if (isBreathingRef.current) return
		const card = cardRef.current
		if (!card) return

		isBreathingRef.current = true

		const proxy = { t: 0 }
		lootTlRef.current = gsap.to(proxy, {
			t: Math.PI * 2,
			duration: 14,
			ease: 'none',
			repeat: -1,
			onUpdate() {
				if (!cardRef.current) return
				gsap.set(cardRef.current, {
					rotateY: Math.sin(proxy.t) * 22,
					rotateX: Math.sin(proxy.t * 2 + 1.0) * 14,
				})
			},
		}) as unknown as gsap.core.Timeline

		// spin periódico a cada 8s via GSAP (sincronizado com rAF)
		const scheduleSpin = () => {
			spinIntervalRef.current = gsap.delayedCall(8, () => {
				const tl = lootTlRef.current
				const c = cardRef.current
				if (!tl || !c || !isBreathingRef.current) return

				tl.pause()
				const curZ = gsap.getProperty(c, 'rotateZ') as number
				gsap.to(c, {
					rotateZ: curZ + 180,
					duration: 1.2,
					ease: 'power3.inOut',
					onComplete() {
						if (isBreathingRef.current) tl.resume()
						scheduleSpin()
					},
				})
			}) as unknown as ReturnType<typeof setInterval>
		}
		scheduleSpin()
	}, [])

	useEffect(() => {
		startBreathing()

		return () => {
			if (spinIntervalRef.current)
				(spinIntervalRef.current as unknown as gsap.core.Tween).kill()
			if (lootTlRef.current) lootTlRef.current.kill()
		}
	}, [startBreathing])

	/* ───── MOBILE LAYOUT ───── */
	if (isMobile) {
		return (
			<div className='h-full w-screen flex flex-col relative overflow-hidden'>
				{/* Painel escuro — 58% do topo */}
				<div
					className='relative bg-[#0a0a0a] flex flex-col justify-center px-7 pt-8'
					style={{ flex: '0 0 58%', paddingBottom: 'clamp(160px, 24vh, 210px)' }}
				>
					{/*<PatternBackground variant='dark' />*/}

					<div className='relative z-10 flex flex-col gap-4'>
						<p className='font-mono text-xs text-neutral-400 tracking-wide'>
							<span className='text-neutral-500'>{'{ '}</span>
							location
							<span className='text-neutral-500'>{': '}</span>
							<span className='text-neutral-300'>"São Paulo, Brasil"</span>
							<span className='text-neutral-500'>{'}'}</span>
						</p>

						<h1 className='font-black tracking-tight leading-[0.88] text-white text-[2.6rem]'>
							<span className='block'>glauco</span>
							<span className='block'>
								<span className='invisible'>gl</span>
								<span className='text-[rgb(200,30,20)]'>.</span>vaz
								<span className='text-[rgb(200,30,20)]'>();</span>
							</span>
						</h1>

						<div className='font-mono text-xs text-neutral-400 leading-relaxed'>
							<p>
								<span className='text-neutral-300'>{'// '}</span>construo sistemas,
								sites e aplicativos
							</p>
							<p>
								<span className='text-neutral-300'>{'// '}</span>do planejamento ao
								deploy
							</p>
						</div>

						<div className='flex flex-col gap-3 mt-1'>
							<div className='flex gap-2'>
								<a
									href='/blog'
									className='inline-block bg-[rgb(200,30,20)] hover:bg-[rgb(165,20,12)] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-2 transition-colors'
								>
									✦ Leia meu blog
								</a>
								<a
									href='mailto:ext.glaucobaptista@mentesnotaveis.com.br'
									className='inline-block border border-neutral-500 hover:border-white text-neutral-300 hover:text-white text-[9px] font-bold tracking-widest uppercase px-3 py-2 transition-colors'
								>
									Mensagem →
								</a>
							</div>
							<a
								href='/curriculo-glauco-vaz.pdf'
								download='Curriculo-Glauco-Vaz.pdf'
								className='inline-block text-neutral-500 hover:text-neutral-300 text-[10px] font-mono tracking-wide transition-colors'
							>
								↓ baixar currículo (.pdf)
							</a>
						</div>
					</div>
				</div>

				{/* Painel branco — 42% abaixo */}
				<div
					className='relative bg-[#faf9f7] flex flex-col justify-center px-7 pb-6'
					style={{ flex: '0 0 42%', paddingTop: 'clamp(160px, 24vh, 210px)' }}
				>
					{/*<PatternBackground variant='light' />*/}

					<div className='relative z-10 text-right'>
						{/* Title */}
						<h2 className='font-black text-neutral-900 text-[1.4rem] leading-[1.05] mb-1 whitespace-nowrap'>
							Fullstack Engineer<span className='text-[rgb(200,30,20)]'>.</span>
						</h2>

						{/* Subtitle */}
						<p className='font-mono text-[12px] text-neutral-400 tracking-wide mb-4'>
							desde <span className='text-neutral-700 font-bold'>2016</span>
							<span className='mx-1 text-neutral-300'>·</span>
							freela &amp; CLT
						</p>

						{/* Stats */}
						<div className='flex gap-6 justify-end mb-4'>
							{[
								{ value: '10', label: 'ANOS' },
								{ value: '9', label: 'EMPRESAS' },
								{ value: '∞', label: 'COMMITS' },
							].map(({ value, label }) => (
								<div key={label} className='text-right'>
									<div className='font-black text-[1.8rem] text-neutral-900 leading-none'>
										{value}
										<span className='text-[rgb(200,30,20)]'>.</span>
									</div>
									<div className='font-mono text-[10px] tracking-[0.2em] text-neutral-400 mt-0.5 uppercase'>
										{label}
									</div>
								</div>
							))}
						</div>

						{/* Stack */}
						<p className='font-black text-neutral-900 text-[1.1rem]'>
							Angular <span className='text-[rgb(200,30,20)]'>·</span> React{' '}
							<span className='text-[rgb(200,30,20)]'>·</span> Node
						</p>
					</div>

					<div className='absolute bottom-4 left-7 flex items-center gap-2 text-neutral-400 text-[10px] tracking-widest uppercase z-10'>
						<ChevronDown className='h-3 w-3 animate-bounce' />
						scroll
					</div>
				</div>

				{/* Carta — centralizada no boundary entre os dois painéis */}
				<div
					className='absolute left-1/2 z-30 pointer-events-none'
					style={{
						top: '58%',
						transform: 'translateX(-50%) translateY(-50%)',
						perspective: '800px',
					}}
				>
					<div ref={breathRef}>
						<div ref={cardRef} style={{ backfaceVisibility: 'hidden' }}>
							<Image
								src='/FINAL_CARTA GLAUCO.png'
								alt='Glauco Vaz Card'
								width={280}
								height={400}
								className='object-contain drop-shadow-2xl'
								style={{ width: '52vw', height: 'auto', maxWidth: '240px' }}
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	/* ───── DESKTOP LAYOUT (original) ───── */
	return (
		<div className='h-full w-screen flex flex-col lg:flex-row overflow-hidden relative'>
			{/* ===== Card — fixed at center boundary ===== */}
			<div
				className='hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none'
				style={{ perspective: '1000px' }}
			>
				<div ref={breathRef}>
					<div ref={cardRef} style={{ backfaceVisibility: 'hidden' }}>
						<Image
							src='/FINAL_CARTA GLAUCO.png'
							alt='Glauco Vaz Card'
							width={280}
							height={400}
							className='object-contain drop-shadow-2xl'
							priority
						/>
					</div>
				</div>
			</div>

			{/* ===== LEFT PANEL — Dark ===== */}
			<div className='relative flex-1 min-h-[55vh] lg:min-h-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden'>
				{/*<PatternBackground variant='dark' />*/}

				<div className='relative z-10 px-8 md:px-12 lg:px-14 max-w-xl w-full'>
					<p className='font-mono text-lg text-neutral-400 mb-7 tracking-wide leading-relaxed'>
						<span className='text-neutral-500'>{'{ '}</span>
						location
						<span className='text-neutral-500'>{': '}</span>
						<span className='text-neutral-300'>"São Paulo, Brasil"</span>
						<span className='text-neutral-500'>{'}'}</span>
					</p>

					<h1 className='font-black tracking-tight leading-[0.88] text-white text-4xl md:text-5xl lg:text-6xl'>
						<span className='block'>glauco</span>
						<span className='block'>
							<span className='invisible'>gla</span>
							<span className='text-[rgb(200,30,20)]'>.</span>vaz
							<span className='text-[rgb(200,30,20)]'>();</span>
						</span>
					</h1>

					<div className='mt-7 font-mono text-lg text-neutral-400 leading-relaxed'>
						<p>
							<span className='text-neutral-300'>{'// '}</span>
							construo sistemas, sites e aplicativos
						</p>
						<p>
							<span className='text-neutral-300'>{'// '}</span>
							do planejamento ao deploy
						</p>
					</div>

					<div className='mt-7 flex flex-col gap-4'>
						<div className='flex gap-3'>
							<a
								href='/blog'
								className='whitespace-nowrap bg-[rgb(200,30,20)] hover:bg-[rgb(165,20,12)] text-white text-sm font-bold tracking-widest uppercase px-6 py-3 transition-colors'
							>
								✦ Leia meu blog
							</a>
							<a
								href='mailto:ext.glaucobaptista@mentesnotaveis.com.br'
								className='whitespace-nowrap border border-neutral-500 hover:border-white text-neutral-300 hover:text-white text-sm font-bold tracking-widest uppercase px-6 py-3 transition-colors'
							>
								Me mande uma mensagem →
							</a>
						</div>
						<a
							href='/curriculo-glauco-vaz.pdf'
							download='Curriculo-Glauco-Vaz.pdf'
							className='whitespace-nowrap inline-flex items-center gap-2 font-mono text-sm text-neutral-300 hover:text-white transition-colors group'
						>
							<span className='text-[rgb(200,30,20)]'>↓</span>
							<span className='underline underline-offset-4 decoration-neutral-600 group-hover:decoration-neutral-400 transition-colors'>
								baixar currículo (.pdf)
							</span>
						</a>
					</div>
				</div>

				<div className='absolute bottom-6 left-8 md:left-12 lg:left-14 flex items-center gap-2 text-neutral-300 text-[11px] tracking-widest uppercase'>
					<ChevronDown className='h-3 w-3 animate-bounce' />
					scroll
				</div>
			</div>

			{/* ===== RIGHT PANEL — White ===== */}
			<div className='relative flex-1 min-h-[45vh] lg:min-h-0 bg-[#faf9f7] flex items-center justify-center overflow-hidden'>
				{/*<PatternBackground variant='light' />*/}

				<div className='relative z-10 px-8 md:px-12 lg:px-14 max-w-xl w-full text-right'>
					{/* Title */}
					<h2
						className='font-black text-neutral-900 leading-[1.05] mb-1 whitespace-nowrap'
						style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
					>
						Fullstack Engineer<span className='text-[rgb(200,30,20)]'>.</span>
					</h2>

					{/* Subtitle */}
					<p className='font-mono text-[13px] text-neutral-400 tracking-wide mb-10'>
						desde <span className='text-neutral-700 font-bold'>2016</span>
						<span className='mx-2 text-neutral-300'>·</span>
						freela &amp; CLT
					</p>

					{/* Stats */}
					<div className='flex gap-8 justify-end mb-10'>
						{[
							{ value: '10', label: 'ANOS' },
							{ value: '9', label: 'EMPRESAS' },
							{ value: '∞', label: 'COMMITS' },
						].map(({ value, label }) => (
							<div key={label} className='text-right'>
								<div
									className='font-black text-neutral-900 leading-none'
									style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
								>
									{value}
									<span className='text-[rgb(200,30,20)]'>.</span>
								</div>
								<div className='font-mono text-[11px] tracking-[0.2em] text-neutral-400 mt-1 uppercase'>
									{label}
								</div>
							</div>
						))}
					</div>

					{/* Stack */}
					<p
						className='font-black text-neutral-900 mb-10'
						style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
					>
						Angular
						<span className='text-[rgb(200,30,20)] mx-2'>·</span>
						React
						<span className='text-[rgb(200,30,20)] mx-2'>·</span>
						Node
					</p>

					{/* Quote */}
					<blockquote
						className='italic font-light text-neutral-600 leading-relaxed tracking-wide -ml-16 text-right'
						style={{ fontSize: 'clamp(0.82rem, 1.4vw, 1.1rem)' }}
					>
						Acredito que programação seja a arte de transformar pensamentos em realidade
						<span className='text-[rgb(200,30,20)]'>.</span>
						<br />é o que eu acho<span className='text-[rgb(200,30,20)]'>.</span>
					</blockquote>
				</div>
			</div>
		</div>
	)
}
