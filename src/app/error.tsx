'use client' // Error boundaries must be Client Components
 
import * as Sentry from "@sentry/nextjs"
import { useEffect } from 'react'
import NotFound from "./not-found"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    Sentry.captureException(error)
  }, [error])
 
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h2>Something went wrong in error page!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <NotFound/>
    </div>
  )
}