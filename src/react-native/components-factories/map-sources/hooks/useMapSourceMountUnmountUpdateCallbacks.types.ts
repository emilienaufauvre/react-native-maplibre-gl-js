import { useEffect, useRef } from 'react'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import type { MapSourceProps } from '../createMapSourceAsComponent.types'
import useMapSourceMountUnmountUpdateCallbacks from './useMapSourceMountUnmountUpdateCallbacks'

/**
 * Mount the component as a map source within the web world on component mount.
 * Propagate any change in the component props to the web world by unmounting
 * and mounting the map source with the new options.
 * @param props - The RN object props.
 */
export const useMapSourceMountUnmountUpdateCallbacksTypes = <
  Props extends MapSourceProps<any>,
>(
  props: Props,
) => {
  // States.
  // - Local.
  const hasBeenMounted = useRef<boolean>(false)
  // - Global.
  const { isWebWorldReady } = useMapAtoms()
  // Behaviors.
  const { mount, update } = useMapSourceMountUnmountUpdateCallbacks(props)

  // Mount the source only when props have changed (mounted in the web world),
  // or that the map source has never been mounted.
  useEffect(() => {
    if (!isWebWorldReady) {
      return
    }

    if (!hasBeenMounted.current) {
      mount()
      hasBeenMounted.current = true
    } else {
      update()
    }
    // TODO when unmount?
  }, [mount, update, hasBeenMounted, isWebWorldReady])
}

export default useMapSourceMountUnmountUpdateCallbacksTypes
