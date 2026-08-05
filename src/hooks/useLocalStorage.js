import { useEffect, useState } from 'react'
import { readJSON, writeJSON } from '../utils/storage'

export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => readJSON(key, fallback))

  useEffect(() => {
    writeJSON(key, value)
  }, [key, value])

  return [value, setValue]
}
