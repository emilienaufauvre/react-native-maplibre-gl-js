import useMountUnmountUpdateCallbacks from './useMountUnmountUpdateCallbacks'
import type { MountUpdateUnmountInput } from './useMountUnmountUpdateCallbacks.types'
import { useEffect, useRef } from 'react'
import useMapAtoms from '../../hooks/atoms/useMapAtoms'

/**
 * Mount, update, unmount the component as a web object / map source within the
 * web world on component mount, component props update, or component unmount.
 * @param input - The RN object props, etc.
 */
export const useMountUpdateUnmountWhenNeeded = (
  input: MountUpdateUnmountInput,
) => {
  // Refs.
  const mountedSessionKey = useRef<number | null>(null)
  const unmountRef = useRef<() => void | null>(null)
  // States.
  // - Global.
  const { webWorldSessionKey, isWebWorldReady } = useMapAtoms()
  // Behaviors.
  const { mount, update, unmount } = useMountUnmountUpdateCallbacks(input)

  // Mount the object/source only when props have changed (and it's already
  // mounted in the web world), or that it has never been mounted.
  useEffect(() => {
    if (!isWebWorldReady) {
      return
    }

    if (mountedSessionKey.current !== webWorldSessionKey) {
      mount()
      mountedSessionKey.current = webWorldSessionKey
    } else {
      update()
    }
  }, [mount, update, mountedSessionKey, webWorldSessionKey, isWebWorldReady])

  // Unmount on the web world if the component goes unmounted.
  useEffect(() => {
    unmountRef.current = unmount
  }, [unmount])
  useEffect(() => {
    return () => {
      unmountRef.current?.()
    }
  }, [])
}

export default useMountUpdateUnmountWhenNeeded
