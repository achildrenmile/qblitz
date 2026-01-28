import { useState, useEffect, useCallback } from 'react'

/**
 * Runtime configuration interface
 * Can be overridden at deployment via environment variables
 */
export interface SiteConfig {
  parentSiteUrl: string
  parentSiteLogo: string
  parentSiteName: string
}

const defaultConfig: SiteConfig = {
  parentSiteUrl: '',
  parentSiteLogo: '',
  parentSiteName: '',
}

// Singleton state to share config across components
let globalConfig: SiteConfig = defaultConfig
let isLoaded = false
let loadPromise: Promise<void> | null = null
const listeners: Set<() => void> = new Set()

/**
 * Load configuration from config.json
 */
async function loadConfigFromServer(): Promise<void> {
  if (isLoaded) return

  if (loadPromise) {
    return loadPromise
  }

  loadPromise = (async () => {
    try {
      const response = await fetch('/config.json')
      if (response.ok) {
        const data = await response.json()
        globalConfig = {
          parentSiteUrl: data.parentSiteUrl || '',
          parentSiteLogo: data.parentSiteLogo || '',
          parentSiteName: data.parentSiteName || '',
        }
      }
    } catch (error) {
      console.warn('Could not load config.json:', error)
    }
    isLoaded = true
    // Notify all listeners
    listeners.forEach(listener => listener())
  })()

  return loadPromise
}

/**
 * React hook for runtime configuration
 */
export function useConfig() {
  const [config, setConfig] = useState<SiteConfig>(globalConfig)
  const [loaded, setLoaded] = useState(isLoaded)

  const updateState = useCallback(() => {
    setConfig({ ...globalConfig })
    setLoaded(true)
  }, [])

  useEffect(() => {
    // Subscribe to config updates
    listeners.add(updateState)

    // Load config if not already loaded
    if (!isLoaded) {
      loadConfigFromServer()
    } else {
      // Already loaded, update state
      updateState()
    }

    return () => {
      listeners.delete(updateState)
    }
  }, [updateState])

  return {
    config,
    isLoaded: loaded,
  }
}

export default useConfig
