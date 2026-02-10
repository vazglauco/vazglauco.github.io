"use client"

import { useRef, useEffect, Children } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HorizontalScrollLayoutProps {
  children: React.ReactNode[]
  /** Extra scroll distance (in vh units) for internal panel animations (e.g. text scroll). */
  extraScrollVh?: number
}

/**
 * Horizontal scroll layout with support for internal panel animations.
 *
 * Phase 1: horizontal slide between panels (driven by scroll)
 * Phase 2: panels with internal scroll keep the track still while
 *          extra scroll continues (panels read window.scrollY for their animations)
 */
export function HorizontalScrollLayout({ children, extraScrollVh = 0 }: HorizontalScrollLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const panelCount = Children.count(children)
    if (panelCount <= 1) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const transitionScroll = (panelCount - 1) * vw
    const extraScroll = (extraScrollVh / 100) * vh
    const totalScroll = transitionScroll + extraScroll

    // Timeline: horizontal transition takes a portion, rest is for internal animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.8,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      },
    })

    // Horizontal slide: only during the transition portion
    tl.to(track, {
      x: -transitionScroll,
      duration: transitionScroll,
      ease: "none",
    })

    // Extra scroll time: track stays still, scroll continues
    if (extraScroll > 0) {
      tl.to({}, { duration: extraScroll })
    }

    // Expose extra-scroll boundaries as data attributes for child components
    let updateHslAttrs: (() => void) | null = null
    if (extraScroll > 0) {
      updateHslAttrs = () => {
        const st = tl.scrollTrigger
        if (!st) return
        container.dataset.hslExtraStart = String(Math.round(st.start + transitionScroll))
        container.dataset.hslExtraEnd = String(Math.round(st.end))
      }
      setTimeout(updateHslAttrs, 100)
      ScrollTrigger.addEventListener("refresh", updateHslAttrs)
    }

    return () => {
      if (updateHslAttrs) ScrollTrigger.removeEventListener("refresh", updateHslAttrs)
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [children, extraScrollVh])

  const panelCount = Children.count(children)

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-nowrap"
        style={{ width: `${panelCount * 100}vw` }}
      >
        {Children.map(children, (child, i) => (
          <div key={i} className="w-screen h-screen flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
