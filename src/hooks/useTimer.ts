import { useState, useCallback, useRef, useEffect } from 'react'

export interface UseTimerReturn {
  zeit: number
  laeuft: boolean
  starten: () => void
  stoppen: () => void
  zuruecksetzen: (neueZeit?: number) => void
  setZeit: (zeit: number) => void
}

export function useTimer(
  startZeit: number,
  onEnde?: () => void,
  countDown: boolean = true
): UseTimerReturn {
  const [zeit, setZeit] = useState(startZeit)
  const [laeuft, setLaeuft] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const onEndeRef = useRef(onEnde)

  // Keep onEnde callback up to date
  useEffect(() => {
    onEndeRef.current = onEnde
  }, [onEnde])

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Timer logic
  useEffect(() => {
    if (laeuft) {
      intervalRef.current = window.setInterval(() => {
        setZeit(prev => {
          const nextValue = countDown ? prev - 1 : prev + 1

          if (countDown && nextValue <= 0) {
            setLaeuft(false)
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            // Call onEnde callback
            setTimeout(() => {
              onEndeRef.current?.()
            }, 0)
            return 0
          }

          return nextValue
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [laeuft, countDown])

  const starten = useCallback(() => {
    setLaeuft(true)
  }, [])

  const stoppen = useCallback(() => {
    setLaeuft(false)
  }, [])

  const zuruecksetzen = useCallback(
    (neueZeit?: number) => {
      setLaeuft(false)
      setZeit(neueZeit ?? startZeit)
    },
    [startZeit]
  )

  return {
    zeit,
    laeuft,
    starten,
    stoppen,
    zuruecksetzen,
    setZeit,
  }
}

export default useTimer
