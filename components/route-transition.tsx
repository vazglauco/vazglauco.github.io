'use client'

import type { ReactNode } from 'react'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

type PageSide = 'sites' | 'home' | 'blog' | 'other'

const SPLIT_POSITION: Record<Exclude<PageSide, 'other'>, number> = {
	sites: 100,
	home: 50,
	blog: 0,
}

function getPageSide(pathname: string): PageSide {
	if (pathname === '/') return 'home'
	if (pathname.startsWith('/sites')) return 'sites'
	if (pathname.startsWith('/blog')) return 'blog'
	return 'other'
}

function isModifiedClick(event: MouseEvent) {
	return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

export function RouteTransition({ children }: { children: ReactNode }) {
	const pathname = usePathname()
	const router = useRouter()
	const overlayRef = useRef<HTMLDivElement>(null)
	const blackPanelRef = useRef<HTMLDivElement>(null)
	const whitePanelRef = useRef<HTMLDivElement>(null)
	const seamRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const timelineRef = useRef<gsap.core.Timeline | null>(null)
	const previousPathRef = useRef(pathname)
	const pendingPathRef = useRef<string | null>(null)
	const lockedRef = useRef(false)
	const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const setSplit = (position: number) => {
		const isVertical = window.matchMedia('(max-width: 1023px)').matches

		if (isVertical) {
			gsap.set(blackPanelRef.current, {
				left: 0,
				top: 0,
				width: '100%',
				height: `${position}%`,
			})
			gsap.set(whitePanelRef.current, {
				left: 0,
				top: `${position}%`,
				width: '100%',
				height: `${100 - position}%`,
			})
			gsap.set(seamRef.current, {
				left: 0,
				top: `${position}%`,
				width: '100%',
				height: 1,
				xPercent: 0,
				yPercent: -50,
			})
			return
		}

		gsap.set(blackPanelRef.current, {
			left: 0,
			top: 0,
			width: `${position}%`,
			height: '100%',
		})
		gsap.set(whitePanelRef.current, {
			left: `${position}%`,
			top: 0,
			width: `${100 - position}%`,
			height: '100%',
		})
		gsap.set(seamRef.current, {
			left: `${position}%`,
			top: 0,
			width: 1,
			height: '100%',
			xPercent: -50,
			yPercent: 0,
		})
	}

	const setDestinationWipe = (side: 'sites' | 'blog', progress: number) => {
		const isVertical = window.matchMedia('(max-width: 1023px)').matches
		const edge = side === 'sites' ? progress : 100 - progress

		if (isVertical) {
			gsap.set(blackPanelRef.current, {
				left: 0,
				top: 0,
				width: '100%',
				height: side === 'sites' ? `${progress}%` : 0,
			})
			gsap.set(whitePanelRef.current, {
				left: 0,
				top: side === 'blog' ? `${100 - progress}%` : '100%',
				width: '100%',
				height: side === 'blog' ? `${progress}%` : 0,
			})
			gsap.set(seamRef.current, {
				left: 0,
				top: `${edge}%`,
				width: '100%',
				height: 1,
				xPercent: 0,
				yPercent: -50,
			})
			return
		}

		gsap.set(blackPanelRef.current, {
			left: 0,
			top: 0,
			width: side === 'sites' ? `${progress}%` : 0,
			height: '100%',
		})
		gsap.set(whitePanelRef.current, {
			left: side === 'blog' ? `${100 - progress}%` : '100%',
			top: 0,
			width: side === 'blog' ? `${progress}%` : 0,
			height: '100%',
		})
		gsap.set(seamRef.current, {
			left: `${edge}%`,
			top: 0,
			width: 1,
			height: '100%',
			xPercent: -50,
			yPercent: 0,
		})
	}

	const revealPage = (delay = 0.04) => {
		if (!overlayRef.current || !contentRef.current) return
		timelineRef.current?.kill()
		if (fallbackRef.current) clearTimeout(fallbackRef.current)

		timelineRef.current = gsap.timeline({
			delay,
			onComplete: () => {
				gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: 'none' })
				gsap.set(contentRef.current, { clearProps: 'opacity' })
				lockedRef.current = false
				pendingPathRef.current = null
			},
		})
			.to(contentRef.current, { opacity: 1, duration: 0.32, ease: 'power2.out' }, 0)
			.to(overlayRef.current, { autoAlpha: 0, duration: 0.34, ease: 'power2.out' }, 0)
	}

	useEffect(() => {
		router.prefetch('/')
		router.prefetch('/sites')
		router.prefetch('/blog')
	}, [router])

	useEffect(() => {
		const onDocumentClick = (event: MouseEvent) => {
			if (event.defaultPrevented || isModifiedClick(event) || lockedRef.current) return

			const target = event.target
			if (!(target instanceof Element)) return
			const anchor = target.closest('a') as HTMLAnchorElement | null
			if (!anchor || anchor.hasAttribute('download') || anchor.dataset.noTransition !== undefined) return
			if (anchor.target && anchor.target !== '_self') return

			const url = new URL(anchor.href, window.location.href)
			if (url.origin !== window.location.origin) return
			if (url.hash && url.pathname === window.location.pathname && url.search === window.location.search) return

			const fromSide = getPageSide(pathname)
			const toSide = getPageSide(url.pathname)
			if (fromSide === 'other' || toSide === 'other' || fromSide === toSide) return
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

			event.preventDefault()
			lockedRef.current = true
			pendingPathRef.current = url.pathname
			timelineRef.current?.kill()

			const from = SPLIT_POSITION[fromSide]
			const to = SPLIT_POSITION[toSide]
			const homeHero = fromSide === 'home'
				? document.querySelector<HTMLElement>('[data-hero]')
				: null
			const splitIsVisible = !homeHero || homeHero.getBoundingClientRect().bottom > 80
			const useDestinationWipe = fromSide === 'home' && !splitIsVisible && toSide !== 'home'
			const split = { value: from }
			const wipe = { value: 0 }
			if (useDestinationWipe) setDestinationWipe(toSide, 0)
			else setSplit(from)
			gsap.set(overlayRef.current, {
				autoAlpha: useDestinationWipe ? 1 : 0,
				pointerEvents: 'auto',
			})
			gsap.set(contentRef.current, { opacity: 1 })

			timelineRef.current = gsap.timeline({
				onComplete: () => {
					router.push(`${url.pathname}${url.search}${url.hash}`)
					fallbackRef.current = setTimeout(() => revealPage(0), 4000)
				},
			})
				.to(overlayRef.current, { autoAlpha: 1, duration: useDestinationWipe ? 0.01 : 0.16, ease: 'power1.out' }, 0)
				.to(contentRef.current, {
					opacity: useDestinationWipe ? 1 : 0.18,
					duration: 0.2,
					ease: 'power1.out',
				}, 0)
				.to(useDestinationWipe ? wipe : split, {
					value: useDestinationWipe ? 100 : to,
					duration: 0.82,
					ease: 'power3.inOut',
					onUpdate: () => {
						if (useDestinationWipe) setDestinationWipe(toSide, wipe.value)
						else setSplit(split.value)
					},
				}, 0.12)
		}

		document.addEventListener('click', onDocumentClick, true)
		return () => document.removeEventListener('click', onDocumentClick, true)
	}, [pathname, router])

	useLayoutEffect(() => {
		const previousPath = previousPathRef.current
		if (previousPath === pathname) return

		const fromSide = getPageSide(previousPath)
		const toSide = getPageSide(pathname)
		previousPathRef.current = pathname

		if (pendingPathRef.current === pathname) {
			revealPage()
			return
		}

		// Browser back/forward: recreate the same spatial movement before revealing
		// the route that has already been committed by Next.js.
		if (
			fromSide !== 'other' &&
			toSide !== 'other' &&
			fromSide !== toSide &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			lockedRef.current = true
			timelineRef.current?.kill()
			const split = { value: SPLIT_POSITION[fromSide] }
			setSplit(split.value)
			gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: 'auto' })
			gsap.set(contentRef.current, { opacity: 0.18 })
			timelineRef.current = gsap.timeline({ onComplete: () => revealPage(0) }).to(split, {
				value: SPLIT_POSITION[toSide],
				duration: 0.72,
				ease: 'power3.inOut',
				onUpdate: () => setSplit(split.value),
			})
		}
	}, [pathname])

	useEffect(() => () => {
		timelineRef.current?.kill()
		if (fallbackRef.current) clearTimeout(fallbackRef.current)
	}, [])

	return (
		<>
			<div ref={contentRef} data-route-content>
				{children}
			</div>

			<div
				ref={overlayRef}
				className='pointer-events-none fixed inset-0 z-[10000] invisible opacity-0'
				aria-hidden='true'
			>
				<div ref={blackPanelRef} className='absolute bg-[#111111]' />
				<div ref={whitePanelRef} className='absolute bg-[#faf9f7]' />
				<div
					ref={seamRef}
					className='absolute bg-red-600/80 shadow-[0_0_28px_rgba(220,38,38,0.28)]'
				/>
			</div>
		</>
	)
}
