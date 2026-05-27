'use client'

import { Download } from 'lucide-react'

export function ResumeCTAStrip() {
	return (
		<div className="relative bg-neutral-600 h-[35vh] px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
			{/* Background accent line */}
			<div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500" />

			<div className="flex flex-col gap-2">
				<span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
					Quer saber mais?
				</span>
				<h2 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-black tracking-tight leading-none text-white uppercase">
					Veja meu{' '}
					<span className="text-amber-500">currículo</span>
					<span className="text-neutral-600">.</span>
				</h2>
			</div>

			<a
				href="/curriculo-glauco-vaz.pdf"
				download="Curriculo-Glauco-Vaz.pdf"
				className="group flex items-center gap-3 px-8 py-4 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-200 font-bold text-sm uppercase tracking-widest shrink-0"
			>
				<Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
				Download PDF
			</a>
		</div>
	)
}
