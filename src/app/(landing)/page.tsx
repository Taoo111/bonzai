import { getPayload } from 'payload'
import config from '@/payload.config'
import { LandingPageClient } from '@/components/landing/landing-page-client'

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

  // Pobierz trenerów (użytkowników z rolą trainer)
  const { docs: trainers } = await payload.find({
    collection: 'users',
    where: {
      role: {
        equals: 'trainer',
      },
    },
    limit: 100,
    depth: 1, // Pobierz relację profileImage
  })

  // Utwórz mapę training classes dla szybkiego dostępu
  const trainingClassesMap = new Map(
    trainingClasses.map((tc) => [tc.id, { name: tc.name, level: tc.level }]),
  )

  return (
    <LandingPageClient
      videoUrl={videoUrl}
      trainers={trainers}
      schedule={schedule}
      trainingClassesMap={trainingClassesMap}
    />
  )
}
