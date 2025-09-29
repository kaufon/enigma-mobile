import { useCallback } from 'react'
import { type RelativePathString, useRouter } from 'expo-router'

export function useNavigation() {
  const router = useRouter()

  const navigate = useCallback(
    (name: string, params?: any) => {
      router.push(name as RelativePathString, params)
    },
    [router],
  )

  return {
    navigate,
  }
}
