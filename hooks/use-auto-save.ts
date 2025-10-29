'use client'

import { useEffect, useRef } from 'react'
import { useResumeStore } from '@/lib/store/resume-store'

interface UseAutoSaveOptions {
  enabled?: boolean
  debounceMs?: number
  onSave?: () => void
}

/**
 * Hook to automatically save resume data to localStorage
 * The actual persistence is handled by Zustand's persist middleware,
 * but this hook can trigger additional side effects
 */
export function useAutoSave(options: UseAutoSaveOptions = {}) {
  const { enabled = true, debounceMs = 1000, onSave } = options
  const isDirty = useResumeStore((state) => state.isDirty)
  const markClean = useResumeStore((state) => state.markClean)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!enabled || !isDirty) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      markClean()
      onSave?.()
    }, debounceMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isDirty, enabled, debounceMs, markClean, onSave])

  return { isDirty }
}
