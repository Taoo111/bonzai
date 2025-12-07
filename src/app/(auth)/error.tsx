'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Błąd autoryzacji</h2>
        <p className="text-zinc-400">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-zinc-200 transition-colors"
        >
          Spróbuj ponownie
        </button>
      </div>
    </div>
  )
}

