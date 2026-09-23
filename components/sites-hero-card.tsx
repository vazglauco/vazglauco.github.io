'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const INITIAL_ROTATE_X = Math.sin(1) * 14

export function SitesHeroCard() {
	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const card = cardRef.current
		if (!card) return

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (reducedMotion) {
			gsap.set(card, { autoAlpha: 1 })
			return
		}

		const proxy = { t: 0 }
		let floatTween: gsap.core.Tween | null = null
		let spinDelay: gsap.core.Tween | null = null

		const scheduleSpin = () => {
			spinDelay = gsap.delayedCall(6, () => {
				floatTween?.pause()
				const currentRotation = gsap.getProperty(card, 'rotateZ') as number
				gsap.to(card, {
					rotateZ: currentRotation + 180,
					duration: 1.2,
					ease: 'power3.inOut',
					onComplete: () => {
						floatTween?.resume()
						scheduleSpin()
					},
				})
			})
		}

		const startFloating = () => {
			floatTween = gsap.to(proxy, {
				t: Math.PI * 2,
				duration: 14,
				ease: 'none',
				repeat: -1,
				onUpdate: () => {
					gsap.set(card, {
						rotateY: Math.sin(proxy.t) * 22,
						rotateX: Math.sin(proxy.t * 2 + 1) * 14,
					})
				},
			})
			scheduleSpin()
		}

		const entrance = gsap.fromTo(
			card,
			{
				autoAlpha: 0,
				scale: 0.28,
				z: -700,
				rotateX: 34,
				rotateY: -540,
				rotateZ: -18,
			},
			{
				autoAlpha: 1,
				scale: 1,
				z: 0,
				rotateX: INITIAL_ROTATE_X,
				rotateY: 0,
				rotateZ: 0,
				duration: 1.15,
				delay: 0.6,
				ease: 'power3.out',
				onComplete: startFloating,
			},
		)

		return () => {
			entrance.kill()
			floatTween?.kill()
			spinDelay?.kill()
			gsap.killTweensOf(card)
		}
	}, [])

	return (
		<div className='h-full w-full [perspective:1000px]'>
			<div
				ref={cardRef}
				className='relative h-full w-full drop-shadow-2xl'
				style={{ backfaceVisibility: 'hidden', opacity: 0, visibility: 'hidden', transformStyle: 'preserve-3d' }}
			>
				<Image
					src='/FINAL_CARTA GLAUCO.webp'
					alt='Carta ilustrada de Glauco Vaz'
					fill
					sizes='(max-width: 768px) 176px, (max-width: 1024px) 208px, 224px'
					priority
					className='object-contain'
				/>
			</div>
		</div>
	)
}
