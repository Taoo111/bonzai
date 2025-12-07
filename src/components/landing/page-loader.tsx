'use client'

import { useEffect, useState } from 'react'

interface PageLoaderProps {
  onLoadComplete: () => void
  videoUrl?: string | null
}

export function PageLoader({ onLoadComplete, videoUrl }: PageLoaderProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!videoUrl) {
      // Jeśli nie ma wideo, od razu pokaż stronę
      setLoading(false)
      onLoadComplete()
      return
    }

    // Utwórz wideo element do preload
    const video = document.createElement('video')
    video.src = videoUrl
    video.muted = true
    video.preload = 'auto'
    video.playsInline = true

    const handleCanPlay = () => {
      setLoading(false)
      onLoadComplete()
    }

    const handleError = () => {
      // Jeśli wideo się nie załaduje, pokaż stronę z fallbackiem
      setLoading(false)
      onLoadComplete()
    }

    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('error', handleError)

    // Rozpocznij ładowanie
    video.load()

    // Timeout - jeśli wideo nie załaduje się w 5 sekund, pokaż stronę
    const timeout = setTimeout(() => {
      setLoading(false)
      onLoadComplete()
    }, 5000)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('error', handleError)
      clearTimeout(timeout)
    }
  }, [videoUrl, onLoadComplete])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
          <img
            src="/bonzai-logo.png"
            alt="Bonzai MMA"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Loader */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}

