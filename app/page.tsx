import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ProfileSection } from "@/components/profile-section"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { LanguagesSection } from "@/components/languages-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProfileSection />
        <ExperienceSection />
        <EducationSection />
        <LanguagesSection />
        <ContactSection />
      </main>
    </div>
  )
}
