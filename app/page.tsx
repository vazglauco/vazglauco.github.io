import { SplitHome } from '@/components/split-home'
import { AboutMeSection } from '@/components/about-me-section'
import { SkillsServicesSection } from '@/components/skills-services-section'
import { SkillsMarquee } from '@/components/skills-marquee'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { ProjectsBento } from '@/components/projects-bento'
import { LatestPostsSection } from '@/components/latest-posts-section'
import { ResumeCTAStrip } from '@/components/resume-cta-strip'
import { ContactFooter } from '@/components/contact-footer'
import { getAllPosts } from '@/lib/blog'

export default function Home() {
	const latestPosts = getAllPosts().slice(0, 3)

	return (
		<>
			<div data-hero className="relative md:min-h-screen md:overflow-hidden">
				<SplitHome />
				<div className="hidden md:block">
					<SkillsMarquee />
				</div>
			</div>
			<div className="md:hidden">
				<SkillsMarquee />
			</div>
			<AboutMeSection />
			<SkillsServicesSection />
			<ProjectsBento />
			<ExperienceTimeline />
			<LatestPostsSection posts={latestPosts} />

			<ResumeCTAStrip />
		<div className="post-snap-section">
				<ContactFooter />
			</div>
		</>
	)
}
