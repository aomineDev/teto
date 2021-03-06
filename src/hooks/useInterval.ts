
import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<null | (() => void)>(null)
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick (): void {
      if (savedCallback.current != null) savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [delay])
}
