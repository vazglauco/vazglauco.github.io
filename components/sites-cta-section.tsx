import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const SERVICES = ['Landing pages', 'Sites institucionais', 'E-commerce']

export function SitesCTASection() {
	return (
		<section id='sites' className='scroll-mt-24 bg-[#8f211b] px-6 py-20 text-white md:px-12 md:py-28 lg:px-20'>
			<div className='mx-auto max-w-7xl border-y border-white/25 py-12 md:py-16'>
				<div className='grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end'>
					<div>
						<p className='mb-5 font-mono text-xs uppercase tracking-[0.28em] text-white/70'>
							// seu próximo projeto
						</p>
						<h2 className='max-w-[10ch] text-[3rem] font-black uppercase leading-[0.88] tracking-tight md:text-[5rem] lg:text-[6.5rem]'>
							Precisa de um site<span className='text-black'>?</span>
						</h2>
					</div>

					<div className='lg:pb-2'>
						<p className='max-w-[42rem] text-base leading-loose text-white/85 md:text-lg'>
							Transformo sua ideia em uma presença digital profissional — do visual à publicação — com um projeto pensado para o seu negócio.
						</p>

						<div className='my-8 flex flex-wrap gap-2'>
							{SERVICES.map((service) => (
								<span key={service} className='border border-white/35 px-3 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider'>
									{service}
								</span>
							))}
						</div>

						<Link
							href='/sites'
							className='group inline-flex items-center gap-3 bg-black px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
						>
							Conheça meu trabalho
							<ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
