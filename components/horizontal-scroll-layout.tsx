"use client"

import { useRef, useEffect, Children, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HorizontalScrollLayoutProps {
  children: React.ReactNode
  extraScrollVh?: number
  className?: string
}

export function HorizontalScrollLayout({
  children,
  extraScrollVh = 0,
  className = ""
}: HorizontalScrollLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const childArray = Children.toArray(children)
    const panelCount = childArray.length

    if (panelCount < 1) return

    const vw = window.innerWidth
    const vh = window.innerHeight

    const horizontalScrollDistance = (panelCount - 1) * vw
    const extraScrollDistance = (extraScrollVh / 100) * vh
    const totalScrollDistance = horizontalScrollDistance + extraScrollDistance

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScrollDistance}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    if (horizontalScrollDistance > 0) {
      tl.to(track, {
        x: -horizontalScrollDistance,
        duration: horizontalScrollDistance,
        ease: "none",
      })
    }

    if (extraScrollDistance > 0) {
      tl.to({}, { duration: extraScrollDistance })
    }

    let updateScrollBounds: (() => void) | null = null
    if (extraScrollDistance > 0) {
      updateScrollBounds = () => {
        const st = tl.scrollTrigger
        if (!st) return
        container.dataset.extraScrollStart = String(Math.round(st.start + horizontalScrollDistance))
        container.dataset.extraScrollEnd = String(Math.round(st.end))
      }
      setTimeout(updateScrollBounds, 100)
      ScrollTrigger.addEventListener("refresh", updateScrollBounds)
    }

    return () => {
      if (updateScrollBounds) {
        ScrollTrigger.removeEventListener("refresh", updateScrollBounds)
      }
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [children, extraScrollVh, isMobile])

  const childArray = Children.toArray(children)
  const panelCount = childArray.length

  if (isMobile) {
    return (
      <div className={className}>
        {childArray.map((child, index) => (
          <div key={index} className="min-h-screen">
            {child}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={trackRef}
        className="flex flex-nowrap"
        style={{ width: `${panelCount * 100}vw` }}
      >
        {childArray.map((child, index) => (
          <div
            key={index}
            className="w-screen h-screen flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
