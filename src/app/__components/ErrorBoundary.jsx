'use client'
import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}) {
  useEffect(() => {
    if (isDebugMode()) {
      console.error('Error:', error)
    }
  }, [error])

  return (
    <div className="p-4">
      <h2 className="text-red-500 text-xl">Something went wrong!</h2>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  )
} 