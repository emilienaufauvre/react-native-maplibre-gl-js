import { useRef } from 'react'
import equal from 'fast-deep-equal'

export const useStableValue = <T>(value: T): T => {
  const ref = useRef<T>(value)
  if (!equal(ref.current, value)) {
    ref.current = value
  }
  return ref.current
}
