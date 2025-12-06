import { getPayload } from 'payload'
import config from '@/payload.config'
import { HeroSection } from '@/components/landing/hero-section'
import { AboutSection } from '@/components/landing/about-section'
import { ScheduleSection } from '@/components/landing/schedule-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Bonzai MMA Club - Profesjonalne treningi sztuk walki',
  description: 'Dołącz do najlepszego klubu MMA w mieście',
}

export default async function LandingPage() {
  const payload = await getPayload({ config })

  // Pobierz wszystkie rodzaje zajęć
  const { docs: trainingClasses } = await payload.find({
    collection: 'training-classes',
    limit: 100,
  })

  // Pobierz harmonogram
  const schedule = await payload.findGlobal({
    slug: 'schedule',
    depth: 2, // Pobierz relacje (trainingClass, trainer)
  })

  // Pobierz wideo tła z Media collection
  const { docs: backgroundVideos } = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: 'background.mp4',
      },
    },
    limit: 1,
  })

  const backgroundVideo = backgroundVideos[0] || null
  const videoUrl = backgroundVideo?.url || null

  // Utwórz mapę training classes dla szybkiego dostępu
  const trainingClassesMap = new Map(
    trainingClasses.map((tc) => [tc.id, { name: tc.name, level: tc.level }]),
  )

  return (
    <div className="min-h-screen">
      <HeroSection videoUrl={videoUrl} />
      <AboutSection />
      <ScheduleSection schedule={schedule} trainingClassesMap={trainingClassesMap} />
      <CTASection />
      <Footer />
    </div>
  )
}
