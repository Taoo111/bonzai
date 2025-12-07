'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/landing/hero-section'
import { AboutSection } from '@/components/landing/about-section'
import { TrainersSection } from '@/components/landing/trainers-section'
import { ScheduleSection } from '@/components/landing/schedule-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'
import { PageLoader } from '@/components/landing/page-loader'

interface LandingPageClientProps {
  videoUrl?: string | null
  trainers: any[]
  schedule: any
  trainingClassesMap: Map<number, { name: string; level?: string | null }>
}

export function LandingPageClient({
  videoUrl,
  trainers,
  schedule,
  trainingClassesMap,
}: LandingPageClientProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoadComplete = () => {
    setIsLoaded(true)
  }

  return (
    <>
      <PageLoader onLoadComplete={handleLoadComplete} videoUrl={videoUrl} />
      {isLoaded && (
        <div className="min-h-screen">
          <HeroSection videoUrl={videoUrl} />
          <AboutSection />
          <TrainersSection trainers={trainers} />
          <ScheduleSection schedule={schedule} trainingClassesMap={trainingClassesMap} />
          <CTASection />
          <Footer />
        </div>
      )}
    </>
  )
}

