import { SplitHome } from '@/components/split-home'
import { AboutMeSection } from '@/components/about-me-section'
import { SkillsServicesSection } from '@/components/skills-services-section'
import { SkillsMarquee } from '@/components/skills-marquee'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { ProjectsSection } from '@/components/projects-section'
import { LatestPostsSection } from '@/components/latest-posts-section'
import { ResumeCTAStrip } from '@/components/resume-cta-strip'
import { ContactFooter } from '@/components/contact-footer'
import { getAllPosts } from '@/lib/blog'

export default function Home() {
	const latestPosts = getAllPosts().slice(0, 3)

	return (
		<>
			<div className="h-screen relative overflow-hidden">
				<SplitHome />
				<SkillsMarquee />
			</div>
			<AboutMeSection />
			<SkillsServicesSection />
			<ProjectsSection />
			<ExperienceTimeline />
			<LatestPostsSection posts={latestPosts} />

			<ResumeCTAStrip />
		<div className="post-snap-section">
				<ContactFooter />
			</div>
		</>
	)
}
