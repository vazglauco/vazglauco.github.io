'use client'

import { SplitHome } from '@/components/split-home'
import { AboutMeSection } from '@/components/about-me-section'
import { SkillsServicesSection } from '@/components/skills-services-section'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { ProjectsSection } from '@/components/projects-section'
import { ResumeCTAStrip } from '@/components/resume-cta-strip'
import { ContactFooter } from '@/components/contact-footer'

export default function Home() {
	return (
		<>
			<div className="snap-container">
				<SplitHome />
				<AboutMeSection />
				<SkillsServicesSection />
				<ProjectsSection />
				<ExperienceTimeline />
			</div>
			<div className="post-snap-section">
				<ResumeCTAStrip />
				<ContactFooter />
			</div>
		</>
	)
}
