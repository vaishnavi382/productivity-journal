import { useEffect, useState } from 'react'

// A small reusable hook for keeping React state synced with localStorage.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key)

      if (savedValue) {
        return JSON.parse(savedValue)
      }
    } catch {
      localStorage.removeItem(key)
    }

    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
