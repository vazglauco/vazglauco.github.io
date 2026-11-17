'use client'

import { useEffect } from 'react'

type Gtag = (...args: unknown[]) => void

function classify(href: string): { method: string; lead: boolean } | null {
	if (href.includes('curriculo-glauco-vaz.pdf')) return { method: 'resume', lead: true }
	if (href.startsWith('mailto:')) return { method: 'email', lead: true }
	if (href.includes('wa.me/')) return { method: 'whatsapp', lead: true }
	if (href.includes('linkedin.com/')) return { method: 'linkedin', lead: false }
	if (href.includes('github.com/')) return { method: 'github', lead: false }
	return null
}

/** Registra no GA os cliques que interessam para quem recruta: currículo, e-mail, WhatsApp, LinkedIn e GitHub. */
export function ClickTracker() {
	useEffect(() => {
		const onClick = (event: MouseEvent) => {
			const target = event.target
			if (!(target instanceof Element)) return
			const anchor = target.closest('a')
			const href = anchor?.getAttribute('href')
			if (!anchor || !href) return

			const info = classify(href)
			if (!info) return

			const gtag = (window as Window & { gtag?: Gtag }).gtag
			const section = anchor.closest('[id]')?.id || (anchor.closest('[data-hero]') ? 'hero' : 'page')
			gtag?.('event', info.lead ? 'generate_lead' : 'select_content', {
				contact_method: info.method,
				content_type: info.method,
				event_label: section,
				link_url: href.startsWith('mailto:') ? 'mailto' : href,
			})
		}

		document.addEventListener('click', onClick)
		return () => document.removeEventListener('click', onClick)
	}, [])

	return null
}
