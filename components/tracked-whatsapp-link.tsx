'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

type TrackedWhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children: ReactNode
	location: string
}

export const SITE_WHATSAPP_URL =
	'https://wa.me/5511983701618?text=Ol%C3%A1%2C%20Glauco%21%20Vi%20sua%20p%C3%A1gina%20de%20cria%C3%A7%C3%A3o%20de%20sites%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.'

export function TrackedWhatsAppLink({
	children,
	location,
	onClick,
	...props
}: TrackedWhatsAppLinkProps) {
	function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
		const gtag = (window as Window & {
			gtag?: (...args: unknown[]) => void
		}).gtag

		gtag?.('event', 'generate_lead', {
			event_category: 'sites',
			event_label: location,
			contact_method: 'whatsapp',
		})

		onClick?.(event)
	}

	return (
		<a
			{...props}
			href={props.href ?? SITE_WHATSAPP_URL}
			target={props.target ?? '_blank'}
			rel={props.rel ?? 'noopener noreferrer'}
			onClick={handleClick}
		>
			{children}
		</a>
	)
}
