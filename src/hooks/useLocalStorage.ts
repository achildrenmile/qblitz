import { useState, useEffect, useCallback } from 'react'

// Custom event for same-tab localStorage sync
const STORAGE_EVENT = 'local-storage-update'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value from localStorage or use default
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Listen for storage changes (from other tabs and same tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Error parsing localStorage value for "${key}":`, error)
        }
      }
    }

    // Listen for custom event (same tab sync)
    const handleCustomEvent = (e: CustomEvent<{ key: string; value: T }>) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(STORAGE_EVENT, handleCustomEvent as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(STORAGE_EVENT, handleCustomEvent as EventListener)
    }
  }, [key])

  // Wrapper to allow functional updates
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value

      // Save to localStorage
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
        // Dispatch custom event for same-tab sync
        window.dispatchEvent(
          new CustomEvent(STORAGE_EVENT, {
            detail: { key, value: newValue }
          })
        )
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }

      return newValue
    })
  }, [key])

  // Reset to initial value
  const resetValue = useCallback(() => {
    setStoredValue(initialValue)
    try {
      window.localStorage.removeItem(key)
      // Dispatch custom event for same-tab sync
      window.dispatchEvent(
        new CustomEvent(STORAGE_EVENT, {
          detail: { key, value: initialValue }
        })
      )
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, resetValue]
}

export default useLocalStorage
