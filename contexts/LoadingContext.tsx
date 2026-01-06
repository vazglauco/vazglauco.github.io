"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type LoadingPhase =
  | "initial"           // Black screen
  | "zoom-in"          // Card zooming in
  | "spin"             // Card spinning (Mario coin)
  | "move-to-position" // Card moving to final position
  | "settling"         // 1s wait after positioning
  | "typing"           // Typewriter effects running
  | "complete"         // Everything done, infinite animations active

interface LoadingConfig {
  zoomInDuration: number
  spinDuration: number
  moveToPositionDuration: number
  settlingDelay: number
}

interface LoadingContextType {
  phase: LoadingPhase
  setPhase: (phase: LoadingPhase) => void
  config: LoadingConfig
  isLoadingComplete: boolean
}

const defaultConfig: LoadingConfig = {
  zoomInDuration: 1,
  spinDuration: 3,
  moveToPositionDuration: 1,
  settlingDelay: 1
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<LoadingPhase>("initial")
  const [config] = useState<LoadingConfig>(defaultConfig)

  const isLoadingComplete = phase === "complete"

  return (
    <LoadingContext.Provider value={{ phase, setPhase, config, isLoadingComplete }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider")
  }
  return context
}
