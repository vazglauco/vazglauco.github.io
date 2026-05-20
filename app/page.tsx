'use client'

import { SplitHome } from '@/components/split-home'
import { AboutMeSection } from '@/components/about-me-section'
import { SkillsPanel } from '@/components/skills-panel'
import { ServicesSection } from '@/components/services-section'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { ProjectsSection } from '@/components/projects-section'
import { BlogSection } from '@/components/blog-section'
import { ContactFooter } from '@/components/contact-footer'
import { HorizontalScrollLayout } from '@/components/horizontal-scroll-layout'

export default function Home() {
	return (
		<>
			<SplitHome />
			<AboutMeSection />

			<SkillsPanel />
			<ServicesSection />
			<ExperienceTimeline />
			<ProjectsSection />
			<BlogSection />
			<ContactFooter />
		</>
	)
}
