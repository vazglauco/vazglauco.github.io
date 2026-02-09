"use client"

import { SplitHome } from "@/components/split-home"
import { AboutMeSection } from "@/components/about-me-section"
import { SkillsPanel } from "@/components/skills-panel"
import { ServicesSection } from "@/components/services-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { HorizontalScrollLayout } from "@/components/horizontal-scroll-layout"

export default function Home() {
  return (
    <>
      <HorizontalScrollLayout extraScrollVh={150}>
        <SplitHome />
        <AboutMeSection />
      </HorizontalScrollLayout>
      <HorizontalScrollLayout>
        <SkillsPanel />
        <ServicesSection />
      </HorizontalScrollLayout>
      <ExperienceTimeline />
    </>
  )
}
