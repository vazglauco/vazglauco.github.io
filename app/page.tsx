'use client'

import { SplitHome } from '@/components/split-home'
import { AboutMeSection } from '@/components/about-me-section'
import { SkillsServicesSection } from '@/components/skills-services-section'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { ProjectsSection } from '@/components/projects-section'
import { BlogSection } from '@/components/blog-section'
import { ContactFooter } from '@/components/contact-footer'

export default function Home() {
	return (
		<div className="snap-container">
			<SplitHome />
			<AboutMeSection />
			<SkillsServicesSection />
			<ExperienceTimeline />
			<ProjectsSection />
			<BlogSection />
			<ContactFooter />
		</div>
	)
}
