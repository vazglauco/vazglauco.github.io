"use client"

import { HeroCard } from "@/components/hero/HeroCard"
import { HeroContent } from "@/components/hero/HeroContent"

export function HeroSection() {
  return (
    <section id="sobre" className="min-h-screen h-screen flex items-center justify-center bg-background relative snap-start snap-always py-8 md:py-0">
      <div className="w-full max-w-8xl mx-auto flex items-center justify-center gap-8 md:gap-12 lg:gap-20 xl:gap-32 px-4 md:px-8 lg:px-12">
        <HeroContent />
        <HeroCard />
      </div>
    </section>
  )
}
