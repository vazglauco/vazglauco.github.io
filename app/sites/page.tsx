import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
	ArrowDown,
	ArrowUpRight,
	Check,
	ChevronDown,
	Code2,
	LayoutTemplate,
	Rocket,
	ShoppingBag,
} from 'lucide-react'
import { ProjectsBento } from '@/components/projects-bento'
import { TrackedWhatsAppLink } from '@/components/tracked-whatsapp-link'
import { SitesHeroCard } from '@/components/sites-hero-card'

export const metadata: Metadata = {
	title: 'Criação de sites para negócios — Glauco Vaz',
	description:
		'Landing pages, sites institucionais e e-commerces com design sob medida, desenvolvimento responsivo e publicação. Solicite um orçamento.',
	keywords: [
		'criação de sites',
		'desenvolvimento de sites',
		'landing page',
		'site institucional',
		'e-commerce',
		'São Paulo',
	],
	openGraph: {
		title: 'Sites que transformam visitas em oportunidades — Glauco Vaz',
		description:
			'Design, desenvolvimento e publicação de landing pages, sites institucionais e e-commerces para pequenos negócios.',
		type: 'website',
	},
}

const SERVICES = [
	{
		number: '01',
		icon: Rocket,
		title: 'Landing Page',
		description:
			'Uma página direta e estratégica para apresentar sua oferta, lançar uma ideia ou transformar campanhas em contatos.',
		items: ['Mensagem focada em conversão', 'Seções sob medida', 'Integração com seus canais'],
	},
	{
		number: '02',
		icon: LayoutTemplate,
		title: 'Site Institucional',
		description:
			'Uma presença digital completa para comunicar sua marca, seus serviços e a confiança que o seu negócio já entrega.',
		items: ['Arquitetura de páginas', 'Identidade aplicada ao digital', 'Base preparada para crescer'],
	},
	{
		number: '03',
		icon: ShoppingBag,
		title: 'E-commerce',
		description:
			'Uma loja virtual clara e fácil de usar, planejada para organizar produtos e tornar a jornada de compra mais simples.',
		items: ['Catálogo e navegação', 'Fluxo de compra responsivo', 'Integrações definidas no projeto'],
	},
]

const DIFFERENTIALS = [
	{
		number: '01',
		title: 'Design sob medida',
		text: 'O visual nasce do contexto da sua marca e do objetivo do projeto — sem aparência de template genérico.',
	},
	{
		number: '02',
		title: 'Responsivo de verdade',
		text: 'A experiência é construída para funcionar bem em celulares, tablets e computadores.',
	},
	{
		number: '03',
		title: 'Desenvolvimento completo',
		text: 'Interface, código e integrações são tratados como uma entrega única, com atenção a desempenho e acessibilidade.',
	},
	{
		number: '04',
		title: 'Publicação e suporte',
		text: 'Eu acompanho a entrada no ar e ofereço suporte inicial; condições e serviços de terceiros ficam claros na proposta.',
	},
]

const PROCESS = [
	{
		number: '01',
		title: 'Conversa',
		text: 'Entendo seu negócio, o público, o objetivo do site e o que precisa ser comunicado.',
	},
	{
		number: '02',
		title: 'Proposta',
		text: 'Você recebe escopo, investimento, prazo e responsabilidades definidos antes de começarmos.',
	},
	{
		number: '03',
		title: 'Criação',
		text: 'Design e desenvolvimento avançam com pontos de alinhamento para manter o projeto na direção certa.',
	},
	{
		number: '04',
		title: 'Entrega',
		text: 'Depois da revisão final, o site é publicado e você recebe o suporte inicial combinado.',
	},
]

const FAQ = [
	{
		question: 'Quanto custa criar um site?',
		answer:
			'O investimento depende do tipo de site, quantidade de páginas, conteúdo e integrações necessárias. Depois da conversa inicial, preparo uma proposta com escopo e valor definidos.',
	},
	{
		question: 'Em quanto tempo o site fica pronto?',
		answer:
			'O prazo varia conforme a complexidade e a disponibilidade dos materiais. A estimativa e as etapas de entrega ficam registradas na proposta antes do início.',
	},
	{
		question: 'Quem prepara os textos e as imagens?',
		answer:
			'Você pode fornecer o material existente e eu ajudo a organizá-lo para o site. Caso seja necessária uma produção específica de conteúdo, isso é alinhado no escopo.',
	},
	{
		question: 'Domínio e hospedagem estão incluídos?',
		answer:
			'Eu posso orientar a escolha e cuidar da configuração, mas domínio, hospedagem e outros serviços pagos pertencem ao cliente e têm seus custos descritos separadamente.',
	},
	{
		question: 'O que acontece depois da publicação?',
		answer:
			'A entrega inclui um período inicial de suporte, definido na proposta, para acompanhar a entrada no ar. Necessidades contínuas podem ser combinadas à parte.',
	},
]

const clinicDemoHref = 'https://demo-clinica-five.vercel.app/'

export default function SitesPage() {
	return (
		<>
			<section
				id='sites-inicio'
				data-hero
				className='relative flex min-h-screen items-center overflow-hidden bg-[#111111] px-6 pb-20 pt-28 text-white md:px-12 md:pb-24 md:pt-32 lg:px-20'
			>
				<div className='pointer-events-none absolute inset-0' aria-hidden='true'>
					<div className='absolute -right-24 top-20 h-72 w-72 rounded-full border border-red-500/20 md:h-[30rem] md:w-[30rem]' />
					<div className='absolute -right-6 top-40 h-72 w-72 rounded-full border border-white/10 md:h-[30rem] md:w-[30rem]' />
					<div className='absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-red-500 via-white/20 to-transparent' />
				</div>

				<div className='relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end'>
					<div>
						<p className='mb-6 font-mono text-xs uppercase tracking-[0.28em] text-neutral-400'>
							<span className='text-red-500'>// </span>
							criação de sites para negócios
						</p>
						<h1 className='max-w-[12ch] text-[3.2rem] font-black uppercase leading-[0.86] tracking-tight md:text-[5.5rem] lg:text-[7rem]'>
							Seu negócio merece um site que trabalhe por ele<span className='text-red-500'>.</span>
						</h1>
					</div>

					<div className='lg:pb-2'>
						<div className='relative mx-auto mb-8 h-64 w-44 md:h-72 md:w-52 lg:h-80 lg:w-56'>
							<SitesHeroCard />
						</div>
						<p className='max-w-[42rem] text-base leading-loose text-neutral-300 md:text-lg'>
							Crio sites profissionais do design à publicação, com clareza, desempenho e uma experiência que apresenta o valor do seu negócio.
						</p>
						<div className='mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center'>
							<TrackedWhatsAppLink
								location='hero'
								className='group inline-flex items-center gap-3 bg-[#8f211b] px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500'
							>
								Solicitar orçamento
								<ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
							</TrackedWhatsAppLink>
							<a
								href='#servicos-sites'
								className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
							>
								Ver possibilidades <ArrowDown className='h-4 w-4' />
							</a>
						</div>
						<nav aria-label='Explorar criação de sites' className='mt-10 flex w-fit border border-white/20 font-mono text-[0.65rem] font-bold uppercase tracking-widest'>
							<a href='#servicos-sites' className='border-r border-white/20 px-4 py-3 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>Serviços</a>
							<a href='#templates-sites' className='px-4 py-3 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>Templates</a>
						</nav>
						<p className='mt-7 font-mono text-[0.65rem] uppercase tracking-wider text-neutral-500'>
							Landing pages <span className='text-red-500'>·</span> Sites institucionais <span className='text-red-500'>·</span> E-commerce
						</p>
					</div>
				</div>
			</section>

			<section id='servicos-sites' className='scroll-mt-20 bg-[#faf9f7] px-6 py-20 md:px-12 md:py-28 lg:px-20'>
				<div className='mx-auto max-w-7xl'>
					<header className='mb-12 grid gap-6 lg:grid-cols-2 lg:items-end'>
						<div>
							<p className='mb-4 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500'>
								<span className='text-red-500'>// </span>formatos
							</p>
							<h2 className='text-[2.7rem] font-black uppercase leading-[0.9] tracking-tight text-black md:text-[4.5rem]'>
								O site certo para o seu momento<span className='text-red-500'>.</span>
							</h2>
						</div>
						<p className='max-w-[42rem] text-base leading-loose text-neutral-600 md:text-lg lg:justify-self-end'>
							Cada projeto parte do objetivo do negócio. A solução pode ser uma página focada, uma presença institucional completa ou uma operação de vendas online.
						</p>
					</header>

					<div className='grid border-l border-t border-neutral-200 lg:grid-cols-3'>
						{SERVICES.map(({ number, icon: Icon, title, description, items }) => (
							<article key={title} className='group border-b border-r border-neutral-200 bg-white p-7 transition-colors hover:bg-neutral-950 md:p-9'>
								<div className='mb-12 flex items-center justify-between'>
									<span className='font-mono text-xs text-red-500'>({number})</span>
									<Icon className='h-7 w-7 text-neutral-300 transition-colors group-hover:text-red-500' strokeWidth={1.5} />
								</div>
								<h3 className='text-2xl font-black uppercase tracking-tight text-black transition-colors group-hover:text-white md:text-3xl'>
									{title}<span className='text-red-500'>.</span>
								</h3>
								<p className='mt-5 min-h-[7rem] text-sm leading-relaxed text-neutral-600 transition-colors group-hover:text-neutral-300'>
									{description}
								</p>
								<ul className='mt-7 divide-y divide-neutral-200 border-t border-neutral-200 group-hover:divide-neutral-800 group-hover:border-neutral-800'>
									{items.map((item) => (
										<li key={item} className='flex items-center gap-3 py-3 text-xs font-bold text-neutral-600 transition-colors group-hover:text-neutral-300'>
											<Check className='h-3.5 w-3.5 shrink-0 text-red-500' /> {item}
										</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</div>
			</section>

			<section id='templates-sites' className='scroll-mt-20 bg-[#f2f0ed] px-6 py-20 md:px-12 md:py-28 lg:px-20'>
				<div className='mx-auto max-w-7xl'>
					<header className='mb-12 grid gap-6 lg:grid-cols-2 lg:items-end'>
						<div>
							<p className='mb-4 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500'><span className='text-red-500'>// </span>templates</p>
							<h2 className='text-[2.7rem] font-black uppercase leading-[0.9] tracking-tight text-black md:text-[4.5rem]'>Uma base pronta para começar<span className='text-red-500'>.</span></h2>
						</div>
						<p className='max-w-[42rem] text-base leading-loose text-neutral-600 md:text-lg lg:justify-self-end'>
							Conheça modelos de site que podem ser adaptados à identidade e às necessidades do seu negócio.
						</p>
					</header>

					<article className='grid overflow-hidden border border-neutral-200 bg-white lg:grid-cols-[1.1fr_0.9fr]'>
						<a href={clinicDemoHref} target='_blank' rel='noopener noreferrer' aria-label='Abrir a demonstração do template de clínicas' className='group relative block min-h-72 overflow-hidden bg-[#e8e7e4] md:min-h-[25rem]'>
							<Image src='/templates/clinica-editorial.webp' alt='Prévia da versão editorial do site de clínica Lumina, com chamada sobre estética facial e imagem de atendimento' fill sizes='(max-width: 1024px) 100vw, 55vw' className='object-contain transition-transform duration-500 group-hover:scale-[1.02]' />
							<span className='absolute bottom-4 left-4 bg-[#111111] px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-white md:bottom-6 md:left-6'>Prévia real · versão editorial</span>
						</a>
						<div className='flex flex-col justify-between p-7 md:p-10'>
							<div>
								<p className='font-mono text-[0.65rem] uppercase tracking-[0.24em] text-red-600'>Demo disponível</p>
								<h3 className='mt-6 text-3xl font-black uppercase leading-none tracking-tight text-black md:text-4xl'>Um ponto de partida para sua clínica<span className='text-red-500'>.</span></h3>
								<p className='mt-6 text-sm leading-loose text-neutral-600 md:text-base'>Explore quatro direções de site para clínicas e profissionais da saúde. A prévia mostra a versão editorial; a demo permite conhecer as outras opções.</p>
							</div>
							<div className='mt-10 border-t border-neutral-200 pt-6'>
								<a href={clinicDemoHref} target='_blank' rel='noopener noreferrer' className='group inline-flex items-center gap-3 bg-[#8f211b] px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500'>
									Ver demo <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
								</a>
							</div>
						</div>
					</article>
				</div>
			</section>

			<section className='bg-[#111111] px-6 py-20 text-white md:px-12 md:py-28 lg:px-20'>
				<div className='mx-auto max-w-7xl'>
					<div className='grid gap-14 lg:grid-cols-[0.72fr_1.28fr]'>
						<div>
							<Code2 className='mb-7 h-10 w-10 text-red-500' strokeWidth={1.5} />
							<p className='mb-4 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500'>// entrega completa</p>
							<h2 className='text-[2.7rem] font-black uppercase leading-[0.9] tracking-tight md:text-[4.25rem]'>
								Do primeiro rascunho ao site no ar<span className='text-red-500'>.</span>
							</h2>
							<div className='relative mx-auto mt-10 h-64 w-full max-w-72 md:mt-12 md:h-80 lg:mx-0 lg:mt-16 lg:max-w-80' aria-hidden='true'>
								<Image
									src='/ilustra_trampos.webp'
									alt=''
									fill
									sizes='(max-width: 768px) 288px, 320px'
									className='scale-[1.25] object-contain object-bottom'
								/>
							</div>
						</div>

						<div className='grid border-l border-t border-neutral-800 sm:grid-cols-2'>
							{DIFFERENTIALS.map((item) => (
								<article key={item.title} className='border-b border-r border-neutral-800 p-7 md:p-9'>
									<span className='font-mono text-[0.65rem] text-red-500'>({item.number})</span>
									<h3 className='mt-8 text-xl font-black uppercase tracking-tight md:text-2xl'>{item.title}</h3>
									<p className='mt-4 text-sm leading-relaxed text-neutral-400'>{item.text}</p>
								</article>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className='bg-white px-6 py-20 md:px-12 md:py-28 lg:px-20'>
				<div className='mx-auto max-w-7xl'>
					<header className='mb-12 max-w-3xl'>
						<p className='mb-4 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500'>
							<span className='text-red-500'>// </span>como funciona
						</p>
						<h2 className='text-[2.7rem] font-black uppercase leading-[0.9] tracking-tight text-black md:text-[4.5rem]'>
							Um processo claro, sem mistério<span className='text-red-500'>.</span>
						</h2>
					</header>

					<ol className='border-t border-neutral-200'>
						{PROCESS.map((step) => (
							<li key={step.title} className='grid gap-4 border-b border-neutral-200 py-7 md:grid-cols-[5rem_0.7fr_1.3fr] md:items-baseline md:gap-8 md:py-9'>
								<span className='font-mono text-xs text-red-500'>({step.number})</span>
								<h3 className='text-2xl font-black uppercase tracking-tight text-black md:text-3xl'>{step.title}</h3>
								<p className='max-w-[48rem] text-sm leading-relaxed text-neutral-600 md:text-base'>{step.text}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<ProjectsBento />

			<section className='bg-white px-6 py-20 md:px-12 md:py-28 lg:px-20'>
				<div className='mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]'>
					<div>
						<p className='mb-4 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500'>
							<span className='text-red-500'>// </span>dúvidas frequentes
						</p>
						<h2 className='text-[2.7rem] font-black uppercase leading-[0.9] tracking-tight text-black md:text-[4.25rem]'>
							Antes de começar<span className='text-red-500'>.</span>
						</h2>
					</div>

					<div className='border-t border-neutral-200'>
						{FAQ.map((item) => (
							<details key={item.question} className='group border-b border-neutral-200'>
								<summary className='flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-bold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 [&::-webkit-details-marker]:hidden'>
									{item.question}
									<ChevronDown className='h-5 w-5 shrink-0 text-red-500 transition-transform group-open:rotate-180' />
								</summary>
								<p className='max-w-[52rem] pb-6 pr-10 text-sm leading-loose text-neutral-600'>{item.answer}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className='overflow-hidden bg-[#8f211b] px-6 py-20 text-white md:px-12 md:py-28 lg:px-20'>
				<div className='mx-auto grid max-w-7xl gap-10 border-y border-white/25 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
					<div className='relative z-10'>
						<p className='mb-5 font-mono text-xs uppercase tracking-[0.28em] text-white/70'>// vamos conversar</p>
						<h2 className='max-w-[10ch] text-[3rem] font-black uppercase leading-[0.88] tracking-tight md:text-[5rem] lg:text-[6rem]'>
							Vamos colocar seu site no ar<span className='text-black'>.</span>
						</h2>
						<p className='mb-8 mt-8 max-w-[38rem] text-base leading-loose text-white/85 md:text-lg'>
							Conte um pouco sobre o seu negócio. A primeira conversa é para entender a ideia e indicar o melhor caminho, sem compromisso.
						</p>
						<TrackedWhatsAppLink
							location='final_cta'
							className='group inline-flex items-center gap-3 bg-black px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
						>
							Solicitar orçamento
							<ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
						</TrackedWhatsAppLink>
					</div>
					<div className='relative mx-auto h-72 w-full max-w-sm md:h-96 lg:-my-16 lg:h-[38rem] lg:max-w-none' aria-hidden='true'>
						<Image
							src='/ilustra_contato.webp'
							alt=''
							fill
							sizes='(max-width: 768px) 384px, (max-width: 1024px) 480px, 560px'
							className='object-contain object-bottom'
						/>
					</div>
				</div>
			</section>

			<footer className='flex flex-col gap-4 border-t border-white/10 bg-[#111111] px-6 py-7 font-mono text-[0.65rem] text-neutral-500 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20'>
				<p>© {new Date().getFullYear()} Glauco Vaz · Todos os direitos reservados.</p>
				<Link href='/' className='inline-flex items-center gap-2 uppercase tracking-widest transition-colors hover:text-white'>
					Ver portfólio <ArrowUpRight className='h-3.5 w-3.5' />
				</Link>
			</footer>
		</>
	)
}
